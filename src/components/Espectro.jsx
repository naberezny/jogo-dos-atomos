// Espectro de emissão de um elemento: as cores (comprimentos de onda) que o átomo emite quando é
// aquecido ou excitado por eletricidade. Cada elemento tem um padrão único, como uma impressão digital.
// Dados: NIST Atomic Spectra Database (linhas visíveis do átomo neutro), em src/data/espectros.json.
import ESPECTROS from '../data/espectros.json';

const MIN = 380, MAX = 750, W = 740, H = 64;
const x = nm => ((nm - MIN) / (MAX - MIN)) * W;

/** Cor aproximada de um comprimento de onda visível (aproximação de Dan Bruton), em rgb(). */
export function corDoComprimento(nm) {
  let r = 0, g = 0, b = 0;
  if (nm < 440) { r = -(nm - 440) / 60; b = 1; }
  else if (nm < 490) { g = (nm - 440) / 50; b = 1; }
  else if (nm < 510) { g = 1; b = -(nm - 510) / 20; }
  else if (nm < 580) { r = (nm - 510) / 70; g = 1; }
  else if (nm < 645) { r = 1; g = -(nm - 645) / 65; }
  else { r = 1; }
  // As pontas do visível são fracas para o olho.
  const f = nm < 420 ? 0.3 + 0.7 * (nm - 380) / 40 : nm > 700 ? 0.3 + 0.7 * (750 - nm) / 50 : 1;
  const c = v => Math.round(255 * Math.pow(Math.max(0, v) * f, 0.8));
  return `rgb(${c(r)}, ${c(g)}, ${c(b)})`;
}

const NOME_COR = nm => (nm < 450 ? 'violeta' : nm < 495 ? 'azul' : nm < 520 ? 'ciano' : nm < 570 ? 'verde' : nm < 590 ? 'amarelo' : nm < 620 ? 'laranja' : 'vermelho');
const fmt = nm => nm.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });

export default function Espectro({ sym, nome }) {
  const d = ESPECTROS[sym];
  if (!d) {
    return (
      <div className="espectro-vazio">
        Ainda não há linhas de emissão medidas para o {nome.toLowerCase()}: ele é raro ou instável demais para
        que alguém tenha conseguido observar a luz que emite.
      </div>
    );
  }
  const fortes = d.linhas.slice().sort((a, b) => b[1] - a[1]).slice(0, 3).sort((a, b) => a[0] - b[0]);
  return (
    <div className="espectro">
      <svg viewBox={`0 0 ${W} ${H + 22}`} role="img" aria-label={`Espectro de emissão do ${nome.toLowerCase()}: linhas mais fortes em ${fortes.map(([nm]) => fmt(nm) + ' nanômetros').join(', ')}`}>
        <defs>
          <filter id={`brilho-${sym}`} x="-50%" y="-10%" width="200%" height="120%"><feGaussianBlur stdDeviation="2.2" /></filter>
          {/* Faixa do arco-íris bem apagada, para situar as cores. */}
          <linearGradient id={`arco-${sym}`} x1="0" x2="1">
            {[380, 420, 460, 490, 510, 550, 580, 610, 650, 700, 750].map(nm => <stop key={nm} offset={(nm - MIN) / (MAX - MIN)} stopColor={corDoComprimento(nm)} />)}
          </linearGradient>
        </defs>
        <rect x="0" y="0" width={W} height={H} rx="6" fill="#05060a" />
        <rect x="0" y={H - 5} width={W} height="5" fill={`url(#arco-${sym})`} opacity="0.35" />
        {d.linhas.map(([nm, it]) => {
          const a = 0.25 + 0.75 * Math.sqrt(it), cor = corDoComprimento(nm), larg = 1.4 + 2.2 * it;
          return (
            <g key={nm}>
              <rect x={x(nm) - larg * 1.6} y="0" width={larg * 3.2} height={H - 5} fill={cor} opacity={a * 0.55} filter={`url(#brilho-${sym})`} />
              <rect x={x(nm) - larg / 2} y="0" width={larg} height={H - 5} fill={cor} opacity={a}><title>{`${fmt(nm)} nm (${NOME_COR(nm)})`}</title></rect>
            </g>
          );
        })}
        {[400, 450, 500, 550, 600, 650, 700].map(nm => (
          <g key={nm}>
            <line x1={x(nm)} x2={x(nm)} y1={H} y2={H + 5} stroke="currentColor" opacity="0.5" />
            <text x={x(nm)} y={H + 17} textAnchor="middle" fontSize="11" fill="currentColor" opacity="0.7">{nm}</text>
          </g>
        ))}
      </svg>
      <div className="espectro-fortes">
        {fortes.map(([nm]) => (
          <span key={nm} className="espectro-chip"><i style={{ background: corDoComprimento(nm), boxShadow: `0 0 8px ${corDoComprimento(nm)}` }} />{fmt(nm)} nm · {NOME_COR(nm)}</span>
        ))}
      </div>
    </div>
  );
}
