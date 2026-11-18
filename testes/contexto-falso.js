// Contexto 2D de mentira, mas exigente como o do navegador: createRadialGradient recusa números
// inválidos ou raios negativos, e addColorStop recusa cores com NaN/undefined. Foi um erro assim
// (cor do paládio virando NaN) que fazia o átomo 3D parar de ser desenhado no meio.
export function contextoFalso() {
  const erro = msg => { throw new Error(msg); };
  const numeros = (nome, ...v) => v.forEach(n => Number.isFinite(n) || erro(`${nome}: número inválido ${n}`));
  const GRADIENTE = Symbol('gradiente');
  const cor = c => c?.[GRADIENTE] || ((typeof c !== 'string' || /NaN|undefined|Infinity/.test(c)) && erro(`cor inválida: ${c}`));
  return {
    chamadas: 0,
    save() {}, restore() {}, beginPath() {}, closePath() {}, clip() {}, fill() {}, stroke() {},
    arc(x, y, r) { numeros('arc', x, y, r); r < 0 && erro(`arc: raio negativo ${r}`); this.chamadas++; },
    fillRect(...v) { numeros('fillRect', ...v); },
    moveTo(...v) { numeros('moveTo', ...v); }, lineTo(...v) { numeros('lineTo', ...v); },
    fillText(t, x, y) { numeros('fillText', x, y); },
    createRadialGradient(x0, y0, r0, x1, y1, r1) {
      numeros('createRadialGradient', x0, y0, r0, x1, y1, r1);
      (r0 < 0 || r1 < 0) && erro('createRadialGradient: raio negativo');
      return { [GRADIENTE]: true, addColorStop(p, c) { numeros('addColorStop', p); cor(c); } };
    },
    set fillStyle(c) { cor(c); }, get fillStyle() { return ''; },
    set strokeStyle(c) { cor(c); }, get strokeStyle() { return ''; },
    font: '', textAlign: '', textBaseline: '', lineWidth: 1, lineCap: '', globalAlpha: 1, shadowBlur: 0, shadowColor: '',
  };
}
