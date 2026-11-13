import { useEffect, useRef, useState } from 'react';
import { bySymbolFormula, col, el, geom3d, molarMass, structure, subXP } from '../game/logic.js';
import Mol3D from '../components/Mol3D.jsx';
import Foto, { temFoto } from '../components/Foto.jsx';

const STATE = { 'gás': 'Gás', 'líquido': 'Líquido', 'sólido': 'Sólido' };

const CARGA = c => (Math.abs(c) > 1 ? Math.abs(c) : '') + (c > 0 ? '+' : '−');

function Mol2D({ s }) {
  const { nodes, bonds, u } = structure(s);
  const gap = Math.max(3.5, Math.min(6, u * 0.1));
  return (
    <div className="mol2d" role="img" aria-label={`Estrutura de ${s.name}`}>
      {bonds.flatMap(([a, b, o], i) => {
        const A = nodes[a], B = nodes[b], dx = B.x - A.x, dy = B.y - A.y, L = Math.hypot(dx, dy);
        const nx = -dy / L, ny = dx / L;
        const offs = o === 2 ? [-gap, gap] : o === 3 ? [-gap * 1.5, 0, gap * 1.5] : [0];
        return offs.map((k, j) => (
          <div key={'b' + i + '-' + j} style={{
            position: 'absolute', left: (A.x + B.x) / 2 + nx * k, top: (A.y + B.y) / 2 + ny * k, width: L, height: 0,
            borderTop: o === 0 ? '2px dashed oklch(0.55 0.05 265)' : `${o > 1 ? 2.5 : 3}px solid oklch(0.5 0.03 265)`,
            transform: `translate(-50%,-50%) rotate(${Math.atan2(dy, dx)}rad)`,
          }} />
        ));
      })}
      {nodes.map((n, i) => (
        <div key={'a' + i} className="display" style={{ position: 'absolute', left: n.x, top: n.y, width: n.r * 2, height: n.r * 2, transform: 'translate(-50%,-50%)', borderRadius: '50%', border: `2px solid ${col(n.cat)}`, background: 'oklch(0.2 0.025 265)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: Math.max(8, n.r * (n.sym === 'H' ? 0.8 : 0.68)), fontWeight: 600, color: col(n.cat) }}>
          {n.sym}
          {n.charge !== 0 && <span style={{ position: 'absolute', top: -n.r * 0.35, right: -n.r * 0.55, fontSize: Math.max(9, n.r * 0.55), color: 'var(--text-2, #cbd5e1)' }}>{CARGA(n.charge)}</span>}
        </div>
      ))}
    </div>
  );
}

export default function ResultModal({ game, onClose, toColl }) {
  const { st } = game;
  const s = bySymbolFormula(st.result);
  const foto = s && temFoto(s.f);
  const [escolha, setView] = useState(null);
  const view = escolha === 'Foto' && !foto ? '3D' : escolha || (foto ? 'Foto' : '3D');
  const views = foto ? ['Foto', '2D', '3D'] : ['2D', '3D'];
  useEffect(() => setView(null), [st.result]);
  const wrap = useRef(null);
  const cont = useRef(null);
  useEffect(() => {
    if (wrap.current) wrap.current.scrollTop = 0;
    cont.current?.focus({ preventScroll: true });
  }, [st.result]);
  useEffect(() => {
    const k = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [onClose]);
  if (!s) return null;

  return (
    <div className="modal-wrap" ref={wrap} onClick={onClose}>
      <div className="modal" role="dialog" aria-modal="true" aria-label={`${s.name} (${s.d})`} onClick={e => e.stopPropagation()}>
        <div className="modal-left">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
            <div className="eyebrow">Estrutura</div>
            <div className="seg accent">{views.map(l => <button key={l} aria-pressed={view === l} onClick={() => setView(l)}>{l}</button>)}</div>
          </div>
          {view === 'Foto' ? (
            <Foto s={s} />
          ) : view === '2D' ? (
            <>
              <Mol2D s={s} />
              <div style={{ fontSize: 12, color: 'oklch(0.66 0.02 265)', textAlign: 'center' }}>Traço duplo ou triplo = ligação dupla ou tripla · tracejado = atração iônica</div>
            </>
          ) : (
            <>
              <div style={{ width: 340, maxWidth: '100%', margin: '0 auto' }}><Mol3D key={s.f} g={geom3d(s)} label={`Modelo 3D de ${s.name}`} /></div>
              <div style={{ fontSize: 12, color: 'oklch(0.66 0.02 265)', textAlign: 'center' }}>Modelo de bolas e varetas · arraste para girar</div>
            </>
          )}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 'auto' }}>
            <div className="eyebrow">Composição</div>
            <div className="chips">
              {Object.keys(s.c).map(k => {
                const e = el(k);
                return <div key={k} className="chip" style={{ borderColor: col(e.cat, 0.3), background: col(e.cat, 0.08), fontFamily: 'inherit', whiteSpace: 'nowrap' }}><span className="display" style={{ fontWeight: 600, color: col(e.cat) }}>{k}</span> {e.name} ×{s.c[k]}</div>;
              })}
            </div>
          </div>
        </div>
        <div className="modal-right">
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <div className="badge" style={st.resultNew ? { background: 'var(--ok)', color: 'var(--ok-ink)' } : { background: 'oklch(0.28 0.025 265)', color: 'oklch(0.85 0.02 265)' }}>
              {st.resultNew ? `NOVA DESCOBERTA · +${subXP(s)} XP` : 'JÁ NA COLEÇÃO'}
            </div>
            {st.levelUp && <div className="badge" style={{ background: 'var(--warn)', color: 'oklch(0.2 0.04 65)' }}>SUBIU PARA O NÍVEL {st.levelUp}</div>}
          </div>
          <div>
            <div className="display" style={{ fontSize: 52, fontWeight: 700, lineHeight: 1, color: 'var(--accent)' }}>{s.d}</div>
            <div className="display" style={{ marginTop: 8, fontSize: 28, fontWeight: 600 }}>{s.name}</div>
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <div className="kv"><span>Estado físico (25 °C)</span><span>{STATE[s.state]}</span></div>
            <div className="kv"><span>Massa molar</span><span>{molarMass(s).toFixed(2).replace('.', ',')} g/mol</span></div>
            <div className="kv"><span>Átomos</span><span>{s.atoms}</span></div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div className="eyebrow">No dia a dia</div>
            <div style={{ fontSize: 15, lineHeight: 1.5 }}>{s.where}</div>
          </div>
          <div className="fact">
            <div className="eyebrow" style={{ color: 'var(--accent)' }}>Curiosidade</div>
            <div style={{ textWrap: 'pretty' }}>{s.fact}</div>
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 'auto', flexWrap: 'wrap' }}>
            <button className="btn btn-primary" onClick={onClose} ref={cont}>Continuar</button>
            <button className="btn btn-ghost" onClick={toColl}>Ver na coleção</button>
          </div>
        </div>
      </div>
    </div>
  );
}
