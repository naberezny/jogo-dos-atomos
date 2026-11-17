// Coleção de substâncias: filtro principal (todas ou descobertas) e subfiltros que se combinam:
// estado físico, composição, tamanho e grupo (os mesmos das medalhas), além de busca por nome ou fórmula.
import { useMemo, useState } from 'react';
import { elements, substances } from '../data/nucleo.js';
import { MEDALHAS } from '../data/medalhas.js';
import { fotoUrl, temFoto } from '../components/Foto.jsx';
import PageHeader from '../components/PageHeader.jsx';

const STATE = { 'gás': 'Gás', 'líquido': 'Líquido', 'sólido': 'Sólido' };
const CAT = new Map(elements.map(e => [e.sym, e.cat]));
const METAIS = new Set(['am', 'ae', 'tm', 'pt', 'la', 'ac']);
const organica = s => !!(s.c.C && s.c.H);

/** Subfiltros: cada linha aceita uma opção por vez; linhas diferentes se somam. */
const LINHAS = [
  { id: 'estado', rotulo: 'Estado físico', opcoes: [
    ['gas', 'Gases', s => s.state === 'gás'],
    ['liq', 'Líquidos', s => s.state === 'líquido'],
    ['sol', 'Sólidos', s => s.state === 'sólido'],
  ] },
  { id: 'tipo', rotulo: 'Composição', opcoes: [
    ['org', 'Orgânicas', organica],
    ['inorg', 'Inorgânicas', s => !organica(s)],
    ['metal', 'Com metais', s => Object.keys(s.c).some(k => METAIS.has(CAT.get(k)))],
    ['puro', 'Um só elemento', s => s.nEl === 1],
  ] },
  { id: 'tamanho', rotulo: 'Tamanho', opcoes: [
    ['p', '2 a 4 átomos', s => s.atoms <= 4],
    ['m', '5 a 9 átomos', s => s.atoms >= 5 && s.atoms <= 9],
    ['g', '10 a 19 átomos', s => s.atoms >= 10 && s.atoms <= 19],
    ['gg', '20 ou mais', s => s.atoms >= 20],
  ] },
];
const GRUPOS = MEDALHAS.filter(m => m.modo === 'mol' && !m.exclusiva);
const GRUPO = new Map(GRUPOS.map(m => [m.id, new Set(m.membros)]));
const VAZIO = { base: 'Todas', estado: null, tipo: null, tamanho: null, grupo: null, busca: '' };
const sem = t => t.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

export default function Collection({ game }) {
  const { st, set, P } = game;
  const f = { ...VAZIO, ...(st.collFiltro || {}) };
  const muda = patch => set({ collFiltro: { ...f, ...patch } });
  const alterna = (campo, id) => muda({ [campo]: f[campo] === id ? null : id });
  const [gruposAbertos, setGruposAbertos] = useState(false);

  const desc = useMemo(() => new Set(st.discovered), [st.discovered]);
  const testes = useMemo(() => {
    const t = [];
    if (f.base === 'Descobertas') t.push(s => desc.has(s.f));
    for (const l of LINHAS) { const o = l.opcoes.find(o => o[0] === f[l.id]); if (o) t.push(o[2]); }
    if (f.grupo && GRUPO.has(f.grupo)) { const g = GRUPO.get(f.grupo); t.push(s => g.has(s.f)); }
    const q = sem(f.busca.trim());
    // A busca só olha nome e fórmula das já descobertas, para não entregar as que faltam.
    if (q) t.push(s => desc.has(s.f) && (sem(s.name).includes(q) || s.f.toLowerCase().includes(q.replace(/\s/g, ''))));
    return t;
  }, [f.base, f.estado, f.tipo, f.tamanho, f.grupo, f.busca, desc]); // eslint-disable-line react-hooks/exhaustive-deps
  const items = substances.map((s, i) => ({ s, i })).filter(({ s }) => testes.every(t => t(s)));
  const subAtivos = LINHAS.filter(l => f[l.id]).length + (f.grupo ? 1 : 0) + (f.busca.trim() ? 1 : 0);
  // Contagem de cada opção já respeitando o filtro principal, para guiar a escolha.
  const naBase = s => f.base !== 'Descobertas' || desc.has(s.f);
  const conta = teste => substances.filter(s => naBase(s) && teste(s)).length;
  const grupoAtual = GRUPOS.find(m => m.id === f.grupo);
  const gruposVisiveis = gruposAbertos || !f.grupo ? GRUPOS : [grupoAtual, ...GRUPOS.filter(m => m !== grupoAtual)];

  return (
    <section aria-label="Coleção" style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <PageHeader eyebrow="Enciclopédia" title="Coleção de substâncias" sub={`${P.disc.length} de ${substances.length} descobertas`}>
        <div className="seg accent filtro-base" role="group" aria-label="Mostrar">
          {[['Todas', substances.length], ['Descobertas', P.disc.length]].map(([l, n]) => (
            <button key={l} aria-pressed={f.base === l} onClick={() => muda({ base: l })}>{l} <span className="mono filtro-n">{n}</span></button>
          ))}
        </div>
      </PageHeader>

      <div className="card filtros">
        <div className="filtro-topo">
          <input className="filtro-busca" type="search" placeholder="Buscar por nome ou fórmula…" value={f.busca} onChange={e => muda({ busca: e.target.value })} aria-label="Buscar substância descoberta" />
          {subAtivos > 0 && <button className="btn-small" onClick={() => set({ collFiltro: { ...VAZIO, base: f.base } })}>Limpar filtros ({subAtivos})</button>}
        </div>
        {LINHAS.map(l => (
          <div key={l.id} className="filtro-linha">
            <span className="eyebrow">{l.rotulo}</span>
            <div className="filtro-chips">
              {l.opcoes.map(([id, rotulo, teste]) => (
                <button key={id} className="fchip" aria-pressed={f[l.id] === id} onClick={() => alterna(l.id, id)}>{rotulo} <span className="mono filtro-n">{conta(teste)}</span></button>
              ))}
            </div>
          </div>
        ))}
        <div className="filtro-linha">
          <span className="eyebrow">Grupos</span>
          <div className={`filtro-chips grupos${gruposAbertos ? ' abertos' : ''}`}>
            {gruposVisiveis.map(m => {
              const tem = m.membros.filter(k => desc.has(k)).length;
              return (
                <button key={m.id} className="fchip" aria-pressed={f.grupo === m.id} onClick={() => alterna('grupo', m.id)} title={m.nome}>
                  <span aria-hidden="true">{m.icone}</span> {m.grupo} <span className="mono filtro-n">{tem}/{m.membros.length}</span>
                </button>
              );
            })}
          </div>
          <button className="filtro-mais" onClick={() => setGruposAbertos(a => !a)}>{gruposAbertos ? 'Mostrar menos ▲' : `Ver todos os ${GRUPOS.length} grupos ▼`}</button>
        </div>
      </div>

      <div className="filtro-resultado mono">
        {items.length === substances.length ? `Mostrando as ${items.length} substâncias` : `Mostrando ${items.length} de ${substances.length}`}
        {grupoAtual && <> · <b>{grupoAtual.icone} {grupoAtual.nome}</b></>}
      </div>

      {items.length === 0 ? (
        <div className="card filtro-vazio">
          <div className="display" style={{ fontSize: 18, fontWeight: 600 }}>Nenhuma substância com esses filtros</div>
          <div style={{ color: 'var(--muted)', fontSize: 14 }}>{f.busca.trim() ? 'A busca só encontra substâncias que você já descobriu.' : 'Tente tirar algum filtro.'}</div>
          <button className="btn btn-ghost" onClick={() => set({ collFiltro: VAZIO })}>Limpar todos os filtros</button>
        </div>
      ) : (
        <div className="coll-grid">
          {items.map(({ s, i }) => {
            const k = desc.has(s.f);
            return (
              <button
                key={s.f}
                className={`sub-card${k ? ' known' : ''}`}
                disabled={!k}
                onClick={() => k && set({ result: s.f, resultNew: false, levelUp: null })}
                aria-label={k ? `${s.name}, ${s.d}. Ver detalhes` : `Substância ${i + 1} não descoberta, ${s.atoms} átomos`}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="mono" style={{ fontSize: 11, color: 'oklch(0.68 0.02 265)' }}>#{String(i + 1).padStart(2, '0')}</span>
                  <span className="pill">{STATE[s.state]}</span>
                </div>
                {k && temFoto(s.f) && <img className="thumb" src={fotoUrl(s.f)} alt="" loading="lazy" decoding="async" />}
                <div className="formula">{k ? s.d : '? ? ?'}</div>
                <div style={{ fontSize: 15, fontWeight: 500, marginTop: 'auto' }}>{k ? s.name : 'Não descoberta'}</div>
                <div style={{ fontSize: 12, color: 'oklch(0.68 0.02 265)' }}>{k ? s.where : `${s.atoms} átomos · ${s.nEl} elemento${s.nEl > 1 ? 's' : ''}`}</div>
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}
