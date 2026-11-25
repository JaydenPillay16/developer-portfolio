import { useEffect, useRef } from "react";

export default function HeroHalo() {
  const haloRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const halo = haloRef.current;
    if (!halo || !("IntersectionObserver" in window)) return;

    const motion = window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)");
    let visible = false;
    let requested = false;
    let disposed = false;
    let stopSweep: (() => void) | undefined;

    const canPlay = () => motion.matches && visible && !document.hidden;

    const sync = () => {
      if (!canPlay()) {
        stopSweep?.();
        return;
      }
      if (requested || document.readyState !== "complete") return;

      requested = true;
      void import("./heroHaloScene")
        .then(({ playHaloSweep }) => {
          if (!disposed && canPlay()) stopSweep = playHaloSweep(halo);
        })
        .catch(() => {
          // The CSS halo works independently of WebGL.
        });
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting && entry.intersectionRatio >= 0.25;
      sync();
    }, { threshold: 0.25 });

    observer.observe(halo);
    motion.addEventListener("change", sync);
    window.addEventListener("load", sync);
    document.addEventListener("visibilitychange", sync);

    return () => {
      disposed = true;
      observer.disconnect();
      motion.removeEventListener("change", sync);
      window.removeEventListener("load", sync);
      document.removeEventListener("visibilitychange", sync);
      stopSweep?.();
    };
  }, []);

  return (
    <div ref={haloRef} aria-hidden="true" className="home-hero-halo" data-hero-halo>
      <div className="home-hero-halo-light" />
    </div>
  );
}
