// Tela de medalhas: grupos (com níveis Bronze → Platina) e exclusivas, de substâncias e de partículas.
import { useEffect, useMemo, useRef, useState } from 'react';
import { MEDALHA, MEDALHAS, NIVEIS, progresso } from '../data/medalhas.js';
import PageHeader from '../components/PageHeader.jsx';
import { CartaoMedalha, ListaMembros, MedalhaIcone } from '../components/Medalha.jsx';

const ABAS = [['mol', 'Substâncias'], ['sub', 'Partículas']];
const ORDEM = ['exclusiva', 'platina', 'ouro', 'prata', 'bronze'];

function CartaoGrupo({ m, p, aberto, foco, onToggle, set, abrirFicha }) {
  const ref = useRef(null);
  useEffect(() => { if (foco) ref.current?.scrollIntoView({ block: 'center', behavior: 'smooth' }); }, [foco]);
  return (
    <CartaoMedalha m={m} p={p} foco={foco} aberto={aberto} cartaoRef={ref} onTopo={onToggle}>
      <button className="med-ver-lista" onClick={onToggle}>{aberto ? 'Esconder lista ▲' : `Ver as ${p.total} descobertas do grupo ▼`}</button>
      {aberto && <ListaMembros m={m} set={set} onAbrir={abrirFicha} />}
    </CartaoMedalha>
  );
}

function CartaoExclusiva({ m, p, foco, abrirFicha }) {
  const ref = useRef(null);
  useEffect(() => { if (foco) ref.current?.scrollIntoView({ block: 'center', behavior: 'smooth' }); }, [foco]);
  const k = m.membros[0];
  return (
    <button ref={ref} className={`med-exc${p.nivel ? '' : ' bloq'}${foco ? ' foco' : ''}`} disabled={!p.nivel || m.modo === 'sub'} onClick={() => abrirFicha(m.modo, k)}
      aria-label={p.nivel ? `${m.nome}, de ${m.grupo}. Abrir ficha` : 'Medalha exclusiva ainda bloqueada'}>
      <MedalhaIcone m={m} nivel={p.nivel} tam={66} />
      <b className="display">{p.nivel ? m.nome : '???'}</b>
      <span className="med-exc-sub">{p.nivel ? m.grupo : 'Descubra uma substância especial para revelar'}</span>
      {p.nivel && <span className="med-exc-texto">{m.texto}</span>}
    </button>
  );
}

export default function Medalhas({ game }) {
  const { st, set } = game;
  const focoId = st.medalhaFoco;
  const [aba, setAba] = useState('mol');
  const [abertos, setAbertos] = useState(() => new Set());
  const [foco, setFoco] = useState(null);
  useEffect(() => {
    // Veio de uma ficha: abre a aba e o cartão da medalha e destaca por alguns segundos.
    if (!focoId) return;
    const m = MEDALHA.get(focoId);
    if (m) { setAba(m.modo); setAbertos(s => new Set([...s, focoId])); setFoco(focoId); }
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

  const toggle = id => setAbertos(s => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const abrirFicha = (modo, k) => {
    if (modo === 'mol') set({ result: k, resultNew: false, levelUp: null });
  };

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
        <p className="med-explica">Cada descoberta do grupo conta. A primeira dá o Bronze; complete o grupo para chegar ao nível máximo. Uma mesma substância pode valer para vários grupos.</p>
        <div className="med-grade">
          {grupos.map(({ m, p }) => <CartaoGrupo key={m.id} m={m} p={p} aberto={abertos.has(m.id)} foco={foco === m.id} onToggle={() => toggle(m.id)} set={descobertas[m.modo]} abrirFicha={abrirFicha} />)}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <h3 className="display med-titulo-secao">Medalhas exclusivas <span className="mono">{exclusivas.filter(x => x.p.nivel).length}/{exclusivas.length}</span></h3>
        <p className="med-explica">Algumas descobertas famosas têm uma medalha só delas. Quais serão as que faltam?</p>
        <div className="med-grade-exc">
          {exclusivas.map(({ m, p }) => <CartaoExclusiva key={m.id} m={m} p={p} foco={foco === m.id} abrirFicha={abrirFicha} />)}
        </div>
      </div>
    </section>
  );
}
