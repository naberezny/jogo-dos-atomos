(function(){
const RAW="H|Hidrogênio|1.008|nm;He|Hélio|4.003|ng;Li|Lítio|6.94|am;Be|Berílio|9.012|ae;B|Boro|10.81|md;C|Carbono|12.011|nm;N|Nitrogênio|14.007|nm;O|Oxigênio|15.999|nm;F|Flúor|18.998|hl;Ne|Neônio|20.18|ng;Na|Sódio|22.99|am;Mg|Magnésio|24.305|ae;Al|Alumínio|26.982|pt;Si|Silício|28.085|md;P|Fósforo|30.974|nm;S|Enxofre|32.06|nm;Cl|Cloro|35.45|hl;Ar|Argônio|39.948|ng;K|Potássio|39.098|am;Ca|Cálcio|40.078|ae;Sc|Escândio|44.956|tm;Ti|Titânio|47.867|tm;V|Vanádio|50.942|tm;Cr|Cromo|51.996|tm;Mn|Manganês|54.938|tm;Fe|Ferro|55.845|tm;Co|Cobalto|58.933|tm;Ni|Níquel|58.693|tm;Cu|Cobre|63.546|tm;Zn|Zinco|65.38|tm;Ga|Gálio|69.723|pt;Ge|Germânio|72.63|md;As|Arsênio|74.922|md;Se|Selênio|78.971|nm;Br|Bromo|79.904|hl;Kr|Criptônio|83.798|ng;Rb|Rubídio|85.468|am;Sr|Estrôncio|87.62|ae;Y|Ítrio|88.906|tm;Zr|Zircônio|91.224|tm;Nb|Nióbio|92.906|tm;Mo|Molibdênio|95.95|tm;Tc|Tecnécio|98|tm;Ru|Rutênio|101.07|tm;Rh|Ródio|102.91|tm;Pd|Paládio|106.42|tm;Ag|Prata|107.87|tm;Cd|Cádmio|112.41|tm;In|Índio|114.82|pt;Sn|Estanho|118.71|pt;Sb|Antimônio|121.76|md;Te|Telúrio|127.6|md;I|Iodo|126.9|hl;Xe|Xenônio|131.29|ng;Cs|Césio|132.91|am;Ba|Bário|137.33|ae;La|Lantânio|138.91|la;Ce|Cério|140.12|la;Pr|Praseodímio|140.91|la;Nd|Neodímio|144.24|la;Pm|Promécio|145|la;Sm|Samário|150.36|la;Eu|Európio|151.96|la;Gd|Gadolínio|157.25|la;Tb|Térbio|158.93|la;Dy|Disprósio|162.5|la;Ho|Hólmio|164.93|la;Er|Érbio|167.26|la;Tm|Túlio|168.93|la;Yb|Itérbio|173.05|la;Lu|Lutécio|174.97|la;Hf|Háfnio|178.49|tm;Ta|Tântalo|180.95|tm;W|Tungstênio|183.84|tm;Re|Rênio|186.21|tm;Os|Ósmio|190.23|tm;Ir|Irídio|192.22|tm;Pt|Platina|195.08|tm;Au|Ouro|196.97|tm;Hg|Mercúrio|200.59|tm;Tl|Tálio|204.38|pt;Pb|Chumbo|207.2|pt;Bi|Bismuto|208.98|pt;Po|Polônio|209|pt;At|Astato|210|hl;Rn|Radônio|222|ng;Fr|Frâncio|223|am;Ra|Rádio|226|ae;Ac|Actínio|227|ac;Th|Tório|232.04|ac;Pa|Protactínio|231.04|ac;U|Urânio|238.03|ac;Np|Netúnio|237|ac;Pu|Plutônio|244|ac;Am|Amerício|243|ac;Cm|Cúrio|247|ac;Bk|Berquélio|247|ac;Cf|Califórnio|251|ac;Es|Einstênio|252|ac;Fm|Férmio|257|ac;Md|Mendelévio|258|ac;No|Nobélio|259|ac;Lr|Laurêncio|266|ac;Rf|Rutherfórdio|267|tm;Db|Dúbnio|268|tm;Sg|Seabórgio|269|tm;Bh|Bóhrio|270|tm;Hs|Hássio|269|tm;Mt|Meitnério|278|un;Ds|Darmstádio|281|un;Rg|Roentgênio|282|un;Cn|Copernício|285|tm;Nh|Nihônio|286|un;Fl|Fleróvio|289|un;Mc|Moscóvio|290|un;Lv|Livermório|293|un;Ts|Tenesso|294|un;Og|Oganessônio|294|un";
function pos(z){
  if(z===1)return[1,1];if(z===2)return[1,18];
  if(z<=4)return[2,z-2];if(z<=10)return[2,z+8];
  if(z<=12)return[3,z-10];if(z<=18)return[3,z];
  if(z<=36)return[4,z-18];if(z<=54)return[5,z-36];
  if(z<=56)return[6,z-54];if(z<=71)return[9,z-54];if(z<=86)return[6,z-68];
  if(z<=88)return[7,z-86];if(z<=103)return[10,z-86];return[7,z-100];
}
const RAD=[53,31,167,112,87,67,56,48,42,38,190,145,118,111,98,88,79,71,243,194,184,176,171,166,161,156,152,149,145,142,136,125,114,103,94,88,265,219,212,206,198,190,183,178,173,169,165,161,156,145,133,123,115,108,298,253,226,210,247,206,205,238,231,233,225,228,226,226,222,222,217,208,200,193,188,185,180,177,174,171,156,154,143,135,127,120,260,215,195,180,180,175,175,175,175,176,176,176,176,176,176,176,176,150,139,132,128,126,128,128,121,122,136,143,162,175,165,157];
const ORD=[[1,0],[2,0],[2,1],[3,0],[3,1],[4,0],[3,2],[4,1],[5,0],[4,2],[5,1],[6,0],[4,3],[5,2],[6,1],[7,0],[5,3],[6,2],[7,1]];
const EXC={24:[[4,0,-1],[3,2,1]],29:[[4,0,-1],[3,2,1]],42:[[5,0,-1],[4,2,1]],46:[[5,0,-2],[4,2,2]],47:[[5,0,-1],[4,2,1]],78:[[6,0,-1],[5,2,1]],79:[[6,0,-1],[5,2,1]]};
function conf(z){const out=[];let left=z;for(const[n,l]of ORD){if(left<=0)break;const k=Math.min(left,2*(2*l+1));out.push([n,l,k]);left-=k;}(EXC[z]||[]).forEach(([n,l,d])=>{const s=out.find(o=>o[0]===n&&o[1]===l);if(s)s[2]+=d;});return out.filter(o=>o[2]>0);}
function shells(cf){const sh=[];cf.forEach(([n,,k])=>{sh[n-1]=(sh[n-1]||0)+k;});return Array.from(sh,v=>v||0);}
const elements=RAW.split(';').map((r,i)=>{const[s,n,m,c]=r.split('|');const z=i+1;const[row,col]=pos(z);return{z,sym:s,name:n,mass:+m,cat:c,row,col,rad:RAD[i],est:z>=87,conf:conf(z),shells:shells(conf(z))};});
const cats={
  am:{name:'Metais alcalinos',h:28,c:0.15},ae:{name:'Alcalino-terrosos',h:65,c:0.14},tm:{name:'Metais de transição',h:250,c:0.13},
  pt:{name:'Outros metais',h:210,c:0.12},md:{name:'Semimetais',h:175,c:0.13},nm:{name:'Não metais',h:145,c:0.16},
  hl:{name:'Halogênios',h:105,c:0.15},ng:{name:'Gases nobres',h:300,c:0.15},la:{name:'Lantanídeos',h:340,c:0.13},
  ac:{name:'Actinídeos',h:5,c:0.14},un:{name:'Propriedades desconhecidas',h:265,c:0.02}
};
const S=(f,name,state,where,fact,d)=>({f,name,state,where,fact,d:d||f});
const substances=[
  S('H2O','Água','líquido','Rios, chuva, oceanos e cerca de 60% do corpo humano.','O gelo é menos denso que a água líquida. Por isso ele flutua e lagos congelam de cima para baixo.'),
  S('O2','Gás oxigênio','gás','Ar atmosférico, cerca de 21% do volume.','Cianobactérias começaram a liberar O₂ em grande escala há cerca de 2,4 bilhões de anos.'),
  S('CO2','Dióxido de carbono','gás','Respiração, bolhas de refrigerante, extintores.','Plantas usam CO₂ e luz na fotossíntese para produzir glicose.'),
  S('H2','Gás hidrogênio','gás','Combustível de foguetes e células a combustível.','É a molécula mais leve que existe.'),
  S('N2','Gás nitrogênio','gás','Ar (cerca de 78%), embalagens de salgadinho.','No estado líquido, ferve a −196 °C.'),
  S('O3','Ozônio','gás','Camada de ozônio, a 15–35 km de altitude.','Absorve boa parte da radiação ultravioleta do Sol.'),
  S('NaCl','Cloreto de sódio','sólido','Sal de cozinha, água do mar.','Seus átomos se organizam em uma rede cúbica, visível no formato dos grãos de sal.'),
  S('KCl','Cloreto de potássio','sólido','Sal light, fertilizantes.','É usado para substituir parte do sal comum em dietas com pouco sódio.'),
  S('CH4','Metano','gás','Gás natural, pântanos, digestão de bovinos.','Em 20 anos, retém cerca de 80 vezes mais calor que o CO₂.'),
  S('C3H8','Propano','gás','Gás de cozinha (GLP), isqueiros.','Não tem cheiro. Uma substância odorizante é adicionada para detectar vazamentos.'),
  S('NH3','Amônia','gás','Fertilizantes, produtos de limpeza.','O processo Haber–Bosch, que a produz, sustenta a produção de alimentos de metade da humanidade.'),
  S('H2O2','Peróxido de hidrogênio','líquido','Água oxigenada, clareadores.','Se decompõe em água e oxigênio. É isso que forma espuma ao limpar um machucado.'),
  S('CO','Monóxido de carbono','gás','Escapamento de carros, combustão incompleta.','Se liga à hemoglobina cerca de 200 vezes mais fortemente que o O₂.'),
  S('HCl','Cloreto de hidrogênio','gás','Dissolvido em água forma o ácido do suco gástrico.','O estômago produz cerca de 1,5 L de suco gástrico por dia.'),
  S('H2SO4','Ácido sulfúrico','líquido','Baterias de carro, fertilizantes, indústria.','É a substância química mais produzida no mundo.'),
  S('NaOH','Hidróxido de sódio','sólido','Soda cáustica, fabricação de sabão.','Reage com gorduras formando sabão, na reação chamada saponificação.'),
  S('NaHCO3','Bicarbonato de sódio','sólido','Fermento químico, antiácidos.','Libera CO₂ ao reagir com ácidos. É o que faz a massa do bolo crescer.'),
  S('CaCO3','Carbonato de cálcio','sólido','Giz, casca de ovo, corais, mármore.','Corais e conchas o constroem a partir de íons dissolvidos na água do mar.'),
  S('CaO','Óxido de cálcio','sólido','Cal virgem, construção civil.','Reage com água liberando calor suficiente para fazê-la ferver.'),
  S('SiO2','Dióxido de silício','sólido','Areia, quartzo, vidro.','É o composto mais abundante da crosta terrestre.'),
  S('Fe2O3','Óxido de ferro(III)','sólido','Ferrugem, pigmentos avermelhados.','É ele que dá a cor vermelha à superfície de Marte.'),
  S('NaClO','Hipoclorito de sódio','líquido','Água sanitária (em solução).','Elimina bactérias oxidando suas membranas e proteínas.'),
  S('C2H6O','Etanol','líquido','Combustível, álcool em gel, bebidas.','O Brasil produz etanol de cana-de-açúcar como combustível desde os anos 1970.','C₂H₅OH'),
  S('C2H4O2','Ácido acético','líquido','Vinagre, em concentração de 4–8%.','É ele que dá o cheiro e o gosto azedo do vinagre.','CH₃COOH'),
  S('C6H12O6','Glicose','sólido','Frutas, mel, corrente sanguínea.','É a principal fonte de energia das células do corpo.'),
  S('C8H10N4O2','Cafeína','sólido','Café, chá, chocolate, energéticos.','Bloqueia os receptores de adenosina, molécula que sinaliza cansaço ao cérebro.')
];
substances.forEach(s=>{const c={};s.f.replace(/([A-Z][a-z]?)(\d*)/g,(_,e,n)=>{c[e]=(c[e]||0)+(n?+n:1);});s.c=c;s.atoms=Object.values(c).reduce((a,b)=>a+b,0);s.nEl=Object.keys(c).length;if(s.d===s.f)s.d=s.f.replace(/\d/g,d=>'₀₁₂₃₄₅₆₇₈₉'[d]);});
window.NUCLEO_DATA={elements,cats,substances};
})();
