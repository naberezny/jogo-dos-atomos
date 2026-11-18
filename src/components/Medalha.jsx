// Peças visuais das medalhas, usadas na tela de medalhas, nas fichas e nas comemorações:
// o ícone com moldura, a barra de um nível, os botões de nível e o cartão completo da medalha.
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { medalhasDe, NIVEIS, progresso } from '../data/medalhas.js';
import { useNav } from '../nav.js';
import { bySymbolFormula, sub } from '../game/logic.js';
import { REC } from '../data/subatomico.js';

const corDe = nivel => (nivel ? NIVEIS[nivel].cor : 'oklch(0.42 0.02 265)');

// Moldura de cada nível: quanto mais alto, mais detalhes (anéis, marcas, cravos, pontas e brilhos).
const MOLDURA = {
  bronze: { aneis: [37], marcas: 12, cravos: 0, pontas: 0 },
  prata: { aneis: [36.5, 40], marcas: 24, cravos: 4, pontas: 0 },
  ouro: { aneis: [36.5, 40], marcas: 36, cravos: 8, pontas: 8, brilhos: 2 },
  platina: { aneis: [36.5, 40], marcas: 48, cravos: 8, pontas: 12, giro: true, brilhos: 6 },
  exclusiva: { aneis: [37], marcas: 0, pontilhado: true, cravos: 6, pontas: 6, brilhos: 3 },
};
const pol = (r, a) => [50 + r * Math.sin(a), 50 - r * Math.cos(a)];
const estrela = (n, r1, r2, giro = 0) => Array.from({ length: n * 2 }, (_, i) => pol(i % 2 ? r2 : r1, giro + (Math.PI * i) / n).map(v => v.toFixed(2)).join(',')).join(' ');
const brilho = (x, y, r) => `M${x},${y - r} Q${x},${y} ${x + r},${y} Q${x},${y} ${x},${y + r} Q${x},${y} ${x - r},${y} Q${x},${y} ${x},${y - r}Z`;

/** Desenho da moldura (SVG 100×100) para o nível; sem nível, um anel tracejado simples. */
function Moldura({ nivel }) {
  const d = MOLDURA[nivel];
  if (!d) return <svg className="med-moldura" viewBox="0 0 100 100"><circle cx="50" cy="50" r="37" className="mm-traco" /></svg>;
  return (
    <svg className={`med-moldura mm-${nivel}`} viewBox="0 0 100 100">
      {d.pontas > 0 && <polygon className="mm-pontas" points={estrela(d.pontas, 49, 39, Math.PI / d.pontas)} />}
      {d.giro && <circle cx="50" cy="50" r="46.5" className="mm-giro" />}
      {d.pontilhado && <circle cx="50" cy="50" r="42.5" className="mm-pontos" />}
      {d.aneis.map(r => <circle key={r} cx="50" cy="50" r={r} className="mm-anel" />)}
      {Array.from({ length: d.marcas }, (_, i) => {
        const a = (2 * Math.PI * i) / d.marcas, longa = d.marcas >= 24 && i % (d.marcas / 12) === 0;
        const [x1, y1] = pol(41.5, a), [x2, y2] = pol(longa ? 46 : 44, a);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} className={longa ? 'mm-marca longa' : 'mm-marca'} />;
      })}
      {Array.from({ length: d.cravos }, (_, i) => {
        const [x, y] = pol(nivel === 'exclusiva' ? 42.5 : 45, (2 * Math.PI * i) / d.cravos);
        return <rect key={i} x={x - 2.2} y={y - 2.2} width="4.4" height="4.4" transform={`rotate(45 ${x} ${y})`} className="mm-cravo" style={{ animationDelay: `${(i * 2.4) / d.cravos}s` }} />;
      })}
      {Array.from({ length: d.brilhos || 0 }, (_, i) => {
        const [x, y] = pol(46, (2 * Math.PI * i) / d.brilhos + Math.PI / 4);
        return <path key={i} d={brilho(x, y, 4.5)} className="mm-brilho" style={{ animationDelay: `${(i * 2.4) / d.brilhos + (i % 2) * 0.7}s` }} />;
      })}
    </svg>
  );
}

/**
 * Ícone redondo da medalha: núcleo com o desenho dentro de uma moldura que fica mais elaborada
 * a cada nível. Sem nível (ainda bloqueada) fica apagado; a exclusiva bloqueada mostra "?".
 * Com `trancada`, mostra a medalha daquele nível ainda não conquistado: moldura do nível,
 * desenho apagado e um cadeado.
 */
export function MedalhaIcone({ m, nivel, tam = 56, trancada = false, cinza = false }) {
  const c = corDe(nivel);
  // Ouro, Platina e Exclusiva brilham (reflexo girando, pontas e cravos pulsando); a Platina, mais que todas.
  const brilha = !trancada && !cinza && ['ouro', 'platina', 'exclusiva'].includes(nivel);
  const cls = ['med-icone', nivel && !trancada && !cinza ? `nv-${nivel}` : '', cinza ? 'cinza' : '', nivel ? '' : 'bloq', brilha ? `brilha brilha-${nivel}` : '', trancada ? 'trancada' : ''].filter(Boolean).join(' ');
  // Cada medalha começa o reflexo num momento diferente, para não piscarem todas juntas.
  const atraso = [...(m.id || '')].reduce((a, ch) => (a * 31 + ch.charCodeAt(0)) % 997, 7) / 997 * 5;
  return (
    <span className={cls} style={{ '--c': c, '--atraso-reflexo': `${atraso.toFixed(2)}s`, width: tam, height: tam, fontSize: tam * 0.34 }} aria-hidden="true">
      <Moldura nivel={nivel} />
      <span className="med-nucleo">{nivel || !m.exclusiva ? m.icone : '?'}</span>
      {nivel && !trancada && !cinza && <span className="med-reflexo" />}
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
 * Começa em `nivelInicial` ou no nível atual (ou no Bronze, se nenhum). `children` entra no fim do cartão.
 * @param compacto versão menor, para as fichas
 */
export function CartaoMedalha({ m, p, compacto = false, foco = false, aberto, cartaoRef, onTopo, nivelInicial = null, grandes = false, children }) {
  const [esc, setEsc] = useState(nivelInicial);
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
        {grandes && <div className="med-niveis-dica mono">Toque num nível para ver o que falta</div>}
        <div className={`med-niveis${grandes ? ' grandes' : ''}`} role="group" aria-label="Níveis da medalha">
          {metas.map(([n, q]) => {
            const ok = p.tem >= q;
            return (
              <button key={n} className={`med-nv mono${ok ? ' ok' : ''}`} style={{ '--c': corDe(n) }} aria-pressed={sel === n}
                onClick={() => setEsc(n)} aria-label={`${NIVEIS[n].nome}: ${q}${ok ? ', conquistado' : ', bloqueado'}`}>
                {grandes
                  ? <><MedalhaIcone m={m} nivel={n} tam={40} cinza={!ok} /><span className="med-nv-txt">{NIVEIS[n].nome}<b>{ok ? '✓' : '🔒'} {q}</b></span></>
                  : <>{!ok && <span className="med-nv-cadeado" aria-hidden="true">🔒</span>}{NIVEIS[n].nome} <b>{q}</b></>}
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

/** Lista das descobertas de um grupo: as que faltam aparecem como "???". Com `onAbrir`, cada uma é um botão. */
export function ListaMembros({ m, set, onAbrir }) {
  return (
    <div className="med-membros">
      {m.membros.map(k => {
        if (!set.has(k)) return <span key={k} className="med-membro oculto mono">???</span>;
        const nome = m.modo === 'mol' ? bySymbolFormula(k)?.name : REC.get(k)?.name;
        const simb = m.modo === 'mol' ? sub(bySymbolFormula(k)?.d || k) : REC.get(k)?.sym;
        const conteudo = <><b className="display">{simb}</b> {nome}</>;
        return onAbrir
          ? <button key={k} className="med-membro" onClick={() => onAbrir(m.modo, k)}>{conteudo}</button>
          : <span key={k} className="med-membro">{conteudo}</span>;
      })}
    </div>
  );
}

/** Tela por cima da ficha com os detalhes completos de uma medalha, aberta no nível tocado. */
export function MedalhaDetalhe({ m, p, set, nivel, onFechar, onVerTodas, onAbrirMembro }) {
  const fechar = useRef(onFechar); fechar.current = onFechar;
  const btn = useRef(null);
  useEffect(() => {
    btn.current?.focus({ preventScroll: true });
    // Esc fecha só esta tela (escuta antes da ficha, que também fecha com Esc).
    const k = e => { if (e.key === 'Escape') { e.stopImmediatePropagation(); e.preventDefault(); fechar.current(); } };
    window.addEventListener('keydown', k, true);
    return () => window.removeEventListener('keydown', k, true);
  }, []);
  // Vai direto para o <body>: dentro da ficha (que rola e tem desfoque) o "fixo" acompanharia a rolagem.
  return createPortal(
    <div className="med-detalhe-wrap" onClick={e => { e.stopPropagation(); onFechar(); }}>
      <div className="med-detalhe" role="dialog" aria-modal="true" aria-label={`Medalha ${m.nome}`} onClick={e => e.stopPropagation()}>
        <button ref={btn} className="med-detalhe-fechar" onClick={onFechar} aria-label="Fechar">✕</button>
        <CartaoMedalha m={m} p={p} nivelInicial={m.exclusiva ? null : nivel} grandes>
          {(!m.exclusiva || p.nivel) && <>
            <div className="eyebrow med-detalhe-sub">{m.exclusiva ? 'Descoberta' : `Descobertas do grupo (${p.tem}/${p.total})`}</div>
            <ListaMembros m={m} set={set} onAbrir={onAbrirMembro} />
          </>}
        </CartaoMedalha>
        <div className="med-detalhe-acoes">
          <button className="med-detalhe-btn" onClick={onFechar}>Voltar</button>
          {onVerTodas && <button className="med-detalhe-btn sec" onClick={onVerTodas}>Tela de medalhas ›</button>}
        </div>
      </div>
    </div>,
    document.body,
  );
}

/**
 * Todos os níveis de uma medalha lado a lado, como ícones: os conquistados em cor e os que faltam
 * em cinza. Tocar num deles chama onAbrir(nível). A exclusiva ainda não ganha aparece como "?".
 */
export function NiveisMedalha({ m, p, tam = 58, onAbrir }) {
  const niveis = m.exclusiva ? [['exclusiva', 1]] : m.metas;
  return (
    <div className="med-niveis-icones" role="group" aria-label={m.exclusiva && !p.nivel ? 'Medalha exclusiva bloqueada' : m.nome}>
      {niveis.map(([n, q]) => {
        const ok = m.exclusiva ? !!p.nivel : p.tem >= q;
        const rotulo = m.exclusiva && !ok ? 'Medalha exclusiva ainda bloqueada' : `${m.nome}, ${NIVEIS[n].nome}${ok ? '' : ' (ainda não conquistada)'}`;
        return (
          <button key={n} className={`med-icone-btn${ok ? '' : ' falta'}`} title={rotulo} aria-label={rotulo} onClick={() => onAbrir(n)}>
            <MedalhaIcone m={m} nivel={m.exclusiva && !ok ? null : n} tam={tam} cinza={!ok} />
          </button>
        );
      })}
    </div>
  );
}

/**
 * Seção "Medalhas" da ficha de uma descoberta: um ícone por medalha, no nível mais alto já
 * conquistado; as que ainda não têm nenhum nível aparecem em cinza. Tocar abre os detalhes.
 * @param modo 'mol' (substância, chave = fórmula) ou 'sub' (partícula, chave = id da receita)
 * @param descobertas lista de chaves já descobertas no mesmo modo
 */
export function MedalhasDaFicha({ modo, chave, descobertas, aoAbrir }) {
  const { go } = useNav();
  const [aberta, setAberta] = useState(null);
  const lista = medalhasDe(modo, chave);
  if (!lista.length) return null;
  const set = new Set(descobertas);
  const itens = lista.map(m => ({ m, p: progresso(m, set) }));
  const sel = aberta && itens.find(x => x.m.id === aberta.id);
  return (
    <div className="med-ficha">
      <div className="eyebrow">{lista.length > 1 ? `Medalhas (${lista.length})` : 'Medalha'}</div>
      <div className="med-ficha-icones">
        {itens.map(({ m, p }) => {
          const nivel = p.nivel || (m.exclusiva ? null : 'bronze');
          const rotulo = p.nivel ? `${m.nome}, ${NIVEIS[p.nivel].nome}` : `${m.exclusiva ? 'Medalha exclusiva' : m.nome}, ainda não conquistada`;
          return (
            <button key={m.id} className={`med-icone-btn${p.nivel ? '' : ' falta'}`} title={rotulo} aria-label={rotulo}
              onClick={() => setAberta({ id: m.id, nivel: p.nivel && p.nivel !== 'exclusiva' ? p.nivel : 'bronze' })}>
              <MedalhaIcone m={m} nivel={nivel} tam={62} cinza={!p.nivel} />
            </button>
          );
        })}
      </div>
      {sel && <MedalhaDetalhe key={aberta.id} m={sel.m} p={sel.p} set={set} nivel={aberta.nivel} onFechar={() => setAberta(null)}
        onVerTodas={() => { aoAbrir?.(); setAberta(null); go('medalhas', { medalhaFoco: sel.m.id, result: null }); }} />}
    </div>
  );
}
