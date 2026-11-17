// Efeito da fusão no reator: energia espiralando para o centro, clarão, ondas de choque e explosão de partículas.
import { useEffect, useRef } from 'react';

const TAU = Math.PI * 2;
const rnd = (a, b) => a + Math.random() * (b - a);
const clamp = v => Math.max(0, Math.min(1, v));

/**
 * @param {number} ms     duração total da fusão
 * @param {number} charge fração do tempo gasta carregando, antes do clarão
 * @param {{h:number,c:number}[]} hues cores dos elementos no reator
 */
export default function FusionFX({ ms, charge, hues }) {
  const ref = useRef(null);

  useEffect(() => {
    const cv = ref.current, ctx = cv.getContext('2d');
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const W = cv.clientWidth, H = cv.clientHeight, cx = W / 2, cy = H / 2;
    cv.width = W * dpr; cv.height = H * dpr;
    ctx.scale(dpr, dpr);
    const far = Math.hypot(W, H) / 2, tC = ms * charge, tB = ms - tC;
    const pal = hues.length ? hues : [{ h: 145, c: 0.15 }];
    const cor = (i, L, a) => { const p = pal[i % pal.length]; return `oklch(${L} ${p.c} ${p.h} / ${a})`; };

    // Energia sugada para o centro, em espiral.
    const fluxo = Array.from({ length: 110 }, (_, i) => ({
      i, a: rnd(0, TAU), r: rnd(far * 0.45, far * 1.05), d: rnd(0, 0.62), giro: rnd(1.6, 3.4) * (i % 2 ? 1 : -1), w: rnd(1, 2.6), x: null, y: null,
    }));
    // Estilhaços da explosão.
    const brasas = Array.from({ length: 170 }, (_, i) => ({
      i, a: rnd(0, TAU), v: rnd(0.25, 1) ** 1.6 * far * 2.6, k: rnd(2.2, 4.2), w: rnd(1, 3.2), vida: rnd(0.55, 1), pisca: rnd(0, TAU),
    }));
    const aneis = [0, 0.1, 0.24];

    let raf, t0 = null;
    const frame = now => {
      if (t0 == null) t0 = now;
      const t = now - t0;
      // Rastro: apaga só um pouco do quadro anterior.
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = 'rgba(0,0,0,0.2)';
      ctx.fillRect(0, 0, W, H);
      ctx.globalCompositeOperation = 'lighter';
      ctx.lineCap = 'round';

      if (t < tC) {
        const p = t / tC;
        for (const f of fluxo) {
          const q = (p - f.d) / 0.38;
          if (q <= 0 || q >= 1) { f.x = null; continue; }
          const r = f.r * (1 - q * q), a = f.a + f.giro * q * q;
          const x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r * 0.82;
          if (f.x != null) {
            ctx.strokeStyle = cor(f.i, 0.85, 0.25 + 0.75 * q);
            ctx.lineWidth = f.w;
            ctx.beginPath(); ctx.moveTo(f.x, f.y); ctx.lineTo(x, y); ctx.stroke();
          }
          f.x = x; f.y = y;
        }
        // Núcleo de energia crescendo e pulsando.
        const rc = (8 + 54 * p * p) * (1 + 0.08 * Math.sin(t / 38));
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, rc * 2.4);
        g.addColorStop(0, `rgba(255,255,255,${0.35 + 0.6 * p})`);
        g.addColorStop(0.25, cor(0, 0.88, 0.5 * p + 0.15));
        g.addColorStop(1, cor(1, 0.7, 0));
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(cx, cy, rc * 2.4, 0, TAU); ctx.fill();
        // Anéis orbitando o núcleo.
        for (let i = 0; i < 3; i++) {
          ctx.strokeStyle = cor(i, 0.9, 0.5 * p);
          ctx.lineWidth = 1.4;
          ctx.beginPath();
          ctx.ellipse(cx, cy, rc * 1.9, rc * 0.62, t / 260 * (i % 2 ? -1 : 1) + i * 1.05, 0, TAU);
          ctx.stroke();
        }
        // Descargas elétricas, mais frequentes perto do clarão.
        if (p > 0.3 && Math.random() < p * 0.6) {
          const a = rnd(0, TAU), R = rnd(50, 70 + 110 * p);
          ctx.strokeStyle = `rgba(255,255,255,${0.5 + 0.4 * p})`;
          ctx.lineWidth = 1.3;
          ctx.beginPath(); ctx.moveTo(cx, cy);
          for (let s = 1; s <= 6; s++) {
            const rr = (R * s) / 6, j = (s < 6 ? rnd(-0.28, 0.28) : 0);
            ctx.lineTo(cx + Math.cos(a + j) * rr, cy + Math.sin(a + j) * rr);
          }
          ctx.stroke();
        }
      } else {
        const tt = (t - tC) / 1000, f = clamp((t - tC) / tB);
        // Clarão.
        const fl = 1 - f * 3.2;
        if (fl > 0) {
          ctx.globalCompositeOperation = 'source-over';
          const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, far);
          g.addColorStop(0, `rgba(255,255,255,${fl})`);
          g.addColorStop(0.5, cor(0, 0.92, fl * 0.85));
          g.addColorStop(1, cor(1, 0.8, fl * 0.35));
          ctx.fillStyle = g;
          ctx.fillRect(0, 0, W, H);
          ctx.globalCompositeOperation = 'lighter';
        }
        // Ondas de choque.
        aneis.forEach((d, i) => {
          const q = clamp((f - d) * 1.5);
          if (q <= 0 || q >= 1) return;
          const e = 1 - (1 - q) ** 3;
          ctx.strokeStyle = cor(i, 0.9, (1 - q) * 0.9);
          ctx.lineWidth = 1 + 9 * (1 - q);
          ctx.beginPath(); ctx.ellipse(cx, cy, e * far * 1.05, e * far * 0.9, 0, 0, TAU); ctx.stroke();
        });
        // Estilhaços desacelerando.
        for (const b of brasas) {
          const vida = f / b.vida;
          if (vida >= 1) continue;
          const pos = s => (b.v * (1 - Math.exp(-b.k * s))) / b.k;
          const d1 = pos(tt), d0 = pos(Math.max(0, tt - 0.035));
          const co = Math.cos(b.a), si = Math.sin(b.a), queda = 60 * tt * tt;
          const al = (1 - vida) * (0.7 + 0.3 * Math.sin(t / 45 + b.pisca));
          ctx.strokeStyle = b.i % 5 === 0 ? `rgba(255,255,255,${al})` : cor(b.i, 0.86, al);
          ctx.lineWidth = b.w * (1 - vida * 0.6);
          ctx.beginPath();
          ctx.moveTo(cx + co * d0, cy + si * d0 + queda);
          ctx.lineTo(cx + co * d1, cy + si * d1 + queda);
          ctx.stroke();
        }
        // Brilho atrás da fórmula recém-formada.
        const rg = 70 + 90 * (1 - f);
        const g2 = ctx.createRadialGradient(cx, cy, 0, cx, cy, rg);
        g2.addColorStop(0, cor(0, 0.85, 0.09 + 0.2 * (1 - f)));
        g2.addColorStop(1, cor(0, 0.7, 0));
        ctx.fillStyle = g2;
        ctx.beginPath(); ctx.arc(cx, cy, rg, 0, TAU); ctx.fill();
      }
      if (t < ms + 400) raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, []);

  return <canvas ref={ref} className="fusion-fx" aria-hidden="true" />;
}
