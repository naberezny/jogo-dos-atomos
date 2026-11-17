import { useState } from 'react';
import { medals as medalList, XP_PER_LEVEL } from '../game/logic.js';
import { medalhasDe, MEDALHAS, progresso } from '../data/medalhas.js';
import { useNav } from '../nav.js';
import PageHeader from '../components/PageHeader.jsx';
import { MedalhaIcone } from '../components/Medalha.jsx';

/** Cartão de entrada da tela de medalhas, com as conquistadas mais recentemente. */
function CartaoMedalhas({ st }) {
  const { go } = useNav();
  const desc = { mol: new Set(st.discovered), sub: new Set(st.subDisc || []) };
  const ganhas = MEDALHAS.filter(m => progresso(m, desc[m.modo]).nivel).length;
  // As mais recentes: medalhas das últimas descobertas, sem repetir.
  const recentes = [];
  for (const [modo, lista] of [['mol', st.discovered], ['sub', st.subDisc || []]])
    for (const k of [...lista].reverse()) for (const m of medalhasDe(modo, k)) if (!recentes.some(x => x.id === m.id)) recentes.push(m);
  return (
    <button className="card med-perfil" onClick={() => go('medalhas')}>
      <span style={{ display: 'flex', flexDirection: 'column', gap: 4, textAlign: 'left' }}>
        <span className="eyebrow">Coleção de medalhas</span>
        <b className="display" style={{ fontSize: 22 }}>{ganhas} de {MEDALHAS.length} medalhas</b>
        <span style={{ fontSize: 13, color: 'var(--muted)' }}>Cada grupo de substâncias tem uma medalha que sobe de nível.</span>
      </span>
      <span className="med-perfil-icones">
        {recentes.slice(0, 6).map(m => <MedalhaIcone key={m.id} m={m} nivel={progresso(m, desc[m.modo]).nivel} tam={44} />)}
      </span>
      <span className="btn btn-primary" style={{ pointerEvents: 'none' }}>Ver medalhas</span>
    </button>
  );
}

export default function Profile({ game }) {
  const { st, set, P, reset } = game;
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
      <PageHeader eyebrow="Pesquisador(a)" title="Perfil" />
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

      <CartaoMedalhas st={st} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <h3 className="display" style={{ fontSize: 20, fontWeight: 600 }}>
          Conquistas <span className="mono" style={{ fontSize: 13, fontWeight: 400, color: 'var(--muted)' }}>{medals.filter(m => m.on).length}/{medals.length}</span>
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

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <h3 className="display" style={{ fontSize: 20, fontWeight: 600 }}>Configurações</h3>
        <label className="card config-item">
          <span style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
            <b className="display" style={{ fontSize: 16 }}>Sempre mostrar a animação de descoberta</b>
            <span style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.45 }}>A tela "Uau!" também aparece ao formar uma substância ou partícula que já está na sua coleção.</span>
          </span>
          <input type="checkbox" className="interruptor" checked={!!st.sempreRevelar} onChange={e => set({ sempreRevelar: e.target.checked })} />
        </label>
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
