// Modo subatômico: as partículas do Modelo Padrão e o que elas formam quando se combinam.
// Antipartículas têm o id da partícula com um "a" na frente (u → au).

/** Famílias de partículas: nome e cor (matiz/croma em oklch). */
export const familias = {
  quark: { name: 'Quarks', h: 25, c: 0.16 },
  lepton: { name: 'Léptons', h: 145, c: 0.15 },
  boson: { name: 'Bósons de força', h: 250, c: 0.13 },
  higgs: { name: 'Bóson de Higgs', h: 85, c: 0.15 },
  hip: { name: 'Hipotética', h: 265, c: 0.02 },
};

const P = (id, sym, name, fam, col, row, carga, spin, massa, ano, fato, anti) => ({ id, sym, name, fam, col, row, carga, spin, massa, ano, fato, anti });
const bar = s => s[0] + '̅' + s.slice(1);

// col/row: posição na tabela do Modelo Padrão (colunas 1–3 = gerações, 4 = bósons, 5 = Higgs e gráviton).
const base = [
  P('u', 'u', 'Quark up', 'quark', 1, 1, '+2/3', '1/2', '2,2 MeV', '1968', 'Com o quark down, forma os prótons e nêutrons de toda a matéria comum.'),
  P('c', 'c', 'Quark charm', 'quark', 2, 1, '+2/3', '1/2', '1,27 GeV', '1974', 'Sua descoberta, em dois laboratórios ao mesmo tempo, ficou conhecida como a Revolução de Novembro.'),
  P('t', 't', 'Quark top', 'quark', 3, 1, '+2/3', '1/2', '173 GeV', '1995', 'É a partícula elementar mais pesada: um único quark top pesa quase tanto quanto um átomo de ouro.'),
  P('d', 'd', 'Quark down', 'quark', 1, 2, '−1/3', '1/2', '4,7 MeV', '1968', 'Um nêutron tem dois quarks down e um up; um próton tem o contrário.'),
  P('s', 's', 'Quark strange', 'quark', 2, 2, '−1/3', '1/2', '95 MeV', '1947', 'Ganhou o nome "estranho" porque as partículas que o contêm viviam muito mais do que o esperado.'),
  P('b', 'b', 'Quark bottom', 'quark', 3, 2, '−1/3', '1/2', '4,18 GeV', '1977', 'Partículas com quark bottom ajudam a estudar por que o universo tem mais matéria que antimatéria.'),
  P('e', 'e⁻', 'Elétron', 'lepton', 1, 3, '−1', '1/2', '0,511 MeV', '1897', 'Foi a primeira partícula elementar descoberta. É ele que circula nos fios e faz as ligações químicas.'),
  P('mu', 'μ⁻', 'Múon', 'lepton', 2, 3, '−1', '1/2', '105,7 MeV', '1936', 'É um "elétron pesado" que vive 2 milionésimos de segundo. Cerca de um múon de raios cósmicos atravessa sua mão a cada segundo.'),
  P('tau', 'τ⁻', 'Tau', 'lepton', 3, 3, '−1', '1/2', '1,78 GeV', '1975', 'É o lépton mais pesado: tem quase o dobro da massa de um próton.'),
  P('ve', 'νe', 'Neutrino do elétron', 'lepton', 1, 4, '0', '1/2', '< 1 eV', '1956', 'Trilhões de neutrinos vindos do Sol atravessam seu corpo a cada segundo, sem que você sinta nada.'),
  P('vm', 'νμ', 'Neutrino do múon', 'lepton', 2, 4, '0', '1/2', '< 1 eV', '1962', 'Sua descoberta mostrou que existe mais de um tipo de neutrino.'),
  P('vt', 'ντ', 'Neutrino do tau', 'lepton', 3, 4, '0', '1/2', '< 1 eV', '2000', 'Foi a última partícula de matéria do Modelo Padrão a ser observada.'),
  P('g', 'g', 'Glúon', 'boson', 4, 1, '0', '1', '0', '1979', 'É a "cola" da força forte: mantém os quarks presos dentro de prótons e nêutrons.'),
  P('ph', 'γ', 'Fóton', 'boson', 4, 2, '0', '1', '0', '1905', 'É a partícula da luz e transmite a força eletromagnética.'),
  P('Z', 'Z⁰', 'Bóson Z', 'boson', 4, 3, '0', '1', '91,2 GeV', '1983', 'Transmite a força fraca sem trocar a carga das partículas.'),
  P('W', 'W±', 'Bóson W', 'boson', 4, 4, '±1', '1', '80,4 GeV', '1983', 'Transmite a força fraca e é capaz de transformar um tipo de quark em outro.'),
  P('H', 'H', 'Bóson de Higgs', 'higgs', 5, 1, '0', '0', '125 GeV', '2012', 'É a vibração do campo de Higgs, que dá massa às partículas elementares.'),
  P('G', 'G', 'Gráviton', 'hip', 5, 4, '0', '2', '0', 'nunca detectado', 'Seria a partícula da gravidade. É uma hipótese: nenhum experimento conseguiu detectá-lo.'),
];

const SYM_ANTI = { e: 'e⁺', mu: 'μ⁺', tau: 'τ⁺', ve: 'ν̄e', vm: 'ν̄μ', vt: 'ν̄τ' };
const NOME_ANTI = { e: 'Pósitron', mu: 'Antimúon', tau: 'Antitau' };
const inverte = c => (c[0] === '+' ? '−' + c.slice(1) : c[0] === '−' ? '+' + c.slice(1) : c);

const antis = base.filter(p => p.fam === 'quark' || p.fam === 'lepton').map(p => ({
  ...p,
  id: 'a' + p.id,
  sym: SYM_ANTI[p.id] || bar(p.sym),
  name: NOME_ANTI[p.id] || (p.fam === 'quark' ? 'Anti' + p.name.toLowerCase().replace('quark ', 'quark ') : 'Anti' + p.name.toLowerCase()),
  carga: inverte(p.carga),
  anti: true,
  fato: p.id === 'e'
    ? 'Foi a primeira antipartícula descoberta, em 1932. É usada em exames de tomografia PET.'
    : `É a antipartícula do ${p.name.toLowerCase()}: mesma massa, cargas opostas.`,
}));

export const particulas = [...base, ...antis];
export const BY_ID = new Map(particulas.map(p => [p.id, p]));
export const par = id => BY_ID.get(id);
/** Versão de antimatéria de uma partícula (ou ela mesma, se não tiver). */
export const antiDe = id => (BY_ID.has('a' + id) ? 'a' + id : id);

export const categorias = {
  barion: 'Bárions',
  meson: 'Mésons',
  exotico: 'Hádrons exóticos',
  atomo: 'Núcleos e átomos',
  forca: 'Forças fundamentais',
  processo: 'Processos',
};

const R = (id, sym, name, cat, c, carga, massa, ano, onde, fato) => ({ id, sym, name, cat, c, carga, massa, ano, onde, fato, n: Object.values(c).reduce((a, b) => a + b, 0) });

export const receitas = [
  // ---------- Bárions: três quarks ----------
  R('p', 'p⁺', 'Próton', 'barion', { u: 2, d: 1 }, '+1', '938,3 MeV', '1919', 'Núcleo de todos os átomos.', 'Só 1% da massa do próton vem dos quarks: o resto é a energia dos glúons que os prendem.'),
  R('n', 'n⁰', 'Nêutron', 'barion', { u: 1, d: 2 }, '0', '939,6 MeV', '1932', 'Núcleo dos átomos, junto com os prótons.', 'Fora do núcleo, um nêutron sobrevive só cerca de 15 minutos antes de virar um próton.'),
  R('delta++', 'Δ⁺⁺', 'Delta++', 'barion', { u: 3 }, '+2', '1 232 MeV', '1952', 'Colisões em aceleradores.', 'Três quarks iguais no mesmo estado pareciam impossíveis; para explicá-la, os físicos propuseram a "cor" dos quarks.'),
  R('delta-', 'Δ⁻', 'Delta−', 'barion', { d: 3 }, '−1', '1 232 MeV', '1952', 'Colisões em aceleradores.', 'Vive apenas 0,000 000 000 000 000 000 000 005 segundo antes de se desfazer.'),
  R('lambda', 'Λ⁰', 'Lambda', 'barion', { u: 1, d: 1, s: 1 }, '0', '1 115,7 MeV', '1950', 'Raios cósmicos e aceleradores.', 'Foi a primeira partícula com quark strange identificada entre os bárions.'),
  R('sigma+', 'Σ⁺', 'Sigma+', 'barion', { u: 2, s: 1 }, '+1', '1 189 MeV', '1953', 'Colisões em aceleradores.', 'É um "próton estranho": troca um quark down por um strange.'),
  R('sigma-', 'Σ⁻', 'Sigma−', 'barion', { d: 2, s: 1 }, '−1', '1 197 MeV', '1953', 'Colisões em aceleradores.', 'Apesar da carga oposta, não é a antipartícula da Sigma+.'),
  R('xi0', 'Ξ⁰', 'Xi zero', 'barion', { u: 1, s: 2 }, '0', '1 315 MeV', '1959', 'Colisões em aceleradores.', 'É chamada de partícula "cascata", porque decai em etapas, uma partícula de cada vez.'),
  R('xi-', 'Ξ⁻', 'Xi−', 'barion', { d: 1, s: 2 }, '−1', '1 322 MeV', '1952', 'Raios cósmicos e aceleradores.', 'Foi descoberta em raios cósmicos antes de existirem aceleradores capazes de produzi-la.'),
  R('omega-', 'Ω⁻', 'Ômega−', 'barion', { s: 3 }, '−1', '1 672 MeV', '1964', 'Colisões em aceleradores.', 'Murray Gell-Mann previu sua existência e sua massa antes da descoberta: foi o triunfo do modelo dos quarks.'),
  R('lambdac', 'Λc⁺', 'Lambda charmosa', 'barion', { u: 1, d: 1, c: 1 }, '+1', '2 286 MeV', '1975', 'Colisões em aceleradores.', 'Foi o primeiro bárion com quark charm a ser observado.'),
  R('sigmac', 'Σc⁺⁺', 'Sigma charmosa', 'barion', { u: 2, c: 1 }, '+2', '2 454 MeV', '1975', 'Colisões em aceleradores.', 'Tem carga +2, o dobro da carga do próton.'),
  R('xicc', 'Ξcc⁺⁺', 'Xi duplamente charmosa', 'barion', { u: 1, c: 2 }, '+2', '3 621 MeV', '2017', 'Experimento LHCb, no CERN.', 'Tem dois quarks pesados, que giram um em torno do outro como um sistema de estrelas duplas.'),
  R('omegac', 'Ωc⁰', 'Ômega charmosa', 'barion', { s: 2, c: 1 }, '0', '2 695 MeV', '1985', 'Colisões em aceleradores.', 'Em 2017, o LHCb encontrou cinco versões excitadas dela de uma só vez.'),
  R('lambdab', 'Λb⁰', 'Lambda bottom', 'barion', { u: 1, d: 1, b: 1 }, '0', '5 620 MeV', '1991', 'Colisões em aceleradores.', 'Pesa quase seis vezes mais que um próton.'),
  R('xib', 'Ξb⁻', 'Xi bottom', 'barion', { d: 1, s: 1, b: 1 }, '−1', '5 797 MeV', '2007', 'Fermilab, nos Estados Unidos.', 'Foi a primeira partícula observada com um quark de cada uma das três gerações.'),
  R('omegab', 'Ωb⁻', 'Ômega bottom', 'barion', { s: 2, b: 1 }, '−1', '6 045 MeV', '2008', 'Fermilab, nos Estados Unidos.', 'É um dos bárions mais pesados já medidos.'),
  R('pbar', 'p̄', 'Antipróton', 'barion', { au: 2, ad: 1 }, '−1', '938,3 MeV', '1955', 'Aceleradores; raros nos raios cósmicos.', 'O CERN consegue guardar antiprótons por mais de um ano em armadilhas magnéticas.'),
  R('nbar', 'n̄', 'Antinêutron', 'barion', { au: 1, ad: 2 }, '0', '939,6 MeV', '1956', 'Aceleradores.', 'Não tem carga, como o nêutron, mas é feito de antiquarks e se aniquila ao tocar a matéria.'),

  // ---------- Mésons: um quark e um antiquark ----------
  R('pi+', 'π⁺', 'Píon positivo', 'meson', { u: 1, ad: 1 }, '+1', '139,6 MeV', '1947', 'Raios cósmicos e aceleradores.', 'O físico brasileiro César Lattes participou da sua descoberta, em 1947.'),
  R('pi-', 'π⁻', 'Píon negativo', 'meson', { d: 1, au: 1 }, '−1', '139,6 MeV', '1947', 'Raios cósmicos e aceleradores.', 'Píons trocados entre prótons e nêutrons ajudam a manter o núcleo atômico unido.'),
  R('pi0', 'π⁰', 'Píon neutro', 'meson', { u: 1, au: 1 }, '0', '135,0 MeV', '1950', 'Raios cósmicos e aceleradores.', 'Na verdade é uma mistura de up–antiup e down–antidown. Decai quase sempre em dois fótons.'),
  R('k+', 'K⁺', 'Káon positivo', 'meson', { u: 1, as: 1 }, '+1', '493,7 MeV', '1947', 'Raios cósmicos e aceleradores.', 'Os káons foram as primeiras partículas "estranhas" descobertas.'),
  R('k-', 'K⁻', 'Káon negativo', 'meson', { s: 1, au: 1 }, '−1', '493,7 MeV', '1947', 'Raios cósmicos e aceleradores.', 'É a antipartícula do káon positivo.'),
  R('k0', 'K⁰', 'Káon neutro', 'meson', { d: 1, as: 1 }, '0', '497,6 MeV', '1947', 'Raios cósmicos e aceleradores.', 'Em 1964 revelou que matéria e antimatéria não se comportam exatamente do mesmo jeito.'),
  R('phi', 'φ', 'Méson phi', 'meson', { s: 1, as: 1 }, '0', '1 019 MeV', '1962', 'Colisões em aceleradores.', 'É feito de um quark strange e seu próprio antiquark.'),
  R('d0', 'D⁰', 'Méson D neutro', 'meson', { c: 1, au: 1 }, '0', '1 865 MeV', '1976', 'Colisões em aceleradores.', 'Consegue se transformar na própria antipartícula e voltar, oscilando entre as duas.'),
  R('d+', 'D⁺', 'Méson D positivo', 'meson', { c: 1, ad: 1 }, '+1', '1 870 MeV', '1976', 'Colisões em aceleradores.', 'Sua descoberta confirmou que o quark charm também forma partículas com quarks leves.'),
  R('ds', 'Ds⁺', 'Méson D estranho', 'meson', { c: 1, as: 1 }, '+1', '1 968 MeV', '1977', 'Colisões em aceleradores.', 'Junta dois quarks da segunda geração: charm e antistrange.'),
  R('jpsi', 'J/ψ', 'J/psi', 'meson', { c: 1, ac: 1 }, '0', '3 097 MeV', '1974', 'Colisões em aceleradores.', 'Tem dois nomes porque foi descoberta ao mesmo tempo por duas equipes; os dois líderes dividiram o Nobel.'),
  R('b+', 'B⁺', 'Méson B positivo', 'meson', { u: 1, ab: 1 }, '+1', '5 279 MeV', '1983', 'Colisões em aceleradores.', 'Seus decaimentos raros são vasculhados em busca de física além do Modelo Padrão.'),
  R('b0', 'B⁰', 'Méson B neutro', 'meson', { d: 1, ab: 1 }, '0', '5 280 MeV', '1983', '"Fábricas de B" no Japão e nos Estados Unidos.', 'Mostrou uma diferença clara entre matéria e antimatéria, o que rendeu o Nobel de 2008.'),
  R('bs', 'Bs⁰', 'Méson B estranho', 'meson', { s: 1, ab: 1 }, '0', '5 367 MeV', '1993', 'Colisões em aceleradores.', 'Vira a própria antipartícula e volta cerca de 3 trilhões de vezes por segundo.'),
  R('bc', 'Bc⁺', 'Méson B charmoso', 'meson', { c: 1, ab: 1 }, '+1', '6 274 MeV', '1998', 'Fermilab, nos Estados Unidos.', 'É o único méson feito de dois quarks pesados de tipos diferentes.'),
  R('upsilon', 'ϒ', 'Úpsilon', 'meson', { b: 1, ab: 1 }, '0', '9 460 MeV', '1977', 'Fermilab, nos Estados Unidos.', 'Sua descoberta revelou a existência do quark bottom.'),

  // ---------- Hádrons exóticos ----------
  R('tetra', 'Zc⁺', 'Tetraquark Zc', 'exotico', { c: 1, ac: 1, u: 1, ad: 1 }, '+1', '≈ 3 900 MeV', '2013', 'Experimentos BESIII (China) e Belle (Japão).', 'Por ter carga elétrica, não podia ser só charm–anticharm: precisava de quatro quarks.'),
  R('tcc', 'Tcc⁺', 'Tetraquark duplamente charmoso', 'exotico', { c: 2, au: 1, ad: 1 }, '+1', '3 875 MeV', '2021', 'Experimento LHCb, no CERN.', 'É o hádron exótico de vida mais longa já encontrado.'),
  R('penta', 'Pc⁺', 'Pentaquark', 'exotico', { u: 2, d: 1, c: 1, ac: 1 }, '+1', '≈ 4 400 MeV', '2015', 'Experimento LHCb, no CERN.', 'Partículas de cinco quarks foram previstas em 1964, mas só confirmadas meio século depois.'),
  R('glueball', 'gg', 'Bola de glúons', 'exotico', { g: 2 }, '0', '≈ 1 700 MeV', 'ainda em estudo', 'Prevista pela teoria; há candidatas em aceleradores.', 'Seria uma partícula feita só de força, sem nenhum quark dentro.'),
  R('qgp', 'QGP', 'Plasma de quarks e glúons', 'exotico', { u: 1, d: 1, s: 1, g: 3 }, '—', 'temperatura de trilhões de graus', '2005', 'Colisões de núcleos pesados no RHIC e no LHC.', 'O universo inteiro foi uma sopa assim nos primeiros milionésimos de segundo após o Big Bang.'),

  // ---------- Núcleos e átomos ----------
  R('deuteron', '²H⁺', 'Dêuteron', 'atomo', { u: 3, d: 3 }, '+1', '1 875,6 MeV', '1931', 'Núcleo do hidrogênio pesado, presente na água do mar.', 'É um próton e um nêutron grudados: o primeiro passo da fusão que acende o Sol.'),
  R('triton', '³H⁺', 'Tríton', 'atomo', { u: 4, d: 5 }, '+1', '2 808,9 MeV', '1934', 'Núcleo do trítio, combustível de reatores de fusão.', 'É radioativo: metade dos trítios decai em cerca de 12 anos.'),
  R('helion', '³He²⁺', 'Hélion', 'atomo', { u: 5, d: 4 }, '+2', '2 808,4 MeV', '1934', 'Núcleo do hélio-3, raro na Terra.', 'O solo da Lua acumulou hélio-3 trazido pelo vento solar durante bilhões de anos.'),
  R('alfa', 'α', 'Partícula alfa', 'atomo', { u: 6, d: 6 }, '+2', '3 727,4 MeV', '1899', 'Núcleo do hélio; radiação de elementos como urânio e rádio.', 'Com partículas alfa, Rutherford descobriu em 1911 que o átomo tem um núcleo.'),
  R('hidrogenio', 'H', 'Átomo de hidrogênio', 'atomo', { u: 2, d: 1, e: 1 }, '0', '938,8 MeV', '1766', 'Cerca de 75% da matéria comum do universo.', 'É o átomo mais simples: um próton e um elétron.'),
  R('deuterio', '²H', 'Átomo de deutério', 'atomo', { u: 3, d: 3, e: 1 }, '0', '1 876,1 MeV', '1931', 'Água pesada, usada em reatores nucleares.', 'Um em cada 6 400 átomos de hidrogênio da água do mar é deutério.'),
  R('helio', 'He', 'Átomo de hélio', 'atomo', { u: 6, d: 6, e: 2 }, '0', '3 728,4 MeV', '1868', 'Estrelas; balões e aparelhos de ressonância magnética.', 'Foi descoberto primeiro no Sol, pela cor da sua luz, e só 27 anos depois na Terra.'),
  R('muonico', 'pμ', 'Hidrogênio muônico', 'atomo', { u: 2, d: 1, mu: 1 }, '0', '1 044 MeV', '2010', 'Experimentos no Instituto Paul Scherrer, na Suíça.', 'O múon orbita 200 vezes mais perto do próton; isso permitiu medir o tamanho do próton com precisão inédita.'),
  R('antih', 'H̄', 'Anti-hidrogênio', 'atomo', { au: 2, ad: 1, ae: 1 }, '0', '938,8 MeV', '1995', 'CERN, na Suíça.', 'Em 2023, o CERN mostrou que a antimatéria cai para baixo, como a matéria comum.'),
  R('positronio', 'Ps', 'Positrônio', 'atomo', { e: 1, ae: 1 }, '0', '1,022 MeV', '1951', 'Laboratórios; forma-se em exames PET.', 'É um "átomo" sem núcleo: um elétron e um pósitron girando um ao redor do outro até se aniquilarem.'),
  R('muonio', 'Mu', 'Muônio', 'atomo', { amu: 1, e: 1 }, '0', '106,2 MeV', '1960', 'Laboratórios com feixes de múons.', 'Comporta-se como um átomo de hidrogênio nove vezes mais leve.'),
  R('protonio', 'pp̄', 'Protônio', 'atomo', { u: 2, d: 1, au: 2, ad: 1 }, '0', '1 876,5 MeV', '2006', 'CERN, na Suíça.', 'Um próton e um antipróton orbitam um ao outro por uma fração de segundo antes de se aniquilarem.'),

  // ---------- Forças fundamentais ----------
  R('eletromag', 'γ', 'Força eletromagnética', 'forca', { e: 2, ph: 1 }, '—', 'alcance infinito', '1865', 'Luz, eletricidade, ímãs e toda a química.', 'Dois elétrons se repelem trocando fótons. É essa força que impede sua mão de atravessar a mesa.'),
  R('forte', 'g', 'Força forte', 'forca', { u: 1, d: 1, g: 1 }, '—', 'alcance de 1 femtômetro', '1973', 'Interior de prótons, nêutrons e núcleos.', 'Ao contrário das outras, fica mais intensa quando os quarks se afastam; por isso nunca se vê um quark sozinho.'),
  R('fraca', 'W', 'Força fraca', 'forca', { e: 1, ve: 1, W: 1 }, '—', 'alcance de 0,001 femtômetro', '1933', 'Radioatividade e fusão nuclear no Sol.', 'É a única força capaz de mudar o tipo de uma partícula. Sem ela, o Sol não brilharia.'),
  R('neutra', 'Z', 'Força fraca neutra', 'forca', { ve: 2, Z: 1 }, '—', 'alcance de 0,001 femtômetro', '1973', 'Colisões de neutrinos.', 'Sua descoberta confirmou que eletromagnetismo e força fraca são duas faces da mesma força eletrofraca.'),
  R('gravidade', 'G', 'Gravidade', 'forca', { e: 2, G: 1 }, '—', 'alcance infinito', '1687', 'Queda dos corpos, órbitas, estrelas e galáxias.', 'É a mais fraca das quatro forças e a única ainda sem partícula confirmada: o gráviton é só uma hipótese.'),
  R('yukawa', 'H', 'Campo de Higgs', 'forca', { t: 1, at: 1, H: 1 }, '—', 'preenche todo o espaço', '2012', 'Todo o universo.', 'Quanto mais uma partícula interage com o campo de Higgs, mais massa ela tem. O quark top é o campeão.'),

  // ---------- Processos ----------
  R('compton', 'e⁻γ', 'Espalhamento Compton', 'processo', { e: 1, ph: 1 }, '—', '—', '1923', 'Raios X batendo em elétrons.', 'Mostrou que a luz se comporta como partícula ao colidir com um elétron, como uma bola de bilhar.'),
  R('aniquilacao', 'e⁻e⁺→γγ', 'Aniquilação', 'processo', { e: 1, ae: 1, ph: 2 }, '—', '1,022 MeV liberados', '1933', 'Exames de tomografia PET.', 'Matéria e antimatéria viram luz. A tomografia PET detecta exatamente esses dois fótons.'),
  R('beta', 'n→p e⁻ν̄', 'Decaimento beta', 'processo', { u: 1, d: 1, e: 1, ave: 1, W: 1 }, '—', '—', '1899', 'Radioatividade; datação por carbono-14.', 'Um quark down vira up emitindo um W, que se desfaz em elétron e antineutrino. Assim um nêutron vira próton.'),
  R('muondec', 'μ→e ν ν̄', 'Decaimento do múon', 'processo', { mu: 1, e: 1, ave: 1, vm: 1, W: 1 }, '—', 'vida de 2,2 μs', '1940', 'Raios cósmicos.', 'Múons só chegam ao chão porque, quase à velocidade da luz, o tempo passa mais devagar para eles.'),
  R('piondec', 'π⁺→μ⁺ν', 'Decaimento do píon', 'processo', { u: 1, ad: 1, amu: 1, vm: 1, W: 1 }, '—', 'vida de 26 ns', '1947', 'Raios cósmicos; feixes de neutrinos.', 'É assim que os aceleradores produzem feixes de neutrinos para experimentos.'),
  R('topdec', 't→bW', 'Decaimento do top', 'processo', { t: 1, b: 1, W: 1 }, '—', 'vida de 5 × 10⁻²⁵ s', '1995', 'Fermilab e LHC.', 'O quark top decai tão depressa que não dá tempo de formar nenhuma partícula com outros quarks.'),
  R('zmumu', 'Z→μ⁺μ⁻', 'Decaimento do Z', 'processo', { Z: 1, mu: 1, amu: 1 }, '—', '—', '1983', 'CERN.', 'Contando os decaimentos do Z, o CERN concluiu que existem exatamente três tipos de neutrinos leves.'),
  R('hgg', 'H→γγ', 'Higgs em dois fótons', 'processo', { H: 1, ph: 2 }, '—', '—', '2012', 'Experimentos ATLAS e CMS, no LHC.', 'Foi um dos sinais que revelaram o bóson de Higgs em 2012.'),
  R('hzz', 'H→ZZ', 'Higgs em dois bósons Z', 'processo', { H: 1, Z: 2 }, '—', '—', '2012', 'Experimentos ATLAS e CMS, no LHC.', 'Cada Z vira dois léptons: quatro rastros limpos, o "canal de ouro" da descoberta do Higgs.'),
  R('hbb', 'H→bb̄', 'Higgs em quarks bottom', 'processo', { H: 1, b: 1, ab: 1 }, '—', '—', '2018', 'Experimentos ATLAS e CMS, no LHC.', 'É o decaimento mais comum do Higgs, mas levou seis anos para ser confirmado no meio de tanto ruído.'),
  R('ggh', 'gg→H', 'Fusão de glúons', 'processo', { g: 2, H: 1 }, '—', '—', '2012', 'LHC, no CERN.', 'É a principal maneira de criar um bóson de Higgs: dois glúons de prótons que colidem se fundem.'),
  R('oscilacao', 'νe↔νμ↔ντ', 'Oscilação de neutrinos', 'processo', { ve: 1, vm: 1, vt: 1 }, '—', '—', '1998', 'Neutrinos do Sol, da atmosfera e de reatores.', 'Neutrinos mudam de tipo durante a viagem. Isso provou que eles têm massa e rendeu o Nobel de 2015.'),
];

const chave = c => Object.keys(c).sort().map(k => k + c[k]).join('|');
const CHAVES = new Map(receitas.map(r => [chave(r.c), r]));
export const REC = new Map(receitas.map(r => [r.id, r]));

/** Receita com exatamente essas partículas. */
export const acharReceita = zona => (Object.keys(zona).length ? CHAVES.get(chave(zona)) : undefined);

export const xpSub = r => 40 + 15 * Math.min(r.n, 8);

/** Partículas que ainda cabem no acelerador: somar mais uma mantém alguma receita ao alcance. */
export function cabem(zona) {
  const ks = Object.keys(zona), ok = new Set();
  for (const r of receitas) {
    if (!ks.every(k => (r.c[k] || 0) >= zona[k])) continue;
    for (const k in r.c) if (r.c[k] > (zona[k] || 0)) ok.add(k);
  }
  return ok;
}

/** O que o painel do acelerador diz sobre a combinação atual. */
export function statusSub(zona, descobertas) {
  const ks = Object.keys(zona);
  if (!ks.length) return { tone: 'idle', tag: 'AGUARDANDO', title: 'Acelerador vazio', text: 'Toque nas partículas da tabela para colocá-las no acelerador.', missing: [] };
  if (acharReceita(zona)) return { tone: 'ok', tag: 'COLISÃO DISPONÍVEL', title: 'Colisão disponível', text: 'Essas partículas formam algo. Toque em Colidir para descobrir o quê, ou continue adicionando.', missing: [] };
  const cands = receitas.filter(r => ks.every(k => (r.c[k] || 0) >= zona[k]));
  if (cands.length) {
    const novas = cands.filter(r => !descobertas.includes(r.id));
    if (!novas.length) return { tone: 'near', tag: 'JÁ DESCOBERTO', title: 'Nada novo por aqui', text: 'Você já descobriu tudo o que começa com essa combinação. Experimente outras partículas.', missing: [] };
    const falta = r => Object.keys(r.c).reduce((a, k) => a + r.c[k] - (zona[k] || 0), 0);
    const alvo = novas.slice().sort((a, b) => falta(a) - falta(b))[0];
    return {
      tone: 'near', tag: 'QUASE LÁ', title: 'Faltam partículas',
      text: `Adicione as partículas abaixo.${novas.length > 1 ? ` ${novas.length} descobertas ainda são possíveis com essa combinação.` : ''}`,
      missing: Object.keys(alvo.c).filter(k => alvo.c[k] > (zona[k] || 0)).map(k => ({ id: k, n: alvo.c[k] - (zona[k] || 0) })),
    };
  }
  if (ks.some(k => k === 't' || k === 'at')) return { tone: 'bad', tag: 'INSTÁVEL', title: 'O quark top não espera', text: 'Ele decai em 5 × 10⁻²⁵ segundo, antes de conseguir se ligar a outros quarks. Tente-o com o bóson de Higgs ou com o W.', missing: [] };
  if (ks.some(k => par(k).fam === 'quark') && ks.every(k => par(k).fam === 'quark')) return { tone: 'bad', tag: 'INSTÁVEL', title: 'Quarks sem cor neutra', text: 'Quarks só ficam presos em trios (bárions) ou em pares de quark e antiquark (mésons). Ajuste a combinação.', missing: [] };
  return { tone: 'bad', tag: 'INSTÁVEL', title: 'Nada se forma', text: 'Nenhuma partícula ou interação conhecida corresponde a essa combinação. Retire alguma partícula.', missing: [] };
}
