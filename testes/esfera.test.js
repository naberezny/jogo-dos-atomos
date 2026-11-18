// Desenho das bolas 3D (átomos e moléculas) e tamanho do canvas.
import { describe, expect, it } from 'vitest';
import { elements } from '../src/data/nucleo.js';
import { corAtomo } from '../src/game/cor.js';
import { ajustaCanvas, luzGirada, pintaEsfera, rotulo } from '../src/components/esfera.js';
import { contextoFalso } from './contexto-falso.js';

describe('pintaEsfera', () => {
  // Vários ângulos: luz de frente, de lado e por trás (contraluz).
  const angulos = [0, 1, 2, 3, 4, 5, 6].map(a => luzGirada(Math.cos(a), Math.sin(a), Math.cos(a / 2), Math.sin(a / 2)));

  it.each(elements.map(e => [e.sym]))('pinta o núcleo de %s sem erro em qualquer ângulo', sym => {
    const ctx = contextoFalso(), k = corAtomo(sym);
    for (const luz of angulos) for (const prof of [0, 0.5, 1]) {
      pintaEsfera(ctx, 150, 150, 22, k, luz, prof);
      rotulo(ctx, 150, 150, 22, k, sym);
    }
  });
});

describe('ajustaCanvas', () => {
  it('ajusta também a altura quando a largura já bate (canvas nasce 300×150)', () => {
    const cv = { width: 300, height: 150 };
    ajustaCanvas(cv, 300, 300, 1);
    expect(cv).toEqual({ width: 300, height: 300 });
  });

  it('multiplica pela densidade da tela', () => {
    const cv = { width: 300, height: 150 };
    ajustaCanvas(cv, 340, 280, 2.625);
    expect(cv).toEqual({ width: 893, height: 735 });
  });

  it('não mexe no canvas que já está certo (mexer apaga o desenho)', () => {
    let escritas = 0;
    const cv = { _w: 600, _h: 600, get width() { return this._w; }, set width(v) { escritas++; this._w = v; }, get height() { return this._h; }, set height(v) { escritas++; this._h = v; } };
    ajustaCanvas(cv, 300, 300, 2);
    expect(escritas).toBe(0);
  });
});
