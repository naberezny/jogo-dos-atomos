import { substances } from '../data/nucleo.js';
import { fotoUrl, temFoto } from '../components/Foto.jsx';

const STATE = { 'gás': 'Gás', 'líquido': 'Líquido', 'sólido': 'Sólido' };
const FILTERS = {
  Todas: () => true,
  Descobertas: (s, d) => d.includes(s.f),
  Gases: s => s.state === 'gás',
  'Líquidos': s => s.state === 'líquido',
  'Sólidos': s => s.state === 'sólido',
};

export default function Collection({ game }) {
  const { st, set, P } = game;
  const filter = st.collFilter && FILTERS[st.collFilter] ? st.collFilter : 'Todas';
  const items = substances.map((s, i) => ({ s, i })).filter(({ s }) => FILTERS[filter](s, st.discovered));

  return (
    <section aria-label="Coleção" style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
      <div className="page-head">
        <div>
          <div className="eyebrow">Enciclopédia</div>
          <h2>Coleção de substâncias</h2>
          <div className="sub">{P.disc.length} de {substances.length} descobertas</div>
        </div>
        <div className="seg filters">
          {Object.keys(FILTERS).map(l => <button key={l} aria-pressed={filter === l} onClick={() => set({ collFilter: l })}>{l}</button>)}
        </div>
      </div>
      <div className="coll-grid">
        {items.map(({ s, i }) => {
          const k = st.discovered.includes(s.f);
          return (
            <button
              key={s.f}
              className={`sub-card${k ? ' known' : ''}`}
              disabled={!k}
              onClick={() => k && set({ result: s.f, resultNew: false, levelUp: null })}
              aria-label={k ? `${s.name}, ${s.d}. Ver detalhes` : `Substância ${i + 1} não descoberta, ${s.atoms} átomos`}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="mono" style={{ fontSize: 11, color: 'oklch(0.68 0.02 265)' }}>#{String(i + 1).padStart(2, '0')}</span>
                <span className="pill">{STATE[s.state]}</span>
              </div>
              {k && temFoto(s.f) && <img className="thumb" src={fotoUrl(s.f)} alt="" loading="lazy" decoding="async" />}
              <div className="formula">{k ? s.d : '? ? ?'}</div>
              <div style={{ fontSize: 15, fontWeight: 500, marginTop: 'auto' }}>{k ? s.name : 'Não descoberta'}</div>
              <div style={{ fontSize: 12, color: 'oklch(0.68 0.02 265)' }}>{k ? s.where : `${s.atoms} átomos · ${s.nEl} elemento${s.nEl > 1 ? 's' : ''}`}</div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
