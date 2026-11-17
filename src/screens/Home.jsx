// Tela inicial: resumo do progresso e um cartão para cada seção do jogo.
import { substances } from '../data/nucleo.js';
import { receitas } from '../data/subatomico.js';
import { medals, XP_PER_LEVEL } from '../game/logic.js';
import { SECOES, useNav } from '../nav.js';
import Icon from '../components/Icon.jsx';

function CartaoSecao({ s, info, onClick }) {
  return (
    <button className="secao" onClick={onClick} style={{ '--h': s.h }}>
      <span className="secao-icone"><Icon name={s.icon} size={28} /></span>
      <span className="secao-texto">
        <span className="display secao-nome">{s.label}</span>
        <span className="secao-desc">{s.desc}</span>
      </span>
      <span className="secao-pe">
        <span className="mono">{info}</span>
        <Icon name="seta" size={18} />
      </span>
    </button>
  );
}

export default function Home({ game }) {
  const { st, P } = game;
  const { go } = useNav();
  const xpIn = P.xp % XP_PER_LEVEL;
  const feitas = P.missions.filter(m => m.done).length;
  const destaque = P.missions.find(m => !m.done) || P.missions[P.missions.length - 1];
  const ultima = P.disc[P.disc.length - 1];
  const meds = medals(st, P);
  const info = {
    lab: `${st.fusions} ${st.fusions === 1 ? 'fusão' : 'fusões'}`,
    coll: `${P.disc.length} de ${substances.length}`,
    sub: `${P.sub.length} de ${receitas.length}`,
    estudos: '118 elementos',
    missions: `${feitas} de ${P.missions.length}`,
    profile: `${meds.filter(m => m.on).length} de ${meds.length} medalhas`,
  };

  return (
    <div className="inicio">
      <section className="hero">
        <div className="hero-texto">
          <div className="eyebrow" style={{ color: 'var(--accent)' }}>Laboratório de moléculas</div>
          <h1>Combine átomos. Descubra a matéria.</h1>
          <p>Junte elementos no reator para criar substâncias reais, colida partículas no acelerador e estude a tabela periódica.</p>
          <div className="actions">
            <button className="btn btn-primary" onClick={() => go('lab')}>{st.fusions ? 'Continuar no laboratório' : 'Começar a jogar'}</button>
          </div>
        </div>
        <button className="hero-nivel" onClick={() => go('profile')} aria-label={`Nível ${P.level}. Ver perfil`}>
          <span className="eyebrow">Seu progresso</span>
          <span className="display" style={{ fontSize: 40, fontWeight: 700, lineHeight: 1 }}>Nível {P.level}</span>
          <span className="bar" style={{ height: 8 }}><span style={{ display: 'block', height: '100%', background: 'var(--accent)', width: (xpIn / XP_PER_LEVEL) * 100 + '%' }} /></span>
          <span className="mono" style={{ fontSize: 12, color: 'var(--muted)' }}>{xpIn}/{XP_PER_LEVEL} XP · faltam {XP_PER_LEVEL - xpIn} para o nível {P.level + 1}</span>
        </button>
      </section>

      <section aria-label="Seções">
        <div className="secoes">
          {SECOES.filter(s => s.id !== 'home').map(s => <CartaoSecao key={s.id} s={s} info={info[s.id]} onClick={() => go(s.id)} />)}
        </div>
      </section>

      <div className="inicio-pe">
        <button className="card atalho" onClick={() => go('missions')}>
          <span className="eyebrow">Próxima missão</span>
          <span className="display" style={{ fontSize: 20, fontWeight: 600 }}>{destaque.title}</span>
          <span style={{ fontSize: 14, color: 'oklch(0.78 0.02 265)' }}>{destaque.desc}</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 'auto' }}>
            <span className="bar" style={{ flex: 1 }}><span style={{ display: 'block', height: '100%', background: 'var(--ok)', width: (destaque.v / destaque.t) * 100 + '%' }} /></span>
            <span className="mono" style={{ fontSize: 12, color: 'oklch(0.78 0.02 265)' }}>{destaque.v}/{destaque.t} · +{destaque.reward} XP</span>
          </span>
        </button>
        <button className="card atalho" onClick={() => go('coll')}>
          <span className="eyebrow">Última descoberta</span>
          <span className="display" style={{ fontSize: 30, fontWeight: 700, color: 'var(--accent)', lineHeight: 1.1 }}>{ultima ? ultima.d : '—'}</span>
          <span className="display" style={{ fontSize: 18, fontWeight: 600 }}>{ultima ? ultima.name : 'Nenhuma ainda'}</span>
          <span style={{ fontSize: 14, color: 'oklch(0.78 0.02 265)' }}>{ultima ? ultima.where : 'Sua primeira substância aparece aqui.'}</span>
        </button>
        <div className="card steps">
          <div className="eyebrow">Como jogar</div>
          <ol>
            <li><span className="n">01</span><span>No laboratório, toque num elemento da tabela periódica.</span></li>
            <li><span className="n">02</span><span>Adicione-o ao reator e ajuste a quantidade de cada átomo.</span></li>
            <li><span className="n">03</span><span>Com a proporção certa, o botão Fundir aparece. Toque nele para criar a substância.</span></li>
          </ol>
        </div>
      </div>
    </div>
  );
}
