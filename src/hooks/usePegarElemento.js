// Gestos sobre um elemento da tabela (no dedo e no mouse):
// - tocar/clicar: o clique normal da célula (no laboratório, adiciona ao reator);
// - arrastar: o átomo vai na hora para a mão e pode ser solto sobre um alvo, como o reator;
// - segurar parado: o contorno da célula carrega e, quando completa, abre os detalhes (onSegurar).
// O espaço vazio da tabela continua livre para rolar a tabela com o dedo.
import { useCallback, useEffect, useRef, useState } from 'react';

const FOLGA_TOQUE = 8;  // px que o dedo pode tremer antes de virar arrasto
const FOLGA_MOUSE = 6;  // px de movimento para o clique virar arrasto
const ACIMA_DO_DEDO = 58; // no toque, o átomo aparece acima do dedo para não ficar escondido
const semMovimento = () => typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * @param alvo      ref do elemento onde se pode soltar
 * @param onSoltar  (sym) => void, chamado ao soltar dentro do alvo
 * @param onSobre   (bool) => void, avisa quando o átomo entra ou sai do alvo
 * @param onSegurar (sym) => void, chamado ao segurar parado por `segurarMs` (abre os detalhes)
 * @param segurarMs duração de "segurar". Os detalhes abrem no instante em que o contorno da célula
 *                  termina de carregar, que dura esse mesmo tempo.
 * @returns { mao, segurando, celula(sym), maoRef, gradeRef, cliqueValido(), segurarMs }
 */
export default function usePegarElemento({ alvo, onSoltar, onSobre, onSegurar, segurarMs = 450, ativo = true }) {
  const [mao, setMao] = useState(null);       // { sym, toque } enquanto o átomo está na mão
  const [segurando, setSegurando] = useState(null); // símbolo pressionado (o contorno está carregando)
  const g = useRef({ sobre: false, bloquearClique: 0 });
  const maoRef = useRef(null);
  // ref de callback: se a tabela sair da tela e voltar, os ouvintes de toque são religados
  const [grade, gradeRef] = useState(null);
  const cb = useRef({});
  cb.current = { onSoltar, onSobre, onSegurar };

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
  const cancelarSegurar = useCallback(() => { const s = g.current; clearTimeout(s.timer); s.segurado = null; setSegurando(null); }, []);
  const pegar = useCallback((sym, x, y, toque) => {
    const s = g.current;
    if (s.naMao) return;
    cancelarSegurar();
    s.naMao = sym; s.toque = toque; s.sobre = false;
    setMao({ sym, toque });
    if (toque) navigator.vibrate?.(18);
    // a miniatura só existe depois do render; posiciona no quadro seguinte
    requestAnimationFrame(() => mover(x, y));
  }, [mover, cancelarSegurar]);
  /** O contorno completou: abre os detalhes e impede que o clique de soltar o dedo adicione o átomo. */
  const completarSegurar = useCallback(sym => {
    const s = g.current;
    if (s.segurado !== sym || s.naMao) return;
    cancelarSegurar();
    s.inicio = null; s.segurou = true;
    s.bloquearClique = Date.now() + 700;
    navigator.vibrate?.(12);
    cb.current.onSegurar?.(sym);
  }, [cancelarSegurar]);
  const comecarSegurar = useCallback(sym => {
    const s = g.current;
    if (!cb.current.onSegurar) return;
    s.segurado = sym; s.segurou = false;
    setSegurando(sym);
    clearTimeout(s.timer);
    // Quem decide o momento é o fim da animação do contorno (onAnimationEnd abaixo), assim os dois
    // andam juntos. O cronômetro é só reserva: vale direto quando as animações estão desligadas e,
    // nos outros casos, se o navegador não avisar o fim da animação.
    s.timer = setTimeout(() => completarSegurar(sym), semMovimento() ? segurarMs : segurarMs + 300);
  }, [segurarMs, completarSegurar]);
  const largar = useCallback(() => {
    const s = g.current;
    cancelarSegurar();
    if (s.naMao) {
      if (s.sobre) cb.current.onSoltar?.(s.naMao);
      if (s.sobre) cb.current.onSobre?.(false);
      s.bloquearClique = Date.now() + 250;
      s.naMao = null; s.sobre = false;
      setMao(null);
    }
    s.inicio = null;
  }, [cancelarSegurar]);

  // Toque: os eventos de movimento precisam ser não passivos para impedir a rolagem com o átomo na mão.
  useEffect(() => {
    const el = grade;
    if (!el || !ativo) return;
    const move = e => {
      const s = g.current, t = e.touches[0];
      if (!s.inicio || !t) return;
      e.preventDefault();
      if (s.naMao) { mover(t.clientX, t.clientY); return; }
      // Mexeu o dedo: o átomo vai para a mão na hora, sem tempo mínimo.
      if (Math.hypot(t.clientX - s.inicio.x, t.clientY - s.inicio.y) > FOLGA_TOQUE) pegar(s.inicio.sym, t.clientX, t.clientY, true);
    };
    const fim = e => { if (g.current.naMao) e.preventDefault(); largar(); };
    el.addEventListener('touchmove', move, { passive: false });
    el.addEventListener('touchend', fim, { passive: false });
    el.addEventListener('touchcancel', fim);
    return () => { el.removeEventListener('touchmove', move); el.removeEventListener('touchend', fim); el.removeEventListener('touchcancel', fim); };
  }, [grade, ativo, mover, largar, pegar]);
  useEffect(() => () => clearTimeout(g.current.timer), []);

  /** Propriedades para espalhar em cada célula da tabela. */
  const celula = useCallback(sym => (!ativo ? {} : {
    onTouchStart: e => {
      const t = e.touches[0], s = g.current;
      if (e.touches.length > 1) { cancelarSegurar(); s.inicio = null; return; }
      s.inicio = { x: t.clientX, y: t.clientY, sym }; s.usouToque = Date.now();
      comecarSegurar(sym);
    },
    onPointerDown: e => {
      if (e.pointerType !== 'mouse' || e.button !== 0) return;
      const s = g.current, x0 = e.clientX, y0 = e.clientY;
      s.inicio = { x: x0, y: y0, sym };
      comecarSegurar(sym);
      const move = ev => {
        if (!s.naMao) {
          if (s.inicio && Math.hypot(ev.clientX - x0, ev.clientY - y0) > FOLGA_MOUSE) pegar(sym, ev.clientX, ev.clientY, false);
          return;
        }
        mover(ev.clientX, ev.clientY);
      };
      const up = () => { window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up); largar(); };
      window.addEventListener('pointermove', move);
      window.addEventListener('pointerup', up);
    },
    onAnimationEnd: e => { if (e.animationName === 'segurar-borda') completarSegurar(sym); },
    onContextMenu: e => e.preventDefault(),
  }), [ativo, pegar, mover, largar, comecarSegurar, completarSegurar, cancelarSegurar]);

  /** false logo depois de soltar um átomo ou de segurar, para o clique não adicionar por engano. */
  const cliqueValido = useCallback(() => Date.now() > g.current.bloquearClique && !g.current.naMao, []);

  return { mao, segurando, celula, maoRef, gradeRef, cliqueValido, segurarMs };
}
