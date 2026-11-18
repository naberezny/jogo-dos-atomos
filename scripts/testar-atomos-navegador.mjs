// Abre a ficha de todos os 118 elementos no navegador e confere o átomo 3D: núcleo desenhado no
// centro, canvas quadrado, zoom até 600% (núcleo com prótons e nêutrons) e nenhum erro na página.
// Testa no computador (densidade 1, onde o canvas esticado aparecia) e no celular (Pixel 7).
//
// Uso: npm run testar:navegador   (sobe o Vite sozinho; precisa do Playwright com Chromium)
import { createRequire } from 'node:module';
import { createServer } from 'vite';

const require = createRequire(import.meta.url);
const { chromium, devices } = require('playwright');

const servidor = await createServer({ server: { port: 5199, strictPort: true }, logLevel: 'error' });
await servidor.listen();
const URL = 'http://localhost:5199/';
const navegador = await chromium.launch();
const problemas = [];

async function testar(nome, opcoes, celular) {
  const p = await (await navegador.newContext(opcoes)).newPage();
  let erros = [];
  p.on('pageerror', e => erros.push(e.message));
  p.on('console', m => { if (m.type() === 'error') erros.push(m.text()); });
  await p.goto(URL);
  await p.evaluate(() => localStorage.setItem('nucleo-save-v1', JSON.stringify({ discovered: ['H2O'], tourVisto: true })));
  await p.reload();
  await p.getByRole('button', { name: /Estudos/ }).first().click();
  await p.waitForSelector('.ptable [role=button]');
  const rotulos = await p.$$eval('.ptable [role=button]', els => els.map(e => e.getAttribute('aria-label')));
  const sel = celular ? '.drawer .atom-stage canvas' : '.atom-stage canvas';
  // Soma da opacidade dos pixels do centro do canvas (o núcleo); -1 se o canvas não for quadrado.
  const centro = () => p.evaluate(s => {
    const c = document.querySelector(s);
    if (!c || c.width !== c.height) return -1;
    const d = c.getContext('2d').getImageData(c.width / 2 - 2, c.height / 2 - 2, 4, 4).data;
    let a = 0; for (let i = 3; i < d.length; i += 4) a += d[i];
    return a;
  }, sel);
  for (const rotulo of rotulos) {
    erros = [];
    await p.evaluate(r => document.querySelector(`.ptable [role=button][aria-label="${r}"]`).click(), rotulo);
    await p.waitForTimeout(400);
    const antes = await centro();
    await p.evaluate(s => {
      const c = document.querySelector(s);
      for (let i = 0; i < 5; i++) c.dispatchEvent(new WheelEvent('wheel', { deltaY: -400, bubbles: true, cancelable: true }));
    }, sel);
    await p.waitForTimeout(300);
    const depois = await centro();
    const zoom = await p.locator('.atom3d-reset').first().textContent().catch(() => '');
    if (celular) await p.locator('.drawer button[aria-label="Fechar"]').click();
    else await p.locator('.atom3d-reset').click().catch(() => {});
    const el = rotulo.split('.')[0];
    if (antes <= 0) problemas.push(`${nome} · ${el}: núcleo não desenhado ou canvas torto`);
    if (depois <= 0) problemas.push(`${nome} · ${el}: núcleo não desenhado com zoom`);
    if (!zoom.includes('600')) problemas.push(`${nome} · ${el}: zoom não chegou a 600% (${zoom || 'sem botão'})`);
    for (const e of erros) problemas.push(`${nome} · ${el}: ${e}`);
  }
  console.log(`${nome}: ${rotulos.length} elementos testados`);
}

try {
  await testar('computador', { viewport: { width: 1280, height: 900 }, deviceScaleFactor: 1 }, false);
  await testar('celular', { ...devices['Pixel 7'] }, true);
} finally {
  await navegador.close();
  await servidor.close();
}
if (problemas.length) {
  console.log(`\n${problemas.length} problema(s):\n` + problemas.join('\n'));
  process.exit(1);
}
console.log('\nNenhum problema nos átomos 3D.');
