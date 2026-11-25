import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { directors, divisions, navLinks } from "../data/siteData";
import { contactInfo } from "../data/contactData";

interface Item {
  label: string;
  hint: string;
  run: () => void;
}

export default function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [idx, setIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const items = useMemo<Item[]>(
    () => [
      ...navLinks.map((l) => ({ label: l.label, hint: "Page", run: () => navigate(l.path) })),
      ...divisions.map((d) => ({
        label: d.name,
        hint: "Services",
        run: () => navigate(d.path),
      })),
      ...divisions.flatMap((d) => d.services.map((s) => ({ label: s.name, hint: d.navLabel, run: () => navigate(d.path) }))),
      { label: "Contact Us", hint: "Page", run: () => navigate("/contact") },
      { label: "Send us an email", hint: "Action", run: () => (window.location.href = `mailto:${contactInfo.email}`) },
      {
        label: "Message us on WhatsApp",
        hint: "Action",
        run: () => window.open(`https://wa.me/${contactInfo.whatsapp}`, "_blank", "noreferrer"),
      },
      ...directors.map((d) => ({
        label: `Digital contact: ${d.fullName}`,
        hint: "HiHello",
        run: () => window.open(d.hiHelloUrl, "_blank", "noreferrer"),
      })),
    ],
    [navigate]
  );

  const term = q.trim().toLowerCase();
  const results = items.filter((i) => i.label.toLowerCase().includes(term) || i.hint.toLowerCase().includes(term));

  useEffect(() => {
    if (open) {
      setQ("");
      setIdx(0);
      const t = setTimeout(() => inputRef.current?.focus(), 60);
      return () => clearTimeout(t);
    }
  }, [open]);

  function choose(item?: Item) {
    if (!item) return;
    onClose();
    item.run();
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setIdx((i) => (results.length ? (i + 1) % results.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setIdx((i) => (results.length ? (i - 1 + results.length) % results.length : 0));
    } else if (e.key === "Enter") {
      choose(results[idx]);
    } else if (e.key === "Escape") {
      onClose();
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="cmd-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.div
            className="cmd"
            role="dialog"
            aria-modal="true"
            aria-label="Quick navigation"
            initial={{ opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="cmd-input">
              <span aria-hidden="true">&gt;</span>
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => {
                  setQ(e.target.value);
                  setIdx(0);
                }}
                onKeyDown={onKeyDown}
                placeholder="Go to a page, or type a service..."
                aria-label="Search the site"
              />
              <kbd>Esc</kbd>
            </div>
            <ul className="cmd-list">
              {results.length === 0 && <li className="cmd-empty">Nothing matches "{q}"</li>}
              {results.map((r, i) => (
                <li key={r.label}>
                  <button
                    className={i === idx ? "on" : ""}
                    onMouseEnter={() => setIdx(i)}
                    onClick={() => choose(r)}
                  >
                    <span>{r.label}</span>
                    <small>{r.hint}</small>
                  </button>
                </li>
              ))}
            </ul>
            <div className="cmd-foot">
              <span><kbd>↑</kbd> <kbd>↓</kbd> move</span>
              <span><kbd>Enter</kbd> open</span>
              <span className="cmd-status"><i /> Taking new projects</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
