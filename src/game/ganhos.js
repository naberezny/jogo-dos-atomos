// O que uma descoberta mudou além do XP: o avanço das medalhas da substância (ou partícula) e as
// conquistas do perfil que acabaram de ser desbloqueadas. Usado na tela de XP da comemoração.
import { medalhasDe, progresso } from '../data/medalhas.js';
import { medals, progress } from './logic.js';

const ORDEM = ['exclusiva', 'bronze', 'prata', 'ouro', 'platina'];

/**
 * Compara o estado salvo de antes com o de agora.
 * @returns {{ medalhas: Array<{ m, antes, depois, subiu }>, missoes: Array<{ m, de, ate }>, conquistas: Array }}
 *   no máximo `max` medalhas (primeiro as que ganharam um nível novo, do mais alto ao mais baixo) e
 *   `maxMissoes` missões que avançaram (primeiro as concluídas agora).
 */
export function ganhosEntre(antes, agora, max = 4, maxMissoes = 3) {
  const lista = [];
  const visto = new Set();
  for (const [modo, chave] of [['mol', 'discovered'], ['sub', 'subDisc']]) {
    const de = new Set(antes[chave] || []), ate = new Set(agora[chave] || []);
    for (const k of ate) {
      if (de.has(k)) continue;
      for (const m of medalhasDe(modo, k)) {
        if (visto.has(m.id)) continue;
        visto.add(m.id);
        const a = progresso(m, de), d = progresso(m, ate);
        if (d.tem > a.tem) lista.push({ m, antes: a, depois: d, subiu: d.nivel !== a.nivel });
      }
    }
  }
  lista.sort((x, y) => (y.subiu - x.subiu) || (ORDEM.indexOf(y.depois.nivel) - ORDEM.indexOf(x.depois.nivel)));
  const Pa = progress(antes), Pd = progress(agora);
  const ligadasAntes = new Set(medals(antes, Pa).filter(c => c.on).map(c => c.title));
  const conquistas = medals(agora, Pd).filter(c => c.on && !ligadasAntes.has(c.title));
  const vAntes = new Map(Pa.missions.map(m => [m.title, m.v]));
  const missoes = Pd.missions
    .filter(m => m.v > (vAntes.get(m.title) ?? 0))
    .map(m => ({ m, de: vAntes.get(m.title) ?? 0, ate: m.v }))
    .sort((x, y) => (y.ate >= y.m.t) - (x.ate >= x.m.t) || y.ate / y.m.t - x.ate / x.m.t);
  return { medalhas: lista.slice(0, max), missoes: missoes.slice(0, maxMissoes), conquistas };
}
