// Botão que abre a ficha do átomo selecionado no reator. Mostra o símbolo e o nome, na cor da família.
import { col, el } from '../game/logic.js';

export default function BotaoDetalhes({ sym, onClick, largo = false }) {
  const e = el(sym);
  return (
    <button className={`btn-dica detalhes${largo ? ' largo' : ''}`} onClick={onClick} aria-label={`Ver detalhes de ${e.name}`} style={{ '--tom': col(e.cat) }}>
      <span className="lampada display">{e.sym}</span>
      <span className="txt">
        <span className="rot">Detalhes</span>
        <span className="res">{e.name}</span>
      </span>
    </button>
  );
}
