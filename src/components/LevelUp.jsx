// Comemoração ao subir de nível: raios girando, medalhão com o novo nível e uma chuva de partículas.
import { useEffect, useRef } from 'react';

const DURA = 4200;
const CORES = ['oklch(0.82 0.13 195)', 'oklch(0.82 0.15 145)', 'oklch(0.82 0.14 65)', 'oklch(0.8 0.13 340)', 'oklch(0.8 0.12 250)', '#fff'];
const rnd = (a, b) => a + Math.random() * (b - a);

function Particulas() {
  const ref = useRef(null);
  useEffect(() => {
    const cv = ref.current, ctx = cv.getContext('2d');
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const W = cv.clientWidth, H = cv.clientHeight;
    cv.width = W * dpr; cv.height = H * dpr; ctx.scale(dpr, dpr);
    const cx = W / 2, cy = H * 0.42, forca = Math.min(W, H);
    const lote = (n, atraso) => Array.from({ length: n }, (_, i) => {
      const a = rnd(0, Math.PI * 2), v = rnd(0.25, 1) * forca * 1.5;
      return { t0: atraso, vx: Math.cos(a) * v, vy: Math.sin(a) * v - forca * 0.35, k: rnd(1.6, 3), w: rnd(4, 9), h: rnd(3, 6), giro: rnd(-9, 9), a0: rnd(0, 6), cor: CORES[i % CORES.length], vida: rnd(1.6, 2.8), redonda: i % 3 === 0 };
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
      if (t < DURA / 1000) raf = requestAnimationFrame(quadro);
    };
    raf = requestAnimationFrame(quadro);
    return () => cancelAnimationFrame(raf);
  }, []);
  return <canvas ref={ref} className="nivel-particulas" aria-hidden="true" />;
}

export default function LevelUp({ nivel, onClose }) {
  const reduzido = typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
  useEffect(() => {
    const t = setTimeout(onClose, reduzido ? 2600 : DURA);
    const k = e => { if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') onClose(); };
    window.addEventListener('keydown', k);
    navigator.vibrate?.([20, 60, 30]);
    return () => { clearTimeout(t); window.removeEventListener('keydown', k); };
  }, [onClose, reduzido]);

  return (
    <div className="nivel-wrap" role="status" aria-live="assertive" onClick={onClose} style={{ '--dura': `${DURA}ms` }}>
      <div className="nivel-raios" aria-hidden="true" />
      {!reduzido && <Particulas />}
      <div className="nivel-centro">
        <div className="nivel-medalhao" aria-hidden="true">
          <span className="anel a1" /><span className="anel a2" /><span className="anel a3" />
          {!reduzido && <span className="nivel-antes display">{nivel - 1}</span>}
          <span className="nivel-num display">{nivel}</span>
        </div>
        <div className="nivel-titulo display">Subiu de nível!</div>
        <div className="nivel-sub">Você chegou ao <b>nível {nivel}</b>. Continue descobrindo.</div>
        <div className="nivel-toque">Toque para continuar</div>
      </div>
    </div>
  );
}
