// Modo subatômico: acelerador de partículas, tabela do Modelo Padrão e coleção de descobertas.
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { acharReceita, antiDe, cabem, categorias, familias, par, particulas, REC, receitas, statusSub, xpSub } from '../data/subatomico.js';
import { FUSE_CHARGE, fuseMs, progress } from '../game/logic.js';
import FusionFX from '../components/FusionFX.jsx';
import PageHeader from '../components/PageHeader.jsx';
import StatusPanel from '../components/StatusPanel.jsx';
import BotaoDica from '../components/BotaoDica.jsx';
import NaMao from '../components/NaMao.jsx';
import useMedia from '../hooks/useMedia.js';
import usePegarElemento from '../hooks/usePegarElemento.js';

const TONE = { idle: 'var(--muted)', ok: 'var(--accent)', near: 'var(--warn)', bad: 'var(--bad)' };
const MAX = 6;
const cor = (fam, a, L = 0.8) => { const f = familias[fam]; return `oklch(${fam === 'hip' ? 0.72 : L} ${f.c} ${f.h}${a != null ? ' / ' + a : ''})`; };
// "Cores" da força forte, só para o desenho dos hádrons.
const CARGA_COR = ['oklch(0.7 0.19 25)', 'oklch(0.78 0.17 145)', 'oklch(0.72 0.14 250)'];

function Orbe({ p, size = 64, tinta }) {
  const c = tinta || cor(p.fam);
  return (
    <div
      className={`orbe${p.anti ? ' anti' : ''}`}
      style={{ width: size, height: size, fontSize: Math.max(11, size * 0.3), '--c': c }}
      role="img"
      aria-label={p.name}
    >
      {p.sym}
    </div>
  );
}

/** Lista as partículas de uma receita, uma por uma (u, u, d). */
const partes = c => Object.keys(c).flatMap(k => Array.from({ length: c[k] }, () => k));

function Desenho({ r }) {
  const ids = partes(r.c), n = ids.length;
  const hadron = ['barion', 'meson', 'exotico'].includes(r.cat);
  const tam = n <= 3 ? 62 : n <= 6 ? 50 : n <= 9 ? 40 : 32;
  const R = n === 1 ? 0 : n === 2 ? 46 : Math.min(98, 34 + n * 7);
  return (
    <div className="sub-desenho" role="img" aria-label={`Composição de ${r.name}`}>
      <div className="anel" style={{ width: 2 * R + tam + 28, height: 2 * R + tam + 28 }} />
      {ids.map((id, i) => {
        const a = (i / n) * Math.PI * 2 - Math.PI / 2;
        const p = par(id);
        return (
          <div key={i} style={{ position: 'absolute', left: `calc(50% + ${Math.cos(a) * R}px)`, top: `calc(50% + ${Math.sin(a) * R}px)`, transform: 'translate(-50%, -50%)' }}>
            <Orbe p={p} size={tam} tinta={hadron && p.fam === 'quark' ? CARGA_COR[i % 3] : undefined} />
          </div>
        );
      })}
    </div>
  );
}

function Resultado({ r, novo, levelUp, onClose, verColecao }) {
  const btn = useRef(null);
  useEffect(() => {
    btn.current?.focus({ preventScroll: true });
    const k = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [onClose]);
  const forca = r.cat === 'forca' || r.cat === 'processo';
  return (
    <div className="modal-wrap" onClick={onClose}>
      <div className="modal" role="dialog" aria-modal="true" aria-label={r.name} onClick={e => e.stopPropagation()}>
        <div className="modal-left">
          <div className="eyebrow">{forca ? 'Quem participa' : 'Do que é feito'}</div>
          <Desenho r={r} />
          {['barion', 'meson', 'exotico'].includes(r.cat) && r.id !== 'glueball' && (
            <div style={{ fontSize: 12, color: 'oklch(0.66 0.02 265)', textAlign: 'center' }}>As cores representam a "carga de cor" da força forte, não cores de verdade</div>
          )}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 'auto' }}>
            <div className="eyebrow">Composição</div>
            <div className="chips">
              {Object.keys(r.c).map(k => {
                const p = par(k);
                return <div key={k} className="chip" style={{ borderColor: cor(p.fam, 0.3), background: cor(p.fam, 0.08), fontFamily: 'inherit', whiteSpace: 'nowrap' }}><span className="display" style={{ fontWeight: 600, color: cor(p.fam) }}>{p.sym}</span> {p.name} ×{r.c[k]}</div>;
              })}
            </div>
          </div>
        </div>
        <div className="modal-right">
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <div className="badge" style={novo ? { background: 'var(--ok)', color: 'var(--ok-ink)' } : { background: 'oklch(0.28 0.025 265)', color: 'oklch(0.85 0.02 265)' }}>
              {novo ? `NOVA DESCOBERTA · +${xpSub(r)} XP` : 'JÁ DESCOBERTO'}
            </div>
            {levelUp && <div className="badge" style={{ background: 'var(--warn)', color: 'oklch(0.2 0.04 65)' }}>SUBIU PARA O NÍVEL {levelUp}</div>}
          </div>
          <div>
            <div className="display" style={{ fontSize: r.sym.length > 6 ? 34 : 52, fontWeight: 700, lineHeight: 1.1, color: 'var(--accent)' }}>{r.sym}</div>
            <div className="display" style={{ marginTop: 8, fontSize: 28, fontWeight: 600 }}>{r.name}</div>
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <div className="kv"><span>Tipo</span><span>{categorias[r.cat]}</span></div>
            {r.carga !== '—' && <div className="kv"><span>Carga elétrica</span><span>{r.carga}</span></div>}
            {r.massa !== '—' && <div className="kv"><span>{forca ? 'Característica' : 'Massa'}</span><span>{r.massa}</span></div>}
            <div className="kv"><span>{forca ? 'Descrita em' : 'Descoberta'}</span><span>{r.ano}</span></div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div className="eyebrow">Onde aparece</div>
            <div style={{ fontSize: 15, lineHeight: 1.5 }}>{r.onde}</div>
          </div>
          <div className="fact">
            <div className="eyebrow" style={{ color: 'var(--accent)' }}>Curiosidade</div>
            <div style={{ textWrap: 'pretty' }}>{r.fato}</div>
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 'auto', flexWrap: 'wrap' }}>
            <button className="btn btn-primary" onClick={onClose} ref={btn}>Continuar</button>
            {verColecao && <button className="btn btn-ghost" onClick={verColecao}>Ver descobertas</button>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Subatomico({ game }) {
  const { st, set } = game;
  const zona = st.subZone || {}, disc = st.subDisc || [];
  const [aba, setAba] = useState('Acelerador');
  const [anti, setAnti] = useState(false);
  const [foco, setFoco] = useState('u');
  const [fundindo, setFundindo] = useState(false);
  const [res, setRes] = useState(null);
  const reator = useRef(null);
  const [sobre, setSobre] = useState(false);
  const [dica, setDica] = useState(false);
  // No celular, acelerador e tabela dividem a tela (como no laboratório) e as dicas ficam num botão.
  const pequeno = useMedia('(max-width: 640px)');
  const timer = useRef(null);
  useEffect(() => () => clearTimeout(timer.current), []);

  const ks = Object.keys(zona);
  const receita = acharReceita(zona);
  const status = statusSub(zona, disc);
  const acesas = useMemo(() => cabem(zona), [zona]);
  const tone = fundindo ? 'var(--ok)' : TONE[status.tone];
  const ms = fuseMs();
  const reduzido = typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;

  const add = (id, d = 1) => {
    if (fundindo) return;
    setFoco(id);
    set(s => {
      const z = { ...(s.subZone || {}) };
      z[id] = Math.max(0, Math.min(MAX, (z[id] || 0) + d));
      if (!z[id]) delete z[id];
      return { subZone: z };
    });
  };
  const limpar = () => { clearTimeout(timer.current); setFundindo(false); set({ subZone: {} }); };

  const colidir = () => {
    if (!receita || fundindo) return;
    setFundindo(true);
    timer.current = setTimeout(() => {
      setFundindo(false);
      // As descobertas não mudam durante a colisão, então dá para calcular com o estado de quando ela começou.
      const ja = disc.includes(receita.id);
      const subDisc = ja ? disc : [...disc, receita.id];
      const antes = progress(st).level, depois = progress({ ...st, subDisc }).level;
      set(s => ({ subDisc, subZone: {}, fusions: s.fusions + 1 }));
      setRes({ id: receita.id, novo: !ja, levelUp: depois > antes ? depois : null });
    }, ms);
  };

  // Na colisão, cada partícula é puxada até o centro do acelerador.
  useLayoutEffect(() => {
    if (!fundindo || !reator.current) return;
    const r = reator.current.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    reator.current.querySelectorAll('.atom-wrap').forEach((a, i) => {
      const b = a.getBoundingClientRect();
      a.style.setProperty('--dx', `${cx - (b.left + b.width / 2)}px`);
      a.style.setProperty('--dy', `${cy - (b.top + b.height / 2)}px`);
      a.style.setProperty('--giro', `${i % 2 ? -260 : 260}deg`);
    });
  }, [fundindo]);

  const pega = usePegarElemento({ alvo: reator, onSoltar: id => add(id), onSobre: setSobre });
  const movel = pequeno && aba === 'Acelerador';
  const abas = (
    <div className="seg">
      {['Acelerador', 'Descobertas'].map(l => <button key={l} aria-pressed={aba === l} onClick={() => setAba(l)}>{l}</button>)}
    </div>
  );
  const antimateria = (
    <div className="seg accent" role="group" aria-label="Matéria ou antimatéria">
      <button aria-pressed={!anti} onClick={() => setAnti(false)}>Matéria</button>
      <button aria-pressed={anti} onClick={() => setAnti(true)}>Antimatéria</button>
    </div>
  );
  const tabela = particulas.filter(p => !p.anti);
  const pFoco = par(foco) || par('u');
  const painel = onClose => (
    <StatusPanel
      onClose={onClose}
      tom={tone}
      destacado={ks.length > 0}
      tag={fundindo ? 'COLISÃO EM ANDAMENTO' : status.tag}
      title={fundindo ? 'Energia suficiente' : status.title}
      text={fundindo ? 'As partículas estão se encontrando…' : status.text}
      chips={fundindo ? [] : status.missing.map(m => { const p = par(m.id); return { key: m.id, label: `+${m.n} ${p.sym}`, cor: cor(p.fam), onClick: () => add(m.id, m.n), aria: `Adicionar ${m.n} de ${p.name}` }; })}
    />
  );
  const fichaParticula = (
    <div className="status sub-ficha" style={{ borderColor: cor(pFoco.fam, 0.35) }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <Orbe p={pFoco} size={46} />
        <div>
          <div className="display" style={{ fontSize: 17, fontWeight: 600 }}>{pFoco.name}</div>
          <div style={{ fontSize: 12.5, color: cor(pFoco.fam) }}>{familias[pFoco.fam].name}{pFoco.anti ? ' · antimatéria' : ''}</div>
        </div>
      </div>
      <div className="sub-dados">
        <span>Carga <b>{pFoco.carga}</b></span><span>Spin <b>{pFoco.spin}</b></span><span>Massa <b>{pFoco.massa}</b></span><span>Descoberta <b>{pFoco.ano}</b></span>
      </div>
      <p style={{ margin: 0 }}>{pFoco.fato}</p>
    </div>
  );
  const r = res && REC.get(res.id);

  return (
    <section className={`lab sub${movel ? ' movel' : ''}`} aria-label="Modo subatômico" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <PageHeader eyebrow="Modo subatômico" title="Acelerador de partículas" sub={`${disc.length} de ${receitas.length} descobertas · quarks, léptons e bósons formam tudo o que existe`}>
        {abas}
      </PageHeader>
      {movel && <div className="sub-abas">{abas}{antimateria}</div>}

      {aba === 'Acelerador' ? (
        <>
          <div className="lab-top">
            <div
              ref={reator}
              className={`reactor${sobre ? ' over' : ''}${fundindo ? ' fusing' : ''}`}
              style={{ '--t-fusao': `${ms}ms`, '--t-carga': `${ms * FUSE_CHARGE}ms` }}
            >
              <div className="eyebrow">Ponto de colisão</div>
              {ks.length > 0 && !fundindo && <button className="btn-small" onClick={limpar}>Limpar</button>}
              {movel && !fundindo && (
                <BotaoDica tom={tone} aberto={dica} chama={status.tone === 'near' || status.tone === 'bad'} resumo={status.missing.map(m => `+${m.n} ${par(m.id).sym}`).join(' ')} onClick={() => setDica(d => !d)} />
              )}
              {movel && dica && !fundindo && (
                <div className="dica-painel dica-dupla">
                  {painel(() => setDica(false))}
                  {fichaParticula}
                </div>
              )}
              {ks.length === 0 && <div className="drop-hint">{movel ? 'Toque numa partícula, ou segure e arraste até aqui' : 'Arraste ou toque nas partículas da tabela'}</div>}
              <div className="zone">
                {ks.map(id => {
                  const p = par(id);
                  return (
                    <div className="zone-atom" key={id}>
                      <div className="atom-wrap"><Orbe p={p} size={movel ? 44 : 60} /></div>
                      <span className="mono" style={{ fontSize: 12, color: 'oklch(0.9 0.01 265)' }}>{p.sym} ×{zona[id]}</span>
                      <div className="steppers">
                        <button className="btn-step" onClick={() => add(id, -1)} aria-label={`Remover ${p.name}`}>−</button>
                        <button className="btn-step" onClick={() => add(id, 1)} aria-label={`Adicionar ${p.name}`}>+</button>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="zone-formula" aria-live="polite">{ks.map(k => par(k).sym + (zona[k] > 1 ? '×' + zona[k] : '')).join('  ')}</div>
              {receita && <button className="btn-fuse" onClick={colidir} disabled={fundindo}>{fundindo ? 'COLIDINDO…' : 'COLIDIR'}</button>}
              {fundindo && !reduzido && <FusionFX ms={ms} charge={FUSE_CHARGE} hues={ks.map(k => familias[par(k).fam])} />}
              {fundindo && receita && <div className="fusion-formula" aria-hidden="true" style={{ fontSize: receita.sym.length > 6 ? 'clamp(22px, 4vw, 38px)' : undefined }}>{receita.sym}</div>}
            </div>

            {!movel && <div className="lab-side">
              {painel()}
              {fichaParticula}
            </div>}
          </div>

          <div className="ptable-card sm-card">
            {!movel && <div className="page-head" style={{ alignItems: 'center' }}>
              <div className="display" style={{ fontSize: 18, fontWeight: 600 }}>Modelo Padrão</div>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
                <div className="sm-legenda">
                  {Object.keys(familias).map(k => <span key={k} className="sm-leg"><span className="sw" style={{ background: cor(k) }} />{familias[k].name}</span>)}
                </div>
                {antimateria}
              </div>
            </div>}
            <div className="sm-table" ref={pega.gradeRef} style={{ '--segurar': `${pega.segurarMs}ms` }}>
              {['1ª geração', '2ª geração', '3ª geração', 'Forças', 'Massa'].map((t, i) => <div key={t} className="sm-head" style={{ gridColumn: i + 1 }}>{t}</div>)}
              {tabela.map(b => {
                const p = anti ? par(antiDe(b.id)) : b;
                const apagada = !acesas.has(p.id);
                return (
                  <button
                    key={p.id}
                    className={`sm-cell${apagada ? ' off' : ''}${pega.segurando === p.id ? ' segurando' : ''}${pega.mao?.sym === p.id ? ' na-mao' : ''}`}
                    {...pega.celula(p.id)}
                    onClick={() => { if (pega.cliqueValido()) add(p.id); }}
                    onMouseEnter={() => setFoco(p.id)}
                    onFocus={() => setFoco(p.id)}
                    aria-label={`${p.name}. ${apagada ? 'Não combina com o que está no acelerador' : 'Adicionar ao acelerador'}`}
                    style={{
                      gridColumn: b.col, gridRow: b.row + 1,
                      borderColor: cor(p.fam, 0.4), background: cor(p.fam, foco === p.id ? 0.22 : 0.09),
                      outline: zona[p.id] ? `1.5px solid ${cor(p.fam)}` : undefined,
                    }}
                  >
                    <span className="m">{p.massa}</span>
                    <span className="s" style={{ color: cor(p.fam) }}>{p.sym}</span>
                    <span className="n">{p.name}</span>
                    <span className="q">{p.carga}</span>
                  </button>
                );
              })}
            </div>
            <div className="sm-nota" style={{ fontSize: 12.5, color: 'var(--muted)' }}>
              Três quarks formam um bárion; um quark e um antiquark formam um méson. Junte partículas com um bóson para descobrir as forças.
            </div>
          </div>
        </>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
          {Object.keys(categorias).map(cat => {
            const itens = receitas.filter(x => x.cat === cat);
            const feitos = itens.filter(x => disc.includes(x.id)).length;
            return (
              <div key={cat} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
                  <div className="display" style={{ fontSize: 19, fontWeight: 600 }}>{categorias[cat]}</div>
                  <span className="mono" style={{ fontSize: 12, color: 'var(--muted)' }}>{feitos}/{itens.length}</span>
                </div>
                <div className="coll-grid">
                  {itens.map(x => {
                    const k = disc.includes(x.id);
                    return (
                      <button key={x.id} className={`sub-card${k ? ' known' : ''}`} disabled={!k} style={{ minHeight: 120 }} onClick={() => k && setRes({ id: x.id, novo: false, levelUp: null, daColecao: true })} aria-label={k ? `${x.name}. Ver detalhes` : `Não descoberto, ${x.n} partículas`}>
                        <div className="formula" style={{ fontSize: k && x.sym.length > 6 ? 17 : 26 }}>{k ? x.sym : '? ? ?'}</div>
                        <div style={{ fontSize: 15, fontWeight: 500, marginTop: 'auto' }}>{k ? x.name : 'Não descoberto'}</div>
                        <div style={{ fontSize: 12, color: 'oklch(0.68 0.02 265)' }}>{k ? x.onde : `${x.n} partícula${x.n > 1 ? 's' : ''}`}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {pega.mao && (() => { const p = par(pega.mao.sym); return <NaMao innerRef={pega.maoRef} toque={pega.mao.toque} cor={cor(p.fam)}><Orbe p={p} size={70} /></NaMao>; })()}
      {r && <Resultado r={r} novo={res.novo} levelUp={res.levelUp} onClose={() => setRes(null)} verColecao={res.daColecao ? null : () => { setRes(null); setAba('Descobertas'); }} />}
    </section>
  );
}
