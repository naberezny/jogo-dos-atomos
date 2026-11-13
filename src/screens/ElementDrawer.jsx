import { useEffect, useState } from 'react';
import { cats } from '../data/nucleo.js';
import { col, el, electronInfo, shellInfo, SHELL_LETTERS, usageText } from '../game/logic.js';
import Atom3D from '../components/Atom3D.jsx';
import HIST from '../data/historia/index.js';
import CIENCIA from '../data/ciencia.json';

const ESTADO = { 'gás': 'Gás', 'líquido': 'Líquido', 'sólido': 'Sólido' };
const BLOCO = ['s', 'p', 'd', 'f'];
const n2 = (v, d = 2) => v.toLocaleString('pt-BR', { maximumFractionDigits: d });
const kc = k => `${n2(k - 273.15, 1)} °C`;

/** Dados derivados (grupo, período, bloco, partículas) e dados da PubChem, prontos para exibir. */
function ficha(t) {
  const c = CIENCIA[t.sym] || {};
  const ult = t.conf[t.conf.length - 1];
  return {
    c,
    grupo: t.row <= 7 ? t.col : null,
    serie: t.row === 9 ? 'lantanídeos' : 'actinídeos',
    periodo: t.shells.length,
    bloco: BLOCO[ult[1]],
    neut: Math.round(t.mass) - t.z,
    estado: c.estado ? (ESTADO[c.estado] || c.estado[0].toUpperCase() + c.estado.slice(1)) : '—',
    dens: c.dens == null ? '—' : c.estado === 'gás' ? `${n2(c.dens * 1000, 3)} g/L` : `${n2(c.dens, 3)} g/cm³`,
  };
}

function Dado({ k, v, tom }) {
  return (
    <div className="dado">
      <div className="k">{k}</div>
      <div className="v" style={tom ? { color: tom } : undefined}>{v ?? '—'}</div>
    </div>
  );
}

function Secao({ titulo, children }) {
  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div className="eyebrow" style={{ fontSize: 10.5 }}>{titulo}</div>
      {children}
    </section>
  );
}

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
  const hs = HIST[t.sym], f = ficha(t), cc = f.c;

  return (
    <>
      <div className="scrim" onClick={onClose} />
      <aside className="drawer" role="dialog" aria-modal="true" aria-label={`Ficha de ${t.name}`} style={{ borderColor: col(t.cat, 0.5) }}>
        <div className="drawer-head">
          <div className="eyebrow">Ficha do elemento</div>
          <button className="icon-btn" onClick={onClose} aria-label="Fechar">✕</button>
        </div>
        <div style={{ display: 'flex', gap: 16, padding: '4px 20px 20px' }}>
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

        <div className="seg ficha-abas" role="tablist" aria-label="Nível de detalhe">
          {['Básico', 'Avançado'].map(l => <button key={l} role="tab" aria-selected={tab === l} aria-pressed={tab === l} onClick={() => setTab(l)}>{l}</button>)}
        </div>

        {tab === 'Básico' ? (
          <div className="ficha-corpo" role="tabpanel">
            <div className="dados">
              <Dado k="Descoberta" v={cc.ano || '—'} />
              <Dado k="Estado a 25 °C" v={f.estado} />
              <Dado k="Família" v={tc.name} tom={col(t.cat)} />
            </div>
            {hs && (
              <>
                <Secao titulo="Como foi descoberto"><p>{hs.h}</p></Secao>
                <Secao titulo="De onde vem o nome"><p>{hs.n}</p></Secao>
                <Secao titulo="Curiosidades">
                  <ul className="curios">{hs.c.map((x, i) => <li key={i} style={{ '--cor': col(t.cat) }}>{x}</li>)}</ul>
                </Secao>
              </>
            )}
            <Secao titulo="No jogo"><p style={{ color: 'oklch(0.86 0.02 265)' }}>{usageText(t.sym, discovered)}</p></Secao>
          </div>
        ) : (
          <div className="ficha-corpo" role="tabpanel">
            <Secao titulo="Identidade">
              <div className="dados">
                <Dado k="Número atômico (Z)" v={t.z} />
                <Dado k="Massa atômica" v={`${n2(t.mass, 3)} u`} />
                <Dado k="Prótons" v={t.z} />
                <Dado k={t.est ? 'Nêutrons (isótopo mais estável)' : 'Nêutrons (isótopo mais comum)'} v={`≈ ${f.neut}`} />
                <Dado k="Elétrons (átomo neutro)" v={t.z} />
                <Dado k="Grupo" v={f.grupo ?? `série dos ${f.serie}`} />
                <Dado k="Período" v={f.periodo} />
                <Dado k="Bloco" v={f.bloco} />
              </div>
            </Secao>
            <Secao titulo="Distribuição eletrônica (Linus Pauling)">
              <div className="mono" style={{ fontSize: 13, lineHeight: 1.55, wordBreak: 'break-word', color: 'var(--fg)' }}>{info.full}</div>
              <div className="mono" style={{ fontSize: 13, color: col(t.cat) }}>Forma abreviada: {info.short}</div>
              <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                {t.shells.map((k, i) => (
                  <div key={i} className="layer" style={{ borderColor: col(t.cat, 0.35), background: col(t.cat, 0.1) }}>
                    <span className="display" style={{ fontSize: 11, fontWeight: 600, color: col(t.cat) }}>{SHELL_LETTERS[i]}</span>
                    <span className="mono" style={{ fontSize: 13 }}>{k}</span>
                  </div>
                ))}
              </div>
              <div style={{ fontSize: 12.5 }}>Elétrons na camada de valência: <span className="mono" style={{ color: col(t.cat) }}>{info.valence}</span></div>
              {info.exception && <div style={{ fontSize: 12, lineHeight: 1.45, color: 'var(--warn)' }}>Exceção à regra: elétrons do subnível s migram para o d, deixando o átomo mais estável.</div>}
            </Secao>
            <Secao titulo="Propriedades físicas">
              <div className="dados">
                <Dado k="Estado a 25 °C" v={f.estado} />
                <Dado k="Densidade" v={f.dens} />
                <Dado k="Ponto de fusão" v={cc.fusao != null ? kc(cc.fusao) : '—'} />
                <Dado k="Ponto de ebulição" v={cc.ebul != null ? kc(cc.ebul) : '—'} />
                <Dado k={`Raio atômico${t.est ? ' (estimado)' : ''}`} v={`${t.rad} pm`} />
                <Dado k="Raio de van der Waals" v={cc.vdw != null ? `${cc.vdw} pm` : '—'} />
              </div>
            </Secao>
            <Secao titulo="Propriedades químicas">
              <div className="dados">
                <Dado k="Eletronegatividade (Pauling)" v={cc.eneg != null ? n2(cc.eneg) : '—'} />
                <Dado k="1ª energia de ionização" v={cc.ion != null ? `${n2(cc.ion, 3)} eV · ${n2(cc.ion * 96.485, 0)} kJ/mol` : '—'} />
                <Dado k="Afinidade eletrônica" v={cc.afin != null ? `${n2(cc.afin, 3)} eV` : '—'} />
                <Dado k="Estados de oxidação" v={cc.ox || '—'} />
              </div>
            </Secao>
            <div style={{ fontSize: 11.5, color: 'var(--muted)' }}>Dados físicos e químicos: PubChem (NIH). Traço (—) = valor desconhecido; em muitos elementos sintéticos essas medidas nunca foram feitas.</div>
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
