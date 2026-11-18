// Peças visuais das medalhas, usadas na tela de medalhas, nas fichas e nas comemorações:
// o ícone com moldura, a barra de um nível, os botões de nível e o cartão completo da medalha.
import { useState } from 'react';
import { medalhasDe, NIVEIS, progresso } from '../data/medalhas.js';
import { useNav } from '../nav.js';

const corDe = nivel => (nivel ? NIVEIS[nivel].cor : 'oklch(0.42 0.02 265)');

/**
 * Ícone redondo da medalha: núcleo com o desenho e uma moldura de marcas na cor do nível.
 * Sem nível (ainda bloqueada) fica apagado; a exclusiva bloqueada mostra "?".
 * Com `trancada`, mostra a medalha daquele nível ainda não conquistado: moldura na cor do nível,
 * desenho apagado e um cadeado.
 */
export function MedalhaIcone({ m, nivel, tam = 56, trancada = false }) {
  const c = corDe(nivel);
  const cls = ['med-icone', nivel ? '' : 'bloq', nivel === 'platina' && !trancada ? 'platina' : '', trancada ? 'trancada' : ''].filter(Boolean).join(' ');
  return (
    <span className={cls} style={{ '--c': c, width: tam, height: tam, fontSize: tam * 0.4 }} aria-hidden="true">
      <span className="med-moldura" />
      <span className="med-nucleo">{nivel || !m.exclusiva ? m.icone : '?'}</span>
      {trancada && <span className="med-cadeado">🔒</span>}
    </span>
  );
}

/** Etiqueta do nível ("Ouro", "Exclusiva"…). */
export const NivelTag = ({ nivel }) => nivel
  ? <span className="med-nivel mono" style={{ '--c': corDe(nivel) }}>{NIVEIS[nivel].nome}</span>
  : <span className="med-nivel mono bloq">Bloqueada</span>;

/** Barra do progresso rumo a um nível (tem/meta), na cor desse nível. */
export function MedalhaBarra({ p, nivel, meta }) {
  const frac = Math.min(1, p.tem / meta);
  return (
    <div className="med-barra" style={{ '--c': corDe(nivel) }} role="img" aria-label={`${Math.min(p.tem, meta)} de ${meta} para ${NIVEIS[nivel].nome}`}>
      <div className="med-barra-fill" style={{ width: frac * 100 + '%' }} />
    </div>
  );
}

const coisa = (m, n) => (m.modo === 'mol' ? (n === 1 ? 'substância' : 'substâncias') : (n === 1 ? 'descoberta' : 'descobertas'));

/** Texto curto do que falta para o próximo nível. */
export function textoProgresso(m, p) {
  if (m.exclusiva) return p.nivel ? 'Medalha exclusiva desta descoberta.' : 'Medalha exclusiva de uma descoberta especial.';
  if (p.max) return `Grupo completo! Você tem ${p.total === 2 ? 'as duas' : `todas as ${p.total}`}.`;
  if (!p.tem) return `Descubra qualquer uma das ${p.total} ${coisa(m, p.total)} deste grupo para ganhar o Bronze.`;
  const resto = p.total - p.tem;
  const base = `${resto === 1 ? `Mais 1 ${coisa(m, 1)} faz` : `Mais ${resto} ${coisa(m, resto)} fazem`} parte deste grupo.`;
  return `${base} ${p.prox.faltam === 1 ? 'Falta 1' : `Faltam ${p.prox.faltam}`} para ${NIVEIS[p.prox.nivel].nome}.`;
}

/** Texto do nível escolhido nos botões: já conquistado ou quanto falta. */
function textoNivel(m, p, nivel, meta) {
  const nome = NIVEIS[nivel].nome, fem = nivel === 'prata' || nivel === 'platina';
  if (p.tem >= meta) return nivel === m.metas[m.metas.length - 1][0] ? textoProgresso(m, p) : `${nome} ${fem ? 'conquistada' : 'conquistado'}! Você tem ${p.tem} de ${p.total} do grupo.`;
  const f = meta - p.tem, quantas = meta === p.total ? `${p.total === 2 ? 'as duas' : `todas as ${p.total}`} do grupo` : `${meta} das ${p.total} do grupo`;
  return `${f === 1 ? `Falta 1 ${coisa(m, 1)}` : `Faltam ${f} ${coisa(m, f)}`} para ${fem ? 'a' : 'o'} ${nome}: ${quantas}.`;
}

/**
 * Cartão de uma medalha (tela de medalhas e fichas). Nas de grupo, cada nível é um botão:
 * o ícone, a barra e o texto mostram o nível escolhido, mesmo que ainda não conquistado.
 * Começa no nível atual (ou no Bronze, se nenhum). `children` entra no fim do cartão.
 * @param compacto versão menor, para as fichas
 */
export function CartaoMedalha({ m, p, compacto = false, foco = false, aberto, cartaoRef, onTopo, children }) {
  const [esc, setEsc] = useState(null);
  const metas = m.exclusiva ? [] : m.metas;
  const sel = esc || p.nivel || metas[0]?.[0] || 'exclusiva';
  const meta = metas.find(([n]) => n === sel)?.[1] ?? 1;
  const trancada = !m.exclusiva && p.tem < meta;
  const icone = <MedalhaIcone m={m} nivel={m.exclusiva ? p.nivel : sel} tam={compacto ? 60 : 76} trancada={trancada} />;
  const info = (
    <span className="med-card-info">
      <span className="eyebrow">{m.grupo}</span>
      <b className="display med-card-nome">{m.exclusiva && !p.nivel ? '???' : m.nome}</b>
      <span className="med-card-linha"><NivelTag nivel={p.nivel} />{!m.exclusiva && <span className="mono med-conta">{p.tem}/{p.total}</span>}</span>
    </span>
  );
  return (
    <div ref={cartaoRef} className={`med-card${compacto ? ' compacto' : ''}${p.nivel ? '' : ' bloq'}${foco ? ' foco' : ''}${aberto ? ' aberto' : ''}`}
      style={{ '--c': corDe(p.nivel || (m.exclusiva ? null : sel)), '--sel': corDe(sel) }}>
      {onTopo
        ? <button className="med-card-topo" onClick={onTopo} aria-expanded={aberto}>{icone}{info}</button>
        : <div className="med-card-topo">{icone}{info}</div>}
      <p className="med-card-texto">{m.texto}</p>
      {!m.exclusiva && <>
        <MedalhaBarra p={p} nivel={sel} meta={meta} />
        <div className="med-niveis" role="group" aria-label="Níveis da medalha">
          {metas.map(([n, q]) => {
            const ok = p.tem >= q;
            return (
              <button key={n} className={`med-nv mono${ok ? ' ok' : ''}`} style={{ '--c': corDe(n) }} aria-pressed={sel === n}
                onClick={() => setEsc(n)} aria-label={`${NIVEIS[n].nome}: ${q}${ok ? ', conquistado' : ', bloqueado'}`}>
                {!ok && <span className="med-nv-cadeado" aria-hidden="true">🔒</span>}{NIVEIS[n].nome} <b>{q}</b>
              </button>
            );
          })}
        </div>
      </>}
      <div className="med-card-prog">{m.exclusiva ? textoProgresso(m, p) : textoNivel(m, p, sel, meta)}</div>
      {children}
    </div>
  );
}

/**
 * Seção "Medalhas" da ficha de uma descoberta, com os mesmos cartões da tela de medalhas.
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
      {lista.map(m => (
        <CartaoMedalha key={m.id} m={m} p={progresso(m, set)} compacto>
          <button className="med-ver-lista" onClick={() => { aoAbrir?.(); go('medalhas', { medalhaFoco: m.id, result: null }); }}>Ver na tela de medalhas ›</button>
        </CartaoMedalha>
      ))}
    </div>
  );
}
