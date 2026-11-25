import { useEffect, useRef, useState } from "react";
import type { WebProject } from "../data/webProjectsData";
import { formatDate } from "../utils/formatDate";

const DESKTOP_W = 1280; // the page is drawn this wide, then scaled down to fit the card
const MOBILE_W = 390;

const media = (q: string) => typeof window !== "undefined" && window.matchMedia(q).matches;

const hostOf = (url: string) => {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
};

// A browser-style window showing a live website. Visitors can scroll and click inside it
// (if the website allows being embedded), or switch between a desktop and a phone view.
export default function WebPreview({ project }: { project: WebProject }) {
  const cardRef = useRef<HTMLElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false); // only start loading the site when the card is close to the screen
  const [loaded, setLoaded] = useState(false);
  const [slow, setSlow] = useState(false);
  // phones start in the phone view: a full desktop page would be shrunk too small to read
  const [mode, setMode] = useState<"desktop" | "mobile">(() => (media("(max-width: 640px)") ? "mobile" : "desktop"));
  // on touch screens a live site would "trap" the visitor's scrolling, so it needs a tap to switch on
  const [touch] = useState(() => media("(hover: none)"));
  const [active, setActive] = useState(() => !media("(hover: none)"));
  const [box, setBox] = useState({ w: 0, h: 0 });
  const [nonce, setNonce] = useState(0);

  const live = project.embed !== false;
  const host = hostOf(project.url);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setNear(true);
            io.disconnect();
          }
        },
        { rootMargin: "300px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const el = screenRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setBox({ w: entry.contentRect.width, h: entry.contentRect.height }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // if the site has not finished loading after 9 seconds, point the visitor to the real site
  useEffect(() => {
    if (!live || !near || loaded) return;
    const t = setTimeout(() => setSlow(true), 9000);
    return () => clearTimeout(t);
  }, [live, near, loaded, nonce]);

  const viewW = mode === "desktop" ? DESKTOP_W : MOBILE_W;
  const scale = box.w ? (mode === "desktop" ? box.w / viewW : Math.min(1, (box.w - 24) / viewW)) : 1;
  const left = mode === "mobile" ? (box.w - viewW * scale) / 2 : 0;

  function reload() {
    setLoaded(false);
    setSlow(false);
    setNonce((n) => n + 1);
  }

  return (
      <article ref={cardRef} className="wp">
        {/* browser bar */}
        <div className="wp-bar">
          <span className="wp-dots" aria-hidden="true"><i /><i /><i /></span>
          <span className="wp-url">
          <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <rect x="3" y="7" width="10" height="7" rx="1" />
            <path d="M5 7V5a3 3 0 016 0v2" />
          </svg>
            {host}
        </span>
          <span className="wp-tools">
          {live && (
              <>
                <button type="button" onClick={reload} aria-label="Reload preview" title="Reload">↻</button>
                <button type="button" className={mode === "desktop" ? "on" : ""} onClick={() => setMode("desktop")} aria-label="Desktop view" title="Desktop view">
                  <svg viewBox="0 0 20 20" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="3" width="16" height="11" rx="1" /><path d="M7 17h6M10 14v3" /></svg>
                </button>
                <button type="button" className={mode === "mobile" ? "on" : ""} onClick={() => setMode("mobile")} aria-label="Phone view" title="Phone view">
                  <svg viewBox="0 0 20 20" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="6" y="2" width="8" height="16" rx="1.5" /><path d="M9 15h2" /></svg>
                </button>
              </>
          )}
            <a href={project.url} target="_blank" rel="noreferrer" aria-label={`Open ${project.name} in a new tab`} title="Open in a new tab">↗</a>
        </span>
        </div>

        {/* screen */}
        <div ref={screenRef} className={`wp-screen ${mode}`}>
          {live ? (
              near &&
              box.w > 0 && (
                  <iframe
                      key={nonce}
                      src={project.url}
                      title={`${project.name} live preview`}
                      loading="lazy"
                      sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
                      referrerPolicy="strict-origin-when-cross-origin"
                      onLoad={() => setLoaded(true)}
                      style={{ width: viewW, height: box.h / scale, left, transform: `scale(${scale})` }}
                  />
              )
          ) : project.screenshot ? (
              <img className="wp-shot" src={project.screenshot} alt={`${project.name} screenshot`} loading="lazy" />
          ) : (
              <div className="wp-empty">{host}</div>
          )}

          {live && touch && !active && (
              <button type="button" className="wp-tap" onClick={() => setActive(true)} aria-label={`Tap to interact with the ${project.name} preview`}>
                <span>Tap to interact</span>
              </button>
          )}
          {live && touch && active && (
              <button type="button" className="wp-done" onClick={() => setActive(false)}>
                Done
              </button>
          )}

          {live && !loaded && (
              <div className="wp-loading" role="status">
                <span className="wp-spin" aria-hidden="true" />
                <span>Loading live preview<b className="wp-dotsanim"><i>.</i><i>.</i><i>.</i></b></span>
                <span className="wp-progress" aria-hidden="true" />
              </div>
          )}

          {live && slow && !loaded && (
              <a className="wp-note" href={project.url} target="_blank" rel="noreferrer">
                Taking a while. Some sites block previews. Open the site ↗
              </a>
          )}
        </div>

        {/* details */}
        <div className="wp-info">
          <h3>{project.name}</h3>
          {project.description && <p>{project.description}</p>}
          {(project.tags?.length || project.date) && (
              <div className="wp-meta">
                {project.tags?.map((t) => (
                    <span key={t}>{t}</span>
                ))}
                {project.date && <em>{formatDate(project.date)}</em>}
              </div>
          )}
          <a className="wp-visit" href={project.url} target="_blank" rel="noreferrer">
            Visit live site <i>→</i>
          </a>
          {live && <small className="wp-hint">Preview blank? The site may block embedding. Use the visit link.</small>}
        </div>
      </article>
  );
}