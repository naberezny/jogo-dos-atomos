// Baixa as fotos escolhidas de cada substância (lista em fotos-escolhidas.mjs) do Wikimedia
// Commons, guarda em public/fotos/<fórmula>.jpg (principal) e <fórmula>-2.jpg, -3.jpg... (extras),
// com 500 px de largura, e grava autor, licença e legenda em src/data/fotos.json.
//
// Uso: NODE_USE_ENV_PROXY=1 node scripts/baixar-fotos.mjs            (só as que faltam)
//      NODE_USE_ENV_PROXY=1 node scripts/baixar-fotos.mjs --todas    (refaz todas)
//
// A API da Wikimedia limita muito os pedidos (429); por isso os dados de autor e licença
// são pedidos em lotes de 40 arquivos, com novas tentativas, e as imagens vêm direto do
// servidor de miniaturas. PNGs são convertidos para JPEG com o ImageMagick (`convert`).
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { FOTOS } from './fotos-escolhidas.mjs';

const ROOT = new URL('../', import.meta.url);
const OUT_DIR = new URL('public/fotos/', ROOT);
const META = new URL('src/data/fotos.json', ROOT);
const UA = 'JogoEducativoQuimica/1.0 (educational game; low volume)';
const LARGURA = 500;


const sleep = ms => new Promise(r => setTimeout(r, ms));
const limpa = s => (s || '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

/** GET com novas tentativas (a Wikimedia responde 429 com frequência). */
async function pegar(url, tentativas = 200) {
  for (let i = 0; i < tentativas; i++) {
    try {
      const r = await fetch(url, { headers: { 'User-Agent': UA } });
      if (r.ok) return r;
      if (r.status === 404) throw new Error('404 ' + url);
    } catch (e) { if (e.message.startsWith('404')) throw e; }
    await sleep(2000);
  }
  throw new Error('falhou: ' + url);
}

/** Autor, licença e página de cada arquivo, em lotes de 40. */
async function metadados(arquivos) {
  const out = {};
  for (let i = 0; i < arquivos.length; i += 40) {
    const lote = arquivos.slice(i, i + 40);
    const url = 'https://commons.wikimedia.org/w/api.php?' + new URLSearchParams({
      action: 'query', format: 'json', formatversion: '2', prop: 'imageinfo', iiprop: 'url|extmetadata|mime',
      titles: lote.map(t => 'File:' + t).join('|'),
    });
    const j = await (await pegar(url)).json();
    const volta = Object.fromEntries((j.query.normalized || []).map(n => [n.to, n.from]));
    for (const p of j.query.pages) {
      const ii = p.imageinfo?.[0];
      if (!ii) continue;
      const em = ii.extmetadata || {};
      out[(volta[p.title] || p.title).replace(/^File:/, '')] = {
        autor: limpa(em.Artist?.value) || 'Desconhecido',
        licenca: limpa(em.LicenseShortName?.value) || 'Ver página',
        pagina: ii.descriptionurl,
        png: ii.mime === 'image/png',
      };
    }
  }
  return out;
}

/** Endereço da miniatura no Commons (caminho derivado do MD5 do nome do arquivo). */
function miniatura(arquivo) {
  const h = createHash('md5').update(arquivo).digest('hex');
  const n = encodeURIComponent(arquivo);
  return `https://thumb.wikimedia.org/wikipedia/commons/thumb/${h[0]}/${h.slice(0, 2)}/${n}/${LARGURA}px-${n}`;
}

async function main() {
  const todas = process.argv.includes('--todas');
  await mkdir(OUT_DIR, { recursive: true });
  const antigo = existsSync(META) ? JSON.parse(await readFile(META, 'utf8')) : {};
  // Arquivo local de cada foto: <f>.jpg (principal), <f>-2.jpg, <f>-3.jpg...
  const nome = (f, i) => f + (i ? '-' + (i + 1) : '') + '.jpg';
  const lista = Object.entries(FOTOS).flatMap(([f, fotos]) => (fotos || []).map(([arquivo, legenda, descricao], i) => ({ f, i, arquivo, legenda, descricao })));
  const pronta = ({ f, i, arquivo }) => !todas && antigo[f]?.[i]?.arquivo === arquivo && existsSync(new URL(nome(f, i), OUT_DIR));
  const info = await metadados([...new Set(lista.filter(x => !pronta(x)).map(x => x.arquivo))]);
  const meta = {}, faltando = [];
  for (const x of lista) {
    const { f, i, arquivo, legenda, descricao } = x;
    let m = null;
    if (pronta(x)) { const { legenda: _l, descricao: _d, ...resto } = antigo[f][i]; m = resto; }
    if (!m) {
      const d = info[arquivo];
      try {
        if (!d) throw new Error('sem dados no Commons');
        let buf = Buffer.from(await (await pegar(miniatura(arquivo), 20)).arrayBuffer());
        // Converte (PNG → JPEG) e recomprime para deixar as fotos leves.
        buf = execFileSync('convert', ['-', '-background', 'white', '-flatten', '-strip', '-quality', '80', 'jpg:-'], { input: buf });
        await writeFile(new URL(nome(f, i), OUT_DIR), buf);
        m = { arquivo, autor: d.autor, licenca: d.licenca, pagina: d.pagina };
        console.log('ok  ', nome(f, i).padEnd(16), arquivo);
      } catch (e) { faltando.push(nome(f, i)); console.log('erro', nome(f, i), e.message); continue; }
    }
    (meta[f] ||= [])[i] = { ...m, legenda, ...(descricao ? { descricao } : {}) };
  }
  for (const f of Object.keys(meta)) meta[f] = meta[f].filter(Boolean);
  await writeFile(META, JSON.stringify(meta, null, 1) + '\n');
  console.log(`\n${Object.keys(meta).length} substâncias com foto, ${lista.length} fotos; erros: ${faltando.join(', ') || 'nenhum'}`);
}

if (process.argv[1]?.endsWith('baixar-fotos.mjs')) main();
