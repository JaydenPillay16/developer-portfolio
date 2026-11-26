import { gsap } from "gsap";
import type { OrbitScene } from "./orbit";

export type Design = "aperture" | "orbit" | "blueprint";

export function createReveal(stage: HTMLElement, design: Design, returning: boolean, orbit?: OrbitScene) {
  const select = gsap.utils.selector(stage);
  const rows = select(".study-rows span");
  const lines = select(".study-title b");
  const portrait = select(".study-portrait img");
  const halo = select(".home-hero-halo-light");
  const primary = select(".study-hero .study-actions");
  const body = select(".study-intro");
  const beams = select(".aperture-rays i");
  const grid = select(".blueprint-grid");
  const brackets = select(".blueprint-brackets i");
  const orbitLayer = select(".study-orbit");
  const dot = select(".study-dot");
  const timeline = gsap.timeline({ paused: true });

  if (returning) {
    timeline
      .fromTo(rows, { xPercent: -105, visibility: "visible" }, { xPercent: 0, duration: 0.43, stagger: 0.035, ease: "power3.inOut" }, 0)
      .set(select(".study-previous"), { visibility: "hidden" }, 0.82)
      .to(rows, { xPercent: 105, duration: 0.48, stagger: 0.035, ease: "power3.inOut" }, 0.90);
  }

  const start = returning ? 0.90 : 0;
  timeline.addLabel("reveal", start);

  if (design === "aperture") {
    timeline
      .fromTo(portrait, { x: 22, scale: 1.035, opacity: 0.62 }, { x: 0, scale: 1, opacity: 1, duration: 0.88, ease: "power3.out" }, "reveal")
      .fromTo(halo, { scaleX: 0.035, scaleY: 0.90, opacity: 0.28 }, { scaleX: 1, scaleY: 1, opacity: 1, duration: 0.82, ease: "expo.out" }, "reveal")
      .fromTo(beams, { x: 0, scaleY: 0.12, opacity: 0 }, { x: (i) => i === 0 ? -106 : 106, scaleY: 1, opacity: 0.82, duration: 0.40, ease: "power2.out" }, "reveal")
      .to(beams, { x: (i) => i === 0 ? -246 : 246, opacity: 0, duration: 0.45, ease: "power2.out" }, "reveal+=0.32")
      .fromTo(lines, { yPercent: 100 }, { yPercent: 0, duration: 0.57, stagger: 0.08, ease: "power4.out" }, "reveal+=0.10");
  } else if (design === "orbit") {
    const sweep = { progress: 0 };
    timeline
      .fromTo(halo, { scale: 0.78, opacity: 0.46 }, { scale: 1, opacity: 1, duration: 0.88, ease: "power3.out" }, "reveal")
      .fromTo(portrait, { scale: 1.025, opacity: 0.65 }, { scale: 1, opacity: 1, duration: 0.69, ease: "power2.out" }, "reveal+=0.14")
      .fromTo(lines, { yPercent: 24, opacity: 0.54 }, { yPercent: 0, opacity: 1, duration: 0.55, stagger: 0.06, ease: "power3.out" }, "reveal+=0.12")
      .fromTo(orbitLayer, { opacity: 0, rotation: -18, scale: 0.88 }, { opacity: 1, rotation: 0, scale: 1, duration: 0.28 }, "reveal")
      .to(sweep, { progress: 1, duration: 1.08, ease: "none", onUpdate: () => orbit?.render(sweep.progress) }, "reveal")
      .to(orbitLayer, { opacity: 0, duration: 0.4, ease: "sine.in" }, "reveal+=0.72");
  } else {
    timeline
      .fromTo(grid, { scale: 0.87, rotationX: 22, opacity: 0 }, { scale: 1, rotationX: 0, opacity: 0.85, duration: 0.46, ease: "power3.out" }, "reveal")
      .fromTo(brackets, { scale: 1.5, opacity: 0 }, { scale: 1, opacity: 0.9, duration: 0.47, stagger: 0.035, ease: "expo.out" }, "reveal+=0.08")
      .fromTo(portrait, { y: 20, opacity: 0.60 }, { y: 0, opacity: 1, duration: 0.65, ease: "power3.out" }, "reveal+=0.23")
      .fromTo(halo, { scale: 0.86, opacity: 0.5 }, { scale: 1, opacity: 1, duration: 0.68, ease: "power3.out" }, "reveal+=0.19")
      .fromTo(lines, { x: -24, yPercent: 56, opacity: 0.25 }, { x: 0, yPercent: 0, opacity: 1, duration: 0.54, stagger: 0.085, ease: "power3.out" }, "reveal+=0.15")
      .to([grid, ...brackets], { opacity: 0, duration: 0.48, ease: "sine.inOut" }, "reveal+=0.57");
  }

  timeline
    .fromTo(dot, { scale: 0.74, opacity: 0.4 }, { scale: 1, opacity: 1, duration: 0.25, ease: "power2.out" }, "reveal+=0.36")
    .fromTo(body, { y: 12, opacity: 0.55 }, { y: 0, opacity: 1, duration: 0.42, ease: "power3.out" }, "reveal+=0.28")
    .fromTo(primary, { y: 7, opacity: 0.84 }, { y: 0, opacity: 1, duration: 0.40, ease: "power3.out" }, "reveal+=0.38");

  return timeline;
}
