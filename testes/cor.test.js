// Cores CPK dos 118 elementos: usadas no núcleo do átomo 3D e nas bolas das moléculas.
import { describe, expect, it } from 'vitest';
import CIENCIA from '../src/data/ciencia.json';
import { elements } from '../src/data/nucleo.js';
import { corAtomo } from '../src/game/cor.js';

describe('cores CPK', () => {
  it('todo cpk em ciencia.json tem 6 dígitos hexadecimais', () => {
    const ruins = Object.entries(CIENCIA).filter(([, d]) => d.cpk != null && !/^[0-9A-Fa-f]{6}$/.test(d.cpk));
    expect(ruins.map(([s, d]) => `${s}: "${d.cpk}"`)).toEqual([]);
  });

  it.each(elements.map(e => [e.sym]))('%s tem cor com L, C e h válidos', sym => {
    const k = corAtomo(sym);
    expect(Number.isFinite(k.L) && k.L >= 0 && k.L <= 1).toBe(true);
    expect(Number.isFinite(k.C) && k.C >= 0).toBe(true);
    expect(Number.isFinite(k.h)).toBe(true);
    expect(k.hex).toMatch(/^#[0-9A-Fa-f]{6}$|^oklch\(/);
  });

  it('completa os zeros que o PubChem tira (paládio = #006985)', () => {
    expect(corAtomo('Pd').hex.toUpperCase()).toBe('#006985');
  });
});
