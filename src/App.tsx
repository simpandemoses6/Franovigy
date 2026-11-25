import { Route, Routes, useLocation } from "react-router-dom";
import { MotionConfig, motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import ScrollProgress from "./components/ScrollProgress";
import Preloader from "./components/Preloader";
import Home from "./pages/Home";
import About from "./pages/About";
import Agriculture from "./pages/Agriculture";
import Digital from "./pages/Digital";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Client from "./pages/Clients"
import NotFound from "./pages/NotFound";

export default function App() {
  const location = useLocation();
  return (
    <MotionConfig reducedMotion="user">
      <Preloader />
      <ScrollToTop />
      <ScrollProgress />
      <Navbar />
      <motion.main
        key={location.pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/digital" element={<Digital />} />
            <Route path="/agriculture" element={<Agriculture />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/clients" element={<Client />}/>
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.main>
      <Footer />
    </MotionConfig>
  );
}
