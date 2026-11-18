// Medalhas e conquistas mostradas na tela de XP depois de uma descoberta.
import { describe, expect, it } from 'vitest';
import { ganhosEntre } from '../src/game/ganhos.js';

const base = { discovered: ['H2O', 'O2', 'CO2'], subDisc: [], fusions: 3, usedEls: ['H', 'O', 'C'], nobleTried: false };

describe('ganhosEntre', () => {
  it('nada muda quando nada foi descoberto', () => {
    expect(ganhosEntre(base, base)).toEqual({ medalhas: [], missoes: [], conquistas: [] });
  });

  it('nova substância avança as medalhas dela e a exclusiva vem como nível novo', () => {
    const g = ganhosEntre(base, { ...base, discovered: [...base.discovered, 'NaCl'] });
    expect(g.medalhas.length).toBeGreaterThan(0);
    for (const x of g.medalhas) expect(x.depois.tem).toBe(x.antes.tem + 1);
    // As que subiram de nível vêm antes das que só avançaram.
    const i = g.medalhas.findIndex(x => !x.subiu);
    if (i >= 0) expect(g.medalhas.slice(i).every(x => !x.subiu)).toBe(true);
  });

  it('mostra no máximo 4 medalhas', () => {
    const g = ganhosEntre(base, { ...base, discovered: [...base.discovered, 'NaCl', 'CH4', 'NH3', 'C2H6O', 'C6H12O6'] });
    expect(g.medalhas.length).toBeLessThanOrEqual(4);
  });

  it('missões que avançaram, no máximo 3, concluídas primeiro', () => {
    const g = ganhosEntre(base, { ...base, discovered: [...base.discovered, 'NaCl', 'CH4', 'NH3', 'N2', 'H2'] });
    expect(g.missoes.length).toBeGreaterThan(0);
    expect(g.missoes.length).toBeLessThanOrEqual(3);
    for (const x of g.missoes) expect(x.ate).toBeGreaterThan(x.de);
    const i = g.missoes.findIndex(x => x.ate < x.m.t);
    if (i >= 0) expect(g.missoes.slice(i).every(x => x.ate < x.m.t)).toBe(true);
  });

  it('desbloqueia a conquista da primeira fusão', () => {
    const antes = { ...base, fusions: 0 }, agora = { ...base, fusions: 1, discovered: [...base.discovered, 'NaCl'] };
    expect(ganhosEntre(antes, agora).conquistas.map(c => c.title)).toContain('Primeira fusão');
  });
});
