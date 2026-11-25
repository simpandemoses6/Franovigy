import type { CSSProperties } from "react";

interface Props {
    className?: string;
    style?: CSSProperties;
    label?: boolean; // show the "Loading..." text (turn off for very small skeletons)
}

// A loading placeholder that clearly looks busy: faint grid, a light sweep, a red scan line,
// a pulsing picture icon, animated "Loading..." dots and a red progress bar along the bottom.
export default function Skeleton({ className = "", style, label = true }: Props) {
    return (
        <div className={`skeleton ${className}`} style={style} aria-hidden="true">
            <span className="sk-scan" />
            <svg className="sk-icon" viewBox="0 0 48 48" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="2.5">
                <rect x="5" y="9" width="38" height="30" rx="2" />
                <circle cx="17" cy="21" r="4" />
                <path d="M5 35l11-10 8 7 7-6 12 9" />
            </svg>
            {label && (
                <span className="sk-label">
          Loading<i>.</i><i>.</i><i>.</i>
        </span>
            )}
            <span className="sk-bar" />
        </div>
    );
}