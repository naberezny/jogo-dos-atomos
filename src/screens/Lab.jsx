import { useEffect, useRef, useState } from 'react';

function useMedia(q) {
  const [on, setOn] = useState(() => window.matchMedia(q).matches);
  useEffect(() => {
    const m = window.matchMedia(q), f = () => setOn(m.matches);
    m.addEventListener('change', f);
    return () => m.removeEventListener('change', f);
  }, [q]);
  return on;
}
import { elements, cats } from '../data/nucleo.js';
import { col, el, findMatch, reactorStatus, sub } from '../game/logic.js';
import Atom3D from '../components/Atom3D.jsx';
import ElementDrawer from './ElementDrawer.jsx';

const TONE = { idle: 'var(--muted)', ok: 'var(--accent)', near: 'var(--warn)', bad: 'var(--bad)' };
const ATOM_SCALE = 0.85;

export default function Lab({ game }) {
  const { st, set, addAtom, clearZone, fuse } = game;
  const [hovered, setHovered] = useState('C');
  const [filterCat, setFilterCat] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const small = useMedia('(max-width: 640px)');
  const atomScale = small ? 0.5 : ATOM_SCALE;

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

  return (
    <section className="lab" aria-label="Laboratório" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div className="page-head">
        <div><div className="eyebrow">Laboratório</div><h2>Reator de fusão</h2></div>
        <div style={{ fontSize: 13, color: 'var(--muted)' }}>Toque num elemento para ver a ficha e adicionar, ou arraste até o reator</div>
      </div>

      <div className="lab-top">
        <div
          ref={reactor}
          className={`reactor${dragOver ? ' over' : ''}${st.fusing ? ' fusing' : ''}`}
          onDragOver={e => { e.preventDefault(); if (!dragOver) setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={e => { e.preventDefault(); setDragOver(false); const s = e.dataTransfer.getData('text/plain'); if (s) add(s); }}
        >
          <div className="eyebrow">Área de fusão</div>
          {zoneKeys.length > 0 && !st.fusing && <button className="btn-small" onClick={clearZone}>Limpar</button>}
          {zoneKeys.length === 0 && <div className="drop-hint">Solte os átomos aqui</div>}
          <div className="zone">
            {zoneKeys.map(sym => {
              const e = el(sym), cat = cats[e.cat];
              return (
                <div className={`zone-atom${flash?.sym === sym ? ' just-added' : ''}`} key={flash?.sym === sym ? sym + flash.k : sym}>
                  <Atom3D size={Math.max(44, Math.round(e.rad * atomScale))} shells={e.shells} h={cat.h} c={cat.c} fusing={st.fusing} title={`${e.name}: camadas ${e.shells.join(' · ')}`} />
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
        </div>

        <div className="lab-side">
          <div className="status" style={{ borderColor: zoneKeys.length ? `color-mix(in oklch, ${tone} 45%, transparent)` : undefined }} aria-live="polite">
            <div className="tag" style={{ color: tone }}><span className="dot" />{st.fusing ? 'FUSÃO EM ANDAMENTO' : status.tag}</div>
            <h3>{st.fusing ? 'Combinação estável encontrada' : status.title}</h3>
            <p>{st.fusing ? 'Os átomos estão se ligando…' : status.text}</p>
            {status.missing.length > 0 && (
              <div className="chips">
                {status.missing.map(m => (
                  <button key={m.sym} className="chip" onClick={() => add(m.sym, m.n)} style={{ borderColor: col(m.cat, 0.4), background: col(m.cat, 0.1), color: col(m.cat), cursor: 'pointer' }} aria-label={`Adicionar ${m.n} de ${el(m.sym).name}`}>+{m.n} {m.sym}</button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="ptable-card">
        <div className="page-head" style={{ alignItems: 'center' }}>
          <div className="display" style={{ fontSize: 18, fontWeight: 600 }}>Tabela periódica</div>
          <div className="legend">
            {Object.keys(cats).map(k => {
              const on = filterCat === k;
              return (
                <button key={k} aria-pressed={on} onClick={() => setFilterCat(on ? null : k)} style={on ? { background: col(k, 0.18), borderColor: col(k, 0.6) } : undefined}>
                  <span className="sw" style={{ background: col(k) }} />{cats[k].name}
                </button>
              );
            })}
          </div>
        </div>
        <div className="ptable-scroll">
          <div className="ptable">
            {elements.map(e => {
              const dim = filterCat && filterCat !== e.cat;
              return (
                <div
                  key={e.sym}
                  className="cell"
                  role="button"
                  tabIndex={0}
                  aria-label={`${e.name}, ${e.z}. Ver ficha e adicionar ao reator`}
                  draggable
                  onDragStart={ev => { ev.dataTransfer.setData('text/plain', e.sym); ev.dataTransfer.effectAllowed = 'copy'; }}
                  onClick={() => open(e.sym)}
                  onKeyDown={ev => { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); open(e.sym); } }}
                  onMouseEnter={() => setHovered(e.sym)}
                  onFocus={() => setHovered(e.sym)}
                  style={{
                    gridColumn: e.col, gridRow: e.row,
                    borderColor: col(e.cat, 0.35),
                    background: col(e.cat, hovered === e.sym ? 0.24 : 0.09),
                    opacity: dim ? 0.18 : 1,
                    outline: st.zone[e.sym] ? `1.5px solid ${col(e.cat)}` : undefined,
                  }}
                >
                  <span className="z">{e.z}</span>
                  <span className="s" style={{ color: col(e.cat) }}>{e.sym}</span>
                  <span className="n">{e.name}</span>
                </div>
              );
            })}
            <div className="series" style={{ gridColumn: 3, gridRow: 6, borderColor: 'oklch(0.8 0.13 340 / 0.4)', color: 'oklch(0.8 0.13 340)' }}>57–71</div>
            <div className="series" style={{ gridColumn: 3, gridRow: 7, borderColor: 'oklch(0.8 0.14 5 / 0.4)', color: 'oklch(0.8 0.14 5)' }}>89–103</div>
          </div>
        </div>
      </div>

      {st.drawer && <ElementDrawer sym={st.drawer} discovered={st.discovered} onClose={() => set({ drawer: null })} onAdd={() => addFromDrawer(st.drawer)} inZone={st.zone[st.drawer] || 0} />}
    </section>
  );
}
