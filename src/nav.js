// Seções do jogo (menu, tela inicial) e o contexto de navegação usado pelo botão Voltar.
import { createContext, useContext } from 'react';

export const SECOES = [
  { id: 'home', label: 'Início', icon: 'home' },
  { id: 'lab', label: 'Laboratório', curto: 'Lab', icon: 'lab', desc: 'Combine átomos no reator e crie substâncias reais.', h: 195 },
  { id: 'coll', label: 'Coleção', icon: 'coll', desc: 'Reveja as substâncias que você já descobriu.', h: 145 },
  { id: 'sub', label: 'Subatômico', curto: 'Quarks', icon: 'sub', desc: 'Colida quarks, léptons e bósons no acelerador.', h: 25 },
  { id: 'estudos', label: 'Estudos', icon: 'estudos', desc: 'Explore a tabela periódica e a ficha de cada elemento.', h: 250 },
  { id: 'missions', label: 'Missões', icon: 'missions', desc: 'Cumpra desafios e ganhe XP extra.', h: 65 },
  { id: 'profile', label: 'Perfil', icon: 'profile', desc: 'Veja seu nível, estatísticas e medalhas.', h: 320 },
  // Fora do menu: aberta pelo perfil ou pelas medalhas da ficha de uma descoberta.
  { id: 'medalhas', label: 'Medalhas', icon: 'profile', oculta: true },
];
export const ehSecao = id => SECOES.some(s => s.id === id);

/** { go(id), back(), podeVoltar } — fornecido pelo App. */
export const NavCtx = createContext({ go: () => {}, back: () => {}, podeVoltar: false });
export const useNav = () => useContext(NavCtx);
