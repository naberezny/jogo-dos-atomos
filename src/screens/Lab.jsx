import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

import { cats } from '../data/nucleo.js';
import useMedia from '../hooks/useMedia.js';
import { col, el, findMatch, FUSE_CHARGE, fusable, fuseMs, reactorStatus, sub } from '../game/logic.js';
import Atom3D from '../components/Atom3D.jsx';
import FusionFX from '../components/FusionFX.jsx';
import PeriodicTable from '../components/PeriodicTable.jsx';
import PageHeader from '../components/PageHeader.jsx';
import StatusPanel from '../components/StatusPanel.jsx';
import BotaoDica from '../components/BotaoDica.jsx';
import ElementDrawer from './ElementDrawer.jsx';

const TONE = { idle: 'var(--muted)', ok: 'var(--accent)', near: 'var(--warn)', bad: 'var(--bad)' };
const ATOM_SCALE = 0.85;

export default function Lab({ game }) {
  const { st, set, addAtom, clearZone, fuse } = game;
  const [hovered, setHovered] = useState('C');
  const [dragOver, setDragOver] = useState(false);
  const small = useMedia('(max-width: 640px)');
  const atomScale = small ? 0.4 : ATOM_SCALE;
  // No celular as dicas ficam recolhidas num botão, para o reator e a tabela caberem juntos na tela.
  const [dica, setDica] = useState(false);

  const reactor = useRef(null);
  const [flash, setFlash] = useState(null);
  const add = (sym, d = 1) => { addAtom(sym, d); setHovered(sym); };
  const open = sym => { setHovered(sym); set({ drawer: sym }); };
  // Botão da ficha: adiciona, fecha e, se o reator estiver fora da tela (celular), rola até ele.
  const addFromDrawer = sym => {
    add(sym);
    set({ drawer: null });
    setFlash({ sym, k: Date.now() });
    requestAnimationFrame(() => {
      const r = reactor.current?.getBoundingClientRect();
      if (r && (r.top < 60 || r.bottom > window.innerHeight - 80)) reactor.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  };
  useEffect(() => {
    if (!flash) return;
    const t = setTimeout(() => setFlash(null), 1200);
    return () => clearTimeout(t);
  }, [flash]);
  const zoneKeys = Object.keys(st.zone);
  const match = findMatch(st.zone);
  const status = reactorStatus(st.zone, st.discovered, true);
  const tone = st.fusing ? 'var(--ok)' : TONE[status.tone];
  const acesos = useMemo(() => fusable(st.zone), [st.zone]);
  const painel = {
    tom: tone,
    destacado: zoneKeys.length > 0,
    tag: st.fusing ? 'FUSÃO EM ANDAMENTO' : status.tag,
    title: st.fusing ? 'Combinação estável encontrada' : status.title,
    text: st.fusing ? 'Os átomos estão se ligando…' : status.text,
    chips: st.fusing ? [] : status.missing.map(m => ({ key: m.sym, label: `+${m.n} ${m.sym}`, cor: col(m.cat), onClick: () => add(m.sym, m.n), aria: `Adicionar ${m.n} de ${el(m.sym).name}` })),
  };
  const reduced = useMedia('(prefers-reduced-motion: reduce)');
  const ms = fuseMs();
  // Ao fundir, cada átomo é puxado até o centro do reator: mede a distância que cada um precisa percorrer.
  useLayoutEffect(() => {
    if (!st.fusing || !reactor.current) return;
    const r = reactor.current.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    reactor.current.querySelectorAll('.atom-wrap').forEach((a, i) => {
      const b = a.getBoundingClientRect();
      a.style.setProperty('--dx', `${cx - (b.left + b.width / 2)}px`);
      a.style.setProperty('--dy', `${cy - (b.top + b.height / 2)}px`);
      a.style.setProperty('--giro', `${i % 2 ? -260 : 260}deg`);
    });
  }, [st.fusing]);

  return (
    <section className={`lab${small ? ' movel' : ''}`} aria-label="Laboratório" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <PageHeader eyebrow="Laboratório" title="Reator de fusão" sub="Arraste um elemento até o reator, ou clique nele para ver a ficha e adicionar" />

      <div className="lab-top">
        <div
          ref={reactor}
          className={`reactor${dragOver ? ' over' : ''}${st.fusing ? ' fusing' : ''}`}
          style={{ '--t-fusao': `${ms}ms`, '--t-carga': `${ms * FUSE_CHARGE}ms` }}
        >
          <div className="eyebrow">Área de fusão</div>
          {zoneKeys.length > 0 && !st.fusing && <button className="btn-small" onClick={clearZone}>Limpar</button>}
          {small && !st.fusing && (
            <BotaoDica tom={tone} aberto={dica} chama={status.tone === 'near' || status.tone === 'bad'} resumo={status.missing.map(m => `+${m.n} ${m.sym}`).join(' ')} onClick={() => setDica(d => !d)} />
          )}
          {small && dica && !st.fusing && <StatusPanel {...painel} className="dica-painel" onClose={() => setDica(false)} />}
          {zoneKeys.length === 0 && <div className="drop-hint">{small ? 'Segure um elemento e arraste até aqui' : 'Arraste os átomos até aqui'}</div>}
          <div className="zone">
            {zoneKeys.map(sym => {
              const e = el(sym), cat = cats[e.cat];
              return (
                <div className={`zone-atom${flash?.sym === sym ? ' just-added' : ''}`} key={flash?.sym === sym ? sym + flash.k : sym}>
                  <div className="atom-wrap">
                    <Atom3D size={Math.max(small ? 38 : 44, Math.round(e.rad * atomScale))} shells={e.shells} h={cat.h} c={cat.c} fusing={st.fusing} title={`${e.name}: camadas ${e.shells.join(' · ')}`} />
                  </div>
                  <span className="mono" style={{ fontSize: 12, color: 'oklch(0.9 0.01 265)' }}>{sym} ×{st.zone[sym]}</span>
                  <div className="steppers">
                    <button className="btn-step" onClick={() => add(sym, -1)} aria-label={`Remover um átomo de ${e.name}`}>−</button>
                    <button className="btn-step" onClick={() => add(sym, 1)} aria-label={`Adicionar um átomo de ${e.name}`}>+</button>
                    <button className="btn-step wide" onClick={() => add(sym, 5)} aria-label={`Adicionar cinco átomos de ${e.name}`}>+5</button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="zone-formula" aria-live="polite">{zoneKeys.length ? sub(zoneKeys.map(k => k + (st.zone[k] > 1 ? st.zone[k] : '')).join('')) : ''}</div>
          {match && <button className="btn-fuse" onClick={fuse} disabled={st.fusing}>{st.fusing ? 'FUNDINDO…' : 'FUNDIR'}</button>}
          {st.fusing && !reduced && <FusionFX ms={ms} charge={FUSE_CHARGE} hues={zoneKeys.map(k => cats[el(k).cat])} />}
          {st.fusing && match && <div className="fusion-formula" aria-hidden="true">{sub(match.f)}</div>}
        </div>

        {!small && <div className="lab-side"><StatusPanel {...painel} /></div>}
      </div>

      <PeriodicTable
        onPick={open}
        selected={st.drawer}
        isOff={sym => !acesos.has(sym)}
        isMarked={sym => !!st.zone[sym]}
        soltarEm={reactor}
        onSoltar={sym => { add(sym); setFlash({ sym, k: Date.now() }); }}
        onSobre={setDragOver}
        compacta={small}
        acao="Ver ficha e adicionar ao reator"
      />

      {st.drawer && <ElementDrawer sym={st.drawer} discovered={st.discovered} onClose={() => set({ drawer: null })} onAdd={() => addFromDrawer(st.drawer)} inZone={st.zone[st.drawer] || 0} />}
    </section>
  );
}
