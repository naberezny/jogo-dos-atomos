// O que o jogador "pegou na mão": um círculo que acompanha o dedo ou o mouse (ver usePegarElemento).
// O conteúdo (átomo 3D, partícula...) vem em children.
import { createPortal } from 'react-dom';

export default function NaMao({ innerRef, toque, cor, rotulo, children }) {
  return createPortal(
    <div ref={innerRef} className={`atomo-mao${toque ? ' toque' : ''}`} aria-hidden="true">
      <div className="atomo-mao-corpo" style={{ '--c': cor }}>
        {children}
        {rotulo && <span className="display">{rotulo}</span>}
      </div>
    </div>,
    document.body,
  );
}
