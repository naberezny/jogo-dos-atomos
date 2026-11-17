import { useCallback, useEffect, useMemo } from 'react';
import { useGame } from './game/useGame.js';
import { XP_PER_LEVEL } from './game/logic.js';
import { substances } from './data/nucleo.js';
import Home from './screens/Home.jsx';
import Lab from './screens/Lab.jsx';
import ResultModal from './screens/ResultModal.jsx';
import Collection from './screens/Collection.jsx';
import Subatomico from './screens/Subatomico.jsx';
import Estudos from './screens/Estudos.jsx';
import Icon from './components/Icon.jsx';
import Tour from './components/Tour.jsx';
import { ehSecao, NavCtx, SECOES } from './nav.js';
import Missions from './screens/Missions.jsx';
import Profile from './screens/Profile.jsx';

export default function App() {
  const game = useGame();
  const { st, set, P } = game;
  const xpIn = P.xp % XP_PER_LEVEL;
  const tela = ehSecao(st.screen) ? st.screen : 'home';

  // Cada troca de tela entra no histórico do navegador: o botão Voltar do celular e a seta da tela fazem o mesmo.
  const go = useCallback((screen, extra) => {
    if (!ehSecao(screen)) return;
    if (history.state?.tela !== screen) history.pushState({ tela: screen, i: (history.state?.i || 0) + 1 }, '', '#' + screen);
    set({ ...extra, screen, drawer: null });
  }, [set]);
  const back = useCallback(() => {
    if (history.state?.i > 0) history.back();
    else { history.replaceState({ tela: 'home', i: 0 }, '', '#home'); set({ screen: 'home', drawer: null }); }
  }, [set]);
  useEffect(() => {
    // Ao abrir: um link como …/#estudos leva direto à seção; senão vale a última tela salva.
    const h = location.hash.slice(1), inicial = ehSecao(h) ? h : tela;
    history.replaceState({ tela: inicial, i: 0 }, '', '#' + inicial);
    if (inicial !== st.screen) set({ screen: inicial });
    const pop = e => {
      // Sem estado salvo (endereço digitado à mão), vale o que está depois do #.
      const h = location.hash.slice(1), alvo = ehSecao(e.state?.tela) ? e.state.tela : ehSecao(h) ? h : 'home';
      if (!e.state) history.replaceState({ tela: alvo, i: 1 }, '', '#' + alvo);
      set({ screen: alvo, drawer: null, result: null });
    };
    window.addEventListener('popstate', pop);
    return () => window.removeEventListener('popstate', pop);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const nav = useMemo(() => ({ go, back }), [go, back]);

  useEffect(() => { window.scrollTo(0, 0); }, [tela]);

  return (
    <NavCtx.Provider value={nav}>
    <div className="app">
      <aside className="side">
        <button className="brand" onClick={() => go('home')} aria-label="Núcleo: ir para o início"><span className="brand-mark" aria-hidden="true" /><span className="brand-name">NÚCLEO</span></button>
        <nav className="nav" aria-label="Seções">
          {SECOES.map(s => (
            <button key={s.id} onClick={() => go(s.id)} aria-current={tela === s.id ? 'page' : undefined}>
              <Icon name={s.icon} size={20} /><span className="label" data-curto={s.curto || s.label}><span>{s.label}</span></span>
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
        {tela === 'home'
          ? <div className="brand"><span className="brand-mark" aria-hidden="true" /><span className="brand-name">NÚCLEO</span></div>
          : <button className="topo-voltar" onClick={back} aria-label="Voltar"><Icon name="back" size={20} /><span className="display">{SECOES.find(s => s.id === tela).label}</span></button>}
        <div className="lvl">
          <span className="display" style={{ fontWeight: 600, color: 'var(--fg)' }}>Nível {P.level}</span>
          <div className="bar" aria-label={`${xpIn} de ${XP_PER_LEVEL} XP`}><div style={{ width: (xpIn / XP_PER_LEVEL) * 100 + '%' }} /></div>
          <span className="mono">{P.disc.length}/{substances.length}</span>
        </div>
      </header>
      <main className="main">
        {tela === 'home' && <Home game={game} />}
        {tela === 'lab' && <Lab game={game} />}
        {tela === 'coll' && <Collection game={game} />}
        {tela === 'sub' && <Subatomico game={game} />}
        {tela === 'estudos' && <Estudos game={game} />}
        {tela === 'missions' && <Missions P={P} />}
        {tela === 'profile' && <Profile game={game} />}
      </main>
      </div>

      {st.result && <ResultModal game={game} onClose={() => set({ result: null })} toColl={() => go('coll', { result: null, collFilter: 'Todas' })} />}
      {!st.tourVisto && !st.result && <Tour onClose={() => set({ tourVisto: true })} onStart={() => go('lab', { tourVisto: true })} />}
    </div>
    </NavCtx.Provider>
  );
}
