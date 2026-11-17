// Barra de nível animada: a cada XP ganho ela enche aos poucos; se o nível subir, primeiro
// completa a barra, depois vem a comemoração e só então ela recomeça no nível novo.
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { XP_PER_LEVEL as XPL } from '../game/logic.js';
import { substances } from '../data/nucleo.js';

const ESPERA = 380;     // o cartão aparece parado antes de a barra andar
const CHEIA = 650;      // barra completa brilhando antes da comemoração
const FICA = 1700;      // tempo com o resultado final na tela
const suave = t => 1 - (1 - t) ** 3;
const semMovimento = () => typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Guarda o XP mostrado na tela (que corre atrás do XP real) e avisa quem estiver desenhando a barra. */
function criarLoja(xp) {
  const ouvintes = new Set();
  let foto = { nivel: Math.floor(xp / XPL) + 1, dentro: xp % XPL, ganho: 0, visivel: false, cheia: false };
  return {
    get: () => foto,
    set: p => { foto = { ...foto, ...p }; ouvintes.forEach(f => f()); },
    subscribe: f => { ouvintes.add(f); return () => ouvintes.delete(f); },
  };
}

export function useXpAnimado(xp) {
  const [loja] = useState(() => criarLoja(xp));
  const [subiu, setSubiu] = useState(null);
  const r = useRef({ alvo: xp, mostrado: xp, ganho: 0, raf: 0, t: 0, comemorando: false }).current;

  const parar = useCallback(() => { cancelAnimationFrame(r.raf); clearTimeout(r.t); }, [r]);
  const mostrar = useCallback((m, extra) => loja.set({ nivel: Math.floor(m / XPL) + 1, dentro: Math.round(m % XPL), cheia: false, ...extra }), [loja]);

  const passo = useCallback(() => {
    parar();
    const de = r.mostrado;
    if (de >= r.alvo) {
      mostrar(de);
      r.t = setTimeout(() => { r.ganho = 0; loja.set({ visivel: false }); }, FICA);
      return;
    }
    const limite = (Math.floor(de / XPL) + 1) * XPL, ate = Math.min(r.alvo, limite);
    const dura = semMovimento() ? 0 : 550 + 900 * (ate - de) / XPL;
    const fim = () => {
      r.mostrado = ate;
      if (ate < limite) return passo();
      // Completou o nível: segura a barra cheia e só depois comemora.
      loja.set({ dentro: XPL, cheia: true });
      r.t = setTimeout(() => { r.comemorando = true; setSubiu(Math.floor(r.alvo / XPL) + 1); }, CHEIA);
    };
    let ini = null;
    const quadro = agora => {
      if (ini == null) ini = agora;
      const k = dura ? Math.min(1, (agora - ini) / dura) : 1;
      r.mostrado = de + (ate - de) * suave(k);
      if (k >= 1) return fim();
      mostrar(r.mostrado);
      r.raf = requestAnimationFrame(quadro);
    };
    r.t = setTimeout(() => { r.raf = requestAnimationFrame(quadro); }, ESPERA);
  }, [r, loja, mostrar, parar]);

  useEffect(() => {
    if (xp === r.alvo) return;
    if (xp < r.alvo) {
      // Recomeçou o jogo: sem animação.
      parar();
      Object.assign(r, { alvo: xp, mostrado: xp, ganho: 0, comemorando: false });
      setSubiu(null);
      mostrar(xp, { visivel: false, ganho: 0 });
      return;
    }
    r.ganho += xp - r.alvo;
    r.alvo = xp;
    loja.set({ visivel: true, ganho: r.ganho });
    if (!r.comemorando) passo();
  }, [xp, r, loja, mostrar, parar, passo]);
  useEffect(() => parar, [parar]);

  const fecharNivel = useCallback(() => {
    setSubiu(null);
    if (!r.comemorando) return;
    r.comemorando = false;
    // Depois da festa a barra recomeça do zero, já no nível novo, e enche até o que sobrou.
    r.mostrado = Math.floor(r.alvo / XPL) * XPL;
    mostrar(r.mostrado);
    passo();
  }, [r, mostrar, passo]);

  return { loja, subiu, fecharNivel };
}

const useFoto = loja => useSyncExternalStore(loja.subscribe, loja.get);
const Barra = ({ v, ...resto }) => <div className={`bar viva${v.cheia ? ' cheia' : ''}`} {...resto}><div style={{ width: (v.dentro / XPL) * 100 + '%' }} /></div>;

/** Caixa de nível da barra lateral (telas largas). */
export function XpLateral({ loja, descobertas }) {
  const v = useFoto(loja);
  return (
    <div className="xpbox">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <span className="display" style={{ fontWeight: 600, fontSize: 15 }}>Nível {v.nivel}</span>
        <span className="mono" style={{ fontSize: 11, color: 'var(--muted)' }}>{v.dentro}/{XPL} XP</span>
      </div>
      <Barra v={v} />
      <div style={{ fontSize: 12, color: 'var(--muted)' }}>{descobertas} de {substances.length} substâncias</div>
    </div>
  );
}

/** Nível no topo da tela (celular). */
export function XpTopo({ loja, descobertas }) {
  const v = useFoto(loja);
  return (
    <div className="lvl">
      <span className="display" style={{ fontWeight: 600, color: 'var(--fg)' }}>Nível {v.nivel}</span>
      <Barra v={v} aria-label={`${v.dentro} de ${XPL} XP`} />
      <span className="mono">{descobertas}/{substances.length}</span>
    </div>
  );
}

/** Cartão que aparece por cima de tudo enquanto o XP sobe. */
export function GanhoXP({ loja }) {
  const v = useFoto(loja);
  return (
    <div className={`ganho-xp${v.visivel ? ' visivel' : ''}${v.cheia ? ' cheia' : ''}`} aria-hidden="true">
      <div className="ganho-linha">
        <span className="display ganho-nivel">Nível {v.nivel}</span>
        {v.ganho > 0 && <span className="ganho-mais mono" key={v.ganho}>+{v.ganho} XP</span>}
      </div>
      <Barra v={v} />
      <div className="ganho-linha mono ganho-conta">
        <span>{v.cheia ? 'Nível completo!' : `Faltam ${XPL - v.dentro} XP para o nível ${v.nivel + 1}`}</span>
        <span>{v.dentro}/{XPL}</span>
      </div>
    </div>
  );
}
