// Comemoração ao subir de nível: raios girando, medalhão com o novo nível e uma chuva de partículas.
import { useEffect, useLayoutEffect, useRef } from 'react';

const DURA = 4200;
const CORES = ['oklch(0.82 0.13 195)', 'oklch(0.82 0.15 145)', 'oklch(0.82 0.14 65)', 'oklch(0.8 0.13 340)', 'oklch(0.8 0.12 250)', '#fff'];
const rnd = (a, b) => a + Math.random() * (b - a);

/**
 * Põe o centro dos raios (variáveis --rx/--ry na tela `wrap`) no centro do elemento `alvo`
 * (medalhão, foto da substância, barra de XP). Mede de novo quando o tamanho muda, a fonte carrega
 * ou as animações de entrada terminam, para os raios saírem sempre do meio do destaque.
 */
export function useCentro(wrap, alvo) {
  useLayoutEffect(() => {
    const w = wrap.current, a = alvo.current;
    if (!w || !a) return;
    const medir = () => {
      const rw = w.getBoundingClientRect(), ra = a.getBoundingClientRect();
      w.style.setProperty('--rx', `${ra.left + ra.width / 2 - rw.left}px`);
      w.style.setProperty('--ry', `${ra.top + ra.height / 2 - rw.top + w.scrollTop}px`);
    };
    medir();
    const ro = new ResizeObserver(medir);
    ro.observe(w); if (a.parentElement) ro.observe(a.parentElement);
    const ts = [300, 700, 1300].map(t => setTimeout(medir, t));
    document.fonts?.ready.then(medir);
    return () => { ro.disconnect(); ts.forEach(clearTimeout); };
  }, [wrap, alvo]);
}

/**
 * Chuva de confete que explode de um ponto da tela e cai com a gravidade. O ponto é o centro do
 * elemento `alvo` (ref), se houver; senão, o meio da largura na altura relativa `cy`.
 */
export function Particulas({ cores = CORES, cy: cyRel = 0.42, dura = DURA, alvo }) {
  const ref = useRef(null);
  useEffect(() => {
    const cv = ref.current, ctx = cv.getContext('2d');
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const W = cv.clientWidth, H = cv.clientHeight;
    cv.width = W * dpr; cv.height = H * dpr; ctx.scale(dpr, dpr);
    let cx = W / 2, cy = H * cyRel;
    const a = alvo?.current;
    if (a) { const rc = cv.getBoundingClientRect(), ra = a.getBoundingClientRect(); cx = ra.left + ra.width / 2 - rc.left; cy = ra.top + ra.height / 2 - rc.top; }
    const forca = Math.min(W, H);
    const lote = (n, atraso) => Array.from({ length: n }, (_, i) => {
      const a = rnd(0, Math.PI * 2), v = rnd(0.25, 1) * forca * 1.5;
      return { t0: atraso, vx: Math.cos(a) * v, vy: Math.sin(a) * v - forca * 0.35, k: rnd(1.6, 3), w: rnd(4, 9), h: rnd(3, 6), giro: rnd(-9, 9), a0: rnd(0, 6), cor: cores[i % cores.length], vida: rnd(1.6, 2.8), redonda: i % 3 === 0 };
    });
    const ps = [...lote(130, 0.25), ...lote(90, 0.75)];
    let raf, ini = null;
    const quadro = agora => {
      if (ini == null) ini = agora;
      const t = (agora - ini) / 1000;
      ctx.clearRect(0, 0, W, H);
      for (const p of ps) {
        const s = t - p.t0;
        if (s < 0 || s > p.vida) continue;
        // velocidade inicial com arrasto, mais a gravidade puxando para baixo
        const f = (1 - Math.exp(-p.k * s)) / p.k;
        const x = cx + p.vx * f, y = cy + p.vy * f + 260 * s * s;
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(p.a0 + p.giro * s);
        ctx.globalAlpha = Math.min(1, (p.vida - s) * 1.6);
        ctx.fillStyle = p.cor;
        if (p.redonda) { ctx.beginPath(); ctx.arc(0, 0, p.h * 0.7, 0, Math.PI * 2); ctx.fill(); }
        else ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h * Math.abs(Math.cos(s * 6 + p.a0)) + 1);
        ctx.restore();
      }
      if (t < dura / 1000 + 1) raf = requestAnimationFrame(quadro);
    };
    raf = requestAnimationFrame(quadro);
    return () => cancelAnimationFrame(raf);
    // Só a primeira configuração vale: re-renderizações não recomeçam a explosão.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <canvas ref={ref} className="nivel-particulas" aria-hidden="true" />;
}

export default function LevelUp({ nivel, onClose }) {
  const wrap = useRef(null), medalhao = useRef(null);
  useCentro(wrap, medalhao);
  const reduzido = typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
  useEffect(() => {
    const t = setTimeout(onClose, reduzido ? 2600 : DURA);
    const k = e => { if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') onClose(); };
    window.addEventListener('keydown', k);
    navigator.vibrate?.([20, 60, 30]);
    return () => { clearTimeout(t); window.removeEventListener('keydown', k); };
  }, [onClose, reduzido]);

  return (
    <div ref={wrap} className="nivel-wrap" role="status" aria-live="assertive" onClick={onClose} style={{ '--dura': `${DURA}ms` }}>
      <div className="nivel-raios" aria-hidden="true" />
      {!reduzido && <Particulas alvo={medalhao} />}
      <div className="nivel-centro">
        <div ref={medalhao} className="nivel-medalhao" aria-hidden="true">
          <span className="anel a1" /><span className="anel a2" /><span className="anel a3" />
          <svg className="nivel-aneis" viewBox="0 0 200 200">
            <circle className="na-marcas" cx="100" cy="100" r="96" />
            <circle className="na-segmentos" cx="100" cy="100" r="87" />
            <circle className="na-trilha" cx="100" cy="100" r="78" />
            <circle className="na-carga" cx="100" cy="100" r="78" pathLength="100" />
          </svg>
          <div className="nivel-nucleo">
            <span className="nivel-rot mono">Nível</span>
            {!reduzido && <span className="nivel-antes display">{nivel - 1}</span>}
            <span className="nivel-num display">{nivel}</span>
          </div>
        </div>
        <div className="nivel-titulo display">Subiu de nível!</div>
        <div className="nivel-sub">Você chegou ao <b>nível {nivel}</b>. Continue descobrindo.</div>
        <div className="nivel-toque">Toque para continuar</div>
      </div>
    </div>
  );
}
