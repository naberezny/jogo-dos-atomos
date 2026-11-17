import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { bySymbolFormula, col, el, subXP } from './game/logic.js';
import { substances } from './data/nucleo.js';
import { par, REC, receitas, xpSub } from './data/subatomico.js';
import { fotoUrl, temFoto } from './components/Foto.jsx';
import { useGame } from './game/useGame.js';
import Home from './screens/Home.jsx';
import Lab from './screens/Lab.jsx';
import ResultModal from './screens/ResultModal.jsx';
import Collection from './screens/Collection.jsx';
import Subatomico, { cor as corSub } from './screens/Subatomico.jsx';
import Estudos from './screens/Estudos.jsx';
import Icon from './components/Icon.jsx';
import Tour from './components/Tour.jsx';
import LevelUp from './components/LevelUp.jsx';
import { nivelDe, Revelacao, XpLateral, XpTela, XpTopo } from './components/Celebracao.jsx';
import { ehSecao, NavCtx, SECOES } from './nav.js';
import Missions from './screens/Missions.jsx';
import Profile from './screens/Profile.jsx';

export default function App() {
  const game = useGame();
  const { st, set, P } = game;
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

  // Comemoração de uma descoberta nova, em sequência: revelação → barra de XP → subida de nível.
  // `base` é o XP que o jogador já viu ser contado; o que passar dele ainda vai ser mostrado.
  const base = useRef(P.xp);
  const [fase, setFase] = useState(null); // { tipo: 'xp', de, ate } | { tipo: 'nivel', nivel }
  useEffect(() => {
    if (P.xp < base.current) { base.current = P.xp; setFase(null); return; } // recomeçou o jogo
    if (P.xp === base.current || st.revelar || fase) return;
    // XP sem descoberta (ex.: missão ao colocar um átomo no reator): só interrompe se subir de nível.
    if (nivelDe(P.xp) > nivelDe(base.current)) setFase({ tipo: 'xp', de: base.current, ate: P.xp });
    else base.current = P.xp;
  }, [P.xp, st.revelar, fase]);
  const fecharRevelacao = useCallback(() => {
    set({ revelar: null });
    if (P.xp > base.current) setFase({ tipo: 'xp', de: base.current, ate: P.xp });
  }, [set, P.xp]);
  const fimXp = useCallback(subiu => {
    setFase(f => { base.current = f.ate; return subiu ? { tipo: 'nivel', nivel: nivelDe(f.ate) } : null; });
  }, []);
  const fecharNivel = useCallback(() => setFase(null), []);
  const rev = useMemo(() => {
    const r = st.revelar;
    if (r?.tipo === 'mol') {
      const s = bySymbolFormula(r.id); if (!s) return null;
      const ks = Object.keys(s.c), principal = ks.find(k => k !== 'H') || ks[0];
      return { d: s.d, nome: s.name, fato: s.fact, foto: temFoto(s.f) ? fotoUrl(s.f) : null, tom: col(el(principal).cat), xp: subXP(s),
        partes: ks.map(k => ({ sym: k, cor: col(el(k).cat), qtd: s.c[k] })), n: P.disc.length, total: substances.length };
    }
    if (r?.tipo === 'sub') {
      const x = REC.get(r.id); if (!x) return null;
      const ks = Object.keys(x.c);
      return { d: x.sym, nome: x.name, fato: x.fato, foto: null, tom: corSub(par(ks[0]).fam), xp: xpSub(x), tipo: 'partícula',
        partes: ks.map(k => ({ sym: par(k).sym, cor: corSub(par(k).fam), qtd: x.c[k] })), n: P.sub.length, total: receitas.length };
    }
    return null;
  }, [st.revelar, P.disc.length, P.sub.length]);

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
        <XpLateral xp={P.xp} descobertas={P.disc.length} />
      </aside>

      <div style={{ minWidth: 0 }}>
      <header className="mobile-top">
        {tela === 'home'
          ? <div className="brand"><span className="brand-mark" aria-hidden="true" /><span className="brand-name">NÚCLEO</span></div>
          : <button className="topo-voltar" onClick={back} aria-label="Voltar"><Icon name="back" size={20} /><span className="display">{SECOES.find(s => s.id === tela).label}</span></button>}
        <XpTopo xp={P.xp} descobertas={P.disc.length} />
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
      {rev && <Revelacao key={st.revelar.id} {...rev} onContinuar={fecharRevelacao} />}
      {fase?.tipo === 'xp' && <XpTela key={fase.de} de={fase.de} ate={fase.ate} onFim={fimXp} />}
      {fase?.tipo === 'nivel' && <LevelUp key={fase.nivel} nivel={fase.nivel} onClose={fecharNivel} />}
      {!st.tourVisto && !st.result && <Tour onClose={() => set({ tourVisto: true })} onStart={() => go('lab', { tourVisto: true })} />}
    </div>
    </NavCtx.Provider>
  );
}
