// Sequência de comemoração de uma descoberta nova, em tela cheia:
// 1) Revelacao: "Uau! Você acaba de descobrir…"  2) XpTela: a barra de nível enchendo
// 3) (se completar o nível) a tela LevelUp. Também traz as barras de nível fixas da interface.
import { useEffect, useRef, useState } from 'react';
import { XP_PER_LEVEL as XPL } from '../game/logic.js';
import { substances } from '../data/nucleo.js';
import { Particulas } from './LevelUp.jsx';

const semMovimento = () => typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
export const nivelDe = xp => Math.floor(xp / XPL) + 1;

/**
 * Tela "Uau!" da primeira vez que algo é descoberto, com título e frase do grupo da descoberta.
 * @param d       fórmula ou símbolo em destaque
 * @param partes  [{ sym, cor }] — átomos ou partículas que formam a descoberta (giram em volta)
 */
export function Revelacao({ d, nome, titulo, texto, foto, tom, partes, xp, n, total, repetida, onContinuar }) {
  const reduzido = semMovimento();
  const btn = useRef(null);
  const [pronto, setPronto] = useState(reduzido);
  useEffect(() => {
    btn.current?.focus({ preventScroll: true });
    navigator.vibrate?.([30, 40, 30]);
    // Evita pular a revelação sem querer com um toque que já vinha do botão Fundir.
    const t = setTimeout(() => setPronto(true), 900);
    return () => clearTimeout(t);
  }, []);
  const seguir = () => { if (pronto) onContinuar(); };
  // Até 12 bolinhas na órbita, distribuídas em volta do círculo.
  const orbita = partes.flatMap(p => Array.from({ length: p.qtd || 1 }, () => p)).slice(0, 12);

  return (
    <div className="rev-wrap" style={{ '--tom': tom }} onClick={seguir} role="dialog" aria-modal="true" aria-label={`Nova descoberta: ${nome}`}>
      <div className="rev-flash" aria-hidden="true" />
      <div className="nivel-raios rev-raios" aria-hidden="true" />
      {!reduzido && <Particulas cores={[tom, 'oklch(0.9 0.08 195)', '#fff', 'oklch(0.85 0.14 90)']} cy={0.36} />}
      <div className="rev-centro">
        <div className="rev-selo mono">{repetida ? '✦ Já está na coleção ✦' : '✦ Nova descoberta ✦'}</div>
        <h2 className="rev-titulo display">{titulo}</h2>
        <p className="rev-frase">{texto}</p>
        <div className="rev-orbe" aria-hidden="true">
          <span className="rev-halo" />
          {foto
            ? <img className="rev-foto" src={foto} alt="" decoding="async" />
            : <span className="rev-nucleo display">{d}</span>}
          <span className="rev-orbita">
            {orbita.map((p, i) => (
              <span key={i} className="rev-atomo display" style={{ '--a': `${(360 / orbita.length) * i}deg`, '--c': p.cor }}><span>{p.sym}</span></span>
            ))}
          </span>
        </div>
        <div className="rev-formula display">{d}</div>
        <div className="rev-nome display">{nome}</div>
        <div className="rev-info">
          {!repetida && <span className="rev-xp mono">+{xp} XP</span>}
          <span className="rev-conta">{repetida ? `Você já descobriu esta antes · ${n} de ${total} na coleção` : `${n} de ${total} na sua coleção`}</span>
        </div>
        <button ref={btn} className="btn btn-primary rev-btn" onClick={e => { e.stopPropagation(); seguir(); }}>Continuar</button>
      </div>
    </div>
  );
}

/**
 * Barra de nível em tela cheia: enche de `de` até `ate`. Se passar do fim do nível, para cheia,
 * comemora "Nível completo!" e avisa com onFim(true) para a tela de subida de nível entrar em seguida.
 */
export function XpTela({ de, ate, onFim }) {
  const reduzido = semMovimento();
  const nivel = nivelDe(de), limite = nivel * XPL, fim = Math.min(ate, limite), subiu = ate >= limite;
  const [v, setV] = useState({ x: de, ganho: 0, fase: 'entra' });
  const r = useRef({ pular: null }).current;
  const fimRef = useRef(onFim); fimRef.current = onFim;

  useEffect(() => {
    const ganhoTotal = ate - de;
    const dura = reduzido ? 0 : 900 + 1300 * (fim - de) / XPL;
    let raf, t1, t2, t3, ini = null, acabou = false;
    const sair = () => { if (acabou) return; acabou = true; clearTimeout(t2); clearTimeout(t3); if (subiu) fimRef.current(true); else { setV(s => ({ ...s, fase: 'sai' })); t3 = setTimeout(() => fimRef.current(false), 380); } };
    const cheio = () => {
      cancelAnimationFrame(raf); clearTimeout(t1);
      setV({ x: fim, ganho: ganhoTotal, fase: subiu ? 'cheia' : 'pronto' });
      navigator.vibrate?.(subiu ? [15, 30, 15, 30, 40] : 15);
      t2 = setTimeout(sair, subiu ? 1300 : 1200);
      r.pular = sair;
    };
    const quadro = agora => {
      if (ini == null) ini = agora;
      const k = dura ? Math.min(1, (agora - ini) / dura) : 1, e = 1 - (1 - k) ** 3;
      if (k >= 1) return cheio();
      setV({ x: de + (fim - de) * e, ganho: Math.round(ganhoTotal * e), fase: 'enche' });
      raf = requestAnimationFrame(quadro);
    };
    r.pular = cheio;
    t1 = setTimeout(() => { raf = requestAnimationFrame(quadro); }, reduzido ? 0 : 450);
    return () => { cancelAnimationFrame(raf); clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [de, ate, fim, subiu, reduzido, r]);

  useEffect(() => {
    const k = e => { if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') { e.preventDefault(); r.pular?.(); } };
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [r]);

  const dentro = Math.round(v.x - (nivel - 1) * XPL), pct = (v.x - (nivel - 1) * XPL) / XPL * 100;
  const cheia = v.fase === 'cheia';
  return (
    <div className={`xpt-wrap ${v.fase}`} onClick={() => r.pular?.()} role="status" aria-live="polite">
      {cheia && !reduzido && <Particulas cores={['oklch(0.82 0.13 195)', '#fff', 'oklch(0.85 0.14 90)']} cy={0.5} dura={1500} />}
      <div className="xpt-centro">
        <div className="eyebrow xpt-rotulo">Experiência</div>
        <div className="xpt-ganho display">+{v.ganho} <small>XP</small></div>
        <div className="xpt-trilha">
          <span className="xpt-nivel display">{nivel}</span>
          <div className="xpt-bar">
            <div className="xpt-enchimento" style={{ width: pct + '%' }} />
            <span className="xpt-ponta" style={{ left: `max(12px, ${pct}%)` }} />
            {cheia && <span className="xpt-onda" />}
          </div>
          <span className={`xpt-nivel prox display${cheia ? ' aceso' : ''}`}>{nivel + 1}</span>
        </div>
        <div className="xpt-legenda">
          {cheia
            ? <b className="display xpt-completo">Nível completo!</b>
            : <span>{v.fase === 'pronto' ? `Faltam ${XPL - dentro} XP para o nível ${nivel + 1}` : `Nível ${nivel}`}</span>}
          <span className="mono">{dentro}/{XPL} XP</span>
        </div>
      </div>
      <div className="nivel-toque xpt-toque">Toque para {v.fase === 'enche' ? 'pular' : 'continuar'}</div>
    </div>
  );
}

const Barra = ({ xp, ...resto }) => <div className="bar" {...resto}><div style={{ width: ((xp % XPL) / XPL) * 100 + '%' }} /></div>;

/** Caixa de nível da barra lateral (telas largas). */
export function XpLateral({ xp, descobertas }) {
  return (
    <div className="xpbox">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <span className="display" style={{ fontWeight: 600, fontSize: 15 }}>Nível {nivelDe(xp)}</span>
        <span className="mono" style={{ fontSize: 11, color: 'var(--muted)' }}>{xp % XPL}/{XPL} XP</span>
      </div>
      <Barra xp={xp} />
      <div style={{ fontSize: 12, color: 'var(--muted)' }}>{descobertas} de {substances.length} substâncias</div>
    </div>
  );
}

/** Nível no topo da tela (celular). */
export function XpTopo({ xp, descobertas }) {
  return (
    <div className="lvl">
      <span className="display" style={{ fontWeight: 600, color: 'var(--fg)' }}>Nível {nivelDe(xp)}</span>
      <Barra xp={xp} aria-label={`${xp % XPL} de ${XPL} XP`} />
      <span className="mono">{descobertas}/{substances.length}</span>
    </div>
  );
}
