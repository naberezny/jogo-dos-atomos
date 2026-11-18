// Baixa os isótopos conhecidos dos 118 elementos e grava src/data/isotopos.json.
//  - Lista, massa e abundância natural: NIST "Atomic Weights and Isotopic Compositions"
//    (physics.nist.gov). Massas marcadas com # no NIST são estimadas.
//  - Meia-vida: tabelas das páginas "Isotopes of …" da Wikipédia em inglês, que citam a
//    NUBASE2020 (Kondev et al., Chinese Physics C 45, 030001, 2021).
//
// Uso: NODE_USE_ENV_PROXY=1 node scripts/baixar-isotopos.mjs
//      (as páginas ficam guardadas em CACHE_ISOTOPOS, padrão: pasta temporária do sistema)
//
// Formato: { "<Z>": [[A, massa, abundância|null, meiaVida], ...] }, com meiaVida =
//   "e" (estável), número de segundos, ">N" (limite inferior, em segundos) ou null (desconhecida).
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const UA = 'JogoEducativoQuimica/1.0 (educational game; low volume)';
const CACHE = process.env.CACHE_ISOTOPOS || join(tmpdir(), 'cache-isotopos');
const SAIDA = new URL('../src/data/isotopos.json', import.meta.url);
const sleep = ms => new Promise(r => setTimeout(r, ms));

// Nomes em inglês, na ordem do número atômico, para achar "Isotopes of <nome>".
const NOMES = `hydrogen helium lithium beryllium boron carbon nitrogen oxygen fluorine neon sodium magnesium aluminium silicon
phosphorus sulfur chlorine argon potassium calcium scandium titanium vanadium chromium manganese iron cobalt nickel copper zinc
gallium germanium arsenic selenium bromine krypton rubidium strontium yttrium zirconium niobium molybdenum technetium ruthenium
rhodium palladium silver cadmium indium tin antimony tellurium iodine xenon caesium barium lanthanum cerium praseodymium neodymium
promethium samarium europium gadolinium terbium dysprosium holmium erbium thulium ytterbium lutetium hafnium tantalum tungsten
rhenium osmium iridium platinum gold mercury thallium lead bismuth polonium astatine radon francium radium actinium thorium
protactinium uranium neptunium plutonium americium curium berkelium californium einsteinium fermium mendelevium nobelium
lawrencium rutherfordium dubnium seaborgium bohrium hassium meitnerium darmstadtium roentgenium copernicium nihonium flerovium
moscovium livermorium tennessine oganesson`.split(/\s+/);

async function pegar(url, arquivo) {
  if (arquivo && existsSync(arquivo)) return readFile(arquivo, 'utf8');
  for (let i = 0; i < 60; i++) {
    try {
      const r = await fetch(url, { headers: { 'User-Agent': UA } });
      if (r.ok) { const t = await r.text(); if (arquivo) await writeFile(arquivo, t); return t; }
      if (r.status === 404) throw new Error('404 ' + url);
    } catch (e) { if (e.message.startsWith('404')) throw e; }
    await sleep(3000);
  }
  throw new Error('falhou: ' + url);
}

const numero = s => parseFloat(String(s).replace(/\(.*?\)/g, '').replace(/#/g, '').trim());

/** NIST: { Z: [{ A, massa, ab }] } */
function lerNist(html) {
  const txt = html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ');
  const res = {};
  for (const bloco of txt.split(/\n\s*\n/)) {
    const z = /Atomic Number = (\d+)/.exec(bloco), a = /Mass Number = (\d+)/.exec(bloco), m = /Relative Atomic Mass = ([^\n]+)/.exec(bloco);
    if (!z || !a || !m) continue;
    const ab = /Isotopic Composition = ([0-9.]+)/.exec(bloco);
    (res[+z[1]] ||= []).push({ A: +a[1], massa: numero(m[1]), ab: ab ? numero(ab[1]) : null });
  }
  return res;
}

// Meia-vida da Wikipédia → segundos
const UNID = { ys: 1e-24, zs: 1e-21, as: 1e-18, fs: 1e-15, ps: 1e-12, ns: 1e-9, 'μs': 1e-6, 'µs': 1e-6, us: 1e-6, ms: 1e-3, s: 1, min: 60, h: 3600, d: 86400, y: 31557600, a: 31557600, ky: 31557600e3, My: 31557600e6, Gy: 31557600e9 };
function meiaVida(celula) {
  let t = celula.replace(/<sup[^>]*class="reference".*?<\/sup>/gs, '').replace(/<sup>([^<]*)<\/sup>/g, '^$1').replace(/<br\s*\/?>/g, ' ').replace(/<[^>]+>/g, ' ')
    .replace(/&#160;|&nbsp;/g, ' ').replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/&#8722;|−/g, '-').replace(/\s+/g, ' ').trim();
  if (/stable/i.test(t)) return 'e';
  // Valor com # é estimado (sistemática), não medido: usa só um limite medido entre colchetes, se houver.
  if (/#/.test(t)) { const lim = /\[\s*(>[^\]]+)\]/.exec(t); if (!lim) return null; t = lim[1]; }
  t = t.replace(/\[[^\]]*\]/g, ' ').replace(/(\d)\s*\+\s*[0-9.]+\s*-\s*[0-9.]+/, '$1').trim(); // incerteza assimétrica (+0,5 −0,3)
  const limite = /^[>≥]/.test(t);
  t = t.replace(/^[>≥<~]\s*/, '');
  const m = /^([0-9.]+)\s*(?:\([^)]*\))?\s*(?:[×x]\s*10\s*\^\s*(-?\d+))?\s*([a-zA-Zμµ]+)/.exec(t);
  if (!m || !(m[3] in UNID)) return null;
  const seg = parseFloat(m[1]) * (m[2] ? 10 ** +m[2] : 1) * UNID[m[3]];
  return limite ? '>' + Number(seg.toPrecision(3)) : Number(seg.toPrecision(4));
}

/** Wikipédia: { A: meiaVida } (só o estado fundamental; isômeros nucleares ficam de fora). */
function lerWiki(html, sym, z) {
  const res = {};
  const i = html.indexOf('class="wikitable');
  if (i < 0) return res;
  const tabela = html.slice(i, html.indexOf('</table>', i));
  const cab = tabela.slice(0, tabela.indexOf('</tr>'));
  const temAno = /Discovery/i.test(cab);
  for (const linha of tabela.split(/<tr[^>]*>/).slice(1)) {
    const cel = [...linha.matchAll(/<t[dh][^>]*>(.*?)(?=<t[dh][^>]*>|$)/gs)].map(x => x[1]);
    if (cel.length < 5) continue;
    const limpa = c => c.replace(/<[^>]+>/g, '').replace(/&#160;|&nbsp;/g, ' ').replace(/\[[^\]]*\]/g, '').trim();
    const nuc = limpa(cel[0]).replace(/\s+/g, '');
    const m = /^(\d+)([A-Z][a-z]?)$/.exec(nuc);
    if (!m) continue; // isômeros (ex.: 26mAl) e linhas de continuação
    const A = +m[1];
    if (m[2] !== sym && !(sym === 'H' && /^[DT]$/.test(m[2]))) continue;
    // Algumas páginas têm colunas a mais (ex.: "Historic name"): acha o Z e o N da linha e conta dali.
    const iz = cel.findIndex((c, k) => k > 0 && k < 4 && limpa(c) === String(z) && limpa(cel[k + 1] || '') === String(A - z));
    if (iz < 0) continue;
    const idx = iz + 3 + (temAno ? 1 : 0); // Z, N, massa, [ano], meia-vida
    if (cel[idx] !== undefined && !(A in res)) res[A] = meiaVida(cel[idx]);
  }
  return res;
}

await mkdir(CACHE, { recursive: true });
console.log('NIST…');
const nist = lerNist(await pegar('https://physics.nist.gov/cgi-bin/Compositions/stand_alone.pl?ele=&ascii=ascii2&isotype=all', join(CACHE, 'nist.html')));
const simbolos = {};
{
  const txt = (await readFile(join(CACHE, 'nist.html'), 'utf8')).replace(/<[^>]*>/g, '');
  for (const [, z, s] of txt.matchAll(/Atomic Number = (\d+)\s*\nAtomic Symbol = ([A-Za-z]+)/g)) if (!/^[DT]$/.test(s)) simbolos[+z] ||= s;
}
const saida = {};
let semMeia = 0, total = 0;
for (let z = 1; z <= 118; z++) {
  const sym = simbolos[z];
  let wiki = {};
  try {
    wiki = lerWiki(await pegar(`https://en.wikipedia.org/wiki/Isotopes_of_${NOMES[z - 1]}`, join(CACHE, `w${z}.html`)), sym, z);
  } catch (e) { console.log('  sem página:', sym, e.message); }
  saida[z] = (nist[z] || []).sort((a, b) => a.A - b.A).map(({ A, massa, ab }) => {
    let hl = A in wiki ? wiki[A] : null;
    if (ab != null && hl == null) hl = 'e'; // natural e sem meia-vida na tabela: estável
    total++; if (hl == null) semMeia++;
    return [A, Number(massa.toPrecision(9)), ab, hl];
  });
  process.stdout.write(`${sym}:${saida[z].length} `);
  await sleep(200);
}
await writeFile(SAIDA, JSON.stringify(saida));
console.log(`\n${total} isótopos; sem meia-vida conhecida: ${semMeia}`);
