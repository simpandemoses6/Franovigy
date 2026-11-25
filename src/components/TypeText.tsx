import { useEffect, useState } from "react";

interface Props {
  text: string;
  speed?: number; // ms per letter
  pause?: number; // ms to hold the full text before typing again
}

// Types the text out letter by letter, holds, then repeats.
// The full text is rendered invisibly underneath, so the button never changes width while typing.
export default function TypeText({ text, speed = 70, pause = 2200 }: Props) {
  const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const [n, setN] = useState(reduce ? text.length : 0);

  useEffect(() => {
    if (reduce) return;
    const done = n >= text.length;
    const t = setTimeout(() => setN(done ? 0 : n + 1), done ? pause : speed);
    return () => clearTimeout(t);
  }, [n, text, speed, pause, reduce]);

  return (
    <span className="typed-text" aria-hidden="true">
      <span className="typed-ghost">{text}</span>
      <span className="typed-live">
        {text.slice(0, n)}
        {!reduce && <i className="caret" />}
      </span>
    </span>
  );
}
