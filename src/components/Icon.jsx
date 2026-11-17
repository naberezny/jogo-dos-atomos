// Ícones de traço, em SVG, que herdam a cor do texto.
const P = {
  home: <><path d="M3 11.5 12 4l9 7.5" /><path d="M5.5 10v9.5h13V10" /><path d="M10 19.5v-5h4v5" /></>,
  lab: <><path d="M9.5 3.5h5" /><path d="M10.5 3.5v6L5 18.2a1.6 1.6 0 0 0 1.4 2.3h11.2a1.6 1.6 0 0 0 1.4-2.3L13.5 9.5v-6" /><path d="M7.6 15h8.8" /></>,
  coll: <><rect x="3.5" y="3.5" width="7" height="7" rx="1.5" /><rect x="13.5" y="3.5" width="7" height="7" rx="1.5" /><rect x="3.5" y="13.5" width="7" height="7" rx="1.5" /><rect x="13.5" y="13.5" width="7" height="7" rx="1.5" /></>,
  sub: <><circle cx="12" cy="12" r="1.8" fill="currentColor" stroke="none" /><ellipse cx="12" cy="12" rx="9.5" ry="3.8" /><ellipse cx="12" cy="12" rx="9.5" ry="3.8" transform="rotate(60 12 12)" /><ellipse cx="12" cy="12" rx="9.5" ry="3.8" transform="rotate(120 12 12)" /></>,
  estudos: <><path d="M12 6.5C10 5 7 4.5 3.5 5v13c3.5-.5 6.500 0 8.500 1.500" /><path d="M12 6.500c2-1.500 5-2 8.500-1.500v13c-3.500-.5-6.500 0-8.500 1.500" /><path d="M12 6.500V20" /></>,
  missions: <><circle cx="12" cy="12" r="8.500" /><circle cx="12" cy="12" r="4.500" /><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" /></>,
  profile: <><circle cx="12" cy="8.500" r="4" /><path d="M4.500 20c1-3.800 4-5.500 7.500-5.500s6.500 1.700 7.500 5.500" /></>,
  back: <><path d="M19 12H5" /><path d="m11 6-6 6 6 6" /></>,
  seta: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
};

export default function Icon({ name, size = 22 }) {
  return (
    <svg className="icone" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      {P[name]}
    </svg>
  );
}
