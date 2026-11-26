import Navbar from "./components/Navbar";
import { useEffect, useRef } from "react";
import { MotionConfig } from "motion/react";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Experience from "./sections/Experience";
import Skills from "./sections/Technologies";
import Projects from "./sections/Projects";
import Education from "./sections/Education";
import Certifications from "./sections/Certifications";
import Contact from "./sections/Contact";
import BackToTop from "./components/BackToTop";
import CursorHalo from "./components/CursorHalo";

function App() {
  const mainRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const main = mainRef.current;
    const progress = progressRef.current;
    if (!main || !progress) return;

    let disposed = false;
    let cleanup: (() => void) | undefined;
    const initialAnchor = window.location.hash.slice(1);
    const anchorFrame = requestAnimationFrame(() => {
      // The browser can try to jump before React has mounted the target.
      if (!initialAnchor || window.scrollY !== 0) return;
      document.getElementById(initialAnchor)?.scrollIntoView({ behavior: "instant" });
    });

    void import("./scrollProgress")
      .then(({ installScrollProgress }) => {
        if (!disposed) cleanup = installScrollProgress(main, progress);
      })
      .catch((error: unknown) => {
        console.error("Unable to initialize scroll progress", error);
      });

    return () => {
      disposed = true;
      cancelAnimationFrame(anchorFrame);
      cleanup?.();
    };
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#080b20] text-white">
        <a
          href="#main-content"
          className="fixed left-4 top-3 z-[60] -translate-y-20 rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-lg transition-transform focus:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
        >
          Skip to content
        </a>
        <Navbar />
        <span
          ref={progressRef}
          aria-hidden="true"
          className="pointer-events-none fixed inset-x-0 top-0 z-[55] h-0.5 origin-left bg-[#6299ff]"
          style={{ transform: "scaleX(0)" }}
        />
        <CursorHalo />
        <BackToTop />

        <main ref={mainRef} id="main-content" tabIndex={-1} className="relative">
          <div className="hero-gradient-reveal" aria-hidden="true" />
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Education />
          <Certifications />
          <Contact />
        </main>
      </div>
    </MotionConfig>
  );
}

export default App;
