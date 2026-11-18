// Fotos de uma substância (Wikimedia Commons) com legenda, autor e licença.
// A primeira é a principal (capa); as outras mostram onde a substância aparece ou é usada.
import { useEffect, useRef, useState } from 'react';
import FOTOS from '../data/fotos.json';

export const temFoto = f => !!FOTOS[f]?.length;
/** Endereço da foto i (0 = principal) da substância de fórmula f. */
export const fotoUrl = (f, i = 0) => `${import.meta.env.BASE_URL}fotos/${f}${i ? '-' + (i + 1) : ''}.jpg`;

export default function Foto({ s, credito = true, style }) {
  const fotos = FOTOS[s.f] || [];
  const [i, setI] = useState(0);
  const toque = useRef(null);
  useEffect(() => setI(0), [s.f]);
  if (!fotos.length) return null;
  const n = fotos.length;
  const m = fotos[Math.min(i, n - 1)];
  const ir = d => setI(k => (k + d + n) % n);
  // Arrastar para o lado troca a foto (celular).
  const inicio = e => { toque.current = e.touches[0].clientX; };
  const fim = e => {
    if (toque.current == null) return;
    const dx = e.changedTouches[0].clientX - toque.current;
    toque.current = null;
    if (n > 1 && Math.abs(dx) > 40) ir(dx < 0 ? 1 : -1);
  };
  return (
    <figure className="foto" style={style}>
      <div className="foto-quadro" onTouchStart={inicio} onTouchEnd={fim}>
        <img key={i} src={fotoUrl(s.f, i)} alt={m.legenda || `Foto: ${s.name}`} loading="lazy" decoding="async" />
        {n > 1 && <>
          <button className="foto-seta esq" onClick={() => ir(-1)} aria-label="Foto anterior">‹</button>
          <button className="foto-seta dir" onClick={() => ir(1)} aria-label="Próxima foto">›</button>
          <span className="foto-cont">{i + 1}/{n}</span>
        </>}
      </div>
      {m.legenda && (
        <div className="foto-legenda">
          <strong>{m.legenda}</strong>
          {m.descricao && <span>{m.descricao}</span>}
        </div>
      )}
      {n > 1 && (
        <div className="foto-miniaturas" role="tablist" aria-label="Fotos">
          {fotos.map((x, k) => (
            <button key={k} role="tab" aria-selected={k === i} aria-label={x.legenda || `Foto ${k + 1}`} onClick={() => setI(k)}>
              <img src={fotoUrl(s.f, k)} alt="" loading="lazy" decoding="async" />
            </button>
          ))}
        </div>
      )}
      {credito && (
        <figcaption>
          Foto: {m.autor} · {m.licenca} · <a href={m.pagina} target="_blank" rel="noopener noreferrer">Wikimedia Commons</a>
        </figcaption>
      )}
    </figure>
  );
}
