// Prótons e nêutrons do núcleo no átomo 3D (zoom da ficha do elemento), para os 118 elementos.
import { describe, expect, it } from 'vitest';
import { elements } from '../src/data/nucleo.js';
import { nucleons } from '../src/game/nucleons.js';

// Mesma conta da ficha do elemento (ElementFicha): nêutrons do isótopo mais comum ou mais estável.
const neutrons = e => Math.round(e.mass) - e.z;

describe('núcleo dos átomos', () => {
  it.each(elements.map(e => [e.sym, e]))('%s: quantidades, encaixe e sem sobreposição', (sym, e) => {
    const n = neutrons(e);
    expect(n).toBeGreaterThanOrEqual(0);
    const { pts, rb } = nucleons(e.z, n);
    expect(pts.length).toBe(e.z + n);
    expect(pts.filter(q => q.p).length).toBe(e.z);
    expect(rb).toBeGreaterThan(0);
    for (const q of pts) {
      expect([q.x, q.y, q.z].every(Number.isFinite)).toBe(true);
      // Cada bolinha inteira dentro da esfera do núcleo.
      expect(Math.hypot(q.x, q.y, q.z) + rb).toBeLessThanOrEqual(1 + 1e-9);
    }
    // Empilhamento compacto: bolinhas encostam, mas não entram umas nas outras.
    let menor = Infinity;
    for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
      menor = Math.min(menor, Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y, pts[i].z - pts[j].z));
    }
    if (pts.length > 1) expect(menor).toBeGreaterThanOrEqual(2 * rb - 1e-9);
  });

  it('é sempre o mesmo núcleo para o mesmo elemento', () => {
    const a = JSON.stringify(nucleons(26, 30)), b = JSON.stringify(nucleons(26, 30));
    expect(a).toBe(b);
  });

  it('prótons e nêutrons misturados: nenhuma metade do núcleo concentra os prótons', () => {
    for (const e of elements.filter(x => x.z >= 20)) {
      const { pts } = nucleons(e.z, neutrons(e));
      for (const eixo of ['x', 'y', 'z']) {
        const lado = pts.filter(q => q[eixo] > 0), frac = lado.filter(q => q.p).length / Math.max(1, lado.length);
        expect(Math.abs(frac - e.z / pts.length), `${e.sym} eixo ${eixo}`).toBeLessThan(0.15);
      }
    }
  });
});
