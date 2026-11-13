// Confere o catálogo (use --geometria para calcular também as posições 2D/3D): fórmulas repetidas, elementos inexistentes, limite de 30 átomos por elemento.
const { substances, elements } = await import(new URL("../src/data/nucleo.js", import.meta.url));
const { default: SMILES } = await import(new URL("../src/data/estruturas.js", import.meta.url));
const { contarAtomos, molecula } = await import(new URL("../src/game/estrutura.js", import.meta.url));
const k = c => Object.keys(c).sort().map(x => x + c[x]).join('|');
const seen = new Map(); let bad = 0;
const syms = new Set(elements.map(e => e.sym));
for (const s of substances) {
  const key = k(s.c);
  if (seen.has(key)) { console.log('DUPLICADA', s.f, seen.get(key)); bad++; }
  seen.set(key, s.f);
  for (const e in s.c) { if (!syms.has(e)) { console.log('ELEMENTO?', s.f, e); bad++; } if (s.c[e] > 30) { console.log('>30', s.f, e); bad++; } }
  // Ligações reais: o SMILES precisa ter exatamente os átomos da fórmula.
  if (!SMILES[s.f]) { console.log('SEM LIGAÇÕES', s.f); bad++; }
  else {
    try {
      const c = contarAtomos(SMILES[s.f]);
      if (k(c) !== key) { console.log('LIGAÇÕES ≠ FÓRMULA', s.f, k(c)); bad++; }
      if (process.argv.includes('--geometria')) molecula(s.f);
    } catch (e) { console.log('SMILES', s.f, e.message); bad++; }
  }
  if (!['gás','líquido','sólido'].includes(s.state)) { console.log('ESTADO', s.f); bad++; }
}
console.log('total', substances.length, 'problemas', bad);
