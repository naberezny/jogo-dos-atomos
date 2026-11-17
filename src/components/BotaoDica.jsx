// Botão que guarda as dicas no celular: lâmpada, resumo do que falta e um brilho quando há dica nova.
import Icon from './Icon.jsx';

/**
 * @param tom     cor do status atual (CSS)
 * @param resumo  texto curto do que falta (ex.: "+2 H +1 O"); vazio = sem atalho
 * @param chama   true para pulsar e chamar a atenção (há algo útil para ler)
 */
export default function BotaoDica({ tom, resumo, aberto, chama, onClick }) {
  return (
    <button className={`btn-dica${chama && !aberto ? ' chama' : ''}${aberto ? ' aberto' : ''}`} onClick={onClick} aria-expanded={aberto} aria-label={resumo ? `Dica: falta ${resumo}` : 'Ver dica'} style={{ '--tom': tom }}>
      <span className="lampada"><Icon name={aberto ? 'fechar' : 'dica'} size={18} /></span>
      <span className="txt">
        <span className="rot">{aberto ? 'Fechar dica' : 'Dica'}</span>
        {resumo && !aberto && <span className="res mono">{resumo}</span>}
      </span>
    </button>
  );
}
