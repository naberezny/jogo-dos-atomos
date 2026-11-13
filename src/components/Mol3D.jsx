// Molécula em bolas e varetas, girando sozinha; arraste para girar.
import { useEffect, useRef } from 'react';
import { cats } from '../data/nucleo.js';

const W = 340, H = 280;

export default function Mol3D({ g, label }) {
  const ref = useRef(null);
  const gr = useRef(g);
  gr.current = g;

  useEffect(() => {
    const cv = ref.current, ctx = cv.getContext('2d');
    let raf, last = performance.now();
    const rot = { yaw: 0.5, pitch: -0.3 }, drag = { on: false, x: 0, y: 0 };
    const down = e => { drag.on = true; drag.x = e.clientX; drag.y = e.clientY; cv.setPointerCapture(e.pointerId); cv.style.cursor = 'grabbing'; };
    const move = e => {
      if (!drag.on) return;
      rot.yaw += (e.clientX - drag.x) * 0.012;
      rot.pitch = Math.max(-1.5, Math.min(1.5, rot.pitch + (e.clientY - drag.y) * 0.012));
      drag.x = e.clientX; drag.y = e.clientY;
    };
    const up = () => { drag.on = false; cv.style.cursor = 'grab'; };
    cv.addEventListener('pointerdown', down); cv.addEventListener('pointermove', move);
    cv.addEventListener('pointerup', up); cv.addEventListener('pointercancel', up);

    const frame = now => {
      const geo = gr.current, dpr = window.devicePixelRatio || 1;
      if (cv.width !== W * dpr) { cv.width = W * dpr; cv.height = H * dpr; }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, W, H);
      if (!drag.on) rot.yaw += (now - last) / 1000 * 0.45;
      last = now;
      const cy = Math.cos(rot.yaw), sy = Math.sin(rot.yaw), cp = Math.cos(rot.pitch), sp = Math.sin(rot.pitch);
      const P = geo.atoms.map(a => {
        const x1 = a.x * cy + a.z * sy, z1 = -a.x * sy + a.z * cy;
        const y2 = a.y * cp - z1 * sp, z2 = a.y * sp + z1 * cp, s = 300 / (300 - z2);
        return { a, x: W / 2 + x1 * s, y: H / 2 + y2 * s, z: z2, s };
      });
      const items = [];
      geo.bonds.forEach(([i, j, o = 1]) => {
        const A = P[i], B = P[j], M = { x: (A.x + B.x) / 2, y: (A.y + B.y) / 2, s: (A.s + B.s) / 2 };
        items.push({ z: A.z - 0.5, bond: [A, M], o }); items.push({ z: B.z - 0.5, bond: [M, B], o });
      });
      P.forEach(q => items.push({ z: q.z, atom: q }));
      items.sort((a, b) => a.z - b.z);
      items.forEach(it => {
        if (it.bond) {
          const [A, B] = it.bond, f = 0.5 + 0.5 * Math.max(-1, Math.min(1, it.z / 120)), s = (A.s + B.s) / 2;
          ctx.strokeStyle = `oklch(${0.42 + f * 0.2} 0.02 265)`; ctx.lineCap = 'round';
          // Dupla e tripla viram varetas paralelas; atração iônica é tracejada.
          const dx = B.x - A.x, dy = B.y - A.y, L = Math.hypot(dx, dy) || 1, nx = -dy / L, ny = dx / L;
          const gap = 3.2 * s, offs = it.o === 2 ? [-gap, gap] : it.o === 3 ? [-gap * 1.4, 0, gap * 1.4] : [0];
          ctx.lineWidth = (it.o === 0 ? 2 : it.o === 1 ? 5 : 3) * s;
          ctx.setLineDash(it.o === 0 ? [4 * s, 4 * s] : []);
          offs.forEach(k => { ctx.beginPath(); ctx.moveTo(A.x + nx * k, A.y + ny * k); ctx.lineTo(B.x + nx * k, B.y + ny * k); ctx.stroke(); });
          ctx.setLineDash([]);
          return;
        }
        const q = it.atom, r = q.a.r * q.s, c = cats[q.a.cat], f = 0.5 + 0.5 * Math.max(-1, Math.min(1, q.z / 120));
        const grd = ctx.createRadialGradient(q.x - r * 0.35, q.y - r * 0.4, r * 0.05, q.x, q.y, r);
        grd.addColorStop(0, `oklch(0.98 0.03 ${c.h})`); grd.addColorStop(0.35, `oklch(${0.72 + f * 0.1} ${c.c} ${c.h})`); grd.addColorStop(1, `oklch(${0.3 + f * 0.1} ${c.c} ${c.h})`);
        ctx.fillStyle = grd; ctx.beginPath(); ctx.arc(q.x, q.y, r, 0, Math.PI * 2); ctx.fill();
        if (r > 11) {
          ctx.fillStyle = 'oklch(0.15 0.02 265 / 0.85)'; ctx.font = `600 ${Math.round(r * 0.62)}px 'Chakra Petch', sans-serif`;
          ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(q.a.sym, q.x, q.y + 1);
        }
      });
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      cv.removeEventListener('pointerdown', down); cv.removeEventListener('pointermove', move);
      cv.removeEventListener('pointerup', up); cv.removeEventListener('pointercancel', up);
    };
  }, []);

  return <canvas ref={ref} role="img" aria-label={label} style={{ width: W + 'px', height: 'auto', aspectRatio: `${W} / ${H}`, maxWidth: '100%', display: 'block', cursor: 'grab', touchAction: 'none' }} />;
}
