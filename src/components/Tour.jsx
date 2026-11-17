// Tour de boas-vindas: poucos passos explicando como jogar. Aparece na primeira visita e pode ser reaberto.
import { useEffect, useRef, useState } from 'react';
import Icon from './Icon.jsx';

const toque = () => typeof matchMedia === 'function' && matchMedia('(pointer: coarse)').matches;

const passos = t => [
  { icon: 'home', h: 195, title: 'Bem-vindo ao Núcleo', text: 'Aqui você combina átomos para criar substâncias reais, colide partículas e estuda a tabela periódica. Em menos de um minuto você aprende o essencial.' },
  {
    icon: 'lab', h: 145, title: 'Pegue um átomo', anim: 'arrastar',
    text: t
      ? 'No Laboratório, segure o dedo sobre um elemento por 1 segundo: o átomo sai da tabela e vai para a sua mão. Arraste e solte dentro do reator.'
      : 'No Laboratório, clique num elemento da tabela e arraste: o átomo vai para a sua mão. Solte dentro do reator.',
    extra: t ? 'Um toque rápido abre a ficha do elemento, que também tem o botão Adicionar.' : 'Um clique simples abre a ficha do elemento, que também tem o botão Adicionar.',
  },
  { icon: 'coll', h: 65, title: 'Acerte a proporção e funda', anim: 'fundir', text: 'Ajuste a quantidade de cada átomo com − e +. A tabela apaga os elementos que não combinam com o que já está no reator. Quando a proporção forma uma substância, o botão Fundir aparece.' },
  { icon: 'dica', h: 85, title: 'Travou? Peça uma dica', text: t ? 'O botão Dica, no canto do reator, mostra qual átomo falta para a descoberta mais próxima. Toque no atalho para adicioná-lo na hora.' : 'O painel ao lado do reator mostra qual átomo falta para a descoberta mais próxima. Clique no atalho para adicioná-lo na hora.' },
  { icon: 'sub', h: 25, title: 'Vá além do átomo', text: 'No modo Subatômico você colide quarks, léptons e bósons para montar prótons, mésons e até as forças da natureza. Em Estudos, explore a ficha de cada um dos 118 elementos.' },
  { icon: 'missions', h: 320, title: 'Colecione e evolua', text: 'Cada descoberta entra na Coleção e rende XP. Cumpra Missões, suba de nível e conquiste medalhas no Perfil.' },
];

export default function Tour({ onClose, onStart }) {
  const [i, setI] = useState(0);
  const lista = useRef(passos(toque())).current;
  const p = lista[i], ultimo = i === lista.length - 1;
  const btn = useRef(null);
  useEffect(() => { btn.current?.focus({ preventScroll: true }); }, [i]);
  useEffect(() => {
    const k = e => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setI(x => Math.min(lista.length - 1, x + 1));
      if (e.key === 'ArrowLeft') setI(x => Math.max(0, x - 1));
    };
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [onClose, lista.length]);

  return (
    <div className="modal-wrap tour-wrap">
      <div className="tour" role="dialog" aria-modal="true" aria-label={`Como jogar, passo ${i + 1} de ${lista.length}`} style={{ '--c': `oklch(0.8 0.14 ${p.h})` }}>
        <button className="tour-pular" onClick={onClose}>Pular</button>
        <div className="tour-arte" key={i}>
          {p.anim === 'arrastar' ? (
            <div className="tour-anim arrastar" aria-hidden="true"><span className="casa">O</span><span className="atomo" /><span className="alvo" /></div>
          ) : p.anim === 'fundir' ? (
            <div className="tour-anim fundir" aria-hidden="true"><span className="a a1">H</span><span className="a a2">H</span><span className="a a3">O</span><span className="res">H₂O</span></div>
          ) : (
            <span className="tour-icone"><Icon name={p.icon} size={46} /></span>
          )}
        </div>
        <div className="tour-texto" key={'t' + i} aria-live="polite">
          <div className="eyebrow">Passo {i + 1} de {lista.length}</div>
          <h2 className="display">{p.title}</h2>
          <p>{p.text}</p>
          {p.extra && <p className="extra">{p.extra}</p>}
        </div>
        <div className="tour-pontos" aria-hidden="true">
          {lista.map((_, k) => <button key={k} tabIndex={-1} className={k === i ? 'on' : ''} onClick={() => setI(k)} />)}
        </div>
        <div className="tour-acoes">
          {i > 0 && <button className="btn btn-ghost" onClick={() => setI(i - 1)}>Voltar</button>}
          <button className="btn btn-primary" ref={btn} onClick={() => (ultimo ? onStart() : setI(i + 1))}>{ultimo ? 'Ir para o laboratório' : 'Próximo'}</button>
        </div>
      </div>
    </div>
  );
}
