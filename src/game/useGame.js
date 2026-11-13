// Estado do jogo com salvamento no navegador.
import { useCallback, useEffect, useRef, useState } from 'react';
import { el, findMatch, progress } from './logic.js';

const SAVE_KEY = 'nucleo-save-v1';
const SAVED = ['screen', 'discovered', 'fusions', 'atomsUsed', 'usedEls', 'nobleTried'];

function load() {
  const base = { screen: 'home', zone: {}, fusing: false, result: null, resultNew: false, levelUp: null, discovered: ['H2O', 'O2', 'CO2'], fusions: 0, atomsUsed: 0, usedEls: ['H', 'O', 'C'], nobleTried: false };
  try {
    const s = JSON.parse(localStorage.getItem(SAVE_KEY) || 'null');
    if (s) SAVED.forEach(k => { if (s[k] != null) base[k] = s[k]; });
  } catch { /* sem armazenamento: começa do zero */ }
  return base;
}

export function useGame() {
  const [st, setSt] = useState(load);
  const fuseT = useRef(null);

  useEffect(() => {
    try { localStorage.setItem(SAVE_KEY, JSON.stringify(Object.fromEntries(SAVED.map(k => [k, st[k]])))); } catch { /* ignora */ }
  }, [st]);
  useEffect(() => () => clearTimeout(fuseT.current), []);

  const set = useCallback(patch => setSt(s => ({ ...s, ...(typeof patch === 'function' ? patch(s) : patch) })), []);

  const addAtom = useCallback((sym, delta = 1) => {
    const e = el(sym); if (!e) return;
    setSt(s => {
      if (s.fusing) return s;
      const zone = { ...s.zone };
      zone[sym] = Math.max(0, Math.min(30, (zone[sym] || 0) + delta));
      if (!zone[sym]) delete zone[sym];
      const usedEls = delta > 0 && !s.usedEls.includes(sym) ? [...s.usedEls, sym] : s.usedEls;
      return { ...s, zone, usedEls, nobleTried: s.nobleTried || (delta > 0 && e.cat === 'ng') };
    });
  }, []);

  const clearZone = useCallback(() => { clearTimeout(fuseT.current); set({ zone: {}, fusing: false }); }, [set]);

  const fuse = useCallback(() => {
    const m = findMatch(st.zone); if (!m || st.fusing) return;
    set({ fusing: true });
    fuseT.current = setTimeout(() => {
      setSt(s => {
        const before = progress(s).level;
        const isNew = !s.discovered.includes(m.f);
        const discovered = isNew ? [...s.discovered, m.f] : s.discovered;
        const after = progress({ ...s, discovered }).level;
        return { ...s, discovered, fusions: s.fusions + 1, atomsUsed: s.atomsUsed + m.atoms, zone: {}, fusing: false, result: m.f, resultNew: isNew, levelUp: after > before ? after : null };
      });
    }, 1000);
  }, [st.zone, st.fusing, set]);

  const reset = useCallback(() => {
    try { localStorage.removeItem(SAVE_KEY); } catch { /* ignora */ }
    setSt(load());
  }, []);

  return { st, set, addAtom, clearZone, fuse, reset, P: progress(st) };
}
