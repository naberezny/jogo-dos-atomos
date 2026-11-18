// Tela de medalhas: grupos (com níveis Bronze → Platina) e exclusivas, de substâncias e de partículas.
import { useEffect, useMemo, useRef, useState } from 'react';
import { MEDALHA, MEDALHAS, NIVEIS, progresso } from '../data/medalhas.js';
import PageHeader from '../components/PageHeader.jsx';
import { MedalhaDetalhe, NiveisMedalha } from '../components/Medalha.jsx';

const ABAS = [['mol', 'Substâncias'], ['sub', 'Partículas']];
const ORDEM = ['exclusiva', 'platina', 'ouro', 'prata', 'bronze'];

/** Bloco de uma medalha: nome e os ícones de todos os níveis (os que faltam em cinza). */
function BlocoMedalha({ m, p, foco, onAbrir }) {
  const ref = useRef(null);
  useEffect(() => { if (foco) ref.current?.scrollIntoView({ block: 'center', behavior: 'smooth' }); }, [foco]);
  const oculta = m.exclusiva && !p.nivel;
  return (
    <div ref={ref} className={`med-bloco${m.exclusiva ? ' exc' : ''}${p.nivel ? '' : ' bloq'}${foco ? ' foco' : ''}`} style={{ '--c': p.nivel ? NIVEIS[p.nivel].cor : undefined }}>
      <div className="med-bloco-topo">
        <span className="eyebrow">{oculta ? 'Exclusiva' : m.grupo}</span>
        <b className="display">{oculta ? '???' : m.nome}</b>
        {!m.exclusiva && <span className="mono med-conta">{p.tem}/{p.total}</span>}
      </div>
      <NiveisMedalha m={m} p={p} tam={m.exclusiva ? 66 : 58} onAbrir={n => onAbrir(m.id, n)} />
    </div>
  );
}

export default function Medalhas({ game }) {
  const { st, set } = game;
  const focoId = st.medalhaFoco;
  const [aba, setAba] = useState('mol');
  const [aberta, setAberta] = useState(null); // { id, nivel } da medalha com os detalhes abertos
  const [foco, setFoco] = useState(null);
  useEffect(() => {
    // Veio de uma ficha: abre a aba e o cartão da medalha e destaca por alguns segundos.
    if (!focoId) return;
    const m = MEDALHA.get(focoId);
    if (m) { setAba(m.modo); setFoco(focoId); }
    set({ medalhaFoco: null });
    const t = setTimeout(() => setFoco(null), 3500);
    return () => clearTimeout(t);
  }, [focoId, set]);

  const descobertas = useMemo(() => ({ mol: new Set(st.discovered), sub: new Set(st.subDisc || []) }), [st.discovered, st.subDisc]);
  const lista = useMemo(() => MEDALHAS.map(m => ({ m, p: progresso(m, descobertas[m.modo]) })), [descobertas]);
  const daAba = lista.filter(x => x.m.modo === aba);
  // Conquistadas primeiro (do nível mais alto ao mais baixo); entre as demais, as mais perto de destravar.
  const rank = x => (x.p.nivel ? 10 - ORDEM.indexOf(x.p.nivel) : 0);
  const grupos = daAba.filter(x => !x.m.exclusiva).sort((a, b) => rank(b) - rank(a) || b.p.tem / b.p.total - a.p.tem / a.p.total);
  const exclusivas = daAba.filter(x => x.m.exclusiva).sort((a, b) => !!b.p.nivel - !!a.p.nivel);
  const ganhas = lista.filter(x => x.p.nivel);
  const contagem = ORDEM.map(n => [n, ganhas.filter(x => x.p.nivel === n).length]);

  const abrirFicha = (modo, k) => {
    if (modo === 'mol') { setAberta(null); set({ result: k, resultNew: false, levelUp: null }); }
  };
  const abrir = (id, nivel) => setAberta({ id, nivel: nivel === 'exclusiva' ? null : nivel });
  const sel = aberta && lista.find(x => x.m.id === aberta.id);

  return (
    <section aria-label="Medalhas" className="med-tela" style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
      <PageHeader eyebrow="Coleção" title="Medalhas" sub={`${ganhas.length} de ${MEDALHAS.length} medalhas conquistadas`}>
        <div className="seg accent" role="group" aria-label="Tipo de medalha">
          {ABAS.map(([id, l]) => <button key={id} aria-pressed={aba === id} onClick={() => setAba(id)}>{l}</button>)}
        </div>
      </PageHeader>

      <div className="med-resumo">
        {contagem.map(([n, q]) => (
          <div key={n} className="med-resumo-item" style={{ '--c': NIVEIS[n].cor }}>
            <span className="med-resumo-ponto" /><b className="display">{q}</b><span>{NIVEIS[n].nome}</span>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <h3 className="display med-titulo-secao">Medalhas de grupo <span className="mono">{grupos.filter(x => x.p.nivel).length}/{grupos.length}</span></h3>
        <p className="med-explica">Cada descoberta do grupo conta. A primeira dá o Bronze; complete o grupo para chegar ao nível máximo. Toque numa medalha para ver os detalhes, inclusive dos níveis que ainda faltam.</p>
        <div className="med-grade-blocos">
          {grupos.map(({ m, p }) => <BlocoMedalha key={m.id} m={m} p={p} foco={foco === m.id} onAbrir={abrir} />)}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <h3 className="display med-titulo-secao">Medalhas exclusivas <span className="mono">{exclusivas.filter(x => x.p.nivel).length}/{exclusivas.length}</span></h3>
        <p className="med-explica">Algumas descobertas famosas têm uma medalha só delas. Quais serão as que faltam?</p>
        <div className="med-grade-blocos exc">
          {exclusivas.map(({ m, p }) => <BlocoMedalha key={m.id} m={m} p={p} foco={foco === m.id} onAbrir={abrir} />)}
        </div>
      </div>
      {sel && <MedalhaDetalhe key={aberta.id} m={sel.m} p={sel.p} set={descobertas[sel.m.modo]} nivel={aberta.nivel} onFechar={() => setAberta(null)} onAbrirMembro={sel.m.modo === 'mol' ? abrirFicha : undefined} />}
    </section>
  );
}
