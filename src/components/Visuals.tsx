import type { CSSProperties } from "react";

/* Animated artwork used until you add real photos.
   Creative = print/design, Technology = code/web, Agriculture = land, Construction = building. */

const codeLines = [
  'import { Business } from "growth";',
  "const site = build(Business);",
  "site.launch(); // live",
];

export function CreativeVisual() {
  return (
      <svg
          className="visual visual-creative"
          viewBox="0 0 400 400"
          preserveAspectRatio="xMidYMid slice"
          role="img"
          aria-label="Animated graphic design and printing illustration"
      >
        <defs>
          <pattern id="cv-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M20 0H0V20" fill="none" stroke="#ffffff" strokeOpacity="0.06" />
          </pattern>
        </defs>
        <rect width="400" height="400" fill="#101010" />
        <rect width="400" height="400" fill="url(#cv-grid)" />

        <g style={{ mixBlendMode: "screen" }}>
          <circle className="float-a" cx="150" cy="150" r="78" fill="#00aeef" opacity="0.85" />
          <circle className="float-b" cx="222" cy="150" r="78" fill="#ec008c" opacity="0.85" />
          <circle className="float-c" cx="186" cy="212" r="78" fill="#fff200" opacity="0.85" />
        </g>

        <g className="reg">
          <circle cx="342" cy="58" r="16" fill="none" stroke="#fff" strokeOpacity="0.7" />
          <path d="M342 30V86M314 58H370" stroke="#fff" strokeOpacity="0.7" />
        </g>

        <g className="card-float">
          <rect x="70" y="278" width="176" height="96" fill="#ffffff" />
          <rect x="70" y="278" width="7" height="96" fill="#d71920" />
          <text x="94" y="318" fontFamily="Nexa, sans-serif" fontWeight="700" fontSize="18" fill="#080808">
            CHIKUMBA
          </text>
          <text x="94" y="336" fontFamily="Nexa, sans-serif" fontSize="8" letterSpacing="3" fill="#666">
            ENTERPRISES
          </text>
          <rect x="94" y="350" width="60" height="3" fill="#d71920" />
        </g>

        {[
          ["#00aeef", 0],
          ["#ec008c", 0.15],
          ["#fff200", 0.3],
          ["#ffffff", 0.45],
          ["#d71920", 0.6],
        ].map(([c, d], i) => (
            <rect key={i} className="swatch" x={278 + i * 22} y="300" width="16" height="74" fill={c as string} style={{ animationDelay: `${d}s` }} />
        ))}
      </svg>
  );
}

export function TechVisual() {
  return (
      <div className="visual visual-tech" role="img" aria-label="Animated illustration of a website being coded">
        <div className="tv-bar">
          <i />
          <i />
          <i />
          <span>yourbusiness.co.zm</span>
        </div>
        <div className="tv-body">
          <div className="tv-code">
            {codeLines.map((l, i) => (
                <p key={l} className="typed" style={{ "--n": l.length, "--d": `${i * 1.2}s` } as CSSProperties}>
                  {l}
                </p>
            ))}
            <span className="tv-cursor" />
          </div>
          <div className="tv-ui">
            <div className="tv-hero">
              <b />
              <b />
            </div>
            <div className="tv-bars">
              {[55, 80, 40, 95, 65].map((h, i) => (
                  <i key={i} style={{ "--h": `${h}%`, "--d": `${i * 0.18}s` } as CSSProperties} />
              ))}
            </div>
            <div className="tv-btn" />
          </div>
        </div>
      </div>
  );
}

export function AgriVisual() {
  return (
      <svg className="visual visual-agri" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Animated farmland illustration">
        <rect width="400" height="400" fill="#101010" />
        <circle className="sun" cx="290" cy="120" r="46" fill="#d71920" />
        <path d="M0 300 Q100 230 200 280 T400 260 V400 H0Z" fill="#1c1c1c" />
        <path d="M0 345 Q120 295 240 335 T400 325 V400 H0Z" fill="#2a2a2a" />
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <line
                key={i}
                className="sprout"
                x1={40 + i * 54}
                y1="372"
                x2={40 + i * 54}
                y2="326"
                stroke="#ffffff"
                strokeWidth="3"
                strokeLinecap="round"
                style={{ animationDelay: `${i * 0.25}s` }}
            />
        ))}
      </svg>
  );
}

export function BuildVisual() {
  const bricks: { x: number; y: number; d: number }[] = [];
  for (let r = 0; r < 5; r++) {
    for (let c = 0; c < 4; c++) {
      bricks.push({ x: 50 + c * 64 + (r % 2) * 32, y: 340 - r * 36, d: (r * 4 + c) * 0.14 });
    }
  }
  return (
      <svg className="visual visual-build" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Animated building illustration">
        <rect width="400" height="400" fill="#101010" />
        <g stroke="#d71920" strokeWidth="4">
          <path d="M340 380V60M250 60H385" />
          <path className="hook" d="M280 60V120" strokeWidth="2" />
        </g>
        {bricks.map((b, i) => (
            <rect key={i} className="brick" x={b.x} y={b.y} width="60" height="32" fill={i % 5 === 0 ? "#d71920" : "#2b2b2b"} stroke="#3a3a3a" style={{ animationDelay: `${b.d}s` }} />
        ))}
      </svg>
  );
}

export function DivisionVisual({ slug }: { slug: string }) {
  switch (slug) {
    case "creative":
      return <CreativeVisual />;
    case "technology":
    case "digital":
      return <TechVisual />;
    case "agriculture":
      return <AgriVisual />;
    default:
      return <BuildVisual />;
  }
}