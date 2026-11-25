import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { testimonials } from "../data/testimonialsData";

export default function Testimonials() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = testimonials.length;

  useEffect(() => {
    if (paused || count < 2) return;
    const t = setInterval(() => setI((x) => (x + 1) % count), 7000);
    return () => clearInterval(t);
  }, [paused, count]);

  if (count === 0) return null;
  const t = testimonials[i];

  return (
    <section className="section section-soft testi">
      <div className="container">
        <p className="kicker">Testimonials</p>
        <h2 className="display-md">What our clients say.</h2>
        <div className="testi-box" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <span className="testi-mark" aria-hidden="true">"</span>
          <AnimatePresence mode="wait">
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4 }}
            >
              <blockquote>{t.quote}</blockquote>
              <figcaption>
                <strong>{t.name}</strong>
                <span>{t.role}</span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
          {count > 1 && (
            <div className="testi-controls">
              <div className="dots">
                {testimonials.map((_, n) => (
                  <button key={n} className={n === i ? "on" : ""} onClick={() => setI(n)} aria-label={`Show testimonial ${n + 1}`} />
                ))}
              </div>
              <div className="sheet-nav">
                <button onClick={() => setI((i - 1 + count) % count)} aria-label="Previous">←</button>
                <button onClick={() => setI((i + 1) % count)} aria-label="Next">→</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
