// Ficha de um elemento: nome com prótons, nêutrons e elétrons, e as abas Básico (badges, história, nome,
// curiosidades) e Avançado (distribuição eletrônica e propriedades). A eletrosfera em 3D e as camadas
// ficam sempre à vista, entre o topo e as abas.
// É só o conteúdo; quem usa decide a moldura (gaveta no laboratório, painel fixo nos estudos).
import { useEffect, useState } from 'react';
import { cats } from '../data/nucleo.js';
import { col, el, electronInfo, shellInfo, SHELL_LETTERS, usageText } from '../game/logic.js';
import Atom3D from './Atom3D.jsx';
import Espectro from './Espectro.jsx';
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

export default function ElementFicha({ sym, discovered }) {
  const t = el(sym), tc = cats[t.cat];
  const [tab, setTab] = useState('Básico');
  const [view, setView] = useState('3D');
  const [shell, setShell] = useState(-1);
  useEffect(() => setShell(-1), [sym]);

  const info = electronInfo(t);
  const sel = shell >= 0 && shell < t.shells.length ? shell : -1;
  const si = sel >= 0 ? shellInfo(t, sel) : null;
  const hs = HIST[t.sym], f = ficha(t), cc = f.c;

  const eletrosfera = (
    <section className="ef-eletrosfera" aria-label="Eletrosfera">
      <div className="atom-stage">
        {/* Controle da vista dentro do quadro do átomo, para economizar espaço. */}
        <div className="seg accent ef-vista">
          {[['3D', '3D livre'], ['Topo', 'Vista de topo']].map(([id, l]) => <button key={id} aria-pressed={view === id} onClick={() => setView(id)}>{l}</button>)}
        </div>
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
    </section>
  );

  return (
    <>
    <div className="ef-topo">
      <div className="tile" style={{ borderColor: col(t.cat, 0.5), background: col(t.cat, 0.12) }}>
        <div className="z">{t.z}</div><div className="s" style={{ color: col(t.cat), fontSize: 28 }}>{t.sym}</div><div className="m">{t.mass}</div>
      </div>
      <div className="ef-nome">
        <div className="display" style={{ fontSize: 24, fontWeight: 600 }}>{t.name}</div>
        <div style={{ fontSize: 13.5, color: col(t.cat) }}>{tc.name}</div>
        {/* Partículas do átomo neutro, no espaço ao lado do nome. */}
        <div className="ef-particulas" style={{ '--c': col(t.cat) }}>
          {[['Prótons', t.z, 'p⁺'], ['Nêutrons', f.neut, 'n⁰'], ['Elétrons', t.z, 'e⁻']].map(([rot, n, simb]) => (
            <div key={simb} className="ef-particula" title={simb === 'n⁰' ? (t.est ? 'No isótopo mais estável' : 'No isótopo mais comum') : undefined}>
              <b className="display">{n}</b><span>{simb} {rot}</span>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* O átomo e as camadas ficam sempre à vista, fora das abas. */}
    {eletrosfera}

    <div className="seg ficha-abas" role="tablist" aria-label="Nível de detalhe">
      {['Básico', 'Avançado'].map(l => <button key={l} role="tab" aria-selected={tab === l} aria-pressed={tab === l} onClick={() => setTab(l)}>{l}</button>)}
    </div>

    {tab === 'Básico' ? (
      <div className="ficha-corpo" role="tabpanel">
        <div className="ef-badges" style={{ '--c': col(t.cat, 0.4) }}>
          <span className="ef-badge">{cc.ano ? `Descoberto em ${cc.ano}` : 'Descoberta: —'}</span>
          <span className="ef-badge">{f.estado === '—' ? 'Estado desconhecido' : `${f.estado} a 25 °C`}</span>
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
        <Secao titulo="Espectro de emissão">
          <p style={{ fontSize: 13 }}>Aquecido ou atravessado por eletricidade, cada elemento brilha só em algumas cores. Esse padrão de linhas é a impressão digital do átomo: é assim que se descobre do que são feitas as estrelas.</p>
          <Espectro sym={t.sym} nome={t.name} />
        </Secao>
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
        <div style={{ fontSize: 11.5, color: 'var(--muted)' }}>Espectro: NIST Atomic Spectra Database (linhas visíveis do átomo neutro, intensidade relativa). Dados físicos e químicos: PubChem (NIH). Traço (—) = valor desconhecido; em muitos elementos sintéticos essas medidas nunca foram feitas.</div>
      </div>
    )}
    </>
  );
}
