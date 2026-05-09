/** Centralised icon set so service icons stay consistent across pages. */
const paths = {
  paint: (
    <path d="M19 7V5a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h11a2 2 0 0 1 2 2v2M14 17v3a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1Z" />
  ),
  wrench: (
    <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2.4-.6-.6-2.4 2.6-2.6Z" />
  ),
  bolt: <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />,
  hammer: (
    <path d="M14 4l6 6-2 2-2-2-9 9-3-3 9-9-2-2 3-1Z" />
  ),
  home: (
    <path d="M3 11 12 3l9 8v9a2 2 0 0 1-2 2h-4v-7H10v7H6a2 2 0 0 1-2-2Z" />
  ),
  shield: (
    <path d="M12 3 4 6v6c0 5 3.5 9 8 9s8-4 8-9V6Z" />
  ),
  // ----- estimator-only icons -----
  tile: (
    <g>
      <rect x="3"  y="3"  width="8" height="8" rx="1" />
      <rect x="13" y="3"  width="8" height="8" rx="1" />
      <rect x="3"  y="13" width="8" height="8" rx="1" />
      <rect x="13" y="13" width="8" height="8" rx="1" />
    </g>
  ),
  ceiling: (
    <g>
      <path d="M3 6h18" />
      <path d="M3 6l3 4M9 6l3 4M15 6l3 4M21 6l-3 4" />
      <path d="M3 18h18" />
    </g>
  ),
  bulb: (
    <g>
      <path d="M9 18h6" />
      <path d="M10 21h4" />
      <path d="M12 3a6 6 0 0 0-4 10c1 1 1.5 2 1.5 3h5c0-1 .5-2 1.5-3a6 6 0 0 0-4-10Z" />
    </g>
  ),
};

export default function ServiceIcon({ name = 'home', className = 'h-7 w-7' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths[name] ?? paths.home}
    </svg>
  );
}
