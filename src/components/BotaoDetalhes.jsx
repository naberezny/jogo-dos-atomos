// Botão que abre os detalhes do que está em foco no reator ou no acelerador (um átomo, uma partícula).
// Mostra o símbolo e o nome, na cor da família.

/**
 * @param simbolo, nome, cor  o que está em foco
 * @param aberto  true quando os detalhes já estão na tela (o botão passa a fechar)
 * @param largo   versão em faixa, para a coluna lateral do desktop
 */
export default function BotaoDetalhes({ simbolo, nome, cor, aberto = false, largo = false, onClick }) {
  return (
    <button className={`btn-dica detalhes${largo ? ' largo' : ''}${aberto ? ' aberto' : ''}`} onClick={onClick} aria-expanded={aberto} aria-label={aberto ? 'Fechar detalhes' : `Ver detalhes de ${nome}`} style={{ '--tom': cor }}>
      <span className="lampada display">{simbolo}</span>
      <span className="txt">
        <span className="rot">{aberto ? 'Fechar' : 'Detalhes'}</span>
        <span className="res">{nome}</span>
      </span>
    </button>
  );
}
