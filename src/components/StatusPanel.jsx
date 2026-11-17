// Painel de status do reator/acelerador: etiqueta colorida, título, texto e atalhos para o que falta.
/**
 * @param tom     cor da etiqueta e da borda (CSS)
 * @param chips   [{ key, label, cor, onClick, aria }] — atalhos clicáveis
 * @param onClose se presente, mostra o botão de fechar (painel aberto por cima do reator)
 */
export default function StatusPanel({ tom, tag, title, text, chips = [], destacado = true, onClose, className = '' }) {
  return (
    <div className={`status ${className}`} style={{ borderColor: destacado ? `color-mix(in oklch, ${tom} 45%, transparent)` : undefined }} aria-live="polite">
      <div className="tag" style={{ color: tom }}>
        <span className="dot" />{tag}
        {onClose && <button className="icon-btn" onClick={onClose} aria-label="Fechar dica" style={{ marginLeft: 'auto', color: 'var(--fg)' }}>✕</button>}
      </div>
      <h3>{title}</h3>
      <p>{text}</p>
      {chips.length > 0 && (
        <div className="chips">
          {chips.map(c => (
            <button key={c.key} className="chip" onClick={c.onClick} aria-label={c.aria} style={{ borderColor: `color-mix(in oklch, ${c.cor} 40%, transparent)`, background: `color-mix(in oklch, ${c.cor} 10%, transparent)`, color: c.cor, cursor: 'pointer' }}>{c.label}</button>
          ))}
        </div>
      )}
    </div>
  );
}
