// Tabela periódica com legenda que filtra por família. Usada no laboratório e nos estudos.
import { useState } from 'react';
import { elements, cats } from '../data/nucleo.js';
import { col, el } from '../game/logic.js';
import usePegarElemento from '../hooks/usePegarElemento.js';
import Atom3D from './Atom3D.jsx';
import NaMao from './NaMao.jsx';

/** Miniatura 3D do átomo que acompanha o dedo ou o mouse enquanto ele está "na mão". */
function AtomoNaMao({ sym, toque, innerRef }) {
  const e = el(sym), c = cats[e.cat];
  return (
    <NaMao innerRef={innerRef} toque={toque} cor={col(e.cat)} rotulo={sym}>
      <Atom3D size={92} shells={e.shells} h={c.h} c={c.c} fusing title="" />
    </NaMao>
  );
}

/**
 * @param onPick      chamado com o símbolo ao tocar num elemento
 * @param selected    símbolo em destaque
 * @param isOff       sym => true para apagar o elemento (sem receita, fora da busca...)
 * @param isMarked    sym => true para contornar o elemento (ex.: já está no reator)
 * @param soltarEm    ref de onde os elementos podem ser soltos; liga o gesto de pegar e arrastar
 *                    (no toque, segurando por `segurarMs`; no mouse, arrastando direto)
 * @param onSoltar    sym => void, ao soltar um elemento dentro de `soltarEm`
 * @param onSobre     bool => void, quando o elemento entra ou sai de `soltarEm`
 * @param compacta    versão mínima para celular: só os símbolos, sem título nem legenda, cabe sem rolar
 * @param acao        complemento do rótulo de acessibilidade ("Ver ficha")
 * @param children    conteúdo extra no cabeçalho, antes da legenda
 */
export default function PeriodicTable({ titulo = 'Tabela periódica', onPick, selected, isOff, isMarked, soltarEm, onSoltar, onSobre, segurarMs, compacta = false, acao = 'Ver ficha', children }) {
  const [hovered, setHovered] = useState(null);
  const [filterCat, setFilterCat] = useState(null);
  const pega = usePegarElemento({ alvo: soltarEm, onSoltar, onSobre, segurarMs, ativo: !!soltarEm });
  const escolher = sym => { if (pega.cliqueValido()) onPick(sym); };
  return (
    <div className={`ptable-card${compacta ? ' compacta' : ''}`}>
      {!compacta && <div className="page-head" style={{ alignItems: 'center' }}>
        <div className="display" style={{ fontSize: 18, fontWeight: 600 }}>{titulo}</div>
        {children}
        <div className="legend">
          {Object.keys(cats).map(k => {
            const on = filterCat === k;
            return (
              <button key={k} aria-pressed={on} onClick={() => setFilterCat(on ? null : k)} style={on ? { background: col(k, 0.18), borderColor: col(k, 0.6) } : undefined}>
                <span className="sw" style={{ background: col(k) }} />{cats[k].name}
              </button>
            );
          })}
        </div>
      </div>}
      <div className="ptable-scroll">
        <div className="ptable" ref={pega.gradeRef} onMouseLeave={() => setHovered(null)} style={{ '--segurar': `${pega.segurarMs}ms` }}>
          {elements.map(e => {
            const apagado = isOff ? isOff(e.sym) : false;
            const dim = apagado || (filterCat && filterCat !== e.cat);
            const aceso = hovered === e.sym || selected === e.sym;
            return (
              <div
                key={e.sym}
                className={`cell${apagado ? ' off' : ''}${selected === e.sym ? ' sel' : ''}${pega.segurando === e.sym ? ' segurando' : ''}${pega.mao?.sym === e.sym ? ' na-mao' : ''}`}
                role="button"
                tabIndex={0}
                aria-label={`${e.name}, ${e.z}. ${acao}`}
                aria-pressed={selected === e.sym}
                {...pega.celula(e.sym)}
                onClick={() => escolher(e.sym)}
                onKeyDown={ev => { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); onPick(e.sym); } }}
                onMouseEnter={() => setHovered(e.sym)}
                onFocus={() => setHovered(e.sym)}
                style={{
                  gridColumn: e.col, gridRow: e.row,
                  borderColor: col(e.cat, selected === e.sym ? 0.9 : 0.35),
                  background: col(e.cat, aceso ? 0.24 : 0.09),
                  opacity: dim ? 0.18 : 1,
                  outline: isMarked && isMarked(e.sym) ? `1.5px solid ${col(e.cat)}` : undefined,
                  cursor: soltarEm ? 'grab' : 'pointer',
                }}
              >
                <span className="z">{e.z}</span>
                <span className="s" style={{ color: col(e.cat) }}>{e.sym}</span>
                <span className="n">{e.name}</span>
              </div>
            );
          })}
          <div className="series" style={{ gridColumn: 3, gridRow: 6, borderColor: 'oklch(0.8 0.13 340 / 0.4)', color: 'oklch(0.8 0.13 340)' }}>57–71</div>
          <div className="series" style={{ gridColumn: 3, gridRow: 7, borderColor: 'oklch(0.8 0.14 5 / 0.4)', color: 'oklch(0.8 0.14 5)' }}>89–103</div>
        </div>
      </div>
      {pega.mao && <AtomoNaMao sym={pega.mao.sym} toque={pega.mao.toque} innerRef={pega.maoRef} />}
    </div>
  );
}
