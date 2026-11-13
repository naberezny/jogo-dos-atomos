const STATE = { 'gás': 'Gás', 'líquido': 'Líquido', 'sólido': 'Sólido' };

export default function Home({ P, go }) {
  const feat = P.missions.find(m => !m.done) || P.missions[P.missions.length - 1];
  const last = P.disc[P.disc.length - 1];
  return (
    <div className="home">
      <section className="hero">
        <div className="eyebrow" style={{ color: 'var(--accent)' }}>Laboratório de moléculas</div>
        <h1>Combine átomos. Descubra a matéria.</h1>
        <p>Arraste elementos da tabela periódica para o reator. Quando a combinação forma uma substância real, ela é criada e entra na sua coleção.</p>
        <div className="actions">
          <button className="btn btn-primary" onClick={() => go('lab')}>Entrar no laboratório</button>
          <button className="btn btn-ghost" onClick={() => go('coll')}>Ver coleção</button>
        </div>
      </section>
      <div className="home-side">
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div className="eyebrow">Missão em destaque</div>
          <div className="display" style={{ fontSize: 22, fontWeight: 600 }}>{feat.title}</div>
          <div style={{ fontSize: 14, color: 'oklch(0.78 0.02 265)' }}>{feat.desc}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div className="bar" style={{ flex: 1 }}><div style={{ width: (feat.v / feat.t) * 100 + '%', background: 'var(--ok)' }} /></div>
            <span className="mono" style={{ fontSize: 12, color: 'oklch(0.78 0.02 265)' }}>{feat.v}/{feat.t}</span>
          </div>
        </div>
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div className="display" style={{ width: 84, height: 84, flex: 'none', borderRadius: 12, border: '1px solid oklch(0.82 0.13 195 / 0.4)', background: 'oklch(0.82 0.13 195 / 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: 22, color: 'var(--accent)' }}>{last ? last.d : '—'}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div className="eyebrow">Última descoberta</div>
            <div className="display" style={{ fontSize: 20, fontWeight: 600 }}>{last ? last.name : 'Nenhuma ainda'}</div>
            <div style={{ fontSize: 13, color: 'var(--muted)' }}>{last ? STATE[last.state] : ''}</div>
          </div>
        </div>
        <div className="card steps">
          <div className="eyebrow">Como jogar</div>
          <ol>
            <li><span className="n">01</span><span>Escolha um elemento na tabela periódica.</span></li>
            <li><span className="n">02</span><span>Arraste (ou toque) para o reator e ajuste a quantidade de cada átomo.</span></li>
            <li><span className="n">03</span><span>Com a proporção certa, o botão Fundir aparece. Toque nele para criar a substância.</span></li>
          </ol>
        </div>
      </div>
    </div>
  );
}
