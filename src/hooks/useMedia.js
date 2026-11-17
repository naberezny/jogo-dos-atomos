import { useEffect, useState } from 'react';

/** true enquanto a media query casar (ex.: '(max-width: 640px)'). */
export default function useMedia(q) {
  const [on, setOn] = useState(() => window.matchMedia(q).matches);
  useEffect(() => {
    const m = window.matchMedia(q), f = () => setOn(m.matches);
    f();
    m.addEventListener('change', f);
    return () => m.removeEventListener('change', f);
  }, [q]);
  return on;
}
