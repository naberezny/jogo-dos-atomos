// Modelo de Bohr animado: núcleo, órbitas inclinadas e elétrons girando.
// Arrastar gira o átomo; com onPick, clicar numa órbita seleciona a camada.
import { useEffect, useRef } from 'react';

const shared = { yaw: 0, pitch: -0.35 };

export default function Atom3D(props) {
  const ref = useRef(null);
  const pr = useRef(props);
  pr.current = props;

  useEffect(() => {
    const cv = ref.current, ctx = cv.getContext('2d');
    let raf;
    const local = { yaw: 0, pitch: -0.35 }, drag = { on: false, x: 0, y: 0, moved: 0 };
    let spinY = 0, k = 0, last = performance.now(), rings = [], hover = -1;
    const R = () => (pr.current.own ? local : shared);
    const segDist = (px, py, a, b) => {
      const dx = b[0] - a[0], dy = b[1] - a[1];
      const t = Math.max(0, Math.min(1, ((px - a[0]) * dx + (py - a[1]) * dy) / (dx * dx + dy * dy || 1)));
      return Math.hypot(px - a[0] - t * dx, py - a[1] - t * dy);
    };
    const hit = e => {
      const bb = cv.getBoundingClientRect(), x = e.clientX - bb.left, y = e.clientY - bb.top;
      let best = -1, bd = e.pointerType === 'touch' ? 16 : 8;
      rings.forEach((pts, i) => { for (let j = 1; j < pts.length; j++) { const d = segDist(x, y, pts[j - 1], pts[j]); if (d < bd) { bd = d; best = i; } } });
      return best;
    };
    const down = e => { drag.on = true; drag.x = e.clientX; drag.y = e.clientY; drag.moved = 0; cv.setPointerCapture(e.pointerId); };
    const move = e => {
      if (drag.on) {
        if (!pr.current.top) {
          const r = R();
          r.yaw += (e.clientX - drag.x) * 0.012;
          r.pitch = Math.max(-1.4, Math.min(1.4, r.pitch + (e.clientY - drag.y) * 0.012));
        }
        drag.moved += Math.abs(e.clientX - drag.x) + Math.abs(e.clientY - drag.y);
        drag.x = e.clientX; drag.y = e.clientY;
      }
      hover = pr.current.onPick && !drag.on ? hit(e) : -1;
      cv.style.cursor = hover >= 0 ? 'pointer' : pr.current.top ? 'default' : drag.on ? 'grabbing' : 'grab';
    };
    const up = e => { if (drag.on && drag.moved < 5 && pr.current.onPick) pr.current.onPick(hit(e)); drag.on = false; };
    const leave = () => { hover = -1; };
    cv.addEventListener('pointerdown', down); cv.addEventListener('pointermove', move);
    cv.addEventListener('pointerup', up); cv.addEventListener('pointercancel', up); cv.addEventListener('pointerleave', leave);

    const frame = now => {
      const { size: S, shells, h, c, fusing, top, sel, own } = pr.current;
      const dpr = window.devicePixelRatio || 1;
      const dt = Math.min(0.05, (now - last) / 1000); last = now;
      if (cv.width !== Math.round(S * dpr)) { cv.width = Math.round(S * dpr); cv.height = Math.round(S * dpr); }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, S, S);
      k += ((top ? 1 : 0) - k) * Math.min(1, dt * 5);
      if (!drag.on && !top) spinY += dt * 0.25;
      const t = now / 1000, C = S / 2, Rr = C * 0.86, N = shells.length, sp = fusing ? 3.5 : 1, r0 = R();
      const yaw = (r0.yaw + (own ? spinY : t * 0.25)) * (1 - k), pitch = r0.pitch * (1 - k);
      const cy = Math.cos(yaw), sy = Math.sin(yaw), cp = Math.cos(pitch), spn = Math.sin(pitch);
      const proj = (x, y, z) => { const x1 = x * cy + z * sy, z1 = -x * sy + z * cy; const y2 = y * cp - z1 * spn, z2 = y * spn + z1 * cp; return [C + x1, C + y2, z2]; };
      const cloud = ctx.createRadialGradient(C, C, 0, C, C, Rr * 1.12);
      cloud.addColorStop(0, `oklch(0.8 ${c} ${h} / 0.22)`); cloud.addColorStop(0.7, `oklch(0.8 ${c} ${h} / 0.08)`); cloud.addColorStop(1, `oklch(0.8 ${c} ${h} / 0)`);
      ctx.fillStyle = cloud; ctx.beginPath(); ctx.arc(C, C, Rr * 1.12, 0, Math.PI * 2); ctx.fill();
      const back = [], front = [], hasSel = sel != null && sel >= 0, big = S > 200 ? 1.5 : 1;
      rings = [];
      shells.forEach((count, i) => {
        const n = i + 1, r = N === 1 ? Rr : Rr * (0.32 + 0.68 * i / (N - 1));
        const tilt = (1.15 + n * 0.41) * (1 - k), spin = n * 0.93, ct = Math.cos(tilt), st = Math.sin(tilt), cs = Math.cos(spin), ss = Math.sin(spin);
        const pt = th => { const x0 = r * Math.cos(th), y0 = r * Math.sin(th); const y1 = y0 * ct, z1 = y0 * st; return proj(x0 * cs - y1 * ss, x0 * ss + y1 * cs, z1); };
        const pts = []; for (let q = 0; q <= 72; q++) pts.push(pt(q / 72 * Math.PI * 2));
        rings.push(pts);
        const on = i === sel, hv = i === hover;
        const al = on ? 0.95 : hv ? 0.7 : hasSel ? 0.14 : 0.28;
        ctx.beginPath(); pts.forEach((q, j) => (j ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])));
        ctx.strokeStyle = `oklch(${on ? 0.9 : 0.8} ${c} ${h} / ${al})`; ctx.lineWidth = on ? 2.2 : hv ? 1.6 : 1; ctx.stroke();
        if (own && k > 0.6) {
          ctx.globalAlpha = (k - 0.6) / 0.4; ctx.fillStyle = on ? `oklch(0.92 ${c} ${h})` : 'oklch(0.72 0.02 265)';
          ctx.font = "600 10px 'Chakra Petch', sans-serif"; ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
          const lp = pts[63]; ctx.fillText('KLMNOPQ'[i], lp[0] + 4, lp[1] - 4); ctx.globalAlpha = 1;
        }
        const w = t * sp * 1.4 / Math.pow(n, 0.8);
        for (let q = 0; q < count; q++) { const p3 = pt(w + q * Math.PI * 2 / count); (p3[2] < 0 ? back : front).push([p3[0], p3[1], p3[2] / Rr, hasSel ? (on ? 1 : 0.35) : 1]); }
      });
      const dot = ([x, y, z, f]) => {
        const rr = (0.6 + (z + 1) * 0.25) * big * (f === 1 && hasSel ? 1.3 : 1);
        ctx.fillStyle = `oklch(0.97 0.03 ${h} / ${(0.55 + (z + 1) * 0.22) * f})`; ctx.shadowColor = `oklch(0.85 ${c} ${h})`; ctx.shadowBlur = 3;
        ctx.beginPath(); ctx.arc(x, y, rr, 0, Math.PI * 2); ctx.fill(); ctx.shadowBlur = 0;
      };
      back.forEach(dot);
      const nr = Math.max(4, S * (own ? 0.045 : 0.07));
      const g = ctx.createRadialGradient(C - nr * 0.35, C - nr * 0.35, nr * 0.1, C, C, nr);
      g.addColorStop(0, `oklch(0.97 0.04 ${h})`); g.addColorStop(0.5, `oklch(0.78 ${c} ${h})`); g.addColorStop(1, `oklch(0.45 ${c} ${h})`);
      ctx.fillStyle = g; ctx.shadowColor = `oklch(0.8 ${c} ${h} / 0.8)`; ctx.shadowBlur = fusing ? 18 : 10;
      ctx.beginPath(); ctx.arc(C, C, nr, 0, Math.PI * 2); ctx.fill(); ctx.shadowBlur = 0;
      front.forEach(dot);
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      cv.removeEventListener('pointerdown', down); cv.removeEventListener('pointermove', move);
      cv.removeEventListener('pointerup', up); cv.removeEventListener('pointercancel', up); cv.removeEventListener('pointerleave', leave);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      role="img"
      aria-label={props.title}
      title={props.title}
      style={{ width: props.size + 'px', height: props.size + 'px', display: 'block', cursor: 'grab', touchAction: 'none' }}
    />
  );
}
