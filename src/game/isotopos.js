// Isótopos de cada elemento (dados de src/data/isotopos.json, gerado por scripts/baixar-isotopos.mjs).
// Cada isótopo: [A, massa, abundância natural (fração) | null, meia-vida], em que a meia-vida é
// "e" (estável), segundos, ">N" (limite inferior, em segundos) ou null (desconhecida).
import DADOS from '../data/isotopos.json';

const ANO = 31557600;

/** Isótopos do elemento de número atômico z, já como objetos. */
export function isotopos(z) {
  return (DADOS[z] || []).map(([A, massa, ab, hl]) => ({
    A, n: A - z, massa, ab,
    estavel: hl === 'e',
    seg: typeof hl === 'number' ? hl : typeof hl === 'string' && hl[0] === '>' ? +hl.slice(1) : null,
    limite: typeof hl === 'string' && hl[0] === '>',
    natural: ab != null,
  }));
}

/** Isótopo que representa o elemento: o mais abundante na natureza; sem natural, o de vida mais longa. */
export function isotopoPadrao(lista, massaPadrao) {
  const nat = lista.filter(i => i.natural);
  if (nat.length) return nat.reduce((a, b) => (b.ab > a.ab ? b : a));
  const com = lista.filter(i => i.seg != null);
  if (com.length) return com.reduce((a, b) => (b.seg > a.seg ? b : a));
  return lista.find(i => i.A === Math.round(massaPadrao)) || lista[0];
}

const fmt = (v, d = 3) => v.toLocaleString('pt-BR', { maximumSignificantDigits: d });
/** Potência de dez com expoente em sobrescrito: 7,7 × 10²⁴. */
const pot = v => {
  const e = Math.floor(Math.log10(v)), m = v / 10 ** e;
  const sup = String(e).split('').map(c => '⁰¹²³⁴⁵⁶⁷⁸⁹⁻'['0123456789-'.indexOf(c)]).join('');
  return `${fmt(m, 2)} × 10${sup}`;
};

/** Meia-vida em português, na unidade mais fácil de entender. */
export function textoMeiaVida(i) {
  if (i.estavel) return 'Estável';
  if (i.seg == null) return 'Desconhecida';
  const s = i.seg, pre = i.limite ? 'mais de ' : '';
  const anos = s / ANO;
  let t;
  if (anos >= 1e12) t = `${pot(anos)} anos`;
  else if (anos >= 1e9) t = `${fmt(anos / 1e9)} bilhões de anos`;
  else if (anos >= 1e6) t = `${fmt(anos / 1e6)} milhões de anos`;
  else if (anos >= 1e4) t = `${fmt(anos / 1e3)} mil anos`;
  else if (anos >= 2) t = `${fmt(anos)} anos`;
  else if (s >= 2 * 86400) t = `${fmt(s / 86400)} dias`;
  else if (s >= 2 * 3600) t = `${fmt(s / 3600)} horas`;
  else if (s >= 120) t = `${fmt(s / 60)} minutos`;
  else if (s >= 1) t = `${fmt(s)} segundos`;
  else if (s >= 1e-3) t = `${fmt(s * 1e3)} milissegundos`;
  else if (s >= 1e-6) t = `${fmt(s * 1e6)} microssegundos`;
  else if (s >= 1e-9) t = `${fmt(s * 1e9)} nanossegundos`;
  else t = `${pot(s)} segundos`;
  return pre + t;
}

/** Faixa de vida, para a cor do isótopo: estável, longa (> 1 ano), média (> 1 s), curta. */
export function faixa(i) {
  if (i.estavel) return 'estavel';
  if (i.seg == null) return 'desconhecida';
  if (i.seg >= ANO) return 'longa';
  if (i.seg >= 1) return 'media';
  return 'curta';
}

/** Sobrescrito do número de massa: ¹⁴C. */
export const sobrescrito = n => String(n).split('').map(c => '⁰¹²³⁴⁵⁶⁷⁸⁹'[+c]).join('');

/** Nomes próprios de alguns isótopos. */
export const NOME_ISOTOPO = { '1-1': 'Prótio', '1-2': 'Deutério', '1-3': 'Trítio' };

/** Fatos curtos dos isótopos mais conhecidos (chave "Z-A"). */
export const FATO_ISOTOPO = {
  '1-1': 'O núcleo é só um próton, sem nenhum nêutron. É o átomo mais comum do universo.',
  '1-2': 'Forma a "água pesada", usada para frear nêutrons em alguns reatores nucleares.',
  '1-3': 'Misturado a um pó que brilha, ilumina ponteiros de relógio e placas de saída sem precisar de energia.',
  '2-3': 'Muito raro na Terra, é usado em detectores de nêutrons e para resfriar experimentos perto do zero absoluto.',
  '6-12': 'É a referência das massas atômicas: 1 u é exatamente 1/12 da massa de um átomo de carbono-12.',
  '6-14': 'Usado na datação por radiocarbono, que descobre a idade de fósseis e objetos de até cerca de 50 mil anos.',
  '8-18': 'A quantidade de oxigênio-18 no gelo antigo dos polos revela a temperatura da Terra no passado.',
  '9-18': 'Usado nos exames de PET, que mostram onde o corpo consome mais açúcar e ajudam a achar tumores.',
  '19-40': 'Deixa as bananas (e o nosso corpo) levemente radioativos, de forma natural e inofensiva.',
  '27-60': 'Usado na radioterapia contra o câncer e para esterilizar materiais médicos e alimentos.',
  '53-131': 'Usado no tratamento de doenças da tireoide; também é liberado em acidentes nucleares.',
  '55-137': 'Foi o material do acidente de Goiânia, em 1987, um dos maiores acidentes radiológicos do mundo.',
  '82-206': 'É o ponto final da longa cadeia de decaimento do urânio-238.',
  '83-209': 'Por muito tempo foi considerado estável. Em 2003 se descobriu que ele decai, mas bem devagar: sua meia-vida é mais de um bilhão de vezes a idade do universo.',
  '52-128': 'Tem uma das meias-vidas mais longas já medidas, trilhões de vezes a idade do universo.',
  '86-222': 'Gás radioativo que sai naturalmente do solo e pode se acumular em porões mal ventilados.',
  '88-226': 'Estudado por Marie e Pierre Curie; já foi usado em tintas que brilhavam no escuro.',
  '92-235': 'O único isótopo natural capaz de manter uma reação em cadeia: é o combustível dos reatores nucleares.',
  '92-238': 'Forma 99,3% do urânio natural. Sua meia-vida, parecida com a idade da Terra, ajuda a datar as rochas mais antigas.',
  '94-238': 'Seu calor alimenta as baterias nucleares de sondas espaciais como as Voyager e o robô Curiosity, em Marte.',
  '94-239': 'Produzido nos reatores a partir do urânio-238; é usado como combustível nuclear.',
  '95-241': 'Fica dentro dos detectores de fumaça de casa: a radiação dele ioniza o ar, e a fumaça atrapalha essa corrente.',
  '118-294': 'O átomo mais pesado já criado. Só alguns núcleos foram feitos, e cada um dura menos de um milésimo de segundo.',
};
