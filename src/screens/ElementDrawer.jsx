import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { col, el } from '../game/logic.js';
import ElementFicha from '../components/ElementFicha.jsx';

/** Gaveta lateral com a ficha do elemento. Com `onBack`, abre por cima de outra tela e ganha o botão Voltar; sem `onAdd`, não mostra o rodapé de adicionar. */
export default function ElementDrawer({ sym, discovered, onClose, onAdd, onBack, inZone = 0 }) {
  const t = el(sym);
  useEffect(() => {
    const k = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [onClose]);

  // Vai direto para o <body>: dentro de um modal com desfoque de fundo, um elemento fixo ficaria preso
  // à área rolável do modal e deixaria a tela de baixo aparecer.
  return createPortal(
    <>
      <div className={`scrim${onBack ? ' over' : ''}`} onClick={onClose} />
      <aside className={`drawer${onBack ? ' over' : ''}`} role="dialog" aria-modal="true" aria-label={`Ficha de ${t.name}`} style={{ borderColor: col(t.cat, 0.5) }}>
        <div className="drawer-head">
          {onBack
            ? <button className="btn-small" onClick={onBack} autoFocus>← Voltar</button>
            : <div className="eyebrow">Ficha do elemento</div>}
          <button className="icon-btn" onClick={onClose} aria-label="Fechar">✕</button>
        </div>
        <ElementFicha sym={sym} discovered={discovered} />
        {onAdd && <div className="drawer-foot">
          {inZone > 0 && <div style={{ fontSize: 12.5, color: 'var(--muted)', textAlign: 'center' }}>Já há {inZone} {inZone > 1 ? 'átomos' : 'átomo'} de {t.sym} no reator</div>}
          <button className="btn btn-primary" style={{ width: '100%' }} onClick={onAdd}>Adicionar {t.sym} ao reator</button>
        </div>}
      </aside>
    </>,
    document.body,
  );
}
