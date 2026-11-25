import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { gallery } from "../data/galleryData";
import type { GalleryCategory, GalleryItem } from "../data/types";
import { DivisionVisual } from "./Visuals";
import LoadedImage from "./LoadedImage";
import Skeleton from "./Skeleton";

const slugFor: Record<GalleryCategory, string> = {
  "Web Development": "technology",
  Digital: "technology",
  "Design, Print & Paste": "creative",
  Agriculture: "agriculture",
};

interface Props {
  categories?: GalleryCategory[]; // limit to some categories
  limit?: number; // show only the first N (mixed across categories)
  filter?: boolean; // show the filter chips
}

// Mix the categories so a short preview shows a bit of everything
function interleave(items: GalleryItem[]): GalleryItem[] {
  const groups = new Map<GalleryCategory, GalleryItem[]>();
  items.forEach((g) => groups.set(g.category, [...(groups.get(g.category) ?? []), g]));
  const lists = Array.from(groups.values());
  const out: GalleryItem[] = [];
  for (let i = 0; out.length < items.length; i++) {
    lists.forEach((l) => {
      if (l[i]) out.push(l[i]);
    });
  }
  return out;
}

// Skeleton shapes cycle through these so the loading wall looks like a real gallery
const ratios = ["4 / 5", "1 / 1", "4 / 3", "3 / 4"];

// "2024/01/10" -> "10 Jan 2024"
function formatDate(raw: string): string {
  const m = raw.match(/^(\d{4})[/-](\d{1,2})[/-](\d{1,2})$/);
  if (!m) return raw;
  return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3])).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// second caption line: category and date
const metaLine = (g: GalleryItem) => [g.category, g.date ? formatDate(g.date) : null].filter(Boolean).join(" · ");

const keyOf = (g: GalleryItem) => g.video ?? g.full ?? g.src;

export default function GalleryGrid({ categories, limit, filter = false }: Props) {
  const all = gallery.filter((g) => !categories || categories.includes(g.category));
  const available = Array.from(new Set(all.map((g) => g.category)));
  const [cat, setCat] = useState<"All" | GalleryCategory>("All");
  const [failed, setFailed] = useState<Set<string>>(new Set());
  const [open, setOpen] = useState<number | null>(null);
  const [readyFor, setReadyFor] = useState<string | null>(null);

  const filtered = all.filter((g) => cat === "All" || g.category === cat);
  const list = limit ? interleave(filtered).slice(0, limit) : filtered;

  useEffect(() => {
    if (open === null) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((o) => (o === null ? null : (o + 1) % list.length));
      if (e.key === "ArrowLeft") setOpen((o) => (o === null ? null : (o - 1 + list.length) % list.length));
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, list.length]);

  const markFailed = (key: string) => setFailed((prev) => new Set(prev).add(key));
  const shown = open === null ? null : list[open];
  const shownKey = shown ? keyOf(shown) : "";
  const ready = readyFor === shownKey;

  return (
      <>
        {filter && available.length > 1 && (
            <div className="filters" role="tablist">
              {(["All", ...available] as const).map((f) => (
                  <button key={f} role="tab" aria-selected={cat === f} className={cat === f ? "on" : ""} onClick={() => setCat(f)}>
                    {f}
                  </button>
              ))}
            </div>
        )}

        <motion.div key={cat} className="gallery" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
          {list.map((g, i) => {
            const key = keyOf(g);
            const bad = failed.has(key);
            return (
                <button
                    key={key}
                    className="tile"
                    onClick={() => !bad && setOpen(i)}
                    aria-label={bad ? `${g.category} placeholder` : `Open ${g.project ?? g.category} ${g.video ? "video" : "image"} ${i + 1}`}
                >
                  {bad ? (
                      <div className="tile-ph">
                        <DivisionVisual slug={slugFor[g.category]} />
                      </div>
                  ) : (
                      <LoadedImage
                          src={g.src}
                          alt={g.alt ?? `${g.project ?? g.category} ${i + 1}`}
                          className="tile-img"
                          ratio={ratios[i % ratios.length]}
                          onFail={() => markFailed(key)}
                      />
                  )}
                  {g.video && !bad && (
                      <span className="tile-play" aria-hidden="true">
                  ▶
                </span>
                  )}
                  <span className="tile-cap">
                {g.project && <strong>{g.project}</strong>}
                    <small>{metaLine(g)}</small>
              </span>
                </button>
            );
          })}
        </motion.div>

        <AnimatePresence>
          {shown && open !== null && (
              <motion.div className="lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(null)}>
                <button className="lb-close" onClick={() => setOpen(null)} aria-label="Close">✕</button>
                <button
                    className="lb-arrow lb-prev"
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpen((open - 1 + list.length) % list.length);
                    }}
                    aria-label="Previous"
                >
                  ←
                </button>

                <div className="lb-stage" onClick={(e) => e.stopPropagation()}>
                  {!ready && <Skeleton className="lb-skel" />}
                  {shown.video ? (
                      <video
                          key={shownKey}
                          src={shown.video}
                          poster={shown.src}
                          controls
                          autoPlay
                          playsInline
                          onLoadedData={() => setReadyFor(shownKey)}
                      />
                  ) : (
                      <img
                          key={shownKey}
                          className={ready ? "on" : ""}
                          src={shown.full ?? shown.src}
                          alt={shown.alt ?? shown.project ?? `${shown.category} project`}
                          onLoad={() => setReadyFor(shownKey)}
                          onError={() => setReadyFor(shownKey)}
                      />
                  )}
                </div>

                <button
                    className="lb-arrow lb-next"
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpen((open + 1) % list.length);
                    }}
                    aria-label="Next"
                >
                  →
                </button>

                <span className="lb-caption">
              {shown.project && <strong>{shown.project}</strong>}
                  <small>{metaLine(shown)}</small>
            </span>
                <span className="lb-count">
              {String(open + 1).padStart(2, "0")} / {String(list.length).padStart(2, "0")}
            </span>
              </motion.div>
          )}
        </AnimatePresence>
      </>
  );
}