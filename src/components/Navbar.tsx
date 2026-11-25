import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { company, navLinks } from "../data/siteData";
import { contactInfo } from "../data/contactData";
import CommandPalette from "./CommandPalette";
import Logo from "./Logo";

const num = (i: number) => String(i + 1).padStart(2, "0");

export default function Navbar() {
  const { pathname } = useLocation();
  const [menu, setMenu] = useState(false);
  const [palette, setPalette] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isMac = typeof navigator !== "undefined" && /Mac/i.test(navigator.userAgent);
  const { scrollY } = useScroll();

  // Hide when scrolling down, show when scrolling up
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 160);
    setScrolled(y > 20);
  });

  useEffect(() => setMenu(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menu]);

  // Ctrl/Cmd + K opens quick navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPalette((p) => !p);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const mobileLinks = [...navLinks, { label: "Contact Us", path: "/contact" }];

  return (
    <>
      <motion.header
        className="tnav"
        animate={{ y: hidden ? "-130%" : 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <div className={`tnav-bar ${scrolled ? "scrolled" : ""}`}>
          <Link to="/" className="brand" aria-label={`${company.name} home`}>
            <Logo size="lg" />
            {!company.logoHasName && (
              <span className="brand-text">
                <strong>{company.shortName}</strong>
                <small>{company.suffix}</small>
              </span>
            )}
          </Link>

          <nav className="tnav-links" aria-label="Main">
            {navLinks.map((l) => (
              <NavLink key={l.path} to={l.path} end={l.path === "/"}>
                {({ isActive }) => (
                  <>
                    {isActive && <motion.span layoutId="nav-pill" className="tnav-pill" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
                    <span className="tnav-label">{l.label}</span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="tnav-right">
            <button className="tnav-search" onClick={() => setPalette(true)} aria-label="Open quick navigation">
              <span className="tnav-search-text">Search</span>
              <kbd>{isMac ? "⌘K" : "Ctrl K"}</kbd>
            </button>
            <Link to="/contact" className="btn btn-red tnav-cta">
              Contact Us →
            </Link>
            <button className={`tnav-burger ${menu ? "open" : ""}`} onClick={() => setMenu((m) => !m)} aria-label="Toggle menu" aria-expanded={menu}>
              <span />
              <span />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menu && (
          <motion.div
            className="tmenu"
            initial={{ clipPath: "circle(0% at 92% 4%)" }}
            animate={{ clipPath: "circle(150% at 92% 4%)" }}
            exit={{ clipPath: "circle(0% at 92% 4%)" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="tmenu-logo">
              <Logo size="md" />
            </div>
            <button className="tmenu-close" onClick={() => setMenu(false)} aria-label="Close menu">
              ✕
            </button>
            <nav className="tmenu-links">
              {mobileLinks.map((l, i) => (
                <motion.div
                  key={l.path}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 + i * 0.07, duration: 0.4 }}
                >
                  <NavLink to={l.path} end={l.path === "/"}>
                    <small>{num(i)}</small>
                    {l.label}
                  </NavLink>
                </motion.div>
              ))}
            </nav>
            <div className="tmenu-foot">
              <p className="tmenu-status"><i /> Taking new projects</p>
              <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <CommandPalette open={palette} onClose={() => setPalette(false)} />
    </>
  );
}
