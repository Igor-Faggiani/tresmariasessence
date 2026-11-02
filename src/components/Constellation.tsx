/** As três estrelas da marca, ligadas por pontos. Puramente decorativo. */
export function Constellation({ className = "" }: { className?: string }) {
  const star = (x: number, y: number, r: number) => (
    <g transform={`translate(${x} ${y})`} stroke="currentColor" strokeWidth="1" strokeLinecap="round">
      <line x1={-r} y1="0" x2={r} y2="0" />
      <line x1="0" y1={-r} x2="0" y2={r} />
      <line x1={-r * 0.6} y1={-r * 0.6} x2={r * 0.6} y2={r * 0.6} />
      <line x1={-r * 0.6} y1={r * 0.6} x2={r * 0.6} y2={-r * 0.6} />
    </g>
  );
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true" fill="currentColor">
      {[0.2, 0.35, 0.5, 0.65, 0.8].map((t) => (
        <circle key={`a${t}`} cx={15 + (50 - 15) * t} cy={85 + (55 - 85) * t} r="0.9" />
      ))}
      {[0.2, 0.35, 0.5, 0.65, 0.8].map((t) => (
        <circle key={`b${t}`} cx={50 + (82 - 50) * t} cy={55 + (15 - 55) * t} r="0.9" />
      ))}
      {star(15, 85, 6)}
      {star(50, 55, 7)}
      {star(82, 15, 9)}
    </svg>
  );
}
