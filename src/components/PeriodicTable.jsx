// Tabela periódica com legenda que filtra por família. Usada no laboratório e nos estudos.
import { useState } from 'react';
import { elements, cats } from '../data/nucleo.js';
import { col } from '../game/logic.js';

/**
 * @param onPick      chamado com o símbolo ao tocar num elemento
 * @param selected    símbolo em destaque
 * @param isOff       sym => true para apagar o elemento (sem receita, fora da busca...)
 * @param isMarked    sym => true para contornar o elemento (ex.: já está no reator)
 * @param draggable   permite arrastar os elementos (o símbolo vai em text/plain)
 * @param acao        complemento do rótulo de acessibilidade ("Ver ficha")
 * @param children    conteúdo extra no cabeçalho, antes da legenda
 */
export default function PeriodicTable({ titulo = 'Tabela periódica', onPick, selected, isOff, isMarked, draggable = false, acao = 'Ver ficha', children }) {
  const [hovered, setHovered] = useState(null);
  const [filterCat, setFilterCat] = useState(null);
  return (
    <div className="ptable-card">
      <div className="page-head" style={{ alignItems: 'center' }}>
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
      </div>
      <div className="ptable-scroll">
        <div className="ptable" onMouseLeave={() => setHovered(null)}>
          {elements.map(e => {
            const apagado = isOff ? isOff(e.sym) : false;
            const dim = apagado || (filterCat && filterCat !== e.cat);
            const aceso = hovered === e.sym || selected === e.sym;
            return (
              <div
                key={e.sym}
                className={`cell${apagado ? ' off' : ''}${selected === e.sym ? ' sel' : ''}`}
                role="button"
                tabIndex={0}
                aria-label={`${e.name}, ${e.z}. ${acao}`}
                aria-pressed={selected === e.sym}
                draggable={draggable}
                onDragStart={draggable ? ev => { ev.dataTransfer.setData('text/plain', e.sym); ev.dataTransfer.effectAllowed = 'copy'; } : undefined}
                onClick={() => onPick(e.sym)}
                onKeyDown={ev => { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); onPick(e.sym); } }}
                onMouseEnter={() => setHovered(e.sym)}
                onFocus={() => setHovered(e.sym)}
                style={{
                  gridColumn: e.col, gridRow: e.row,
                  borderColor: col(e.cat, selected === e.sym ? 0.9 : 0.35),
                  background: col(e.cat, aceso ? 0.24 : 0.09),
                  opacity: dim ? 0.18 : 1,
                  outline: isMarked && isMarked(e.sym) ? `1.5px solid ${col(e.cat)}` : undefined,
                  cursor: draggable ? undefined : 'pointer',
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
    </div>
  );
}
