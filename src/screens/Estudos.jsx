// Estudos: a tabela periódica e a ficha completa de cada elemento, sem o reator.
import { useMemo, useState } from 'react';
import { elements, cats } from '../data/nucleo.js';
import { col, el } from '../game/logic.js';
import useMedia from '../hooks/useMedia.js';
import PeriodicTable from '../components/PeriodicTable.jsx';
import ElementFicha from '../components/ElementFicha.jsx';
import ElementDrawer from './ElementDrawer.jsx';

const semAcento = s => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

export default function Estudos({ game }) {
  const { st, set } = game;
  const sym = el(st.estudo) ? st.estudo : 'H';
  const [busca, setBusca] = useState('');
  const [gaveta, setGaveta] = useState(false);
  // Em telas largas a ficha fica fixa ao lado da tabela; nas estreitas, abre como gaveta.
  const largo = useMedia('(min-width: 1180px)');

  const achados = useMemo(() => {
    const q = semAcento(busca.trim());
    if (!q) return null;
    return new Set(elements.filter(e => semAcento(e.name).includes(q) || e.sym.toLowerCase() === q || String(e.z) === q || semAcento(cats[e.cat].name).includes(q)).map(e => e.sym));
  }, [busca]);

  const escolher = s => { set({ estudo: s }); if (!largo) setGaveta(true); };
  const t = el(sym);
  const porZ = useMemo(() => elements.slice().sort((a, b) => a.z - b.z), []);
  const vizinho = d => porZ[(t.z - 1 + d + porZ.length) % porZ.length].sym;

  return (
    <section aria-label="Estudos" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div className="page-head">
        <div>
          <div className="eyebrow">Estudos</div>
          <h2>Tabela periódica</h2>
          <div className="sub">Os 118 elementos, com eletrosfera em 3D, história e propriedades. Toque num elemento para ver a ficha.</div>
        </div>
        <form className="busca" role="search" onSubmit={ev => { ev.preventDefault(); const p = achados && elements.find(e => achados.has(e.sym)); if (p) escolher(p.sym); }}>
          <input type="search" value={busca} onChange={ev => setBusca(ev.target.value)} placeholder="Buscar por nome, símbolo ou número" aria-label="Buscar elemento" />
          {achados && <span className="mono">{achados.size}</span>}
        </form>
      </div>

      <div className={`estudos${largo ? ' largo' : ''}`}>
        <PeriodicTable onPick={escolher} selected={sym} isOff={achados ? s => !achados.has(s) : undefined} />
        {largo && (
          <aside className="ficha-painel" aria-label={`Ficha de ${t.name}`} style={{ borderColor: col(t.cat, 0.5) }}>
            <div className="drawer-head">
              <div className="eyebrow">Ficha do elemento</div>
              <div style={{ display: 'flex', gap: 6 }}>
                <button className="icon-btn" onClick={() => escolher(vizinho(-1))} aria-label="Elemento anterior">‹</button>
                <button className="icon-btn" onClick={() => escolher(vizinho(1))} aria-label="Próximo elemento">›</button>
              </div>
            </div>
            <ElementFicha sym={sym} discovered={st.discovered} />
          </aside>
        )}
      </div>

      {!largo && gaveta && <ElementDrawer sym={sym} discovered={st.discovered} onClose={() => setGaveta(false)} />}
    </section>
  );
}
