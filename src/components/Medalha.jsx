// Peças visuais das medalhas: o ícone redondo colorido pelo nível e a seção "Medalhas" da ficha.
import { medalhasDe, NIVEIS, progresso } from '../data/medalhas.js';
import { useNav } from '../nav.js';

const corDe = nivel => (nivel ? NIVEIS[nivel].cor : 'oklch(0.42 0.02 265)');

/** Ícone redondo da medalha. Sem nível (ainda bloqueada) fica apagado; a exclusiva bloqueada mostra "?". */
export function MedalhaIcone({ m, nivel, tam = 56 }) {
  const c = corDe(nivel);
  return (
    <span className={`med-icone${nivel ? '' : ' bloq'}${nivel === 'platina' ? ' platina' : ''}`} style={{ '--c': c, width: tam, height: tam, fontSize: tam * 0.48 }} aria-hidden="true">
      {nivel || !m.exclusiva ? m.icone : '?'}
    </span>
  );
}

/** Etiqueta do nível ("Ouro", "Exclusiva"…). */
export const NivelTag = ({ nivel }) => nivel
  ? <span className="med-nivel mono" style={{ '--c': corDe(nivel) }}>{NIVEIS[nivel].nome}</span>
  : <span className="med-nivel mono bloq">Bloqueada</span>;

/** Barra do grupo com marcas de cada nível. */
export function MedalhaBarra({ m, p }) {
  return (
    <div className="med-barra" role="img" aria-label={`${p.tem} de ${p.total}`}>
      <div className="med-barra-fill" style={{ width: (p.tem / p.total) * 100 + '%', '--c': corDe(p.nivel || 'bronze') }} />
      {m.metas.slice(1, -1).map(([n, q]) => <span key={n} className="med-marca" style={{ left: (q / p.total) * 100 + '%', '--c': corDe(n) }} title={`${NIVEIS[n].nome}: ${q}`} />)}
    </div>
  );
}

/** Texto curto do que falta para o próximo nível. */
export function textoProgresso(m, p) {
  if (m.exclusiva) return p.nivel ? 'Medalha exclusiva desta descoberta.' : 'Medalha exclusiva de uma descoberta especial.';
  const coisa = n => (m.modo === 'mol' ? (n === 1 ? 'substância' : 'substâncias') : (n === 1 ? 'descoberta' : 'descobertas'));
  if (p.max) return `Grupo completo! Você tem ${p.total === 2 ? 'as duas' : `todas as ${p.total}`}.`;
  if (!p.tem) return `Descubra qualquer uma das ${p.total} ${coisa(p.total)} deste grupo para ganhar o Bronze.`;
  const resto = p.total - p.tem;
  const base = `${resto === 1 ? `Mais 1 ${coisa(1)} faz` : `Mais ${resto} ${coisa(resto)} fazem`} parte deste grupo.`;
  return `${base} ${p.prox.faltam === 1 ? 'Falta 1' : `Faltam ${p.prox.faltam}`} para ${NIVEIS[p.prox.nivel].nome}.`;
}

/**
 * Seção "Medalhas" da ficha de uma descoberta.
 * @param modo 'mol' (substância, chave = fórmula) ou 'sub' (partícula, chave = id da receita)
 * @param descobertas lista de chaves já descobertas no mesmo modo
 */
export function MedalhasDaFicha({ modo, chave, descobertas, aoAbrir }) {
  const { go } = useNav();
  const lista = medalhasDe(modo, chave);
  if (!lista.length) return null;
  const set = new Set(descobertas);
  return (
    <div className="med-ficha">
      <div className="eyebrow">{lista.length > 1 ? `Medalhas (${lista.length})` : 'Medalha'}</div>
      {lista.map(m => {
        const p = progresso(m, set);
        return (
          <button key={m.id} className="med-ficha-item" style={{ '--c': corDe(p.nivel) }} onClick={() => { aoAbrir?.(); go('medalhas', { medalhaFoco: m.id, result: null }); }} aria-label={`${m.nome} ${p.nivel ? NIVEIS[p.nivel].nome : ''}. Ver medalhas`}>
            <MedalhaIcone m={m} nivel={p.nivel} tam={52} />
            <span className="med-ficha-txt">
              <span className="med-ficha-topo">
                <b className="display">{m.nome}</b>
                <NivelTag nivel={p.nivel} />
                {!m.exclusiva && <span className="mono med-conta">{p.tem}/{p.total}</span>}
              </span>
              <span className="med-ficha-texto">{m.texto}</span>
              {!m.exclusiva && <MedalhaBarra m={m} p={p} />}
              <span className="med-ficha-prog">{textoProgresso(m, p)} <span className="med-ver">Ver medalhas ›</span></span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
