import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import type { ServiceItem } from "../data/types";
import Reveal from "./Reveal";

const num = (i: number) => String(i + 1).padStart(2, "0");

/*
  Desktop (mouse): hovering or focusing a card slides up the service details.
  Phones/tablets (touch): tapping a card opens a bottom sheet you can swipe down
  to close, with arrows to move between services.
*/
export default function ServiceGrid({ services }: { services: ServiceItem[] }) {
  const [active, setActive] = useState<number | null>(null);
  const [touch, setTouch] = useState(() => typeof window !== "undefined" && window.matchMedia("(hover: none)").matches);

  useEffect(() => {
    const mq = window.matchMedia("(hover: none)");
    const onChange = () => setTouch(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (active === null) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  const idx = active ?? 0;
  const current = active === null ? null : services[active];
  const step = (d: number) => setActive((a) => (a === null ? null : (a + d + services.length) % services.length));
  const enquire = (s: ServiceItem) => `/contact?service=${encodeURIComponent(s.name)}`;

  return (
    <>
      <div className="svc-grid">
        {services.map((s, i) => (
          <Reveal key={s.name} delay={(i % 3) * 70}>
            <article
              className="svc"
              tabIndex={0}
              onClick={() => touch && setActive(i)}
              onKeyDown={(e) => {
                if (touch && (e.key === "Enter" || e.key === " ")) {
                  e.preventDefault();
                  setActive(i);
                }
              }}
            >
              <span className="svc-num">[{num(i)}]</span>
              <h3>{s.name}</h3>
              <p className="svc-tag">{s.tagline}</p>
              <span className="svc-hint">
                {touch ? "Tap for details" : "Hover for details"} <i>+</i>
              </span>

              <div className="svc-detail">
                <p>{s.description}</p>
                <ul>
                  {s.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
                <Link to={enquire(s)}>Enquire about this →</Link>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <AnimatePresence>
        {current && (
          <motion.div
            className="sheet-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              className="sheet"
              role="dialog"
              aria-modal="true"
              aria-label={current.name}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 32, stiffness: 300 }}
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0, bottom: 0.6 }}
              onDragEnd={(_, info) => {
                if (info.offset.y > 90) setActive(null);
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <span className="sheet-handle" />
              <p className="kicker">
                [{num(idx)}] / {String(services.length).padStart(2, "0")}
              </p>
              <h3>{current.name}</h3>
              <p className="sheet-desc">{current.description}</p>
              <ul>
                {current.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              <div className="sheet-actions">
                <Link to={enquire(current)} className="btn btn-red" onClick={() => setActive(null)}>
                  Enquire about this →
                </Link>
                <div className="sheet-nav">
                  <button onClick={() => step(-1)} aria-label="Previous service">←</button>
                  <button onClick={() => step(1)} aria-label="Next service">→</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
