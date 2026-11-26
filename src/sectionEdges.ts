import { gsap } from "gsap";

/** Called inside the page's reduced-motion matchMedia context. */
export function installSectionEdges(main: HTMLElement) {
  const edges = main.querySelectorAll<HTMLElement>(".section-edge");
  for (const edge of edges) {
    const section = edge.parentElement;
    if (!section) continue;
    const title = section.querySelector("h2");
    const leaves = edge.querySelectorAll("svg");
    edge.dataset.ready = "";

    const sequence = gsap.timeline({
      defaults: { ease: "sine.inOut" },
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "top 48%",
        scrub: true,
      },
    });

    switch (edge.dataset.edge) {
      case "arc":
        // The curved silhouette flattens to a cobalt hairline.
        sequence.to(leaves, { scaleY: 0.012, duration: 0.83 }, 0);
        break;
      case "split":
        sequence.to(leaves[0], { xPercent: -50, scaleY: 0.04, duration: 0.86 }, 0)
          .to(leaves[1], { xPercent: 50, scaleY: 0.04, duration: 0.86 }, 0);
        break;
      default:
        sequence.to(leaves, { rotationX: -86, scaleY: 0.12, duration: 0.86 }, 0);
    }

    sequence.to(edge, { autoAlpha: 0, duration: 0.19 }, 0.81);
    if (title) sequence.fromTo(title, { y: 18 }, { y: 0, duration: 0.7 }, 0.24);

    for (const page of section.querySelectorAll<HTMLElement>("[data-book-page]")) {
      sequence.fromTo(page, { rotationY: page.dataset.bookPage === "left" ? 48 : -48 },
        { rotationY: 0, duration: 0.7 }, 0.3);
    }

    if (section.id === "about") {
      const rule = section.querySelector("p > span[aria-hidden]");
      if (rule) sequence.fromTo(rule, { scaleX: 0, transformOrigin: "left" },
        { scaleX: 1, duration: 0.59 }, 0.41);
    }
  }
  return () => edges.forEach(edge => delete edge.dataset.ready);
}
