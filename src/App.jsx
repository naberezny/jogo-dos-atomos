import { useEffect } from 'react';
import { useGame } from './game/useGame.js';
import { XP_PER_LEVEL } from './game/logic.js';
import { substances } from './data/nucleo.js';
import Home from './screens/Home.jsx';
import Lab from './screens/Lab.jsx';
import ResultModal from './screens/ResultModal.jsx';
import Collection from './screens/Collection.jsx';
import Missions from './screens/Missions.jsx';
import Profile from './screens/Profile.jsx';

const NAV = [
  ['home', 'Início', '00'],
  ['lab', 'Laboratório', '01'],
  ['coll', 'Coleção', '02'],
  ['missions', 'Missões', '03'],
  ['profile', 'Perfil', '04'],
];

export default function App() {
  const game = useGame();
  const { st, set, P } = game;
  const go = screen => set({ screen, drawer: null });
  const xpIn = P.xp % XP_PER_LEVEL;

  useEffect(() => { window.scrollTo(0, 0); }, [st.screen]);

  return (
    <div className="app">
      <aside className="side">
        <div className="brand"><span className="brand-mark" aria-hidden="true" /><span className="brand-name">NÚCLEO</span></div>
        <nav className="nav" aria-label="Seções">
          {NAV.map(([id, label, code]) => (
            <button key={id} onClick={() => go(id)} aria-current={st.screen === id ? 'page' : undefined}>
              <span className="code">{code}</span><span className="label">{label}</span>
            </button>
          ))}
        </nav>
        <div className="xpbox">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span className="display" style={{ fontWeight: 600, fontSize: 15 }}>Nível {P.level}</span>
            <span className="mono" style={{ fontSize: 11, color: 'var(--muted)' }}>{xpIn}/{XP_PER_LEVEL} XP</span>
          </div>
          <div className="bar"><div style={{ width: (xpIn / XP_PER_LEVEL) * 100 + '%' }} /></div>
          <div style={{ fontSize: 12, color: 'var(--muted)' }}>{P.disc.length} de {substances.length} substâncias</div>
        </div>
      </aside>

      <div style={{ minWidth: 0 }}>
      <header className="mobile-top">
        <div className="brand"><span className="brand-mark" aria-hidden="true" /><span className="brand-name">NÚCLEO</span></div>
        <div className="lvl">
          <span className="display" style={{ fontWeight: 600, color: 'var(--fg)' }}>Nível {P.level}</span>
          <div className="bar" aria-label={`${xpIn} de ${XP_PER_LEVEL} XP`}><div style={{ width: (xpIn / XP_PER_LEVEL) * 100 + '%' }} /></div>
          <span className="mono">{P.disc.length}/{substances.length}</span>
        </div>
      </header>
      <main className="main">
        {st.screen === 'home' && <Home P={P} go={go} />}
        {st.screen === 'lab' && <Lab game={game} />}
        {st.screen === 'coll' && <Collection game={game} />}
        {st.screen === 'missions' && <Missions P={P} />}
        {st.screen === 'profile' && <Profile game={game} />}
      </main>
      </div>

      {st.result && <ResultModal game={game} onClose={() => set({ result: null })} toColl={() => set({ result: null, screen: 'coll', collFilter: 'Todas' })} />}
    </div>
  );
}
