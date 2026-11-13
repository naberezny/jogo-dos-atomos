export default function Missions({ P }) {
  const done = P.missions.filter(m => m.done).length;
  return (
    <section aria-label="Missões" style={{ display: 'flex', flexDirection: 'column', gap: 22, maxWidth: 980 }}>
      <div className="page-head">
        <div>
          <div className="eyebrow">Desafios</div>
          <h2>Missões</h2>
          <div className="sub">{done} de {P.missions.length} concluídas</div>
        </div>
      </div>
      <ul className="missions">
        {P.missions.map(m => (
          <li key={m.title} className="mission" style={{ borderColor: m.done ? 'oklch(0.82 0.15 145 / 0.4)' : undefined }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, minWidth: 0 }}>
              <div className="display" style={{ fontSize: 18, fontWeight: 600 }}>{m.title}</div>
              <div style={{ fontSize: 14, color: 'oklch(0.76 0.02 265)' }}>{m.desc}</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div className="bar"><div style={{ width: (m.v / m.t) * 100 + '%', background: m.done ? 'var(--ok)' : 'var(--accent)' }} /></div>
              <div className="mono" style={{ fontSize: 12, color: 'var(--muted)' }}>{m.v} / {m.t}</div>
            </div>
            <div className="mono reward" style={m.done ? { color: 'oklch(0.85 0.15 145)', borderColor: 'oklch(0.82 0.15 145 / 0.4)' } : undefined}>
              {m.done ? 'Concluída' : `+${m.reward} XP`}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
