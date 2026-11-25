import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { company } from "../data/siteData";
import Logo from "./Logo";

const KEY = "chikumba-intro";

// Short logo intro, shown once per browser session
export default function Preloader() {
  const [show, setShow] = useState(() => {
    try {
      return !sessionStorage.getItem(KEY);
    } catch {
      return true;
    }
  });

  useEffect(() => {
    if (!show) return;
    try {
      sessionStorage.setItem(KEY, "1");
    } catch {
      /* storage not available */
    }
    const t = setTimeout(() => setShow(false), 1700);
    return () => clearTimeout(t);
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="preloader"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.div
            className="preloader-inner"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Logo size="lg" />
            {!company.logoHasName && <p>{company.name}</p>}
            <motion.span
              className="preloader-line"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, ease: "easeInOut", delay: 0.2 }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
