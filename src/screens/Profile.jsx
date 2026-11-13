import { useState } from 'react';
import { medals as medalList, XP_PER_LEVEL } from '../game/logic.js';

export default function Profile({ game }) {
  const { st, P, reset } = game;
  const [confirming, setConfirming] = useState(false);
  const xpIn = P.xp % XP_PER_LEVEL;
  const medals = medalList(st, P);
  const stats = [
    [P.disc.length, 'Substâncias descobertas'],
    [st.fusions, 'Fusões realizadas'],
    [st.atomsUsed, 'Átomos fundidos'],
    [st.usedEls.length, 'Elementos explorados'],
  ];

  return (
    <section aria-label="Perfil" style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
      <div className="card" style={{ display: 'flex', alignItems: 'center', gap: 22, padding: 26, borderRadius: 16, flexWrap: 'wrap' }}>
        <div className="display" style={{ width: 88, height: 88, borderRadius: '50%', border: '2px solid var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30, fontWeight: 600, color: 'var(--accent)' }}>{P.level}</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1, minWidth: 220 }}>
          <div className="display" style={{ fontSize: 26, fontWeight: 600 }}>Pesquisador(a)</div>
          <div style={{ fontSize: 14, color: 'oklch(0.76 0.02 265)' }}>Nível {P.level} · {P.xp} XP no total · faltam {XP_PER_LEVEL - xpIn} XP para o nível {P.level + 1}</div>
          <div className="bar" style={{ height: 8, maxWidth: 420 }}><div style={{ width: (xpIn / XP_PER_LEVEL) * 100 + '%' }} /></div>
        </div>
      </div>

      <div className="stats">
        {stats.map(([v, l]) => (
          <div key={l} className="card" style={{ padding: 20, borderRadius: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div className="display" style={{ fontSize: 34, fontWeight: 600 }}>{v}</div>
            <div style={{ fontSize: 13, color: 'var(--muted)' }}>{l}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <h3 className="display" style={{ fontSize: 20, fontWeight: 600 }}>
          Medalhas <span className="mono" style={{ fontSize: 13, fontWeight: 400, color: 'var(--muted)' }}>{medals.filter(m => m.on).length}/{medals.length}</span>
        </h3>
        <div className="medals">
          {medals.map(m => {
            const c = m.on ? `oklch(0.82 0.14 ${m.h})` : 'oklch(0.5 0.02 265)';
            return (
              <div key={m.title} className="medal" style={{ borderColor: m.on ? `oklch(0.82 0.14 ${m.h} / 0.4)` : 'oklch(0.26 0.02 265)', opacity: m.on ? 1 : 0.55 }}>
                <div className="display glyph" style={{ borderColor: c, color: c, background: m.on ? `oklch(0.82 0.14 ${m.h} / 0.12)` : 'transparent' }}>{m.glyph}</div>
                <div className="display" style={{ fontSize: 16, fontWeight: 600 }}>{m.title}</div>
                <div style={{ fontSize: 12.5, lineHeight: 1.4, color: 'var(--muted)' }}>{m.desc}</div>
                <span className="sr-only">{m.on ? 'Conquistada' : 'Bloqueada'}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap', paddingTop: 8 }}>
        {confirming ? (
          <>
            <span style={{ fontSize: 13, color: 'var(--fg-2)' }}>Apagar todo o progresso salvo neste navegador?</span>
            <button className="btn-small" style={{ borderColor: 'var(--bad)', color: 'var(--bad)' }} onClick={() => { reset(); setConfirming(false); }}>Sim, recomeçar</button>
            <button className="btn-small" onClick={() => setConfirming(false)}>Cancelar</button>
          </>
        ) : (
          <button className="btn-small" onClick={() => setConfirming(true)}>Recomeçar o jogo</button>
        )}
      </div>
    </section>
  );
}
