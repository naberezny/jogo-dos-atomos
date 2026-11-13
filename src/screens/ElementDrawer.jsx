import { useEffect, useState } from 'react';
import { cats } from '../data/nucleo.js';
import { col, el, electronInfo, shellInfo, SHELL_LETTERS, usageText } from '../game/logic.js';
import Atom3D from '../components/Atom3D.jsx';

export default function ElementDrawer({ sym, discovered, onClose, onAdd, inZone = 0 }) {
  const t = el(sym), tc = cats[t.cat];
  const [tab, setTab] = useState('Básico');
  const [view, setView] = useState('3D');
  const [shell, setShell] = useState(-1);
  useEffect(() => setShell(-1), [sym]);
  useEffect(() => {
    const k = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [onClose]);

  const info = electronInfo(t);
  const sel = shell >= 0 && shell < t.shells.length ? shell : -1;
  const si = sel >= 0 ? shellInfo(t, sel) : null;

  return (
    <>
      <div className="scrim" onClick={onClose} />
      <aside className="drawer" role="dialog" aria-modal="true" aria-label={`Ficha de ${t.name}`} style={{ borderColor: col(t.cat, 0.5) }}>
        <div className="drawer-head">
          <div className="eyebrow">Ficha do elemento</div>
          <button className="icon-btn" onClick={onClose} aria-label="Fechar">✕</button>
        </div>
        <div className="seg" style={{ margin: '0 20px' }}>
          {['Básico', 'Avançado'].map(l => <button key={l} aria-pressed={tab === l} onClick={() => setTab(l)}>{l}</button>)}
        </div>
        <div style={{ display: 'flex', gap: 16, padding: 20 }}>
          <div className="tile" style={{ borderColor: col(t.cat, 0.5), background: col(t.cat, 0.12) }}>
            <div className="z">{t.z}</div><div className="s" style={{ color: col(t.cat), fontSize: 28 }}>{t.sym}</div><div className="m">{t.mass}</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div className="display" style={{ fontSize: 24, fontWeight: 600 }}>{t.name}</div>
            <div style={{ fontSize: 13.5, color: col(t.cat) }}>{tc.name}</div>
          </div>
        </div>

        <div style={{ padding: '0 20px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
            <div className="eyebrow" style={{ fontSize: 10.5 }}>Eletrosfera</div>
            <div className="seg accent">
              {[['3D', '3D livre'], ['Topo', 'Vista de topo']].map(([id, l]) => <button key={id} aria-pressed={view === id} onClick={() => setView(id)}>{l}</button>)}
            </div>
          </div>
          <div className="atom-stage">
            <Atom3D key={'drawer-' + t.sym} own size={300} shells={t.shells} h={tc.h} c={tc.c} fusing={false} top={view === 'Topo'} sel={sel} onPick={i => setShell(i)} title={`Eletrosfera de ${t.name}`} />
          </div>
          <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
            {t.shells.map((n, i) => {
              const on = i === sel;
              return (
                <button key={i} aria-pressed={on} onClick={() => setShell(on ? -1 : i)} style={{ display: 'flex', alignItems: 'baseline', gap: 5, padding: '5px 9px', borderRadius: 6, border: `1px solid ${on ? col(t.cat) : col(t.cat, 0.3)}`, background: on ? col(t.cat, 0.25) : col(t.cat, 0.06), cursor: 'pointer' }}>
                  <span className="display" style={{ fontSize: 12, fontWeight: 600, color: col(t.cat) }}>{SHELL_LETTERS[i]}</span>
                  <span className="mono" style={{ fontSize: 12 }}>{n}</span>
                </button>
              );
            })}
          </div>
          {si ? (
            <div className="shell-box" style={{ borderColor: col(t.cat, 0.5), background: col(t.cat, 0.12) }}>
              <div className="display" style={{ fontSize: 17, fontWeight: 600, color: 'var(--fg)' }}>Camada {si.letter} <span className="mono" style={{ fontSize: 12, fontWeight: 400, color: 'var(--muted)' }}>n = {si.n}</span></div>
              <div>{si.count} elétrons de {si.max} possíveis (2n²)</div>
              <div>Subníveis: <span className="mono" style={{ color: col(t.cat) }}>{si.subs}</span></div>
              <div style={{ fontSize: 12.5, lineHeight: 1.45, color: 'oklch(0.76 0.02 265)' }}>{si.role}</div>
            </div>
          ) : (
            <div style={{ fontSize: 12.5, color: 'oklch(0.66 0.02 265)' }}>Toque em uma órbita (ou em uma camada acima) para ver os detalhes.</div>
          )}
        </div>

        {tab === 'Básico' ? (
          <div style={{ padding: '0 20px 20px', display: 'flex', flexDirection: 'column', gap: 8, fontSize: 14, lineHeight: 1.5, color: 'oklch(0.76 0.02 265)' }}>
            <div>Número atômico {t.z} · massa {t.mass} u</div>
            <div>Raio ≈ {t.rad} pm{t.est ? ' (estimado)' : ''} · camadas {t.shells.join(' · ')}</div>
            <div style={{ color: 'oklch(0.82 0.02 265)' }}>{usageText(t.sym, discovered)}</div>
          </div>
        ) : (
          <div style={{ padding: '0 20px 20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div className="eyebrow" style={{ fontSize: 10.5 }}>Distribuição eletrônica (Linus Pauling)</div>
              <div className="mono" style={{ fontSize: 13, lineHeight: 1.55, wordBreak: 'break-word' }}>{info.full}</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div className="eyebrow" style={{ fontSize: 10.5 }}>Forma abreviada</div>
              <div className="mono" style={{ fontSize: 13, color: col(t.cat) }}>{info.short}</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div className="eyebrow" style={{ fontSize: 10.5 }}>Por camadas</div>
              <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                {t.shells.map((k, i) => (
                  <div key={i} className="layer" style={{ borderColor: col(t.cat, 0.35), background: col(t.cat, 0.1) }}>
                    <span className="display" style={{ fontSize: 11, fontWeight: 600, color: col(t.cat) }}>{SHELL_LETTERS[i]}</span>
                    <span className="mono" style={{ fontSize: 13 }}>{k}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ fontSize: 12.5, color: 'var(--fg-2)' }}>Elétrons na camada de valência: <span className="mono" style={{ color: col(t.cat) }}>{info.valence}</span></div>
            {info.exception && <div style={{ fontSize: 12, lineHeight: 1.45, color: 'var(--warn)' }}>Exceção à regra: elétrons do subnível s migram para o d, deixando o átomo mais estável.</div>}
          </div>
        )}

        <div className="drawer-foot">
          {inZone > 0 && <div style={{ fontSize: 12.5, color: 'var(--muted)', textAlign: 'center' }}>Já há {inZone} {inZone > 1 ? 'átomos' : 'átomo'} de {t.sym} no reator</div>}
          <button className="btn btn-primary" style={{ width: '100%' }} onClick={onAdd}>Adicionar {t.sym} ao reator</button>
        </div>
      </aside>
    </>
  );
}
