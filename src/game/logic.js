// Regras do jogo, sem interface: combinação de átomos, XP, missões e medalhas.
import { elements, cats, substances } from '../data/nucleo.js';

export const XP_PER_LEVEL = 300;
const BY_SYM = new Map(elements.map(e => [e.sym, e]));

export const el = sym => BY_SYM.get(sym);

/** Cor de uma categoria em oklch, com opacidade opcional. */
export function col(cat, a) {
  const c = cats[cat];
  const L = cat === 'un' ? 0.72 : 0.8;
  return `oklch(${L} ${c.c} ${c.h}${a != null ? ' / ' + a : ''})`;
}

export const sub = s => s.replace(/\d/g, d => '₀₁₂₃₄₅₆₇₈₉'[d]);
export const sup = s => String(s).replace(/\d/g, d => '⁰¹²³⁴⁵⁶⁷⁸⁹'[d]);

const key = c => Object.keys(c).sort().map(k => k + c[k]).join('|');
const KEYS = new Map(substances.map(s => [key(s.c), s]));

/** Substância do catálogo com exatamente essa contagem de átomos. */
export const findMatch = zone => (Object.keys(zone).length ? KEYS.get(key(zone)) : undefined);
export const bySymbolFormula = f => substances.find(s => s.f === f);

export const subXP = s => 10 * s.atoms + 20 * s.nEl;

export const MISSIONS = [
  { title: 'Primeiros passos', desc: 'Descubra 5 substâncias.', target: 5, val: c => c.disc.length, reward: 100 },
  { title: 'Sopro de vida', desc: 'Descubra 5 substâncias no estado gasoso.', target: 5, val: c => c.disc.filter(s => s.state === 'gás').length, reward: 150 },
  { title: 'Mar salgado', desc: 'Forme dois sais: cloreto de sódio e cloreto de potássio.', target: 2, val: c => c.disc.filter(s => s.f === 'NaCl' || s.f === 'KCl').length, reward: 120 },
  { title: 'Química orgânica', desc: 'Crie 3 compostos que tenham carbono e hidrogênio.', target: 3, val: c => c.disc.filter(s => s.c.C && s.c.H).length, reward: 200 },
  { title: 'Arquiteto molecular', desc: 'Crie uma substância com 4 elementos diferentes.', target: 1, val: c => c.disc.filter(s => s.nEl >= 4).length, reward: 250 },
  { title: 'Explorador da tabela', desc: 'Coloque 15 elementos diferentes no reator.', target: 15, val: c => c.usedEls.length, reward: 150 },
  { title: 'Halogênios em ação', desc: 'Descubra 8 substâncias com flúor, cloro, bromo ou iodo.', target: 8, val: c => c.disc.filter(s => s.c.F || s.c.Cl || s.c.Br || s.c.I).length, reward: 150 },
  { title: 'Mineralogista', desc: 'Forme 6 minerais: calcário, quartzo, hematita, coríndon, magnetita, pirita, fluorita ou magnesita.', target: 6, val: c => c.disc.filter(s => ['CaCO3', 'SiO2', 'Fe2O3', 'Al2O3', 'Fe3O4', 'FeS2', 'CaF2', 'MgCO3'].includes(s.f)).length, reward: 200 },
  { title: 'Metais de transição', desc: 'Descubra 4 substâncias com ferro, zinco, titânio, cobre, prata ou manganês.', target: 4, val: c => c.disc.filter(s => Object.keys(s.c).some(k => el(k).cat === 'tm')).length, reward: 200 },
  { title: 'Farmácia', desc: 'Crie aspirina, paracetamol, vitamina C e leite de magnésia.', target: 4, val: c => c.disc.filter(s => ['C9H8O4', 'C8H9NO2', 'C6H8O6', 'MgH2O2'].includes(s.f)).length, reward: 250 },
  { title: 'Química doce', desc: 'Crie glicose, sacarose, sacarina e aspartame.', target: 4, val: c => c.disc.filter(s => ['C6H12O6', 'C12H22O11', 'C7H5NO3S', 'C14H18N2O5'].includes(s.f)).length, reward: 250 },
  { title: 'Gigantes moleculares', desc: 'Crie 3 substâncias com 20 átomos ou mais.', target: 3, val: c => c.disc.filter(s => s.atoms >= 20).length, reward: 300 },
  { title: 'Enciclopédia completa', desc: 'Descubra todas as substâncias do catálogo.', target: c => c.total, val: c => c.disc.length, reward: 500 },
];

/** XP, nível e missões a partir do progresso salvo. */
export function progress(st) {
  const disc = st.discovered.map(bySymbolFormula).filter(Boolean);
  const ctx = { disc, usedEls: st.usedEls, total: substances.length };
  const missions = MISSIONS.map(m => {
    const t = typeof m.target === 'function' ? m.target(ctx) : m.target;
    const v = Math.min(m.val(ctx), t);
    return { ...m, t, v, done: v >= t };
  });
  const xp = 50 + disc.reduce((a, s) => a + subXP(s), 0) + missions.filter(m => m.done).reduce((a, m) => a + m.reward, 0);
  return { disc, missions, xp, level: Math.floor(xp / XP_PER_LEVEL) + 1 };
}

export function medals(st, P) {
  const gases = P.disc.filter(s => s.state === 'gás').length;
  const org = P.disc.filter(s => s.c.C && s.c.H).length;
  return [
    ['1', 'Primeira fusão', 'Realize sua primeira fusão no reator.', st.fusions >= 1, 195],
    ['H₂O', 'Gota d’água', 'Descubra a água.', st.discovered.includes('H2O'), 230],
    ['G5', 'Mestre dos gases', 'Descubra 5 gases.', gases >= 5, 300],
    ['C–H', 'Orgânico', 'Descubra 3 compostos orgânicos.', org >= 3, 145],
    ['10', 'Colecionador', 'Tenha 10 substâncias na coleção.', P.disc.length >= 10, 65],
    ['N5', 'Veterano', 'Alcance o nível 5.', P.level >= 5, 28],
    ['He', 'Curioso nobre', 'Tente fundir um gás nobre.', st.nobleTried, 340],
    ['50', 'Meio caminho', 'Tenha 50 substâncias na coleção.', P.disc.length >= 50, 250],
    ['Rx', 'Farmacêutico', 'Conclua a missão Farmácia.', P.missions.some(m => m.title === 'Farmácia' && m.done), 170],
    ['∞', 'Mente completa', 'Descubra todas as substâncias.', P.disc.length >= substances.length, 105],
  ].map(([glyph, title, desc, on, h]) => ({ glyph, title, desc, on, h }));
}

/** O que o painel de status do reator deve dizer sobre a combinação atual. */
export function reactorStatus(zone, discovered, showHints) {
  const keys = Object.keys(zone);
  if (!keys.length) return { tone: 'idle', tag: 'AGUARDANDO', title: 'Reator vazio', text: 'Arraste ou toque nos átomos da tabela para colocá-los na área de fusão.', missing: [] };
  if (findMatch(zone)) return { tone: 'ok', tag: 'FUSÃO DISPONÍVEL', title: 'Fusão disponível', text: 'Esses átomos podem formar uma substância. Clique em Fundir para descobrir qual, ou continue adicionando átomos.', missing: [] };
  const cands = substances.filter(s => keys.every(k => (s.c[k] || 0) >= zone[k]));
  if (cands.length) {
    const miss = s => Object.keys(s.c).reduce((a, k) => a + s.c[k] - (zone[k] || 0), 0);
    const best = cands.slice().sort((a, b) => miss(a) - miss(b))[0];
    return {
      tone: 'near', tag: 'QUASE LÁ', title: 'Faltam átomos',
      text: showHints
        ? `Adicione os átomos abaixo para completar a ligação.${cands.length > 1 ? ` ${cands.length} substâncias do catálogo começam com essa combinação.` : ''}`
        : 'A combinação ainda não está completa.',
      missing: showHints ? Object.keys(best.c).filter(k => best.c[k] > (zone[k] || 0)).map(k => ({ sym: k, n: best.c[k] - (zone[k] || 0), cat: el(k).cat })) : [],
    };
  }
  const noble = keys.find(k => el(k).cat === 'ng');
  const unused = keys.find(k => !substances.some(s => s.c[k]));
  if (noble) return { tone: 'bad', tag: 'INSTÁVEL', title: `${el(noble).name} não quer se ligar`, text: 'Gases nobres têm a camada de valência completa e quase nunca formam ligações. Remova-o do reator.', missing: [] };
  if (unused) return { tone: 'bad', tag: 'INSTÁVEL', title: `${el(unused).name} ainda não tem receitas`, text: 'Esse elemento não participa de nenhuma substância do catálogo. Tente outros elementos.', missing: [] };
  return { tone: 'bad', tag: 'INSTÁVEL', title: 'Proporção sem correspondência', text: 'Nenhuma substância do catálogo tem essa proporção de átomos. Diminua a quantidade de algum deles.', missing: [] };
}

export function usageText(sym, discovered) {
  const ui = substances.filter(s => s.c[sym]);
  if (!ui.length) return 'Não aparece nas substâncias do catálogo.';
  const shown = ui.slice(0, 4).map(s => (discovered.includes(s.f) ? sub(s.f) : '???')).join(', ');
  return `Aparece em ${ui.length} substância${ui.length > 1 ? 's' : ''} do catálogo: ${shown}${ui.length > 4 ? '…' : ''}`;
}

export const molarMass = s => Object.keys(s.c).reduce((a, k) => a + el(k).mass * s.c[k], 0);

// ---------- Distribuição eletrônica ----------
const L = 'spdf';
export const SHELL_LETTERS = 'KLMNOPQ';
export const EXCEPTIONS = [24, 29, 42, 46, 47, 78, 79];
const fmt = cf => cf.map(([n, l, k]) => `${n}${L[l]}${sup(k)}`).join(' ');

export function electronInfo(t) {
  const cores = [[86, 'Rn'], [54, 'Xe'], [36, 'Kr'], [18, 'Ar'], [10, 'Ne'], [2, 'He']].find(([z]) => z < t.z);
  let short = fmt(t.conf);
  if (cores) {
    const core = el(cores[1]).conf;
    const rest = t.conf.filter(([n, l, k]) => !core.some(c => c[0] === n && c[1] === l && c[2] === k));
    short = `[${cores[1]}] ${fmt(rest)}`;
  }
  return { full: fmt(t.conf), short, valence: t.shells[t.shells.length - 1], exception: EXCEPTIONS.includes(t.z) };
}

export function shellInfo(t, i) {
  const subs = t.conf.filter(([n]) => n === i + 1).sort((x, y) => x[1] - y[1]);
  return {
    letter: SHELL_LETTERS[i], n: i + 1, count: t.shells[i], max: 2 * (i + 1) ** 2, subs: fmt(subs),
    role: i === t.shells.length - 1
      ? 'Camada de valência: seus elétrons participam das ligações químicas.'
      : i === 0 ? 'Camada mais próxima do núcleo, com a menor energia.' : 'Camada interna: seus elétrons não participam das ligações.',
  };
}

// ---------- Estrutura da molécula (2D e base do 3D) ----------
export function structure(s) {
  const W = 340, H = 280, cx = W / 2, cy = H / 2;
  const list = [];
  Object.keys(s.c).forEach(k => { for (let i = 0; i < s.c[k]; i++) list.push(k); });
  const nodes = [], bonds = [];
  const mk = (sym, x, y) => { nodes.push({ sym, x, y, r: sym === 'H' ? 15 : 22, cat: el(sym).cat }); return nodes.length - 1; };
  const bond = (a, b) => bonds.push([a, b]);
  if (Object.keys(s.c).length === 1 && list.length > 3) {
    // P₄, S₈: anel de átomos iguais.
    const n = list.length, R = n > 5 ? 95 : 70;
    const ids = list.map((sym, i) => { const a = -Math.PI / 2 + i * 2 * Math.PI / n; return mk(sym, cx + R * Math.cos(a), cy + R * Math.sin(a)); });
    ids.forEach((id, i) => bond(id, ids[(i + 1) % n]));
    if (n === 4) { bond(ids[0], ids[2]); bond(ids[1], ids[3]); }
  } else if (Object.keys(s.c).length === 1) {
    const n = list.length, gap = 70;
    const ids = list.map((sym, i) => mk(sym, cx + (i - (n - 1) / 2) * gap, cy + (n === 3 && i === 1 ? -30 : 0)));
    for (let i = 1; i < ids.length; i++) bond(ids[i - 1], ids[i]);
  } else if (list.length <= 9) {
    const order = ['C', 'Si', 'S', 'N', 'P', 'Fe', 'Ca', 'Na', 'K', 'Cl', 'O'];
    const heavy = Object.keys(s.c).filter(k => k !== 'H');
    heavy.sort((a, b) => (s.c[a] - s.c[b]) || (order.indexOf(a) - order.indexOf(b)));
    const center = heavy[0];
    const c = mk(center, cx, cy);
    const rest = list.slice(); rest.splice(rest.indexOf(center), 1);
    const R = rest.length <= 2 ? 80 : 95;
    rest.forEach((sym, i) => {
      const two = rest.length === 2;
      const a = (two ? Math.PI : -Math.PI / 2) + i * (2 * Math.PI / rest.length) * (two ? 0.62 : 1) - (two ? 0.62 * Math.PI : 0);
      bond(c, mk(sym, cx + R * Math.cos(a), cy + R * Math.sin(a)));
    });
  } else {
    const heavy = list.filter(x => x !== 'H'), hs = list.filter(x => x === 'H');
    const hr = heavy.length > 8 ? 78 : 62;
    const ang = heavy.map((_, i) => -Math.PI / 2 + i * 2 * Math.PI / heavy.length);
    const hid = heavy.map((sym, i) => mk(sym, cx + hr * Math.cos(ang[i]), cy + hr * Math.sin(ang[i])));
    for (let i = 1; i < hid.length; i++) bond(hid[i - 1], hid[i]);
    if (heavy.length > 4) bond(hid[hid.length - 1], hid[0]);
    const per = heavy.map(() => []);
    hs.forEach((h, i) => per[Math.floor(i * heavy.length / hs.length)].push(h));
    per.forEach((arr, j) => arr.forEach((h, k) => {
      const a = ang[j] + (k - (arr.length - 1) / 2) * 0.32;
      bond(hid[j], mk(h, cx + 124 * Math.cos(a), cy + 116 * Math.sin(a)));
    }));
  }
  return { nodes, bonds };
}

/** Relaxa a estrutura 2D em 3D (molas nas ligações, repulsão entre átomos). */
const G3 = {};
export function geom3d(s) {
  if (G3[s.f]) return G3[s.f];
  const raw = structure(s);
  const n = raw.nodes.length, deg = new Array(n).fill(0);
  raw.bonds.forEach(([a, b]) => { deg[a]++; deg[b]++; });
  const pts = raw.nodes.map((q, i) => ({ x: q.x - 170, y: q.y - 140, z: Math.sin(i * 2.3) * 30, r: q.r }));
  const bonds = raw.bonds.slice();
  // Pares de elétrons livres invisíveis dobram moléculas como H₂O.
  raw.nodes.forEach((q, i) => {
    if (['O', 'S', 'N'].includes(q.sym) && deg[i] >= 2) {
      for (let k = 0; k < 4 - deg[i]; k++) {
        pts.push({ x: pts[i].x + (k ? -20 : 20), y: pts[i].y + 10, z: pts[i].z + (k ? -25 : 25), r: 10 });
        bonds.push([i, pts.length - 1]);
      }
    }
  });
  const len = (a, b) => (pts[a].r + pts[b].r) * 1.06;
  const bset = new Set(bonds.flatMap(([a, b]) => [a + '-' + b, b + '-' + a]));
  for (let it = 0; it < 500; it++) {
    const F = pts.map(() => ({ x: 0, y: 0, z: 0 }));
    for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
      if (bset.has(i + '-' + j)) continue;
      const dx = pts[j].x - pts[i].x, dy = pts[j].y - pts[i].y, dz = pts[j].z - pts[i].z;
      const d2 = dx * dx + dy * dy + dz * dz + 0.01, d = Math.sqrt(d2), k = 9000 / d2;
      F[i].x -= dx / d * k; F[i].y -= dy / d * k; F[i].z -= dz / d * k;
      F[j].x += dx / d * k; F[j].y += dy / d * k; F[j].z += dz / d * k;
    }
    bonds.forEach(([a, b]) => {
      const dx = pts[b].x - pts[a].x, dy = pts[b].y - pts[a].y, dz = pts[b].z - pts[a].z;
      const d = Math.hypot(dx, dy, dz) + 0.01, k = (d - len(a, b)) * 0.5;
      F[a].x += dx / d * k; F[a].y += dy / d * k; F[a].z += dz / d * k;
      F[b].x -= dx / d * k; F[b].y -= dy / d * k; F[b].z -= dz / d * k;
    });
    const step = 0.4 * (1 - it / 600);
    pts.forEach((p, i) => {
      p.x += Math.max(-8, Math.min(8, F[i].x * step));
      p.y += Math.max(-8, Math.min(8, F[i].y * step));
      p.z += Math.max(-8, Math.min(8, F[i].z * step));
    });
  }
  const real = pts.slice(0, n);
  const m = real.reduce((a, p) => ({ x: a.x + p.x / n, y: a.y + p.y / n, z: a.z + p.z / n }), { x: 0, y: 0, z: 0 });
  const ext = Math.max(1, ...real.map(p => Math.hypot(p.x - m.x, p.y - m.y, p.z - m.z) + p.r));
  const sc = Math.min(3, 110 / ext);
  G3[s.f] = {
    atoms: raw.nodes.map((q, i) => ({ sym: q.sym, cat: q.cat, r: q.r * sc * 0.95, x: (real[i].x - m.x) * sc, y: (real[i].y - m.y) * sc, z: (real[i].z - m.z) * sc })),
    bonds: raw.bonds,
  };
  return G3[s.f];
}
