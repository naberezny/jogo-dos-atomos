// Bola 3D sombreada, usada nos modelos das moléculas (Mol3D) e dos átomos (Atom3D), para os dois
// terem a mesma aparência. A luz principal fica presa ao modelo: gira junto com ele, então o brilho
// desliza pela superfície de cada bola. (x para a direita, y para baixo, z para a câmera)
const LUZ = (() => { const v = [-0.55, -0.65, 0.52], n = Math.hypot(...v); return v.map(c => c / n); })();

/** Direção da luz depois da mesma rotação do modelo (cossenos e senos do giro e da inclinação). */
export function luzGirada(cy, sy, cp, sp) {
  const lx1 = LUZ[0] * cy + LUZ[2] * sy, lz1 = -LUZ[0] * sy + LUZ[2] * cy;
  const Lx = lx1, Ly = LUZ[1] * cp - lz1 * sp, Lz = LUZ[1] * sp + lz1 * cp;
  return { Lx, Ly, Lz, frente: Math.max(0, Lz), tras: Math.max(0, -Lz) };
}

/**
 * Pinta uma bola de raio r em (x, y) com a cor k = { L, C, h } (OKLCH).
 * prof (0 a 1) escurece as bolas do fundo, para dar profundidade (1 = mais perto).
 */
export function pintaEsfera(ctx, x, y, r, k, luz, prof = 1) {
  const { Lx, Ly, frente, tras } = luz;
  const escuro = 0.78 + 0.22 * prof;
  // Lado iluminado: para onde a luz aponta na tela (ponto que acompanha a rotação).
  const hx = x + Lx * r * 0.55, hy = y + Ly * r * 0.55;
  ctx.save(); ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.clip();
  // 1) corpo: claro do lado da luz, escuro do lado oposto; nunca apaga de vez (luz ambiente).
  const corpo = ctx.createRadialGradient(hx, hy, r * 0.05, x - Lx * r * 0.2, y - Ly * r * 0.2, r * 1.35);
  corpo.addColorStop(0, `oklch(${Math.min(0.99, k.L + 0.16 + 0.12 * frente) * escuro} ${k.C * 0.6} ${k.h})`);
  corpo.addColorStop(0.45, `oklch(${k.L * (0.84 + 0.16 * frente) * escuro} ${k.C} ${k.h})`);
  corpo.addColorStop(1, `oklch(${k.L * 0.36 * escuro} ${k.C * 0.85} ${k.h})`);
  ctx.fillStyle = corpo; ctx.fillRect(x - r, y - r, r * 2, r * 2);
  // 2) reflexo: ponto branco que corre pela bola; some quando a luz passa para trás.
  if (frente > 0.05) {
    const rf = ctx.createRadialGradient(hx, hy, 0, hx, hy, r * 0.42);
    rf.addColorStop(0, `oklch(1 0 0 / ${0.9 * frente ** 1.5})`); rf.addColorStop(1, 'oklch(1 0 0 / 0)');
    ctx.fillStyle = rf; ctx.fillRect(x - r, y - r, r * 2, r * 2);
  }
  // 2b) reflexo fixo da câmera, fraquinho: a bola nunca perde o aspecto brilhante.
  const fx = x - r * 0.38, fy = y - r * 0.42, rc = ctx.createRadialGradient(fx, fy, 0, fx, fy, r * 0.3);
  rc.addColorStop(0, 'oklch(1 0 0 / 0.28)'); rc.addColorStop(1, 'oklch(1 0 0 / 0)');
  ctx.fillStyle = rc; ctx.fillRect(x - r, y - r, r * 2, r * 2);
  // 3) sombra suave na borda, que arredonda a bola.
  const borda = ctx.createRadialGradient(x, y, r * 0.62, x, y, r);
  borda.addColorStop(0, 'oklch(0.1 0.02 265 / 0)'); borda.addColorStop(1, 'oklch(0.1 0.02 265 / 0.42)');
  ctx.fillStyle = borda; ctx.fillRect(x - r, y - r, r * 2, r * 2);
  // 4) contraluz: com a luz atrás, acende a borda do lado dela.
  if (tras > 0.05) {
    const ex = x + Lx * r, ey = y + Ly * r;
    const rim = ctx.createRadialGradient(ex, ey, 0, ex, ey, r * 1.1);
    rim.addColorStop(0, `oklch(0.96 ${Math.min(0.07, k.C)} ${k.h} / ${0.95 * tras})`); rim.addColorStop(0.6, `oklch(0.85 ${Math.min(0.1, k.C)} ${k.h} / 0)`);
    ctx.fillStyle = rim; ctx.fillRect(x - r, y - r, r * 2, r * 2);
  }
  ctx.restore();
}

/** Símbolo escrito sobre a bola, escuro em bolas claras e claro em bolas escuras. */
export function rotulo(ctx, x, y, r, k, txt) {
  ctx.fillStyle = k.L > 0.55 ? 'oklch(0.15 0.02 265 / 0.85)' : 'oklch(0.97 0.01 265 / 0.9)';
  ctx.font = `600 ${Math.round(r * 0.62)}px 'Chakra Petch', sans-serif`;
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(txt, x, y + 1);
}
