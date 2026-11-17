// Cores dos átomos nos modelos moleculares: o padrão CPK que os químicos usam (carbono cinza,
// hidrogênio branco, oxigênio vermelho, nitrogênio azul...), em OKLCH para o sombreamento 3D.
import CIENCIA from '../data/ciencia.json';
import { cats, elements } from '../data/nucleo.js';

// Elementos sem cor na tabela de dados: valor do padrão dos visualizadores moleculares (Jmol).
const EXTRA = { Er: '00E675' };
const CAT = new Map(elements.map(e => [e.sym, e.cat]));

const lin = v => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
/** '3050F8' → { L, C, h } em OKLCH. */
function oklch(hex) {
  const [r, g, b] = [0, 2, 4].map(i => lin(parseInt(hex.slice(i, i + 2), 16) / 255));
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
  const A = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
  const B = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
  return { L, C: Math.hypot(A, B), h: ((Math.atan2(B, A) * 180) / Math.PI + 360) % 360 };
}

const CACHE = new Map();
/** Cor CPK de um elemento: { hex, L, C, h }. Sem dado, usa a cor da família do elemento. */
export function corAtomo(sym) {
  if (CACHE.has(sym)) return CACHE.get(sym);
  const hex = CIENCIA[sym]?.cpk || EXTRA[sym];
  const k = cats[CAT.get(sym)];
  const cor = hex ? { hex: '#' + hex, ...oklch(hex) } : { hex: `oklch(0.8 ${k.c} ${k.h})`, L: 0.8, C: k.c, h: k.h };
  CACHE.set(sym, cor);
  return cor;
}
