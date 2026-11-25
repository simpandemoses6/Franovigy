import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Rotator({ words }: { words: string[] }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % words.length), 2200);
    return () => clearInterval(t);
  }, [words.length]);

  return (
    <span className="rotator" aria-live="off">
      <AnimatePresence mode="wait">
        <motion.span
          key={words[i]}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
