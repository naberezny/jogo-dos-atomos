// Monta uma substância do catálogo.
// f: fórmula achatada, usada para reconhecer a combinação (ex.: 'CaH2O2').
// d: fórmula exibida, quando difere de f (ex.: 'Ca(OH)₂'); sem d, f ganha subscritos.
export const S = (f, name, state, where, fact, d) => ({ f, name, state, where, fact, d: d || f });
