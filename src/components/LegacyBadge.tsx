import { useState } from "react";
import { company } from "../data/siteData";

// Rotating circular ring of text with the logo (Logo-04) fixed in the centre.
// If the logo file is missing, the plain "LEGACY 1957" text is shown instead.
export default function LegacyBadge() {
  const [failed, setFailed] = useState(false);

  return (
      <div className="legacy-badge" aria-hidden="true">
        <svg viewBox="0 0 200 200">
          <defs>
            <path id="lb-circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
          </defs>
          <g className="lb-ring">
            <text>
              <textPath href="#lb-circle" textLength="482" lengthAdjust="spacing">
                LEGACY 1957 • CHIKUMBA ENTERPRISES • FAMILY OWNED •
              </textPath>
            </text>
          </g>
          {failed && (
              <>
                <text x="100" y="94" textAnchor="middle" className="lb-small">LEGACY</text>
                <text x="100" y="124" textAnchor="middle" className="lb-year">1957</text>
              </>
          )}
        </svg>
        {!failed && <img className="lb-logo" src={company.badgeLogo} alt="" onError={() => setFailed(true)} />}
      </div>
  );
}