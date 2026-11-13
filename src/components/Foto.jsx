// Foto de uma substância (Wikimedia Commons) com crédito de autor e licença.
import FOTOS from '../data/fotos.json';

export const temFoto = f => !!FOTOS[f];
export const fotoUrl = f => `${import.meta.env.BASE_URL}fotos/${f}.jpg`;

export default function Foto({ s, credito = true, style }) {
  const m = FOTOS[s.f];
  if (!m) return null;
  return (
    <figure className="foto" style={style}>
      <img src={fotoUrl(s.f)} alt={`Foto: ${s.name}`} loading="lazy" decoding="async" />
      {credito && (
        <figcaption>
          Foto: {m.autor} · {m.licenca} · <a href={m.pagina} target="_blank" rel="noopener noreferrer">Wikimedia Commons</a>
        </figcaption>
      )}
    </figure>
  );
}
