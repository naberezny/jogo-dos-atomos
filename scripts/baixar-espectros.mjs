// Baixa do NIST Atomic Spectra Database (https://physics.nist.gov/asd) as linhas de emissão
// visíveis (380–750 nm) de cada elemento e grava src/data/espectros.json.
// Uso: node scripts/baixar-espectros.mjs [símbolos...]   (sem símbolos, baixa todos, mais o deutério D)
//
// Regras:
// - espectro do átomo neutro (I); se ele não tiver linhas com intensidade, usa o do íon (II);
// - só linhas com intensidade relativa medida, vindas de níveis abaixo da energia de ionização;
// - guarda as 40 mais fortes, com a intensidade dividida pela maior (1 = a linha mais forte).
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const raiz = new URL('..', import.meta.url);
const { elements } = await import(new URL('src/data/nucleo.js', raiz));
const CIENCIA = JSON.parse(readFileSync(new URL('src/data/ciencia.json', raiz), 'utf8'));
const SAIDA = new URL('src/data/espectros.json', raiz);
const MAX_LINHAS = 40;
const EV_PARA_CM = 8065.544;

const url = espectro => 'https://physics.nist.gov/cgi-bin/ASD/lines1.pl?' + new URLSearchParams({
  spectra: espectro, limits_type: '0', low_w: '380', upp_w: '750', unit: '1', submit: 'Retrieve Data', de: '0',
  format: '3', line_out: '0', en_unit: '0', output: '0', bibrefs: '1', page_size: '15', show_obs_wl: '1',
  show_calc_wl: '1', unc_out: '1', order_out: '0', max_low_enrg: '', show_av: '2', max_upp_enrg: '',
  tsb_value: '0', min_str: '', A_out: '0', intens_out: 'on', max_str: '', allowed_out: '1', forbid_out: '1',
  min_accur: '', min_intens: '', conf_out: 'on', term_out: 'on', enrg_out: 'on', J_out: 'on',
});

// curl respeita o proxy de rede da sessão; o fetch do Node não.
const baixar = espectro => execFileSync('curl', ['-sS', '-m', '90', url(espectro)], { encoding: 'utf8', maxBuffer: 64 << 20 });
const num = v => { const m = /^[\s"]*([0-9]+(?:\.[0-9]+)?)/.exec(v || ''); return m ? +m[1] : null; };

/**
 * Isótopo sem intensidades no NIST (deutério): usa os comprimentos de onda medidos dele, com a
 * intensidade da linha correspondente do elemento comum (a mais próxima, a menos de 0,3 nm).
 */
function linhasEmprestadas(tsv, base) {
  if (!tsv.startsWith('obs_wl') || !base) return [];
  const [cab, ...resto] = tsv.trim().split('\n');
  const col = Object.fromEntries(cab.split('\t').map((c, i) => [c.trim(), i]));
  const nms = resto.map(l => { const c = l.split('\t'); return num(c[col['obs_wl_air(nm)']]) ?? num(c[col['ritz_wl_air(nm)']]); }).filter(v => v != null);
  return base.map(([b, it]) => {
    const perto = nms.reduce((m, nm) => (Math.abs(nm - b) < Math.abs(m - b) ? nm : m), Infinity);
    return Math.abs(perto - b) < 0.3 ? [+perto.toFixed(2), it] : null;
  }).filter(Boolean);
}

function linhas(tsv, ionCm) {
  if (!tsv.startsWith('obs_wl')) return [];
  const [cab, ...resto] = tsv.trim().split('\n');
  const col = Object.fromEntries(cab.split('\t').map((c, i) => [c.trim(), i]));
  const out = [];
  for (const l of resto) {
    const c = l.split('\t');
    const nm = num(c[col['obs_wl_air(nm)']]) ?? num(c[col['ritz_wl_air(nm)']]);
    const it = num(c[col.intens]);
    const ek = num(c[col['Ek(cm-1)']]);
    if (nm == null || it == null || it <= 0) continue;
    if (ionCm && ek != null && ek > ionCm) continue; // nível autoionizante: quase não aparece em lâmpadas
    out.push([nm, it]);
  }
  // Uma linha por comprimento de onda (a mais forte), as mais intensas primeiro.
  const porNm = new Map();
  for (const [nm, it] of out) { const k = nm.toFixed(2); if (!porNm.has(k) || porNm.get(k)[1] < it) porNm.set(k, [nm, it]); }
  const top = [...porNm.values()].sort((a, b) => b[1] - a[1]).slice(0, MAX_LINHAS);
  const max = top[0]?.[1] || 1;
  return top.map(([nm, it]) => [+nm.toFixed(2), +(it / max).toFixed(3)]).sort((a, b) => a[0] - b[0]);
}

const pedidos = process.argv.slice(2);
const dados = existsSync(SAIDA) ? JSON.parse(readFileSync(SAIDA, 'utf8')) : {};
// Isótopos com espectro próprio no NIST, usados no modo subatômico (energia de ionização igual à do H).
const ISOTOPOS = [{ sym: 'D', ionDe: 'H', intensDe: 'H' }];
const alvo = [...elements, ...ISOTOPOS].filter(e => !pedidos.length || pedidos.includes(e.sym));
for (const e of alvo) {
  const ion = CIENCIA[e.ionDe || e.sym]?.ion;
  const ionCm = ion ? ion * EV_PARA_CM : null;
  let res = null;
  for (const nivel of ['I', 'II']) {
    try {
      const ls = linhas(baixar(`${e.sym} ${nivel}`), nivel === 'I' ? ionCm : null);
      if (ls.length) { res = { ion: nivel, linhas: ls }; break; }
    } catch (err) { console.log(e.sym, nivel, 'erro:', err.message.split('\n')[0]); }
    await new Promise(r => setTimeout(r, 1000));
  }
  if (!res && e.intensDe && dados[e.intensDe]) {
    const ls = linhasEmprestadas(baixar(`${e.sym} I`), dados[e.intensDe].linhas);
    if (ls.length) res = { ion: 'I', linhas: ls, intensidadeDe: e.intensDe };
  }
  if (res) dados[e.sym] = res; else delete dados[e.sym];
  console.log(e.sym.padEnd(3), res ? `${res.ion.padEnd(2)} ${res.linhas.length} linhas` : 'sem dados');
  await new Promise(r => setTimeout(r, 1000));
}
writeFileSync(SAIDA, JSON.stringify(dados));
console.log('gravado', Object.keys(dados).length, 'elementos');
