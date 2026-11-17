// Regras do jogo, sem interface: combinação de átomos, XP, missões e medalhas.
import { molecula } from './estrutura.js';
import { elements, cats, substances } from '../data/nucleo.js';

export const XP_PER_LEVEL = 300;
/** Duração da animação de fusão (curta para quem pediu menos movimento) e a fração gasta carregando. */
export const fuseMs = () => (typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches ? 500 : 2700);
export const FUSE_CHARGE = 0.5;
const BY_SYM = new Map(elements.map(e => [e.sym, e]));

export const el = sym => BY_SYM.get(sym);

/** Cor de uma categoria em oklch, com opacidade opcional. */
export function col(cat, a) {
  const c = cats[cat];
  const L = cat === 'un' ? 0.72 : 0.8;
  return `oklch(${L} ${c.c} ${c.h}${a != null ? ' / ' + a : ''})`;
}

export const sub = s => s.replace(/\d/g, d => '₀₁₂₃₄₅₆₇₈₉'[d]);
export const sup = s => String(s).replace(/\d/g, d => '⁰¹²³⁴⁵⁶⁷⁸⁹'[d]);

const key = c => Object.keys(c).sort().map(k => k + c[k]).join('|');
const KEYS = new Map(substances.map(s => [key(s.c), s]));

/** Substância do catálogo com exatamente essa contagem de átomos. */
export const findMatch = zone => (Object.keys(zone).length ? KEYS.get(key(zone)) : undefined);
export const bySymbolFormula = f => substances.find(s => s.f === f);

export const subXP = s => 10 * s.atoms + 20 * s.nEl;

const tem = (c, lista) => c.disc.filter(s => lista.includes(s.f)).length;
const BASES = ['C5H5N5', 'C5H6N2O2', 'C4H5N3O', 'C5H5N5O', 'C4H4N2O2'];
const AMINO = ['C2H5NO2', 'C3H7NO2', 'C3H7NO3', 'C3H7NO2S', 'C6H13NO2', 'C6H14N2O2', 'C9H11NO2', 'C11H12N2O2', 'C4H7NO4', 'C5H9NO4', 'C9H11NO3', 'C5H11NO2', 'C5H9NO2', 'C5H11NO2S', 'C6H14N4O2', 'C6H9N3O2', 'C5H10N2O3', 'C4H8N2O3'];
const ACIDOS = ['HI', 'HClO4', 'C7H6O5', 'C2H4O3', 'C4H6O4', 'C6H10O4', 'C3H4O2', 'C5H10O2', 'C18H30O2', 'C20H30O2', 'C4H7NO4', 'C5H9NO4', 'C19H19N7O6', 'HBr', 'HClO', 'C3H6O2', 'C3H4O3', 'C4H6O6', 'C4H6O5', 'C6H8O2', 'C7H6O2', 'C8H6O4', 'C12H24O2', 'C5H4N4O3', 'HCl', 'HF', 'H2SO4', 'HNO3', 'H3PO4', 'H3BO3', 'CH2O3', 'CH2O2', 'C2H4O2', 'C2H2O4', 'C3H6O3', 'C6H8O7', 'C6H8O6', 'C7H6O3', 'C9H8O4'];

export const MISSIONS = [
  { title: 'Primeiros passos', desc: 'Descubra 5 substâncias.', target: 5, val: c => c.disc.length, reward: 100 },
  { title: 'Sopro de vida', desc: 'Descubra 5 substâncias no estado gasoso.', target: 5, val: c => c.disc.filter(s => s.state === 'gás').length, reward: 150 },
  { title: 'Mar salgado', desc: 'Forme dois sais: cloreto de sódio e cloreto de potássio.', target: 2, val: c => c.disc.filter(s => s.f === 'NaCl' || s.f === 'KCl').length, reward: 120 },
  { title: 'Química orgânica', desc: 'Crie 3 compostos que tenham carbono e hidrogênio.', target: 3, val: c => c.disc.filter(s => s.c.C && s.c.H).length, reward: 200 },
  { title: 'Arquiteto molecular', desc: 'Crie uma substância com 4 elementos diferentes.', target: 1, val: c => c.disc.filter(s => s.nEl >= 4).length, reward: 250 },
  { title: 'Explorador da tabela', desc: 'Coloque 15 elementos diferentes no reator.', target: 15, val: c => c.usedEls.length, reward: 150 },
  { title: 'Halogênios em ação', desc: 'Descubra 8 substâncias com flúor, cloro, bromo ou iodo.', target: 8, val: c => c.disc.filter(s => s.c.F || s.c.Cl || s.c.Br || s.c.I).length, reward: 150 },
  { title: 'Mineralogista', desc: 'Forme 6 minerais: calcário, quartzo, hematita, coríndon, magnetita, pirita, fluorita ou magnesita.', target: 6, val: c => c.disc.filter(s => ['CaCO3', 'SiO2', 'Fe2O3', 'Al2O3', 'Fe3O4', 'FeS2', 'CaF2', 'MgCO3'].includes(s.f)).length, reward: 200 },
  { title: 'Metais de transição', desc: 'Descubra 4 substâncias com metais de transição, como ferro, cobre, zinco ou prata.', target: 4, val: c => c.disc.filter(s => Object.keys(s.c).some(k => el(k).cat === 'tm')).length, reward: 200 },
  { title: 'Farmácia', desc: 'Crie aspirina, paracetamol, vitamina C e leite de magnésia.', target: 4, val: c => c.disc.filter(s => ['C9H8O4', 'C8H9NO2', 'C6H8O6', 'MgH2O2'].includes(s.f)).length, reward: 250 },
  { title: 'Química doce', desc: 'Crie glicose, sacarose, sacarina e aspartame.', target: 4, val: c => c.disc.filter(s => ['C6H12O6', 'C12H22O11', 'C7H5NO3S', 'C14H18N2O5'].includes(s.f)).length, reward: 250 },
  { title: 'Gigantes moleculares', desc: 'Crie 3 substâncias com 20 átomos ou mais.', target: 3, val: c => c.disc.filter(s => s.atoms >= 20).length, reward: 300 },
  { title: 'Grande explorador', desc: 'Coloque 30 elementos diferentes no reator.', target: 30, val: c => c.usedEls.length, reward: 300 },
  { title: 'Garimpo', desc: 'Forme 4 minérios de metais: galena, cinábrio, cassiterita, esfalerita (sulfeto de zinco) ou barita (sulfato de bário).', target: 4, val: c => tem(c, ['PbS', 'HgS', 'SnO2', 'ZnS', 'BaSO4']), reward: 200 },
  { title: 'Metalurgista', desc: 'Descubra 12 substâncias com metais de transição.', target: 12, val: c => c.disc.filter(s => Object.keys(s.c).some(k => el(k).cat === 'tm')).length, reward: 300 },
  { title: 'Pesados e preciosos', desc: 'Descubra uma substância de cada: ouro, platina, mercúrio, chumbo, tungstênio e urânio.', target: 6, val: c => ['Au', 'Pt', 'Hg', 'Pb', 'W', 'U'].filter(e => c.disc.some(s => s.c[e])).length, reward: 300 },
  { title: 'Pilhas e baterias', desc: 'Crie dióxido de manganês, dióxido de chumbo, óxido de lítio e cobalto e ácido sulfúrico.', target: 4, val: c => tem(c, ['MnO2', 'PbO2', 'LiCoO2', 'H2SO4']), reward: 200 },
  { title: 'Era dos plásticos', desc: 'Crie as matérias-primas de quatro plásticos: etileno, cloreto de vinila, estireno e tetrafluoretileno.', target: 4, val: c => tem(c, ['C2H4', 'C2H3Cl', 'C8H8', 'C2F4']), reward: 200 },
  { title: 'Azedinho', desc: 'Descubra 8 ácidos.', target: 8, val: c => tem(c, ACIDOS), reward: 250 },
  { title: 'Aromas da cozinha', desc: 'Crie 5 moléculas de aroma: vanilina, mentol, limoneno, cinamaldeído, eugenol, benzaldeído, acetato de isoamila ou cânfora.', target: 5, val: c => tem(c, ['C8H8O3', 'C10H20O', 'C10H16', 'C9H8O', 'C10H12O2', 'C7H6O', 'C7H14O2', 'C10H16O']), reward: 250 },
  { title: 'Química do cérebro', desc: 'Crie dopamina, adrenalina e serotonina.', target: 3, val: c => tem(c, ['C8H11NO2', 'C9H13NO3', 'C10H12N2O']), reward: 250 },
  { title: 'Código da vida', desc: 'Crie as cinco bases do DNA e do RNA: adenina, timina, citosina, guanina e uracila.', target: 5, val: c => tem(c, BASES), reward: 300 },
  { title: 'Quase a tabela toda', desc: 'Coloque 50 elementos diferentes no reator.', target: 50, val: c => c.usedEls.length, reward: 400 },
  { title: 'Exceção nobre', desc: 'Faça um gás nobre se ligar: crie os dois fluoretos de xenônio.', target: 2, val: c => tem(c, ['XeF2', 'XeF4']), reward: 250 },
  { title: 'Laboratório nuclear', desc: 'Crie 4 compostos de elementos radioativos: urânio, tório, plutônio, amerício ou rádio.', target: 4, val: c => tem(c, ['UO2', 'UF6', 'ThO2', 'PuO2', 'AmO2', 'RaCl2']), reward: 300 },
  { title: 'Era digital', desc: 'Crie 5 materiais da eletrônica: arseneto de gálio, nitreto de gálio, dióxido de germânio, óxido de índio, seleneto de cádmio, telureto de cádmio ou óxido de lítio e cobalto.', target: 5, val: c => tem(c, ['GaAs', 'GaN', 'GeO2', 'In2O3', 'CdSe', 'CdTe', 'LiCoO2']), reward: 300 },
  { title: 'Fogos de artifício', desc: 'Crie 5 ingredientes de fogos: nitrato de potássio, clorato de potássio, carbonato de estrôncio, nitrato de bário, cloreto de cobre(II) ou perclorato de amônio.', target: 5, val: c => tem(c, ['KNO3', 'KClO3', 'SrCO3', 'BaN2O6', 'CuCl2', 'NH4ClO4']), reward: 250 },
  { title: 'Blocos da vida', desc: 'Crie 6 aminoácidos: glicina, alanina, serina, cisteína, leucina, lisina, fenilalanina ou triptofano.', target: 6, val: c => tem(c, ['C2H5NO2', 'C3H7NO2', 'C3H7NO3', 'C3H7NO2S', 'C6H13NO2', 'C6H14N2O2', 'C9H11NO2', 'C11H12N2O2']), reward: 300 },
  { title: 'Hormônios', desc: 'Crie adrenalina, melatonina, testosterona e estradiol.', target: 4, val: c => tem(c, ['C9H13NO3', 'C13H16N2O2', 'C19H28O2', 'C18H24O2']), reward: 300 },
  { title: 'Vitaminas', desc: 'Crie as vitaminas A, C, B3 (niacina) e B6 (piridoxina).', target: 4, val: c => tem(c, ['C20H30O', 'C6H8O6', 'C6H5NO2', 'C8H11NO3']), reward: 250 },
  { title: 'Prateleira de temperos', desc: 'Crie 6 moléculas de temperos: capsaicina, piperina, gingerol, curcumina, alicina, anetol, timol ou isotiocianato de alila.', target: 6, val: c => tem(c, ['C18H27NO3', 'C17H19NO3', 'C17H26O4', 'C21H20O6', 'C6H10OS2', 'C10H12O', 'C10H14O', 'C4H5NS']), reward: 300 },
  { title: 'Hospital', desc: 'Crie 5 remédios: penicilina, amoxicilina, ibuprofeno, lidocaína, cisplatina ou ácido salicílico.', target: 5, val: c => tem(c, ['C16H18N2O4S', 'C16H19N3O5S', 'C13H18O2', 'C14H22N2O', 'PtCl2N2H6', 'C7H6O3']), reward: 300 },
  { title: 'Centena', desc: 'Descubra 100 substâncias.', target: 100, val: c => c.disc.length, reward: 400 },
  { title: 'Complexo B', desc: 'Crie as vitaminas B1 (tiamina), B2 (riboflavina), B3 (niacina), B6 (piridoxina), B7 (biotina) e B9 (ácido fólico).', target: 6, val: c => tem(c, ['C12H17ClN4OS', 'C17H20N4O6', 'C6H5NO2', 'C8H11NO3', 'C10H16N2O3S', 'C19H19N7O6']), reward: 350 },
  { title: 'Proteína completa', desc: 'Crie 15 dos 18 aminoácidos do catálogo.', target: 15, val: c => tem(c, AMINO), reward: 400 },
  { title: 'Paleta de cores', desc: 'Crie 7 pigmentos e corantes: índigo, púrpura de Tiro, alizarina, azul de metileno, fluoresceína, curcumina, cinábrio, azul de cobalto, cromato de chumbo, sulfeto de cádmio ou óxido de cromo(III).', target: 7, val: c => tem(c, ['C16H10N2O2', 'C16H8Br2N2O2', 'C14H8O4', 'C16H18ClN3S', 'C20H12O5', 'C21H20O6', 'HgS', 'CoAl2O4', 'PbCrO4', 'CdS', 'Cr2O3']), reward: 350 },
  { title: 'Terras-raras', desc: 'Crie 4 compostos de terras-raras: cério, európio, lantânio, neodímio ou ítrio.', target: 4, val: c => tem(c, ['CeO2', 'Eu2O3', 'La2O3', 'Nd2O3', 'YBa2Cu3O7']), reward: 300 },
  { title: 'Limpeza geral', desc: 'Crie 6 produtos de limpeza: hipoclorito de sódio, hidróxido de sódio, hidróxido de amônio, lauril sulfato de sódio, laurato de sódio, alquilbenzeno sulfonato de sódio, perborato de sódio ou bórax.', target: 6, val: c => tem(c, ['NaClO', 'NaOH', 'NH5O', 'C12H25NaO4S', 'C12H23NaO2', 'C18H29NaO3S', 'NaBO3', 'Na2B4O7']), reward: 300 },
  { title: 'Duas centenas', desc: 'Descubra 200 substâncias.', target: 200, val: c => c.disc.length, reward: 600 },
  { title: 'Três centenas', desc: 'Descubra 300 substâncias.', target: 300, val: c => c.disc.length, reward: 800 },
  { title: 'Quatro centenas', desc: 'Descubra 400 substâncias.', target: 400, val: c => c.disc.length, reward: 1000 },
  { title: 'Enciclopédia completa', desc: 'Descubra todas as substâncias do catálogo.', target: c => c.total, val: c => c.disc.length, reward: 500 },
];

/** XP, nível e missões a partir do progresso salvo. */
export function progress(st) {
  const disc = st.discovered.map(bySymbolFormula).filter(Boolean);
  const ctx = { disc, usedEls: st.usedEls, total: substances.length };
  const missions = MISSIONS.map(m => {
    const t = typeof m.target === 'function' ? m.target(ctx) : m.target;
    const v = Math.min(m.val(ctx), t);
    return { ...m, t, v, done: v >= t };
  });
  const xp = 50 + disc.reduce((a, s) => a + subXP(s), 0) + missions.filter(m => m.done).reduce((a, m) => a + m.reward, 0);
  return { disc, missions, xp, level: Math.floor(xp / XP_PER_LEVEL) + 1 };
}

export function medals(st, P) {
  const gases = P.disc.filter(s => s.state === 'gás').length;
  const org = P.disc.filter(s => s.c.C && s.c.H).length;
  return [
    ['1', 'Primeira fusão', 'Realize sua primeira fusão no reator.', st.fusions >= 1, 195],
    ['H₂O', 'Gota d’água', 'Descubra a água.', st.discovered.includes('H2O'), 230],
    ['G5', 'Mestre dos gases', 'Descubra 5 gases.', gases >= 5, 300],
    ['C–H', 'Orgânico', 'Descubra 3 compostos orgânicos.', org >= 3, 145],
    ['10', 'Colecionador', 'Tenha 10 substâncias na coleção.', P.disc.length >= 10, 65],
    ['N5', 'Veterano', 'Alcance o nível 5.', P.level >= 5, 28],
    ['He', 'Curioso nobre', 'Tente fundir um gás nobre.', st.nobleTried, 340],
    ['50', 'Grande coleção', 'Tenha 50 substâncias na coleção.', P.disc.length >= 50, 250],
    ['100', 'Centenário', 'Tenha 100 substâncias na coleção.', P.disc.length >= 100, 60],
    ['200', 'Bicentenário', 'Tenha 200 substâncias na coleção.', P.disc.length >= 200, 20],
    ['300', 'Tricentenário', 'Tenha 300 substâncias na coleção.', P.disc.length >= 300, 150],
    ['Xe', 'Exceção à regra', 'Conclua a missão Exceção nobre.', P.missions.some(m => m.title === 'Exceção nobre' && m.done), 285],
    ['DNA', 'Geneticista', 'Conclua a missão Código da vida.', P.missions.some(m => m.title === 'Código da vida' && m.done), 320],
    ['Rx', 'Farmacêutico', 'Conclua a missão Farmácia.', P.missions.some(m => m.title === 'Farmácia' && m.done), 170],
    ['∞', 'Mente completa', 'Descubra todas as substâncias.', P.disc.length >= substances.length, 105],
  ].map(([glyph, title, desc, on, h]) => ({ glyph, title, desc, on, h }));
}

/** O que o painel de status do reator deve dizer sobre a combinação atual. */
export function reactorStatus(zone, discovered, showHints) {
  const keys = Object.keys(zone);
  if (!keys.length) return { tone: 'idle', tag: 'AGUARDANDO', title: 'Reator vazio', text: 'Arraste ou toque nos átomos da tabela para colocá-los na área de fusão.', missing: [] };
  if (findMatch(zone)) return { tone: 'ok', tag: 'FUSÃO DISPONÍVEL', title: 'Fusão disponível', text: 'Esses átomos podem formar uma substância. Clique em Fundir para descobrir qual, ou continue adicionando átomos.', missing: [] };
  const cands = substances.filter(s => keys.every(k => (s.c[k] || 0) >= zone[k]));
  if (cands.length) {
    // A dica aponta para a substância mais próxima que ainda não foi descoberta.
    const novas = cands.filter(s => !discovered.includes(s.f));
    if (!novas.length) {
      return {
        tone: 'near', tag: 'JÁ DESCOBERTO', title: 'Nada novo por aqui',
        text: `Você já descobriu ${cands.length > 1 ? `as ${cands.length} substâncias` : 'a única substância'} do catálogo que ${cands.length > 1 ? 'começam' : 'começa'} com essa combinação. Experimente outros elementos.`,
        missing: [],
      };
    }
    const miss = s => Object.keys(s.c).reduce((a, k) => a + s.c[k] - (zone[k] || 0), 0);
    const best = novas.slice().sort((a, b) => miss(a) - miss(b))[0];
    return {
      tone: 'near', tag: 'QUASE LÁ', title: 'Faltam átomos',
      text: showHints
        ? `Adicione os átomos abaixo para completar a ligação.${novas.length > 1 ? ` ${novas.length} substâncias ainda não descobertas começam com essa combinação.` : ''}`
        : 'A combinação ainda não está completa.',
      missing: showHints ? Object.keys(best.c).filter(k => best.c[k] > (zone[k] || 0)).map(k => ({ sym: k, n: best.c[k] - (zone[k] || 0), cat: el(k).cat })) : [],
    };
  }
  const unused = keys.find(k => !substances.some(s => s.c[k]));
  // Xenônio e criptônio têm receitas (XeF₂, XeF₄, KrF₂); os outros gases nobres não se ligam a nada.
  const noble = keys.find(k => el(k).cat === 'ng' && k === unused);
  if (noble) return { tone: 'bad', tag: 'INSTÁVEL', title: `${el(noble).name} não quer se ligar`, text: 'Gases nobres têm a camada de valência completa e quase nunca formam ligações. Remova-o do reator.', missing: [] };
  if (unused) return { tone: 'bad', tag: 'INSTÁVEL', title: `${el(unused).name} ainda não tem receitas`, text: 'Esse elemento não participa de nenhuma substância do catálogo. Tente outros elementos.', missing: [] };
  return { tone: 'bad', tag: 'INSTÁVEL', title: 'Proporção sem correspondência', text: 'Nenhuma substância do catálogo tem essa proporção de átomos. Diminua a quantidade de algum deles.', missing: [] };
}

/** Elementos que ainda cabem no reator: somar mais um átomo deles mantém alguma substância do catálogo ao alcance. */
export function fusable(zone) {
  const keys = Object.keys(zone), ok = new Set();
  for (const s of substances) {
    if (!keys.every(k => (s.c[k] || 0) >= zone[k])) continue;
    for (const k in s.c) if (s.c[k] > (zone[k] || 0)) ok.add(k);
  }
  return ok;
}

export function usageText(sym, discovered) {
  const ui = substances.filter(s => s.c[sym]);
  if (!ui.length) return 'Não aparece nas substâncias do catálogo.';
  const shown = ui.slice(0, 4).map(s => (discovered.includes(s.f) ? sub(s.f) : '???')).join(', ');
  return `Aparece em ${ui.length} substância${ui.length > 1 ? 's' : ''} do catálogo: ${shown}${ui.length > 4 ? '…' : ''}`;
}

export const molarMass = s => Object.keys(s.c).reduce((a, k) => a + el(k).mass * s.c[k], 0);

// ---------- Distribuição eletrônica ----------
const L = 'spdf';
export const SHELL_LETTERS = 'KLMNOPQ';
export const EXCEPTIONS = [24, 29, 42, 46, 47, 78, 79];
const fmt = cf => cf.map(([n, l, k]) => `${n}${L[l]}${sup(k)}`).join(' ');

export function electronInfo(t) {
  const cores = [[86, 'Rn'], [54, 'Xe'], [36, 'Kr'], [18, 'Ar'], [10, 'Ne'], [2, 'He']].find(([z]) => z < t.z);
  let short = fmt(t.conf);
  if (cores) {
    const core = el(cores[1]).conf;
    const rest = t.conf.filter(([n, l, k]) => !core.some(c => c[0] === n && c[1] === l && c[2] === k));
    short = `[${cores[1]}] ${fmt(rest)}`;
  }
  return { full: fmt(t.conf), short, valence: t.shells[t.shells.length - 1], exception: EXCEPTIONS.includes(t.z) };
}

export function shellInfo(t, i) {
  const subs = t.conf.filter(([n]) => n === i + 1).sort((x, y) => x[1] - y[1]);
  return {
    letter: SHELL_LETTERS[i], n: i + 1, count: t.shells[i], max: 2 * (i + 1) ** 2, subs: fmt(subs),
    role: i === t.shells.length - 1
      ? 'Camada de valência: seus elétrons participam das ligações químicas.'
      : i === 0 ? 'Camada mais próxima do núcleo, com a menor energia.' : 'Camada interna: seus elétrons não participam das ligações.',
  };
}

// ---------- Estrutura da molécula (ligações reais, ver data/estruturas.js) ----------
/** Fórmula estrutural em 2D, já encaixada num quadro de 340×280 px. */
export function structure(s) {
  const W = 340, H = 280, m = molecula(s.f);
  const xs = m.p2.map(p => p[0]), ys = m.p2.map(p => p[1]);
  const w = Math.max(...xs) - Math.min(...xs), h = Math.max(...ys) - Math.min(...ys);
  const u = Math.min(72, (W - 50) / (w || 1), (H - 50) / (h || 1));
  const ox = (Math.max(...xs) + Math.min(...xs)) / 2, oy = (Math.max(...ys) + Math.min(...ys)) / 2;
  const big = Math.min(22, u * 0.36), small = Math.min(15, u * 0.26);
  const nodes = m.atoms.map((a, i) => ({
    sym: a.sym, charge: a.charge, cat: el(a.sym).cat,
    x: W / 2 + (m.p2[i][0] - ox) * u, y: H / 2 + (m.p2[i][1] - oy) * u,
    r: Math.max(a.sym === 'H' ? 6 : 8, a.sym === 'H' ? small : big),
  }));
  return { nodes, bonds: m.bonds, u };
}

/** Modelo de bolas e varetas em 3D com a geometria real (ângulos VSEPR). */
const G3 = {};
export function geom3d(s) {
  if (G3[s.f]) return G3[s.f];
  const m = molecula(s.f), n = m.atoms.length;
  const c = m.p3.reduce((a, p) => [a[0] + p[0] / n, a[1] + p[1] / n, a[2] + p[2] / n], [0, 0, 0]);
  const ext = Math.max(0.5, ...m.p3.map((p, i) => Math.hypot(p[0] - c[0], p[1] - c[1], p[2] - c[2]) + m.r3[i]));
  const sc = Math.min(75, 100 / ext);
  G3[s.f] = {
    atoms: m.atoms.map((a, i) => ({ sym: a.sym, cat: el(a.sym).cat, r: m.r3[i] * sc, x: (m.p3[i][0] - c[0]) * sc, y: (m.p3[i][1] - c[1]) * sc, z: (m.p3[i][2] - c[2]) * sc })),
    bonds: m.bonds,
  };
  return G3[s.f];
}
