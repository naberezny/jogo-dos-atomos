// Cabeçalho padrão das telas: seta de voltar, título e um espaço à direita para filtros, busca ou abas.
import { useNav } from '../nav.js';
import Icon from './Icon.jsx';

export default function PageHeader({ eyebrow, title, sub, children }) {
  const { back } = useNav();
  return (
    <div className="page-head">
      <div className="page-titulo">
        <button className="btn-voltar" onClick={back} aria-label="Voltar"><Icon name="back" size={20} /></button>
        <div style={{ minWidth: 0 }}>
          {eyebrow && <div className="eyebrow">{eyebrow}</div>}
          <h2>{title}</h2>
          {sub && <div className="sub">{sub}</div>}
        </div>
      </div>
      {children}
    </div>
  );
}
