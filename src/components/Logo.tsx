import { useState, type SyntheticEvent } from "react";
import { company } from "../data/siteData";

type Size = "sm" | "md" | "lg";

// In development only: warn in the browser console if a logo file is too small to look sharp on high-resolution screens.
function checkSharpness(e: SyntheticEvent<HTMLImageElement>) {
  if (!import.meta.env.DEV) return;
  const img = e.currentTarget;
  const wanted = Math.round(img.clientHeight * 3);
  if (img.naturalHeight && img.naturalHeight < wanted) {
    console.warn(
        `[logo] ${img.getAttribute("src")} is ${img.naturalWidth}x${img.naturalHeight}px but shown ${img.clientHeight}px tall. ` +
        `Use a file at least ${wanted}px tall (or an SVG) for a sharp result.`
    );
  }
}

export default function Logo({ size = "sm" }: { size?: Size }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <span className="brand-dot" aria-hidden="true" />;
  return (
      <img
          src={company.logo}
          alt={`${company.shortName} logo`}
          className={`logo-img logo-${size} logo-${company.logoStyle}`}
          decoding="async"
          onLoad={checkSharpness}
          onError={() => setFailed(true)}
      />
  );
}

// Large faint silhouette used behind hero sections. tone "ink" for light backgrounds, "white" for dark ones.
export function LogoWatermark({ tone = "ink" }: { tone?: "ink" | "white" }) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  return <img src={company.logo} alt="" aria-hidden="true" className={`watermark watermark-${tone}`} decoding="async" onError={() => setFailed(true)} />;
}