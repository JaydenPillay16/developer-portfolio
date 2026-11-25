import { gsap } from "gsap";

const splitSections = new Set(["skills", "experience", "education", "certifications", "contact"]);
const pixelOffsets = [
  2, 0, 3, 1, 4, 2, 1, 3, 0, 2, 4, 1, 3, 2, 0, 3,
  1, 4, 2, 0, 3, 1, 2, 4, 1, 0, 2, 4, 3, 0, 2, 1,
];

function createLayer(section: HTMLElement, effect: string) {
  const layer = document.createElement("div");
  layer.className = `section-handoff section-handoff--${effect}`;
  layer.setAttribute("aria-hidden", "true");
  section.prepend(layer);
  return layer;
}

function addPiece(layer: HTMLElement) {
  const piece = document.createElement("div");
  layer.append(piece);
  return piece;
}

function installHorizon(layer: HTMLElement, timeline: gsap.core.Timeline) {
  const rim = addPiece(layer);

  // The dark surface retreats up the curved edge as About comes into view.
  timeline
    .fromTo(rim, { scaleY: 1 }, { scaleY: 0, duration: 1, ease: "power2.inOut" }, 0)
    .to(layer, { opacity: 0, duration: 0.45, ease: "power1.in" }, 0.55);
}

function installSplit(layer: HTMLElement, timeline: gsap.core.Timeline) {
  const panels = [addPiece(layer), addPiece(layer)];

  // The two halves meet edge to edge, then settle into the incoming surface.
  timeline
    .fromTo(panels, { xPercent: (index) => index === 0 ? -102 : 102 }, {
      xPercent: 0,
      duration: 0.66,
      ease: "power2.out",
    }, 0)
    .to(layer, { scaleY: 0, opacity: 0, duration: 0.44, ease: "power2.inOut" }, 0.56);
}

function installPixels(layer: HTMLElement, timeline: gsap.core.Timeline) {
  const columns = pixelOffsets.map((offset, index) => {
    const column = addPiece(layer);
    column.style.setProperty("--pixel-height", String(1 + offset));
    if (index % 3 === 1 || index % 5 === 2) column.classList.add("section-handoff__pixel-accent");
    return column;
  });

  timeline
    .fromTo(columns, { scaleY: 0 }, {
      scaleY: 1,
      duration: 0.46,
      ease: "steps(4)",
      stagger: (index) => pixelOffsets[index] * 0.035,
    }, 0)
    .to(columns, {
      scaleY: 0,
      duration: 0.38,
      ease: "steps(4)",
      stagger: (index) => pixelOffsets[index] * 0.025,
    }, 0.52)
    .to(layer, { opacity: 0, duration: 0.2, ease: "none" }, 0.8);
}

export function installSectionHandoff(section: HTMLElement) {
  const effect = section.id === "about" ? "horizon" : section.id === "projects" ? "pixels" : "split";
  if (effect === "split" && !splitSections.has(section.id)) return;

  const layer = createLayer(section, effect);
  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: effect === "horizon" ? "clamp(top bottom)" : "clamp(top 96%)",
      // Finish before anchor navigation lands at the section's 96px offset.
      end: () => `top ${Math.max(114, window.innerHeight * 0.25)}px`,
      scrub: true,
    },
  });

  if (effect === "horizon") installHorizon(layer, timeline);
  else if (effect === "pixels") installPixels(layer, timeline);
  else installSplit(layer, timeline);

  return () => layer.remove();
}
