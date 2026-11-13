// Confere o catálogo: fórmulas repetidas, elementos inexistentes, limite de 30 átomos por elemento.
const { substances, elements } = await import(new URL("../src/data/nucleo.js", import.meta.url));
const k = c => Object.keys(c).sort().map(x => x + c[x]).join('|');
const seen = new Map(); let bad = 0;
const syms = new Set(elements.map(e => e.sym));
for (const s of substances) {
  const key = k(s.c);
  if (seen.has(key)) { console.log('DUPLICADA', s.f, seen.get(key)); bad++; }
  seen.set(key, s.f);
  for (const e in s.c) { if (!syms.has(e)) { console.log('ELEMENTO?', s.f, e); bad++; } if (s.c[e] > 30) { console.log('>30', s.f, e); bad++; } }
  if (!['gás','líquido','sólido'].includes(s.state)) { console.log('ESTADO', s.f); bad++; }
}
console.log('total', substances.length, 'problemas', bad);
