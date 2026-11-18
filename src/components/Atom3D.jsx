// Modelo de Bohr animado: núcleo, órbitas inclinadas e elétrons girando.
// Arrastar gira o átomo; com onPick, clicar numa órbita seleciona a camada.
// Mesmo estilo do modelo 3D das moléculas (Mol3D): bolas sombreadas com a cor CPK do elemento,
// luz que gira junto com o átomo e órbitas da cor das varetas.
// Com `zoom` (ficha do elemento), pinça ou roda do mouse aproximam; de perto, o núcleo fica
// transparente e mostra os prótons e nêutrons.
import { useEffect, useRef, useState } from 'react';
import { corAtomo } from '../game/cor.js';
import { luzGirada, pintaEsfera, rotulo } from './esfera.js';

// Elétrons: bolinhas azul-claras; órbita selecionada: cor de destaque do jogo.
const ELETRON = { L: 0.86, C: 0.07, h: 235 };
const DESTAQUE = 'oklch(0.82 0.13 195';

const PROTON = { L: 0.62, C: 0.2, h: 25 };
const NEUTRON = { L: 0.78, C: 0.015, h: 250 };
const ZOOM_MIN = 1, ZOOM_MAX = 6;
// Zoom em que o núcleo começa a ficar transparente e em que já mostra tudo.
const NUCLEO_DE = 1.6, NUCLEO_ATE = 2.6;

const shared = { yaw: 0, pitch: -0.35 };

/**
 * Posições dos prótons e nêutrons dentro de uma esfera de raio 1 e o raio de cada bolinha.
 * Empilhamento homogêneo: as bolinhas ficam nos pontos de um arranjo compacto (como laranjas
 * empilhadas na feira), escolhendo as camadas mais próximas do centro. Na última camada, que fica
 * incompleta, os pontos são escolhidos bem espalhados. Prótons e nêutrons se alternam por igual.
 */
const NUCLEONS = new Map();
function nucleons(z, n) {
  const chave = z + '-' + n;
  if (NUCLEONS.has(chave)) return NUCLEONS.get(chave);
  const A = Math.max(1, z + n), L = Math.ceil(Math.cbrt(A)) + 2, rede = [];
  // Rede cúbica de faces centradas: pontos inteiros com soma par; vizinhos a √2 de distância.
  for (let i = -L; i <= L; i++) for (let j = -L; j <= L; j++) for (let k = -L; k <= L; k++)
    if ((i + j + k) % 2 === 0) rede.push({ x: i, y: j, z: k, r: Math.hypot(i, j, k) });
  rede.sort((a, b) => a.r - b.r || Math.atan2(a.y, a.x) - Math.atan2(b.y, b.x) || a.z - b.z);
  const pts = [];
  let i = 0;
  while (pts.length < A) {
    let j = i; while (j < rede.length && Math.abs(rede[j].r - rede[i].r) < 1e-6) j++;
    const camada = rede.slice(i, j), falta = A - pts.length;
    if (camada.length <= falta) pts.push(...camada);
    else {
      // Camada incompleta: cada novo ponto é o mais longe possível dos já escolhidos nela.
      const esc = [camada[0]];
      while (esc.length < falta) {
        let melhor = null, md = -1;
        for (const q of camada) {
          if (esc.includes(q)) continue;
          const d = Math.min(...esc.map(e => Math.hypot(q.x - e.x, q.y - e.y, q.z - e.z)));
          if (d > md) { md = d; melhor = q; }
        }
        esc.push(melhor);
      }
      pts.push(...esc);
    }
    i = j;
  }
  // Centraliza e encaixa tudo dentro da esfera de raio 1.
  const cx = pts.reduce((s, q) => s + q.x, 0) / A, cy = pts.reduce((s, q) => s + q.y, 0) / A, cz = pts.reduce((s, q) => s + q.z, 0) / A;
  const meio = Math.SQRT2 / 2, rmax = Math.max(...pts.map(q => Math.hypot(q.x - cx, q.y - cy, q.z - cz))) + meio;
  // Próton ou nêutron: cada bolinha olha as vizinhas já decididas e fica do tipo que está faltando
  // em volta dela; assim os dois tipos se misturam por igual em todo o núcleo.
  const quer = z / A;
  let restaZ = z, restaN = A - z, feitosZ = 0;
  pts.forEach((q, k) => {
    let viz = 0, vizP = 0;
    for (let m = 0; m < k; m++) {
      const o = pts[m];
      if (Math.hypot(q.x - o.x, q.y - o.y, q.z - o.z) < 1.5) { viz++; if (o.p) vizP++; }
    }
    const f = viz ? vizP / viz : feitosZ / Math.max(1, k);
    q.p = restaN === 0 ? true : restaZ === 0 ? false
      : Math.abs(f - quer) > 0.02 ? f < quer : feitosZ < quer * (k + 1);
    if (q.p) { restaZ--; feitosZ++; } else restaN--;
  });
  const res = {
    rb: meio / rmax,
    pts: pts.map(q => ({ x: (q.x - cx) / rmax, y: (q.y - cy) / rmax, z: (q.z - cz) / rmax, p: q.p })),
  };
  NUCLEONS.set(chave, res);
  return res;
}

export default function Atom3D(props) {
  const ref = useRef(null);
  const pr = useRef(props);
  pr.current = props;
  const zoomRef = useRef(1);
  const [zoom, setZoomState] = useState(1);
  const setZoom = z => { z = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, z)); if (z < 1.03) z = 1; zoomRef.current = z; setZoomState(z); };
  const setZoomFn = useRef(setZoom); setZoomFn.current = setZoom;
  // Trocar de elemento volta ao zoom normal.
  useEffect(() => { zoomRef.current = 1; setZoomState(1); }, [props.sym]);

  useEffect(() => {
    const cv = ref.current, ctx = cv.getContext('2d');
    let raf;
    const local = { yaw: 0, pitch: -0.35 }, drag = { on: false, x: 0, y: 0, moved: 0 };
    let spinY = 0, k = 0, last = performance.now(), rings = [], hover = -1, nucleo = 0;
    const R = () => (pr.current.own ? local : shared);
    const segDist = (px, py, a, b) => {
      const dx = b[0] - a[0], dy = b[1] - a[1];
      const t = Math.max(0, Math.min(1, ((px - a[0]) * dx + (py - a[1]) * dy) / (dx * dx + dy * dy || 1)));
      return Math.hypot(px - a[0] - t * dx, py - a[1] - t * dy);
    };
    const hit = e => {
      const bb = cv.getBoundingClientRect(), x = e.clientX - bb.left, y = e.clientY - bb.top;
      // Com zoom, tocar no núcleo não escolhe a camada que passa na frente dele.
      if (zoomRef.current > 1 && Math.hypot(x - bb.width / 2, y - bb.height / 2) < nucleo) return -1;
      let best = -1, bd = e.pointerType === 'touch' ? 16 : 8;
      rings.forEach((pts, i) => { for (let j = 1; j < pts.length; j++) { const d = segDist(x, y, pts[j - 1], pts[j]); if (d < bd) { bd = d; best = i; } } });
      return best;
    };
    // Dedos na tela: um gira; dois fazem pinça (zoom, só com a prop zoom).
    const dedos = new Map();
    let pinca = null;
    const distancia = () => { const [a, b] = [...dedos.values()]; return Math.hypot(a.x - b.x, a.y - b.y) || 1; };
    const down = e => {
      dedos.set(e.pointerId, { x: e.clientX, y: e.clientY });
      cv.setPointerCapture(e.pointerId);
      if (dedos.size === 2 && pr.current.zoom) { drag.on = false; pinca = { d: distancia(), z: zoomRef.current }; return; }
      drag.on = true; drag.x = e.clientX; drag.y = e.clientY; drag.moved = 0;
    };
    const move = e => {
      if (dedos.has(e.pointerId)) dedos.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (pinca && dedos.size >= 2) { setZoomFn.current(pinca.z * distancia() / pinca.d); return; }
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
    const up = e => {
      dedos.delete(e.pointerId);
      if (pinca) {
        if (dedos.size < 2) pinca = null;
        // Sobrou um dedo depois da pinça: ele volta a girar a partir de onde está, sem escolher camada.
        if (dedos.size === 1) { const [d] = dedos.values(); drag.on = true; drag.x = d.x; drag.y = d.y; drag.moved = 99; }
        else drag.on = false;
        return;
      }
      if (drag.on && drag.moved < 5 && pr.current.onPick) pr.current.onPick(hit(e));
      drag.on = false;
    };
    const leave = () => { hover = -1; };
    const roda = e => { if (!pr.current.zoom) return; e.preventDefault(); setZoomFn.current(zoomRef.current * Math.exp(-e.deltaY * 0.0015)); };
    cv.addEventListener('pointerdown', down); cv.addEventListener('pointermove', move);
    cv.addEventListener('pointerup', up); cv.addEventListener('pointercancel', up); cv.addEventListener('pointerleave', leave);
    cv.addEventListener('wheel', roda, { passive: false });

    const frame = now => {
      const { size: S, shells, h, c, fusing, top, sel, own } = pr.current;
      const dpr = window.devicePixelRatio || 1;
      const dt = Math.min(0.05, (now - last) / 1000); last = now;
      if (cv.width !== Math.round(S * dpr)) { cv.width = Math.round(S * dpr); cv.height = Math.round(S * dpr); }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, S, S);
      k += ((top ? 1 : 0) - k) * Math.min(1, dt * 5);
      if (!drag.on && !top) spinY += dt * 0.25;
      const Zm = pr.current.zoom ? zoomRef.current : 1;
      const t = now / 1000, C = S / 2, Rr = C * 0.86 * Zm, N = shells.length, sp = fusing ? 3.5 : 1, r0 = R();
      const yaw = (r0.yaw + (own ? spinY : t * 0.25)) * (1 - k), pitch = r0.pitch * (1 - k);
      const cy = Math.cos(yaw), sy = Math.sin(yaw), cp = Math.cos(pitch), spn = Math.sin(pitch);
      const proj = (x, y, z) => { const x1 = x * cy + z * sy, z1 = -x * sy + z * cy; const y2 = y * cp - z1 * spn, z2 = y * spn + z1 * cp; return [C + x1, C + y2, z2]; };
      const luz = luzGirada(cy, sy, cp, spn);
      const cor = pr.current.sym ? corAtomo(pr.current.sym) : { L: 0.78, C: c, h };
      const hasSel = sel != null && sel >= 0;
      // Cada órbita é cortada em trechos de trás e da frente do núcleo; os elétrons também.
      const tras = [], frente = [];
      rings = [];
      shells.forEach((count, i) => {
        const n = i + 1, r = N === 1 ? Rr : Rr * (0.32 + 0.68 * i / (N - 1));
        const tilt = (1.15 + n * 0.41) * (1 - k), spin = n * 0.93, ct = Math.cos(tilt), st = Math.sin(tilt), cs = Math.cos(spin), ss = Math.sin(spin);
        const pt = th => { const x0 = r * Math.cos(th), y0 = r * Math.sin(th); const y1 = y0 * ct, z1 = y0 * st; return proj(x0 * cs - y1 * ss, x0 * ss + y1 * cs, z1); };
        const pts = []; for (let q = 0; q <= 72; q++) pts.push(pt(q / 72 * Math.PI * 2));
        rings.push(pts);
        const on = i === sel, hv = i === hover;
        for (let j = 1; j < pts.length; j++) {
          const a = pts[j - 1], b = pts[j], z = (a[2] + b[2]) / 2;
          (z < 0 ? tras : frente).push({ z, linha: [a, b], on, hv, i });
        }
        if (own && k > 0.6) {
          const lp = pts[63];
          frente.push({ z: Rr * 2, texto: ['KLMNOPQ'[i], lp[0] + 4, lp[1] - 4, (k - 0.6) / 0.4, on] });
        }
        const w = t * sp * 1.4 / Math.pow(n, 0.8);
        for (let q = 0; q < count; q++) {
          const p3 = pt(w + q * Math.PI * 2 / count);
          (p3[2] < 0 ? tras : frente).push({ z: p3[2], eletron: p3, alfa: hasSel ? (on ? 1 : 0.35) : 1, on });
        }
      });
      const re = Math.max(1.3, S * (own ? 0.017 : 0.026)) * Math.sqrt(Zm);
      const desenha = it => {
        const prof = 0.5 + 0.5 * Math.max(-1, Math.min(1, it.z / Rr));
        if (it.linha) {
          const [a, b] = it.linha;
          ctx.strokeStyle = it.on ? `${DESTAQUE} / 0.95)` : it.hv ? `${DESTAQUE} / 0.6)`
            : `oklch(${0.36 + prof * 0.18 + luz.frente * 0.12} 0.02 265 / ${hasSel ? 0.45 : 1})`;
          ctx.lineWidth = (it.on ? 2.4 : it.hv ? 1.8 : 1.3) * (S > 200 ? 1 : 0.8); ctx.lineCap = 'round';
          ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke();
          return;
        }
        if (it.texto) {
          const [txt, x, y, alfa, on] = it.texto;
          ctx.globalAlpha = alfa; ctx.fillStyle = on ? `${DESTAQUE})` : 'oklch(0.72 0.02 265)';
          ctx.font = "600 10px 'Chakra Petch', sans-serif"; ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
          ctx.fillText(txt, x, y); ctx.globalAlpha = 1;
          return;
        }
        const [x, y] = it.eletron, rr = re * (0.85 + 0.3 * prof) * (it.on && hasSel ? 1.25 : 1);
        ctx.globalAlpha = it.alfa;
        if (rr >= 2.5) pintaEsfera(ctx, x, y, rr, ELETRON, luz, prof);
        else { ctx.fillStyle = `oklch(${0.6 + 0.3 * prof} 0.06 235)`; ctx.beginPath(); ctx.arc(x, y, rr, 0, Math.PI * 2); ctx.fill(); }
        ctx.globalAlpha = 1;
      };
      tras.sort((a, b) => a.z - b.z).forEach(desenha);
      // Núcleo: uma bola na cor CPK do elemento, como os átomos das moléculas. Com zoom, ele fica
      // transparente e mostra os prótons (vermelhos) e nêutrons (cinza) lá dentro.
      const nr = Math.max(3, S * (own ? 0.075 : 0.1)) * Zm;
      nucleo = nr;
      const vidro = Math.max(0, Math.min(1, (Zm - NUCLEO_DE) / (NUCLEO_ATE - NUCLEO_DE)));
      if (fusing) {
        const halo = ctx.createRadialGradient(C, C, nr * 0.8, C, C, nr * 2.4);
        halo.addColorStop(0, `oklch(0.85 ${Math.min(0.15, cor.C + 0.05)} ${cor.h} / 0.45)`); halo.addColorStop(1, `oklch(0.85 ${cor.C} ${cor.h} / 0)`);
        ctx.fillStyle = halo; ctx.beginPath(); ctx.arc(C, C, nr * 2.4, 0, Math.PI * 2); ctx.fill();
      }
      if (vidro > 0) {
        const { pts, rb } = nucleons(pr.current.prot ?? 1, pr.current.neut ?? 0);
        // Fundo do vidro: um véu bem leve da cor do elemento.
        ctx.fillStyle = `oklch(${cor.L} ${cor.C} ${cor.h} / ${0.14 * vidro})`;
        ctx.beginPath(); ctx.arc(C, C, nr, 0, Math.PI * 2); ctx.fill();
        ctx.globalAlpha = vidro;
        pts.map(q => { const [x, y, z] = proj(q.x * nr, q.y * nr, q.z * nr); return { x, y, z, p: q.p }; })
          .sort((a, b) => a.z - b.z)
          .forEach(q => {
            const r = rb * nr, k = q.p ? PROTON : NEUTRON;
            pintaEsfera(ctx, q.x, q.y, r, k, luz, 0.5 + 0.5 * q.z / nr);
            // Nome da partícula dentro da bolinha, quando há espaço para ler.
            if (r > 8) rotulo(ctx, q.x, q.y, r, k, q.p ? 'p⁺' : 'n');
          });
        ctx.globalAlpha = 1;
      }
      if (vidro < 1) {
        ctx.globalAlpha = 1 - vidro;
        pintaEsfera(ctx, C, C, nr, cor, luz);
        if (nr > 11 && pr.current.sym && vidro < 0.5) rotulo(ctx, C, C, Math.min(nr, 40), cor, pr.current.sym);
        ctx.globalAlpha = 1;
      }
      if (vidro > 0) {
        // Casca de vidro: borda clara e um reflexo, para o núcleo continuar parecendo uma bola.
        ctx.strokeStyle = `oklch(${Math.min(0.95, cor.L + 0.2)} ${cor.C} ${cor.h} / ${0.6 * vidro})`; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.arc(C, C, nr, 0, Math.PI * 2); ctx.stroke();
        const fx = C - nr * 0.4, fy = C - nr * 0.45, rf = ctx.createRadialGradient(fx, fy, 0, fx, fy, nr * 0.35);
        rf.addColorStop(0, `oklch(1 0 0 / ${0.3 * vidro})`); rf.addColorStop(1, 'oklch(1 0 0 / 0)');
        ctx.fillStyle = rf; ctx.beginPath(); ctx.arc(C, C, nr, 0, Math.PI * 2); ctx.fill();
      }
      frente.sort((a, b) => a.z - b.z).forEach(desenha);
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      cv.removeEventListener('pointerdown', down); cv.removeEventListener('pointermove', move);
      cv.removeEventListener('pointerup', up); cv.removeEventListener('pointercancel', up); cv.removeEventListener('pointerleave', leave);
      cv.removeEventListener('wheel', roda);
    };
  }, []);

  const tela = (
    <canvas
      ref={ref}
      role="img"
      aria-label={props.title}
      title={props.title}
      style={{ width: props.size + 'px', height: props.size + 'px', display: 'block', cursor: 'grab', touchAction: 'none',
        // Com zoom, as órbitas passam da borda: um esfumado redondo evita o corte reto do quadro.
        ...(props.zoom && { maskImage: 'radial-gradient(closest-side, #000 88%, transparent)', WebkitMaskImage: 'radial-gradient(closest-side, #000 88%, transparent)' }) }}
    />
  );
  if (!props.zoom) return tela;
  return (
    <>
      {tela}
      {zoom !== 1 && (
        <button className="mol3d-reset atom3d-reset" onClick={() => setZoom(1)} aria-label="Restaurar o zoom do átomo">
          <span aria-hidden="true">↺</span> {Math.round(zoom * 100)}%
        </button>
      )}
    </>
  );
}
