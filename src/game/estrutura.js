// Monta a molécula a partir das ligações reais (SMILES em data/estruturas.js)
// e calcula posições em 2D (fórmula estrutural) e 3D (geometria VSEPR).
import SMILES from '../data/estruturas.js';

const VAL = { B: [3], C: [4], N: [3, 5], O: [2], P: [3, 5], S: [2, 4, 6], F: [1], Cl: [1, 3, 5, 7], Br: [1, 3, 5, 7], I: [1, 3, 5, 7] };
// Raios covalentes (pm), para o comprimento das ligações em 3D.
const COV = { H: 31, Li: 128, B: 84, C: 76, N: 71, O: 66, F: 57, Na: 166, Mg: 141, Al: 121, Si: 111, P: 107, S: 105, Cl: 102, K: 203, Ca: 176, Ti: 160, Mn: 139, Fe: 132, Cu: 132, Zn: 122, Br: 120, Ag: 145, I: 139 };
// Elétrons de valência, para contar pares livres (que entortam H₂O, NH₃...).
const VE = { H: 1, B: 3, C: 4, N: 5, O: 6, F: 7, Si: 4, P: 5, S: 6, Cl: 7, Br: 7, I: 7 };
const cov = s => COV[s] || 140;
// Raios iônicos (pm): íons soltos, sem ligação covalente (Na⁺ é menor que Cl⁻).
const ION = { Li: 76, Na: 102, K: 138, Mg: 72, Ca: 100, Al: 54, Fe: 65, Cu: 73, Zn: 74, Ag: 115, F: 133, Cl: 181, Br: 196, I: 220, O: 140, S: 184 };
/** Raio de cada átomo da molécula: iônico se ele só tem atrações iônicas, covalente nos demais. */
function raios(mol) {
  return mol.atoms.map((a, i) => {
    const so = mol.bonds.filter(([x, y]) => x === i || y === i);
    return a.charge && ION[a.sym] && so.every(([, , o]) => o === 0) ? ION[a.sym] * 0.75 : cov(a.sym);
  });
}

/** Lê um SMILES e devolve átomos (com H explícitos) e ligações [a, b, ordem]; ordem 0 = atração iônica. */
export function parseSmiles(sm) {
  const atoms = [], bonds = [], stack = [], rings = {};
  let prev = null, bond = null, i = 0;
  const add = a => {
    atoms.push(a);
    const id = atoms.length - 1;
    if (prev !== null) bonds.push([prev, id, bond ?? 1]);
    prev = id; bond = null;
  };
  while (i < sm.length) {
    const ch = sm[i];
    if (ch === '(') { stack.push(prev); i++; continue; }
    if (ch === ')') { prev = stack.pop(); i++; continue; }
    if ('-=#~'.includes(ch)) { bond = { '-': 1, '=': 2, '#': 3, '~': 0 }[ch]; i++; continue; }
    if (ch === '.') { prev = null; i++; continue; }
    if (/[0-9%]/.test(ch)) {
      const n = ch === '%' ? sm.substr(i + 1, 2) : ch;
      i += ch === '%' ? 3 : 1;
      if (rings[n]) { bonds.push([rings[n].a, prev, bond ?? rings[n].bond ?? 1]); delete rings[n]; }
      else rings[n] = { a: prev, bond };
      bond = null;
      continue;
    }
    if (ch === '[') {
      const end = sm.indexOf(']', i);
      const m = /^([A-Z][a-z]?)(?:H(\d*))?([+-]+)?(\d*)$/.exec(sm.slice(i + 1, end));
      if (!m) throw new Error('SMILES inválido: ' + sm);
      const charge = m[3] ? (m[3][0] === '+' ? 1 : -1) * (m[4] ? +m[4] : m[3].length) : 0;
      add({ sym: m[1], charge, h: m[2] === undefined ? 0 : m[2] === '' ? 1 : +m[2] });
      i = end + 1;
      continue;
    }
    const m = /^(Cl|Br|[BCNOPSFI])/.exec(sm.slice(i));
    if (!m) throw new Error(`SMILES inválido em "${sm}" (posição ${i})`);
    add({ sym: m[1], charge: 0, h: null });
    i += m[1].length;
  }
  // Hidrogênios: implícitos (átomos comuns) ou pedidos entre colchetes.
  const n0 = atoms.length;
  for (let a = 0; a < n0; a++) {
    let h = atoms[a].h;
    if (h === null) {
      const sum = bonds.reduce((t, [x, y, o]) => t + (x === a || y === a ? o : 0), 0);
      const v = VAL[atoms[a].sym].find(v => v >= sum) ?? sum;
      h = v - sum;
    }
    for (let k = 0; k < h; k++) { atoms.push({ sym: 'H', charge: 0 }); bonds.push([a, atoms.length - 1, 1]); }
  }
  return { atoms: atoms.map(({ sym, charge }) => ({ sym, charge })), bonds };
}

export const smilesDe = f => SMILES[f];

/** Conta átomos de um SMILES, para conferir com a fórmula. */
export function contarAtomos(sm) {
  const c = {};
  parseSmiles(sm).atoms.forEach(a => { c[a.sym] = (c[a.sym] || 0) + 1; });
  return c;
}

// ---------- geometria ----------
function rng(seed) {
  let t = seed >>> 0;
  return () => { t += 0x6D2B79F5; let r = Math.imul(t ^ (t >>> 15), 1 | t); r ^= r + Math.imul(r ^ (r >>> 7), 61 | r); return ((r ^ (r >>> 14)) >>> 0) / 4294967296; };
}

/** Restrições de distância: ligações (1-2), ângulos (1-3) e distância mínima entre o resto. */
function restricoes(mol, dim) {
  const { atoms, bonds } = mol, n = atoms.length, rr = raios(mol);
  const cv = atoms.map(() => []), io = atoms.map(() => []);
  bonds.forEach(([a, b, o]) => {
    if (o > 0) { cv[a].push([b, o]); cv[b].push([a, o]); } else { io[a].push(b); io[b].push(a); }
  });
  const len = (a, b, o) => {
    if (dim === 3) return (rr[a] + rr[b]) / 150 * (o === 0 ? 1.15 : o === 2 ? 0.9 : o === 3 ? 0.82 : 1);
    if (o === 0) return 1.25;
    return atoms[a].sym === 'H' || atoms[b].sym === 'H' ? 0.72 : 1;
  };
  const cons = [], fixo = new Set(), key = (a, b) => a < b ? a * 4096 + b : b * 4096 + a;
  bonds.forEach(([a, b, o]) => { cons.push([a, b, len(a, b, o), 1, 0]); fixo.add(key(a, b)); });
  for (let i = 0; i < n; i++) {
    const nb = cv[i], k = nb.length;
    const sum = nb.reduce((t, [, o]) => t + o, 0);
    const lp = VE[atoms[i].sym] ? Math.max(0, Math.floor((VE[atoms[i].sym] - atoms[i].charge - sum) / 2)) : 0;
    const linear = nb.some(([, o]) => o === 3) || nb.filter(([, o]) => o === 2).length === 2;
    let ang = null;
    if (dim === 3) {
      const d = linear ? 2 : k + lp;
      if (k >= 2 && d <= 4) ang = { 2: 180, 3: 120, 4: 109.47 }[d];
    } else if (k === 2) ang = linear ? 180 : 120;
    else if (k === 3) ang = 120;
    for (let x = 0; x < k; x++) for (let y = x + 1; y < k; y++) {
      const [a, oa] = nb[x], [b, ob] = nb[y], la = len(i, a, oa), lb = len(i, b, ob);
      fixo.add(key(a, b));
      if (ang !== null) {
        const t = ang * Math.PI / 180;
        cons.push([a, b, Math.sqrt(la * la + lb * lb - 2 * la * lb * Math.cos(t)), 0.6, 0]);
      } else cons.push([a, b, Math.min(la, lb) * (dim === 3 ? 1.35 : 1.38), 0.6, 1]);
    }
    // Íons em volta de um mesmo átomo se afastam.
    const all = io[i].concat(nb.map(([b]) => b));
    for (let x = 0; x < all.length; x++) for (let y = x + 1; y < all.length; y++) {
      if (!io[i].includes(all[x]) && !io[i].includes(all[y])) continue;
      fixo.add(key(all[x], all[y]));
      cons.push([all[x], all[y], 1.6, 0.4, 1]);
    }
  }
  const mins = [];
  for (let a = 0; a < n; a++) for (let b = a + 1; b < n; b++) {
    if (fixo.has(key(a, b))) continue;
    const hh = (atoms[a].sym === 'H') + (atoms[b].sym === 'H');
    mins.push([a, b, dim === 3 ? [1.25, 0.95, 0.65][hh] : [1.2, 0.9, 0.62][hh]]);
  }
  return { cons, mins };
}

function resolver(n, R, dim, seed) {
  const D = dim + 1, rnd = rng(seed), spread = 0.9 * Math.sqrt(n);
  const P = Array.from({ length: n }, () => Array.from({ length: D }, () => (rnd() - 0.5) * 2 * spread));
  const iters = 900;
  const G = Array.from({ length: n }, () => new Array(D).fill(0));
  const pull = (a, b, alvo, w, soMin) => {
    const pa = P[a], pb = P[b];
    let d2 = 0;
    for (let k = 0; k < D; k++) d2 += (pb[k] - pa[k]) ** 2;
    const d = Math.sqrt(d2) + 1e-6;
    if (soMin && d >= alvo) return 0;
    const f = w * (d - alvo) / d;
    for (let k = 0; k < D; k++) { const g = (pb[k] - pa[k]) * f; G[a][k] += g; G[b][k] -= g; }
    return w * (d - alvo) ** 2;
  };
  let E = 0;
  for (let it = 0; it < iters; it++) {
    G.forEach(g => g.fill(0));
    const t = it / iters;
    E = 0;
    R.cons.forEach(([a, b, alvo, w, m]) => { E += pull(a, b, alvo, w, m); });
    R.mins.forEach(([a, b, alvo]) => { E += pull(a, b, alvo, 0.5, 1); });
    // Repulsão fraca de longe espalha a molécula e desembaraça anéis.
    if (t < 0.7) for (let a = 0; a < n; a++) for (let b = a + 1; b < n; b++) {
      let d2 = 0;
      for (let k = 0; k < D; k++) d2 += (P[b][k] - P[a][k]) ** 2;
      const f = 0.02 / (d2 + 0.1);
      for (let k = 0; k < D; k++) { const g = (P[b][k] - P[a][k]) * f; G[a][k] -= g; G[b][k] += g; }
    }
    // Dimensão extra vai sendo espremida: a molécula começa em D+1 e termina em D.
    const sq = Math.min(1, t * 1.6) ** 2;
    const step = 0.35 * (1 - 0.7 * t);
    for (let a = 0; a < n; a++) {
      G[a][D - 1] -= P[a][D - 1] * sq * 2;
      for (let k = 0; k < D; k++) P[a][k] += Math.max(-0.3, Math.min(0.3, G[a][k] * step));
    }
    if (t > 0.9) P.forEach(p => { p[D - 1] = 0; });
  }
  return { P: P.map(p => p.slice(0, dim)), E };
}

function cruzamentos(P, bonds) {
  const cr = (a, b, c) => (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]);
  let n = 0;
  for (let i = 0; i < bonds.length; i++) for (let j = i + 1; j < bonds.length; j++) {
    const [a, b] = bonds[i], [c, d] = bonds[j];
    if (a === c || a === d || b === c || b === d) continue;
    if (cr(P[a], P[b], P[c]) * cr(P[a], P[b], P[d]) < 0 && cr(P[c], P[d], P[a]) * cr(P[c], P[d], P[b]) < 0) n++;
  }
  return n;
}

function melhor(mol, dim, tentativas) {
  const R = restricoes(mol, dim);
  let best = null;
  for (let s = 1; s <= tentativas; s++) {
    const r = resolver(mol.atoms.length, R, dim, s * 7919);
    const nota = r.E + (dim === 2 ? cruzamentos(r.P, mol.bonds) * 5 : 0);
    if (!best || nota < best.nota) best = { ...r, nota };
  }
  return best.P;
}

/** Gira para o eixo mais comprido ficar na horizontal (cabe melhor no quadro). */
function alinhar(P) {
  const n = P.length, m = [0, 0];
  P.forEach(p => { m[0] += p[0] / n; m[1] += p[1] / n; });
  let sxx = 0, syy = 0, sxy = 0;
  P.forEach(p => { const x = p[0] - m[0], y = p[1] - m[1]; sxx += x * x; syy += y * y; sxy += x * y; });
  const th = 0.5 * Math.atan2(2 * sxy, sxx - syy), c = Math.cos(-th), s = Math.sin(-th);
  return P.map(p => { const x = p[0] - m[0], y = p[1] - m[1]; return [x * c - y * s, x * s + y * c]; });
}

const CACHE = {};
export function molecula(f) {
  if (CACHE[f]) return CACHE[f];
  const sm = SMILES[f];
  if (!sm) return null;
  const mol = parseSmiles(sm);
  const n = mol.atoms.length, tent = n > 30 ? 4 : n > 12 ? 6 : 3;
  CACHE[f] = { ...mol, r3: raios(mol).map(r => 0.12 + r / 650), p2: alinhar(melhor(mol, 2, tent)), p3: n === 1 ? [[0, 0, 0]] : melhor(mol, 3, Math.max(2, tent / 2)) };
  return CACHE[f];
}

