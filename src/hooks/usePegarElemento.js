// Gesto de "pegar o átomo na mão": segurar (no toque) ou arrastar (no mouse) um elemento da tabela
// e soltá-lo sobre um alvo, como o reator.
import { useCallback, useEffect, useRef, useState } from 'react';

const FOLGA_TOQUE = 10; // px que o dedo pode tremer enquanto segura, antes de virar rolagem
const FOLGA_MOUSE = 6;  // px de movimento para o clique virar arrasto
const ACIMA_DO_DEDO = 58; // no toque, o átomo aparece acima do dedo para não ficar escondido

/**
 * @param alvo      ref do elemento onde se pode soltar
 * @param onSoltar  (sym) => void, chamado ao soltar dentro do alvo
 * @param onSobre   (bool) => void, avisa quando o átomo entra ou sai do alvo
 * @param segurarMs tempo de toque parado até pegar o átomo (o mouse pega na hora)
 * @returns { mao, segurando, celula(sym), maoRef, gradeRef, cliqueValido() }
 */
export default function usePegarElemento({ alvo, onSoltar, onSobre, segurarMs = 1000, ativo = true }) {
  const [mao, setMao] = useState(null);       // { sym, toque } enquanto o átomo está na mão
  const [segurando, setSegurando] = useState(null); // símbolo que está sendo pressionado
  const g = useRef({ sobre: false, bloquearClique: 0 });
  const maoRef = useRef(null);
  // ref de callback: se a tabela sair da tela e voltar, os ouvintes de toque são religados
  const [grade, gradeRef] = useState(null);
  const cb = useRef({});
  cb.current = { onSoltar, onSobre };

  const ponto = (x, y, toque) => ({ x, y: toque ? y - ACIMA_DO_DEDO : y });
  const dentro = (x, y) => {
    const r = alvo?.current?.getBoundingClientRect();
    return !!r && x >= r.left && x <= r.right && y >= r.top && y <= r.bottom;
  };
  const mover = useCallback((x, y) => {
    const s = g.current, p = ponto(x, y, s.toque);
    s.px = p.x; s.py = p.y;
    if (maoRef.current) maoRef.current.style.transform = `translate(${p.x}px, ${p.y}px)`;
    const sobre = dentro(p.x, p.y);
    if (sobre !== s.sobre) { s.sobre = sobre; cb.current.onSobre?.(sobre); }
  }, []);
  const pegar = useCallback((sym, x, y, toque) => {
    const s = g.current;
    s.naMao = sym; s.toque = toque; s.sobre = false;
    setSegurando(null);
    setMao({ sym, toque });
    if (toque) navigator.vibrate?.(18);
    // a miniatura só existe depois do render; posiciona no quadro seguinte
    requestAnimationFrame(() => mover(x, y));
  }, [mover]);
  const largar = useCallback(() => {
    const s = g.current;
    clearTimeout(s.timer);
    setSegurando(null);
    if (s.naMao) {
      if (s.sobre) cb.current.onSoltar?.(s.naMao);
      if (s.sobre) cb.current.onSobre?.(false);
      s.bloquearClique = Date.now() + 250;
      s.naMao = null; s.sobre = false;
      setMao(null);
    }
    s.inicio = null;
  }, []);

  // Toque: os eventos de movimento precisam ser não passivos para impedir a rolagem com o átomo na mão.
  useEffect(() => {
    const el = grade;
    if (!el || !ativo) return;
    const move = e => {
      const s = g.current, t = e.touches[0];
      if (!s.inicio || !t) return;
      if (s.naMao) { e.preventDefault(); mover(t.clientX, t.clientY); return; }
      s.ux = t.clientX; s.uy = t.clientY;
      if (Math.hypot(t.clientX - s.inicio.x, t.clientY - s.inicio.y) > FOLGA_TOQUE) { clearTimeout(s.timer); setSegurando(null); s.inicio = null; }
    };
    const fim = e => { if (g.current.naMao) e.preventDefault(); largar(); };
    el.addEventListener('touchmove', move, { passive: false });
    el.addEventListener('touchend', fim, { passive: false });
    el.addEventListener('touchcancel', fim);
    return () => { el.removeEventListener('touchmove', move); el.removeEventListener('touchend', fim); el.removeEventListener('touchcancel', fim); };
  }, [grade, ativo, mover, largar]);
  useEffect(() => () => clearTimeout(g.current.timer), []);

  /** Propriedades para espalhar em cada célula da tabela. */
  const celula = useCallback(sym => (!ativo ? {} : {
    onTouchStart: e => {
      const t = e.touches[0], s = g.current;
      if (e.touches.length > 1) { clearTimeout(s.timer); setSegurando(null); return; }
      s.inicio = { x: t.clientX, y: t.clientY }; s.ux = t.clientX; s.uy = t.clientY; s.usouToque = Date.now();
      setSegurando(sym);
      clearTimeout(s.timer);
      s.timer = setTimeout(() => pegar(sym, s.ux, s.uy, true), segurarMs);
    },
    onPointerDown: e => {
      if (e.pointerType !== 'mouse' || e.button !== 0) return;
      const s = g.current, x0 = e.clientX, y0 = e.clientY;
      const move = ev => {
        if (!s.naMao) { if (Math.hypot(ev.clientX - x0, ev.clientY - y0) > FOLGA_MOUSE) pegar(sym, ev.clientX, ev.clientY, false); return; }
        mover(ev.clientX, ev.clientY);
      };
      const up = () => { window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up); largar(); };
      window.addEventListener('pointermove', move);
      window.addEventListener('pointerup', up);
    },
    onContextMenu: e => e.preventDefault(),
  }), [ativo, pegar, mover, largar, segurarMs]);

  /** false logo depois de soltar um átomo, para o toque não abrir a ficha por engano. */
  const cliqueValido = useCallback(() => Date.now() > g.current.bloquearClique && !g.current.naMao, []);

  return { mao, segurando, celula, maoRef, gradeRef, cliqueValido, segurarMs };
}
