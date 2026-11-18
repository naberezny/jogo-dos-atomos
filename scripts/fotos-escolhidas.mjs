// Fotos de cada substância (arquivos do Commons, sem "File:") com a legenda mostrada no jogo,
// escolhidas à mão em folhas de comparação. A primeira é a principal (capa, coleção, revelação):
// a própria substância ou onde ela é encontrada/usada (água → mar, cloreto de vinila → cano de PVC).
// As demais aparecem na ficha da substância. null = nenhuma foto boa: o jogo mostra o modelo 3D.
export const FOTOS = {
  H2O: [
    ["Waves_of_Luputhana_11.jpg", "Ondas no mar", "Cerca de 97% de toda a água da Terra está nos oceanos, salgada. Ela cobre perto de 71% da superfície do planeta."],
    ["Phu_Sang_Waterfall_01.jpg", "Cachoeira", "A água doce dos rios e cachoeiras é menos de 3% do total, e a maior parte dela está congelada nas geleiras."],
    ["Water_drop_001.jpg", "Gota caindo na água", "A tensão superficial faz a gota ficar redonda: as moléculas de água se puxam umas às outras por ligações de hidrogênio."],
  ],
  O2: [
    ["Liquid_oxygen_in_a_beaker_(cropped_and_retouched).jpg", "Oxigênio líquido (azul-claro)", "Resfriado abaixo de −183 °C, o oxigênio vira um líquido azul-claro. Ele é atraído por ímãs, porque é paramagnético."],
    ["Plastic_oxygen_mask_on_an_ER_patient.jpg", "Máscara de oxigênio no hospital", "O ar tem cerca de 21% de oxigênio; pacientes com falta de ar recebem O₂ mais concentrado pela máscara."],
    ["10ltr_oxygen_cylinder.png", "Cilindro de oxigênio", "Em hospitais e na solda, o oxigênio fica guardado sob alta pressão em cilindros de aço."],
  ],
  CO2: [
    ["Dry_ice_in_cup.jpg", "Gelo-seco (CO₂ sólido) soltando névoa", "A −78 °C o gás carbônico vira gelo-seco, que passa direto de sólido para gás (sublimação) sem derreter."],
    ["Sparkling_(4291030959).jpg", "Bolhas de gás carbônico em bebida", "Refrigerantes e águas com gás têm CO₂ dissolvido sob pressão; ao abrir a garrafa, ele escapa em bolhas."],
    ["Dry_Ice_1_(cropped).jpg", "Bloco de gelo-seco", "O gelo-seco é usado para transportar alimentos e vacinas congelados, porque não deixa água ao sumir."],
  ],
  H2: [
    ["Space_Shuttle_Columbia_launching.jpg", "Ônibus espacial: o combustível era hidrogênio líquido", "O tanque laranja do ônibus espacial levava hidrogênio e oxigênio líquidos; ao reagirem, eles formavam vapor de água."],
    ["Toyota_Mirai_(JPD20)_IMG_5303.jpg", "Carro movido a hidrogênio", "No carro a hidrogênio, uma célula a combustível junta H₂ e O₂ do ar para gerar eletricidade; pelo escapamento sai só água."],
    ["Hydrogen_discharge_tube.jpg", "Tubo com hidrogênio brilhando", "Com corrente elétrica, o hidrogênio brilha em rosa-violeta: são as linhas de emissão do átomo de hidrogênio."],
  ],
  N2: [
    ["2007TaipeiITMonth_IntelOCLiveTest_Overclocking-6.jpg", "Nitrogênio líquido", "O nitrogênio forma 78% do ar. Abaixo de −196 °C ele fica líquido e ferve na hora em contato com o ambiente."],
    ["Nitrogen_ice_cream_0020.jpg", "Sorvete feito com nitrogênio líquido", "O nitrogênio líquido congela o creme tão rápido que os cristais de gelo ficam minúsculos e o sorvete sai bem cremoso."],
    ["Cryogenic_Liquid_Nitrogen_Tank.jpg", "Tanque de nitrogênio líquido", "Em laboratórios e hospitais, o nitrogênio líquido conserva amostras, sêmen e embriões em tanques isolados."],
  ],
  O3: [
    ["NASA_and_NOAA_Announce_Ozone_Hole_is_a_Double_Record_Breaker.png", "Buraco na camada de ozônio sobre a Antártida", "O ozônio da estratosfera filtra boa parte da radiação ultravioleta do Sol. Gases CFC abriram um buraco nessa camada sobre a Antártida."],
  ],
  NaCl: [
    ["Piles_of_Salt_Salar_de_Uyuni_Bolivia_Luca_Galuzzi_2006_a.jpg", "Montes de sal no Salar de Uyuni, Bolívia", "O Salar de Uyuni é o maior deserto de sal do mundo: o sal de cozinha (cloreto de sódio) sobrou de lagos antigos que secaram."],
    ["Salinas_de_Maras,_Peru-20Sept2013.jpg", "Salinas de Maras, Peru", "Nas salinas de Maras, a água salgada de uma fonte evapora em tanques e deixa o cloreto de sódio para trás."],
    ["Rock_salt_(halitite)_(Billianwala_Salt_Member,_Salt_Range_Formation,_Ediacaran_to_Lower_Cambrian;_Khewra_Salt_Mine,_Salt_Range,_Pakistan)_14.jpg", "Cristal de halita (sal-gema)", "Na halita, os íons de sódio e cloreto se arrumam em cubos; por isso o cristal tem faces retas e ângulos retos."],
    ["Salt_Farmers_-_Pak_Thale-edit1.jpg", "Colheita de sal", "Nas salinas do litoral, a água do mar evapora ao sol e o sal é raspado e amontoado."],
  ],
  KCl: [
    ["Sylvin_(aka).jpg", "Silvita, o mineral do cloreto de potássio", "A silvita é o cloreto de potássio da natureza. Ela é minerada sobretudo para fazer adubo de potássio."],
    ["Potassium_chloride.jpg", "Cloreto de potássio puro", "O cloreto de potássio parece sal de cozinha e é usado como substituto do sal para quem precisa comer menos sódio."],
  ],
  CH4: [
    ["Gas_stove_blue_flames.jpg", "Chama de fogão a gás natural", "O gás natural do fogão é quase todo metano. A chama azul indica que ele está queimando por completo."],
    ["Frozen_Methane_Bubbles_(11927906233).jpg", "Bolhas de metano presas no gelo", "Em lagos congelados, bolhas de metano liberadas pela matéria orgânica do fundo ficam presas no gelo."],
    ["Cow_on_pasture,_Ehrenbach.jpg", "Vacas liberam metano na digestão", "Micróbios no estômago dos bois e vacas produzem metano, que sai sobretudo pelo arroto; ele é um gás de efeito estufa."],
  ],
  C3H8: [
    ["Propane_tank_20lb.jpg", "Botijão de propano", "O propano fica líquido dentro do botijão por causa da pressão e vira gás ao sair pela válvula."],
    ["Hamburgers_grilling_outdoors_over_propane.jpg", "Churrasqueira a gás", "Churrasqueiras a gás queimam propano, que libera bastante calor e quase não faz fumaça."],
    ["Propane_cylinders_type_2012_and_2000_in_Tuntorp.jpg", "Botijões de gás", "O gás de cozinha (GLP) é uma mistura de propano e butano, guardada em botijões de aço."],
  ],
  NH3: [
    ["Fertilizer_applied_to_corn_field.jpg", "Amônia aplicada como adubo na lavoura", "Quase toda a amônia produzida no mundo vira adubo: o nitrogênio dela ajuda as plantas a crescer."],
    ["Liquid_ammonia_bottle.jpg", "Frasco de amônia", "A amônia tem cheiro forte e irritante. Dissolvida em água, ela entra em produtos de limpeza."],
  ],
  H2O2: [
    ["Elephant_Toothpaste_Denver_JDS_Labs.jpg", "Experimento da “pasta de dente de elefante”", "Com um catalisador, a água oxigenada se decompõe muito rápido em água e oxigênio, que infla o sabão em espuma."],
    ["Hydrogen_Peroxide_Bottle.jpg", "Água oxigenada", "A água oxigenada da farmácia tem só cerca de 3% de H₂O₂; ao tocar um machucado, ela faz espuma ao liberar oxigênio."],
    ["Pheropsophus_verticalis_01_Pengo.jpg", "Besouro-bombardeiro, que usa H₂O₂ para se defender", "O besouro-bombardeiro mistura água oxigenada e outras substâncias no abdômen e solta um jato quente para afastar predadores."],
  ],
  CO: [
    ["Automobile_exhaust_gas.jpg", "Fumaça do escapamento de carros", "Quando a queima não tem oxigênio suficiente, sai monóxido de carbono, um gás sem cor e sem cheiro. Os catalisadores dos carros transformam boa parte dele em CO₂."],
    ["FA370_Carbon_monoxide_detector,_The_Hague_(2023)_02.jpg", "Detector de monóxido de carbono", "Como não dá para sentir o monóxido de carbono, casas com aquecedor ou fogão a gás usam detectores que apitam quando ele se acumula."],
  ],
  HCl: [
    ["Hydrochloric_acid_05.jpg", "Ácido clorídrico em frasco de laboratório", "O cloreto de hidrogênio dissolvido em água é o ácido clorídrico, usado para limpar metais e pisos (ácido muriático). O suco do estômago também contém esse ácido."],
  ],
  H2SO4: [
    ["Batterie_TUNDRA_EFB.jpg", "Bateria de carro: o líquido dentro é ácido sulfúrico", "A bateria de chumbo do carro tem ácido sulfúrico diluído; a reação dele com as placas de chumbo gera a corrente elétrica."],
    ["Sulphuric_acid_on_a_piece_of_towel.JPG", "Ácido sulfúrico carbonizando açúcar", "O ácido sulfúrico concentrado arranca a água do açúcar e de tecidos, deixando para trás carbono preto."],
    ["Rio_tinto_river_CarolStoker_NASA_Ames_Research_Center.jpg", "Rio Tinto, Espanha, ácido por causa de minérios de enxofre", "A água do Rio Tinto é vermelha e muito ácida porque minérios de enxofre e ferro se dissolvem nela e formam ácido sulfúrico."],
  ],
  NaOH: [
    ["SodiumHydroxide.jpg", "Soda cáustica em pastilhas", "A soda cáustica é uma base forte, usada para desentupir canos e fabricar papel e sabão. Ela queima a pele: só com luvas."],
    ["Aleppo_soap_01.jpg", "Sabão feito com soda cáustica", "No sabão, a soda cáustica reage com óleos e gorduras (saponificação). O sabão de Alepo é feito assim com azeite há séculos."],
  ],
  NaHCO3: [
    ["Cupcake2020.jpg", "Bolos crescem com o gás do bicarbonato", "No fermento químico, o bicarbonato solta gás carbônico com o calor e os ingredientes ácidos; as bolhas fazem a massa crescer."],
    ["Hydrogenuhličitan_sodný.jpg", "Bicarbonato de sódio em pó", "O bicarbonato é um pó branco levemente básico. Ele neutraliza ácidos e por isso alivia a azia."],
    ["Volcano_science_project_(336496373).jpg", "“Vulcão” de bicarbonato e vinagre", "Bicarbonato com vinagre (ácido acético) libera muito gás carbônico de uma vez, e a espuma transborda como lava."],
  ],
  CaCO3: [
    ["Møns_Klint_chalk_cliffs_1.jpg", "Falésias de giz (carbonato de cálcio)", "O giz das falésias de Møns Klint, na Dinamarca, é feito de restos microscópicos de algas marinhas com casca de carbonato de cálcio."],
    ["Marble_Quarry_near_Carrera.jpg", "Pedreira de mármore em Carrara, Itália", "O mármore é calcário transformado por calor e pressão. O de Carrara foi usado por Michelangelo em suas estátuas."],
    ["Flexopecten_ponticus_2008_G1.jpg", "Conchas são feitas de carbonato de cálcio", "Moluscos tiram cálcio e carbonato da água do mar para construir suas conchas."],
    ["Silfurberg.jpg", "Calcita transparente", "A calcita é carbonato de cálcio cristalizado. Uma pedra transparente dela faz o que está atrás aparecer em dobro (birrefringência)."],
  ],
  CaO: [
    ["LimestoneKilnsTalybont.jpg", "Forno de cal", "Em fornos de cal, o calcário (CaCO₃) é aquecido acima de 800 °C, solta gás carbônico e vira cal virgem."],
    ["Calcium_oxide_powder.JPG", "Cal virgem em pó", "A cal virgem reage com água esquentando muito e vira cal hidratada, usada em argamassa, pintura e correção de solo ácido."],
  ],
  SiO2: [
    ["Quartz_Brésil.jpg", "Cristais de quartzo", "O quartzo é dióxido de silício cristalizado e um dos minerais mais comuns da crosta terrestre."],
    ["Morocco_Africa_Flickr_Rosino_December_2005_84514010.jpg", "Duna de areia", "A maior parte da areia é feita de grãos de quartzo. Derretida, a areia vira vidro."],
    ["Améthyste,_quartz_300-3-7640.JPG", "Ametista, uma variedade de quartzo", "A ametista é quartzo roxo; a cor vem de pequenas quantidades de ferro e da radiação natural das rochas."],
  ],
  Fe2O3: [
    ["RustyChainEdit1.jpg", "Ferrugem em uma corrente", "Ferro exposto ao ar úmido reage com o oxigênio e a água e forma ferrugem, que é principalmente óxido de ferro(III) hidratado."],
    ["Big_rusty_boat_in_Moynaq.JPG", "Navio enferrujado", "A água salgada acelera a corrosão; navios abandonados enferrujam rápido."],
    ["Rust_on_iron.jpg", "Superfície coberta de ferrugem", "A ferrugem é porosa e se solta, deixando o ferro de baixo exposto, por isso o metal vai sendo consumido."],
  ],
  NaClO: [
    ["Clorox_Bleach_products.jpg", "Água sanitária", "A água sanitária é hipoclorito de sódio diluído em água (cerca de 2 a 2,5% no Brasil). Ela desinfeta e tira manchas."],
    ["Swimming_Pool_in_a_hotel_in_Tamil_Nadu_03.jpg", "Piscina tratada com cloro", "O cloro das piscinas mata bactérias e algas. O hipoclorito é uma das formas mais usadas para isso."],
  ],
  C2H6O: [
    ["Ethanol_fuel_pump_Brazil.jpg", "Bomba de etanol no posto", "No Brasil, o etanol da cana-de-açúcar é vendido puro nos postos e também é misturado na gasolina."],
    ["Port_wine.jpg", "Bebidas alcoólicas contêm etanol", "O vinho, a cerveja e outras bebidas têm etanol produzido por leveduras que fermentam o açúcar."],
    ["Ethanol_burning_flame.png", "Chama de álcool", "O etanol queima com uma chama azulada, quase invisível à luz do dia, e solta gás carbônico e água."],
  ],
  C2H4O2: [
    ["Eguilles_20110828_14.jpg", "Vinagres", "O vinagre é uma solução de ácido acético em água (cerca de 4 a 8%), feita por bactérias que transformam o álcool."],
    ["Raisinvinegar.jpg", "Vinagre de arroz", "Vinagres de arroz, uva ou maçã têm o mesmo ácido acético; muda o sabor que vem da matéria-prima."],
  ],
  C6H12O6: [
    ["Close_up_grapes.jpg", "Uvas são ricas em glicose", "A glicose é o açúcar das uvas maduras; nelas há quase tanta glicose quanto frutose."],
    ["Runny_hunny.jpg", "Mel", "O mel é feito sobretudo de frutose e glicose. Com o tempo, a glicose cristaliza e o mel fica açucarado."],
    ["European_honey_bee_extracts_nectar.jpg", "Abelhas fazem mel com o néctar das flores", "As abelhas recolhem o néctar das flores e, com enzimas, quebram a sacarose dele em glicose e frutose."],
    ["Glucose_2.jpg", "Tabletes de glicose", "A glicose é a principal fonte de energia das células. Tabletes de glicose ajudam quem está com o açúcar do sangue baixo."],
  ],
  C8H10N4O2: [
    ["A_small_cup_of_coffee.JPG", "Xícara de café", "Uma xícara de café coado tem, em média, cerca de 100 mg de cafeína, que deixa a pessoa mais alerta."],
    ["Roasted_coffee_beans.jpg", "Grãos de café torrados", "A cafeína protege o cafeeiro: ela é amarga e tóxica para muitos insetos."],
    ["Espresso_BW_1.jpg", "Café espresso", "O espresso tem mais cafeína por mililitro que o café coado, mas, como a dose é pequena, a xícara tem menos."],
    ["No-Doz.jpg", "Comprimidos de cafeína", "A cafeína pura é um pó branco e amargo, vendido também em comprimidos estimulantes."],
  ],
  Cl2: [
    ["Chlorine_gas_in_high_concentration.jpg", "Gás cloro (amarelo-esverdeado) num balão", "O cloro é um gás amarelo-esverdeado e muito tóxico, mais pesado que o ar."],
    ["Die_chemischen_elemente_cl.jpg", "Cloro liquefeito", "Sob pressão, o gás cloro vira um líquido amarelo. É assim que ele é transportado para tratar água e fazer PVC."],
  ],
  I2: [
    ["IodoAtomico.JPG", "Vapor de iodo (violeta)", "Aquecido, o iodo sólido passa direto a vapor violeta. A palavra iodo vem do grego para \"violeta\"."],
    ["Sample_of_iodine.jpg", "Cristais de iodo", "Os cristais de iodo são escuros, com brilho quase metálico."],
    ["Iodine-triphenylphosphine_charge-transfer_complex_in_dichloromethane.jpg", "Soluções de iodo", "O iodo se dissolve em vários solventes e muda de cor conforme o solvente: violeta, marrom ou amarelo."],
  ],
  Br2: [
    ["Bromine_trifluoride.png", "Bromo, um líquido vermelho-escuro", "O bromo é um dos dois únicos elementos líquidos na temperatura ambiente (o outro é o mercúrio). Ele solta vapores tóxicos alaranjados."],
    ["Bromine_vial_in_acrylic_cube.jpg", "Ampola de bromo em acrílico", "Por ser corrosivo e evaporar fácil, o bromo de coleções é guardado em ampolas lacradas."],
  ],
  P4: [
    ["Weißer_Phosphor.JPG", "Fósforo branco (guardado sob água)", "O fósforo branco pega fogo sozinho no ar, por isso é guardado debaixo d'água. No escuro, ele brilha fraco ao reagir com o oxigênio."],
    ["Phosphor.JPG", "Fósforo vermelho, outra forma do elemento", "O fósforo vermelho é bem mais estável e não tóxico como o branco. Ele está na lixa da caixa de fósforos."],
  ],
  NO: [
    ["Port_and_lighthouse_overnight_storm_with_lightning_in_Port-la-Nouvelle.jpg", "Raios produzem óxido nítrico no ar", "O calor de um raio faz o nitrogênio e o oxigênio do ar reagirem e formarem óxido nítrico."],
    ["Lightning_striking_the_Eiffel_Tower_-_NOAA.jpg", "Raio na Torre Eiffel", "Esse nitrogênio dos raios acaba na chuva como nitratos, que adubam o solo. No corpo, o NO também é um sinal que dilata os vasos sanguíneos."],
  ],
  MgO: [
    ["Magnesium_ribbon_burning.jpg", "Magnésio queimando vira óxido de magnésio", "O magnésio queima com uma luz branca muito forte e o que sobra é um pó branco de óxido de magnésio."],
    ["Magnesium_oxide.jpg", "Óxido de magnésio em pó", "O óxido de magnésio aguenta temperaturas acima de 2.800 °C e é usado em tijolos de fornos. Também serve como antiácido."],
  ],
  ZnO: [
    ["Zinc_oxide.jpg", "Óxido de zinco em pó", "O óxido de zinco é o pó branco de pomadas contra assaduras e de protetores solares: ele bloqueia a radiação ultravioleta."],
  ],
  HF: [
    ["Etched_glass_on_a_mortuary_coach_01.jpg", "Vidro decorado com ácido fluorídrico", "O ácido fluorídrico é um dos poucos que corroem o vidro, por isso é usado para gravar desenhos nele."],
    ["Hydrogen_fluoride.JPG", "Frasco de ácido fluorídrico", "O ácido fluorídrico é guardado em frascos de plástico, nunca de vidro. Ele atravessa a pele e é muito perigoso."],
  ],
  NaF: [
    ["Toothpasteonbrush.jpg", "Creme dental com flúor", "O flúor da pasta de dente (muitas vezes fluoreto de sódio) fortalece o esmalte e ajuda a prevenir cáries."],
    ["Sodium_fluoride_tablets.jpg", "Comprimidos de fluoreto de sódio", "Em lugares sem água fluoretada, dentistas podem receitar comprimidos de fluoreto de sódio."],
    ["Sodium_fluoride.jpg", "Fluoreto de sódio em pó", "O fluoreto de sódio puro é um pó branco. Em grande quantidade ele é tóxico; nos dentes, a dose é bem pequena."],
  ],
  KI: [
    ["110404-F-AM028-036_packs_of_IOSAT_potassium_iodide_tablets.jpg", "Comprimidos de iodeto de potássio", "Comprimidos de iodeto de potássio enchem a tireoide de iodo comum, para que ela não absorva iodo radioativo após um acidente nuclear."],
    ["Iodized_salt_packet.jpg", "Sal iodado", "O sal de cozinha recebe iodo (como iodeto ou iodato de potássio) para evitar o bócio, o aumento da tireoide."],
    ["Potassium_iodide.jpg", "Iodeto de potássio em pó", "O iodeto de potássio é um sal branco que se dissolve muito bem em água."],
  ],
  AgBr: [
    ["Used_135_film_cartridges.jpg", "Filmes fotográficos usam brometo de prata", "O brometo de prata escurece com a luz. Grãos dele espalhados no filme registram a imagem antes da revelação."],
    ["Newspaper_darkroom_circa_1985_(4220296875).jpg", "Laboratório de revelação de fotos", "Na revelação, os grãos de brometo de prata que pegaram luz viram prata metálica e formam o negativo. O quarto escuro protege o filme até lá."],
    ["Kodak_Portra_160.jpg", "Rolo de filme", "Um filme colorido tem várias camadas com brometo de prata, cada uma sensível a uma cor."],
  ],
  NO2: [
    ["Nitrogen_dioxide_at_different_temperatures.jpg", "NO₂ fica mais escuro quando aquece", "O NO₂ é um gás marrom. Frio, ele se junta em pares (N₂O₄, sem cor); quente, volta a ser NO₂ e escurece."],
    ["Forbidden_City_in_smog,_from_east.jpg", "Poluição no ar da cidade", "Motores de carros e indústrias soltam NO₂, que deixa o ar marrom e ajuda a formar a névoa de poluição (smog)."],
    ["AirQualityLondon1.jpg", "Medidor de qualidade do ar", "Estações de monitoramento medem o NO₂ no ar das cidades porque ele irrita os pulmões."],
  ],
  N2O: [
    ["Whip-it's-Brand-Whip-Cream-Chargers.jpg", "Sifão de chantili usa cápsulas de óxido nitroso", "O óxido nitroso se dissolve na gordura do creme sob pressão. Ao sair do sifão, o gás se expande e deixa o chantili aerado."],
    ["N2O_Medical_Tanks.jpg", "Cilindros de óxido nitroso para uso médico", "Misturado com oxigênio, o óxido nitroso é usado por dentistas como sedativo leve. Ele é conhecido como gás hilariante."],
    ["SparkwhipNitrousChargerBack.JPG", "Cápsula de N₂O", "Cada cápsula de aço tem cerca de 8 g de óxido nitroso comprimido."],
  ],
  SO2: [
    ["001_Volcano_eruption_of_Litli-Hrútur_in_Iceland_in_2023_Photo_by_Giles_Laurent.jpg", "Vulcões liberam dióxido de enxofre", "Erupções vulcânicas soltam muito dióxido de enxofre, um gás de cheiro sufocante."],
    ["20180519_USGS_Leilani_Estates_Hawaii_Volcanic_EruptionDSC_0411_medium.jpg", "Medindo gases de um vulcão", "Cientistas medem o SO₂ dos vulcões porque um aumento pode indicar que o magma está subindo."],
    ["Acid_rain_woods1.JPG", "Floresta danificada por chuva ácida", "No ar, o dióxido de enxofre forma ácido sulfúrico, que cai na chuva ácida e danifica plantas e construções."],
  ],
  TiO2: [
    ["Silver_necklace_with_white_paint_and_a_paint_brush_by_ASQ.jpg", "Tinta branca: o pigmento é dióxido de titânio", "O dióxido de titânio é o pigmento branco mais usado no mundo: espalha muito bem a luz e cobre bem as superfícies."],
    ["Titanium(IV)_oxide.jpg", "Dióxido de titânio em pó", "O dióxido de titânio puro é um pó branco que não é tóxico. Ele também está em protetores solares."],
    ["White_oil_paint_tube.jpg", "Tinta a óleo branca", "O branco de titânio substituiu o branco de chumbo nas tintas artísticas, que era tóxico."],
  ],
  H2S: [
    ["Sulfur_Fumarole_(23998018863).jpg", "Fumarola: o cheiro de ovo podre é sulfeto de hidrogênio", "O sulfeto de hidrogênio tem cheiro de ovo podre e sai de fumarolas vulcânicas. Em grande quantidade é muito tóxico."],
    ["Yellowstone_National_Park_(WY,_USA),_Grand_Prismatic_Spring_--_2022_--_2519.jpg", "Fonte termal em Yellowstone", "Fontes termais vulcânicas como as de Yellowstone soltam H₂S, por isso o lugar tem cheiro de enxofre."],
    ["Rotten_egg.png", "Ovo cozido: o cheiro vem do H₂S", "Quando o ovo se estraga, bactérias quebram as proteínas da clara, que têm enxofre, e liberam H₂S."],
  ],
  HCN: [
    ["Apricot_and_cross_section.jpg", "Caroços de damasco contêm compostos que liberam cianeto", "Os caroços de damasco têm amigdalina, que libera cianeto de hidrogênio quando é digerida. Por isso não se deve comê-los em quantidade."],
    ["Hydrogen_cyanide.jpg", "Ampola de cianeto de hidrogênio", "O cianeto de hidrogênio é um líquido que evapora fácil e é muito tóxico: ele impede as células de usar oxigênio."],
    ["Apricot_kernel_in_bowl.jpg", "Sementes de damasco", "As sementes de damasco, pêssego e cereja têm amigdalina, uma defesa das plantas contra animais."],
  ],
  KOH: [
    ["Golden_Power_Power_Plus_AA_alkaline_batteries.jpg", "Pilhas alcalinas usam hidróxido de potássio", "Dentro das pilhas alcalinas, uma pasta de hidróxido de potássio conduz os íons entre o zinco e o dióxido de manganês."],
    ["Potassium_hydroxide.jpg", "Hidróxido de potássio em pastilhas", "O hidróxido de potássio é uma base forte. Ele é usado para fazer sabão mole e sabonete líquido."],
  ],
  CaF2: [
    ["9104_-_Milano_-_Museo_storia_naturale_-_Fluorite_-_Foto_Giovanni_Dall'Orto_22-Apr-2007.jpg", "Fluorita", "A fluorita é fluoreto de cálcio. Ela aparece em muitas cores e é a principal fonte de flúor."],
    ["3192M-fluorite1.jpg", "Fluorita verde", "A cor da fluorita vem de impurezas e defeitos no cristal. O fluoreto de cálcio puro não tem cor."],
    ["Fluorite-146260.jpg", "Fluorita brilhando sob luz ultravioleta", "A palavra fluorescência vem da fluorita, que brilha sob luz ultravioleta."],
  ],
  CaCl2: [
    ["Calcium_chloride_CaCl2.jpg", "Cloreto de cálcio", "O cloreto de cálcio puxa a umidade do ar e é usado como secante em pacotes e em antimofo."],
    ["Cacl2_storage_for_winter_road_in_japan.jpg", "Sal para derreter gelo na rua", "Espalhado nas ruas, o cloreto de cálcio derrete o gelo e funciona até em frio bem forte."],
  ],
  MgCl2: [
    ["עץ_על_אי_מלח_באמצע_ים_המלח.jpg", "Formações de sal no Mar Morto", "A água do Mar Morto tem muito cloreto de magnésio. O sal se acumula e forma esculturas brancas nas margens."],
    ["Magnesium_chloride.jpg", "Cloreto de magnésio puro", "O cloreto de magnésio é usado para fazer tofu (ele coagula o leite de soja) e para extrair o magnésio metálico."],
    ["Dead_Sea_salt_crystals.jpg", "Crostas de sal no Mar Morto", "O Mar Morto é tão salgado que o sal cristaliza nas pedras e as pessoas boiam sem esforço."],
  ],
  FeS2: [
    ["2780M-pyrite1.jpg", "Pirita, o “ouro dos tolos”", "A pirita tem brilho dourado e já enganou muita gente, por isso o apelido. Mas ela é bem mais dura e quebradiça que o ouro."],
    ["Pyrit_01.jpg", "Agregado de cristais de pirita", "A pirita é sulfeto de ferro, um mineral muito comum. Antigamente era usada para fazer ácido sulfúrico."],
    ["Pyrite_from_Ampliación_a_Victoria_Mine,_Navajún,_La_Rioja,_Spain_2.jpg", "Cubos de pirita", "Os cubos de pirita de Navajún, na Espanha, se formam naturalmente com faces quase perfeitas."],
  ],
  SO3: [
    ["Schwefeltrioxid_Ampulle.jpg", "Cristais de trióxido de enxofre", "O trióxido de enxofre reage com água de forma violenta e forma ácido sulfúrico. É a última etapa na fabricação do ácido."],
  ],
  C2H2: [
    ["Oxy-fuel_welding_MINI_DM_273.jpg", "Solda oxiacetilênica", "O acetileno queimado com oxigênio puro chega a cerca de 3.100 °C, quente o bastante para soldar e cortar aço."],
    ["Carbide_lamp_lit.jpg", "Lanterna de carbureto: queimava acetileno", "Na lanterna de carbureto, água pinga no carbeto de cálcio e solta acetileno, que queima com luz forte. Mineiros e espeleólogos as usavam."],
    ["Oxy-fuel_welding_-_flame1.jpg", "Chama de maçarico", "O cone azul e brilhante no bico do maçarico é a parte mais quente da chama."],
  ],
  CH2O: [
    ["Wet-preserved_anatomical_specimen.jpg", "Peças de museu conservadas em formol", "O formol é uma solução de formaldeído em água. Ele mata micróbios e endurece as proteínas, por isso conserva peças de museu."],
    ["Steve_O'Shea_injecting_formalin.jpg", "Formol usado para conservar peças de anatomia", "Injetado nos tecidos, o formol evita que a peça apodreça por décadas."],
  ],
  CuO: [
    ["Copper(II)_oxide_sample.jpg", "Óxido de cobre(II) em pó", "O óxido de cobre(II) é um pó preto. Ele forma a camada escura que aparece no cobre aquecido ao ar."],
  ],
  AgCl: [
    ["Silver_chloride.jpg", "Cloreto de prata", "O cloreto de prata é um pó branco que quase não se dissolve em água e escurece com a luz. Ele era usado nos primeiros papéis fotográficos."],
    ["Chlorargyrite-154273.jpg", "Clorargirita, o mineral de cloreto de prata", "A clorargirita se forma perto da superfície em minas de prata, quando a água com cloro ataca os minérios."],
  ],
  ZnS: [
    ["Glow_In_The_Dark_D20_Dice.jpg", "Dado que brilha no escuro (sulfeto de zinco)", "Com um pouco de cobre misturado, o sulfeto de zinco guarda a energia da luz e a solta devagar, brilhando verde no escuro."],
    ["Sphalerite_-_Creede,_Mineral_County,_Colorado,_USA.jpg", "Esfalerita, o mineral de sulfeto de zinco", "A esfalerita é sulfeto de zinco e o principal minério de onde se tira o zinco."],
    ["Etoile_d'Asturies,_sphalerite.jpg", "Esfalerita lapidada", "A esfalerita pura brilha mais que o diamante (dispersão maior), mas é mole demais para joias do dia a dia."],
  ],
  PbS: [
    ["Galena_Sweetwater_Minéraux_SU.jpg", "Cristais de galena", "A galena é sulfeto de chumbo e o principal minério de chumbo. Ela forma cubos pesados e brilhantes."],
    ["CatWhisker.jpg", "Detector de galena dos primeiros rádios", "Nos primeiros rádios, um fio fino tocando um cristal de galena retificava o sinal: foi um dos primeiros semicondutores usados."],
    ["Galena_-_Huallanca,_Bologesi,_Ancash,_Peru.jpg", "Galena com cristais brilhantes", "A galena é muito densa: um pedaço pesa bem mais do que parece."],
  ],
  HgS: [
    ["Cinnabar_on_Dolomite.jpg", "Cristal de cinábrio", "O cinábrio é sulfeto de mercúrio e o principal minério do mercúrio. Ele é tóxico, por isso não deve ser manuseado sem cuidado."],
    ["Vermillon_pigment.jpg", "Vermelhão, pigmento feito de cinábrio", "Moído, o cinábrio vira o vermelhão, um pigmento vermelho muito usado na pintura antiga."],
    ["Sadi,_Gulistan,_f.1_detail,_(278_x_185_mm),_mid_17th_century,_Alexander_Turnbull_Library,_MSR-37._(6215896080).jpg", "Pintura antiga com vermelhão", "Manuscritos persas, pinturas chinesas e afrescos romanos usavam vermelhão de cinábrio."],
  ],
  SnO2: [
    ["Cassiterite_-_Mt_Bischoff_mine,_Waratah,_Tasmania,_Australia.jpg", "Cassiterita, o principal minério de estanho", "A cassiterita é dióxido de estanho, a principal fonte de estanho. O estanho com cobre forma o bronze."],
    ["Cassiterite.jpg", "Cristais de cassiterita", "A cassiterita é pesada e muito resistente ao desgaste, por isso se acumula em areias de rios."],
  ],
  MnO2: [
    ["Kodak_AAA_alkaline_and_zinc_batteries.jpg", "Pilhas comuns usam dióxido de manganês", "Nas pilhas comuns e alcalinas, o dióxido de manganês é o polo positivo e recebe os elétrons vindos do zinco."],
    ["Pyrolusite_botryoidal.jpg", "Pirolusita, o mineral de MnO₂", "A pirolusita é o mineral de dióxido de manganês; às vezes ela forma desenhos que parecem plantas nas rochas."],
    ["Manganese(IV)_oxide.jpg", "Dióxido de manganês em pó", "O dióxido de manganês é um pó preto que acelera a decomposição da água oxigenada em água e oxigênio."],
  ],
  SiC: [
    ["Schleifpapier_verschiedene_Sorten.jpg", "Lixas de carbeto de silício", "O carbeto de silício é quase tão duro quanto o diamante, por isso é usado em lixas e discos de corte."],
    ["Synthetic_SiC.jpg", "Moissanita lapidada (carbeto de silício)", "A moissanita é carbeto de silício. Ela brilha mais que o diamante e é usada como pedra em joias."],
    ["Moissanite-USGS-20-1002b.jpg", "Cristais de carbeto de silício", "O carbeto de silício natural é raríssimo: foi achado primeiro em um meteorito. O usado hoje é quase todo fabricado."],
  ],
  WC: [
    ["Drill_tip_masonry.jpg", "Broca com ponta de carbeto de tungstênio", "O carbeto de tungstênio é muito duro e aguenta calor, por isso fica na ponta das brocas que furam concreto."],
    ["Tungsten_carbide_inserts.jpg", "Pastilhas de corte de carbeto de tungstênio", "Pastilhas de carbeto de tungstênio cortam aço em tornos e fresas sem perder o fio por muito tempo."],
    ["Drill_bit_2-italy.JPG", "Brocas de perfuração de rocha", "Na perfuração de rochas e poços, os dentes das brocas são de carbeto de tungstênio."],
  ],
  UO2: [
    ["UO2_Pellet.jpg", "Pastilhas de combustível nuclear", "As pastilhas de combustível nuclear são de dióxido de urânio, do tamanho de uma borracha de lápis. Cada uma libera tanta energia quanto cerca de uma tonelada de carvão."],
    ["Nuclear_Fuel_Pellets_(14492225000).jpg", "Varetas de combustível de reatores", "As pastilhas são empilhadas em tubos de metal (varetas), que são agrupados e colocados no reator."],
    ["UO2_Powder.jpg", "Dióxido de urânio em pó", "O dióxido de urânio é um pó preto. Ele é prensado e aquecido para formar as pastilhas cerâmicas."],
  ],
  PbO2: [
    ["Photo-CarBattery.jpg", "Bateria de carro (chumbo-ácido)", "Na bateria de chumbo-ácido, a placa positiva é de dióxido de chumbo. Ao descarregar, ela vira sulfato de chumbo."],
    ["Lead(IV)_oxide.JPG", "Dióxido de chumbo em pó", "O dióxido de chumbo é um pó marrom-escuro e um forte oxidante."],
    ["Plattnerite16346-5.jpg", "Plattnerita, o mineral de PbO₂", "A plattnerita é a forma natural do dióxido de chumbo e é um mineral raro."],
  ],
  CoCl2: [
    ["Blue_silica_gel.jpg", "Sílica gel com indicador de cloreto de cobalto", "A sílica gel azul tem cloreto de cobalto. Quando ela absorve umidade, fica rosa e avisa que precisa ser trocada."],
    ["6_Spot_Humidity_Indicator_Card.jpg", "Cartão indicador de umidade", "Cartões com cloreto de cobalto mudam de azul para rosa conforme a umidade e acompanham peças eletrônicas."],
    ["Cobaltous_chloride.jpg", "Cloreto de cobalto hidratado (rosa)", "Com água presa no cristal, o cloreto de cobalto fica rosa."],
    ["Cobaltous_chloride_anhydrous.jpg", "Cloreto de cobalto seco (azul)", "Sem água, o cloreto de cobalto fica azul. A troca de cor mostra se há umidade."],
  ],
  AuCl3: [
    ["Gold(III)_chloride_solution.jpg", "Cloreto de ouro em frascos", "O ouro se dissolve na água-régia (mistura de ácidos nítrico e clorídrico) e forma cloreto de ouro, uma solução amarela."],
    ["Gold(I)_chloride.jpg", "Cristais de cloreto de ouro", "O cloreto de ouro é usado para fazer nanopartículas de ouro, que deixam vidros e soluções vermelhos."],
  ],
  LiCoO2: [
    ["18650_and_21700_lithium_ion_battery_cell.jpg", "Baterias de íon-lítio", "Em muitas baterias de íon-lítio, o polo positivo é feito de óxido de lítio e cobalto. Na recarga, os íons de lítio saem dele e vão para o grafite."],
    ["Samsung_smartphone_battery,_Hillegersberg,_Rotterdam_(2022)_08.jpg", "Bateria de celular", "Baterias de celular e notebook costumam usar óxido de lítio e cobalto, que guarda muita energia num espaço pequeno."],
    ["Lithium-Ionen-Accumulator.jpg", "Bateria de íon-lítio grande", "Baterias de íon-lítio maiores juntam muitas células iguais. John Goodenough descobriu o LiCoO₂ como cátodo em 1980 e ganhou o Nobel de 2019."],
  ],
  F2: [
    ["Fluoro_liquido_a_-196°C_1.jpg", "Flúor liquefeito", "O flúor fica líquido a −188 °C, com cor amarelo-clara. Ele é o elemento mais reativo de todos."],
    ["Fluorine_(Element_-_9).jpg", "Amostra de flúor", "O flúor reage com quase tudo, até com vidro, por isso é guardado em recipientes de metais especiais."],
  ],
  HBr: [
    ["Hydrobromic_Acid_reagent.jpg", "Ácido bromídrico", "O brometo de hidrogênio dissolvido em água forma o ácido bromídrico, um ácido forte usado em laboratório e na indústria."],
  ],
  LiCl: [
    ["Flammenfärbung_Lithium_(Li).jpg", "Sais de lítio dão chama vermelha", "Sais de lítio, como o cloreto, deixam a chama vermelho-carmim. Fogos de artifício usam isso."],
    ["Lithium_chloride.jpg", "Cloreto de lítio puro", "O cloreto de lítio puxa muita umidade do ar e é usado em secadores de ar industriais."],
  ],
  LiOH: [
    ["Lithium_hydroxide.jpg", "Hidróxido de lítio", "O hidróxido de lítio é um sólido branco e uma base forte. Ele é usado para fazer graxas e baterias."],
    ["First_Air_Force,_Detachment_3_in_action_at_Cape_Canaveral_Space_Force_Station_(9903629).jpg", "Cápsulas espaciais usam hidróxido de lítio para tirar o CO₂ do ar", "O hidróxido de lítio reage com o gás carbônico que os astronautas expiram e o tira do ar da cápsula. Ele salvou a missão Apollo 13."],
  ],
  KBr: [
    ["Potassium_bromide.jpg", "Brometo de potássio", "O brometo de potássio é um sal branco. No século XIX ele foi o primeiro remédio eficaz contra convulsões e ainda é usado em cães."],
  ],
  NaNO2: [
    ["Embutidos_en_una_carniceria_del_Mercado_Municipal_de_Sao_Paulo.jpg", "Embutidos curados com nitrito de sódio", "O nitrito de sódio conserva carnes curadas: impede a bactéria do botulismo e deixa a carne rosada."],
    ["Pølse_med_potetmos.jpg", "Salsichas", "Salsichas, presuntos e linguiças ganham a cor rosa porque o nitrito reage com a mioglobina da carne."],
    ["Sodium_nitrite_crystals.jpg", "Nitrito de sódio puro", "O nitrito de sódio puro é um pó amarelado. Em grande quantidade é tóxico, por isso a lei limita quanto vai nos alimentos."],
  ],
  CaC2: [
    ["Carbide_lamp_lit.jpg", "Lanterna de carbureto", "Nas lanternas de carbureto, a água reage com o carbeto de cálcio e solta acetileno, que queima com chama clara."],
    ["Karbid_vápenatý.JPG", "Carbeto de cálcio", "O carbeto de cálcio é feito em fornos elétricos, aquecendo cal e carvão a cerca de 2.000 °C."],
    ["Cac2.jpg", "Pedra de carbureto", "Em contato com a umidade, a pedra de carbureto solta acetileno com um cheiro forte de alho, que vem de impurezas."],
  ],
  AlCl3: [
    ["2023_Dezodoranty.jpg", "Desodorantes antitranspirantes usam sais de alumínio", "Os antitranspirantes usam sais de alumínio (como o cloridrato de alumínio) que tampam por um tempo os poros que soltam o suor."],
    ["Aluminium-trichloride-hexahydrate-white-and-yellow.jpg", "Cloreto de alumínio (puro e impuro)", "O cloreto de alumínio puro é branco; o amarelado tem impurezas de ferro. Ele reage com a água do ar e solta fumos ácidos."],
  ],
  PH3: [
    ["Fumigation_Tent_Riverside_2011.jpg", "Casa coberta por lona para expurgo contra pragas", "A fosfina é um gás muito tóxico usado para matar cupins e pragas de grãos. A casa é coberta com lona para o gás não escapar."],
  ],
  ClO2: [
    ["Chlorine_dioxide_gas_and_solution.jpg", "Dióxido de cloro dissolvido em água", "O dióxido de cloro é um gás amarelo-esverdeado. Dissolvido em água, desinfeta sem formar tantos subprodutos quanto o cloro."],
    ["Waste_Water_Treatment_Plant.jpg", "Estação de tratamento de água", "Estações de tratamento usam dióxido de cloro para matar micróbios na água. Ele também branqueia a celulose do papel."],
  ],
  FeCl3: [
    ["Etched_circuit_board_after_cleaning.jpg", "Placa de circuito corroída com cloreto de ferro", "Uma solução de cloreto de ferro(III) corrói o cobre que não está protegido e deixa só as trilhas desenhadas na placa."],
    ["Circuit_board_after_manual_etching.jpg", "Placa sendo corroída na solução", "O cloreto de ferro reage com o cobre e forma cloretos de ferro(II) e de cobre, que ficam dissolvidos."],
    ["Хлорид_железа.jpg", "Cloreto de ferro(III) hidratado", "O cloreto de ferro(III) também é usado no tratamento de água para juntar a sujeira em flocos."],
  ],
  CuCl2: [
    ["CuCl2_equilibrium.JPG", "Soluções de cloreto de cobre", "O cloreto de cobre muda de cor conforme o que o rodeia: azul com muita água, verde com mais íons cloreto."],
    ["Flammenfärbung_Kupfer_(Cu)_ohne_Halogene.jpg", "Compostos de cobre deixam a chama verde-azulada", "Os compostos de cobre deixam a chama verde-azulada; fogos de artifício usam isso."],
    ["Cupric_chloride.jpg", "Cristais de cloreto de cobre", "Os cristais de cloreto de cobre hidratado são verde-azulados."],
  ],
  Cu2O: [
    ["Cuprite-66649.jpg", "Cristal de cuprita", "A cuprita é óxido de cobre(I) e forma cristais vermelho-escuros. É um minério de cobre."],
    ["CopperIoxide.jpg", "Óxido de cobre(I) em pó", "O óxido de cobre(I) é um pó vermelho usado em tintas anti-incrustantes nos cascos de navios."],
  ],
  CuFeS2: [
    ["Chalcopyrite-199453.jpg", "Calcopirita, principal minério de cobre", "A calcopirita é sulfeto de cobre e ferro, a fonte de cerca de 70% do cobre do mundo."],
    ["Pyrite-Chalcopyrite-Sphalerite-40297.jpg", "Calcopirita com cristais dourados", "A calcopirita tem um tom mais amarelo que a pirita e às vezes mancha com cores do arco-íris."],
  ],
  GaAs: [
    ["Gallium_Arsenide_(GaAs)_2\"_wafer.jpg", "Bolacha (wafer) de arseneto de gálio", "O arseneto de gálio é um semicondutor que funciona mais rápido que o silício. Ele é usado em chips de rádio de celulares."],
    ["Satellite_solar_panels.jpg", "Satélites usam células solares de arseneto de gálio", "As células solares de arseneto de gálio aproveitam mais luz que as de silício e resistem à radiação do espaço."],
  ],
  GaN: [
    ["RGB_LED_5mm.jpg", "LED azul de nitreto de gálio", "O LED azul de nitreto de gálio rendeu o Nobel de Física de 2014 e tornou possível a luz LED branca."],
    ["Laser_Pointers.jpg", "Lasers violeta e azul também usam GaN", "O laser azul-violeta de GaN é o que lê os discos Blu-ray."],
    ["1.5V_Lithium_Battery_Charger_and_Cable_Front_Picture.png", "Carregadores modernos usam chips de GaN", "Transistores de nitreto de gálio esquentam menos e deixam os carregadores menores."],
  ],
  GeO2: [
    ["SC-APC_fiber_optic_cable.jpg", "Fibra óptica: o vidro leva dióxido de germânio", "O núcleo das fibras ópticas tem dióxido de germânio misturado ao vidro. Isso faz a luz ficar presa dentro do fio."],
    ["GeO2powder.jpg", "Dióxido de germânio em pó", "O dióxido de germânio é um pó branco. Ele também é usado em lentes que deixam passar luz infravermelha."],
    ["Guiding_New_Fiber_from_Reel_Truck.jpg", "Instalação de cabos de fibra óptica", "Os cabos de fibra óptica levam dados da internet pela luz por milhares de quilômetros."],
  ],
  CdS: [
    ["Cadmiumgelb-_Pigment.JPG", "Pigmento amarelo de cádmio", "O sulfeto de cádmio forma o amarelo de cádmio, um pigmento forte usado por pintores como Monet."],
    ["Cadmium_sulfide.jpg", "Sulfeto de cádmio puro", "O sulfeto de cádmio puro é amarelo-alaranjado. Ele conduz mais eletricidade quando recebe luz e era usado em fotômetros."],
    ["Greenockite-259580.jpg", "Greenockita, o mineral de CdS", "A greenockita é a forma natural do sulfeto de cádmio e é um mineral raro."],
  ],
  CdTe: [
    ["Thin_Film_Flexible_Solar_PV_Installation_2.JPG", "Painel solar flexível de filme fino", "Os painéis solares de telureto de cádmio são de filme fino: a camada que absorve luz tem poucos micrômetros."],
    ["Thin_Film_Flexible_Solar_PV_Ken_Fields_1.JPG", "Painéis solares de telureto de cádmio", "O telureto de cádmio é a tecnologia de filme fino mais usada em usinas solares."],
    ["CdTe.jpg", "Telureto de cádmio sólido", "O telureto de cádmio é um semicondutor cinza-escuro e absorve muito bem a luz do Sol."],
  ],
  CdSe: [
    ["QD_S.jpg", "Pontos quânticos de seleneto de cádmio brilhando", "Os pontos quânticos de seleneto de cádmio são cristais de poucos nanômetros que brilham quando recebem luz ultravioleta."],
    ["CdSeqdots.jpg", "A cor muda com o tamanho dos pontos quânticos", "Quanto menor o ponto quântico, mais azul a luz que ele emite. Essa descoberta rendeu o Nobel de Química de 2023."],
    ["Cadmium_selenide_2.jpg", "Seleneto de cádmio em pó", "Em pedaço grande, o seleneto de cádmio é um sólido escuro e não tem esse brilho colorido."],
  ],
  ZrO2: [
    ["CZ_brilliant.jpg", "Zircônia cúbica lapidada", "A zircônia cúbica é dióxido de zircônio fabricado. Ela brilha quase como o diamante e custa muito menos."],
    ["Baguette_Double_Side_Checkerboard_Cut_CZ.JPG", "Zircônia lilás", "Com outros óxidos misturados, a zircônia fica colorida, como este lilás."],
    ["Cubic_Zirconia_Run_Opening.jpg", "Bloco de zircônia recém-fundido", "A zircônia derrete a cerca de 2.700 °C e é fundida dentro de uma casca de pó dela mesma."],
  ],
  MoS2: [
    ["Molybdenite_quebec2.jpg", "Molibdenita, o mineral de MoS₂", "A molibdenita é dissulfeto de molibdênio e a principal fonte de molibdênio. Ela é mole e escorregadia como o grafite."],
    ["MoS2chips.jpg", "Lâminas de molibdenita", "As camadas de MoS₂ deslizam umas sobre as outras, por isso ele é usado como lubrificante seco em motores e engrenagens."],
  ],
  AgI: [
    ["Cessna_210_Hagelflieger_Detail.jpg", "Avião que semeia nuvens com iodeto de prata", "Aviões espalham iodeto de prata nas nuvens: os cristais dele imitam o gelo e ajudam a formar gotas ou granizo menor."],
    ["AgI_sample.jpg", "Iodeto de prata em pó", "O iodeto de prata é um pó amarelo que escurece com a luz."],
  ],
  Ag2S: [
    ["Acanthite_-_Imiter_mine,_Jbel_Saghro,_Tinghir,_Drâa-Tafilalet,_Morocco.jpg", "Acantita, o mineral de sulfeto de prata", "A acantita é sulfeto de prata e um minério importante de prata."],
    ["Tarnished_silver_(Mexico)_2_(17097337970).jpg", "Cristais de acantita", "A prata escurece ao ar porque reage com compostos de enxofre e forma uma camada de sulfeto de prata."],
  ],
  SnF2: [
    ["Toothbrush,_Toothpaste,_Dental_Care_(571741).jpg", "Cremes dentais usam fluoreto de estanho", "O fluoreto de estanho dos cremes dentais protege contra cáries e reduz a sensibilidade e a inflamação da gengiva."],
    ["Zendium_toothpaste_tubes.jpg", "Cremes dentais", "O fluoreto de estanho foi um dos primeiros fluoretos usados em pasta de dente, nos anos 1950."],
  ],
  CsCl: [
    ["Tabletop_centrifuge.jpg", "Centrífuga de laboratório", "Soluções de cloreto de césio girando em ultracentrífugas separam o DNA pela densidade. Assim se provou como o DNA se copia."],
    ["Caesium_chloride.jpg", "Cloreto de césio puro", "Os cristais de cloreto de césio deram nome a um tipo de arranjo de íons, com cada íon no centro de um cubo."],
  ],
  CeO2: [
    ["Cerium(IV)_oxide.jpg", "Óxido de cério em pó", "O óxido de cério é usado para polir vidros, lentes e telas."],
    ["Glowing_gas_mantle.jpg", "Camisas de lampião levam óxido de cério", "As camisas de lampião são de óxido de tório com cerca de 1% de óxido de cério. Aquecidas, brilham com luz branca forte."],
  ],
  HgO: [
    ["HgOpowder.jpg", "Óxido de mercúrio(II) vermelho", "Em 1774, Joseph Priestley aqueceu óxido de mercúrio vermelho e obteve um gás que fazia a vela queimar mais forte: era o oxigênio."],
    ["Mercury_oxide.jpg", "Óxido de mercúrio em tubo", "Aquecido, o óxido de mercúrio se separa em mercúrio líquido e oxigênio. O vapor de mercúrio é tóxico."],
  ],
  PbO: [
    ["Cut_crystal_wine_glasses_in_the_Fakiris_series_by_German_glassworks_Knittel_5.jpg", "Cristal de chumbo: o vidro leva óxido de chumbo", "O cristal de chumbo tem pelo menos 24% de óxido de chumbo no vidro, o que o deixa mais pesado e brilhante."],
    ["PbO.jpg", "Litargírio (vermelho) e massicote (amarelo), as formas do PbO", "O óxido de chumbo(II) existe em duas formas: o litargírio, avermelhado, e o massicote, amarelo."],
    ["Oxid_olovnatý.JPG", "Óxido de chumbo em pó", "O óxido de chumbo era usado em esmaltes de cerâmica e tintas, mas é tóxico e foi sendo abandonado."],
  ],
  BiOCl: [
    ["Zoya_Nail_Polish_Erin_Sally_and_Lauren.jpg", "Esmaltes perolados usam oxicloreto de bismuto", "Os cristais de oxicloreto de bismuto são placas finas que refletem a luz e dão brilho perolado a esmaltes."],
    ["Nail_Polish.jpg", "Batons com brilho perolado", "Maquiagens com brilho perolado ou nacarado costumam ter oxicloreto de bismuto."],
  ],
  ThO2: [
    ["Glowing_gas_mantle.jpg", "Camisa de lampião (feita com dióxido de tório)", "A camisa do lampião é feita de dióxido de tório com um pouco de óxido de cério; aquecida, ela brilha com luz branca forte."],
    ["Yellowing_of_thorium_lenses.jpg", "Lentes antigas com tório no vidro ficam amareladas", "Algumas lentes antigas tinham dióxido de tório no vidro para focar melhor. A radiação do tório amarela o vidro com o tempo."],
    ["Petromax_gas_mantle_extra_close-up.jpg", "Lampião aceso", "O dióxido de tório é fracamente radioativo e derrete a cerca de 3.300 °C, um dos óxidos mais resistentes ao calor."],
  ],
  PuO2: [
    ["Plutonium_pellet.jpg", "Pastilha de dióxido de plutônio brilhando de calor", "O plutônio-238 esquenta tanto ao decair que uma pastilha de dióxido dele brilha vermelha com o próprio calor."],
    ["Radioisotope_Thermoelectric_Generator_for_Lunar_Surface_Operations_(rtg-beautyshot).png", "O jipe lunar da Apollo: os experimentos usavam energia de plutônio", "Geradores com dióxido de plutônio transformam esse calor em eletricidade. Eles alimentaram os experimentos das Apollo na Lua e sondas como as Voyager."],
  ],
  AmO2: [
    ["Smoke_detector_(1).JPG", "Detectores de fumaça usam amerício", "Detectores de fumaça iônicos têm uma pequena quantidade de dióxido de amerício-241. Ele torna o ar condutor; a fumaça atrapalha a corrente e dispara o alarme."],
    ["Smoke_sensor_-_detector_chamber_open_displaying_transmitter_and_detector.jpg", "Interior de um detector de fumaça", "Dentro da câmara do detector há só uma fração de micrograma de amerício, presa em uma folha de metal."],
  ],
  RaCl2: [
    ["Radium_Dial_UV.jpg", "Relógio antigo com ponteiros de tinta de rádio", "Até os anos 1960, ponteiros de relógio eram pintados com tinta de rádio, que brilhava no escuro. As pintoras que lambiam os pincéis adoeceram."],
    ["Radium_(Element_-_88)_2.jpg", "Ponteiros pintados com rádio", "Na tinta, a radiação do rádio fazia o sulfeto de zinco brilhar. O rádio continua radioativo por séculos, mas o brilho acaba antes."],
  ],
  XeF2: [
    ["XeF2_kristalle.png", "Cristais de difluoreto de xenônio", "Gases nobres quase não reagem, mas o xenônio forma compostos com o flúor. O difluoreto de xenônio é um sólido branco usado em laboratório."],
  ],
  BN: [
    ["BNcrucible.jpg", "Cadinho de nitreto de boro", "O nitreto de boro aguenta altas temperaturas e não reage com metais derretidos, por isso é usado em cadinhos."],
    ["Hbncrystals.jpg", "Cristal de nitreto de boro hexagonal", "O nitreto de boro hexagonal tem camadas como o grafite, mas é branco e isolante. Por isso é chamado de \"grafite branco\"."],
  ],
  NaN3: [
    ["Peugeot_306_airbags_deployed.jpg", "Airbag: a azida de sódio gera o gás que o enche", "Numa batida, a azida de sódio do airbag se decompõe em milésimos de segundo e libera nitrogênio, que enche a bolsa."],
    ["Crash-test-with-airbag-and-safty-belt.jpg", "Teste de colisão com airbags", "O airbag enche em cerca de 30 milésimos de segundo, mais rápido que um piscar de olhos. Os carros mais novos usam outros compostos que geram gás."],
    ["Sodium_azide_01.JPG", "Azida de sódio pura", "A azida de sódio é muito tóxica e é usada também para conservar amostras de laboratório."],
  ],
  CS2: [
    ["Rayon_sample.jpg", "Tecido de viscose: o dissulfeto de carbono é usado para fabricá-lo", "Para fazer viscose, a celulose da madeira é dissolvida com a ajuda do dissulfeto de carbono e depois transformada em fios."],
    ["Carbon_disulfide_insecticide_ad,_1896_-_The_American_elevator_and_grain_trade_(IA_CAT31053470064)_(page_3_crop).jpg", "Propaganda antiga de dissulfeto de carbono", "O dissulfeto de carbono já foi vendido como inseticida para grãos. Ele pega fogo com muita facilidade e é tóxico."],
  ],
  NaCN: [
    ["Sodium_Cyanide.jpg", "Cianeto de sódio", "O cianeto de sódio é um sal branco muito tóxico. Ele é usado sobretudo na mineração de ouro."],
    ["Mount_David,_N.S.W._-_Miners_and_Gold_Mine_-_very_early_1900s.jpg", "Mina de ouro antiga: o cianeto separa o ouro do minério", "Uma solução de cianeto dissolve o ouro do minério moído. Depois, o ouro é recuperado com zinco ou carvão."],
  ],
  HClO: [
    ["Swimming_pool_at_Hotel_Terra_Barichara.jpg", "Piscinas são desinfetadas pelo ácido hipocloroso", "Quando o cloro ou o hipoclorito entram na água, formam ácido hipocloroso, que é o que de fato mata os micróbios."],
    ["Savlon_Surface_disinfectant_spray.jpg", "Desinfetantes em spray", "Alguns desinfetantes usam ácido hipocloroso diluído. Nosso sistema imune também produz essa substância para matar bactérias."],
  ],
  TiN: [
    ["Titanium_nitride_coating_90.jpg", "Broca revestida de nitreto de titânio", "O nitreto de titânio forma uma película dourada e muito dura que faz as brocas durarem mais."],
    ["TiNCoatedPunches_NanoShieldPVD_Thailand.JPG", "Peças com revestimento dourado de nitreto de titânio", "A camada de nitreto de titânio tem poucos micrômetros e também é usada em peças decorativas e implantes."],
    ["Titanium_nitride_TiN.jpg", "Nitreto de titânio em pó", "O nitreto de titânio em pó é dourado-escuro e conduz eletricidade como um metal."],
  ],
  KO2: [
    ["Potassium_superoxide_powder.png", "Superóxido de potássio", "O superóxido de potássio reage com o gás carbônico e a umidade da respiração e libera oxigênio. Ele é usado em máscaras de resgate e submarinos."],
  ],
  HI: [
    ["Oxidized_Hydriodic_Acid.jpg", "Ácido iodídrico", "O ácido iodídrico é um ácido muito forte. Com o tempo, o ar o oxida e forma iodo, que deixa a solução marrom."],
  ],
  NaI: [
    ["NaI-Tl-crystals.jpg", "Cristal detector de radiação de iodeto de sódio", "Cristais de iodeto de sódio com tálio piscam quando a radiação gama os atravessa. Esses detectores são usados em medicina e segurança."],
    ["Sodium_iodide.jpg", "Iodeto de sódio puro", "O iodeto de sódio é um sal branco usado para tratar falta de iodo."],
  ],
  MgF2: [
    ["Praktica_MTL_3_SLR_camera_with_Pentacon_50mm_f1.8_auto_multi_coating_lens.jpg", "Lentes de câmera têm camada antirreflexo de fluoreto de magnésio", "Uma película finíssima de fluoreto de magnésio diminui o reflexo nas lentes. Sem ela as fotos ficam com mais brilho e menos contraste."],
    ["Sellaite-39033.jpg", "Sellaíta, o mineral de fluoreto de magnésio", "A sellaíta é o fluoreto de magnésio da natureza e foi achada primeiro nos Alpes italianos."],
  ],
  NF3: [
    ["Apple_IIc_Flat_Panel_Display_Module.jpg", "Telas planas: o NF₃ limpa as máquinas que as fabricam", "O trifluoreto de nitrogênio limpa as câmaras onde se fabricam telas planas e chips."],
    ["Leak_Detection_Machine.jpg", "Fábrica de chips", "O NF₃ é um gás de efeito estufa milhares de vezes mais forte que o CO₂. Por isso as fábricas tentam não deixá-lo escapar."],
  ],
  Ag2O: [
    ["LR44_Button_Cell_Battery_IEC_Standard_Version.jpg", "Baterias de relógio usam óxido de prata", "As baterias de botão de óxido de prata mantêm a voltagem estável, por isso são usadas em relógios e calculadoras."],
    ["Silver_oxide_batteries.jpg", "Baterias de botão", "Cada bateria tem óxido de prata no polo positivo e zinco no negativo."],
    ["Silver_oxide.jpg", "Óxido de prata puro", "O óxido de prata é um pó marrom-escuro que se decompõe em prata e oxigênio quando aquecido."],
  ],
  HfO2: [
    ["Amdahl_5860_Computer_Air_Cooled_Logic_processor_die.jpg", "Chips modernos usam dióxido de háfnio como isolante", "Desde 2007, os processadores usam dióxido de háfnio como isolante no lugar do dióxido de silício. Isso permitiu transistores menores sem vazar corrente."],
    ["Hafnium(IV)_oxide.jpg", "Dióxido de háfnio em pó", "O dióxido de háfnio é um pó branco que resiste muito ao calor."],
    ["A80386DX-25_SX218.jpg", "Processador", "Um processador tem bilhões de transistores, e cada um precisa de uma camada isolante com poucos átomos de espessura."],
  ],
  WO3: [
    ["Tungsten_trioxide.png", "Trióxido de tungstênio em pó", "O trióxido de tungstênio é um pó amarelo. Ele é usado como pigmento e em vidros que escurecem com eletricidade."],
    ["TungstenOxideSmall.jpg", "Cristais de trióxido de tungstênio", "Nas janelas inteligentes, uma camada de óxido de tungstênio fica azul-escura quando recebe uma corrente elétrica."],
  ],
  PbI2: [
    ["Lead_(II)_iodide_precipitating_out_of_solution.JPG", "“Chuva de ouro”: cristais de iodeto de chumbo", "Na \"chuva de ouro\", soluções quentes de nitrato de chumbo e iodeto de potássio são misturadas. Ao esfriar, aparecem cristais dourados de iodeto de chumbo."],
    ["Lead_iodide.jpg", "Iodeto de chumbo em pó", "O iodeto de chumbo é um pó amarelo usado para fazer perovskitas, um material novo para células solares."],
  ],
  KrF2: [
    ["Electra_Laser_System_NRL_2013.png", "Laser de criptônio-flúor (excímero)", "O laser de excímero de criptônio-flúor emite luz ultravioleta. Lasers desse tipo são usados em pesquisas de fusão nuclear e na fabricação de chips."],
  ],
  KSCN: [
    ["Thiokyanatan_draselný.JPG", "Tiocianato de potássio", "O tiocianato de potássio é um sal branco que se dissolve muito bem em água."],
    ["Cobalt(II)-thiocyanat.jpg", "Teste de ferro: o tiocianato fica vermelho-sangue", "O tiocianato forma complexos coloridos com metais: com ferro(III) fica vermelho-sangue e com cobalto fica azul. Isso ajuda a identificá-los."],
  ],
  NH2Cl: [
    ["Water_tower_Mittweida.jpg", "Caixa d’água: a cloramina desinfeta a água da torneira", "Muitas cidades desinfetam a água com cloramina. Ela dura mais que o cloro nos canos até chegar às casas."],
    ["Filling_a_glass_with_water_in_a_kitchen_sink_closeup.jpg", "Água de torneira", "A cloramina tem menos cheiro que o cloro. Ela é tóxica para peixes, por isso a água de aquário precisa ser tratada."],
  ],
  COS: [
    ["Tavurvur_volcano_edit.jpg", "Vulcões liberam sulfeto de carbonila", "O sulfeto de carbonila é o composto de enxofre mais abundante no ar. Vulcões e oceanos são fontes naturais dele."],
    ["Fimmvorduhals_2010_03_27_dawn.jpg", "Erupção vulcânica", "O sulfeto de carbonila sobe até a estratosfera e forma partículas de sulfato que refletem um pouco da luz do Sol."],
  ],
  Na2He: [
    ["First_diamond_anvil_cell.jpg", "Bigorna de diamante: cria a pressão para formar Na₂He", "O hélio quase não reage, mas sob pressão de mais de um milhão de atmosferas, numa bigorna de diamante, ele forma Na₂He com o sódio. Isso foi publicado em 2017."],
    ["Researcher_using_diamond_anvil_cell.jpg", "Cientista com uma bigorna de diamante", "A bigorna de diamante prende a amostra entre duas pontas de diamante, que aguentam pressões como as do centro da Terra."],
  ],
  HArF: [
    ["Argon_discharge_tube_cropped.jpg", "Tubo com argônio brilhando (o HArF só existe congelado a −265 °C)", "O fluoridreto de argônio, criado em 2000 na Finlândia, foi o primeiro composto neutro de argônio. Ele só existe preso em argônio congelado, a temperaturas muito baixas."],
    ["ArTube.jpg", "Letreiro de argônio", "O argônio brilha em violeta-azulado quando uma corrente elétrica passa por ele."],
    ["Edelgase_in_Entladungsroehren.jpg", "Gases nobres em tubos de descarga", "Cada gás nobre brilha com uma cor própria no tubo de descarga, porque emite suas próprias linhas de luz."],
  ],
  RnF2: [
    ["NSA_Naples,_Italy_Radon_Detector_Collection_(9333290).jpg", "Medidor de radônio em uma casa", "O radônio é um gás radioativo que sai do solo e pode se acumular nas casas. Ele é a segunda maior causa de câncer de pulmão, depois do cigarro."],
  ],
  BeO: [
    ["Оксид_бериллия_99,9_%.jpg", "Peça de cerâmica de óxido de berílio", "O óxido de berílio isola a eletricidade, mas conduz calor quase como um metal. Por isso é usado em peças eletrônicas de alta potência."],
    ["BeO_sample.jpg", "Óxido de berílio em pó", "O pó de óxido de berílio é muito tóxico se respirado, então essas peças não podem ser lixadas."],
  ],
  ScI3: [
    ["Nizhny_Novgorod_Stadium_asv2019-05.jpg", "Estádios usam lâmpadas de iodetos metálicos com escândio", "Lâmpadas de iodetos metálicos com escândio dão uma luz branca e forte, boa para estádios e transmissões de TV."],
    ["Closeup_Metal_Halide_Lamp.jpg", "Lâmpada de iodetos metálicos", "Dentro do tubo da lâmpada, os iodetos metálicos evaporam e brilham com as cores dos seus metais."],
  ],
  RbCl: [
    ["Flammenfärbung_Rubidium_(Rb).jpg", "Sais de rubídio deixam a chama violeta", "Os sais de rubídio deixam a chama violeta-avermelhada. O nome rubídio vem do latim rubidus, \"vermelho-escuro\", pelas linhas do espectro."],
    ["Rubidium_chloride.JPG", "Frasco de cloreto de rubídio", "O cloreto de rubídio é um sal branco usado em pesquisas de biologia, por exemplo para fazer bactérias aceitarem DNA."],
  ],
  Nb3Sn: [
    ["ITER_construction_in_2018_(41809718461).jpg", "ITER: ímãs de nióbio-estanho para fusão nuclear", "O reator de fusão ITER, na França, usa ímãs de fio de nióbio-estanho. Abaixo de cerca de 18 K (−255 °C), ele conduz eletricidade sem resistência."],
    ["MRI-Philips.JPG", "Aparelho de ressonância magnética", "A ressonância magnética também usa ímãs supercondutores, em geral de nióbio-titânio; o nióbio-estanho entra nos ímãs mais fortes."],
    ["ITER_Tokamak_mockup.jpg", "Maquete do reator ITER", "No ITER, o plasma ficará preso por campos magnéticos dentro de uma câmara em forma de rosquinha (tokamak)."],
  ],
  RuO2: [
    ["898-3-R33.jpg", "Resistores com camada de dióxido de rutênio", "O dióxido de rutênio conduz eletricidade como um metal. Misturado com vidro, ele forma a camada de muitos resistores."],
    ["ГЗР-2Б_газорезистор_(датчик_влажности)_бытовых_магнитофонов_Электроника_ВМ,_Гириконд_1989_(02).jpg", "Resistor de filme espesso visto de perto", "Nesses componentes, uma pasta com dióxido de rutênio é impressa e queimada sobre uma base de cerâmica."],
    ["Ruthenium_crystal_(CVD_99.95%).jpg", "Rutênio metálico", "O rutênio é um metal duro e raro, da família da platina."],
  ],
  RhCl3: [
    ["Catalytic_converter_20230510.jpg", "Catalisador de carro: usa ródio", "O catalisador do carro usa ródio para transformar óxidos de nitrogênio em nitrogênio comum. O cloreto de ródio é um dos pontos de partida para fazer catalisadores."],
    ["RhCl3(H2O)3sample.jpg", "Cloreto de ródio em pó", "O cloreto de ródio hidratado é um pó vermelho-escuro e caro, como o próprio ródio."],
    ["Catalytic_Converter_Interior.jpg", "Interior cerâmico do catalisador", "Dentro do catalisador há uma colmeia de cerâmica coberta por uma película com ródio, platina e paládio."],
  ],
  PdCl2: [
    ["Paladio_(II)_kloruroa.png", "Cloreto de paládio", "O cloreto de paládio é usado para fazer catalisadores. Ele também detecta monóxido de carbono, porque escurece em contato com ele."],
    ["Palladium(II)_chloride_sample.jpg", "Cloreto de paládio em pó", "O cloreto de paládio é um pó marrom-avermelhado e é o composto de partida para muitos catalisadores de paládio."],
  ],
  YbF3: [
    ["Tetric_Ceram_Composite_20090914_01.JPG", "Resinas de dentista com fluoreto de itérbio", "Resinas de obturação usam fluoreto de itérbio. Ele aparece no raio X e solta flúor aos poucos."],
    ["Cranium_-_mandibula_(with_dental_filling,_dentistry).jpg", "Obturações aparecem no raio X", "Como o itérbio é pesado, ele bloqueia os raios X: a obturação aparece clara na imagem e o dentista vê se está bem colocada."],
    ["Ytterbium-3.jpg", "Itérbio metálico", "O itérbio é um metal prateado das terras raras."],
  ],
  ReB2: [
    ["Rhenium_Diboride.jpg", "Diboreto de rênio, um dos materiais mais duros", "O diboreto de rênio é um dos materiais mais duros conhecidos e, diferente do diamante, pode ser feito sem pressão muito alta."],
  ],
  IrO2: null,
  PoO2: [
    ["2019-11-22_Spark_plugs_and_static_eliminators_with_radioactive_polonium_at_museum_display.jpg", "Escova antiestática com polônio", "Escovas antiestáticas tinham um pouco de polônio-210. As partículas alfa dele tornam o ar condutor e descarregam a poeira dos filmes e lentes."],
    ["Polonium_(Element_-_84)_2.jpg", "Amostra de polônio", "O polônio foi descoberto por Marie e Pierre Curie em 1898, e o nome homenageia a Polônia. Ele é muito radioativo e muito tóxico."],
  ],
  NpO2: [
    ["Neptunium(IV)-oxid.jpg", "Frasco com óxido de netúnio-237", "O netúnio-237 sai como subproduto dos reatores nucleares. Ele é usado para produzir plutônio-238 para sondas espaciais."],
    ["Neptunium_metal.jpg", "Netúnio metálico", "O netúnio foi o primeiro elemento além do urânio criado em laboratório, em 1940. O nome vem do planeta Netuno, vizinho de Urano."],
  ],
  VO2: [
    ["VO2_crystal.jpg", "Cristal de dióxido de vanádio", "A cerca de 68 °C, o dióxido de vanádio passa de isolante a condutor de eletricidade quase de uma vez."],
    ["VO2_film.jpg", "Filme de dióxido de vanádio", "Filmes de dióxido de vanádio são estudados para janelas que barram o calor do Sol só quando o dia esquenta."],
  ],
  TaC: [
    ["Tantalum_carbide_TaC.JPG", "Carbeto de tântalo em pó", "O carbeto de tântalo derrete perto de 3.900 °C, uma das temperaturas de fusão mais altas que se conhecem. Ele é usado em ferramentas de corte."],
    ["255-GRC-1994-C-04456_Hafnium_Carbide-Tantalum_Carbide_CMC_rocket_chamber.jpg", "Câmara de foguete de carbeto de tântalo e háfnio", "A NASA testou câmaras de foguete de carbetos de tântalo e háfnio, que aguentam o calor extremo dos gases de escape."],
  ],
  HfC: [
    ["255-GRC-1994-C-04463_Hafnium_Carbide-Tantalum_Carbide_CMC_rocket_chamber.jpg", "Câmara de foguete de carbeto de háfnio e tântalo", "O carbeto de háfnio e o carbeto de tântalo estão entre os materiais com maior ponto de fusão, perto de 3.900 °C."],
    ["255-GRC-1994-C-04456_Hafnium_Carbide-Tantalum_Carbide_CMC_rocket_chamber.jpg", "A mesma câmara vista por dentro", "Por dentro, a câmara de combustão recebe gases a milhares de graus, e a cerâmica de carbetos precisa resistir sem derreter."],
    ["S-IC_engines_and_Von_Braun.jpg", "Motores de foguete", "Os motores do foguete Saturno V queimavam querosene e oxigênio líquido. Materiais que aguentam calor extremo são essenciais nesses motores."],
  ],
  CsI: [
    ["Kristall-CsI(Tl)_mit_Skala.jpg", "Cristal cintilador de iodeto de césio", "O iodeto de césio com tálio brilha quando é atingido por raios X ou gama. Esse brilho é transformado em imagem ou contado."],
    ["X-ray_by_Wilhelm_Röntgen_of_Albert_von_Kölliker's_hand_-_18960123-02.jpg", "Raios X: detectores usam iodeto de césio", "Os aparelhos digitais de raio X usam uma camada de iodeto de césio que converte os raios X em luz. Em 1895, como nesta foto, a imagem era feita direto em chapa fotográfica."],
    ["Cesium_iodide_sample.jpg", "Iodeto de césio em pó", "O iodeto de césio é um sal branco e transparente à luz infravermelha, usado também em instrumentos ópticos."],
  ],
  InP: [
    ["InP_Mult-Project_Wafer.jpg", "Bolacha (wafer) de fosfeto de índio", "Os lasers de fosfeto de índio emitem a luz infravermelha usada nas fibras ópticas da internet."],
    ["Indium_phosphide.jpg", "Fosfeto de índio sólido", "O fosfeto de índio é um semicondutor muito rápido, usado em chips de comunicação de alta frequência."],
  ],
  FeHO2: [
    ["Goethite-169735.jpg", "Goethita", "A goethita é um óxido-hidróxido de ferro e é parte comum da ferrugem e dos solos amarelados."],
    ["Yellow_ochre.png", "Ocre amarelo, pigmento de goethita", "O ocre amarelo, usado em pinturas de cavernas há dezenas de milhares de anos, deve a cor à goethita."],
    ["Goethite-190288.jpg", "Goethita em forma de cachos", "O nome goethita homenageia o escritor alemão Goethe, que também colecionava minerais."],
  ],
  NeH: [
    ["NeTube.jpg", "Letreiro de neônio", "O neônio brilha em vermelho-alaranjado quando uma corrente elétrica passa pelo tubo. O íon NeH⁺ é muito instável e só aparece em experimentos com gás ionizado."],
    ["Buildings_with_colorful_neon_street_signs_at_blue_hour,_Shinjuku,_Tokyo.jpg", "Letreiros luminosos em Tóquio", "Muitos letreiros \"de neon\" usam outros gases ou pó colorido no tubo. Só o vermelho-alaranjado é do neônio puro."],
    ["Neon-glow.jpg", "Tubo com neônio", "O neônio é raro no ar: cerca de 18 partes por milhão. Ele é separado do ar liquefeito."],
  ],
  HeH: [
    ["Planetary_Nebula_NGC_7027_(opo9811e).jpg", "Nebulosa NGC 7027, onde o HeH⁺ foi detectado em 2019", "Ele foi provavelmente a primeira molécula do Universo, formada logo depois do Big Bang. Em 2019, o observatório SOFIA o detectou nesta nebulosa."],
    ["NGC_7027_(2020-31-4682).png", "Outra nebulosa planetária", "Nebulosas planetárias são as camadas de gás que uma estrela parecida com o Sol solta no fim da vida."],
  ],
  AtI: [
    ["Cyclotron_ARRONAX.jpg", "Cíclotron: o astato é produzido em aceleradores", "O astato quase não existe na natureza. Ele é produzido em cíclotrons, bombardeando bismuto com partículas alfa."],
    ["First_Image_of_Astatine_-_German_Label.jpg", "Amostras radioativas para medicina", "O astato-211 é estudado para tratar câncer: as partículas alfa dele atingem só as células bem próximas."],
  ],
  BkO2: [
    ["Berkelium_metal.jpg", "Primeira amostra de um composto de berquélio", "O berquélio só é produzido em reatores nucleares, em quantidades de miligramas. O nome homenageia a cidade de Berkeley, onde foi descoberto em 1949."],
  ],
  AcCl3: [
    ["Actinium_sample_(31481701837).png", "Actínio brilhando em azul no escuro", "O actínio é tão radioativo que brilha azul no escuro, porque a radiação excita o ar à sua volta."],
    ["17_mCi_Ac-225(NO3)3_at_ORNL_by_Dr_Andrew_R_Burgoyne.jpg", "Frasco com actínio", "O actínio-225 é usado em tratamentos novos contra o câncer, em quantidades minúsculas."],
  ],
  EsCl3: [
    ["Einsteinium.jpg", "Einstênio brilhando no escuro (é muito radioativo)", "O einstênio solta tanta radiação que brilha e se aquece. Esta amostra tinha menos de um micrograma."],
    ["IvyMike2.jpg", "Ivy Mike, o teste nuclear em que o einstênio foi descoberto", "O einstênio foi achado em 1952 nos restos do teste Ivy Mike, a primeira bomba de hidrogênio. O nome homenageia Albert Einstein."],
  ],
  Al2O3: [
    ["Ruby_crystal_1.jpg", "Rubi bruto (óxido de alumínio com cromo)", "O rubi é óxido de alumínio (coríndon) com um pouco de cromo, que dá a cor vermelha."],
    ["Four_man-made_faceted_blue_sapphires_2.jpg", "Safiras também são óxido de alumínio", "A safira também é coríndon; a cor azul vem de traços de ferro e titânio. Safiras sintéticas protegem as telas de relógios."],
    ["Synthetic_sapphire,_ruby_and_emerald.gk.jpg", "Safira, rubi e esmeralda lapidados", "Rubis e safiras podem ser fabricados. A esmeralda é outro mineral, o berilo com cromo."],
    ["Corundum_5.jpg", "Coríndon bruto", "O coríndon é o segundo mineral natural mais duro, atrás só do diamante. Ele é usado em lixas e abrasivos."],
  ],
  HNO3: [
    ["Fuming_nitric_acid_40ml.jpg", "Ácido nítrico", "O ácido nítrico é um ácido forte e corrosivo usado para fazer adubos e explosivos."],
    ["Nitric_acid_yellow_2.JPG", "Ácido nítrico fumegante", "Concentrado, o ácido nítrico solta vapores; com o tempo ele se decompõe e fica amarelado por causa do NO₂."],
  ],
  CaH2O2: [
    ["Three_old_bricks_held_together_with_mortar.jpg", "Argamassa de cal entre tijolos", "A argamassa de cal endurece porque o hidróxido de cálcio absorve gás carbônico do ar e volta a ser carbonato de cálcio."],
    ["Calcium_hydroxide.jpg", "Hidróxido de cálcio (cal hidratada)", "A cal hidratada é um pó branco feito com cal virgem e água. Ela também é usada para tratar água e corrigir solos ácidos."],
    ["Whitewash_(3915197412).jpg", "Pintando com cal", "A caiação é uma pintura feita com cal e água. Ela deixa as paredes brancas e ajuda a combater fungos."],
  ],
  MgH2O2: [
    ["Earle's_Mint-O-Mag.jpeg", "Leite de magnésia (antiácido)", "O leite de magnésia é hidróxido de magnésio em água. Ele neutraliza o ácido do estômago e também funciona como laxante."],
    ["Brucite-215491.jpg", "Brucita, o mineral de hidróxido de magnésio", "A brucita é o hidróxido de magnésio da natureza. Ela forma placas macias e brilhantes."],
  ],
  MgCO3: [
    ["Climbing_Shoes_and_Chalk_Bag_-_02.jpg", "Pó de magnésio dos escaladores é carbonato de magnésio", "O \"pó de magnésio\" dos escaladores e ginastas é carbonato de magnésio: ele seca o suor das mãos e melhora a pegada."],
    ["2023_Rennie_Antacidum.jpg", "Antiácidos levam carbonato de magnésio", "O carbonato de magnésio reage com o ácido do estômago e por isso entra em comprimidos antiácidos."],
    ["Magnesite-121892.jpg", "Cristais de magnesita", "A magnesita é o carbonato de magnésio da natureza e é uma fonte de magnésio e de tijolos refratários."],
  ],
  KNO3: [
    ["2023_Czarny_proch_Vesuvit_LC_(3).jpg", "Pólvora negra: leva nitrato de potássio", "A pólvora negra é cerca de 75% nitrato de potássio, mais carvão e enxofre. O nitrato fornece o oxigênio para a queima rápida."],
    ["Potassium_nitrate.jpg", "Nitrato de potássio puro", "O nitrato de potássio, também chamado salitre, é um sal branco usado para conservar carnes e em pasta de dente para dentes sensíveis."],
    ["Potassium_Nitrate_13-0-45_KNO3_fertilizer_in_1_KG_commercial_package_(3).jpg", "Adubo de nitrato de potássio", "O nitrato de potássio é um adubo que dá às plantas dois nutrientes de uma vez: nitrogênio e potássio."],
  ],
  KIO3: [
    ["Iodized_salt_packet.jpg", "Sal iodado", "No Brasil, o sal de cozinha recebe iodato de potássio por lei para prevenir o bócio e problemas de desenvolvimento."],
    ["Potassium_iodate_tablets.jpg", "Comprimidos de iodato de potássio", "Em acidentes nucleares, comprimidos de iodo (iodeto ou iodato de potássio) protegem a tireoide do iodo radioativo."],
    ["Iodat_de_potassi.jpg", "Iodato de potássio em pó", "O iodato de potássio é um pó branco mais estável que o iodeto, por isso dura mais no sal guardado."],
  ],
  CH2O3: [
    ["Sparkling_Water_(4675945072).jpg", "Água com gás", "Na água com gás, uma pequena parte do CO₂ dissolvido forma ácido carbônico, que dá o gosto levemente ácido."],
    ["SiphonSeltzerAnchorBWks001.jpg", "Sifão de água com gás", "O sifão guarda a água sob pressão de gás carbônico. Ao apertar, a pressão empurra a água para fora."],
    ["0.5_GL_Borjomi_Glass_Bottle.jpg", "Água mineral com gás", "Algumas águas minerais já saem da fonte com gás carbônico vindo de rochas vulcânicas no subsolo."],
  ],
  NH4Cl: [
    ["Pirkka_Salmiakki_sokeriton.jpg", "Alcaçuz salgado (salmiakki) leva cloreto de amônio", "Na Finlândia, o salmiakki é um doce de alcaçuz com cloreto de amônio, de gosto salgado e picante."],
    ["Ammoniumchlorid_Kristalle.jpg", "Cristais de cloreto de amônio", "O cloreto de amônio aquecido passa a gás e volta a cristalizar nas partes frias, como se sublimasse."],
    ["Sal-ammoniac_on_basalt_(GeoDIL_number_-_188).jpg", "Sal amoníaco formado em vulcão", "O sal amoníaco se forma naturalmente perto de fendas vulcânicas, onde gases quentes escapam."],
  ],
  Na2CO3: [
    ["Beer_bottles_2018_G1.jpg", "Garrafas de vidro: o vidro é feito com carbonato de sódio", "O vidro comum é feito de areia, barrilha (carbonato de sódio) e calcário. A barrilha faz a areia derreter a uma temperatura menor."],
    ["Uhličitan_sodný.JPG", "Carbonato de sódio (barrilha)", "O carbonato de sódio, ou barrilha, é um pó branco usado em sabões, detergentes e no tratamento de piscinas."],
    ["Colorful_bottle.jpg", "Frasco de vidro colorido", "Óxidos metálicos adicionados ao vidro dão cores: cobalto deixa azul e ferro deixa verde."],
  ],
  Li2CO3: [
    ["Lithium_mine_at_Bolivia´s_Uyuni_Salt_Flat,_on_a_CBERS4_MUX_yesterday´s_image.jpg", "Salinas de lítio no Salar de Uyuni, Bolívia", "Nos salares andinos, a água salgada evapora em grandes tanques e o lítio fica concentrado. Depois ele é transformado em carbonato de lítio."],
    ["Lithiums2017c.jpg", "Remédio com carbonato de lítio", "O carbonato de lítio é um remédio usado há décadas para estabilizar o humor no transtorno bipolar."],
    ["Lithium_carbonate_A.jpg", "Carbonato de lítio puro", "O carbonato de lítio puro é um pó branco e é a matéria-prima de muitas baterias de íon-lítio."],
  ],
  MgSO4: [
    ["Magnesium_sulfate.JPG", "Sal de Epsom (sulfato de magnésio)", "O sal de Epsom tem o nome de uma fonte de água amarga na Inglaterra. Ele é usado em banhos e como laxante."],
    ["Epsomita_02.jpg", "Epsomita, o mineral de sulfato de magnésio", "A epsomita é o sulfato de magnésio da natureza. Ela forma crostas brancas em cavernas e minas."],
  ],
  CaSO4: [
    ["Cristales_cueva_de_Naica.JPG", "Cristais gigantes de gipsita na Caverna de Naica, México", "Na caverna de Naica, no México, cristais de gipsita cresceram por centenas de milhares de anos e passam de 10 metros."],
    ["Gypse_Caresse.jpg", "Cristal de selenita", "A selenita é gipsita transparente. Ela é tão mole que dá para riscar com a unha."],
    ["Gypsum_-_Sieroszowice_mine,_Lubin,_Lower_Silesia,_Poland.jpg", "Cristais de gipsita", "A gipsita é sulfato de cálcio hidratado. Aquecida, ela vira o gesso usado em construções e talas."],
    ["Anhydrite_Arnave.jpg", "Anidrita", "A anidrita é o sulfato de cálcio sem água. Se absorver água, ela se transforma em gipsita."],
  ],
  CuSO4: [
    ["Copper_sulfate.jpg", "Cristal de sulfato de cobre", "O sulfato de cobre hidratado forma cristais azul-vivos e é fácil de cristalizar em casa ou na escola."],
    ["Synthesizing_Copper_Sulfate.jpg", "Calda bordalesa para proteger plantas", "A calda bordalesa, mistura de sulfato de cobre e cal, combate fungos em parreiras desde o século XIX."],
    ["Copper_sulfate_anhydrous.jpg", "Sulfato de cobre sem água é branco", "Sem a água presa no cristal, o sulfato de cobre fica branco; com uma gota de água, volta a ficar azul."],
  ],
  C2H4: [
    ["Ripe_bananas_in_West_Bengal,_India.jpg", "Bananas amadurecem com o gás eteno", "As frutas maduras soltam eteno, que faz outras frutas amadurecerem. Por isso uma banana madura apressa as outras."],
    ["Girl_with_swimming_board.jpg", "Boia de polietileno, plástico feito de eteno", "O polietileno, o plástico mais produzido do mundo, é feito juntando milhares de moléculas de eteno em cadeia."],
  ],
  CH4O: [
    ["Man_pouring_windshield_washer_fluid.jpg", "Fluido do limpador de para-brisa leva metanol", "O metanol não congela fácil e entra no fluido limpador de para-brisa em países frios. Ele é tóxico: beber pode cegar."],
    ["Coloured_flames_of_methanol_solutions_of_metal_salts_and_compounds.jpg", "Chamas coloridas de metanol com sais", "O metanol queima com chama quase invisível. Sais de metais dissolvidos nele mostram as cores de cada elemento."],
    ["Windshield_washer_fluid_can.jpg", "Galão de metanol", "O metanol é usado para fazer formaldeído, plásticos e biodiesel. Na Fórmula Indy, ele foi o combustível por décadas."],
  ],
  Fe3O4: [
    ["Magnetite_sample_with_neodymium_magnet.jpg", "Magnetita atraída por um ímã", "A magnetita é o mineral mais magnético da natureza. Pedaços magnetizados dela foram as primeiras bússolas."],
    ["Magnetite-278427.jpg", "Cristal octaédrico de magnetita", "A magnetita cristaliza em octaedros, como duas pirâmides unidas pela base."],
    ["Magnetite-118736.jpg", "Cristais de magnetita", "A magnetita é um dos principais minérios de ferro e tem cerca de 72% de ferro."],
  ],
  AlH3O3: [
    ["Bauxite_hérault.JPG", "Bauxita, minério de alumínio rico em gibbsita", "A bauxita é a rocha de onde vem quase todo o alumínio. Ela é rica em hidróxidos de alumínio, como a gibbsita."],
    ["Gibbsite-fiu14a.jpg", "Gibbsita", "A gibbsita é hidróxido de alumínio. Ela se forma quando chuvas tropicais lavam as rochas por muito tempo."],
    ["Pisolitic_bauxite_(Alcoa_Bauxite_Mine,_Arkansas,_USA)_8.jpg", "Bauxita com grânulos", "O Brasil tem uma das maiores reservas de bauxita do mundo, sobretudo no Pará."],
  ],
  S8: [
    ["Kawah-Ijen_Indonesia_Ijen-Sulfur-Miner-01.jpg", "Minerador carregando enxofre no vulcão Ijen, Indonésia", "No vulcão Ijen, mineiros carregam blocos de enxofre de até 80 kg cratera acima, respirando gases tóxicos."],
    ["Sulfur_-_El_Desierto_mine,_San_Pablo_de_Napa,_Daniel_Campos_Province,_Potosí,_Bolivia.jpg", "Cristais de enxofre", "O enxofre forma cristais amarelos. Nele os átomos se ligam em anéis de oito (S₈)."],
    ["Io_highest_resolution_true_color.jpg", "Io, lua de Júpiter coberta de enxofre", "Io, lua de Júpiter, tem centenas de vulcões ativos. Compostos de enxofre deixam a superfície amarela e laranja."],
    ["Sulfur_mining_in_Kawah_Ijen_-_Indonesia_-_20110608.jpg", "Cratera do Ijen", "No Ijen, o gás vulcânico passa por canos, esfria e o enxofre derretido endurece em blocos amarelos."],
  ],
  H3PO4: [
    ["Cola_(soft_drink)_cropped.png", "Refrigerante de cola leva ácido fosfórico", "O ácido fosfórico dá o gosto ácido aos refrigerantes de cola e ajuda a conservá-los. A maior parte dele vai para adubos."],
  ],
  C2H6: [
    ["Natural_Gas_flaring.jpg", "Queima de gás natural, que contém etano", "O etano é o segundo maior componente do gás natural. Nos campos de petróleo, parte do gás é queimada em tochas."],
    ["Edmonton_Ethane_Plant_(28884177421).jpg", "Indústria petroquímica", "Nas petroquímicas, o etano é aquecido e quebrado para formar eteno, a base do plástico polietileno."],
  ],
  CH4N2O: [
    ["Sample_of_Urea.jpg", "Ureia em grânulos (adubo)", "A ureia é o adubo de nitrogênio mais usado do mundo e é vendida em grânulos brancos."],
    ["Urea_process_plant_UFFL_01.jpg", "Fábrica de ureia", "A ureia é feita com amônia e gás carbônico. Em 1828, ela foi a primeira substância dos seres vivos produzida em laboratório."],
  ],
  KMnO4: [
    ["Difuzija_KMN05.JPG", "Permanganato de potássio se dissolvendo", "Um cristal de permanganato na água espalha um rastro roxo: as partículas se espalham sozinhas, por difusão."],
    ["Potassium-permanganate-sample.jpg", "Cristais de permanganato de potássio", "Os cristais de permanganato de potássio são roxo-escuros, quase pretos, com brilho metálico."],
    ["Two_solutions_of_potassium_permanganate_with_different_concentrations.jpg", "Soluções de permanganato", "Mesmo muito diluído o permanganato colore a água. Ele é usado em banhos para tratar feridas de pele."],
  ],
  SF6: [
    ["High-voltage_switchgear_06.jpg", "Subestação elétrica: SF₆ isola os disjuntores de alta tensão", "O hexafluoreto de enxofre isola muito melhor que o ar e apaga as faíscas nos disjuntores de alta tensão."],
    ["High-voltage_transformer_750_kV_Трансформатор_750_кВ.jpg", "Transformador de alta tensão", "O SF₆ é o gás de efeito estufa mais potente conhecido, cerca de 23 mil vezes mais forte que o CO₂."],
  ],
  Cr2O3: [
    ["Chromium(III)-oxide_pigment.jpg", "Pigmento verde de óxido de cromo", "O verde de óxido de cromo é um pigmento estável, usado em tintas, cerâmicas e cédulas de dinheiro."],
    ["Merumite,_Director_Creek,_northwestern_Guyana.jpg", "Cromita, o minério de cromo", "A cromita é o principal minério de cromo. O cromo deixa o aço inoxidável resistente à ferrugem."],
    ["Chromium_oxide_cropped.jpg", "Óxido de cromo em frasco", "O óxido de cromo(III) é um pó verde, muito duro, usado também em pastas para afiar navalhas."],
  ],
  BaSO4: [
    ["Ascaris_infection_in_X-ray_image-_Pica,_the_practice_of_eating_soil_(South_Africa)_(16424840111).jpg", "Raio X com contraste de sulfato de bário", "O paciente bebe uma papa de sulfato de bário, que bloqueia os raios X e mostra o estômago e o intestino na imagem. Ele não é tóxico porque quase não se dissolve."],
    ["Barite_FRIZINGTON.jpg", "Cristal de barita", "A barita é o sulfato de bário da natureza. Ela é muito pesada e é usada na lama de perfuração de poços de petróleo."],
    ["Roses_des_Sables_Tunisie.jpg", "Rosa do deserto de barita", "Rosas do deserto se formam quando cristais em placa crescem na areia úmida. Podem ser de barita ou de gipsita."],
  ],
  AgNO3: [
    ["Mirror.jpg", "Espelho: a prata é depositada a partir do nitrato de prata", "Para fazer espelhos, uma solução de nitrato de prata deposita uma camada fina de prata no vidro."],
    ["Silver_nitrate_stains.jpg", "Nitrato de prata deixa manchas escuras na pele", "O nitrato de prata reage com a pele e a luz e forma prata escura. A mancha só sai quando a pele se renova."],
    ["Silver_nitrate_crystals.jpg", "Nitrato de prata puro", "O nitrato de prata é um sal branco usado para cauterizar verrugas e em reações de laboratório."],
  ],
  NH4NO3: [
    ["Calcium_Ammonium_Nitrate_Pellets.png", "Nitrato de amônio em grânulos (adubo)", "O nitrato de amônio é um adubo rico em nitrogênio. Guardado em grande quantidade e mal armazenado, ele pode explodir, como no porto de Beirute em 2020."],
    ["2012-03-15_Ruck-Zuck-Pack_Kälte_Katalog_Small.png", "Bolsa de gelo instantâneo", "Na bolsa de gelo instantâneo, o nitrato de amônio se dissolve na água ao apertar a bolsa e absorve calor, deixando-a gelada."],
    ["Ammonium_Nitrate.jpg", "Nitrato de amônio", "O nitrato de amônio é um sal branco que puxa a umidade do ar e se dissolve muito fácil."],
  ],
  H3BO3: [
    ["Boric_acid.jpg", "Ácido bórico", "O ácido bórico é um ácido fraco usado como antisséptico suave e como inseticida contra baratas."],
    ["Explosion_of_methanol_(coloured_with_boric_acid).jpg", "Compostos de boro dão chama verde", "Compostos de boro dissolvidos em álcool deixam a chama verde."],
    ["Sassolite.jpg", "Sassolita, o mineral de ácido bórico", "A sassolita, o ácido bórico natural, se forma perto de fontes termais e vulcões. Foi achada primeiro na Toscana, Itália."],
  ],
  SrCO3: [
    ["Red_fireworks,_Rostov-on-Don,_Russia.jpg", "Fogos de artifício vermelhos usam estrôncio", "O vermelho dos fogos de artifício vem de compostos de estrôncio, que emitem luz vermelha quando aquecidos."],
    ["Strontianite-ww3c.jpg", "Estroncianita, o mineral de carbonato de estrôncio", "A estroncianita tem o nome de Strontian, uma vila na Escócia. O elemento estrôncio também foi batizado assim."],
    ["SrCO3.jpg", "Carbonato de estrôncio em pó", "O carbonato de estrôncio é um pó branco usado em fogos, sinalizadores e ímãs de ferrite."],
  ],
  CCl2F2: [
    ["Aerosol.png", "Sprays antigos usavam CFC como propelente", "O CFC-12 era usado em sprays e geladeiras. Ele destrói o ozônio da estratosfera e foi proibido pelo Protocolo de Montreal, de 1987."],
    ["L&YR_Refrigerator_Van_48.jpg", "Vagão frigorífico antigo", "Antes dos CFCs, os refrigeradores usavam gases tóxicos como amônia. O CFC parecia seguro, até se descobrir o dano à camada de ozônio."],
  ],
  CHCl3: [
    ["Bottle_of_chloroform,_United_Kingdom,_1896-1945_Wellcome_L0058271.jpg", "Frasco antigo de clorofórmio, usado como anestésico", "O clorofórmio foi um dos primeiros anestésicos, usado a partir de 1847. Ele foi abandonado por causar danos ao coração e ao fígado."],
    ["Glass_ampoule_of_liquid_chloroform,_Paris,_France,_1845-1945_Wellcome_L0057252.jpg", "Ampola antiga de clorofórmio", "A rainha Vitória recebeu clorofórmio no parto em 1853, o que ajudou a popularizar a anestesia."],
  ],
  N2H4: [
    ["Rendering_of_Orbion's_Aurora_Hall-effect_thruster_on_a_satellite.png", "Satélites usam hidrazina nos propulsores", "A hidrazina se decompõe sobre um catalisador e solta gás quente. Por isso ela move os pequenos propulsores que ajustam a posição dos satélites."],
    ["Rocket_Engine_TD-339.jpg", "Propulsor a hidrazina", "A hidrazina pura é um líquido incolor, muito tóxico, que não precisa de oxigênio para gerar empuxo."],
    ["Mars_Science_Laboratory_Spacecraft_During_Cruise,_Artist's_Concept.jpg", "Sonda espacial", "Os propulsores a hidrazina guiaram a descida de sondas como a que pousou o jipe Curiosity em Marte."],
  ],
  CH2O2: [
    ["Plectroctena_sp_ants.jpg", "Formigas produzem ácido fórmico", "Muitas formigas soltam ácido fórmico para se defender. É ele que arde na picada."],
    ["Formic_acid_85_percent.jpg", "Ácido fórmico puro", "O ácido fórmico é o ácido carboxílico mais simples e tem cheiro forte e irritante. Apicultores o usam contra ácaros nas colmeias."],
    ["An_Ant_in_Colombian_amber.jpg", "Formiga presa em âmbar", "O nome do ácido fórmico vem do latim formica, \"formiga\": ele foi obtido pela primeira vez destilando formigas."],
  ],
  C2H2O4: [
    ["Rheum_rhabarbarum.2006-04-27.uellue.jpg", "Ruibarbo é rico em ácido oxálico", "As folhas do ruibarbo têm muito ácido oxálico e são tóxicas. Só os talos são comidos."],
    ["OxalisTriangularis.jpg", "Trevo-roxo (Oxalis), que dá nome ao ácido", "O nome do ácido oxálico vem da planta Oxalis (trevo-azedo), rica nele. O gosto azedo das folhas vem desse ácido."],
    ["Oxalic_acid_dihydrate.jpg", "Ácido oxálico puro", "O ácido oxálico tira manchas de ferrugem. No corpo, ele se junta ao cálcio e pode formar pedras nos rins."],
  ],
  C2H3Cl: [
    ["Pvc-o-pipes.jpg", "Canos de PVC (policloreto de vinila)", "Milhares de moléculas de cloreto de vinila ligadas formam o PVC, o plástico dos canos de água e esgoto."],
    ["Laying_sewer_hi_res_(2).jpg", "Instalação de canos de PVC", "O PVC é leve, barato e não enferruja, por isso substituiu os canos de ferro em quase todas as obras."],
    ["PVC-U_Druckrohr_Transparent_.jpg", "Tubos transparentes de PVC", "Sem pigmento, o PVC é transparente. Ele também é usado em mangueiras, bolsas de sangue e cabos elétricos."],
  ],
  C2F4: [
    ["Blintzes_in_frying_pan.jpg", "Frigideira antiaderente (teflon)", "O teflon (PTFE) é feito de muitas moléculas de tetrafluoretileno. Quase nada gruda nele."],
    ["Fried_egg,_sunny_side_up.jpg", "Ovo frito em frigideira antiaderente", "Na frigideira antiaderente, o ovo desliza porque o teflon não reage nem se mistura com a comida."],
    ["PTFE_tape.jpg", "Fita veda-rosca de teflon", "A fita veda-rosca é de teflon: ela preenche as roscas e veda sem reagir com a água."],
  ],
  Na2SO4: [
    ["Sodium_sulfate.jpg", "Sulfato de sódio", "O sulfato de sódio é um sal branco usado em detergentes em pó e na fabricação de papel e vidro."],
    ["Thenardite_(GeoDIL_number_-_602).jpg", "Mirabilita, sulfato de sódio hidratado", "A tenardita e a mirabilita são formas naturais do sulfato de sódio; a mirabilita tem água presa no cristal e a tenardita não."],
    ["Thenardite-Mirabilite-119681.jpg", "Tenardita", "Esses minerais se formam em lagos salgados que secam. Ao perder água, a mirabilita vira tenardita."],
  ],
  NaNO3: [
    ["Advert_for_Sodium_nitrate_Portugal_19_November_2012.JPG", "Placa antiga do salitre do Chile", "O salitre do Chile foi o principal adubo e fonte de nitrato para pólvora do mundo até os anos 1920."],
    ["Nitratine-548175.jpg", "Nitratina, o mineral de nitrato de sódio", "A nitratina se acumula no Deserto do Atacama porque lá quase nunca chove para dissolvê-la."],
    ["Dusičnan_sodný.JPG", "Nitrato de sódio puro", "O nitrato de sódio é um sal branco usado como adubo e para conservar carnes."],
  ],
  K2CO3: [
    ["Potassium_carbonate.jpg", "Carbonato de potássio", "O carbonato de potássio é um pó branco usado em vidros especiais, sabões e na massa de alguns pães e macarrões asiáticos."],
    ["Campfire_scar_08319.JPG", "Cinzas de madeira contêm carbonato de potássio", "Antigamente o carbonato de potássio era tirado das cinzas de madeira lavadas com água. Daí vem o nome \"potássio\" (do inglês pot ash, cinza de panela)."],
  ],
  CaCl2O2: [
    ["Calcium-Hypochlorite.jpg", "Hipoclorito de cálcio (cloro de piscina)", "O hipoclorito de cálcio é vendido como pó ou pastilhas para tratar piscinas e água potável. Ele libera cloro aos poucos."],
  ],
  KClO3: [
    ["Friction_d'une_allumette.jpg", "Palito de fósforo acendendo: a cabeça tem clorato de potássio", "Ao riscar o fósforo, o atrito faz o clorato de potássio da cabeça reagir com o fósforo vermelho da lixa e pegar fogo."],
    ["A_match_burning_out.jpg", "Fósforo queimando", "O clorato de potássio fornece o oxigênio que faz a cabeça do fósforo queimar rápido."],
    ["Potassium_chlorate-substance.jpg", "Clorato de potássio puro", "O clorato de potássio é um sal branco usado em fogos de artifício. Misturado com combustíveis, pode explodir."],
  ],
  V2O5: [
    ["V2O5powder.jpg", "Pentóxido de vanádio", "O pentóxido de vanádio é um pó alaranjado que acelera a produção de ácido sulfúrico, a substância industrial mais fabricada do mundo."],
    ["Vanadium_oxidation_states.jpg", "Soluções de vanádio em várias cores", "O vanádio muda de cor conforme a carga dos íons: amarelo, azul, verde e violeta. O nome do elemento vem de Vanadis, deusa nórdica da beleza."],
  ],
  FeSO4: [
    ["Iron(II)-sulfate-heptahydrate-sample.jpg", "Cristais de sulfato de ferro(II)", "O sulfato de ferro(II) forma cristais verde-azulados. Ele é usado para tratar anemia por falta de ferro."],
    ["Melanterite-657241.jpg", "Melanterita, o mineral de sulfato de ferro", "A melanterita aparece em minas antigas quando a pirita se oxida com a água. Ela é solúvel e some com a chuva."],
  ],
  NiC4O4: [
    ["Nickel_kugeln.jpg", "Esferas de níquel purificado pelo processo da tetracarbonilníquel", "No processo Mond, o níquel impuro reage com monóxido de carbono e vira tetracarbonilníquel, um gás. Aquecido, o gás se desfaz e deposita esferas de níquel quase puro."],
  ],
  As2O3: [
    ["Arsenic_trioxide.jpg", "Trióxido de arsênio", "O trióxido de arsênio era o \"arsênico\" dos venenos antigos. Hoje é usado como remédio para um tipo de leucemia."],
    ["Historical_Vial_of_Arsenic_Trioxide.jpg", "Frasco antigo de arsênico", "O arsênico branco não tinha cheiro nem gosto, por isso era tão usado em envenenamentos. No século XIX surgiu um teste para detectá-lo."],
  ],
  ZrSiO4: [
    ["ZirkonBlau.jpg", "Zircão azul lapidado", "O zircão é um mineral natural, diferente da zircônia cúbica fabricada. O azul vem de aquecer cristais marrons."],
    ["Zircon-dtn1a.jpg", "Cristal de zircão", "Os cristais de zircão mais antigos da Terra têm 4,4 bilhões de anos e foram achados na Austrália."],
    ["Zircon-tuc1001a.jpg", "Zircão amarelo", "O zircão prende urânio quando se forma, e o decaimento desse urânio serve como relógio para datar rochas."],
  ],
  Sb2S3: [
    ["Stibnite_-_Herja_mine,_Maramures,_Romania.jpg", "Cristais de estibina", "A estibina é o principal minério de antimônio e forma cristais longos, como agulhas de metal."],
    ["Diorite_Kohl_pot_used_for_storing_cosmetic_malachite_from_El_Kab_in_Upper_Egypt_Penn_Museum.jpg", "Recipiente egípcio antigo para kohl (pintura dos olhos)", "Os antigos egípcios usavam kohl para pintar os olhos. O kohl podia levar estibina ou galena moídas."],
    ["كحل_الاثمد_(1).jpg", "Estibina em pó", "No Oriente Médio, a estibina moída é o kohl tradicional (kuhl ithmid), usado até hoje."],
  ],
  BaN2O6: [
    ["Dusičnan_barnatý.JPG", "Nitrato de bário", "O nitrato de bário é um sal branco. Ele é tóxico, como os outros sais solúveis de bário."],
    ["Bowling_Green_4th_of_July_fireworks_2019.jpg", "Fogos de artifício verdes usam bário", "Os compostos de bário deixam a chama verde. O nitrato também fornece oxigênio para a queima nos fogos."],
  ],
  Eu2O3: [
    ["500euro-uv-front.jpg", "Notas de euro brilham sob luz UV graças ao európio", "As notas de euro têm tintas com európio que brilham sob luz ultravioleta. Isso ajuda a identificar notas falsas."],
    ["Eu2O3.powder.jpg", "Óxido de európio em pó", "O óxido de európio é um pó branco. Ele era a fonte da cor vermelha nas telas de TV de tubo."],
    ["UV_Euro_Banknote.jpg", "Nota de 10 euros sob luz UV", "Sob luz ultravioleta, aparecem nas notas fibras e desenhos que brilham em cores diferentes."],
  ],
  Pb3O4: [
    ["Red_lead.jpg", "Zarcão, pigmento laranja", "O zarcão é óxido de chumbo vermelho-alaranjado, usado como pigmento desde a Antiguidade."],
    ["Minium_plomb_MD_3.JPG", "Tinta antiferrugem de zarcão", "A tinta de zarcão protegia o ferro contra a ferrugem em pontes e navios. Por ser tóxica, foi substituída por outras tintas."],
  ],
  UF6: [
    ["Gas_centrifuge_cascade.jpg", "Centrífugas que enriquecem urânio usando UF₆", "O UF₆ vira gás a 56 °C. Nas centrífugas, ele gira muito rápido e o urânio-235, mais leve, se separa do urânio-238."],
    ["Deputy_Secretary_Poneman_signs_a_cylinder_commemorating_the_start-up_of_hot_functional_testing_operations_at_the_of_Depleted_Uranium_Hexafluoride_(DUF6)_Conversion_Plant._(4990203996).jpg", "Cilindro de transporte de UF₆", "O UF₆ viaja sólido em cilindros de aço. Para o enriquecimento, ele é aquecido até virar gás."],
    ["Uranium_hexafluoride_crystals_sealed_in_an_ampoule.jpg", "Cristais de hexafluoreto de urânio", "À temperatura ambiente o hexafluoreto de urânio é um sólido branco-acinzentado. Com a umidade do ar ele reage e solta ácido fluorídrico."],
  ],
  XeF4: [
    ["HD.6B.090_(10578112165).jpg", "Cristais de tetrafluoreto de xenônio", "O tetrafluoreto de xenônio foi um dos primeiros compostos de gás nobre, em 1962. Ele forma cristais incolores."],
  ],
  B2H6: null,
  Na2S2O3: [
    ["Sodium_thiosulfate_pentahydrate.jpg", "Tiossulfato de sódio", "Na fotografia, o tiossulfato de sódio é o \"fixador\": ele dissolve o brometo de prata que não recebeu luz e fixa a imagem."],
    ["Sodium_thiosulfate.jpg", "Tiossulfato de sódio em frasco", "O tiossulfato de sódio tira o cloro da água de aquários e é usado como antídoto contra envenenamento por cianeto."],
  ],
  CCl4: [
    ["Snohomish_-_Blackman_House_Museum_-_Comet_fire_extinguisher_02A.jpg", "Extintor antigo de tetracloreto de carbono", "Os extintores antigos de tetracloreto de carbono apagavam o fogo, mas ele é tóxico e, no calor, pode formar fosgênio. Foi proibido."],
    ["PackardWheeledExtinguisherDetail.jpg", "Extintores antigos", "O tetracloreto de carbono era bombeado à mão. O vapor pesado abafava as chamas."],
    ["Carbon_Tetrachloride.jpg", "Frasco de tetracloreto de carbono", "O tetracloreto de carbono é um líquido denso e incolor. Ele também foi usado em lavagem a seco e destrói o ozônio."],
  ],
  CH3Cl: [
    ["WomenWorking_SeaweedZanzibar_4.jpg", "Algas marinhas liberam clorometano", "Algas marinhas, fungos e plantas liberam clorometano. Ele é o composto de cloro mais abundante na atmosfera."],
    ["Harvesting_seaweed_in_Jambiani.jpg", "Colheita de algas", "Em Zanzibar, mulheres cultivam algas no mar raso. As algas são vendidas para fazer espessantes de alimentos e cosméticos."],
  ],
  CH2Cl2: [
    ["Wet_Palette_(Paleta_Húmeda),_Barníz,_Imprimador_y_Quita_Pintura.jpg", "Removedor de tinta (diclorometano)", "O diclorometano dissolve tintas e vernizes muito bem. Por ser tóxico, ele foi proibido em removedores domésticos em vários países."],
    ["Sample_of_dichloromethane.jpg", "Diclorometano em frasco", "O diclorometano é um líquido que evapora fácil. Ele já foi usado para tirar a cafeína do café."],
  ],
  CHI3: [
    ["Triiodomethane_(iodoform).jpg", "Iodofórmio", "O iodofórmio é um pó amarelo com cheiro forte. Ele foi muito usado como antisséptico em curativos e ainda é usado por dentistas."],
    ["Iodoform2.jpg", "Cristais de iodofórmio", "O iodofórmio forma cristais amarelos. O \"teste do iodofórmio\" identifica certos álcoois e cetonas no laboratório."],
  ],
  C2Cl4: [
    ["Dry_clean_rack.jpg", "Lavanderia a seco: usa percloroetileno", "Na lavagem a seco, a roupa é lavada num solvente, em geral percloroetileno, em vez de água."],
    ["Drycleanmachine.JPG", "Máquina de lavagem a seco", "A máquina recicla o percloroetileno, porque ele é caro e prejudicial à saúde e ao ambiente."],
  ],
  C2H5Cl: [
    ["Norway_Italy_-_June_2025_B_40.jpg", "Spray gelado usado em lesões no esporte", "O cloroetano evapora tão rápido na pele que a esfria muito. Isso alivia a dor de pancadas no esporte."],
    ["Ethyl_chloride_spray,_United_Kingdom,_1925-1940_Wellcome_L0058168.jpg", "Frasco antigo de cloroetano", "O cloroetano também foi usado como anestésico inalado no início do século XX."],
  ],
  C2H2F4: [
    ["Freon_134a_refrigerant_for_car_AC_001_(cropped).jpg", "Gás refrigerante R-134a, usado no ar-condicionado de carros", "O R-134a substituiu os CFCs no ar-condicionado de carros porque não destrói o ozônio. Mas ele é um gás de efeito estufa forte e está sendo trocado."],
    ["Air_conditioning_unit_on_Amtrak_Amfleet_car_VA.jpg", "Ar-condicionado de ônibus", "No ar-condicionado, o gás refrigerante absorve calor ao evaporar dentro do veículo e o solta do lado de fora."],
  ],
  CH5N: [
    ["Ensenada_fish_market_2.jpg", "O cheiro de peixe vem de aminas como a metilamina", "O cheiro de peixe vem de aminas como a trimetilamina e a metilamina, produzidas quando o peixe começa a se decompor."],
    ["Oweston_sting_fish_for_sale_at_Tsukiji_Fishmarket,_Tokyo-30.jpg", "Peixes no mercado", "Peixes frescos quase não têm cheiro. Limão e vinagre diminuem o cheiro porque o ácido reage com as aminas."],
  ],
  C3H6: [
    ["Tupperware-PP.jpg", "Pote de polipropileno (plástico feito de propeno)", "O polipropileno é feito de muitas moléculas de propeno. Ele é leve e aguenta água quente, por isso é usado em potes."],
    ["PolypropyleneItemsForLaboratoryUse.jpg", "Tubos de laboratório de polipropileno", "O polipropileno aguenta esterilização a vapor e muitos produtos químicos, por isso é usado em tubos de laboratório."],
    ["Polypropylene_lid.JPG", "Tampa de polipropileno", "Tampas, para-choques e cordas são feitos de polipropileno, um dos plásticos mais produzidos."],
  ],
  C2H4O: [
    ["Red_Apple.jpg", "Maçãs contêm acetaldeído", "O acetaldeído aparece em frutas maduras e ajuda a dar o aroma de maçã. Ele também se forma quando o fígado processa o álcool."],
    ["Tree_with_red_apples_in_Barkedal_4.jpg", "Pomar de macieiras", "Na fruta, o acetaldeído é um dos intermediários entre o açúcar e o álcool."],
  ],
  C2H6S: [
    ["Flame_from_the_burner_of_a_gas_stove.jpg", "Gás de cozinha tem etanotiol para dar cheiro e alertar vazamentos", "O gás de cozinha não tem cheiro. Por segurança, ele recebe um pouco de etanotiol ou outro composto de enxofre, para que se perceba um vazamento."],
    ["Gas_stove.jpg", "Fogão a gás", "O nariz humano sente o etanotiol mesmo em quantidades de poucas partes por bilhão."],
  ],
  CH4S: [
    ["Asparagus-Bundle.jpg", "Comer aspargos deixa cheiro de metanotiol na urina", "Depois de comer aspargos, a urina de muita gente fica com cheiro forte. Um dos responsáveis é o metanotiol, formado na digestão."],
    ["Steam-boiling_green_asparagus.jpg", "Aspargos cozinhando", "O aspargo tem ácido aspargúsico, com enxofre. O corpo o transforma em metanotiol e outros compostos de cheiro forte."],
  ],
  C3H3N: [
    ["14-05-28-LEGO-by-RalfR-053.jpg", "Blocos de plástico ABS (feito com acrilonitrila)", "Blocos de montar costumam ser de plástico ABS, que leva acrilonitrila. Ela dá resistência e brilho às peças."],
    ["Cotton-acrylic_yarn.jpg", "Fio de lã acrílica", "Os fios acrílicos usados em lãs e roupas são feitos principalmente de acrilonitrila."],
    ["ABS_granule.jpg", "Grãos de plástico ABS", "O ABS é vendido em grãos que são derretidos e injetados em moldes."],
  ],
  C2H3NaO2: [
    ["Hand_warmer.jpg", "Bolsa térmica de acetato de sódio", "Na bolsa térmica, o acetato de sódio fica líquido mesmo frio. Ao dobrar o disco de metal, ele cristaliza de uma vez e solta calor."],
    ["Pexeso_baňky_2.jpg", "“Gelo quente”: o acetato cristaliza na hora", "Uma solução supersaturada de acetato de sódio cristaliza na hora quando recebe um cristalzinho, formando o \"gelo quente\"."],
    ["Sodium_acetate_trihydrate_crystal_-_2009-01-28.jpg", "Cristal de acetato de sódio", "O acetato de sódio também é o que dá o gosto às batatas chips de \"sal e vinagre\"."],
  ],
  CaC2O4: [
    ["Kidney_stone_4mm_05.jpg", "Pedras nos rins são feitas de oxalato de cálcio", "A maioria das pedras nos rins é de oxalato de cálcio, que se forma quando há muito cálcio e oxalato na urina."],
    ["Raphides_from_variegated_ivy.jpg", "Cristais de oxalato vistos ao microscópio", "Muitas plantas, como a hera e a comigo-ninguém-pode, têm agulhas de oxalato de cálcio que ferem a boca de quem as morde."],
    ["Whewellite-md7b.jpg", "Whewellita, o mineral", "A whewellita é o oxalato de cálcio da natureza e aparece em carvões e rochas com restos de plantas."],
  ],
  Mg2SiO4: [
    ["Papakōlea_Green_Sand_Beach,_Hawaii.jpg", "Praia de areia verde de olivina, Havaí", "A areia verde da praia de Papakōlea, no Havaí, vem de cristais de olivina soltos de rochas vulcânicas."],
    ["Olivine-gem7-10a.jpg", "Cristal de peridoto (olivina)", "A olivina é um dos minerais mais comuns do manto da Terra. Quando tem qualidade de gema, se chama peridoto."],
    ["Peridot-China.jpg", "Peridotos lapidados", "O peridoto é verde por causa do ferro no cristal. Ele também foi achado em meteoritos."],
  ],
  LiFePO4: [
    ["VDL_Citea_SLF-120_Electric_in_Nes_(Ameland).jpg", "Ônibus elétrico com baterias de fosfato de ferro e lítio", "As baterias de fosfato de ferro e lítio duram muitas recargas e esquentam menos, por isso são usadas em ônibus e carros elétricos."],
    ["Lithium_Iron_Phosphate_LiFePO4_Cells_700_Ah_Amp_Hours_3.25_Volts_-_7.jpg", "Baterias de fosfato de ferro e lítio", "O fosfato de ferro e lítio dispensa o cobalto, que é caro e difícil de extrair."],
  ],
  K2S2O5: [
    ["Yerevan,_Brandy_barrels,_Armenia.jpg", "Barris de vinho: o metabissulfito conserva o vinho", "O metabissulfito de potássio solta dióxido de enxofre no vinho, o que impede a ação de micróbios e protege o vinho do oxigênio."],
    ["Red_wine_cap.jpg", "Uvas sendo esmagadas", "O metabissulfito é adicionado às uvas esmagadas para que só as leveduras certas façam a fermentação."],
    ["Disiřičitan_draselný.jpg", "Metabissulfito de potássio puro", "O metabissulfito de potássio é um pó branco também usado para limpar equipamentos de fazer vinho e cerveja."],
  ],
  Na2PO3F: [
    ["Crystal_White_Toothpaste_Supermarket.jpg", "Cremes dentais com flúor", "O monofluorfosfato de sódio é um dos tipos de flúor nos cremes dentais. Ele libera flúor na boca, que reforça o esmalte."],
    ["Toothpasteonbrush.jpg", "Creme dental na escova", "Para prevenir cáries, basta uma quantidade de pasta do tamanho de uma ervilha, e é melhor não enxaguar demais depois."],
  ],
  In2O3: [
    ["Touchscreen_IMG_2796.jpg", "Telas sensíveis ao toque usam óxido de índio e estanho", "O óxido de índio e estanho (ITO) conduz eletricidade e é transparente. Ele forma a camada que sente o toque nas telas."],
    ["Samsung_Galaxy_Tab_GT-P1000_-_touchscreen_Atmel_71549-B1-8267.jpg", "Painel de tela de toque", "Na tela de toque, uma grade invisível de ITO percebe onde o dedo muda o campo elétrico."],
    ["LHcockpitWindow.jpg", "O para-brisa de aviões também leva essa camada", "Uma camada de ITO aquecida eletricamente impede que o para-brisa de aviões embace ou congele."],
  ],
  NH5O: [
    ["Ammonia_smoke.JPG", "Amoníaco de limpeza", "O amoníaco de limpeza é amônia dissolvida em água. Ele não deve ser misturado com água sanitária: a mistura solta gases tóxicos."],
    ["Fluorescein_in_ammonia_solution_(Part_13).jpg", "Amônia formando nuvens verdes com um indicador", "A amônia é uma base e muda a cor dos indicadores. Com fluoresceína, a solução brilha em verde."],
  ],
  C3H4O: [
    ["Korean_barbecue_-_smoke_extractor.jpg", "Churrasco: gordura queimando libera acroleína", "A acroleína se forma quando gordura ou óleo esquentam demais. Ela é a parte mais irritante da fumaça, que arde nos olhos."],
    ["The_Big_Smoke_Barbecue_(4635723125).jpg", "Fumaça de churrasco", "Na fumaça do churrasco, a gordura que pinga na brasa se decompõe e forma acroleína."],
    ["Smoked_Brisket_with_smoke_ring.jpg", "Carne grelhada", "A acroleína tem cheiro acre de gordura queimada. Ela também está na fumaça de cigarro."],
  ],
  CH3NO2: [
    ["Nitro_Buggy_RC_Car.jpg", "Carrinhos de controle remoto com motor a nitro", "Carrinhos a nitro queimam uma mistura de metanol com nitrometano, que dá mais potência ao motorzinho."],
    ["1941_Willys_Americar_Coupe_Drag_Racing_Car.jpg", "Carro de arrancada", "Nos dragsters Top Fuel, o combustível é quase só nitrometano. Ele traz oxigênio na própria molécula e queima muito forte."],
    ["Traxxas_Jato.jpg", "Carrinho a nitro", "O nitrometano é um líquido oleoso e explosivo em certas condições. Ele também é usado como solvente."],
  ],
  SiH4: [
    ["Ground_mounted_solar_panels.gk.jpg", "Painéis solares: o silício é depositado a partir do silano", "Nas fábricas de células solares, o silano se decompõe e deposita camadas finas de silício."],
    ["Container_【_28T9_】_SINU_212002(1)---No,1_【_Pictures_taken_in_Japan_】.jpg", "Contêiner de silano", "O silano pega fogo sozinho em contato com o ar, por isso é transportado em contêineres especiais e com muito cuidado."],
    ["Photovoltaic_panel_at_the_National_Solar_Energy_Center_in_Israel.jpg", "Célula solar de silício", "Uma célula solar de silício transforma luz em eletricidade. As de silício amorfo são feitas a partir do silano."],
  ],
  N2O4: [
    ["Apollo_CSM_lunar_orbit.jpg", "Módulo de comando da Apollo: seus foguetes usavam N₂O₄", "Os motores da nave Apollo queimavam tetróxido de dinitrogênio com um derivado da hidrazina. Os dois pegam fogo só de se tocarem."],
    ["NO2-N2O4.jpg", "Tetróxido de dinitrogênio em frasco", "O N₂O₄ puro é incolor, mas sempre há um pouco de NO₂ misturado, que deixa a amostra marrom-amarelada."],
    ["Nitrogen_dioxide_at_different_temperatures.jpg", "Mais quente, mais escuro: o N₂O₄ vira NO₂", "Quando esquenta, o N₂O₄ se divide em duas moléculas de NO₂ marrons. Quando esfria, elas se juntam de novo."],
  ],
  HClO4: [
    ["Perchloric_acid_60_percent.jpg", "Ácido perclórico", "O ácido perclórico é um dos ácidos mais fortes. Quente e concentrado, ele pode explodir em contato com matéria orgânica."],
  ],
  KBrO3: [
    ["Potassium_bromate_by_Danny_S._-_001.JPG", "Bromato de potássio", "O bromato de potássio já foi muito usado para fortalecer a massa do pão. No Brasil e em muitos países ele foi proibido por ser possivelmente cancerígeno."],
  ],
  TiCl4: [
    ["Sky_writer_painted_the_sky_at_Arctic_Thunder_Open_House,_Joint_Base_Elmendorf-Richardson,_Alaska,_July_1,_2018.jpg", "Escrita no céu: aviões soltam tetracloreto de titânio", "O tetracloreto de titânio reage com a umidade do ar e forma uma fumaça branca densa. Aviões o usam para escrever no céu."],
    ["Sample_of_Titanium_tetrachloride_01.jpg", "Tetracloreto de titânio em frasco", "O tetracloreto de titânio é um líquido incolor e uma etapa na produção do titânio metálico e do pigmento branco."],
  ],
  PbCrO4: [
    ["Superior_IHC_Loadstar_school_bus_in_Rodeberg_(Be)_(2).jpg", "Ônibus escolar amarelo: a tinta original era amarelo de cromo", "O amarelo de cromo, um cromato de chumbo, foi a tinta tradicional dos ônibus escolares norte-americanos."],
    ["Dundasite_and_Crocoite.jpg", "Crocoíta, o mineral de cromato de chumbo", "A crocoíta é o cromato de chumbo da natureza. O cromo foi descoberto em 1797 estudando esse mineral."],
    ["Lead_chromate.JPG", "Cromato de chumbo em pó", "O cromato de chumbo é um pigmento amarelo forte, mas tóxico, porque tem chumbo e cromo."],
  ],
  FeTiO3: [
    ["Ilmenite-155036.jpg", "Ilmenita, principal minério de titânio", "A ilmenita é óxido de ferro e titânio. A maior parte vira dióxido de titânio, o pigmento branco das tintas."],
    ["Ilmenite-173863.jpg", "Cristal de ilmenita", "A ilmenita é preta e um pouco magnética. Ela se acumula em areias de praia por ser pesada."],
  ],
  CoAl2O4: [
    ["Cobalt_Blue.JPG", "Pigmento azul de cobalto", "O azul de cobalto é um pigmento estável. Ele foi produzido pela primeira vez em 1802 por Louis Jacques Thénard."],
    ["Blue_and_white_bowl_Jingdezhen_Ming_Yongle_1403_1424.jpg", "Porcelana azul e branca", "A porcelana azul e branca chinesa era pintada com minério de cobalto antes da queima. O azul aguenta o calor do forno."],
    ["Iznik_Pottery_Candlesticks,Ottoman_Turkey.JPG", "Cerâmica decorada com azul de cobalto", "A cerâmica de Iznik, na Turquia, usava óxido de cobalto para conseguir o azul intenso."],
  ],
  NiH2O2: [
    ["IKEA_LADDA_rechargeable_AA-batteries.jpg", "Pilhas recarregáveis de níquel-hidreto metálico", "Nas pilhas recarregáveis de níquel-hidreto metálico, o polo positivo é feito de hidróxido de níquel."],
    ["Nickel_Hydroxide_White_Halloysite_Clay_Composite.jpg", "Hidróxido de níquel em pó", "O hidróxido de níquel é um pó verde-claro usado em baterias recarregáveis."],
  ],
  CuH2O2: [
    ["Bourdeaux_mixture.jpg", "Videira tratada com calda bordalesa", "A calda bordalesa deixa as folhas azuladas. O cobre dela protege as videiras contra o míldio, uma doença causada por fungos."],
    ["Réz(II)-hidroxid.jpg", "Hidróxido de cobre(II) em pó", "O hidróxido de cobre(II) é um pó azul-claro, usado como fungicida na agricultura."],
    ["Bouillie_bordelaise.jpg", "Propaganda antiga de calda bordalesa", "A calda bordalesa surgiu na região de Bordeaux, na França, por volta de 1880."],
  ],
  Na2SeO3: [
    ["Bertholletia_excelsa_seeds_closeup.jpg", "Castanha-do-pará, rica em selênio", "Uma única castanha-do-pará pode ter mais selênio do que o corpo precisa por dia. Comer demais faz mal."],
    ["Sodium_selenite.jpg", "Selenito de sódio puro", "O selenito de sódio é usado em rações animais e suplementos para corrigir a falta de selênio. Em excesso, é tóxico."],
  ],
  SrAl2O4: [
    ["Phosphorescent.jpg", "Pó que brilha no escuro (aluminato de estrôncio)", "Com európio misturado, o aluminato de estrôncio absorve luz e brilha por horas no escuro, bem mais que o sulfeto de zinco."],
    ["BWG9_lume_on_a_Rolex_Submariner_Date_style_Steeldive_homage_watch.jpg", "Ponteiros luminosos de relógio", "Os ponteiros luminosos dos relógios atuais usam aluminato de estrôncio, que não é radioativo como a tinta de rádio antiga."],
    ["LUMI_Resuable_and_Non_Toxic_Glow_Stick_Alternative.jpg", "Objetos que brilham no escuro", "Placas de saída e adesivos que brilham no escuro também usam esse pó."],
  ],
  Sb2O3: [
    ["Antimony_trioxide.jpg", "Trióxido de antimônio", "O trióxido de antimônio é misturado em plásticos e tecidos para deixá-los resistentes ao fogo."],
    ["Valentinite-155153.jpg", "Valentinita, o mineral de trióxido de antimônio", "A valentinita é o trióxido de antimônio da natureza e se forma quando a estibina se oxida."],
  ],
  BaTiO3: [
    ["Ceramic_capacitors_mounted_on_a_PCB.jpg", "Capacitores cerâmicos em uma placa", "Os capacitores cerâmicos, pequenos componentes de quase todo aparelho eletrônico, têm camadas de titanato de bário."],
    ["BaTiO3ceramics.JPG", "Disco de titanato de bário", "O titanato de bário gera uma pequena voltagem quando é apertado (piezoeletricidade). Ele é usado em microfones e sensores."],
  ],
  La2O3: [
    ["Lens_Nikkor_50mm.jpg", "Lentes de câmera usam vidro com lantânio", "O vidro com lantânio desvia muito a luz e espalha pouco as cores, por isso é usado em lentes de câmera de qualidade."],
    ["Oxyde_de_lanthane_en_poudre.jpg", "Óxido de lantânio em pó", "O óxido de lantânio é um pó branco. O lantânio também está nas baterias de carros híbridos."],
  ],
  Nd2O3: [
    ["Neodymium_glass_light_bulb_under_fluorescent_and_incandescent_light.jpg", "Vidro com neodímio muda de cor com a luz", "O vidro com neodímio muda de cor conforme a luz: lilás na luz de lâmpada comum e azulado na luz fluorescente."],
    ["Neodymium_oxide_sample_(cropped).jpg", "Óxido de neodímio em pó", "O óxido de neodímio é um pó azul-acinzentado. O neodímio metálico é usado nos ímãs mais fortes que existem."],
    ["Wazon_szklany_Železný_Brod_Šklo_proj._M._Klinger_szkło_neodymowe.jpg", "Vaso de vidro com neodímio", "Vasos de vidro com neodímio parecem mudar de cor quando são levados de um ambiente para outro."],
  ],
  Ta2O5: [
    ["Tantalum_capacitors.jpg", "Capacitores de tântalo", "Nos capacitores de tântalo, uma película finíssima de pentóxido de tântalo isola as placas. Isso guarda muita carga num componente pequeno."],
    ["Tantal-P1100196c.jpg", "Vários tipos de capacitores", "Celulares e computadores usam capacitores de tântalo. O minério do tântalo, o coltan, vem sobretudo da África central."],
  ],
  OsO4: [
    ["Fingerprint_Developed_Using_Magnetic_Powder.jpg", "Impressão digital revelada com pó", "O tetróxido de ósmio escurece a gordura e já foi usado para revelar impressões digitais. Hoje se usam pós, como nesta foto, porque ele é muito tóxico."],
    ["Osmium_tetroxide.jpg", "Ampola de tetróxido de ósmio", "O tetróxido de ósmio evapora fácil e tem cheiro forte. O nome ósmio vem do grego osme, \"cheiro\"."],
  ],
  KAuC2N2: [
    ["Gold-plated_electrical_connectors.jpg", "Peças banhadas a ouro (o banho usa dicianoaurato de potássio)", "No banho de ouro, uma corrente elétrica faz o ouro do dicianoaurato de potássio se depositar sobre a peça. Conectores elétricos recebem esse banho para não oxidar."],
    ["Rekonstrukce_Staroměstské_radnice_1AAI6179.jpg", "Objetos banhados a ouro", "Uma camada de ouro de poucos micrômetros deixa a peça dourada e resistente à corrosão."],
  ],
  Bi2Te3: [
    ["Peltierelement_16x16.jpg", "Pastilha termoelétrica (Peltier) de telureto de bismuto", "Na pastilha Peltier, a corrente elétrica leva calor de um lado para o outro: um lado esfria e o outro esquenta. Ela é usada em mini geladeiras."],
    ["Tellurobismuthite-724040.jpg", "Telurobismutita, o mineral", "A telurobismutita é o telureto de bismuto da natureza e forma placas moles e brilhantes."],
    ["Монокристалл_теллурида_висмута.jpg", "Barra de telureto de bismuto", "O telureto de bismuto também faz o inverso: com um lado quente e outro frio, ele gera eletricidade."],
  ],
  B2O3: [
    ["Pyrex_and_PYREX.jpg", "Vidro refratário de cozinha (borossilicato)", "O vidro de borossilicato tem óxido de boro e quase não dilata com o calor, por isso aguenta ir do forno à mesa sem rachar."],
    ["Equipment_and_glassware.jpg", "Vidraria de laboratório de borossilicato", "Béqueres e tubos de ensaio são de vidro de borossilicato porque aguentam aquecimento direto."],
    ["B2O3powder.JPG", "Óxido de boro em pó", "O óxido de boro é um sólido branco que forma vidro sozinho quando derretido e resfriado."],
  ],
  B4C: [
    ["Ranger_Body_Armor_-_SAPI_plates.jpg", "Placas de colete à prova de bala", "O carbeto de boro é um dos materiais mais duros e leves que existem. Ele é usado em placas de coletes à prova de bala."],
    ["Boron_carbide.JPG", "Carbeto de boro", "O carbeto de boro é um pó preto, usado para lixar e polir materiais muito duros."],
    ["Boron_carbide_pellets.jpg", "Peças de carbeto de boro", "O boro absorve nêutrons, por isso peças de carbeto de boro controlam a reação em reatores nucleares."],
  ],
  CaTiO3: [
    ["Perovskite-155026.jpg", "Cristal de perovskita", "A perovskita foi descoberta nos Montes Urais, na Rússia, em 1839. O nome homenageia o mineralogista Lev Perovski."],
    ["Perovskite_solar_cell.jpg", "Célula solar de perovskita", "\"Perovskita\" também é o nome de materiais com o mesmo arranjo de átomos. Alguns deles formam células solares baratas e eficientes."],
    ["Perovskite_-_Perovskite_Hill,_Magnet_Cove,_Hot_Spring_Co,_Arkansas,_USA.jpg", "Cristal de perovskita", "Cristais de perovskita costumam ter forma de cubo, com brilho metálico."],
  ],
  CaWO4: [
    ["Scheelite-184002.jpg", "Scheelita brilhando sob luz ultravioleta", "Sob luz ultravioleta, a scheelita brilha azul-clara. Os mineiros procuram minério de tungstênio com lanternas UV."],
    ["Scheelite-67811.jpg", "Cristal de scheelita", "A scheelita é um dos principais minérios de tungstênio, o metal com o maior ponto de fusão."],
    ["Scheelite-224167.jpg", "Scheelita com mica", "A scheelita é bem pesada para um mineral claro, por causa do tungstênio."],
  ],
  CaN2O6: [
    ["Cherry-Tomatoes-Greenhouse-Sitia-Crete-Greece-3.jpg", "Estufa de tomates adubada com nitrato de cálcio", "O nitrato de cálcio dá nitrogênio e cálcio às plantas e é muito usado em estufas e hidroponia."],
    ["Dusičnan_vápenatý.JPG", "Nitrato de cálcio puro", "O nitrato de cálcio é um sal branco que absorve muita umidade do ar."],
    ["Calcium_Ammonium_Nitrate_Pellets.png", "Nitrato de cálcio em grânulos", "Em grânulos, o nitrato de cálcio é fácil de espalhar e se dissolve rápido na água de rega."],
  ],
  KHCO3: [
    ["Potassium_bicarbonate_purple-K.jpg", "Extintor de pó químico (bicarbonato de potássio)", "O bicarbonato de potássio é o pó \"Purple-K\" de extintores. Ele apaga incêndios de combustíveis, como os de aeroportos."],
    ["Hydrogenuhličitan_draselný.JPG", "Bicarbonato de potássio puro", "O bicarbonato de potássio também é usado como fermento químico e para ajustar a acidez de vinhos."],
  ],
  Na2SiO3: [
    ["Chemical_garden_-_UFCH_JH_(2020).jpg", "“Jardim químico” feito com silicato de sódio", "No jardim químico, sais de metais colocados em silicato de sódio formam tubos coloridos que crescem para cima."],
    ["Chemical_garden_9158_Nevit.jpg", "Jardim químico crescendo", "Os tubos crescem porque a água entra por uma membrana de silicato e a rompe, formando novos brotos."],
    ["Sodium_silicate.JPG", "Silicato de sódio em pó", "O silicato de sódio dissolvido em água forma o \"vidro líquido\", usado como cola e para vedar concreto."],
  ],
  NaBO3: [
    ["Plastic_spoon_n_Laundry_detergent_n_Washing_powder_in_white.jpg", "Sabão em pó com perborato de sódio", "O perborato de sódio libera água oxigenada na água quente e ajuda a branquear as roupas."],
    ["Bocasan_dental_rinse_front.JPG", "Enxaguante bucal com perborato", "Alguns enxaguantes bucais usam perborato de sódio: o oxigênio liberado ajuda a limpar feridas na boca."],
  ],
  CF4: [
    ["Etchedwafer.jpg", "Bolacha de silício: o CF₄ é usado para gravar chips", "Nas fábricas de chips, o tetrafluormetano forma um plasma que grava os circuitos microscópicos no silício."],
    ["Wafer_20110212.jpg", "Chips gravados em uma bolacha", "Uma bolacha (wafer) de silício tem centenas de chips. O CF₄ é um gás de efeito estufa que dura dezenas de milhares de anos no ar."],
  ],
  CHClF2: [
    ["LG_AIR_CONDITIONER_OUTDOOR_UNIT,_Panasonic_AIR_CONDITIONER_OUTDOOR_UNIT,_National_(Panasonic)_AIR_CONDITIONER_OUTDOOR_UNIT_&_DAIKIN_AIR_CONDITIONER_OUTDOOR_UNIT.jpg", "Aparelhos de ar-condicionado antigos usavam R-22", "O R-22 foi o gás mais usado em aparelhos de ar-condicionado por décadas. Ele danifica o ozônio e foi substituído."],
    ["Stara_jeklenka_R-22.jpg", "Cilindro de gás refrigerante R-22", "A produção de R-22 está sendo encerrada no mundo pelo Protocolo de Montreal."],
  ],
  C2HBrClF3: [
    ["Halothane_container.jpg", "Vaporizador de anestesia com halotano", "O halotano foi um anestésico inalado muito usado a partir de 1956. O vaporizador mistura a dose certa dele ao oxigênio."],
    ["Fluothane_packaging_01.jpg", "Frasco antigo de halotano", "O halotano não pega fogo, ao contrário do éter usado antes. Hoje ele foi quase todo substituído por anestésicos mais seguros."],
  ],
  C2H4O3: [
    ["Sugarcane_jbi_gallery.jpg", "Cana-de-açúcar contém ácido glicólico", "O ácido glicólico existe na cana-de-açúcar e em frutas verdes. Ele é o menor dos alfa-hidroxiácidos."],
    ["Glycolic_Acid.jpg", "Ácido glicólico puro", "Em cremes e peelings, o ácido glicólico solta as células mortas da pele."],
  ],
  C3H4O2: [
    ["Haltern_am_See,_Lavesum,_Künstlerhof,_Acrylfarbe_--_2021_--_5730.jpg", "Tintas acrílicas", "As tintas acrílicas são feitas de polímeros do ácido acrílico e seus ésteres. Elas se diluem em água e secam formando um filme plástico."],
    ["Pyrrole_Red_Dab.JPG", "Tinta acrílica vermelha", "Depois de seca, a tinta acrílica fica resistente à água, porque as partículas do polímero se fundem."],
  ],
  Sc2O3: null,
  LiNbO3: [
    ["Lithium_niobate_crystal.jpg", "Cristal de niobato de lítio", "O niobato de lítio muda a forma como a luz passa quando recebe uma voltagem. Ele é usado em chips que enviam dados por fibra óptica."],
    ["Lithium_Niobate_Wafer.jpg", "Bolacha de niobato de lítio", "Bolachas de niobato de lítio são usadas nos filtros que separam as frequências nos celulares."],
  ],
  NaTcO4: [
    ["ADAC_Laboratories_Vertex_MCD_gamma_camera_with_automatic_exchanger.jpg", "Gama-câmara: exames com tecnécio-99m", "O tecnécio-99m é o radioisótopo mais usado em medicina. A gama-câmara capta a radiação dele e forma imagens dos órgãos."],
    ["First_technetium-99m_generator_-_1958.jpg", "Gerador de tecnécio", "O gerador de tecnécio guarda molibdênio-99, que decai em tecnécio-99m. O hospital tira o pertecnetato do gerador, como se ordenhasse uma vaca."],
    ["BoneScanOfAHand256x256x8Bits.png", "Cintilografia óssea da mão", "Na cintilografia óssea, o tecnécio se acumula onde o osso está se renovando e mostra fraturas, inflamações ou tumores."],
  ],
  Pm2O3: [
    ["Luminescent_paint_pigment_applied_on_a_diver’s_watch_to_make_it_readable_in_low_light_conditions..jpg", "Relógio com ponteiros luminosos (antes se usava promécio)", "Depois do rádio, alguns relógios usaram promécio-147 nos ponteiros luminosos. Hoje se usa aluminato de estrôncio, que não é radioativo."],
    ["Promethium_(Element_-_61)_2.jpg", "Frasco com promécio-147", "Todo promécio é radioativo, por isso ele quase não existe na natureza. O usado é produzido em reatores nucleares."],
  ],
  SmCo5: [
    ["Alnico_magnet_assortment.jpg", "Ímãs permanentes", "Os ímãs de samário-cobalto são muito fortes e aguentam calor sem perder o magnetismo. Estes da foto são de outra liga, o alnico."],
    ["Ross_Headphones.jpg", "Fones de ouvido: cada lado tem um ímã", "Fones de ouvido e alto-falantes precisam de ímãs fortes. Alguns usam samário-cobalto, que mantém o magnetismo mesmo quentes."],
  ],
  Gd2O2S: [
    ["Roentgenfilmkassette_offen.jpg", "Tela intensificadora de raio X", "Nas telas intensificadoras, o oxissulfeto de gadolínio brilha quando recebe raios X. A luz marca o filme, e o paciente recebe menos radiação."],
    ["X-ray_apparatus_-_complete_outfits_and_accessories_for_X-ray_laboratories_(1908)_(14776800543).jpg", "Radiografia do tórax", "Os aparelhos de raio X evoluíram muito. Hoje, detectores digitais com oxissulfeto de gadolínio ou iodeto de césio substituíram o filme."],
  ],
  Dy2O3: [
    ["Dy2O3powder.jpg", "Óxido de disprósio", "O óxido de disprósio é um pó branco-amarelado. Ele é usado em lâmpadas de iodetos metálicos e em lasers."],
    ["Dy_chips.jpg", "Disprósio metálico", "Um pouco de disprósio nos ímãs de neodímio os faz aguentar o calor dos motores de carros elétricos e turbinas eólicas."],
  ],
  Ho2O3: [
    ["Holmium(III)_oxide.jpg", "Óxido de hólmio (muda de cor com a luz)", "O óxido de hólmio muda de cor: amarelo-claro na luz do dia e rosa sob luz fluorescente."],
    ["Holmium_oxide_glass_plate.jpg", "Filtro de vidro com hólmio para calibrar aparelhos", "O vidro com óxido de hólmio absorve cores muito precisas. Laboratórios o usam para conferir se os espectrofotômetros medem certo."],
  ],
  Er2O3: [
    ["Erbium(III)_oxide_sample_(cropped).jpg", "Óxido de érbio (rosa)", "O óxido de érbio é um pó rosa. Ele é usado para colorir vidros e esmaltes."],
    ["Mine_Vessel_-_DPLA_-_7118080c787ca92522ab139920cabddb_(page_3).jpg", "Vidro rosa colorido com érbio", "O érbio dá cor rosa ao vidro. Nas fibras ópticas, ele amplifica a luz que leva os dados da internet."],
  ],
  Tm2O3: null,
  Lu2SiO5: [
    ["FZU_scintillators_1.jpg", "Cristal cintilador brilhando", "Cristais com lutécio brilham quando a radiação gama os atravessa. Esse brilho é o que os detectores contam."],
    ["Uh_Oh_GSS.jpg", "Imagens de PET do cérebro", "Os aparelhos de PET usam cristais de silicato de lutécio para captar a radiação de um açúcar marcado e mostrar o cérebro funcionando."],
  ],
  Re2O7: [
    ["Rhenium_heptoxide.png", "Heptóxido de rênio (cristais amarelos)", "O heptóxido de rênio forma cristais amarelos que puxam a umidade do ar. Ele é usado para fazer catalisadores de rênio."],
    ["Rhenium_single_crystal_bar_and_1cm3_cube.jpg", "Rênio metálico", "O rênio é um dos metais mais raros da crosta terrestre. Ele resiste muito ao calor e é usado em turbinas de avião."],
  ],
  Tl2SO4: null,
  Cm2O3: [
    ["PIA16160-Mars_Curiosity_Rover-APXS.jpg", "Espectrômetro do robô Curiosity em Marte: usa cúrio", "O espectrômetro APXS do Curiosity tem uma fonte de cúrio-244. A radiação dele faz as rochas de Marte emitirem raios X que revelam os elementos."],
    ["MER_APXS_PIA05113.jpg", "Espectrômetro de raios X com fonte de cúrio", "Os jipes Spirit e Opportunity também levavam espectrômetros com cúrio."],
    ["Back_of_Sojourner_and_its_Alpha_Proton_X-Ray_Spectrometer.png", "Robô Sojourner, que também levava cúrio", "O Sojourner, primeiro jipe em Marte (1997), já levava um espectrômetro com cúrio para analisar as pedras."],
  ],
  Cf2O3: [
    ["Metal_pellets_of_californium-252(cropped).jpg", "Fontes de nêutrons de califórnio-252", "O califórnio-252 emite muitos nêutrons. Pequenas pastilhas dele ligam reatores nucleares e ajudam a achar petróleo e ouro."],
    ["Californium_(Element_-_98)_2.jpg", "Primeira amostra de um composto de califórnio (1950)", "O califórnio foi criado em 1950 em Berkeley e batizado em homenagem à Califórnia. Ele é um dos elementos mais caros do mundo."],
  ],
  LaB6: [
    ["LaB6HotCathode.jpg", "Cátodo de hexaboreto de lantânio", "Aquecido, o hexaboreto de lantânio solta muitos elétrons. Por isso ele é usado como fonte de elétrons."],
    ["Scanning_electron_microscope_-_UFCH_JH_(2020)_01.jpg", "Microscópio eletrônico que usa esse cátodo", "Os microscópios eletrônicos usam feixes de elétrons em vez de luz e mostram detalhes milhares de vezes menores que um fio de cabelo."],
  ],
  Ca3SiO5: [
    ["Portland_Cement_Bags.jpg", "Sacos de cimento: o silicato tricálcico é o principal componente", "O cimento Portland é feito de calcário e argila aquecidos a cerca de 1.450 °C. O silicato tricálcico é seu principal componente."],
    ["Reinforced_concrete_rusted_rebars_german_bunkers_Pointe_du_Hoc.jpg", "Concreto", "Com água, o silicato tricálcico forma cristais que endurecem o concreto. Nas primeiras semanas, ele dá a maior parte da resistência."],
  ],
  NaBH4: [
    ["Sodium_borohydride.jpg", "Boroidreto de sódio", "O boroidreto de sódio é um pó branco que fornece hidrogênio em reações. É usado para fazer remédios e para branquear papel."],
  ],
  RfCl4: [
    ["RIAN_archive_612388_Joint_Institute_for_Nuclear_Research_in_Dubna_hosts_seminar_on_Physics_on_Large_Hadron_Collider.jpg", "Acelerador onde o rutherfórdio é produzido (Dubna, Rússia)", "O rutherfórdio é produzido átomo por átomo em aceleradores, como em Dubna. Mesmo assim, já se estudou que ele forma o tetracloreto."],
  ],
  DbOCl3: [
    ["Dubna_Stele_Dubnium.jpg", "Dubna, cidade russa que deu nome ao dúbnio", "O dúbnio recebeu o nome da cidade de Dubna, na Rússia, onde fica um dos grandes laboratórios que criam elementos superpesados."],
    ["Г.Дубна,_Московская_обл.,_Россия._-_panoramio_-_Oleg_Yu.Novikov_(2).jpg", "Instituto Conjunto de Pesquisa Nuclear, em Dubna", "No Instituto Conjunto de Pesquisa Nuclear, em Dubna, foram descobertos vários elementos, incluindo o oganessônio."],
  ],
  BhO3Cl: [
    ["Luftbild_PSI_Mai_2016.jpg", "Instituto Paul Scherrer, na Suíça, onde a química do bóhrio foi estudada", "Em 2000, com só seis átomos de bóhrio, pesquisadores no Instituto Paul Scherrer mostraram que ele forma oxicloreto como o rênio."],
    ["GSI-Darmstadt-Südbau.jpg", "GSI, na Alemanha, onde o bóhrio foi criado", "O bóhrio foi criado em 1981 no GSI, em Darmstadt. O nome homenageia o físico Niels Bohr."],
  ],
  HsO4: [
    ["GSI-Darmstadt-Südbau.jpg", "GSI, na Alemanha, onde o hássio foi criado", "O hássio foi criado em 1984 no GSI. O nome vem de Hesse, o estado alemão onde fica o laboratório."],
    ["GSI,_Darmstadt,_Juli_2015_(32).JPG", "Detector do GSI", "Em 2001, poucos átomos de hássio formaram tetróxido, como o ósmio, provando que ele segue o padrão da tabela."],
  ],
  Pa2O5: [
    ["Protactinium_(Element_-_91)_2.jpg", "Protactínio", "O protactínio é raro e muito radioativo. Uma das primeiras amostras purificadas, em 1961, tinha cerca de 125 gramas e custou anos de trabalho."],
    ["Uraninite_w11.JPG", "Uraninita, o minério onde há traços de protactínio", "A uraninita tem traços de protactínio, que vem do decaimento do urânio-235: menos de 1 grama por tonelada de minério."],
  ],
  C3H6O: [
    ["Nail_polish_remover.jpg", "Removedor de esmalte (acetona)", "A acetona dissolve esmaltes e colas e evapora rápido. O corpo também produz um pouco dela quando queima gordura."],
    ["Colourful_nail_polishes.jpg", "Esmaltes de unha", "O esmalte seca porque o solvente evapora e deixa uma película de polímero colorido na unha."],
    ["Sample_of_Acetone.jpg", "Acetona pura", "A acetona é um líquido incolor de cheiro adocicado. Ela pega fogo com facilidade."],
  ],
  C2H5NO2: [
    ["2019-10-10_22_15_43_Gelatin_from_a_single_opened_cup_of_Jell-O_strawberry_gelatin_snack_being_lifted_by_a_spoon_in_the_Franklin_Farm_section_of_Oak_Hill,_Fairfax_County,_Virginia.jpg", "Gelatina: o colágeno é rico em glicina", "A gelatina vem do colágeno, uma proteína que tem glicina em cerca de um terço de suas posições."],
    ["Glycine_crystals.jpg", "Cristais de glicina", "A glicina é o aminoácido mais simples. Ela tem sabor adocicado, e o nome vem do grego glykys, \"doce\"."],
  ],
  C6H6: [
    ["Anacortes_Refinery_31911.JPG", "Refinaria de petróleo, de onde vem o benzeno", "O benzeno é separado do petróleo nas refinarias e usado para fazer plásticos, borrachas e fibras."],
    ["Benzol.JPG", "Benzeno em frasco antigo", "O benzeno é um líquido incolor de cheiro adocicado. Ele já foi usado como solvente, mas pode causar leucemia."],
  ],
  C3H6O3: [
    ["Joghurt.jpg", "Iogurte: bactérias produzem ácido lático", "No iogurte, bactérias transformam a lactose do leite em ácido lático, que deixa o leite azedo e espesso."],
    ["Home_made_sour_dough_bread.jpg", "Pão de fermentação natural", "O fermento natural tem bactérias que produzem ácido lático, que dá o sabor azedinho do pão."],
    ["Sprinter_relay_modern.jpg", "Músculos produzem ácido lático no esforço", "No esforço intenso, os músculos produzem lactato (a forma do ácido lático) para gerar energia rapidamente sem oxigênio."],
  ],
  Ca3P2O8: [
    ["Avahi4_perspective_noir.jpg", "Ossos são feitos de fosfato de cálcio", "Os ossos são feitos de fosfato de cálcio (hidroxiapatita) misturado com colágeno, que dá elasticidade."],
    ["Capybara_skeleton.jpg", "Esqueleto de animal", "O esqueleto da capivara, o maior roedor do mundo, é feito de fosfato de cálcio como o nosso."],
    ["Whitlockite-5b-whitlockite.jpg", "Whitlockita, um mineral de fosfato de cálcio", "A whitlockita é um fosfato de cálcio natural. Ela também aparece em pedras nos rins e em meteoritos."],
  ],
  C4H10: [
    ["The_Green_Lighter_1_cropped.jpg", "Isqueiro a gás butano", "Dentro do isqueiro, o butano fica líquido por causa da pressão. Ao abrir a válvula, ele vira gás e pega fogo."],
    ["Utilization_of_A_gas_cartridge_camping_stove.jpg", "Fogareiro de camping a butano", "O butano é o combustível dos fogareiros de camping. Mas no frio forte ele quase não evapora."],
    ["Photo_D2.jpg", "Latas de gás butano", "As latas de gás têm butano líquido sob pressão. O gás de cozinha (GLP) é uma mistura de butano e propano."],
  ],
  C3H8O3: [
    ["Soap_and_sachets.jpg", "Sabonete de glicerina", "A glicerina sai como subproduto da fabricação de sabão. Ela segura a umidade e deixa os sabonetes transparentes e suaves."],
    ["Sample_of_Glycerine.jpg", "Glicerina pura", "A glicerina é um líquido grosso, doce e incolor, usado em cremes, alimentos e remédios."],
    ["Thin_Film_Interference_Soap_Bubble.jpg", "Bolha de sabão: glicerina deixa a bolha mais resistente", "Um pouco de glicerina na água com sabão faz a bolha evaporar mais devagar e durar mais."],
  ],
  C8H18: [
    ["MA.SS._2018-08-15_filling-station_1415_3x2-R_5K.jpg", "Posto de combustível: gasolina tem octano", "A gasolina é uma mistura de hidrocarbonetos. A \"octanagem\" compara a resistência dela à detonação com a do iso-octano."],
    ["Shell_petrol_pump_1952.jpg", "Bomba de gasolina antiga", "As bombas antigas mostravam a gasolina num cilindro de vidro, para o cliente ver o que comprava."],
  ],
  C10H16: [
    ["Oranges_-_whole-halved-segment.jpg", "Laranjas: a casca tem limoneno", "A casca da laranja tem óleo rico em limoneno, que dá o cheiro cítrico."],
    ["NIH_citrus.jpg", "Frutas cítricas", "O limoneno está em limões, laranjas e tangerinas. Ele é usado em perfumes e produtos de limpeza."],
    ["Zesting_an_orange.jpg", "Raspas de casca de laranja", "Ao raspar a casca, as glândulas de óleo se rompem e soltam o limoneno."],
  ],
  PtCl2N2H6: [
    ["R-CHOP_infusion_(R,C,H,O_components).jpg", "Quimioterapia na veia", "A cisplatina é aplicada na veia e trata vários tipos de câncer. A platina dela se liga ao DNA das células e impede que se multipliquem."],
  ],
  C3H8O: [
    ["Rubbing_Alcohol_(51013600587).jpg", "Álcool isopropílico", "O álcool isopropílico evapora rápido e não deixa resíduo. Ele é usado para limpar telas, lentes e peças eletrônicas."],
    ["Rubbing_alcohol_Niitaka.jpg", "Álcool em gel", "O álcool isopropílico a cerca de 70% desinfeta a pele e superfícies."],
  ],
  C2H6O2: [
    ["Engine_coolant.jpg", "Fluido de arrefecimento do radiador tem etilenoglicol", "O etilenoglicol abaixa o ponto de congelamento e aumenta o de ebulição da água do radiador. Ele é doce e muito tóxico."],
    ["Antifreeze_in_the_radiator.jpg", "Reservatório do radiador", "O fluido do radiador costuma ter corante para que se perceba um vazamento."],
  ],
  C4H8O2: [
    ["Colourful_nail_polishes.jpg", "Esmaltes: o solvente é acetato de etila", "Muitos esmaltes usam acetato de etila como solvente. Ele evapora rápido e deixa a camada colorida na unha."],
    ["Nail_polish_remover.jpg", "Removedor de esmalte", "Alguns removedores sem acetona usam acetato de etila. Ele tem cheiro de fruta e também aparece em vinhos e frutas."],
  ],
  C7H8: [
    ["Thinner_premium,_in_bottle.jpg", "Thinner para tintas leva tolueno", "O tolueno é um solvente que dissolve tintas e colas. Respirar os vapores faz mal à saúde."],
  ],
  C8H8: [
    ["Flickr_-_cyclonebill_-_Kaffe_(13).jpg", "Copo de isopor (poliestireno, feito de estireno)", "O isopor é poliestireno expandido: cerca de 98% do volume é ar preso em bolhas, por isso é leve e isola o calor."],
    ["Expanded_polystyrene_foam_dunnage.jpg", "Embalagem de isopor", "O isopor protege objetos frágeis no transporte. Ele demora séculos para se decompor, mas pode ser reciclado."],
    ["Polistirolo.JPG", "Isopor de perto", "De perto, dá para ver as bolinhas de poliestireno expandido grudadas umas nas outras."],
  ],
  C6H6O: [
    ["Phenol_2_grams.jpg", "Cristais de fenol", "O fenol forma cristais incolores que ficam rosados com o tempo. Ele é usado para fazer plásticos e remédios."],
    ["Bottle_of_Phenol.jpg", "Frasco antigo de ácido fênico (antisséptico)", "Em 1867, Joseph Lister usou ácido fênico (fenol) para limpar feridas e instrumentos e diminuiu muito as infecções nas cirurgias."],
  ],
  C3H7NO2: [
    ["Drying_the_cotton_silk_fabric.jpg", "Fios de seda secando: a seda é rica em alanina", "A seda é feita sobretudo de glicina e alanina, que formam cadeias bem arrumadas e dão o brilho e a resistência do fio."],
  ],
  C7H6O: [
    ["Almonds_-_in_shell,_shell_cracked_open,_shelled,_blanched.jpg", "Amêndoas: o aroma vem do benzaldeído", "O aroma de amêndoa vem do benzaldeído. Ele é usado em essências de amêndoa e em doces como o marzipã."],
    ["Almond_with_two_kernels.jpg", "Amêndoa amarga", "As amêndoas amargas têm amigdalina, que se quebra em benzaldeído e cianeto. Por isso só as doces são vendidas para comer."],
  ],
  C7H6O3: [
    ["Thomé_Salix_alba_clean.jpg", "Salgueiro: o ácido salicílico foi descoberto na sua casca", "Desde a Antiguidade, a casca do salgueiro era usada contra dor e febre. Dela veio o ácido salicílico e, depois, a aspirina."],
    ["Salicylic_acid_1.jpg", "Cristais de ácido salicílico", "O ácido salicílico solta a camada de células mortas da pele. Ele é usado em remédios contra acne e verrugas."],
  ],
  C9H8O: [
    ["Baton_de_cannelle.jpg", "Canela em pau", "A canela em pau é a casca enrolada da caneleira. O cinamaldeído dá a ela o cheiro e o gosto."],
    ["Cinnamomum_verum_-_Köhler–s_Medizinal-Pflanzen-182.jpg", "Planta da canela", "O óleo da casca da caneleira tem mais de 60% de cinamaldeído."],
    ["Gewuerze_004_2024_08_10.jpg", "Canela, anis-estrelado e cravo", "Cada especiaria tem seu aroma principal: o cinamaldeído na canela, o anetol no anis-estrelado e o eugenol no cravo."],
  ],
  C10H8: [
    ["Naftalen.jpg", "Bolinhas de naftalina", "As bolinhas de naftalina passam aos poucos de sólido a gás (sublimam). O cheiro forte espanta traças, mas os vapores são tóxicos."],
    ["Naphthalene.jpg", "Cristais de naftaleno", "O naftaleno forma cristais brancos e brilhantes. Ele é o hidrocarboneto aromático mais simples com dois anéis."],
  ],
  C10H12O2: [
    ["ClovesDried.jpg", "Cravos-da-índia: o aroma é o eugenol", "O cravo-da-índia é o botão seco da flor. Cerca de 80% do seu óleo é eugenol."],
    ["The_flowers_of_clove_tree_in_Pemba_island.JPG", "Árvore do cravo-da-índia", "O craveiro é uma árvore originária das Ilhas Molucas, na Indonésia. Zanzibar e Pemba também são grandes produtoras."],
    ["Seasonal_clove_buds_drying_on_Pemba1.jpg", "Cravos secando ao sol", "Os botões são colhidos antes de abrir e secam ao sol até ficarem marrom-escuros. O eugenol também é usado por dentistas como anestésico leve."],
  ],
  C7H14O2: [
    ["Bananas_on_black_background_02.jpg", "Bananas: o cheiro vem do acetato de isoamila", "O acetato de isoamila tem cheiro forte de banana. Ele é usado em balas e refrigerantes com sabor da fruta."],
    ["Cavendish_banana_from_Maracaibo.jpg", "Cachos de banana", "Bananas maduras produzem acetato de isoamila. As abelhas também o soltam como sinal de alarme."],
    ["Isopentyl_acetate.jpg", "Acetato de isoamila puro", "O acetato de isoamila é um éster, um tipo de substância que costuma ter cheiro de fruta."],
  ],
  C4H4N2O2: null,
  C4H5N3O: [
    ["Brno_Kralovopolska_135_plastika.jpg", "Escultura de DNA", "O DNA guarda a informação genética numa sequência de quatro bases: adenina, timina, citosina e guanina."],
    ["DNA_double_helix_horizontal.png", "Modelo de DNA: a citosina é uma das quatro bases", "A citosina sempre pareia com a guanina, com três ligações de hidrogênio entre elas."],
  ],
  C5H5N5: [
    ["Dna-helix.jpg", "Modelo de DNA com os átomos coloridos", "A adenina é uma das quatro bases do DNA. Ela também faz parte do ATP, a molécula que guarda energia nas células."],
    ["DNA_Furchen.png", "DNA: a adenina pareia com a timina", "No DNA, a adenina pareia sempre com a timina, com duas ligações de hidrogênio."],
  ],
  C5H6N2O2: [
    ["Dna-163466.jpg", "Dupla hélice do DNA", "A timina só existe no DNA. No RNA, ela é substituída pela uracila."],
    ["DNA_Visual_Representation_of_Double-Helix.png", "Modelo de DNA", "As duas fitas do DNA giram uma em volta da outra. A estrutura foi descrita em 1953 por Watson e Crick, com dados de Rosalind Franklin."],
  ],
  C5H5N5O: [
    ["Fish_scales.jpg", "Escamas de peixe brilham por causa de cristais de guanina", "O brilho prateado das escamas de muitos peixes vem de cristais de guanina, que refletem a luz como pequenos espelhos."],
    ["Red_fluorescence_in_Pseudocheilinus_evanidus.jpeg", "Peixe de recife com pele brilhante", "Vários peixes têm cristais de guanina na pele e nos olhos, que refletem a luz e criam cores e brilhos."],
    ["Harengula_jaguana.jpg", "Arenque, peixe de escamas prateadas", "As escamas brilhantes do arenque já foram usadas para fazer \"essência de pérola\", o brilho de pérolas falsas."],
    ["Larus_michahellis_atlantis_at_Playa_del_Confital_(47206133632)_2_March_2019.jpg", "Guano de aves, onde a guanina foi descoberta", "A guanina foi achada primeiro no guano, o acúmulo de fezes de aves marinhas. Daí vem o nome."],
  ],
  C8H11NO2: [
    ["Brain_MRI_0145_02.jpg", "Ressonância do cérebro: a dopamina é um mensageiro dos neurônios", "A dopamina é um mensageiro químico do cérebro, ligado ao movimento e à motivação. No Parkinson, faltam os neurônios que a produzem."],
    ["Dopamine_HCl.JPG", "Dopamina usada como remédio", "Na UTI, a dopamina é aplicada na veia para aumentar a pressão e a força do coração."],
  ],
  C3H5N3O9: [
    ["Nitroglycerin_(1).JPG", "Comprimidos de nitroglicerina para o coração", "Um comprimido de nitroglicerina debaixo da língua alivia a dor no peito (angina): ela libera óxido nítrico, que dilata os vasos."],
    ["Nitro.JPG", "Spray de nitroglicerina", "O spray de nitroglicerina age em poucos minutos e é usado em crises de angina."],
    ["Nitroglycerin_AB_dynamite_heater,_TM38053_-_Tekniska_museet_-_Stockholm,_Sweden_-_DSC01601.JPG", "Aquecedor antigo de dinamite", "A nitroglicerina congela a 13 °C, e a dinamite congelada era perigosa de manusear. Por isso existiam aquecedores para descongelá-la."],
  ],
  C7H8N4O2: [
    ["Green_and_Black's_dark_chocolate_bar_2.jpg", "Chocolate: a teobromina vem do cacau", "A teobromina é parecida com a cafeína e dá o leve amargor do chocolate. Ela é tóxica para cães e gatos."],
    ["Theobroma_cacao_MHNT.BOT.2004.0.204.jpg", "Fruto do cacau aberto", "As sementes ficam dentro do fruto do cacau, envoltas por uma polpa doce."],
    ["Cocoa_beans_in_cocoa_pod_at_El_Trapiche,_Costa_Rica.jpg", "Sementes de cacau", "As sementes de cacau fermentam e secam antes de virar chocolate. O nome do cacaueiro, Theobroma, significa \"alimento dos deuses\"."],
  ],
  K2Cr2O7: [
    ["Potassium-dichromate-sample.jpg", "Dicromato de potássio", "O dicromato de potássio é um sal laranja e um forte oxidante. Ele é tóxico e pode causar câncer."],
    ["Potassium_dichromate_(synthetic).jpg", "Cristal de dicromato de potássio", "Os antigos bafômetros usavam dicromato: o álcool do hálito o fazia mudar de laranja para verde."],
  ],
  Al2S3O12: [
    ["The_coagulation_and_filtration_processes_at_a_drinking_water_treatment_plant._(14868618507).jpg", "Estação de tratamento de água: o sulfato de alumínio junta a sujeira", "No tratamento de água, o sulfato de alumínio faz a sujeira se juntar em flocos que afundam e são filtrados."],
    ["Aluminium_sulfate.jpg", "Sulfato de alumínio", "O sulfato de alumínio é um sal branco também usado na fabricação de papel e para tingir tecidos."],
  ],
  P4O10: [
    ["Desiccator.jpg", "Dessecador: o pentóxido de fósforo absorve umidade", "O pentóxido de fósforo absorve água com muita força, por isso é usado em dessecadores para manter amostras secas."],
    ["Sample_of_Phosphorus_pentoxide.jpg", "Pentóxido de fósforo em frasco", "Em contato com a água, o pentóxido de fósforo forma ácido fosfórico e solta muito calor."],
  ],
  NH4ClO4: [
    ["SLS_FSB1_test_booster.jpg", "Teste de motor de foguete com perclorato de amônio", "Os foguetes auxiliares do ônibus espacial e do SLS queimam propelente sólido com cerca de 70% de perclorato de amônio."],
    ["Space_Shuttle_Columbia_launching.jpg", "Lançamento do ônibus espacial", "Nos foguetes sólidos, o perclorato fornece o oxigênio e o alumínio em pó é o combustível. Tudo é misturado numa borracha."],
    ["Ammonium_perchlorate_100g.jpg", "Perclorato de amônio", "O perclorato de amônio é um pó branco e um forte oxidante. Ele também foi achado no solo de Marte."],
  ],
  Cu2CH2O5: [
    ["Tumble-polished_malachite_1.jpg", "Malaquita polida", "A malaquita é um carbonato de cobre. Polida, ela mostra faixas em vários tons de verde."],
    ["Malachite,_Zaire.jpg", "Malaquita bruta", "A malaquita se forma quando a água ataca minérios de cobre. No passado, ela era moída para fazer pigmento verde."],
    ["Malachitfalter,_Bambuspage,_Siproeta_stelenes_3.JPG", "Borboleta-malaquita, que tem o nome do mineral", "A borboleta-malaquita, das Américas, tem asas verdes parecidas com o mineral."],
  ],
  Na2B4O7: [
    ["Green_Slime_in_hand.JPG", "Geleca (slime) feita com bórax", "Na geleca, o bórax liga as cadeias da cola em uma rede, e a cola líquida vira uma massa elástica."],
    ["Borax_crystals.jpg", "Cristais de bórax", "O bórax forma cristais incolores e é usado em produtos de limpeza e como fundente na soldagem."],
    ["Hauling_Borax,_Death_Valley,_1904.jpg", "Trator antigo que transportava bórax no Vale da Morte", "No Vale da Morte, nos EUA, o bórax era levado por carroças puxadas por 20 mulas e, depois, por tratores a vapor."],
  ],
  C3H9N: [
    ["Oweston_sting_fish_for_sale_at_Tsukiji_Fishmarket,_Tokyo-30.jpg", "O cheiro de peixe vem da trimetilamina", "Os peixes do mar têm uma substância sem cheiro que, depois da pesca, bactérias transformam em trimetilamina, o cheiro de peixe."],
    ["Ensenada_fish_market_2.jpg", "Peixes no mercado", "Quanto mais trimetilamina, mais forte o cheiro. Isso ajuda a ver se o peixe está fresco."],
  ],
  C6H7N: [
    ["2,6-(iPr)2C6H3NH2sample.jpg", "Derivado de anilina em frascos", "A anilina e seus derivados são a base de corantes, remédios e espumas de poliuretano."],
    ["Aniline_purple.jpg", "Malva, o primeiro corante sintético, feito de anilina", "Em 1856, William Perkin, aos 18 anos, tentava fazer quinina e obteve a malva, o primeiro corante sintético."],
    ["Indigo_cake.jpg", "Corante índigo, produzido a partir de anilina", "O índigo do jeans era tirado de plantas. Desde 1897, é fabricado a partir de derivados da anilina."],
  ],
  C5H5N: [
    ["Pyridine_sample.jpg", "Piridina", "A piridina é um líquido de cheiro forte e desagradável, parecido com o do peixe. Ela é usada como solvente e para fazer remédios."],
    ["Dry_pyridine_(16743437002).jpg", "Frascos de piridina", "A piridina tem um anel como o do benzeno, mas com um átomo de nitrogênio. Ela absorve água do ar com facilidade."],
  ],
  C4H6: [
    ["Stack_of_tires_in_the_sun.jpg", "Pneus de borracha sintética feita de butadieno", "A borracha sintética dos pneus é feita sobretudo de butadieno e estireno."],
    ["DTM_Mercedes_W204_Lauda09_amk.jpg", "Carro de corrida", "Pneus de corrida misturam borrachas sintéticas e naturais para ter aderência e resistir ao calor."],
    ["Traktorreifen.jpg", "Pneu de trator", "Em pneus grandes, a borracha natural ainda é importante, mas o butadieno entra em quase todos."],
  ],
  C5H12: [
    ["Petroleum_ether.JPG", "Pentano em frasco", "O pentano evapora muito rápido. Ele faz parte do éter de petróleo, um solvente de laboratório."],
    ["Polyurethane_Products.png", "Peças de espuma expandidas com pentano", "O pentano é usado para expandir espumas plásticas: ele evapora dentro do material e forma as bolhas."],
  ],
  C6H14: [
    ["Soybean_Oil,_Meal_and_Beans_(10059732523).jpg", "Óleo de soja: o hexano extrai o óleo dos grãos", "O hexano dissolve o óleo dos grãos de soja moídos. Depois ele evapora e é reaproveitado, e o óleo fica."],
    ["Soybean_Oil_(10059657806).jpg", "Óleos vegetais", "Depois da extração, o óleo é refinado para tirar o resto do solvente e as impurezas."],
  ],
  C7H16: [
    ["Mature_Jeffrey_Pine.JPG", "Pinheiro de Jeffrey: sua resina tem heptano quase puro", "A resina do pinheiro de Jeffrey, da Califórnia, é quase só heptano. Por isso o tronco cheira a frutas."],
    ["Pinus_jeffreyi_kz06.jpg", "Ramos e pinhas do pinheiro de Jeffrey", "O heptano puro é o padrão \"zero\" da octanagem: ele detona facilmente no motor."],
  ],
  C6H12: [
    ["Cyclohexane.jpg", "Cicloexano em frasco", "O cicloexano é um anel de seis carbonos. Ele é usado sobretudo para fazer náilon."],
  ],
  C5H8: [
    ["Rubber_tapping_(48058).jpg", "Extração de látex da seringueira", "O látex da seringueira é feito de longas cadeias de isopreno, que formam a borracha natural."],
    ["Hevea_semillas2.jpg", "Sementes de seringueira", "A seringueira é nativa da Amazônia. No século XIX, a borracha fez o \"ciclo da borracha\" em Manaus e Belém."],
    ["Rubber_tapping_(76655).jpg", "Coleta de látex", "O seringueiro faz cortes finos na casca e o látex escorre para uma tigela."],
  ],
  C8H10: [
    ["Histologic_Slide_under_MIcroscope.jpg", "Lâmina de microscópio: o xileno é usado para preparar tecidos", "O xileno tira a gordura e a água dos tecidos antes de colocá-los na lâmina do microscópio."],
    ["Histology_of_Spleen.jpg", "Tecido corado visto no microscópio", "Os tecidos são cortados em fatias finíssimas, corados e protegidos com uma resina dissolvida em xileno."],
  ],
  C14H10: [
    ["Fluorescence_of_Anthracene_under_UV_light.jpg", "Antraceno brilhando sob luz ultravioleta", "O antraceno absorve luz ultravioleta e brilha azul. Ele é usado para detectar radiação."],
    ["Anthracen.jpg", "Cristais de antraceno sob luz UV", "Sob luz UV, cristais de antraceno brilham em azul-violeta."],
    ["Anthracene.jpg", "Cristais de antraceno", "O antraceno é um hidrocarboneto com três anéis de benzeno lado a lado. Ele vem do alcatrão de carvão."],
  ],
  C4H10O: [
    ["The_First_Operation_Under_Ether_-_Robert_Hinckley.jpg", "Primeira cirurgia com anestesia de éter, em 1846", "Em 16 de outubro de 1846, em Boston, William Morton fez a primeira demonstração pública de uma cirurgia com o paciente anestesiado com éter."],
    ["The_first_use_of_ether_in_dental_surgery,_1846._Ernest_Board._Wellcome_V0018140.jpg", "Pintura de anestesia com éter", "Antes da anestesia, as cirurgias eram feitas com o paciente acordado e precisavam ser muito rápidas."],
    ["Vinethene_vinyl_ether_for_anesthesia.png", "Frasco antigo de éter anestésico", "O éter evapora fácil e pega fogo com muita facilidade, por isso foi sendo trocado por anestésicos não inflamáveis."],
  ],
  C3H8O2: [
    ["Smoke_Machine_engineer.jpg", "Máquina de fumaça usa propilenoglicol", "Nas máquinas de fumaça de shows, o propilenoglicol é aquecido e forma uma névoa densa."],
    ["E-Cigarette-Electronic_Cigarette-E-Cigs-E-Liquid-Vaping-Cloud_Chasing_(16348040092).jpg", "Cigarros eletrônicos usam propilenoglicol", "Os líquidos dos cigarros eletrônicos têm propilenoglicol e glicerina, que viram aerossol ao serem aquecidos."],
    ["Layers_of_glycerine,_propylene_glycol,_ethylene_glycol_and_water.jpg", "Propilenoglicol puro", "O propilenoglicol é um líquido incolor e um pouco doce, usado em alimentos, remédios e cosméticos."],
  ],
  C6H14O6: [
    ["Sorbus_aucuparia_2022_G1.jpg", "Frutos da sorveira, ricos em sorbitol", "Os frutos da sorveira-brava deram nome ao sorbitol, achado neles em 1872."],
    ["5_gum_packages.JPG", "Chicletes sem açúcar usam sorbitol", "O sorbitol tem cerca de 60% da doçura do açúcar e não causa cáries. Em excesso, é laxante."],
  ],
  C5H12O5: [
    ["Xylitol_chewing_gums.jpg", "Chicletes com xilitol", "O xilitol é tão doce quanto o açúcar, mas as bactérias da boca não o usam, por isso ele ajuda a prevenir cáries."],
    ["Xylitol_crystals.jpg", "Cristais de xilitol", "Os cristais de xilitol dão sensação de frescor na boca porque absorvem calor ao se dissolver. Ele é tóxico para cães."],
  ],
  C2H6OS: [
    ["Sample_of_Dimethyl_sulfoxide_01.jpg", "Dimetilsulfóxido (DMSO)", "O DMSO atravessa a pele e leva outras substâncias junto. Logo depois, a pessoa sente gosto de alho na boca."],
    ["Crystals_of_dimethyl_sulfoxide-d6.jpg", "Cristais de DMSO congelado", "O DMSO congela a 19 °C e é usado para proteger células congeladas em laboratório."],
  ],
  C6H10OS2: [
    ["Garlic_bulbs_and_cloves.jpg", "Alho: a alicina se forma quando ele é cortado", "O alho inteiro quase não tem cheiro. Ao ser cortado ou amassado, uma enzima forma a alicina, que dá o cheiro forte."],
    ["Garlic_Bulbs_(Unsplash).jpg", "Cabeças de alho", "A alicina dura pouco e se transforma em outros compostos de enxofre, como os que deixam o hálito com cheiro de alho."],
  ],
  C3H6OS: [
    ["Onion_and_a_group_of_vegetables_on_a_cutting_board.jpg", "Cebola: cortá-la libera o gás que faz chorar", "Ao cortar a cebola, uma enzima forma um gás que chega aos olhos e os faz lacrimejar."],
    ["Chopped_onion_in_a_plate.jpg", "Cebola fatiada", "Cebola gelada ou uma faca bem afiada liberam menos desse gás."],
    ["Field_with_onions.jpg", "Plantação de cebolas", "As cebolas absorvem enxofre do solo. Esse enxofre é que forma o gás lacrimogêneo."],
  ],
  C4H5NS: [
    ["Senf-Variationen.jpg", "Mostardas: o ardido vem do isotiocianato de alila", "O isotiocianato de alila é o que arde na mostarda. Ele se forma quando as sementes moídas se misturam com água."],
    ["Eutrema-wasabia-japonica-wasabi.jpg", "Planta de wasabi", "O wasabi verdadeiro é a raiz desta planta japonesa. Ele arde por causa do isotiocianato de alila, que sobe pelo nariz."],
    ["Armoracia_rusticana.jpg", "Flores de raiz-forte", "A raiz-forte é muito mais barata que o wasabi, e boa parte do \"wasabi\" vendido é raiz-forte tingida de verde."],
  ],
  C3H6O2: [
    ["Emmental_(fromage)_01.jpg", "Queijo suíço (emmental)", "No queijo suíço, bactérias produzem ácido propanoico, que dá o sabor adocicado, e gás carbônico, que faz os furos."],
    ["Emmental_015.jpg", "Queijo emmental", "O ácido propanoico também é usado para conservar pães e queijos, porque impede o mofo."],
  ],
  C4H6O6: [
    ["Javier_shows_part_of_the_grape_harvest_in_his_Lysekil_vineyard_1_-_cropped.jpg", "Uvas são ricas em ácido tartárico", "O ácido tartárico é o principal ácido da uva. No vinho, ele pode formar cristais no fundo da garrafa, os \"diamantes do vinho\"."],
    ["CommercialTartaric.jpg", "Ácido tartárico puro", "O cremor tártaro, um sal desse ácido, é usado em confeitaria para firmar suspiros. Louis Pasteur estudou os cristais do ácido tartárico."],
  ],
  C4H5KO6: [
    ["Weinstein.jpg", "Cristais de tártaro na rolha de vinho", "No vinho frio, o bitartarato de potássio cristaliza e pode grudar na rolha. Esses cristais são inofensivos."],
    ["Potassium_hydrogen_tartrate_(1).JPG", "Cremor tártaro em pó", "O cremor tártaro é o mesmo sal, purificado. Ele firma claras em neve e entra em fermentos químicos."],
    ["Sigalas-Rabaud_1989_tartrate_crystals.jpg", "Cristais de tártaro no fundo da garrafa", "Os cristais de tártaro no fundo da garrafa são chamados de \"diamantes do vinho\". Não fazem mal: só se separam do líquido."],
  ],
  C4H6O5: [
    ["Green_apples_(Bangalore,_2026).jpg", "Maçãs verdes: o azedinho é ácido málico", "O ácido málico dá o azedinho da maçã verde. O nome vem do latim malum, \"maçã\"."],
    ["Sample_of_racemic_malic_acid.jpg", "Ácido málico puro", "O ácido málico é adicionado a balas ácidas e refrigerantes. No vinho, bactérias o transformam em ácido lático, mais suave."],
  ],
  C7H6O2: [
    ["Kemenyan_110112-11054_tdp.jpg", "Resina de benjoim, de onde o ácido benzoico foi obtido", "O benjoim é uma resina perfumada de árvores do Sudeste Asiático. No século XVI, o ácido benzoico foi obtido dela."],
    ["Pile_of_benzoic_acid_crystals.jpg", "Cristais de ácido benzoico", "O ácido benzoico forma cristais brancos e brilhantes. Ele e seu sal, o benzoato de sódio, conservam alimentos e refrigerantes."],
  ],
  C8H6O4: [
    ["Plastic_bottles_before_processing.jpg", "Pré-formas de garrafas PET (feito com ácido tereftálico)", "O PET é feito de ácido tereftálico e etilenoglicol. Essas pré-formas são aquecidas e sopradas para virar garrafas."],
    ["Bales_of_PET_bottles_closeup.jpg", "Garrafas PET para reciclar", "As garrafas PET são prensadas em fardos e recicladas em fibras para roupas, tapetes e novas garrafas."],
  ],
  C6H8O2: [
    ["Sorbus_aucuparia_Tauerntal_20220824.jpg", "Sorveira: o ácido sórbico foi descoberto em seus frutos", "O ácido sórbico foi isolado em 1859 do óleo dos frutos da sorveira-brava. O nome vem de Sorbus, o gênero da planta."],
    ["Sorbus_aucuparia_2022_G1.jpg", "Frutos da sorveira", "Os frutos da sorveira são alaranjados e muito comidos por aves no inverno europeu."],
    ["Sorbic_acid.jpg", "Ácido sórbico em pó", "O ácido sórbico e o sorbato de potássio impedem o crescimento de mofos e leveduras em queijos, pães e bebidas."],
  ],
  C3H4O3: [
    ["Mitochondria,_mammalian_lung_-_TEM.jpg", "Mitocôndrias: lá o ácido pirúvico vira energia", "A glicose se quebra em duas moléculas de ácido pirúvico. Nas mitocôndrias, ele é usado para produzir a maior parte da energia da célula."],
  ],
  C6H13NO2: [
    ["Optimus_nutrition_gold_standard_whey_protein_with_creatine_monohydrate.jpg", "Suplementos de proteína são ricos em leucina", "A leucina é um aminoácido essencial: o corpo não a produz. Ela ajuda a sinalizar aos músculos que é hora de construir proteína. O soro do leite é rico nela."],
  ],
  C3H7NO3: [
    ["Glycine_max_kz03.jpg", "Soja, rica em serina", "A soja é rica em proteínas, e a serina é um dos aminoácidos delas. O corpo também consegue produzir serina."],
  ],
  C3H7NO2S: [
    ["Blond_hair_going_gray_01.jpg", "Cabelo: as proteínas dele são ricas em cisteína", "A queratina do cabelo tem muita cisteína. As pontes de enxofre entre as cisteínas mantêm a forma do fio. Os alisamentos e permanentes as quebram e refazem."],
    ["Feather_of_male_Pavo_cristatus_(Indian_peafowl).jpg", "Penas também são ricas em cisteína", "As penas são feitas de queratina, que é rica em cisteína. As pontes de enxofre deixam a pena resistente."],
  ],
  C9H11NO2: [
    ["Can_of_Diet_Sierra_Mist_lemon-lime_soda,_2011.jpg", "Refrigerante diet: o aspartame contém fenilalanina", "O aspartame é feito de fenilalanina e ácido aspártico. Por isso as latas avisam quem tem fenilcetonúria, que não pode consumi-la."],
  ],
  C6H14N2O2: [
    ["3_types_of_lentil.jpg", "Lentilhas, ricas em lisina", "A lisina é um aminoácido essencial. Lentilhas e feijões são ricos nela, enquanto cereais como o milho têm pouca."],
    ["L-lysine_for_cats.jpg", "Lisina em pó", "A lisina em pó é usada em rações e suplementos, inclusive para gatos."],
  ],
  C5H10O5: null,
  C5H10O4: [
    ["3_Strawberry_DNA_Extraction.jpg", "Extraindo DNA de morango: o DNA tem desoxirribose", "Com sal, detergente e álcool, dá para extrair o DNA do morango em casa: ele aparece como fios esbranquiçados."],
    ["Agarose_Gel_DNA_Electrophoresis.jpg", "DNA separado em gel", "No gel, a corrente elétrica separa pedaços de DNA pelo tamanho. A desoxirribose faz parte do \"corrimão\" de cada fita."],
  ],
  C10H14O: [
    ["Thymian_(Thymus_vulgaris),_Nationalpark_Hohe_Tauern.jpg", "Tomilho: seu óleo é rico em timol", "O timol dá o cheiro do tomilho e mata micróbios. Ele é usado em enxaguantes bucais."],
    ["Thymolum_by_Danny_S._-_001.JPG", "Cristais de timol", "O timol forma cristais incolores. Apicultores o usam contra ácaros que atacam as colmeias."],
  ],
  C9H10O2: [
    ["(MHNT)_Jasminum_polyanthum_–_flowers_and_buds.jpg", "Flores de jasmim: perfume de acetato de benzila", "O acetato de benzila é o principal componente do perfume do jasmim e é muito usado em perfumaria."],
    ["Bloem_van_een_Boerenjasmijn_(Philadelphus)._03-07-2021_(actm.).jpg", "Flor de falso-jasmim (Philadelphus)", "O falso-jasmim (Philadelphus) tem cheiro parecido com o do jasmim e também produz acetato de benzila."],
  ],
  C6H12O2: [
    ["Ananas_comosus,_Dole_Pineapple_Plantation,_Oahu,_Hawaii,_USA2.jpg", "Abacaxi: o aroma vem do butanoato de etila", "O butanoato de etila tem cheiro de fruta e é uma das principais substâncias do aroma do abacaxi."],
    ["കൈതച്ചക്ക.jpg", "Abacaxi crescendo", "O abacaxi cresce no centro de uma roseta de folhas. Ele é originário da América do Sul."],
  ],
  C4H6O2: [
    ["Popcorn_11.jpg", "Pipoca: o cheiro de manteiga é diacetil", "O diacetil dá o cheiro e o gosto de manteiga e era usado em pipoca de micro-ondas. Respirado em fábricas, ele danifica os pulmões."],
    ["2023_Masło_w_maselniczce.jpg", "Manteiga", "Na manteiga, bactérias do creme produzem diacetil, que dá o aroma."],
    ["Butter-Vanille-Aroma.JPG", "Diacetil puro", "O diacetil puro é um líquido amarelo-esverdeado de cheiro forte de manteiga."],
  ],
  C9H6O2: [
    ["Tonka_Beans.jpg", "Favas de cumaru, ricas em cumarina", "As favas de cumaru, da Amazônia, são ricas em cumarina e têm aroma de baunilha. A cumarina foi isolada delas em 1820."],
    ["Galium_odoratum_kz05.jpg", "Aspérula-odorífera, planta com cumarina", "A aspérula-odorífera ganha cheiro de feno quando murcha, porque libera cumarina."],
    ["Cassia_sticks.jpg", "Canela-cássia também tem cumarina", "A canela-cássia tem bem mais cumarina que a canela-do-ceilão. Em excesso, a cumarina pode fazer mal ao fígado."],
  ],
  C10H12O: [
    ["Dried_Star_Anise_Fruit_Seeds.jpg", "Anis-estrelado: o sabor vem do anetol", "O anetol dá o sabor doce de anis ao anis-estrelado. Ele é cerca de 13 vezes mais doce que o açúcar."],
    ["Foeniculum_July_2011-1a.jpg", "Erva-doce (funcho)", "A erva-doce (funcho) também é rica em anetol."],
    ["Preparing_absinthe.jpg", "Bebida de anis fica turva com água", "O anetol se dissolve no álcool, mas não na água. Ao pôr água na bebida, ele forma gotinhas que deixam o líquido turvo."],
  ],
  C8H7N: [
    ["Orange_Blossom.JPG", "Flor de laranjeira: em pouca quantidade, o indol tem cheiro floral", "O indol tem cheiro forte e desagradável em grande quantidade, mas, bem diluído, faz parte do perfume de flores como a de laranjeira."],
    ["Bloem_van_een_Boerenjasmijn_(Philadelphus)._03-07-2021_(actm.).jpg", "Flor de falso-jasmim (Philadelphus)", "Flores brancas perfumadas costumam ter um pouco de indol misturado a outros aromas."],
  ],
  C5H14N2: null,
  C6H10O: [
    ["Lawn_Mowing_DVIDS119604.jpg", "Cortar grama libera hexenal, o “cheiro de grama cortada”", "Quando a grama é cortada, as folhas feridas liberam hexenal e outros aldeídos. É o cheiro de grama cortada."],
    ["Freshly_cut_grass_(3511610082).jpg", "Grama", "As plantas soltam hexenal quando são feridas. Esse cheiro pode atrair inimigos naturais dos insetos que as comem."],
  ],
  C8H10O: [
    ["Comestible_rose_in_the_Laquenexy_orchard_garden,_Moselle,_France_(01).jpg", "Rosas: o perfume tem feniletanol", "O feniletanol tem cheiro suave de rosa e é um dos principais componentes do óleo de rosas."],
    ["Red_rose_with_black_background.jpg", "Rosa vermelha", "O feniletanol é usado em perfumes e sabonetes. Ele também aparece no vinho e na cerveja."],
  ],
  C6H8O3: [
    ["Still_life_with_strawberries_in_a_crystal_bowl.jpg", "Morangos: o furaneol dá o aroma doce", "O furaneol dá o aroma doce de caramelo dos morangos maduros."],
    ["Garden_strawberry_(Fragaria_×_ananassa)_halved.jpg", "Morango cortado", "O furaneol aumenta conforme o morango amadurece. Ele também está no abacaxi e no tomate."],
  ],
  C7H5N3O6: [
    ["Trinitrotoluen.JPG", "TNT", "O TNT é um sólido amarelo-claro. Ele é estável: pode ser derretido e moldado sem explodir, por isso é usado em munições."],
    ["11th_Marine_Regiment_Desert_Fire_Exercise_130423-M-VH365-119.jpg", "Projéteis de artilharia com TNT", "O TNT é tão usado que a energia de explosões e bombas costuma ser medida em toneladas de TNT."],
  ],
  C4H9NO2: [
    ["PLoSBiol4.e126.Fig6fNeuron.jpg", "Neurônios: o GABA acalma a atividade do cérebro", "O GABA é o principal mensageiro que freia a atividade dos neurônios. Calmantes e remédios para dormir reforçam o efeito dele."],
    ["Chimp_Brain_in_a_jar.jpg", "Cérebro de chimpanzé conservado", "O GABA funciona como um freio que equilibra o cérebro. Sem ele, os neurônios disparam demais, como nas convulsões."],
  ],
  C5H9N3: [
    ["Mosquito_bite_from_Flickr.jpg", "Picadas de mosquito coçam por causa da histamina", "Na picada, a saliva do mosquito faz o corpo liberar histamina, que causa o inchaço e a coceira."],
    ["SMCpolyhydroxysmall.jpg", "Mastócitos, as células que guardam histamina", "Os mastócitos guardam histamina em grânulos. Nas alergias eles a soltam, e os anti-histamínicos bloqueiam seu efeito."],
  ],
  C4H9N3O2: [
    ["Rio_2016_-_Weightlifting_men's_69_kg_(29049391600).jpg", "Levantamento de peso: a creatina dá energia rápida aos músculos", "A creatina guarda energia nos músculos na forma de fosfocreatina, usada em esforços curtos e intensos, como levantar peso."],
    ["Creatine_monohydrate_supplement.jpg", "Creatina em pó", "A creatina é um dos suplementos mais estudados. O corpo também a produz e ela vem de carnes e peixes."],
  ],
  C5H4N4O3: [
    ["Larus_michahellis_atlantis_at_Playa_del_Confital_(47206133632)_2_March_2019.jpg", "Gaivotas: o branco das fezes das aves é ácido úrico", "As aves eliminam o nitrogênio como ácido úrico, uma pasta branca que gasta pouca água. É a parte branca das fezes delas."],
    ["Gout_Signs_and_Symptoms.jpg", "Gota: cristais de ácido úrico inflamam as articulações", "Na gota, o excesso de ácido úrico no sangue forma cristais nas articulações, muitas vezes no dedão do pé, que doem muito."],
    ["Uric_acid_crystals_(urine)_-_Ürik_asit_kristalleri_(idrar)_-_01.png", "Cristais de ácido úrico ao microscópio", "Os cristais de ácido úrico aparecem no exame de urina e podem formar pedras nos rins."],
  ],
  C6H5NO2: [
    ["Peanuts_(Arachis_hypogaea)_-_in_shell,_shell_cracked_open,_shelled,_peeled.jpg", "Amendoim, rico em niacina (vitamina B3)", "O amendoim é uma das melhores fontes de niacina (vitamina B3). A falta dela causa a pelagra."],
    ["Groundnuts_farm.jpg", "Plantação de amendoim", "O amendoim floresce acima do solo, mas os frutos crescem e amadurecem debaixo da terra."],
  ],
  C8H11NO3: [
    ["Green_raw_bananas.jpg", "Bananas são fonte de vitamina B6 (piridoxina)", "A banana é uma boa fonte de vitamina B6, que ajuda o corpo a usar as proteínas e a fazer mensageiros do cérebro."],
    ["Bananas_on_black_background_02.jpg", "Bananas maduras", "A vitamina B6 está em bananas, batatas, grão-de-bico, peixes e carnes."],
  ],
  C5H8O2: [
    ["Coloured_cast_acrylic_by_Midton_Acrylics.jpg", "Peças de acrílico (polimetacrilato de metila)", "Muitas moléculas de metacrilato de metila juntas formam o acrílico (PMMA), um plástico transparente e mais leve que o vidro."],
    ["Lichtenberg_figure_in_block_of_Plexiglas.jpg", "Bloco de acrílico com descarga elétrica gravada", "Uma descarga elétrica de milhões de volts dentro do acrílico deixa uma figura em forma de árvore, a figura de Lichtenberg."],
    ["Bathyscaphe_Trieste_sphere.jpg", "Batiscafo Trieste: a janela era de acrílico", "O batiscafo Trieste desceu ao ponto mais fundo do oceano em 1960. Suas janelas eram cones de acrílico grosso."],
  ],
  C6H11NO: [
    ["Jana_nylon_stockings_in_packaging.jpg", "Meias de náilon (feito de caprolactama)", "O náilon 6 é feito de caprolactama. As meias de náilon substituíram as de seda nos anos 1940."],
    ["Nailoni_süntees_1.JPG", "Experimento do “fio de náilon”", "No laboratório, dá para puxar um fio de náilon da superfície entre dois líquidos que não se misturam. Esse náilon é feito de outras substâncias, não de caprolactama."],
    ["Caprolactam-Flakes.JPG", "Caprolactama em flocos", "A caprolactama é um sólido branco em flocos. As moléculas abrem o anel e se ligam em longas cadeias de náilon."],
  ],
  C3H6N6: [
    ["Melamine_dinnerware.JPG", "Pratos de melamina", "Os pratos de melamina são feitos de resina de melamina e formaldeído, um plástico duro e resistente."],
    ["Red_Ebonyte_Coffee_Cup_with_Decorative_Black_Script_Designed_by_Kaye_LaMoyne_-_DPLA_-_45331efb79e84cb45b3484981f4718a5_(page_3).jpg", "Xícara de melamina", "A melamina não serve para o micro-ondas: com calor forte, a resina pode se decompor."],
    ["Melamine_A.jpg", "Melamina em pó", "A melamina é um pó branco com muito nitrogênio. Em 2008, foi misturada ilegalmente ao leite na China e causou muitas mortes."],
  ],
  Ca5P3O13H: [
    ["Dent_STS_1881.jpg", "Dente: o esmalte é hidroxiapatita", "O esmalte dos dentes é cerca de 96% hidroxiapatita, o material mais duro do corpo humano."],
    ["Hydroxylapatite-338779.jpg", "Cristal de apatita", "A hidroxiapatita também existe como mineral, no grupo das apatitas."],
  ],
  KAlS2O8: [
    ["Alaunblocknebenrasiermesser.JPG", "Pedra-ume usada após o barbear", "A pedra-ume é alúmen de potássio. Passada na pele depois de barbear, ela fecha pequenos cortes e ajuda a parar o sangramento."],
    ["Potassium_alum_octahedral_like_crystal.jpg", "Cristal de alúmen", "O alúmen forma cristais em octaedro (duas pirâmides unidas pela base). É fácil cultivá-los em casa."],
    ["Potassium_Alum_Block_India_Shaving_Aftershave.jpg", "Pedra-ume antiga", "A pedra-ume também é usada como desodorante natural e para clarear água turva."],
  ],
  Na3AlF6: [
    ["816-_Ivigtut_-_cryolite.jpg", "Criolita", "A criolita é rara na natureza. A única grande mina era em Ivigtut, na Groenlândia, e já se esgotou."],
    ["Bratsk_Aluminium_Smelter_(34824737432).jpg", "Fundição de alumínio usa criolita", "Na fundição, o óxido de alumínio é dissolvido em criolita derretida a cerca de 960 °C e a eletricidade separa o alumínio. Hoje a criolita usada é fabricada."],
  ],
  Al2Si2O9H4: [
    ["Service_dessert_Victoria_Franz-Joseph_Vienna_inv_191.jpg", "Porcelana: feita com caulim (caulinita)", "A porcelana é feita principalmente de caulim, uma argila branca de caulinita, queimada a cerca de 1.300 °C."],
    ["Kaznějov_-_kaolin_quarry.jpg", "Mina de caulim", "O caulim é tirado de minas a céu aberto. Ele também é usado para dar brilho ao papel."],
    ["Kaolinite_from_Twiggs_County_in_Georgia_in_USA.jpg", "Caulinita", "A caulinita é uma argila macia e branca. O nome vem de Gaoling, um morro na China de onde ela era tirada."],
  ],
  CaMgC2O6: [
    ["Frea_pass_Sella_group_Pisciadu_Dolomites_South_Tyrol.jpg", "Montanhas Dolomitas, na Itália, feitas de dolomita", "As Dolomitas, nos Alpes italianos, são feitas em grande parte de dolomita, rocha formada de antigos recifes do mar."],
    ["Dolomite_Luzenac.jpg", "Cristais de dolomita", "A dolomita é carbonato de cálcio e magnésio. O nome homenageia o geólogo francês Déodat de Dolomieu."],
    ["Faloria_Cortina_d'Ampezzo_12.jpg", "Dolomitas", "As Dolomitas são Patrimônio Mundial da Unesco. Ao pôr do sol, a rocha clara fica rosada."],
  ],
  N2H8SO4: [
    ["Ammonium_sulfate_sample.jpg", "Sulfato de amônio (adubo)", "O sulfato de amônio é um adubo que dá nitrogênio e enxofre às plantas. Ele deixa o solo mais ácido."],
    ["Ammoniumsulfat.jpg", "Propaganda antiga de adubo de sulfato de amônio", "O sulfato de amônio foi um dos primeiros adubos industriais, produzido a partir de subprodutos do carvão."],
  ],
  NH5CO3: [
    ["Koekjestrommel_open.jpg", "Biscoitos crescem com bicarbonato de amônio", "O bicarbonato de amônio é um fermento antigo, usado em biscoitos finos: no forno, ele vira gás e não deixa sabor."],
    ["Ammonium_bicarbonate.jpg", "Bicarbonato de amônio", "Aquecido, o bicarbonato de amônio se transforma todo em amônia, gás carbônico e vapor de água."],
  ],
  C6H6O2: [
    ["Hydroquinone_crystal.jpg", "Hidroquinona", "A hidroquinona forma cristais incolores. Ela também é usada em cremes para clarear manchas da pele, com receita médica."],
    ["Harry_Goldie,_boxer_and_real_estate_developer_(4419487304).jpg", "Fotos antigas em preto e branco eram reveladas com hidroquinona", "No revelador, a hidroquinona transforma em prata metálica os grãos de brometo de prata que pegaram luz."],
  ],
  C6H4Cl2: [
    ["1,4_dichlorobenzene_crystallised.jpg", "Cristais de paradiclorobenzeno", "O paradiclorobenzeno forma cristais brancos que passam direto a gás, como a naftalina."],
    ["Naftalen.jpg", "Bolinhas contra traças", "Muitas bolinhas contra traças e pedras de banheiro são de paradiclorobenzeno. O vapor é tóxico e o uso foi limitado em vários países."],
  ],
  C6H12NNaO3S: [
    ["SweetnLowSweetener.JPG", "Sachês de adoçante", "O ciclamato é cerca de 30 a 50 vezes mais doce que o açúcar. No Brasil ele é permitido; nos EUA, é proibido desde 1970."],
    ["Green_Stevia_Maltodextrin_extract_sugar_packets_PhilippinesA.jpg", "Adoçante em sachês", "Adoçantes de mesa costumam misturar vários edulcorantes, como ciclamato, sacarina e estévia, para disfarçar o gosto amargo de cada um."],
  ],
  C3H5NO: [
    ["Potato-Chips.jpg", "Batata frita: a fritura forma acrilamida", "Batatas fritas ou assadas em alta temperatura formam acrilamida, a partir de açúcares e do aminoácido asparagina."],
    ["Gel_electrophoresis_apparatus_demonstration.jpg", "Gel de poliacrilamida separa DNA", "Ligada em cadeias, a acrilamida forma a poliacrilamida, um gel usado para separar DNA e proteínas pelo tamanho."],
    ["Too_hot_fried_french_fries_IMG_0660.JPG", "Batatas fritas", "Fritar até ficar dourado, e não marrom-escuro, forma bem menos acrilamida."],
  ],
  CaH4P2O8: [
    ["Tripelsuperfosfaat_(triple_phosphate).jpg", "Adubo superfosfato em grânulos", "O superfosfato é feito tratando rocha fosfática com ácido. Assim o fósforo se dissolve e as plantas conseguem absorvê-lo."],
    ["Royal_Baking_Powder_etc.jpg", "Fermento em pó também leva fosfato de cálcio", "Alguns fermentos químicos usam fosfato de cálcio como o ácido que reage com o bicarbonato e solta gás."],
  ],
  YBa2Cu3O7: [
    ["Superconductor-levitation.jpg", "Ímã flutuando sobre um supercondutor resfriado", "O YBCO vira supercondutor a cerca de −180 °C, acima da temperatura do nitrogênio líquido. Ele expulsa o campo do ímã, que flutua."],
    ["Levitation_of_a_magnet_on_top_of_a_superconductor_2.jpg", "Supercondutor levitando", "Num supercondutor como o YBCO, o ímã fica preso flutuando numa posição: é o \"travamento de fluxo\"."],
    ["YBCO_superconductor.JPG", "Pastilha de YBCO", "O YBCO foi descoberto em 1987 e foi o primeiro supercondutor a funcionar com nitrogênio líquido, que é barato."],
  ],
  PbC4H6O4: [
    ["Lead(II)Acetate.jpg", "Cristais de acetato de chumbo", "O acetato de chumbo tem gosto doce e era chamado de \"açúcar de chumbo\". Os romanos o usavam para adoçar vinho, mas ele é muito tóxico."],
    ["Lead(II)_iodide_crystals_grown_in_silica_gel.JPG", "Cristais de iodeto de chumbo crescendo em gel", "O acetato de chumbo se dissolve bem em água e é usado em experiências como esta, em que se formam cristais dourados de iodeto de chumbo."],
  ],
  U3O8: [
    ["Yellowcake.jpg", "Yellowcake (concentrado de urânio)", "O yellowcake é o pó de urânio concentrado que sai da mina. Apesar do nome, muitas vezes ele é marrom ou preto, por causa do U₃O₈."],
    ["Olympic_dam_ore_cpy.JPG", "Minério de urânio", "O minério de urânio costuma ter menos de 1% de urânio; ele é moído e tratado com ácido para extraí-lo."],
    ["Yellowcake_(03010301).jpg", "Yellowcake em tambor", "O yellowcake é transportado em tambores. Depois ele é transformado em UF₆ para ser enriquecido."],
  ],
  Mg3Si4O12H2: [
    ["Talc-177589.jpg", "Talco mineral", "O talco é o mineral mais mole: é o número 1 na escala de Mohs e pode ser riscado com a unha."],
    ["Johnsons_Baby_Powder_1,5_OZS_talc,_pic1.JPG", "Talco em pó", "Moído, o talco vira um pó macio que absorve umidade e diminui o atrito na pele."],
    ["Baby_Powder_and_puff_box_IMG_20210811_173820.jpg", "Caixa antiga de talco com esponja", "Por muito tempo, o talco em pó foi vendido em caixas com esponja para espalhar no corpo."],
  ],
  NH6PO4: [
    ["Ammoniumdihydrogenphosphat_crystal_step_(GeoMuseum_Cologne).JPG", "Cristais de fosfato monoamônico", "O fosfato monoamônico forma cristais grandes e é fácil de cristalizar. Ele também é um adubo."],
    ["FireExtinguisherABC.jpg", "Extintor de pó ABC usa esse fosfato", "O pó dos extintores ABC é sobretudo fosfato monoamônico. Ele derrete no fogo e forma uma camada que abafa as chamas."],
  ],
  N2H8Cr2O7: [
    ["Маленький_вулкан.JPG", "“Vulcão químico” de dicromato de amônio", "Aceso, o dicromato de amônio solta faíscas e cinzas verdes de óxido de cromo, como um vulcão. Ele é tóxico, por isso a demonstração quase não é mais feita."],
    ["Ammonium-dichromate-sample.jpg", "Dicromato de amônio", "O dicromato de amônio forma cristais laranja e é um forte oxidante."],
  ],
  C4H3F7O: [
    ["Sevoflurane.jpg", "Sevoflurano, gás anestésico", "O sevoflurano é um dos anestésicos inalados mais usados hoje. Ele tem cheiro suave e é bom para induzir anestesia em crianças."],
    ["Datex-Ohmeda_Aladin_Sev.jpg", "Vaporizador de sevoflurano", "O vaporizador controla quanto sevoflurano vai para o gás que o paciente respira."],
  ],
  C5H10: [
    ["LG_refrigerator_interior.jpg", "Geladeira: o isolamento é feito com ciclopentano", "As espumas que isolam as paredes da geladeira são expandidas com ciclopentano, que não destrói o ozônio."],
    ["Cyclopentane_warning_on_refrigerator.jpg", "Isolamento de geladeira", "Como o ciclopentano é inflamável, as geladeiras têm etiqueta de aviso para quem as conserta ou descarta."],
  ],
  C7H8O: [
    ["Cananga_odorata_02.JPG", "Flor de ylang-ylang, rica em álcool benzílico", "As flores de ylang-ylang são usadas em perfumes. O óleo delas tem álcool benzílico e outros aromas."],
    ["Cananga_odorata_flowers.jpg", "Árvore de ylang-ylang", "O ylang-ylang é uma árvore tropical do Sudeste Asiático. As flores amarelas e caídas são colhidas para extrair o óleo."],
  ],
  C7H8O2: [
    ["Starting_the_charcoal.jpg", "Fumaça de madeira tem guaiacol (cheiro de defumado)", "A madeira queimando quebra a lignina e forma guaiacol, que dá o cheiro e o gosto de defumado."],
    ["Smoked_Ham_02.jpg", "Presunto defumado", "No defumado, compostos como o guaiacol grudam na superfície e dão sabor. A fumaça também ajuda a conservar."],
  ],
  C4H8O: [
    ["Stanley-Hot-Glue-Gun-GR35K.jpg", "Colas: algumas usam butanona como solvente", "A cola quente da foto não tem solvente: ela é derretida pelo calor. Já colas para plástico, tintas e vernizes usam butanona."],
    ["Methyl_ethyl_ketone_45ml.jpg", "Butanona pura", "A butanona é um líquido incolor que evapora rápido, com cheiro parecido com o da acetona."],
  ],
  C5H4O2: [
    ["Air_fried_corn-on-the-cob_(United_States).jpg", "Milho: o furfural é feito de sabugos e cascas", "O furfural é feito aquecendo restos de plantas com ácido, como sabugos de milho, cascas de aveia e bagaço de cana."],
    ["Grains_mix.jpg", "Cascas de aveia, outra fonte de furfural", "O furfural foi um dos primeiros químicos industriais feitos de restos agrícolas. Ele é usado para refinar óleos e fazer resinas."],
  ],
  C7H6O5: [
    ["Oak_galls_and_iron(II)_sulfate_-_California_State_Archives.jpg", "Galhas de carvalho e tinta ferrogálica", "A tinta ferrogálica é feita com galhas de carvalho, ricas em ácido gálico e taninos, e sulfato de ferro. Ela foi usada por mais de mil anos."],
    ["Oak_apples_-_Keila.jpg", "Galhas de carvalho", "As galhas são bolinhas que o carvalho forma quando vespas põem ovos nas folhas e nos galhos."],
    ["InkErosion.jpg", "Manuscrito antigo escrito com tinta ferrogálica", "Com o tempo, a tinta ferrogálica pode ficar ácida e corroer o papel dos manuscritos."],
  ],
  C4H6O4: [
    ["Tumble-polished_Baltic_amber_1.jpg", "Âmbar, de onde o ácido succínico foi extraído", "O ácido succínico foi obtido em 1546 destilando âmbar. O nome vem do latim succinum, \"âmbar\"."],
    ["Amber2.jpg", "Inseto preso em âmbar", "O âmbar é resina de árvores antigas fossilizada. Às vezes ele guarda insetos de milhões de anos."],
    ["Sample_of_succinic_acid.jpg", "Ácido succínico puro", "O ácido succínico é um intermediário da respiração das células. Ele é usado em alimentos e plásticos biodegradáveis."],
  ],
  C6H10O4: [
    ["Adipic_acid.jpg", "Ácido adípico, usado para fazer náilon", "Quase todo o ácido adípico produzido é usado, com uma diamina, para fazer o náilon 6,6."],
  ],
  C5H10O2: [
    ["Valeriana_officinalis_inflorescence_-_Niitvälja.jpg", "Valeriana: sua raiz tem cheiro de ácido isovalérico", "A raiz da valeriana, usada como calmante, tem cheiro forte de ácido isovalérico, parecido com chulé."],
    ["Parmigiano_Reggiano_meules_MIN_Rungis.jpg", "Queijos curados também têm esse cheiro", "O ácido isovalérico também aparece em queijos curados e no suor dos pés, produzido por bactérias."],
  ],
  C8H8O2: [
    ["Feijoa_sellowiana_.jpg", "Flor de feijoa: perfume de benzoato de metila", "O benzoato de metila tem cheiro doce de frutas e flores. Ele atrai abelhas e mariposas para muitas flores."],
    ["Snapdragon_flowers,_Jessore,_Bangladesh.jpg", "Boca-de-leão também tem esse perfume", "A boca-de-leão solta benzoato de metila de manhã, quando as abelhas estão mais ativas."],
    ["Acca_sellowiana_Fruit_MHNT_Fronton.jpg", "Frutas de feijoa", "A feijoa (goiaba-serrana) é nativa do sul do Brasil e do Uruguai. As flores e os frutos são perfumados."],
  ],
  C6H8N2: [
    ["Dyeing_hair_purple.png", "Tintura de cabelo com parafenilenodiamina", "Nas tinturas permanentes, a parafenilenodiamina entra no fio e reage com a água oxigenada, formando a cor."],
    ["Mehndi.jpg", "“Henna preta” pode levar parafenilenodiamina", "A henna natural é marrom-alaranjada. A \"henna preta\" pode ter parafenilenodiamina, que causa alergias graves na pele."],
  ],
  C3H8NO5P: [
    ["Herbicide_spraying.jpg", "Aplicação de herbicida com glifosato", "O glifosato é o herbicida mais usado no mundo. Ele bloqueia uma enzima que as plantas usam para fazer aminoácidos."],
    ["Roundup_acker.jpg", "Campo tratado com herbicida", "Muitas lavouras são de plantas modificadas para resistir ao glifosato. Isso permite aplicá-lo matando só as ervas daninhas."],
  ],
  C4H10O4: [
    ["Erythrit.jpg", "Eritritol, um adoçante", "O eritritol tem cerca de 70% da doçura do açúcar e quase nenhuma caloria. Ele aparece naturalmente em frutas e cogumelos."],
    ["Artificial_sweetener_in_tablets.jpg", "Comprimidos de adoçante", "Muitos adoçantes de mesa misturam eritritol com estévia ou outros edulcorantes."],
  ],
  C6H13NO5: [
    ["Shrimp_shells_in_Tuntorp_1.jpg", "Cascas de camarão: a glucosamina vem da quitina", "A carapaça de camarões e caranguejos é feita de quitina, que é uma cadeia de glucosamina modificada."],
    ["Ghost_Crab_Burrow_Mahabalipuram_Sep24_A7CR_03085.jpg", "Caranguejos também têm quitina na carapaça", "A quitina é o segundo polímero natural mais abundante, depois da celulose. Ela também forma a casca dos insetos."],
    ["Joint_Hydration_Supplement.jpg", "Suplemento de glucosamina", "Os suplementos de glucosamina são feitos de cascas de crustáceos e vendidos para as articulações."],
  ],
  C4H7NO4: [
    ["Asparagus-Bundle.jpg", "Aspargos: o ácido aspártico tem nome de aspargo", "O nome ácido aspártico vem da asparagina, que foi achada no aspargo."],
    ["Asparagus_soup_(spargelsuppe).jpg", "Aspargos e sopa de aspargos", "O ácido aspártico é um aminoácido que o corpo produz. Ele também faz parte do adoçante aspartame."],
  ],
  C5H9NO4: [
    ["Parmigiano_Reggiano_meules_MIN_Rungis.jpg", "Queijo parmesão: o sabor umami é ácido glutâmico", "O queijo parmesão curado tem muito glutamato livre, que dá o sabor umami."],
    ["Organic_home-grown_tomatoes_-_unripe_to_ripe.jpg", "Tomates também são ricos em glutamato", "O tomate tem mais glutamato conforme amadurece, por isso o molho de tomate maduro é tão saboroso."],
    ["Sample_of_L-Glutamic_acid.jpg", "Ácido glutâmico puro", "O ácido glutâmico foi isolado em 1866. Em 1908, Kikunae Ikeda descobriu que ele dá o sabor umami e criou o glutamato monossódico."],
  ],
  C9H11NO3: [
    ["Meule_du_Plateau_cheese_wheels_in_the_ripening_cellar,_Terre_de_fromages,_Herve,_2025.jpg", "Queijos curados formam cristais de tirosina", "Nos queijos curados, as proteínas se quebram e a tirosina forma cristaizinhos crocantes."],
    ["Cheeseboard_platter_at_Black_Horse_Inn,_Nuthurst,_West_Sussex,_England.jpg", "Tábua de queijos", "Os pontinhos crocantes de queijos envelhecidos são cristais de tirosina ou de lactato de cálcio."],
  ],
  C5H11NO2: [
    ["Chickens_in_market.jpg", "Frango, rico em valina", "A valina é um aminoácido essencial, presente em carnes, ovos, laticínios e leguminosas."],
  ],
  C5H9NO2: [
    ["Broken_Glass_Gelatin.jpg", "Gelatina: o colágeno é rico em prolina", "A gelatina vem do colágeno, rico em prolina, glicina e hidroxiprolina. Esses aminoácidos deixam o colágeno forte, como uma corda."],
    ["Gelatine.png", "Gelatina incolor", "A prolina é o único aminoácido em que o nitrogênio fica preso num anel, o que dobra a cadeia de proteína."],
  ],
  C5H11NO2S: [
    ["Eggs_in_basket_2020_G1.jpg", "Ovos, ricos em metionina", "A metionina tem enxofre e é um aminoácido essencial. Ovos, peixes e carnes são boas fontes."],
    ["Chicken_Egg_without_Eggshell_5859.jpg", "Clara e gema de ovo", "A metionina é o primeiro aminoácido de quase todas as proteínas ao serem produzidas na célula."],
  ],
  C6H14N4O2: [
    ["Pumpkin_Seeds_macro_1.jpg", "Sementes de abóbora, ricas em arginina", "As sementes de abóbora e outras sementes e castanhas são ricas em arginina."],
    ["Nuts_on_Spice_Bazaar_in_Istanbul_01.jpg", "Castanhas e sementes", "O corpo usa a arginina para produzir óxido nítrico, que dilata os vasos sanguíneos."],
  ],
  C6H9N3O2: [
    ["Tuna_assortment.png", "Atuns são ricos em histidina", "Atuns e outros peixes escuros têm muita histidina. No peixe mal conservado, bactérias a transformam em histamina, que pode intoxicar."],
    ["L-Histidine_sample.jpg", "Histidina pura", "A histidina é um aminoácido essencial, sobretudo para as crianças. Ela também ajuda a segurar o ferro na hemoglobina."],
  ],
  C5H10N2O3: [
    ["Sergio_Oliva_Arm(n_o_n_a_m_e).jpg", "Músculos: a glutamina é o aminoácido mais comum no corpo", "A glutamina é o aminoácido livre mais abundante no sangue e nos músculos."],
    ["Sample_of_L-Glutamine.jpg", "Glutamina pura", "A glutamina é um pó branco. Células do intestino e do sistema imune a usam como combustível."],
  ],
  C4H8N2O3: [
    ["Asparagus-Bundle.jpg", "Aspargos: a asparagina foi o primeiro aminoácido descoberto (1806)", "A asparagina foi o primeiro aminoácido isolado, em 1806, do suco de aspargos."],
    ["Steam-boiling_green_asparagus.jpg", "Aspargos cozinhando", "A asparagina participa da formação da acrilamida quando batatas e pães são aquecidos demais."],
  ],
  C2H7NO3S: [
    ["Energy_Drink_Battery_Cans.jpg", "Energéticos levam taurina", "Bebidas energéticas costumam ter taurina, mas os estudos não mostram que ela dê energia; quem estimula é a cafeína."],
    ["Charolais_cattle,_Sierra_Nevada,_Venezuela.jpg", "Touro: a taurina foi descoberta na bile de boi", "A taurina foi isolada em 1827 da bile de boi. O nome vem do latim taurus, \"touro\"."],
  ],
  C4H6N4O3: [
    ["Symphytum_officinale_RF.jpg", "Confrei: a alantoína vem dessa planta", "O confrei é rico em alantoína, que ajuda a pele a se regenerar. Mas a planta tem substâncias tóxicas e não deve ser comida."],
    ["Allantoïne.JPG", "Alantoína pura", "A alantoína é um pó branco usado em cremes e pomadas para acalmar e hidratar a pele."],
  ],
  C5H12S: [
    ["Striped_Skunk.jpg", "Gambá: o cheiro forte vem de tióis como o metilbutanotiol", "O jato do gambá norte-americano tem tióis com enxofre, como o metilbutanotiol, e o cheiro dura dias."],
    ["Striped_Skunk_(Mephitis_mephitis)_01_(cropped).jpg", "Gambá no campo", "O gambá só usa o jato em último caso: antes, bate as patas e levanta a cauda como aviso."],
  ],
  C4H5Cl: [
    ["A_surfer_at_the_wave_edit.jpg", "Surfista com roupa de neoprene (feito de cloropreno)", "O neoprene é borracha de policloropreno com bolhas de gás, que isolam o frio. Por isso é usado em roupas de surfe."],
    ["Diving_suit_neoprene.jpg", "Roupa de mergulho de neoprene", "A roupa de neoprene deixa entrar só uma camada fina de água, que o corpo aquece."],
    ["Contact-cement_000000.jpg", "Cola de contato com neoprene", "A cola de contato de neoprene é passada nas duas superfícies, que grudam firme quando se tocam."],
  ],
  C12H10N2: null,
  C14H8O4: [
    ["Madder_as_a_natural_dye.jpg", "Raiz de garança e lã tingida com alizarina", "A raiz da garança dá o vermelho da alizarina, usado para tingir tecidos por milhares de anos."],
    ["Alizarin_sublimed_crop.jpg", "Alizarina pura", "Em 1868, a alizarina foi a primeira tinta natural fabricada em laboratório, o que acabou com o cultivo da garança."],
    ["Rubia_peregrina01.jpg", "Flores da garança", "A garança é uma trepadeira de flores pequenas. A tinta vermelha está nas raízes."],
  ],
  C12H4Cl4O2: [
    ["US-Huey-helicopter-spraying-Agent-Orange-in-Vietnam.jpg", "Agente Laranja, contaminado com dioxina, na Guerra do Vietnã", "O Agente Laranja, herbicida usado na Guerra do Vietnã, estava contaminado com dioxina. Isso causou doenças e malformações por gerações."],
    ["Entrada_do_Incinerador_Vergueiro.jpg", "Incinerador de lixo, uma fonte de dioxinas", "Queimar lixo com cloro a temperatura baixa forma dioxinas. Incineradores modernos queimam muito quente e filtram a fumaça."],
  ],
  C6H12N4: [
    ["Vařič_na_pevný_líh.jpg", "Pastilhas de combustível sólido (hexamina)", "As pastilhas de hexamina queimam sem fumaça e sem derreter, por isso são usadas em fogareiros de acampamento e de soldados."],
    ["Hexamethylentetramin.jpg", "Hexamina pura", "A hexamina é feita de formaldeído e amônia. Ela também é usada como remédio contra infecção urinária."],
    ["Esbit_brand_Hexamine_tablets.JPG", "Pastilhas de combustível", "Uma pastilha de hexamina ferve uma caneca de água em poucos minutos."],
  ],
  C3Cl3N3O3: [
    ["Swimming_pool_at_Hotel_Terra_Barichara.jpg", "Piscinas usam pastilhas de cloro (ácido tricloroisocianúrico)", "As pastilhas de cloro de piscina costumam ser de ácido tricloroisocianúrico. Elas se dissolvem devagar e soltam cloro por dias."],
    ["Swimming_pool_and_terrasse_of_Amantaka_luxury_Resort_&_Hotel_in_Luang_Prabang_Laos.jpg", "Piscina", "A parte de ácido cianúrico protege o cloro da luz do Sol, que o destruiria rápido numa piscina ao ar livre."],
  ],
  C12H7Cl3O2: [
    ["Equate_antibacterial_liquid_hand_soap.jpg", "Sabonete antibacteriano com triclosan", "O triclosan foi muito usado em sabonetes antibacterianos. Os estudos não mostraram vantagem sobre o sabonete comum, e ele foi proibido nesses produtos nos EUA em 2016."],
    ["Reeva_antibacterial_liquid_soap.jpg", "Detergente com triclosan", "O triclosan se acumula em rios e pode ajudar bactérias a ficarem resistentes. Por isso muitos fabricantes o tiraram dos produtos."],
  ],
  Pr6O11: [
    ["Praseodymium(III)_oxide_(sample).jpg", "Óxido de praseodímio", "O óxido de praseodímio é um pó marrom-escuro. Ele é usado para colorir vidros e cerâmicas de amarelo."],
    ["China,_Qing_dynasty_(1644-1912),_Yongzheng_mark_and_reign_-_Bowl_with_Yellow_Glaze_-_2003.259.1_-_Cleveland_Museum_of_Art.jpg", "Cerâmica amarela colorida com praseodímio", "Esmaltes cerâmicos com praseodímio dão um amarelo forte e estável, que aguenta a queima."],
  ],
  Tb4O7: [
    ["Lamp_harp_with_fluorescent_bulb.jpg", "Lâmpada fluorescente: a luz verde vem do térbio", "Nas lâmpadas fluorescentes, um pó com térbio dá a luz verde. Ela se mistura com o vermelho do európio e o azul de outro pó para formar o branco."],
    ["Green_Phosphor.jpg", "Visão noturna usa fósforo de térbio", "Telas de óculos de visão noturna brilham em verde graças a pós fosforescentes. A cor verde foi escolhida porque o olho humano a enxerga melhor."],
    ["Terbium-2.jpg", "Térbio metálico", "O térbio é um metal prateado e mole das terras raras. Ele foi descoberto em um mineral da vila sueca de Ytterby."],
  ],
  Y3Al5O12: [
    ["Ti_Sapph_YAG_supercontinnum.jpg", "Laser com cristal de YAG", "O YAG é um cristal fabricado. Com neodímio misturado, ele forma lasers usados em cirurgias, indústria e pesquisa."],
    ["Laser_Towards_Milky_Ways_Centre.jpg", "Laser de estrela-guia em um telescópio", "Telescópios disparam lasers para criar uma \"estrela\" artificial no céu. Ela serve para corrigir em tempo real o tremor do ar na imagem."],
    ["Fluorescence_in_calcite.jpg", "Calcita brilhando sob luz ultravioleta", "Cristais com impurezas brilham sob luz ultravioleta. O YAG com cério faz o mesmo e transforma luz azul em amarela nos LEDs brancos."],
  ],
  CaH4SO6: [
    ["Cristales_cueva_de_Naica.JPG", "Cristais gigantes de gipsita na Caverna de Naica", "Na caverna de Naica, a água quente rica em minerais fez crescer cristais de gipsita do tamanho de postes."],
    ["Drywall.jpg", "Placas de gesso acartonado", "As placas de drywall têm um miolo de gesso entre duas folhas de papelão."],
    ["Gypsum_-_Sieroszowice_mine,_Lubin,_Lower_Silesia,_Poland.jpg", "Cristais de gipsita", "A gipsita é tão mole que pode ser riscada com a unha. Ela forma cristais grandes e transparentes."],
    ["Statuette_of_Apollo_Lykeios,_plaster_cast,_AM_of_Epidaurus,_202565.jpg", "Estátua de gesso", "O gesso em pó, misturado com água, endurece em minutos. Por isso é usado para fazer cópias de estátuas."],
  ],
  Ca5P3O12F: [
    ["Fluorapatite-Muscovite-tuc8-098a.jpg", "Cristal de fluorapatita", "A fluorapatita é o mineral mais comum do grupo da apatita. É dela que vem a maior parte do fósforo dos adubos."],
    ["Apatite_crystal_anisotropy_03.jpg", "Fluorapatita azul", "A apatita pode ser azul, verde, amarela ou violeta. O nome vem do grego apatao, \"enganar\", porque era confundida com outros minerais."],
    ["Apatite_Canada.jpg", "Cristal de fluorapatita", "Ao usar pasta com flúor, parte da hidroxiapatita do esmalte vira fluorapatita, que resiste mais aos ácidos."],
  ],
  Cu3C2H2O8: [
    ["Azurite_-_New_Nevada_Lode,_La_Sal,_Utah,_USA.jpg", "Azurita", "A azurita é um carbonato de cobre azul-escuro. Moída, ela foi um pigmento azul importante na pintura europeia."],
    ["Azurite,_Burra_Mine,_South_Australia.jpg", "Azurita em forma de cachos", "A azurita se forma em minas de cobre, perto da superfície, onde a água com gás carbônico ataca o minério."],
    ["Cerussite_with_azurite_on_malachite_NHMLA.png", "Azurita com malaquita", "Com o tempo, a azurita perde gás carbônico, ganha água e vira malaquita verde. Por isso as duas aparecem juntas."],
  ],
  C5H5NO2: [
    ["2g_ACE_All-Purpose_Super_Glue_tube.png", "Supercola (cianoacrilato)", "A supercola é cianoacrilato. Ela endurece em segundos ao encontrar a umidade do ar e das superfícies."],
    ["СУПЕР-КЛЕЙ_(cyanoacrylate)._Склеивание_детали_(1).jpg", "Cola instantânea colando peças", "Uma gota fina basta: as moléculas se ligam em longas cadeias e grudam as peças. Também gruda dedos, então é preciso cuidado."],
  ],
  C9H9N: [
    ["Asian_Palm_Civet_Over_A_Tree.jpg", "Civeta: seu almíscar tem escatol", "Em pouca quantidade, o escatol tem cheiro floral. Ele aparece em perfumes e no almíscar da civeta."],
    ["Elephant_feces_in_the_wildlife.jpg", "O cheiro das fezes vem do escatol", "O escatol é formado no intestino a partir do triptofano e é uma das substâncias que dão o cheiro das fezes."],
  ],
  C4H12N2: [
    ["Moldy_chicken.JPG", "Carne estragada: a putrescina dá o mau cheiro", "Quando a carne apodrece, bactérias quebram os aminoácidos e formam putrescina e cadaverina, de cheiro horrível."],
    ["Chrysomya_albiceps_eating.jpg", "Moscas são atraídas pela putrescina", "Moscas-varejeiras são atraídas pela putrescina. Elas põem os ovos em carne em decomposição."],
  ],
  C8H16O2: [
    ["Geitenmelk.jpg", "Leite de cabra: o ácido caprílico tem nome de cabra (capra)", "O ácido caprílico está na gordura do leite de cabra e dá parte do cheiro forte. O nome vem do latim capra, \"cabra\"."],
    ["Coconuts_-_single_and_cracked_open.jpg", "Coco: o óleo de coco tem ácido caprílico", "O óleo de coco tem cerca de 7% de ácido caprílico. Ele também é usado em suplementos e cosméticos."],
  ],
  CH8N2O3: [
    ["Ammonia_inhalants,_to_revive_patient_from_fainting_of_shock,_to_be_used_as_smelling_salts,_front_side.JPG", "Sais de cheiro (carbonato de amônio)", "Os sais de cheiro soltam amônia, que irrita o nariz e faz a pessoa respirar fundo. Eram usados para despertar quem desmaiava."],
    ["Ammonium_Carbonate.jpg", "Carbonato de amônio", "O carbonato de amônio se decompõe aos poucos ao ar e solta amônia. Ele também já foi usado como fermento."],
  ],
  C4H11N5: [
    ["Metformin_500mg_Tablets.jpg", "Comprimidos de metformina", "A metformina é o remédio mais usado contra o diabetes tipo 2. Ela diminui a produção de glicose pelo fígado."],
    ["Metformin-HCl_substance_photo.jpg", "Metformina em cristais", "A metformina veio de uma substância de uma planta europeia, a galega, usada há séculos contra os sintomas do diabetes."],
  ],
  C4H7N3O: [
    ["2026_-_Blood_test_samples.jpg", "Exame de sangue mede a creatinina", "A creatinina vem do uso da creatina pelos músculos. Os rins a eliminam, por isso o nível no sangue mostra como eles funcionam."],
  ],
  C6H11NOS2: [
    ["Broccoli_and_cross_section_edit.jpg", "Brócolis: tem o precursor do sulforafano", "O brócolis tem glicorafanina. Quando ele é cortado ou mastigado, uma enzima a transforma em sulforafano."],
    ["Purple_sprouting_broccoli_(explored)_-_Flickr_-_conall...jpg", "Brócolis roxo", "Os brotos de brócolis têm muito mais glicorafanina que o brócolis adulto. O sulforafano é estudado por seus efeitos protetores."],
  ],
  C7H14N2O3: [
    ["Tea_garden_at_Nagri_in_the_Kangra_Valley_of_Himachal_Pradesh,_India.jpg", "Plantação de chá: a teanina vem das folhas", "A teanina é um aminoácido quase exclusivo da planta do chá. Ela dá parte do sabor umami do chá verde."],
    ["Jakseol_green_tea_leaves_2.jpg", "Folhas de chá colhidas", "Plantas cultivadas na sombra fazem mais teanina. Por isso o chá matcha é tão saboroso."],
    ["Zhu-Ye-Qing-Tea-03.jpg", "Folhas de chá secas", "A teanina tem efeito calmante e equilibra o efeito da cafeína do chá."],
  ],
  C7H5NaO2: [
    ["Soft_drink_shelf_2.jpg", "Refrigerantes usam benzoato de sódio como conservante", "O benzoato de sódio impede o crescimento de fungos e leveduras em bebidas ácidas, como refrigerantes e sucos."],
    ["Sodium_benzoate-substance.jpg", "Benzoato de sódio em pó", "O benzoato de sódio é um pó branco. Ele funciona melhor em alimentos ácidos, onde vira ácido benzoico."],
    ["Benzoateofsoda.jpg", "Propaganda antiga sobre o benzoato", "No início do século XX houve um grande debate sobre os conservantes. O benzoato acabou sendo considerado seguro em pequenas doses."],
  ],
  SgC6O6: [
    ["RIKEN_RIBF_P4208166.jpg", "Acelerador do RIKEN, no Japão, onde a química do seabórgio foi estudada", "Em 2014, no RIKEN, cientistas formaram hexacarbonila de seabórgio com poucos átomos. Foi o primeiro composto desse tipo de um elemento superpesado."],
    ["GSI-Darmstadt-Südbau.jpg", "GSI, na Alemanha", "O seabórgio foi criado em 1974, em Berkeley. O nome homenageia Glenn Seaborg, que ainda estava vivo na época."],
  ],
  C7H5NO3S: [
    ["Saccharin-Na_substance_photo.jpg", "Sacarina", "A sacarina foi descoberta por acaso em 1879, quando um químico sentiu gosto doce nas mãos. Ela é cerca de 300 vezes mais doce que o açúcar."],
    ["Equal_Saccharin_Sweetner.jpg", "Sachês de adoçante", "A sacarina não tem calorias e deixa um leve gosto amargo no final, por isso costuma ser misturada com outros adoçantes."],
    ["Süßstoff_Saccharin_Zucker-Museum.jpg", "Caixa antiga de sacarina", "Na Primeira Guerra Mundial, a falta de açúcar fez a sacarina ficar popular na Europa."],
  ],
  C8H8O3: [
    ["Vanilla_6beans.JPG", "Favas de baunilha: o aroma é vanilina", "A baunilha é a fava curada de uma orquídea do México. A vanilina é a principal substância do aroma."],
    ["Vanilla_beans.jpg", "Favas de baunilha verdes na planta", "As favas verdes não têm cheiro. A vanilina se forma durante a cura, que leva meses."],
    ["Vanilla_bean_ice_cream_(3086700978).jpg", "Sorvete de baunilha", "A maior parte dos sorvetes e doces de baunilha usa vanilina fabricada, bem mais barata que a fava."],
    ["Vanlilin_vzorek.jpg", "Vanilina pura", "A vanilina pura forma cristais brancos. Ela é feita de petróleo ou da lignina da madeira."],
  ],
  C5H8NNaO4: [
    ["Ramen_Jump_002.jpg", "Lámen: o caldo é rico em glutamato", "O caldo de lámen é feito com ossos, algas e cogumelos, ricos em glutamato, que dá o sabor umami."],
    ["Monosodium_glutamate_crystals.jpg", "Glutamato monossódico", "O glutamato monossódico (MSG) é o sal de sódio do ácido glutâmico. Ele realça o sabor salgado dos alimentos."],
    ["Kombu.jpg", "Alga kombu, onde o glutamato foi descoberto", "Em 1908, Kikunae Ikeda descobriu que o sabor do caldo de alga kombu vinha do glutamato."],
  ],
  C6H8O6: [
    ["Kiwi_(Actinidia_chinensis)_1_Luc_Viatour.jpg", "Kiwis são ricos em vitamina C", "O kiwi tem mais vitamina C que a laranja, pelo mesmo peso."],
    ["Oranges_-_whole-halved-segment.jpg", "Laranja", "A vitamina C ajuda a formar o colágeno. Sem ela, os marinheiros antigos tinham escorbuto, com sangramento das gengivas."],
    ["Malpighia_glabra_blossom_and_fruit.jpg", "Acerola", "A acerola é uma das frutas mais ricas em vitamina C: pode ter dezenas de vezes mais que a laranja."],
    ["Vitamin_C_supplements_1.jpg", "Comprimidos de vitamina C", "O ser humano não produz vitamina C, ao contrário da maioria dos animais. Por isso precisamos dela na comida."],
  ],
  C8H9NO2: [
    ["Tylenol_paracetamol_sustained_release_tablets,_Chinese_version_(20221212120513).jpg", "Comprimidos de paracetamol", "O paracetamol alivia a dor e baixa a febre. Ele é seguro na dose certa, mas em excesso causa grave dano ao fígado."],
    ["Paracetamol_substance_photo.jpg", "Cristais de paracetamol", "O paracetamol puro é um pó branco e amargo. Ele é um dos remédios mais usados no mundo."],
  ],
  C6H8O7: [
    ["Citrus_fruits.jpg", "Frutas cítricas: o azedo é ácido cítrico", "O ácido cítrico dá o azedo de limões, laranjas e outras frutas cítricas."],
    ["Lemon_-_whole_and_split.jpg", "Limão", "O limão tem cerca de 5% a 6% de ácido cítrico no suco."],
    ["Lemon_pepper_preparation.jpg", "Tempero de limão e pimenta", "Temperos com sabor de limão costumam levar ácido cítrico em pó. Hoje ele é produzido por fungos que fermentam açúcar."],
  ],
  C9H8O4: [
    ["Regular_strength_enteric_coated_aspirin_tablets.jpg", "Comprimidos de aspirina", "A aspirina alivia a dor e a febre. Em doses pequenas, ela é usada para evitar coágulos no sangue."],
    ["Old_Package_of_Aspirin.jpg", "Embalagem antiga de aspirina", "A aspirina foi lançada em 1899 pela Bayer. É um dos remédios mais vendidos da história."],
    ["Acetylsalicylic_acid.jpg", "Ácido acetilsalicílico puro", "O ácido acetilsalicílico é feito a partir do ácido salicílico. Ele irrita menos o estômago do que o ácido original."],
  ],
  C10H14N2: [
    ["Patch_of_Tobacco_(Nicotiana_tabacum_)_in_a_field_in_Intercourse,_Pennsylvania..jpg", "Plantas de tabaco", "O tabaco produz nicotina nas raízes, e ela se acumula nas folhas. Para a planta, a nicotina é um inseticida natural."],
    ["Tobacco_Plant_Flower_Buds.jpg", "Flores do tabaco", "O tabaco é da mesma família do tomate e da batata. Ele é nativo das Américas."],
    ["DunhillEarlyMorningPipeMurrays.jpg", "Folhas de tabaco secas", "A nicotina das folhas de tabaco causa forte dependência. Ela age no cérebro em segundos."],
  ],
  C10H20O: [
    ["Mint_leaves_(Mentha_spicata).jpg", "Hortelã-pimenta: rica em mentol", "O mentol dá a sensação de frescor porque ativa os sensores de frio da pele e da boca. A hortelã-pimenta é a mais rica nele; a hortelã comum tem pouco."],
    ["Menthol_Crystals.JPG", "Cristais de mentol", "O mentol forma cristais incolores. Ele é usado em pastilhas, cremes e pomadas."],
  ],
  C14H18N2O5: [
    ["Can_of_Diet_Sierra_Mist_lemon-lime_soda,_2011.jpg", "Refrigerantes diet usam aspartame", "O aspartame é cerca de 200 vezes mais doce que o açúcar. Ele perde a doçura com o calor, por isso não serve para assar."],
    ["Aspartame_sample_recrystallised.jpg", "Aspartame em pó", "O aspartame é feito de dois aminoácidos, a fenilalanina e o ácido aspártico, unidos. Foi descoberto por acaso em 1965."],
  ],
  C12H22O11: [
    ["Würfelzucker_--_2018_--_3582.jpg", "Cubos de açúcar", "O açúcar de mesa é sacarose, uma glicose e uma frutose unidas."],
    ["Sugarcane_jbi_gallery.jpg", "Cana-de-açúcar", "O Brasil é o maior produtor de cana-de-açúcar do mundo. O açúcar é tirado do caldo da cana."],
    ["Crystallized_sugar,_multiple_crystals_and_a_single_crystal_grown_from_seed.jpg", "Cristais de açúcar-cande", "Com a água evaporando devagar, a sacarose forma cristais grandes de açúcar-cande."],
  ],
  C18H27NO3: [
    ["BhutJolokia09_Asit.jpg", "Pimentas: o ardido é capsaicina", "O ardido das pimentas é capsaicina. Ela ativa os mesmos sensores da pele que percebem o calor."],
    ["Capsicum_baccatum_in_Saúde_flea_market,_São_Paulo,_Brazil.jpg", "Pimentas no mercado", "A ardência das pimentas é medida na escala Scoville. A capsaicina fica sobretudo na parte branca de dentro, junto às sementes."],
    ["Habanero.jpg", "Pimenta habanero", "A capsaicina não se dissolve em água. Por isso o leite alivia melhor o ardido do que a água."],
  ],
  C10H16O: [
    ["Camphor_tree_and_Merlin.jpg", "Árvore de cânfora", "A cânfora é tirada da madeira da canforeira, uma árvore da Ásia."],
    ["Camphor_Cubes.jpg", "Tabletes de cânfora", "Os tabletes de cânfora passam direto de sólido a gás e têm cheiro forte, que espanta insetos."],
    ["The_Chemist_and_Druggist_-_advertising_from_Volume_30,_11_June_1887_03.jpg", "Embalagem antiga de cânfora", "A cânfora era usada em pomadas para tosse e dores. Engolida, ela é tóxica."],
  ],
  C9H13NO3: [
    ["Adrenalina_autoinyector9.JPG", "Caneta de adrenalina para alergias graves", "Numa alergia grave (anafilaxia), uma injeção de adrenalina na coxa abre as vias aéreas e sobe a pressão em minutos."],
    ["Lagoon_Roller_Coaster_winter.jpeg", "Montanha-russa dispara adrenalina", "No susto, as glândulas suprarrenais soltam adrenalina, que acelera o coração e prepara o corpo para reagir."],
  ],
  C10H12N2O: [
    ["Sa-sleeping-koala.JPG", "Coala dormindo: a serotonina vira melatonina, que regula o sono", "À noite, o corpo transforma serotonina em melatonina, o hormônio que regula o sono. Coalas dormem até 20 horas por dia."],
    ["White_dog_sleeping_on_the_floor_with_puppies_after_nursing_in_Don_Det_Laos.jpg", "Cachorros dormindo", "A serotonina ajuda a regular o humor, o sono e o apetite. Cerca de 90% dela fica no intestino."],
  ],
  C13H18O2: [
    ["Ibuprofen_tablets_in_palm_of_hand.jpg", "Comprimidos de ibuprofeno", "O ibuprofeno é um anti-inflamatório: alivia a dor, a febre e a inflamação."],
    ["Amneal_Pharmaceuticals_ibuprofen_tablets.jpg", "Comprimidos brancos de ibuprofeno", "O ibuprofeno foi criado nos anos 1960 no Reino Unido. Em excesso, ele pode irritar o estômago e os rins."],
    ["Ibuprofen_made_in_DE_for_the_RU_market_in_UA_colours,_May_2026_04.jpg", "Pomada de ibuprofeno", "Em gel ou pomada, o ibuprofeno é aplicado direto no local da dor."],
  ],
  C20H30O: [
    ["Carrots_of_many_colors.jpg", "Cenouras: o betacaroteno vira vitamina A no corpo", "A cenoura tem betacaroteno, que o corpo transforma em vitamina A. Ela é essencial para enxergar no escuro."],
    ["Preparing_and_slicing_carrots.jpg", "Cenouras picadas", "O betacaroteno dá a cor laranja à cenoura. As cenouras antigas eram roxas ou amarelas."],
  ],
  C8H20Pb: [
    ["EthylCorporationSign.jpg", "Placa antiga de gasolina com chumbo (Ethyl)", "Entre os anos 1920 e 1990, o chumbo tetraetila foi adicionado à gasolina para evitar a batida do motor. Ele espalhou chumbo pelo ar do mundo todo."],
    ["Gas_pump_lead_warningSmall.jpg", "Aviso de combustível com chumbo tetraetila", "As bombas avisavam sobre o chumbo, que é tóxico. O Brasil tirou o chumbo da gasolina em 1989."],
    ["Gasoline_in_mason_jar.jpg", "Chumbo tetraetila", "O chumbo tetraetila é um líquido incolor e muito tóxico. Ele só ainda é usado em combustível de pequenos aviões."],
  ],
  C12H24O2: [
    ["Coconuts_-_single_and_cracked_open.jpg", "Coco: o óleo de coco é rico em ácido láurico", "Cerca de metade da gordura do coco é ácido láurico."],
    ["Coconut_oil_2.jpg", "Óleo de coco", "O óleo de coco endurece abaixo de cerca de 24 °C, porque tem muitas gorduras saturadas como o ácido láurico."],
    ["Cocos_nucifera_'Red_Spicata_Dwarf'_kz02.jpg", "Coqueiros", "O coqueiro é cultivado em todo o litoral tropical. Óleo de coco e de palmiste são as principais fontes de ácido láurico."],
  ],
  C11H12N2O2: [
    ["Glass_of_Milk_(33657535532).jpg", "Leite, rico em triptofano", "O triptofano é um aminoácido essencial. O corpo o usa para produzir serotonina e melatonina."],
    ["Krůtí_prsa.jpg", "Peito de peru, rico em triptofano", "O sono depois de um grande almoço vem mais da quantidade de comida do que do triptofano do peru."],
  ],
  C10H16N5O13P3: [
    ["Firefly_Nevit_02670_cr.jpg", "Vaga-lume: a luz é produzida com energia do ATP", "No vaga-lume, uma enzima usa a energia do ATP para fazer a luciferina emitir luz."],
    ["Mitochondria,_mammalian_lung_-_TEM.jpg", "Mitocôndrias, onde o ATP é produzido", "As mitocôndrias produzem a maior parte do ATP da célula. Uma pessoa produz e gasta por dia mais ou menos o próprio peso em ATP."],
  ],
  C10H18O: [
    ["Eucalyptus_punctata_-_adult_leaves.jpg", "Folhas de eucalipto", "O eucaliptol é a principal substância do óleo das folhas de eucalipto e dá o cheiro refrescante."],
    ["Eucalyptus_Oil_Bottles_Inglewood.jpg", "Frascos antigos de óleo de eucalipto", "O óleo de eucalipto é usado em inalações e pastilhas para aliviar o nariz entupido."],
    ["Boronda_Road_Eucalyptus_Tree_Row.jpg", "Eucaliptos", "Os eucaliptos são nativos da Austrália. No Brasil, eles são muito plantados para fazer papel e carvão."],
  ],
  C12H22O: [
    ["Petrichor_The_Smell_of_Rain.png", "Broto na terra molhada: o cheiro de chuva é geosmina", "O cheiro de terra molhada depois da chuva vem em parte da geosmina, produzida por bactérias do solo."],
    ["Petrichor.jpg", "Chuva: o cheiro de terra molhada vem da geosmina", "O nariz humano sente a geosmina em quantidades de poucas partes por trilhão."],
    ["Beta_vulgaris,_San_Francisco_farmers_market.jpg", "Beterrabas: o gosto de terra também é geosmina", "A beterraba produz geosmina, que dá o gosto de terra."],
  ],
  C11H14O3: [
    ["Candied_Ginger_(IMG_7223).jpg", "Gengibre cristalizado: cozinhar o gengibre forma zingerona", "Quando o gengibre é cozido ou seco, parte do gingerol se transforma em zingerona, que é menos ardida e mais adocicada."],
    ["Zingiber_officinale_230935597.jpg", "Plantação de gengibre", "O gengibre é um caule subterrâneo (rizoma) de uma planta tropical da Ásia."],
  ],
  C17H26O4: [
    ["Ginger_rhizomes.jpg", "Raízes de gengibre: o ardido é gingerol", "O gingerol dá o ardido do gengibre fresco. Ele é parecido com a capsaicina das pimentas."],
    ["Zingiber_officinale_230935597.jpg", "Planta de gengibre", "A planta do gengibre tem folhas longas. A parte comida é o rizoma, que cresce debaixo da terra."],
  ],
  C17H19NO3: [
    ["Black_Pepper_-_Piper_nigrum_-_Le_Jardin_du_Roi_-_01.jpg", "Pimenta-do-reino no pé", "A pimenta-do-reino é o fruto de uma trepadeira da Índia. A piperina dá o ardido."],
    ["Pink_Peppercorns_-_Schinus_molle.jpg", "Pimenta-rosa (aroeira)", "A pimenta-rosa é fruto da aroeira, uma árvore da América do Sul. Ela não é parente da pimenta-do-reino e não tem piperina."],
    ["Piperine_crystals.jpg", "Cristais de piperina", "A piperina pura forma cristais amarelados. A pimenta-do-reino tem de 5% a 9% dela."],
  ],
  C21H20O6: [
    ["Curcuma_longa_roots.jpg", "Açafrão-da-terra (cúrcuma)", "A curcumina dá o amarelo forte à cúrcuma e ao curry. O rizoma é parecido com o do gengibre."],
    ["Curcumin_fluorescence.jpg", "A curcumina brilha sob luz ultravioleta", "Sob luz ultravioleta, a curcumina brilha em amarelo-esverdeado."],
    ["Kurkumina.jpg", "Cúrcuma em pó", "A curcumina mancha muito e muda de cor com bases: fica vermelha com sabão ou bicarbonato."],
  ],
  C16H10N2O2: [
    ["Indian_indigo_dye_lump.jpg", "Bloco de corante índigo", "O índigo era tirado de plantas na Índia e vendido em blocos. O nome vem do grego indikon, \"da Índia\"."],
    ["High_waisted_jeans_1435042736.jpg", "Calça jeans tingida de índigo", "O jeans é tingido com índigo só por fora do fio, por isso desbota e fica claro com o uso."],
    ["Indigo_as_a_natural_dye.jpg", "Lã tingida com índigo", "O índigo não se dissolve em água. Para tingir, ele é transformado numa forma solúvel, que fica azul de novo ao ar."],
  ],
  C16H18N2O4S: [
    ["Penicillium_digitatum,_Penicillium_italicum_(Green_Mold,_Blue_Mold)_on_Squash_(51822354805).jpg", "Mofo Penicillium, de onde vem a penicilina", "Os fungos Penicillium aparecem como mofo verde-azulado em frutas. Alguns produzem penicilina."],
    ["Sample_of_penicillin_mould_presented_by_Alexander_Fleming_to_Douglas_Macleod,_1935_(9672239344).jpg", "Amostra original do fungo de Fleming", "Em 1928, Alexander Fleming percebeu que um mofo matava as bactérias de uma placa. Assim descobriu a penicilina."],
    ["Penicillin_Past,_Present_and_Future-_the_Development_and_Production_of_Penicillin,_England,_1943_D16965.jpg", "Produção de penicilina nos anos 1940", "A produção em massa de penicilina começou nos anos 1940, a tempo de salvar soldados na Segunda Guerra."],
  ],
  C16H19N3O5S: [
    ["Amoxicillin_500mg_capsules_on_a_plate_(Sandoz).jpg", "Cápsulas de amoxicilina", "A amoxicilina é um antibiótico da família da penicilina, um dos mais receitados. Ela não funciona contra vírus, como o da gripe."],
    ["Generic_amoxicillin-clavulanic_acid_tablets_with_875mg_amoxicillin.jpg", "Comprimidos de amoxicilina", "Muitas vezes a amoxicilina vem com ácido clavulânico, que impede algumas bactérias de destruí-la."],
  ],
  C14H22N2O: [
    ["Lidocaine_hci.jpg", "Frasco de lidocaína", "A lidocaína bloqueia os sinais de dor dos nervos por cerca de uma a duas horas, só no local da aplicação."],
    ["US_Navy_050326-N-0357S-021_Cmdr._Mark_Roback,_a_Navy_dentist_from_the_Military_Sealift_Command_(MSC)_hospital_ship_USNS_Mercy_(T-AH_19),_speaking_to_his_patient_through_an_interpreter,_tells_her_that_the_injection_he_is_giving.jpg", "Anestesia local no dentista", "No dentista, a lidocaína com adrenalina adormece o dente. A adrenalina faz o efeito durar mais."],
  ],
  C14H9Cl5: [
    ["DDT_spray_1958.jpg", "Pulverização de DDT contra mosquitos (anos 1940)", "Nos anos 1940 e 1950, o DDT foi pulverizado em casas e pessoas e ajudou a eliminar a malária em vários países."],
    ["1955._Ford_tri-motor_spraying_DDT._Western_spruce_budworm_control_project._Powder_River_control_unit,_OR._(32213742634).jpg", "Avião espalhando DDT", "O DDT espalhado por aviões se acumulou nas cadeias alimentares e afinou a casca dos ovos de aves. O livro Primavera Silenciosa, de 1962, alertou para isso."],
    ["Mosquito_2007-2.jpg", "Mosquito transmissor da malária", "Os mosquitos Anopheles transmitem a malária. Muitos ficaram resistentes ao DDT, que hoje só é usado em casos limitados."],
  ],
  C19H28O2: [
    ["Depo-testosterone_200_mg_ml_crop.jpg", "Testosterona injetável", "A testosterona é o principal hormônio masculino. Injeções dela tratam quem produz pouco."],
    ["David_Hoffmann_(Bodybuilder).jpg", "Músculos crescem com testosterona", "A testosterona aumenta a massa muscular. Usar anabolizantes sem indicação médica causa graves danos ao coração e ao fígado."],
  ],
  C18H24O2: [
    ["Zumenon_(estradiol_hemihydrate)_tablets_in_Australia,_with_one_unopened_blister_pack.jpg", "Comprimidos de estradiol", "O estradiol é o principal hormônio feminino. Comprimidos de estradiol são usados na reposição hormonal da menopausa."],
  ],
  C13H16N2O2: [
    ["Stars_in_the_night_sky_above_the_boreal_forest,_Chisasibi,_Quebec,_Canada.jpg", "Noite estrelada: a melatonina é produzida no escuro", "A glândula pineal produz melatonina quando escurece. Ela avisa ao corpo que é hora de dormir."],
    ["Walgreens_Melatonin-2010-20-07.jpg", "Suplemento de melatonina", "A melatonina em comprimido ajuda a ajustar o sono, por exemplo depois de viagens com fuso horário diferente."],
    ["014_Baby_cape_fur_seal_sleeping_at_Cape_cross_Photo_by_Giles_Laurent.jpg", "Animais dormindo", "Quase todos os animais produzem melatonina à noite. Ela ajusta o relógio biológico ao dia e à noite."],
  ],
  C15H16O2: [
    ["Thermal_paper_rolls_with_red_alert_line.jpg", "Papel térmico de notas fiscais tem bisfenol A", "O papel das notas fiscais costuma ter bisfenol A ou parecidos, que escurecem com o calor da impressora."],
    ["Polycarbonate_water_bottle.JPG", "Garrafa de policarbonato (feito de bisfenol A)", "O policarbonato, feito de bisfenol A, é duro e transparente. Muitos produtos para bebês passaram a ser \"sem BPA\" porque ele imita hormônios."],
  ],
  C12H25NaO4S: [
    ["Foam_-_big.jpg", "Espuma: o lauril sulfato faz xampus espumarem", "O lauril sulfato de sódio é um detergente que faz muita espuma. Ele está em xampus, sabonetes líquidos e pastas de dente."],
    ["2023_Szampon_przeciwłupieżowy_Ziaja.jpg", "Xampu", "Os detergentes têm uma ponta que gosta de água e outra que gosta de gordura. Assim eles arrancam a oleosidade e a levam embora."],
    ["Moscow._Khimkinskiy_boulevard._Fountain_filled_with_shampoo.JPG", "Espuma de detergente numa fonte", "Uma brincadeira comum é colocar xampu numa fonte: a água agitada forma montanhas de espuma."],
  ],
  C12H19Cl3O8: [
    ["Sucrin_tabletop_sweetener_packets.jpg", "Sachês de adoçante", "A sucralose é feita do açúcar comum, trocando três partes da molécula por cloro. Ela é cerca de 600 vezes mais doce e aguenta o calor do forno."],
  ],
  C10H22: [
    ["Kerosene_bottle.jpg", "Querosene contém decano", "O querosene é uma mistura de hidrocarbonetos de 10 a 16 carbonos, como o decano. Ele é a base do combustível de aviões a jato."],
    ["4_litre_Kristallfotogen_kerosene_can_by_Aktiebolaget_Lyse_Sweden_early_20th_century.jpg", "Lata antiga de querosene", "Antes da luz elétrica, as casas eram iluminadas por lampiões de querosene."],
  ],
  C20H12: [
    ["Exhaling_cloud_of_cigarette_smoke_(50652653823).png", "Fumaça de cigarro contém benzopireno", "O benzopireno se forma quando a matéria orgânica queima de forma incompleta. Ele é um dos principais cancerígenos da fumaça do cigarro."],
    ["Grilled_meat_and_fish.jpg", "Carne grelhada no fogo também forma benzopireno", "Quando a gordura da carne pinga no fogo, a fumaça deposita benzopireno na superfície. Carnes muito tostadas têm mais."],
    ["Carbon_black.jpg", "Fuligem", "A fuligem foi a primeira causa de câncer ligada ao trabalho: em 1775, um médico a ligou ao câncer dos limpadores de chaminés de Londres."],
  ],
  C15H24O: [
    ["Froot-Loops-Cereal-Bowl.jpg", "Cereais matinais usam BHT para não rançar", "O BHT é um antioxidante: ele reage com o oxigênio antes da gordura e impede que cereais e óleos fiquem rançosos."],
    ["Quaker_Life_Multigrain_Cereal,_with_milk.jpg", "Cereal com leite", "Algumas embalagens de cereal tinham BHT no plástico do saco para proteger o alimento."],
  ],
  C13H20O: [
    ["Viola_reichenbachiana_001.jpg", "Violetas: o perfume vem das iononas", "As iononas dão o perfume das violetas. Elas fazem o nariz parar de sentir o cheiro por alguns instantes, que depois volta."],
    ["Try_vio-violet_a_new_Lundborg_perfume_(2015646922).jpg", "Propaganda antiga de perfume de violeta", "Antes de 1893, o perfume de violeta era raro e caro. A síntese das iononas o deixou popular."],
  ],
  C14H12O3: [
    ["Red_Wine_Glass.jpg", "Vinho tinto contém resveratrol", "O vinho tinto tem resveratrol porque fermenta junto com a casca da uva. O efeito dele na saúde ainda é debatido."],
    ["2021-07-11_13_07_30_Red_table_grapes_in_the_Franklin_Farm_section_of_Oak_Hill,_Fairfax_County,_Virginia.jpg", "Uvas tintas", "A casca da uva produz resveratrol para se defender de fungos e da luz ultravioleta."],
    ["Resveratrol,_Anregung_360_nm.jpg", "Cristais de resveratrol sob luz UV", "O resveratrol brilha azul quando recebe luz ultravioleta."],
  ],
  C15H10O7: [
    ["Capparis_spinosa-IMG_3417.jpg", "Flor de alcaparra: as alcaparras são ricas em quercetina", "As alcaparras são botões de flor desta planta mediterrânea. Elas estão entre os alimentos mais ricos em quercetina."],
    ["DoNotAge_Quercetin_Broken_Capsule_Revealing_Powder_-_53397805137.jpg", "Quercetina em pó", "A quercetina é um pigmento amarelo das plantas, presente também na cebola roxa, na maçã e no chá."],
  ],
  C18H30O2: [
    ["Brown_Flax_Seeds.jpg", "Sementes de linhaça, ricas em ácido linolênico", "A linhaça é uma das maiores fontes de ácido alfa-linolênico, um ômega-3 que o corpo não produz."],
    ["Chia_seeds_in_a_cup.jpg", "Sementes de chia", "A semente de chia também é rica em ômega-3. Na água, ela forma um gel."],
    ["Linum_usitatissimum_qtl1.jpg", "Flor do linho", "Da planta do linho saem a linhaça e as fibras do tecido de linho. O óleo de linhaça seca ao ar e era usado em tintas a óleo."],
  ],
  C20H30O2: [
    ["Omega_3_Fish_oil_softgel_capsules.jpg", "Cápsulas de óleo de peixe (ômega-3)", "O EPA é um ômega-3 dos peixes. Os peixes o recebem das algas que comem ou de outros peixes."],
    ["Sammamish_kokanee_(51666400632).jpg", "Salmão, rico em EPA", "Os salmões de rio, como o kokanee, ficam vermelhos na época da reprodução. Os peixes de águas frias costumam ter mais ômega-3."],
    ["2014_03_19_397_Eingelegte_Fische.jpg", "Sardinhas", "Sardinhas são uma das fontes mais baratas de EPA e DHA."],
  ],
  C10H20O2: [
    ["Orange-Fruit-Pieces.jpg", "Laranjas: o aroma tem acetato de octila", "O acetato de octila é um éster com cheiro de laranja. Ele faz parte do aroma da fruta e é usado em aromatizantes."],
  ],
  C20H24N2O2: [
    ["Non-UV_vs._UV_illuminated_tonic_water.jpg", "Água tônica brilha sob luz ultravioleta por causa da quinina", "A quinina dá o amargo da água tônica e brilha azul sob luz ultravioleta."],
    ["Cinchona_officinalis_001.JPG", "Casca de quina, de onde vem a quinina", "A casca da quina, árvore dos Andes, foi o primeiro remédio eficaz contra a malária."],
    ["Cinchona_calisaya_-_Köhler–s_Medizinal-Pflanzen-179.jpg", "A árvore da quina", "A quinina foi o principal remédio contra a malária por mais de 300 anos. A árvore da quina está no brasão do Peru."],
  ],
  C14H11Cl2NO2: [
    ["Diclofenac_Topical_Gel.jpg", "Gel de diclofenaco", "O gel de diclofenaco é aplicado na pele sobre a dor. Ele chega aos músculos e às articulações com pouco efeito no estômago."],
    ["Diclofenac_Natrium_50mg_Aurobindo.jpg", "Comprimidos de diclofenaco", "O diclofenaco é um anti-inflamatório potente. Em comprimidos, deve ser usado por pouco tempo por causa dos riscos ao estômago e ao coração."],
  ],
  C17H19N3O3S: [
    ["Omeprazol_Activis_capsules.jpg", "Cápsulas de omeprazol", "O omeprazol bloqueia a bomba que produz o ácido no estômago e alivia a azia e as úlceras."],
    ["Omeprazol_2012-10-14-0779.jpg", "Cápsula de omeprazol", "A cápsula tem grânulos com uma capa que resiste ao ácido do estômago. O remédio só é liberado no intestino."],
  ],
  C12H17NO: [
    ["Girl_applies_Insect_spray.jpg", "Repelente com DEET", "O DEET foi criado pelo exército dos EUA em 1946. Ele confunde os sensores que os mosquitos usam para achar a pele."],
    ["Off_and_Cutter_DEET_Insect_Repellent_-_Bug_Spray_(27827388427).jpg", "Repelentes em spray", "Os repelentes têm de 7% a cerca de 30% de DEET. Quanto mais concentrado, mais tempo o efeito dura, mas não fica mais forte."],
  ],
  C10H13N5O4: [
    ["Roasted_coffee_beans.jpg", "Café: a cafeína bloqueia a adenosina, que dá sono", "A adenosina se acumula no cérebro ao longo do dia e dá sono. A cafeína tem forma parecida e bloqueia os receptores dela."],
    ["A_small_cup_of_coffee.JPG", "Xícara de café", "Por isso o café deixa a pessoa acordada: ele impede que o cérebro perceba a adenosina."],
    ["Adenosine_6.jpg", "Adenosina usada como remédio", "Na emergência, uma injeção rápida de adenosina corrige alguns ritmos acelerados do coração."],
  ],
  C8H24O4Si4: [
    ["Cosmetics-1078712_1280.jpg", "Maquiagens levam ciclometicona", "A ciclometicona é um silicone líquido que evapora e deixa a pele e o cabelo macios, sem ficar oleosos."],
    ["2023_Szampon_przeciwłupieżowy_Ziaja.jpg", "Xampus e cremes", "Em condicionadores e cremes, a ciclometicona ajuda a espalhar o produto e depois evapora."],
  ],
  C16H18ClN3S: [
    ["Bleu_de_méthylène.jpg", "Azul de metileno se espalhando na água", "O azul de metileno colore muito mesmo em pouca quantidade. Uma gota se espalha pela água em nuvens azuis."],
    ["Human_Cheek_Cells.jpg", "Células coradas com azul de metileno", "O azul de metileno tinge o núcleo das células e o deixa visível no microscópio."],
    ["Reflections_in_a_flask_of_Methylene_Blue.jpg", "Solução de azul de metileno", "O azul de metileno foi o primeiro remédio sintético, usado contra a malária no século XIX. Ele também trata peixes de aquário."],
  ],
  C20H12O5: [
    ["Chicago_River_dyed_green,_buildings_more_prominent.jpg", "Rio de Chicago tingido de verde no Dia de São Patrício", "Todo ano, no Dia de São Patrício, o rio de Chicago é tingido de verde. Em 1962, usou-se fluoresceína; hoje se usa um corante vegetal."],
    ["Florescein.jpg", "Fluoresceína brilha sob luz ultravioleta", "A fluoresceína brilha verde-amarelado sob luz azul ou ultravioleta. Ela é usada para rastrear a água de rios e vazamentos."],
    ["Fluorescein-Stained_Central_Corneal_Epithelial_Defect_in_Infective_Keratitis.jpg", "Exame de olho com fluoresceína", "No oftalmologista, um colírio de fluoresceína faz arranhões na córnea brilharem verdes sob luz azul."],
  ],
  C16H8Br2N2O2: [
    ["Brandhorn_Bolinus_brandaris.jpg", "Caramujo-múrex: a púrpura de Tiro vem dele", "A púrpura de Tiro era tirada de glândulas de caramujos-múrex. Eram precisos milhares deles para tingir uma única roupa."],
    ["Tyrian_purple_on_grayscale.jpg", "Tecido tingido com púrpura de Tiro", "A púrpura de Tiro era tão cara que virou a cor dos imperadores romanos."],
    ["Haustellum_brandaris_000.jpg", "Conchas de múrex", "Na antiga cidade de Tiro, no Líbano, havia montes enormes de conchas de múrex deixadas pelos tintureiros."],
  ],
  C18H29NaO3S: [
    ["Afwasmiddel_Una_Aldi.JPG", "Detergentes de louça", "O alquilbenzeno sulfonato de sódio é o detergente mais usado em lava-louças e sabão em pó."],
    ["Laundry_detergent_pods.jpg", "Cápsulas de sabão líquido", "As cápsulas de sabão líquido concentram o detergente numa película que se dissolve na água. Elas devem ficar longe de crianças."],
  ],
  C12H23NaO2: [
    ["Aleppo_soap_01.jpg", "Sabão (laurato de sódio)", "O sabão é feito de gordura e soda cáustica. O óleo de louro do sabão de Alepo e o óleo de coco formam laurato de sódio."],
    ["Reflection_in_a_soap_bubble_edit.jpg", "Bolha de sabão", "Um filme de sabão tem uma camada de água entre duas camadas de moléculas de sabão. A luz refletida forma as cores."],
    ["Nizza-Soap-4070848.jpg", "Sabonetes", "O laurato de sódio, que vem do óleo de coco, dá muita espuma e limpa bem mesmo em água dura."],
  ],
  C10H16N2O8: [
    ["Mayonnaise_(1).jpg", "Maionese: o EDTA evita que ela estrague", "O EDTA prende os íons metálicos que aceleram o ranço e mantém a maionese fresca por mais tempo."],
    ["EDTA_Tube_for_CBC.jpg", "Tubo de coleta de sangue com EDTA", "Nos tubos de exame, o EDTA prende o cálcio do sangue e impede que ele coagule antes da contagem das células."],
  ],
  C12H17ClN4OS: [
    ["Home_made_whole_grain_bread.jpg", "Pão integral: os grãos são ricos em tiamina (vitamina B1)", "A tiamina (vitamina B1) fica na casca dos grãos. A falta dela causa o beribéri."],
    ["Brown_Rice.jpg", "Arroz integral", "O beribéri era comum onde se comia só arroz branco, que perde a casca. A descoberta disso levou ao conceito de vitamina."],
  ],
  C17H20N4O6: [
    ["RiboflavinSolutionAndBlueLaser.JPG", "Riboflavina brilha sob luz ultravioleta", "A riboflavina (vitamina B2) brilha amarelo-esverdeado quando recebe luz azul ou ultravioleta."],
    ["Riboflavin_solution.jpg", "Riboflavina é amarela", "A riboflavina é amarela e é usada como corante de alimentos. Em excesso, ela deixa a urina amarelo-forte."],
  ],
  C10H16N2O3S: [
    ["Double_and_single_yolk_hen_eggs.png", "Gemas de ovo são ricas em biotina", "A gema do ovo é rica em biotina (vitamina B8). A clara crua tem uma proteína que se prende à biotina e impede sua absorção."],
  ],
  C19H19N7O6: [
    ["Salad_greens_and_vegetables_-_Cambridge,_MA.jpg", "Verduras: o ácido fólico tem nome de folha (folium)", "O ácido fólico (vitamina B9) foi isolado de folhas de espinafre em 1941. O nome vem do latim folium, \"folha\"."],
    ["Folic_acid_crystals.jpg", "Ácido fólico puro", "O ácido fólico é essencial no começo da gravidez para formar o sistema nervoso do bebê. No Brasil, as farinhas são enriquecidas com ele."],
  ],
  Be3Al2Si6O18: [
    ["Natural_Zambian_Emerald_Gemstone_Gems_International.jpg", "Esmeralda lapidada (berilo verde)", "A esmeralda é berilo com um pouco de cromo ou vanádio, que dá a cor verde. Zâmbia, Colômbia e Brasil são grandes produtores."],
    ["Aquamarine_P1000141.JPG", "Água-marinha, outra variedade do berilo", "A água-marinha é berilo com um pouco de ferro, que dá a cor azul. O Brasil tem algumas das maiores água-marinhas já encontradas."],
    ["Pale_turquoise_beryl_crystal_2.jpg", "Cristal de água-marinha", "O berilo forma cristais de seis lados. Quando é puro, ele é incolor."],
  ],
  C13H16N3NaO4S: [
    ["Metamizole_500mg-1ml_vials_yellow_background.jpg", "Ampolas de dipirona", "A dipirona é muito usada no Brasil contra dor e febre. Em países como os EUA, ela foi proibida por causa de um raro efeito no sangue."],
  ],
  C17H19ClF3NO: [
    ["Prozac_pills_cropped.jpg", "Cápsulas de fluoxetina", "A fluoxetina, lançada em 1987, aumenta a quantidade de serotonina entre os neurônios. Ela é usada para tratar a depressão."],
  ],
  C21H30O5: [
    ["Tube_of_hydrocortisone_cream.jpg", "Pomada de hidrocortisona (cortisol)", "A hidrocortisona é o cortisol usado como remédio. Em pomada, ela diminui a coceira e a inflamação da pele."],
  ],
  C9H17NO5: [
    ["Avocado_Hass_-_single_and_halved.jpg", "Abacate, rico em ácido pantotênico (vitamina B5)", "O ácido pantotênico (vitamina B5) está em quase todos os alimentos. O nome vem do grego pantothen, \"de todo lugar\"."],
    ["Dried_mushrooms.jpg", "Cogumelos também são ricos em B5", "Cogumelos, abacate, ovos e carnes estão entre as melhores fontes de vitamina B5."],
  ],
  C16H18O9: [
    ["75_degrees_green_coffee.png", "Café verde (cru), rico em ácido clorogênico", "O grão de café cru é verde e rico em ácido clorogênico. Na torra, boa parte dele se decompõe e forma os sabores amargos."],
    ["Raw_coffee_beans_2.jpg", "Grãos de café secando", "Os grãos de café são as sementes do fruto do cafeeiro. Depois de colhidos, secam ao sol antes da torra."],
    ["A_small_cup_of_coffee.JPG", "Xícara de café", "O café é a maior fonte de ácido clorogênico na dieta de muita gente."],
  ],
  C15H14O6: [
    ["Dutch_process_and_natural_cocoa.jpg", "Cacau em pó, rico em catequinas", "O cacau em pó natural é rico em catequinas. No cacau alcalinizado, que é mais escuro, boa parte delas se perde."],
    ["Pu'er_tea,_Green_tea,_Chinese_tea,_Rostov-on-Don,_Russia.jpg", "Chá, outra fonte de catequinas", "O chá verde tem mais catequinas que o preto, porque as folhas não são fermentadas."],
  ],
};
