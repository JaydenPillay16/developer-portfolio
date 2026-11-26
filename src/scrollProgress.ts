import { installSectionEdges } from "./sectionEdges";
import { installColorShift } from "./colorShift";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function installScrollProgress(main: HTMLElement, progress: HTMLElement) {
  const media = gsap.matchMedia(main);

  media.add("(prefers-reduced-motion: no-preference)", () => {
    gsap.to(progress, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: { start: 0, end: "max", scrub: true },
    });

    const about = main.querySelector("#about");
    const curtain = main.querySelector(".hero-gradient-reveal");
    if (about && curtain) {
      gsap.timeline({
        scrollTrigger: { trigger: about, start: "top 120%", end: "top 12%", scrub: true },
      })
        .fromTo(curtain,
          { y: "150%", scaleX: 0.54, visibility: "visible" },
          { y: "0%", scaleX: 1, duration: 0.55, ease: "sine.inOut" })
        .to(curtain, { y: "-115%", duration: 0.45, ease: "sine.inOut" });
    }

    const removeEdges = installSectionEdges(main);
    const removeColorShift = installColorShift(main);
    const routes = main.querySelectorAll<SVGPathElement>("[data-signal-route]");
    const map = routes[0]?.ownerSVGElement;
    if (map) {
      const draw = gsap.timeline({
        defaults: { strokeDasharray: "1 1", ease: "none" },
        scrollTrigger: { trigger: map, start: "top 85%", end: "bottom 58%", scrub: true },
      });
      // Draw the input, both branches, then the two delivery connections.
      routes.forEach((route, index) => draw.fromTo(route,
        { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1 },
        Math.ceil(index / 2),
      ));
    }

    const rail = main.querySelector<HTMLElement>("[data-career-rule]");
    if (rail) gsap.fromTo(rail, { scaleY: 0 }, {
      scaleY: 1, ease: "none",
      scrollTrigger: { trigger: rail.parentElement, start: "top 58%", end: "bottom 58%", scrub: true },
    });

    // The Skills accordion and other layout changes can change the scroll range.
    let frame = 0;
    const observer = new ResizeObserver(() => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        ScrollTrigger.refresh();
      });
    });
    observer.observe(main);

    return () => {
      removeEdges();
      removeColorShift();
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  });

  return () => media.revert();
}
