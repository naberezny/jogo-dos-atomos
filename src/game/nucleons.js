// Núcleo do átomo para o modelo 3D (Atom3D): onde fica cada próton e nêutron.

/**
 * Posições dos prótons e nêutrons dentro de uma esfera de raio 1 e o raio de cada bolinha.
 * Empilhamento homogêneo: as bolinhas ficam nos pontos de um arranjo compacto (como laranjas
 * empilhadas na feira), escolhendo as camadas mais próximas do centro. Na última camada, que fica
 * incompleta, os pontos são escolhidos bem espalhados. Prótons e nêutrons se alternam por igual.
 */
const NUCLEONS = new Map();
export function nucleons(z, n) {
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
