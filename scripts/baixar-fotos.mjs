// Baixa uma foto por substância da Wikipédia em inglês (Wikimedia Commons),
// guarda em public/fotos/<fórmula>.jpg e grava autor e licença em src/data/fotos.json.
//
// Uso: node scripts/baixar-fotos.mjs            (só as que ainda não têm foto)
//      node scripts/baixar-fotos.mjs --todas    (refaz todas)
//
// Escolha da foto: o arquivo do Commons em ARQUIVO (se houver) ou a primeira imagem
// .jpg que aparece no artigo (fotos costumam ser .jpg; fórmulas e diagramas, .svg/.png).
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';

const ROOT = new URL('../', import.meta.url);
const OUT_DIR = new URL('public/fotos/', ROOT);
const META = new URL('src/data/fotos.json', ROOT);
const UA = 'jogo-educativo-quimica/1.0 (script de download de imagens)';
const API = 'https://en.wikipedia.org/w/api.php';

// Fórmula (campo f do catálogo) → artigo da Wikipédia em inglês.
export const ARTIGO = {
  H2O: 'Water', O2: 'Liquid oxygen', CO2: 'Dry ice', H2: 'Hydrogen', N2: 'Liquid nitrogen', O3: 'Ozone',
  NaCl: 'Salt', KCl: 'Potassium chloride', CH4: 'Methane', C3H8: 'Propane', NH3: 'Ammonia',
  H2O2: 'Hydrogen peroxide', CO: 'Carbon monoxide', HCl: 'Hydrochloric acid', H2SO4: 'Sulfuric acid',
  NaOH: 'Sodium hydroxide', NaHCO3: 'Sodium bicarbonate', CaCO3: 'Calcium carbonate', CaO: 'Calcium oxide',
  SiO2: 'Quartz', Fe2O3: 'Rust', NaClO: 'Bleach', C2H6O: 'Ethanol', C2H4O2: 'Vinegar',
  C6H12O6: 'Glucose', C8H10N4O2: 'Caffeine',
  Cl2: 'Chlorine', I2: 'Iodine', Br2: 'Bromine', P4: 'White phosphorus', NO: 'Nitric oxide',
  MgO: 'Magnesium oxide', ZnO: 'Zinc oxide', HF: 'Hydrofluoric acid', NaF: 'Sodium fluoride',
  KI: 'Potassium iodide', AgBr: 'Silver bromide', NO2: 'Nitrogen dioxide', N2O: 'Nitrous oxide',
  SO2: 'Sulfur dioxide', TiO2: 'Titanium dioxide', H2S: 'Hydrogen sulfide', HCN: 'Hydrogen cyanide',
  KOH: 'Potassium hydroxide', CaF2: 'Fluorite', CaCl2: 'Calcium chloride', MgCl2: 'Magnesium chloride',
  FeS2: 'Pyrite', SO3: 'Sulfur trioxide', C2H2: 'Acetylene', CH2O: 'Formaldehyde',
  Al2O3: 'Ruby', HNO3: 'Nitric acid', CaH2O2: 'Calcium hydroxide', MgH2O2: 'Magnesium hydroxide',
  MgCO3: 'Magnesite', KNO3: 'Potassium nitrate', KIO3: 'Potassium iodate', CH2O3: 'Carbonated water',
  NH4Cl: 'Ammonium chloride', Na2CO3: 'Sodium carbonate', Li2CO3: 'Lithium carbonate',
  MgSO4: 'Magnesium sulfate', CaSO4: 'Gypsum', CuSO4: 'Copper(II) sulfate', C2H4: 'Ethylene',
  CH4O: 'Methanol', Fe3O4: 'Magnetite', AlH3O3: 'Gibbsite', S8: 'Sulfur',
  H3PO4: 'Phosphoric acid', C2H6: 'Ethane', CH4N2O: 'Urea', KMnO4: 'Potassium permanganate',
  C3H6O: 'Acetone', C2H5NO2: 'Glycine', C6H6: 'Benzene', C3H6O3: 'Lactic acid',
  Ca3P2O8: 'Tricalcium phosphate', C4H10: 'Butane', C3H8O3: 'Glycerol', C8H18: 'Octane',
  C10H16: 'Limonene', C7H5NO3S: 'Saccharin', C8H8O3: 'Vanillin', C5H8NNaO4: 'Monosodium glutamate',
  C6H8O6: 'Vitamin C', C8H9NO2: 'Paracetamol', C6H8O7: 'Citric acid', C9H8O4: 'Aspirin',
  C10H14N2: 'Nicotine', C10H20O: 'Menthol', C14H18N2O5: 'Aspartame', C12H22O11: 'Sucrose',
  C18H27NO3: 'Capsaicin',
};

// Escolhas feitas à mão depois da revisão (arquivo do Commons, sem "File:").
// null = nenhuma foto boa (gases invisíveis, artigos só com diagramas): o jogo mostra o modelo 3D.
export const ARQUIVO = {
  H2O: 'TapWater-china.JPG', O2: 'Liquid_oxygen_in_a_beaker_(cropped_and_retouched).jpg',
  CO2: 'Dry_ice_pellet_subliming_in_water.jpg', H2: 'Hydrogen_discharge_tube.jpg', N2: 'Liquidnitrogen.jpg',
  O3: null, NaCl: 'Piles_of_Salt_Salar_de_Uyuni_Bolivia_Luca_Galuzzi_2006_a.jpg', KCl: 'Potassium_chloride.jpg',
  CH4: 'Frozen_Methane_Bubbles_(11927906233).jpg', C3H8: 'Propane_tank_20lb.jpg', NH3: 'Liquid_ammonia_bottle.jpg',
  H2O2: 'Hydrogen_Peroxide_Bottle.jpg', CO: null, HCl: 'Hydrochloric_acid_30_percent.jpg',
  H2SO4: 'Sulphuric_acid_96_percent_extra_pure.jpg', NaOH: 'NaOH_beads.jpg', NaHCO3: 'Hydrogenuhličitan_sodný.jpg',
  CaCO3: 'Calcium_carbonate_chunks.JPG', CaO: 'Calcium_oxide_powder.JPG', SiO2: '00026_40_mm_quartz.jpg',
  Fe2O3: 'Rust_on_iron.jpg', C2H6O: 'Ethyl_alcohol_usp_grade.jpg', C2H4O2: 'Raisinvinegar.jpg',
  C6H12O6: 'Glucose_2.jpg', C8H10N4O2: 'Coffee_beans2.jpg',
  Cl2: 'Chlorine_in_bottle.jpg', I2: 'Sample_of_iodine.jpg', Br2: 'Bromine_vial_in_acrylic_cube.jpg',
  P4: 'Weißer_Phosphor.JPG', NO: null, MgO: 'Magnesium_oxide.jpg', ZnO: 'Zinc_oxide.jpg', HF: 'Hydrogen_fluoride.JPG',
  NaF: 'Sodium_fluoride.jpg', KI: 'Potassium_iodide.jpg', AgBr: null, NO2: 'Nitrogen_dioxide_at_different_temperatures.jpg',
  N2O: 'N2O_Medical_Tanks.jpg', SO2: '20180519_USGS_Leilani_Estates_Hawaii_Volcanic_EruptionDSC_0411_medium.jpg',
  TiO2: 'Titanium(IV)_oxide.jpg', H2S: 'Deposit_from_hydrogen_sulphide.jpg', HCN: 'Hydrogen_cyanide.jpg',
  KOH: 'Potassium_hydroxide.jpg', CaF2: 'Closeup_of_Fluorite.jpg', CaCl2: 'Calcium_chloride_CaCl2.jpg',
  MgCl2: 'Magnesium_chloride.jpg', FeS2: 'Bullypyrite2.jpg', SO3: 'Schwefeltrioxid_Ampulle.jpg',
  C2H2: 'Carbide_lamp_lit.jpg', CH2O: null,
  HNO3: 'Fuming_nitric_acid_40ml.jpg', CaH2O2: 'Calcium_hydroxide.jpg', MgH2O2: 'Brucite-169935.jpg',
  KNO3: 'Potassium_nitrate.jpg', KIO3: 'Jodičnan_draselný.JPG', CH2O3: 'SiphonSeltzerAnchorBWks001.jpg',
  NH4Cl: 'Ammoniumchlorid_Kristalle.jpg', Na2CO3: 'Uhličitan_sodný.JPG', Li2CO3: 'Lithium_carbonate_A.jpg',
  MgSO4: 'Magnesium_sulfate_crystals.jpg', CaSO4: 'Cristales_cueva_de_Naica.JPG', CuSO4: 'Copper_sulfate.jpg',
  C2H4: null, CH4O: 'Methanol_by_Danny_S._-_001.JPG', Fe3O4: 'Magnetite_sample_with_neodymium_magnet.jpg',
  S8: 'Sulfur_-_El_Desierto_mine,_San_Pablo_de_Napa,_Daniel_Campos_Province,_Potosí,_Bolivia.jpg',
  H3PO4: null, C2H6: null, KMnO4: 'Potassium-permanganate-sample.jpg',
  C3H6O: 'Sample_of_Acetone.jpg', C2H5NO2: null, C6H6: 'Benzene_sample.jpg', C3H6O3: null,
  Ca3P2O8: 'Tricalcium_Phosphate.jpg', C4H10: 'The_Green_Lighter_1_cropped.jpg', C3H8O3: 'Sample_of_Glycerine.jpg',
  C8H18: null, C10H16: 'Limonene.jpg', C7H5NO3S: 'Saccharin-Na_substance_photo.jpg',
  C8H8O3: 'Vanlilin_vzorek.jpg', C5H8NNaO4: 'Monosodium_glutamate_crystals.jpg', C6H8O6: 'Vitamin_C_supplements_1.jpg',
  C8H9NO2: 'Paracetamol_substance_photo.jpg', C6H8O7: 'Citrus_fruits.jpg', C9H8O4: 'Acetylsalicylic_acid.jpg',
  C10H14N2: null, C10H20O: 'Menthol_Crystals.JPG', C14H18N2O5: 'Aspartame_sample_recrystallised.jpg',
  C12H22O11: 'Sugar_2xmacro.jpg', C18H27NO3: 'Habanero_closeup_edit2.jpg',
};

const sleep = ms => new Promise(r => setTimeout(r, ms));
async function api(params) {
  const url = API + '?' + new URLSearchParams({ format: 'json', formatversion: '2', ...params });
  for (let i = 0; i < 5; i++) {
    const r = await fetch(url, { headers: { 'User-Agent': UA } });
    if (r.ok) return r.json();
    await sleep(4000 * (i + 1)); // 429: a Wikipédia limita pedidos seguidos
  }
  throw new Error('API falhou: ' + url);
}

/** Fotos .jpg do artigo, na ordem em que aparecem. */
async function candidatos(titulo) {
  const j = await api({ action: 'parse', page: titulo, prop: 'images', redirects: '1' });
  return (j.parse?.images || []).filter(n => /\.jpe?g$/i.test(n) && !RUIM.test(n));
}

const RUIM = /(logo|icon|flag|map|symbol|pictogram|ghs|hazard|diagram|structure|formula|skeletal|3d|ball|spacefill|spectrum|graph|chart|nfpa|signature|portrait|commons-logo)/i;

async function escolherArquivo(f, titulo) {
  if (ARQUIVO[f] !== undefined) return ARQUIVO[f]; // null = sem foto boa
  const imgs = await candidatos(titulo);
  return imgs.find(n => BOM.test(n)) || imgs[0] || null;
}
const BOM = /(sample|crystal|powder|solution|bottle|liquid|pellet|vial|flask|beaker|tablet|pill|granul|mineral|specimen|ampoule|amostra)/i;

const limpa = s => (s || '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

async function listarCandidatos() {
  for (const [f, titulo] of Object.entries(ARTIGO)) {
    if (ARQUIVO[f] !== undefined) continue;
    const imgs = await candidatos(titulo).catch(e => ['ERRO ' + e.message]);
    console.log(`${f}\t${imgs.slice(0, 8).join(' | ')}`);
    await sleep(800);
  }
}

async function main() {
  if (process.argv.includes('--candidatos')) return listarCandidatos();
  const todas = process.argv.includes('--todas');
  await mkdir(OUT_DIR, { recursive: true });
  const meta = existsSync(META) ? JSON.parse(await readFile(META, 'utf8')) : {};
  const faltando = [];
  for (const [f, titulo] of Object.entries(ARTIGO)) {
    if (!todas && meta[f] && existsSync(new URL(f + '.jpg', OUT_DIR))) continue;
    try {
      const arquivo = await escolherArquivo(f, titulo);
      if (!arquivo) { faltando.push(f); delete meta[f]; continue; }
      const ii = await api({ action: 'query', titles: 'File:' + arquivo, prop: 'imageinfo', iiprop: 'url|extmetadata', iiurlwidth: '480' });
      const info = ii.query.pages[0].imageinfo?.[0];
      if (!info) { faltando.push(f); continue; }
      const em = info.extmetadata || {};
      const img = await fetch(info.thumburl || info.url, { headers: { 'User-Agent': UA } });
      if (!img.ok) throw new Error('download ' + img.status);
      await writeFile(new URL(f + '.jpg', OUT_DIR), Buffer.from(await img.arrayBuffer()));
      meta[f] = {
        arquivo,
        autor: limpa(em.Artist?.value) || 'Desconhecido',
        licenca: limpa(em.LicenseShortName?.value) || 'Ver página',
        pagina: info.descriptionurl,
      };
      console.log('ok  ', f.padEnd(12), arquivo);
    } catch (e) {
      faltando.push(f);
      console.log('erro', f, e.message);
    }
    await sleep(800);
  }
  const ordenado = Object.fromEntries(Object.keys(ARTIGO).filter(k => meta[k]).map(k => [k, meta[k]]));
  await writeFile(META, JSON.stringify(ordenado, null, 2) + '\n');
  console.log(`\n${Object.keys(ordenado).length} com foto; sem foto: ${faltando.join(', ') || 'nenhuma'}`);
}

if (import.meta.url === new URL(process.argv[1], 'file://').href || process.argv[1]?.endsWith('baixar-fotos.mjs')) main();
