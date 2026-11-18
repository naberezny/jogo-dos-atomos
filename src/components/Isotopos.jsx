// Seção "Isótopos" da ficha do elemento: os naturais em destaque (com a proporção de cada um na
// natureza) e, recolhidos, todos os outros já conhecidos. Escolher um isótopo mostra os detalhes
// dele e muda os nêutrons do átomo 3D e do topo da ficha (onEscolher).
import { useState } from 'react';
import { FATO_ISOTOPO, NOME_ISOTOPO, faixa, sobrescrito, textoMeiaVida } from '../game/isotopos.js';

const pct = v => (v * 100).toLocaleString('pt-BR', { maximumSignificantDigits: v >= 0.01 ? 4 : 2 }) + '%';
const COR_FAIXA = { estavel: 'oklch(0.82 0.15 145)', longa: 'oklch(0.85 0.14 85)', media: 'oklch(0.78 0.14 50)', curta: 'oklch(0.72 0.17 25)', desconhecida: 'oklch(0.55 0.02 265)' };
const ROTULO_FAIXA = { estavel: 'Estável', longa: 'Vida longa (mais de 1 ano)', media: 'Vida média (de 1 segundo a 1 ano)', curta: 'Vida curta (menos de 1 segundo)', desconhecida: 'Meia-vida desconhecida' };

export default function Isotopos({ t, lista, sel, onEscolher, cor }) {
  const [todos, setTodos] = useState(false);
  if (!lista.length) return null;
  const naturais = lista.filter(i => i.natural);
  const outros = lista.filter(i => !i.natural);
  const i = lista.find(x => x.A === sel) || lista[0];
  const nome = NOME_ISOTOPO[`${t.z}-${i.A}`];
  const fato = FATO_ISOTOPO[`${t.z}-${i.A}`];
  const fx = faixa(i);
  const botao = x => {
    const f = faixa(x);
    return (
      <button key={x.A} className={`iso-chip${x.A === sel ? ' sel' : ''}`} style={{ '--f': COR_FAIXA[f] }} aria-pressed={x.A === sel}
        onClick={() => onEscolher(x.A)} title={`${t.name}-${x.A}: ${textoMeiaVida(x)}`}>
        <span className="iso-sim"><sup>{x.A}</sup>{t.sym}</span>
        {x.natural && <span className="iso-ab">{pct(x.ab)}</span>}
      </button>
    );
  };

  return (
    <section className="iso" style={{ '--c': cor }}>
      <div className="iso-topo">
        <div className="eyebrow" style={{ fontSize: 10.5 }}>Isótopos</div>
        <span className="iso-conta">{lista.length} conhecidos · {naturais.length ? `${naturais.length} na natureza` : 'nenhum natural'}</span>
      </div>
      <p className="iso-explica">Átomos do mesmo elemento têm sempre {t.z} {t.z === 1 ? 'próton' : 'prótons'}, mas o número de nêutrons pode variar: cada versão é um isótopo. Toque num deles para ver no átomo acima.</p>

      {naturais.length > 0 && <>
        <div className="iso-barra" role="img" aria-label={`Proporção na natureza: ${naturais.map(x => `${t.sym}-${x.A} ${pct(x.ab)}`).join(', ')}`}>
          {naturais.map((x, k) => <span key={x.A} style={{ flex: Math.max(x.ab, 0.004), '--k': k }} className={x.A === sel ? 'sel' : ''} />)}
        </div>
        <div className="iso-lista">{naturais.map(botao)}</div>
      </>}

      {outros.length > 0 && <>
        <button className="iso-todos" onClick={() => setTodos(v => !v)} aria-expanded={todos}>
          {todos ? 'Esconder os outros ▲' : `Ver ${naturais.length ? 'os outros' : 'todos os'} ${outros.length} isótopos, feitos em laboratório ▼`}
        </button>
        {todos && <>
          <div className="iso-legenda">
            {['estavel', 'longa', 'media', 'curta'].map(f => <span key={f}><i style={{ background: COR_FAIXA[f] }} />{ROTULO_FAIXA[f]}</span>)}
          </div>
          <div className="iso-lista">{outros.map(botao)}</div>
        </>}
      </>}

      <div className="iso-detalhe" style={{ '--f': COR_FAIXA[fx] }}>
        <div className="iso-detalhe-topo">
          <span className="iso-grande display"><sup>{i.A}</sup>{t.sym}</span>
          <span>
            <b className="display">{t.name}-{i.A}{nome ? ` (${nome})` : ''}</b>
            <span className="iso-selo">{i.estavel ? 'Estável' : i.seg == null ? 'Meia-vida desconhecida' : 'Radioativo'}</span>
          </span>
        </div>
        <div className="iso-dados">
          <div className="dado"><div className="k">Prótons</div><div className="v">{t.z}</div></div>
          <div className="dado"><div className="k">Nêutrons</div><div className="v">{i.n}</div></div>
          <div className="dado"><div className="k">Massa</div><div className="v">{i.massa.toLocaleString('pt-BR', { maximumFractionDigits: 4 })} u</div></div>
          <div className="dado"><div className="k">Na natureza</div><div className="v">{i.natural ? pct(i.ab) : '—'}</div></div>
          {!i.estavel && <div className="dado iso-meia"><div className="k">Meia-vida</div><div className="v">{textoMeiaVida(i)}</div></div>}
        </div>
        {!i.estavel && i.seg != null && <div className="iso-nota">Meia-vida é o tempo para metade dos átomos se transformar em outros.</div>}
        {fato && <p className="iso-fato">{fato}</p>}
      </div>
      <div className="iso-fonte">Fontes: NIST (massas e abundâncias) e NUBASE2020, via Wikipédia (meias-vidas). Símbolo {sobrescrito(i.A)}{t.sym}: o número em cima é a massa (prótons + nêutrons).</div>
    </section>
  );
}
