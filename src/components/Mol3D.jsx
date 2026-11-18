// Molécula em bolas e varetas, girando sozinha; arraste para girar. Pinça (dois dedos) ou roda do
// mouse dão zoom. O botão de restaurar aparece quando o zoom ou o ângulo foram mudados pelo jogador
// e devolve os dois ao padrão, numa animação curta.
import { useEffect, useRef, useState } from 'react';
import { cats } from '../data/nucleo.js';
import { luzGirada, pintaEsfera, rotulo } from './esfera.js';

const W = 340, H = 280;
const ZOOM_MIN = 0.6, ZOOM_MAX = 4;
const limita = z => Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, z));
const ANGULO = { yaw: 0.5, pitch: -0.3 }; // vista inicial
const RESTAURAR_MS = 450;
// A luz (em esfera.js) gira junto com a molécula, então o brilho desliza pela superfície de cada
// átomo e até o do centro mostra o movimento.

export default function Mol3D({ g, label }) {
  const ref = useRef(null);
  const gr = useRef(g);
  gr.current = g;
  const zoomRef = useRef(1);
  const [zoom, setZoomState] = useState(1);
  const setZoom = z => { z = limita(z); if (Math.abs(z - 1) < 0.03) z = 1; zoomRef.current = z; setZoomState(z); };
  const setZoomRef = useRef(setZoom); setZoomRef.current = setZoom;
  const [girou, setGirou] = useState(false); // o jogador mudou o ângulo com o dedo ou o mouse
  const girouRef = useRef(setGirou); girouRef.current = setGirou;
  const restaurarRef = useRef(() => {});
  const restaurar = () => { setZoomState(1); setGirou(false); restaurarRef.current(); };

  useEffect(() => {
    const cv = ref.current, ctx = cv.getContext('2d');
    let raf, last = performance.now();
    const rot = { ...ANGULO }, drag = { on: false, x: 0, y: 0 };
    // Volta suave ao padrão: zoom 100% e o ângulo inicial, pelo caminho mais curto.
    let volta = null;
    restaurarRef.current = () => {
      const voltas = Math.round((rot.yaw - ANGULO.yaw) / (2 * Math.PI));
      volta = { t0: performance.now(), y0: rot.yaw, y1: ANGULO.yaw + voltas * 2 * Math.PI, p0: rot.pitch, z0: zoomRef.current };
    };
    // Dedos na tela: um gira; dois fazem pinça (zoom).
    const dedos = new Map();
    let pinca = null;
    const distancia = () => { const [a, b] = [...dedos.values()]; return Math.hypot(a.x - b.x, a.y - b.y) || 1; };
    const down = e => {
      dedos.set(e.pointerId, { x: e.clientX, y: e.clientY });
      cv.setPointerCapture(e.pointerId);
      if (dedos.size === 2) { drag.on = false; pinca = { d: distancia(), z: zoomRef.current }; return; }
      drag.on = true; drag.x = e.clientX; drag.y = e.clientY; cv.style.cursor = 'grabbing';
    };
    const move = e => {
      if (!dedos.has(e.pointerId)) return;
      dedos.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (pinca && dedos.size >= 2) { volta = null; setZoomRef.current(pinca.z * distancia() / pinca.d); return; }
      if (!drag.on) return;
      if (e.clientX !== drag.x || e.clientY !== drag.y) { volta = null; girouRef.current(true); }
      rot.yaw += (e.clientX - drag.x) * 0.012;
      rot.pitch = Math.max(-1.5, Math.min(1.5, rot.pitch + (e.clientY - drag.y) * 0.012));
      drag.x = e.clientX; drag.y = e.clientY;
    };
    const up = e => {
      dedos.delete(e.pointerId);
      if (dedos.size < 2) pinca = null;
      // Sobrou um dedo depois da pinça: ele volta a girar a partir de onde está.
      if (dedos.size === 1) { const [d] = dedos.values(); drag.on = true; drag.x = d.x; drag.y = d.y; return; }
      drag.on = false; cv.style.cursor = 'grab';
    };
    const roda = e => { e.preventDefault(); volta = null; setZoomRef.current(zoomRef.current * Math.exp(-e.deltaY * 0.0015)); };
    const duplo = () => { setZoomRef.current(1); girouRef.current(false); restaurarRef.current(); };
    cv.addEventListener('pointerdown', down); cv.addEventListener('pointermove', move);
    cv.addEventListener('pointerup', up); cv.addEventListener('pointercancel', up);
    cv.addEventListener('wheel', roda, { passive: false }); cv.addEventListener('dblclick', duplo);

    const frame = now => {
      const geo = gr.current, dpr = window.devicePixelRatio || 1;
      if (cv.width !== W * dpr || cv.height !== H * dpr) { cv.width = W * dpr; cv.height = H * dpr; }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, W, H);
      if (volta) {
        const t = Math.min(1, (now - volta.t0) / RESTAURAR_MS), e = 1 - (1 - t) ** 3;
        rot.yaw = volta.y0 + (volta.y1 - volta.y0) * e;
        rot.pitch = volta.p0 + (ANGULO.pitch - volta.p0) * e;
        zoomRef.current = volta.z0 + (1 - volta.z0) * e;
        if (t >= 1) { zoomRef.current = 1; volta = null; }
      } else if (!drag.on) rot.yaw += (now - last) / 1000 * 0.45;
      last = now;
      const cy = Math.cos(rot.yaw), sy = Math.sin(rot.yaw), cp = Math.cos(rot.pitch), sp = Math.sin(rot.pitch);
      const P = geo.atoms.map(a => {
        const x1 = a.x * cy + a.z * sy, z1 = -a.x * sy + a.z * cy;
        const y2 = a.y * cp - z1 * sp, z2 = a.y * sp + z1 * cp, s = 300 / (300 - z2) * zoomRef.current;
        return { a, x: W / 2 + x1 * s, y: H / 2 + y2 * s, z: z2, s };
      });
      // A mesma rotação dos átomos, aplicada à direção da luz.
      const luz = luzGirada(cy, sy, cp, sp), frente = luz.frente;
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
          ctx.strokeStyle = `oklch(${0.36 + f * 0.18 + frente * 0.12} 0.02 265)`; ctx.lineCap = 'round';
          // Dupla e tripla viram varetas paralelas; atração iônica é tracejada.
          const dx = B.x - A.x, dy = B.y - A.y, L = Math.hypot(dx, dy) || 1, nx = -dy / L, ny = dx / L;
          const gap = 3.2 * s, offs = it.o === 2 ? [-gap, gap] : it.o === 3 ? [-gap * 1.4, 0, gap * 1.4] : [0];
          ctx.lineWidth = (it.o === 0 ? 2 : it.o === 1 ? 5 : 3) * s;
          ctx.setLineDash(it.o === 0 ? [4 * s, 4 * s] : []);
          offs.forEach(k => { ctx.beginPath(); ctx.moveTo(A.x + nx * k, A.y + ny * k); ctx.lineTo(B.x + nx * k, B.y + ny * k); ctx.stroke(); });
          ctx.setLineDash([]);
          return;
        }
        // Cor do átomo no padrão dos químicos (CPK); a luz clareia ou escurece a partir dela.
        const q = it.atom, r = q.a.r * q.s, k = q.a.cor || { L: 0.75, C: cats[q.a.cat].c, h: cats[q.a.cat].h }, f = 0.5 + 0.5 * Math.max(-1, Math.min(1, q.z / 120));
        // Os de trás ficam mais escuros, para dar profundidade.
        pintaEsfera(ctx, q.x, q.y, r, k, luz, f);
        if (r > 11) rotulo(ctx, q.x, q.y, r, k, q.a.sym);
      });
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      cv.removeEventListener('pointerdown', down); cv.removeEventListener('pointermove', move);
      cv.removeEventListener('pointerup', up); cv.removeEventListener('pointercancel', up);
      cv.removeEventListener('wheel', roda); cv.removeEventListener('dblclick', duplo);
    };
  }, []);

  return (
    <div className="mol3d">
      <canvas ref={ref} role="img" aria-label={label} style={{ width: W + 'px', height: 'auto', aspectRatio: `${W} / ${H}`, maxWidth: '100%', display: 'block', cursor: 'grab', touchAction: 'none' }} />
      {(zoom !== 1 || girou) && (
        <button className="mol3d-reset" onClick={restaurar} aria-label="Restaurar zoom e ângulo da molécula">
          <span aria-hidden="true">↺</span> {zoom !== 1 ? `${Math.round(zoom * 100)}%` : 'Restaurar'}
        </button>
      )}
    </div>
  );
}
