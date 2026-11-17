// Frase de abertura da tela "Uau!" de cada descoberta nova: um título curto e brincalhão
// e uma frase que conta, em tom de piada, a que grupo a descoberta pertence.
// Ordem de busca: frase própria da substância → grupo temático → regra pelo nome → frase genérica.
const T = (titulo, texto) => ({ titulo, texto });

/** Frases próprias de substâncias famosas, pela fórmula `f`. */
const ESPECIAIS = {
  H2O: T('Hidratação desbloqueada!', 'Você descobriu a molécula mais importante do planeta. Beba um copo para comemorar.'),
  O2: T('Respire fundo!', 'Você descobriu o gás que te mantém vivo a cada respiração.'),
  CO2: T('Bolhinhas!', 'Você descobriu o gás que dá gás ao refrigerante e alimenta as plantas.'),
  H2: T('Leve como uma pluma!', 'Você descobriu a molécula mais leve do universo. Combustível de foguete!'),
  N2: T('O dono do ar!', 'Você descobriu o gás que forma quase 80% de tudo o que você respira.'),
  O3: T('Protetor solar do planeta!', 'Você descobriu o escudo invisível que segura os raios ultravioleta lá em cima.'),
  NaCl: T('O sal da terra!', 'Você descobriu o tempero mais antigo da humanidade. A comida agradece.'),
  CH4: T('Pum de vaca!', 'Você descobriu o gás que sai do arroto (e do outro lado) dos bois. Sério.'),
  N2O: T('Ha-ha-há!', 'Você descobriu o gás do riso. Os dentistas adoram.'),
  C2H6O: T('Saideira!', 'Você descobriu o álcool da cerveja, do vinho e do combustível do carro.'),
  CH4O: T('Primo perigoso!', 'Você descobriu o metanol, parente tóxico do álcool das bebidas. Nem um gole!'),
  C6H12O6: T('Instinto de formiga!', 'Você descobriu a glicose, o combustível favorito do seu cérebro.'),
  C12H22O11: T('Instinto de formiga!', 'Você descobriu o açúcar do açucareiro. Agora é só passar o café.'),
  C8H10N4O2: T('Modo turbo ativado!', 'Você descobriu a cafeína. Agora dá para estudar química até de madrugada.'),
  C7H8N4O2: T('Cheiro de chocolate!', 'Você descobriu a teobromina, o estimulante do chocolate (e o motivo de cachorro não poder comer).'),
  C8H11NO2: T('Recompensa desbloqueada!', 'Você descobriu a dopamina. Sabe esse prazerzinho de descobrir algo novo? É ela agindo.'),
  C10H12N2O: T('Sorriso químico!', 'Você descobriu a serotonina, um dos mensageiros do bom humor.'),
  C9H13NO3: T('Coração disparado!', 'Você descobriu a adrenalina, a molécula do susto e da montanha-russa.'),
  C13H16N2O2: T('Hora de dormir…', 'Você descobriu a melatonina, o sinal que o corpo usa para avisar que é noite.'),
  C10H16N5O13P3: T('Bateria da vida!', 'Você descobriu o ATP, a moeda de energia que cada célula do seu corpo gasta sem parar.'),
  CH2O2: T('Picada de formiga!', 'Você descobriu o ácido que as formigas usam para arder. O nome vem de "formica", formiga em latim.'),
  C2H4O2: T('Que azedo!', 'Você descobriu o ácido do vinagre. A salada mandou um abraço.'),
  C6H8O7: T('Careta de limão!', 'Você descobriu o ácido que faz a sua boca encolher ao chupar limão.'),
  C6H8O6: T('Força, laranja!', 'Você descobriu a vitamina C, a favorita de quem está gripado.'),
  CH4N2O: T('Corre pro banheiro!', 'Você descobriu a ureia, o jeito que o corpo encontrou de jogar fora nitrogênio pelo xixi.'),
  C5H4N4O3: T('Ai, meu dedão!', 'Você descobriu o ácido úrico, aquele que causa a gota quando sobra no sangue.'),
  C4H9N3O2: T('Modo marombeiro!', 'Você descobriu a creatina, a queridinha de quem vive na academia.'),
  C2H7NO3S: T('Asas de energético!', 'Você descobriu a taurina, famosa nas latinhas de energético.'),
  C3H6OS: T('Choro garantido!', 'Você descobriu a molécula que faz qualquer um chorar ao cortar cebola.'),
  C18H27NO3: T('Fogo na boca!', 'Você descobriu a capsaicina, o ardor da pimenta. Água não ajuda; leite, sim.'),
  C12H22O: T('Cheiro de chuva!', 'Você descobriu a geosmina, o cheirinho de terra molhada. Seu nariz sente poucas moléculas dela.'),
  C4H6O2: T('Hora do filme!', 'Você descobriu o diacetil, o cheiro de manteiga da pipoca.'),
  C7H14O2: T('Bananaaa!', 'Você descobriu o cheiro de banana. Os macacos aprovam.'),
  C8H8O3: T('Sorvete de baunilha!', 'Você descobriu a vanilina, o sabor mais pedido da sorveteria.'),
  C10H16: T('Raspas de laranja!', 'Você descobriu o limoneno, o perfume da casca das frutas cítricas.'),
  C10H20O: T('Hálito fresco!', 'Você descobriu o mentol, que engana seu cérebro e faz a boca parecer gelada.'),
  C9H8O: T('Cheirinho de canela!', 'Você descobriu o cinamaldeído. Arroz-doce, alguém?'),
  C5H14N2: T('Tampe o nariz!', 'Você descobriu a cadaverina. O nome já diz tudo sobre o cheiro.'),
  C5H12S: T('Ataque de gambá!', 'Você descobriu o metilbutanotiol, uma das armas fedidas do gambá.'),
  H2S: T('Ovo podre!', 'Você descobriu o gás com cheiro de ovo estragado. Abra a janela!'),
  C3H9N: T('Cheiro de peixaria!', 'Você descobriu a trimetilamina, o cheiro de peixe passado.'),
  C5H10O2: T('Chulé detectado!', 'Você descobriu o ácido isovalérico, o cheiro de meia esquecida no tênis.'),
  C7H5N3O6: T('Cabum!', 'Você descobriu o TNT. Calma: no laboratório do Núcleo nada explode.'),
  C3H5N3O9: T('Não sacuda!', 'Você descobriu a nitroglicerina, o explosivo que deu origem ao Prêmio Nobel.'),
  NaN3: T('Airbag acionado!', 'Você descobriu a azida de sódio, que enche o airbag em um piscar de olhos.'),
  FeS2: T('Ouro de tolo!', 'Você descobriu a pirita. Brilha como ouro, mas vale bem menos. Não conte pra ninguém.'),
  Ca5P3O13H: T('Sorria!', 'Você descobriu a hidroxiapatita, o mineral dos seus dentes e ossos.'),
  NaF: T('Escove os dentes!', 'Você descobriu o flúor da pasta de dente. Seu dentista ficou orgulhoso.'),
  SnF2: T('Escove os dentes!', 'Você descobriu o fluoreto das pastas de dente. Seu dentista ficou orgulhoso.'),
  AgI: T('Fazedor de chuva!', 'Você descobriu o iodeto de prata, jogado nas nuvens para provocar chuva.'),
  SrAl2O4: T('Brilha no escuro!', 'Você descobriu o pó dos adesivos de estrelinha que brilham no teto do quarto.'),
  SF6: T('Voz de trovão!', 'Você descobriu o gás tão pesado que deixa a voz grossa (o contrário do hélio).'),
  C4H10: T('Clique, fogo!', 'Você descobriu o butano, o gás que mora dentro do isqueiro.'),
  C8H18: T('Vrum vrum!', 'Você descobriu o octano, a medida de qualidade da gasolina.'),
  C3H8: T('Pode acender o fogão!', 'Você descobriu o gás do botijão.'),
  C10H14N2: T('Vício perigoso!', 'Você descobriu a nicotina, a molécula que prende os fumantes ao cigarro.'),
  C9H8O4: T('Adeus, dor de cabeça!', 'Você descobriu a aspirina, um dos remédios mais usados da história.'),
  C16H18N2O4S: T('Salvou milhões!', 'Você descobriu a penicilina, achada por acaso num prato de mofo.'),
  C2H2: T('Faísca de solda!', 'Você descobriu o acetileno, que queima a mais de 3 000 °C.'),
  C2F4: T('Nada gruda!', 'Você descobriu a base do teflon, o revestimento das frigideiras.'),
  NaHCO3: T('Bolo fofinho!', 'Você descobriu o bicarbonato, o segredo das massas que crescem.'),
  C5H8NNaO4: T('Sabor umami!', 'Você descobriu o glutamato, o quinto sabor que a sua língua sente.'),
  C14H18N2O5: T('Doce sem açúcar!', 'Você descobriu o aspartame, 200 vezes mais doce que o açúcar.'),
  C12H19Cl3O8: T('Doce sem açúcar!', 'Você descobriu a sucralose, 600 vezes mais doce que o açúcar.'),
  C16H10N2O2: T('Calça jeans!', 'Você descobriu o índigo, o azul de quase todo jeans do mundo.'),
  C16H8Br2N2O2: T('Cor de imperador!', 'Você descobriu a púrpura de Tiro, tão cara que só reis podiam vestir.'),
  YBa2Cu3O7: T('Trem que levita!', 'Você descobriu um supercondutor que, bem frio, faz ímãs flutuarem.'),
  C12H17NO: T('Xô, mosquito!', 'Você descobriu o DEET, o ativo dos repelentes.'),
  C20H30O: T('Visão de águia!', 'Você descobriu a vitamina A, essencial para enxergar no escuro.'),
  C21H20O6: T('Amarelo-açafrão!', 'Você descobriu a curcumina, a cor do curry e da cúrcuma.'),
  C14H12O3: T('Um brinde!', 'Você descobriu o resveratrol, que vem da casca da uva e aparece no vinho tinto.'),
  C19H28O2: T('Hormônio em ação!', 'Você descobriu a testosterona, que comanda a voz grossa e os músculos.'),
  C10H8: T('Armário da vovó!', 'Você descobriu o naftaleno, o cheiro das bolinhas de naftalina contra traças.'),
  C6H4Cl2: T('Banheiro cheiroso!', 'Você descobriu o paradiclorobenzeno, das pedras sanitárias e das bolinhas antitraça.'),
  C2H4O: T('Culpado da ressaca!', 'Você descobriu o acetaldeído, que o corpo produz ao digerir o álcool e ajuda a causar a ressaca.'),
  KAuC2N2: T('Toque de Midas!', 'Você descobriu um composto de ouro usado para dourar joias e contatos eletrônicos.'),
  C3H6O: T('Removedor de esmalte!', 'Você descobriu a acetona. Cheiro de salão de beleza no laboratório!'),
  MoS2: T('Escorrega que é uma beleza!', 'Você descobriu um lubrificante sólido, usado até em naves espaciais.'),
  C18H24O2: T('Hormônio em ação!', 'Você descobriu o estradiol, um dos principais hormônios do corpo.'),
};

/** Grupos temáticos: cada um lista as fórmulas que pertencem a ele e uma ou mais frases. */
const GRUPOS = [
  { fs: ['C4H4N2O2', 'C4H5N3O', 'C5H5N5', 'C5H6N2O2', 'C5H5N5O', 'C5H10O5', 'C5H10O4', 'C10H13N5O4'], frases: [
    T('Sopro de vida!', 'Você descobriu uma molécula que dá origem a toda a vida no planeta Terra. Ela está no seu DNA, literalmente.'),
    T('Código da vida!', 'Você descobriu uma das peças do DNA e do RNA, o manual de instruções de todo ser vivo.'),
  ] },
  { fs: ['C6H14O6', 'C5H12O5', 'C4H10O4', 'C6H13NO5'], frases: [
    T('Instinto de formiga!', 'Você descobriu um tipo de açúcar. As formigas já estão a caminho.'),
    T('Docinho!', 'Você descobriu um primo do açúcar. Use com moderação.'),
  ] },
  { fs: ['C7H5NO3S', 'C6H12NNaO3S'], frases: [T('Doce sem açúcar!', 'Você descobriu um adoçante: muito doce e quase sem calorias.')] },
  { fs: ['C2H5NO2', 'C3H7NO2', 'C6H13NO2', 'C3H7NO3', 'C3H7NO2S', 'C9H11NO2', 'C6H14N2O2', 'C4H7NO4', 'C5H9NO4', 'C9H11NO3', 'C5H11NO2', 'C5H9NO2', 'C5H11NO2S', 'C6H14N4O2', 'C6H9N3O2', 'C5H10N2O3', 'C4H8N2O3', 'C11H12N2O2'], frases: [
    T('Tijolinho de músculo!', 'Você descobriu um aminoácido, uma das peças que montam todas as proteínas do seu corpo.'),
    T('Modo marombeiro!', 'Você descobriu um aminoácido. Junte vários e você tem uma proteína.'),
  ] },
  { fs: ['C4H9NO2', 'C5H9N3'], frases: [T('Mensagem recebida!', 'Você descobriu um mensageiro químico que seus neurônios usam para conversar.')] },
  { fs: ['C6H5NO2', 'C8H11NO3', 'C12H17ClN4OS', 'C17H20N4O6', 'C10H16N2O3S', 'C19H19N7O6'], frases: [
    T('Mãe aprovou!', 'Você descobriu uma vitamina. Agora ninguém pode dizer que você não se alimenta bem.'),
  ] },
  { fs: ['C8H9NO2', 'C13H18O2', 'C16H19N3O5S', 'C14H22N2O', 'C14H11Cl2NO2', 'C17H19N3O3S', 'PtCl2N2H6', 'C20H24N2O2', 'C2HBrClF3', 'C4H3F7O', 'C7H6O3', 'MgH2O2', 'CHI3'], frases: [
    T('Farmácia de bolso!', 'Você descobriu um remédio. Só tome com receita, hein?'),
    T('Doutor químico!', 'Você descobriu uma molécula que a medicina usa para cuidar das pessoas.'),
  ] },
  { fs: ['C9H6O2', 'C10H12O2', 'C10H16O', 'C10H18O', 'C10H14O', 'C10H12O', 'C6H12O2', 'C7H6O', 'C8H10O', 'C13H20O', 'C6H8O3', 'C6H10O', 'C9H10O2', 'C10H20O2', 'C8H8O2', 'C7H8O2'], frases: [
    T('Nariz de perfumista!', 'Você descobriu uma molécula de cheiro bom. Perfumistas e cozinheiros vivem dela.'),
    T('Que cheirinho!', 'Você descobriu um aroma. Feche os olhos e tente imaginar.'),
  ] },
  { fs: ['C17H19NO3', 'C6H10OS2', 'C4H5NS', 'C11H14O3', 'C17H26O4'], frases: [
    T('Tempero forte!', 'Você descobriu o segredo de um tempero que arde, pica ou faz o nariz escorrer.'),
  ] },
  { fs: ['CH4S', 'C2H6S', 'C8H7N', 'CH5N'], frases: [T('Tampe o nariz!', 'Você descobriu uma das moléculas mais fedidas do catálogo. Desculpa por isso.')] },
  { fs: ['NH4NO3', 'KNO3', 'NH4ClO4', 'KClO3', 'N2H4', 'CH3NO2', 'BaN2O6', 'N2H8Cr2O7'], frases: [
    T('Cabum!', 'Você descobriu algo que gosta de explodir ou de queimar rápido. Mantenha distância do fósforo.'),
    T('Combustível de foguete!', 'Você descobriu uma substância energética que fogos de artifício e foguetes adoram.'),
  ] },
  { fs: ['HCN', 'NaCN', 'As2O3', 'CO', 'PH3', 'C12H4Cl4O2', 'C14H9Cl5', 'NiC4O4', 'C8H20Pb', 'OsO4', 'PbC4H6O4', 'Cl2', 'F2', 'COS', 'CS2', 'B2H6', 'C3H4O', 'CHCl3', 'CCl4', 'C6H6', 'C20H12', 'HgO', 'HgS', 'C3H5NO', 'CH2O'], frases: [
    T('Perigo à vista!', 'Você descobriu uma substância tóxica. Olhe, admire, mas nunca prove.'),
    T('Caveirinha no rótulo!', 'Você descobriu um veneno famoso. Ainda bem que aqui é só no computador.'),
  ] },
  { fs: ['UO2', 'UF6', 'U3O8', 'PuO2', 'AmO2', 'RaCl2', 'ThO2'], frases: [
    T('Brilha no escuro!', 'Você descobriu algo radioativo. Pode guardar o contador Geiger, aqui é seguro.'),
    T('Energia nuclear!', 'Você descobriu uma substância radioativa, daquelas que movem usinas e submarinos.'),
  ] },
  { fs: ['XeF2', 'XeF4', 'KrF2'], frases: [T('Nobreza rebaixada!', 'Você fez um gás nobre, que não se mistura com ninguém, se ligar a outro átomo. Escândalo na realeza!')] },
  { fs: ['PbS', 'SnO2', 'CuFeS2', 'Fe3O4', 'ZrSiO4', 'Sb2S3', 'Mg2SiO4', 'FeTiO3', 'CaTiO3', 'CaWO4', 'Cu2CH2O5', 'CaMgC2O6', 'Al2Si2O9H4', 'Mg3Si4O12H2', 'Na3AlF6', 'Al2O3', 'SiO2', 'CaF2', 'CaCO3', 'Na2B4O7', 'KAlS2O8'], frases: [
    T('Garimpeiro!', 'Você descobriu um mineral. Dá para achar escondido em rochas pelo mundo todo.'),
    T('Tesouro da Terra!', 'Você descobriu um mineral que a natureza levou milhões de anos para formar.'),
  ] },
  { fs: ['C2H3Cl', 'C8H8', 'C4H6', 'C5H8', 'C6H11NO', 'C5H8O2', 'C8H6O4', 'C15H16O2', 'C3H3N', 'C4H5Cl', 'C3H6N6', 'C2H6O2', 'C3H6', 'C2H4', 'C6H10O4'], frases: [
    T('Fábrica de plástico!', 'Você descobriu uma molécula que vira plástico, borracha ou tecido sintético.'),
  ] },
  { fs: ['NaClO', 'C12H25NaO4S', 'C18H29NaO3S', 'C12H23NaO2', 'C3Cl3N3O3', 'C12H7Cl3O2', 'NaBO3', 'C10H16N2O8', 'NH2Cl', 'NaOH', 'NH3', 'H2O2', 'NH5O', 'CaCl2O2'], frases: [
    T('Faxina química!', 'Você descobriu uma substância de limpeza. Sua casa nunca esteve tão brilhante.'),
  ] },
  { fs: ['TiO2', 'CoAl2O4', 'C14H8O4', 'C20H12O5', 'C16H18ClN3S', 'PbCrO4', 'Pb3O4', 'Cr2O3', 'CdSe', 'CdS', 'BiOCl', 'C12H10N2', 'C6H8N2'], frases: [
    T('Paleta de pintor!', 'Você descobriu um pigmento ou corante. O mundo ficou mais colorido.'),
  ] },
  { fs: ['GaAs', 'GaN', 'CdTe', 'LiCoO2', 'LiFePO4', 'In2O3', 'HfO2', 'BaTiO3', 'Bi2Te3', 'SiC', 'Nd2O3', 'SiH4', 'NF3', 'GeO2', 'Ta2O5', 'Eu2O3', 'ZrO2', 'La2O3', 'CeO2', 'Li2CO3'], frases: [
    T('Nerd de tecnologia!', 'Você descobriu um material que mora dentro de celulares, telas, chips ou baterias.'),
  ] },
  { fs: ['C4H8O2', 'CH2Cl2', 'C2Cl4', 'C4H8O', 'C2H6OS', 'CH3Cl', 'C2H5Cl', 'C5H4O2'], frases: [
    T('Dissolve tudo!', 'Você descobriu um solvente, especialista em dissolver o que a água não consegue.'),
  ] },
  { fs: ['CaH4P2O8', 'NH6PO4', 'N2H8SO4', 'CaN2O6', 'KCl', 'C3H8NO5P', 'NH5CO3'], frases: [
    T('Mão verde!', 'Você descobriu uma substância da agricultura, que ajuda (ou controla) o que cresce na plantação.'),
  ] },
  { fs: ['C4H6N4O3', 'C8H24O4Si4', 'C6H6O2', 'C2H4O3'], frases: [T('Dia de spa!', 'Você descobriu um ingrediente de cremes, xampus e cosméticos.')] },
  { fs: ['I2', 'Br2', 'P4', 'S8'], frases: [T('Puro sangue!', 'Você descobriu um elemento em sua forma pura: só ele, ligado a ele mesmo.')] },
  { fs: ['CCl2F2', 'CHClF2', 'C2H2F4', 'CF4'], frases: [T('Brrr, que frio!', 'Você descobriu um gás de geladeira e ar-condicionado.')] },
  { fs: ['C2H6', 'C5H12', 'C6H14', 'C7H16', 'C10H22', 'C6H12', 'C5H10', 'C7H8', 'C8H10'], frases: [
    T('Vrum vrum!', 'Você descobriu um hidrocarboneto, primo da gasolina e do petróleo.'),
  ] },
  { fs: ['C3H8O', 'C3H8O3', 'C3H8O2', 'C7H8O', 'C4H10O'], frases: [T('Álcool em gel!', 'Você descobriu um álcool. Não, não é de beber.')] },
  { fs: ['C3H6O3', 'C4H6O5', 'C4H6O6', 'C4H5KO6', 'C6H8O2', 'C7H6O2', 'K2S2O5', 'C12H24O2', 'C18H30O2', 'C20H30O2', 'C15H10O7', 'C2H3NaO2', 'C15H24O', 'CH2O3', 'C3H6O2'], frases: [
    T('Chef de cozinha!', 'Você descobriu algo que está na sua comida, como tempero, conservante ou nutriente.'),
  ] },
];

/** Regras pelo nome, para quem não está em nenhum grupo. */
const PADROES = [
  [/ de hidrogênio$/, [T('Ácido escondido!', 'Você descobriu um gás que, dissolvido na água, vira um ácido forte.')]],
  [/^Ácido /, [T('Azedou!', 'Você descobriu um ácido. Ele adora doar prótons por aí.'), T('Cuidado, ácido!', 'Você descobriu um ácido. Óculos de proteção, por favor.')]],
  [/^Hidróxido/, [T('Escorregadio!', 'Você descobriu uma base, o oposto de um ácido. Junte os dois e eles se neutralizam.')]],
  [/^(Carbeto|Nitreto|Boreto)/, [T('Duro na queda!', 'Você descobriu um dos materiais mais duros que existem. Corta até aço.')]],
  [/(ó|Ó)xido|óxido/, [T('Oxidou!', 'Você descobriu um óxido: o oxigênio se juntou a mais alguém. É assim que nasce a ferrugem.')]],
  [/^(Cloreto|Brometo|Iodeto|Fluoreto|Sulfato|Nitrato|Nitrito|Carbonato|Bicarbonato|Fosfato|Clorato|Bromato|Iodato|Cromato|Dicromato|Permanganato|Silicato|Selenito|Tiossulfato|Hipoclorito|Acetato|Oxalato|Perclorato|Aluminato|Titanato|Monofluorfosfato|Sulfeto|Seleneto|Telureto|Arseneto|Tiocianato)/,
    [T('Pitada de sal!', 'Você descobriu um sal: um metal e um não metal de mãos dadas por atração elétrica.')]],
  [/^Gás /, [T('Leve como o ar!', 'Você descobriu um gás formado por um único elemento.')]],
];

const GENERICAS = [
  T('Mandou bem!', 'Você descobriu uma substância novinha para a sua coleção.'),
  T('Eureka!', 'Arquimedes gritou isso na banheira. Você pode gritar agora.'),
  T('Cientista nato!', 'Mais uma substância descoberta. Os átomos estão te obedecendo.'),
  T('Que combinação!', 'Você juntou os átomos certos e criou algo novo.'),
];

/** Frases do modo subatômico, por categoria de descoberta. */
const SUB_ESPECIAIS = {
  'Próton': T('O coração do átomo!', 'Você descobriu o próton. Sem ele, nenhum elemento da tabela periódica existiria.'),
  'Nêutron': T('O pacificador!', 'Você descobriu o nêutron, que segura os prótons juntos no núcleo sem brigar.'),
  'Gravidade': T('Tudo que sobe…', 'Você descobriu a gravidade. Newton e a maçã mandaram um oi.'),
  'Campo de Higgs': T('Partícula de Deus!', 'Você descobriu o campo de Higgs, que dá massa às partículas.'),
  'Aniquilação': T('Puf!', 'Matéria encontrou antimatéria e as duas viraram pura luz.'),
  'Átomo de hidrogênio': T('O primeiro de todos!', 'Você montou o átomo mais simples e mais comum do universo.'),
  'Anti-hidrogênio': T('Mundo invertido!', 'Você montou um átomo de antimatéria. Não deixe encostar em nada!'),
  'Plasma de quarks e glúons': T('Sopa do Big Bang!', 'Você recriou o estado da matéria nos primeiros instantes do universo.'),
  'Pentaquark': T('Cinco é demais!', 'Você descobriu o pentaquark, que os físicos só confirmaram em 2015.'),
};
const SUB_CATEGORIAS = {
  barion: [T('Trio inseparável!', 'Você descobriu um bárion: três quarks presos pela força forte.')],
  meson: [T('Dupla dinâmica!', 'Você descobriu um méson: um quark e um antiquark dançando juntos.')],
  exotico: [T('Coisa de outro mundo!', 'Você descobriu um hádron exótico, que quase ninguém acreditava existir.')],
  atomo: [T('Montador de átomos!', 'Você juntou partículas e montou um núcleo ou um átomo inteiro.')],
  forca: [T('Que a força esteja com você!', 'Você descobriu uma das forças que comandam o universo.')],
  processo: [T('Flagrante no acelerador!', 'Você reproduziu um processo que os físicos observam em grandes aceleradores.')],
};

const POR_FORMULA = new Map(GRUPOS.flatMap(g => g.fs.map(f => [f, g.frases])));
// A escolha entre várias frases é fixa para cada descoberta (não muda ao reabrir).
const escolher = (lista, chave) => lista[[...chave].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7) % lista.length];

/** { titulo, texto } para a tela de revelação de uma substância. */
export function fraseSubstancia(s) {
  if (ESPECIAIS[s.f]) return ESPECIAIS[s.f];
  if (POR_FORMULA.has(s.f)) return escolher(POR_FORMULA.get(s.f), s.f);
  const p = PADROES.find(([re]) => re.test(s.name));
  return escolher(p ? p[1] : GENERICAS, s.f);
}

/** { titulo, texto } para a tela de revelação do modo subatômico. */
export function fraseParticula(r) {
  return SUB_ESPECIAIS[r.name] || escolher(SUB_CATEGORIAS[r.cat] || GENERICAS, r.id);
}

