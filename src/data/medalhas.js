// Medalhas das descobertas. Cada uma tem um título brincalhão e uma frase, que também abrem a
// tela "Uau!" da descoberta.
// - Exclusiva: pertence a uma única substância (ou partícula) famosa.
// - Grupo: várias substâncias do mesmo tema; sobe de nível (Bronze → Platina) conforme você descobre mais.
// Uma substância pode fazer parte de vários grupos e destravar mais de uma medalha.
import { substances } from './nucleo.js';
import { receitas } from './subatomico.js';

// ---------------------------------------------------------------- substâncias: exclusivas
// [fórmula, ícone, título, frase]
const EXCLUSIVAS = [
  ['H2O', '💧', 'Hidratação desbloqueada!', 'Você descobriu a molécula mais importante do planeta. Beba um copo para comemorar.'],
  ['O2', '🫁', 'Respire fundo!', 'Você descobriu o gás que te mantém vivo a cada respiração.'],
  ['CO2', '🥤', 'Bolhinhas!', 'Você descobriu o gás que dá gás ao refrigerante e alimenta as plantas.'],
  ['H2', '🎈', 'Leve como uma pluma!', 'Você descobriu a molécula mais leve do universo. Combustível de foguete!'],
  ['N2', '🌬️', 'O dono do ar!', 'Você descobriu o gás que forma quase 80% de tudo o que você respira.'],
  ['O3', '🌍', 'Protetor solar do planeta!', 'Você descobriu o escudo invisível que segura os raios ultravioleta lá em cima.'],
  ['NaCl', '🧂', 'O sal da terra!', 'Você descobriu o tempero mais antigo da humanidade. A comida agradece.'],
  ['CH4', '🐄', 'Pum de vaca!', 'Você descobriu o gás que sai do arroto (e do outro lado) dos bois. Sério.'],
  ['N2O', '😂', 'Ha-ha-há!', 'Você descobriu o gás do riso. Os dentistas adoram.'],
  ['C2H6O', '🍺', 'Saideira!', 'Você descobriu o álcool da cerveja, do vinho e do combustível do carro.'],
  ['CH4O', '🚫', 'Primo perigoso!', 'Você descobriu o metanol, parente tóxico do álcool das bebidas. Nem um gole!'],
  ['C6H12O6', '🍇', 'Combustível do cérebro!', 'Você descobriu a glicose, o açúcar favorito do seu cérebro.'],
  ['C12H22O11', '🍬', 'Passa o açucareiro!', 'Você descobriu o açúcar do açucareiro. Agora é só passar o café.'],
  ['C8H10N4O2', '☕', 'Modo turbo ativado!', 'Você descobriu a cafeína. Agora dá para estudar química até de madrugada.'],
  ['C7H8N4O2', '🍫', 'Cheiro de chocolate!', 'Você descobriu a teobromina, o estimulante do chocolate (e o motivo de cachorro não poder comer).'],
  ['C8H11NO2', '🎁', 'Recompensa desbloqueada!', 'Você descobriu a dopamina. Sabe esse prazerzinho de descobrir algo novo? É ela agindo.'],
  ['C10H12N2O', '😊', 'Sorriso químico!', 'Você descobriu a serotonina, um dos mensageiros do bom humor.'],
  ['C9H13NO3', '🎢', 'Coração disparado!', 'Você descobriu a adrenalina, a molécula do susto e da montanha-russa.'],
  ['C13H16N2O2', '🌙', 'Hora de dormir…', 'Você descobriu a melatonina, o sinal que o corpo usa para avisar que é noite.'],
  ['C10H16N5O13P3', '🔋', 'Bateria da vida!', 'Você descobriu o ATP, a moeda de energia que cada célula do seu corpo gasta sem parar.'],
  ['CH2O2', '🐜', 'Picada de formiga!', 'Você descobriu o ácido que as formigas usam para arder. O nome vem de "formica", formiga em latim.'],
  ['C2H4O2', '🥗', 'Que azedo!', 'Você descobriu o ácido do vinagre. A salada mandou um abraço.'],
  ['C6H8O7', '🍋', 'Careta de limão!', 'Você descobriu o ácido que faz a sua boca encolher ao chupar limão.'],
  ['C6H8O6', '🍊', 'Força, laranja!', 'Você descobriu a vitamina C, a favorita de quem está gripado.'],
  ['CH4N2O', '🚽', 'Corre pro banheiro!', 'Você descobriu a ureia, o jeito que o corpo encontrou de jogar fora nitrogênio pelo xixi.'],
  ['C5H4N4O3', '🦶', 'Ai, meu dedão!', 'Você descobriu o ácido úrico, aquele que causa a gota quando sobra no sangue.'],
  ['C4H9N3O2', '🏋️', 'Rato de academia!', 'Você descobriu a creatina, a queridinha de quem vive na academia.'],
  ['C2H7NO3S', '🥫', 'Asas de energético!', 'Você descobriu a taurina, famosa nas latinhas de energético.'],
  ['C3H6OS', '🧅', 'Choro garantido!', 'Você descobriu a molécula que faz qualquer um chorar ao cortar cebola.'],
  ['C18H27NO3', '🌶️', 'Fogo na boca!', 'Você descobriu a capsaicina, o ardor da pimenta. Água não ajuda; leite, sim.'],
  ['C12H22O', '🌧️', 'Cheiro de chuva!', 'Você descobriu a geosmina, o cheirinho de terra molhada. Seu nariz sente poucas moléculas dela.'],
  ['C4H6O2', '🍿', 'Hora do filme!', 'Você descobriu o diacetil, o cheiro de manteiga da pipoca.'],
  ['C7H14O2', '🍌', 'Bananaaa!', 'Você descobriu o cheiro de banana. Os macacos aprovam.'],
  ['C8H8O3', '🍦', 'Sorvete de baunilha!', 'Você descobriu a vanilina, o sabor mais pedido da sorveteria.'],
  ['C10H16', '🌼', 'Raspas de laranja!', 'Você descobriu o limoneno, o perfume da casca das frutas cítricas.'],
  ['C10H20O', '🌿', 'Hálito fresco!', 'Você descobriu o mentol, que engana seu cérebro e faz a boca parecer gelada.'],
  ['C9H8O', '🍮', 'Cheirinho de canela!', 'Você descobriu o cinamaldeído. Arroz-doce, alguém?'],
  ['C5H14N2', '💀', 'Tampe o nariz!', 'Você descobriu a cadaverina. O nome já diz tudo sobre o cheiro.'],
  ['C5H12S', '🦨', 'Ataque de gambá!', 'Você descobriu o metilbutanotiol, uma das armas fedidas do gambá.'],
  ['H2S', '🥚', 'Ovo podre!', 'Você descobriu o gás com cheiro de ovo estragado. Abra a janela!'],
  ['C3H9N', '🐟', 'Cheiro de peixaria!', 'Você descobriu a trimetilamina, o cheiro de peixe passado.'],
  ['C5H10O2', '🧦', 'Chulé detectado!', 'Você descobriu o ácido isovalérico, o cheiro de meia esquecida no tênis.'],
  ['C7H5N3O6', '🧨', 'Cabum!', 'Você descobriu o TNT. Calma: no laboratório do Núcleo nada explode.'],
  ['C3H5N3O9', '💣', 'Não sacuda!', 'Você descobriu a nitroglicerina, o explosivo que deu origem ao Prêmio Nobel.'],
  ['NaN3', '🚗', 'Airbag acionado!', 'Você descobriu a azida de sódio, que enche o airbag em um piscar de olhos.'],
  ['FeS2', '🪙', 'Ouro de tolo!', 'Você descobriu a pirita. Brilha como ouro, mas vale bem menos. Não conte pra ninguém.'],
  ['Ca5P3O13H', '🦷', 'Sorria!', 'Você descobriu a hidroxiapatita, o mineral dos seus dentes e ossos.'],
  ['NaF', '🪥', 'Escove os dentes!', 'Você descobriu o flúor da pasta de dente. Seu dentista ficou orgulhoso.'],
  ['SnF2', '😁', 'Sorriso brilhante!', 'Você descobriu outro fluoreto das pastas de dente. Seu dentista ficou orgulhoso.'],
  ['AgI', '☁️', 'Fazedor de chuva!', 'Você descobriu o iodeto de prata, jogado nas nuvens para provocar chuva.'],
  ['SrAl2O4', '⭐', 'Brilha no escuro!', 'Você descobriu o pó dos adesivos de estrelinha que brilham no teto do quarto.'],
  ['SF6', '🗣️', 'Voz de trovão!', 'Você descobriu o gás tão pesado que deixa a voz grossa (o contrário do hélio).'],
  ['C4H10', '🔥', 'Clique, fogo!', 'Você descobriu o butano, o gás que mora dentro do isqueiro.'],
  ['C8H18', '⛽', 'Vrum vrum!', 'Você descobriu o octano, a medida de qualidade da gasolina.'],
  ['C3H8', '🍳', 'Pode acender o fogão!', 'Você descobriu o gás do botijão.'],
  ['C10H14N2', '🚬', 'Vício perigoso!', 'Você descobriu a nicotina, a molécula que prende os fumantes ao cigarro.'],
  ['C9H8O4', '🤕', 'Adeus, dor de cabeça!', 'Você descobriu a aspirina, um dos remédios mais usados da história.'],
  ['C16H18N2O4S', '🦠', 'Salvou milhões!', 'Você descobriu a penicilina, achada por acaso num prato de mofo.'],
  ['C2H2', '⚡', 'Faísca de solda!', 'Você descobriu o acetileno, que queima a mais de 3 000 °C.'],
  ['C2F4', '🥘', 'Nada gruda!', 'Você descobriu a base do teflon, o revestimento das frigideiras.'],
  ['NaHCO3', '🎂', 'Bolo fofinho!', 'Você descobriu o bicarbonato, o segredo das massas que crescem.'],
  ['C5H8NNaO4', '🍜', 'Sabor umami!', 'Você descobriu o glutamato, o quinto sabor que a sua língua sente.'],
  ['C14H18N2O5', '🍭', 'Doce sem açúcar!', 'Você descobriu o aspartame, 200 vezes mais doce que o açúcar.'],
  ['C12H19Cl3O8', '🍰', 'Docinho zero!', 'Você descobriu a sucralose, 600 vezes mais doce que o açúcar.'],
  ['C16H10N2O2', '👖', 'Calça jeans!', 'Você descobriu o índigo, o azul de quase todo jeans do mundo.'],
  ['C16H8Br2N2O2', '👑', 'Cor de imperador!', 'Você descobriu a púrpura de Tiro, tão cara que só reis podiam vestir.'],
  ['YBa2Cu3O7', '🚄', 'Trem que levita!', 'Você descobriu um supercondutor que, bem frio, faz ímãs flutuarem.'],
  ['C12H17NO', '🦟', 'Xô, mosquito!', 'Você descobriu o DEET, o ativo dos repelentes.'],
  ['C20H30O', '🥕', 'Visão de águia!', 'Você descobriu a vitamina A, essencial para enxergar no escuro.'],
  ['C21H20O6', '🍛', 'Amarelo-açafrão!', 'Você descobriu a curcumina, a cor do curry e da cúrcuma.'],
  ['C14H12O3', '🍷', 'Um brinde!', 'Você descobriu o resveratrol, que vem da casca da uva e aparece no vinho tinto.'],
  ['C19H28O2', '🧔', 'Voz grossa!', 'Você descobriu a testosterona, que comanda a voz grossa e os músculos.'],
  ['C18H24O2', '🌸', 'Hormônio em ação!', 'Você descobriu o estradiol, um dos principais hormônios do corpo.'],
  ['C10H8', '👵', 'Armário da vovó!', 'Você descobriu o naftaleno, o cheiro das bolinhas de naftalina contra traças.'],
  ['C6H4Cl2', '🚻', 'Banheiro cheiroso!', 'Você descobriu o paradiclorobenzeno, das pedras sanitárias e das bolinhas antitraça.'],
  ['C2H4O', '🤯', 'Culpado da ressaca!', 'Você descobriu o acetaldeído, que o corpo produz ao digerir o álcool e ajuda a causar a ressaca.'],
  ['KAuC2N2', '✨', 'Toque de Midas!', 'Você descobriu um composto de ouro usado para dourar joias e contatos eletrônicos.'],
  ['C3H6O', '💅', 'Removedor de esmalte!', 'Você descobriu a acetona. Cheiro de salão de beleza no laboratório!'],
  ['TiCl4', '🌫️', 'Cortina de fumaça!', 'Você descobriu o tetracloreto de titânio, que solta uma fumaça branca densa ao encontrar o ar úmido.'],
  ['C6H12N4', '🏕️', 'Fogueira de bolso!', 'Você descobriu a hexamina, das pastilhas de combustível sólido usadas em acampamentos.'],
  ['MoS2', '🛷', 'Escorrega que é uma beleza!', 'Você descobriu um lubrificante sólido, usado até em naves espaciais.'],
];

// ---------------------------------------------------------------- substâncias: grupos
// grupo: nome do tema, mostrado como etiqueta. fs: fórmulas que fazem parte. re: ou, então, regra pelo nome.
const GRUPOS = [
  { id: 'dna', icone: '🧬', grupo: 'Moléculas da vida', nome: 'Sopro de vida!', texto: 'Você descobriu uma molécula que dá origem a toda a vida no planeta Terra. Ela está no seu DNA, literalmente.',
    fs: ['C4H4N2O2', 'C4H5N3O', 'C5H5N5', 'C5H6N2O2', 'C5H5N5O', 'C5H10O5', 'C5H10O4', 'C10H13N5O4', 'C10H16N5O13P3'] },
  { id: 'acucar', icone: '🐜', grupo: 'Açúcares', nome: 'Instinto de formiga!', texto: 'Você descobriu um tipo de açúcar. As formigas já estão a caminho.',
    fs: ['C6H12O6', 'C12H22O11', 'C6H14O6', 'C5H12O5', 'C4H10O4', 'C6H13NO5'] },
  { id: 'adocante', icone: '🍭', grupo: 'Adoçantes', nome: 'Doce sem culpa!', texto: 'Você descobriu um adoçante: muito doce e quase sem calorias.',
    fs: ['C7H5NO3S', 'C6H12NNaO3S', 'C14H18N2O5', 'C12H19Cl3O8'] },
  { id: 'amino', icone: '💪', grupo: 'Aminoácidos', nome: 'Tijolinho de músculo!', texto: 'Você descobriu um aminoácido, uma das peças que montam todas as proteínas do seu corpo.',
    fs: ['C2H5NO2', 'C3H7NO2', 'C6H13NO2', 'C3H7NO3', 'C3H7NO2S', 'C9H11NO2', 'C6H14N2O2', 'C4H7NO4', 'C5H9NO4', 'C9H11NO3', 'C5H11NO2', 'C5H9NO2', 'C5H11NO2S', 'C6H14N4O2', 'C6H9N3O2', 'C5H10N2O3', 'C4H8N2O3', 'C11H12N2O2'] },
  { id: 'mensageiro', icone: '🧠', grupo: 'Hormônios e neurotransmissores', nome: 'Mensagem recebida!', texto: 'Você descobriu um mensageiro químico que o corpo usa para mandar recados entre células.',
    fs: ['C4H9NO2', 'C5H9N3', 'C8H11NO2', 'C10H12N2O', 'C9H13NO3', 'C13H16N2O2', 'C19H28O2', 'C18H24O2'] },
  { id: 'corpo', icone: '🫀', grupo: 'Corpo humano', nome: 'Feito de você!', texto: 'Você descobriu uma substância que o seu próprio corpo fabrica ou usa todos os dias.',
    fs: ['H2O', 'CH4N2O', 'C5H4N4O3', 'C4H9N3O2', 'C2H7NO3S', 'Ca5P3O13H', 'HCl', 'C3H6O3', 'C3H4O3', 'CaC2O4'] },
  { id: 'vitamina', icone: '🥦', grupo: 'Vitaminas', nome: 'Mãe aprovou!', texto: 'Você descobriu uma vitamina. Agora ninguém pode dizer que você não se alimenta bem.',
    fs: ['C6H8O6', 'C20H30O', 'C6H5NO2', 'C8H11NO3', 'C12H17ClN4OS', 'C17H20N4O6', 'C10H16N2O3S', 'C19H19N7O6'] },
  { id: 'remedio', icone: '💊', grupo: 'Remédios', nome: 'Farmácia de bolso!', texto: 'Você descobriu um remédio. Só tome com receita, hein?',
    fs: ['C9H8O4', 'C16H18N2O4S', 'C8H9NO2', 'C13H18O2', 'C16H19N3O5S', 'C14H22N2O', 'C14H11Cl2NO2', 'C17H19N3O3S', 'PtCl2N2H6', 'C20H24N2O2', 'C2HBrClF3', 'C4H3F7O', 'N2O', 'C7H6O3', 'MgH2O2', 'CHI3'] },
  { id: 'aroma', icone: '👃', grupo: 'Aromas', nome: 'Nariz de perfumista!', texto: 'Você descobriu uma molécula de cheiro bom. Perfumistas e cozinheiros vivem dela.',
    fs: ['C8H8O3', 'C10H16', 'C10H20O', 'C9H8O', 'C7H14O2', 'C4H6O2', 'C12H22O', 'C9H6O2', 'C10H12O2', 'C10H16O', 'C10H18O', 'C10H14O', 'C10H12O', 'C6H12O2', 'C7H6O', 'C8H10O', 'C13H20O', 'C6H8O3', 'C6H10O', 'C9H10O2', 'C10H20O2', 'C8H8O2', 'C7H8O2'] },
  { id: 'tempero', icone: '🌶️', grupo: 'Temperos fortes', nome: 'Tempero forte!', texto: 'Você descobriu o segredo de um tempero que arde, pica ou faz o nariz escorrer.',
    fs: ['C18H27NO3', 'C3H6OS', 'C21H20O6', 'C17H19NO3', 'C6H10OS2', 'C4H5NS', 'C11H14O3', 'C17H26O4'] },
  { id: 'fedor', icone: '🤢', grupo: 'Fedores', nome: 'Que catinga!', texto: 'Você descobriu uma das moléculas mais fedidas do catálogo. Desculpa por isso.',
    fs: ['H2S', 'C5H14N2', 'C5H12S', 'C3H9N', 'C5H10O2', 'CH4S', 'C2H6S', 'C8H7N', 'CH5N'] },
  { id: 'explosivo', icone: '💥', grupo: 'Explosivos e combustíveis de foguete', nome: 'Kabum!', texto: 'Você descobriu algo que gosta de explodir ou de queimar muito rápido. Mantenha distância do fósforo.',
    fs: ['C7H5N3O6', 'C3H5N3O9', 'NaN3', 'NH4NO3', 'KNO3', 'NH4ClO4', 'KClO3', 'N2H4', 'CH3NO2', 'BaN2O6', 'N2H8Cr2O7'] },
  { id: 'veneno', icone: '☠️', grupo: 'Venenos', nome: 'Caveirinha no rótulo!', texto: 'Você descobriu uma substância tóxica. Olhe, admire, mas nunca prove.',
    fs: ['CH4O', 'C10H14N2', 'HCN', 'NaCN', 'As2O3', 'CO', 'PH3', 'C12H4Cl4O2', 'C14H9Cl5', 'NiC4O4', 'C8H20Pb', 'OsO4', 'PbC4H6O4', 'Cl2', 'F2', 'COS', 'CS2', 'B2H6', 'C3H4O', 'CHCl3', 'CCl4', 'C6H6', 'C20H12', 'HgO', 'HgS', 'C3H5NO', 'CH2O'] },
  { id: 'radioativo', icone: '☢️', grupo: 'Radioativos', nome: 'Brilho nuclear!', texto: 'Você descobriu algo radioativo. Pode guardar o contador Geiger, aqui é seguro.',
    fs: ['UO2', 'UF6', 'U3O8', 'PuO2', 'AmO2', 'RaCl2', 'ThO2'] },
  { id: 'nobre', icone: '🎩', grupo: 'Compostos de gases nobres', nome: 'Nobreza rebaixada!', texto: 'Você fez um gás nobre, que não se mistura com ninguém, se ligar a outro átomo. Escândalo na realeza!',
    fs: ['XeF2', 'XeF4', 'KrF2'] },
  { id: 'mineral', icone: '⛏️', grupo: 'Minerais', nome: 'Garimpeiro!', texto: 'Você descobriu um mineral. Dá para achar escondido em rochas pelo mundo todo.',
    fs: ['FeS2', 'Ca5P3O13H', 'NaCl', 'PbS', 'HgS', 'SnO2', 'CuFeS2', 'Fe3O4', 'ZrSiO4', 'Sb2S3', 'Mg2SiO4', 'FeTiO3', 'CaTiO3', 'CaWO4', 'Cu2CH2O5', 'CaMgC2O6', 'Al2Si2O9H4', 'Mg3Si4O12H2', 'Na3AlF6', 'Al2O3', 'SiO2', 'CaF2', 'CaCO3', 'Na2B4O7', 'KAlS2O8', 'MoS2'] },
  { id: 'atmosfera', icone: '☁️', grupo: 'Ar e atmosfera', nome: 'Cabeça nas nuvens!', texto: 'Você descobriu uma das moléculas que formam o ar e o céu do nosso planeta.',
    fs: ['N2', 'O2', 'CO2', 'O3', 'H2O', 'CH4', 'N2O'] },
  { id: 'puro', icone: '💎', grupo: 'Elementos puros', nome: 'Puro sangue!', texto: 'Você descobriu um elemento em sua forma pura: só ele, ligado a ele mesmo.',
    fs: ['H2', 'O2', 'N2', 'O3', 'Cl2', 'F2', 'I2', 'Br2', 'P4', 'S8'] },
  { id: 'combustivel', icone: '🚗', grupo: 'Combustíveis e hidrocarbonetos', nome: 'Pé na tábua!', texto: 'Você descobriu um hidrocarboneto, primo da gasolina, do gás de cozinha e do petróleo.',
    fs: ['CH4', 'C3H8', 'C4H10', 'C8H18', 'C2H2', 'C6H12N4', 'C2H6', 'C5H12', 'C6H14', 'C7H16', 'C10H22', 'C6H12', 'C5H10', 'C7H8', 'C8H10', 'H2'] },
  { id: 'anel', icone: '💍', grupo: 'Aromáticos (anel de benzeno)', nome: 'Senhor dos anéis!', texto: 'Você descobriu uma molécula com um anel de seis carbonos, primo do famoso benzeno.',
    fs: ['C6H6', 'C7H8', 'C8H10', 'C8H8', 'C10H8', 'C14H10', 'C20H12', 'C6H6O', 'C6H7N', 'C5H5N', 'C6H4Cl2', 'C6H6O2', 'C7H6O', 'C7H8O', 'C7H6O2', 'C12H10N2'] },
  { id: 'plastico', icone: '🧸', grupo: 'Plásticos e borrachas', nome: 'Fábrica de plástico!', texto: 'Você descobriu uma molécula que vira plástico, borracha ou tecido sintético.',
    fs: ['C2F4', 'C2H3Cl', 'C8H8', 'C4H6', 'C5H8', 'C6H11NO', 'C5H8O2', 'C8H6O4', 'C15H16O2', 'C3H3N', 'C4H5Cl', 'C3H6N6', 'C2H6O2', 'C3H6', 'C2H4', 'C6H10O4'] },
  { id: 'limpeza', icone: '🧽', grupo: 'Limpeza', nome: 'Faxina química!', texto: 'Você descobriu uma substância de limpeza. Sua casa nunca esteve tão brilhante.',
    fs: ['NaClO', 'C12H25NaO4S', 'C18H29NaO3S', 'C12H23NaO2', 'C3Cl3N3O3', 'C12H7Cl3O2', 'NaBO3', 'C10H16N2O8', 'NH2Cl', 'NaOH', 'NH3', 'H2O2', 'NH5O', 'CaCl2O2', 'C6H4Cl2'] },
  { id: 'pigmento', icone: '🎨', grupo: 'Pigmentos e corantes', nome: 'Paleta de pintor!', texto: 'Você descobriu um pigmento ou corante. O mundo ficou mais colorido.',
    fs: ['C16H10N2O2', 'C16H8Br2N2O2', 'C21H20O6', 'TiO2', 'CoAl2O4', 'C14H8O4', 'C20H12O5', 'C16H18ClN3S', 'PbCrO4', 'Pb3O4', 'Cr2O3', 'CdSe', 'CdS', 'BiOCl', 'C12H10N2', 'C6H8N2', 'Fe2O3'] },
  { id: 'tecnologia', icone: '💻', grupo: 'Tecnologia', nome: 'Nerd de tecnologia!', texto: 'Você descobriu um material que mora dentro de celulares, telas, chips ou baterias.',
    fs: ['YBa2Cu3O7', 'SrAl2O4', 'GaAs', 'GaN', 'CdTe', 'LiCoO2', 'LiFePO4', 'In2O3', 'HfO2', 'BaTiO3', 'Bi2Te3', 'SiC', 'Nd2O3', 'SiH4', 'NF3', 'GeO2', 'Ta2O5', 'Eu2O3', 'ZrO2', 'La2O3', 'CeO2', 'Li2CO3'] },
  { id: 'frio', icone: '❄️', grupo: 'Gases de refrigeração', nome: 'Brrr, que frio!', texto: 'Você descobriu um gás de geladeira e ar-condicionado.',
    fs: ['CCl2F2', 'CHClF2', 'C2H2F4', 'CF4'] },
  { id: 'alcool', icone: '🧴', grupo: 'Álcoois', nome: 'Álcool em gel!', texto: 'Você descobriu um álcool. Não, nem todos são de beber.',
    fs: ['C2H6O', 'CH4O', 'C3H8O', 'C3H8O3', 'C3H8O2', 'C7H8O', 'C6H14O6', 'C5H12O5', 'C4H10O4'] },
  { id: 'solvente', icone: '🫗', grupo: 'Solventes', nome: 'Dissolve tudo!', texto: 'Você descobriu um solvente, especialista em dissolver o que a água não consegue.',
    fs: ['C3H6O', 'C4H8O2', 'CH2Cl2', 'C2Cl4', 'C4H8O', 'C2H6OS', 'CH3Cl', 'C2H5Cl', 'C5H4O2', 'C4H10O', 'C6H14', 'C7H8', 'CCl4'] },
  { id: 'agricultura', icone: '🌱', grupo: 'Agricultura', nome: 'Mão verde!', texto: 'Você descobriu uma substância da agricultura, que ajuda (ou controla) o que cresce na plantação.',
    fs: ['CH4N2O', 'NH3', 'KNO3', 'NH4NO3', 'CaH4P2O8', 'NH6PO4', 'N2H8SO4', 'CaN2O6', 'KCl', 'C3H8NO5P', 'NH5CO3', 'C14H9Cl5'] },
  { id: 'cosmetico', icone: '🧖', grupo: 'Cosméticos', nome: 'Dia de spa!', texto: 'Você descobriu um ingrediente de cremes, xampus, esmaltes e maquiagem.',
    fs: ['C3H6O', 'C4H6N4O3', 'C8H24O4Si4', 'C6H6O2', 'C2H4O3', 'C12H25NaO4S', 'BiOCl', 'TiO2', 'ZnO', 'C3H8O3', 'C6H8N2'] },
  { id: 'cozinha', icone: '👩‍🍳', grupo: 'Cozinha', nome: 'Chef de cozinha!', texto: 'Você descobriu algo que está na sua comida, como tempero, conservante ou nutriente.',
    fs: ['NaCl', 'NaHCO3', 'C5H8NNaO4', 'C2H4O2', 'C6H8O7', 'C3H6O3', 'C4H6O5', 'C4H6O6', 'C4H5KO6', 'C6H8O2', 'C7H6O2', 'K2S2O5', 'C12H24O2', 'C18H30O2', 'C20H30O2', 'C15H10O7', 'C2H3NaO2', 'C15H24O', 'CH2O3', 'C3H6O2', 'C14H12O3'] },
  // Regras pelo nome: pegam todo o catálogo, inclusive quem já está em outro grupo.
  { id: 'acido-gas', icone: '💨', grupo: 'Gases ácidos', nome: 'Ácido escondido!', texto: 'Você descobriu um gás que, dissolvido na água, vira um ácido forte.', re: / de hidrogênio$/ },
  { id: 'acido', icone: '⚗️', grupo: 'Ácidos', nome: 'Azedou!', texto: 'Você descobriu um ácido. Ele adora doar prótons por aí. Óculos de proteção, por favor!', re: /^Ácido / },
  { id: 'base', icone: '🫧', grupo: 'Bases', nome: 'Escorregadio!', texto: 'Você descobriu uma base, o oposto de um ácido. Junte os dois e eles se neutralizam.', re: /^Hidróxido/ },
  { id: 'duro', icone: '🛡️', grupo: 'Materiais superduros', nome: 'Duro na queda!', texto: 'Você descobriu um dos materiais mais duros que existem. Corta até aço.', re: /^(Carbeto|Nitreto|Boreto)/ },
  { id: 'oxido', icone: '🔩', grupo: 'Óxidos', nome: 'Oxidou!', texto: 'Você descobriu um óxido: o oxigênio se juntou a mais alguém. É assim que nasce a ferrugem.', re: /^(Óxido|Dióxido|Trióxido|Tetróxido|Pentóxido|Octóxido|Superóxido|Monóxido)/ },
  { id: 'sal', icone: '🧂', grupo: 'Sais', nome: 'Pitada de sal!', texto: 'Você descobriu um sal: um metal e um não metal de mãos dadas por atração elétrica.',
    re: /^(Cloreto|Brometo|Iodeto|Fluoreto|Sulfato|Nitrato|Nitrito|Carbonato|Bicarbonato|Fosfato|Clorato|Bromato|Iodato|Cromato|Dicromato|Permanganato|Silicato|Selenito|Tiossulfato|Hipoclorito|Acetato|Oxalato|Perclorato|Aluminato|Titanato|Monofluorfosfato|Sulfeto|Seleneto|Telureto|Arseneto|Tiocianato|Metabissulfito|Perborato|Azida|Cianeto)(?!.* de hidrogênio$)(?! de (etila|benzila|isoamila|octila|metila))/ },
];

const GENERICAS = [
  ['Mandou bem!', 'Você descobriu uma substância novinha para a sua coleção.'],
  ['Eureka!', 'Arquimedes gritou isso na banheira. Você pode gritar agora.'],
  ['Cientista nato!', 'Mais uma substância descoberta. Os átomos estão te obedecendo.'],
  ['Que combinação!', 'Você juntou os átomos certos e criou algo novo.'],
];

// ---------------------------------------------------------------- partículas
const EXCLUSIVAS_SUB = [
  ['Próton', '❤️', 'O coração do átomo!', 'Você descobriu o próton. Sem ele, nenhum elemento da tabela periódica existiria.'],
  ['Nêutron', '🕊️', 'O pacificador!', 'Você descobriu o nêutron, que segura os prótons juntos no núcleo sem brigar.'],
  ['Gravidade', '🍎', 'Tudo que sobe…', 'Você descobriu a gravidade. Newton e a maçã mandaram um oi.'],
  ['Campo de Higgs', '🙏', 'Partícula de Deus!', 'Você descobriu o campo de Higgs, que dá massa às partículas.'],
  ['Aniquilação', '💫', 'Puf!', 'Matéria encontrou antimatéria e as duas viraram pura luz.'],
  ['Átomo de hidrogênio', '🥇', 'O primeiro de todos!', 'Você montou o átomo mais simples e mais comum do universo.'],
  ['Anti-hidrogênio', '🔄', 'Mundo invertido!', 'Você montou um átomo de antimatéria. Não deixe encostar em nada!'],
  ['Plasma de quarks e glúons', '🍲', 'Sopa do Big Bang!', 'Você recriou o estado da matéria nos primeiros instantes do universo.'],
  ['Pentaquark', '🖐️', 'Cinco é demais!', 'Você descobriu o pentaquark, que os físicos só confirmaram em 2015.'],
];
const GRUPOS_SUB = [
  { cat: 'barion', icone: '🔺', grupo: 'Bárions', nome: 'Trio inseparável!', texto: 'Você descobriu um bárion: três quarks presos pela força forte.' },
  { cat: 'meson', icone: '👯', grupo: 'Mésons', nome: 'Dupla dinâmica!', texto: 'Você descobriu um méson: um quark e um antiquark dançando juntos.' },
  { cat: 'exotico', icone: '👽', grupo: 'Hádrons exóticos', nome: 'Coisa de outro mundo!', texto: 'Você descobriu um hádron exótico, que quase ninguém acreditava existir.' },
  { cat: 'atomo', icone: '⚛️', grupo: 'Núcleos e átomos', nome: 'Montador de átomos!', texto: 'Você juntou partículas e montou um núcleo ou um átomo inteiro.' },
  { cat: 'forca', icone: '🌀', grupo: 'Forças fundamentais', nome: 'Que a força esteja com você!', texto: 'Você descobriu uma das forças que comandam o universo.' },
  { cat: 'processo', icone: '📸', grupo: 'Processos', nome: 'Flagrante no acelerador!', texto: 'Você reproduziu um processo que os físicos observam em grandes aceleradores.' },
];

// ---------------------------------------------------------------- níveis
export const NIVEIS = {
  exclusiva: { nome: 'Exclusiva', cor: 'oklch(0.78 0.15 320)' },
  bronze: { nome: 'Bronze', cor: 'oklch(0.72 0.11 55)' },
  prata: { nome: 'Prata', cor: 'oklch(0.86 0.02 250)' },
  ouro: { nome: 'Ouro', cor: 'oklch(0.86 0.15 85)' },
  platina: { nome: 'Platina', cor: 'oklch(0.88 0.09 190)' },
};
/** Quantas descobertas cada nível pede: Bronze já na primeira, o último com o grupo completo. */
function metasDe(n) {
  if (n === 1) return [['exclusiva', 1]];
  if (n <= 3) return [['bronze', 1], ['ouro', n]];
  if (n <= 10) return [['bronze', 1], ['prata', Math.ceil(n / 2)], ['ouro', n]];
  return [['bronze', 1], ['prata', Math.ceil(n / 4)], ['ouro', Math.ceil(n / 2)], ['platina', n]];
}

// ---------------------------------------------------------------- montagem
const NOMES = new Map(substances.map(s => [s.f, s.name]));
const monta = (m, membros, modo) => ({ ...m, modo, membros, exclusiva: membros.length === 1, metas: metasDe(membros.length) });

/** Todas as medalhas, na ordem da tela de medalhas. */
export const MEDALHAS = [
  ...GRUPOS.map(g => monta(g, g.fs || substances.filter(s => g.re.test(s.name)).map(s => s.f), 'mol')),
  ...EXCLUSIVAS.map(([f, icone, nome, texto]) => monta({ id: 'x-' + f, icone, nome, texto, grupo: NOMES.get(f) }, [f], 'mol')),
  ...GRUPOS_SUB.map(g => monta({ ...g, id: 'sub-' + g.cat }, receitas.filter(r => r.cat === g.cat).map(r => r.id), 'sub')),
  ...EXCLUSIVAS_SUB.map(([n, icone, nome, texto]) => monta({ id: 'xs-' + n, icone, nome, texto, grupo: n }, [receitas.find(r => r.name === n).id], 'sub')),
];
export const MEDALHA = new Map(MEDALHAS.map(m => [m.id, m]));

const DE = new Map();
for (const m of MEDALHAS) for (const k of m.membros) { const c = m.modo + ':' + k; DE.set(c, [...(DE.get(c) || []), m]); }
/** Medalhas de uma substância (modo 'mol', chave = fórmula) ou partícula ('sub', chave = id): a exclusiva primeiro. */
export const medalhasDe = (modo, chave) => (DE.get(modo + ':' + chave) || []).slice().sort((a, b) => b.exclusiva - a.exclusiva);

/** Progresso de uma medalha: quantas já foram descobertas, nível atual e o próximo. */
export function progresso(m, descobertas) {
  const tem = m.membros.filter(k => descobertas.has(k)).length;
  let i = -1; m.metas.forEach(([, q], j) => { if (tem >= q) i = j; });
  const atual = i >= 0 ? m.metas[i][0] : null, prox = m.metas[i + 1] || null;
  return { tem, total: m.membros.length, nivel: atual, prox: prox && { nivel: prox[0], faltam: prox[1] - tem }, max: i === m.metas.length - 1 };
}

// A escolha entre frases genéricas é fixa para cada descoberta (não muda ao reabrir).
const escolher = (lista, chave) => lista[[...chave].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7) % lista.length];

/** Título e frase da tela "Uau!": os da medalha principal da descoberta. */
export function fraseSubstancia(s) {
  const m = medalhasDe('mol', s.f)[0];
  if (m) return { titulo: m.nome, texto: m.texto };
  const [titulo, texto] = escolher(GENERICAS, s.f);
  return { titulo, texto };
}
export function fraseParticula(r) {
  const m = medalhasDe('sub', r.id)[0];
  return m ? { titulo: m.nome, texto: m.texto } : { titulo: GENERICAS[0][0], texto: GENERICAS[0][1] };
}
