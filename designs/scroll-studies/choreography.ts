import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export type Study = "lightfold" | "signal" | "index";

export function installStudy(scroller: HTMLElement, study: Study, update: (progress: number) => void) {
  const media = gsap.matchMedia(scroller);

  media.add("(prefers-reduced-motion: no-preference)", () => {
    const find = gsap.utils.selector(scroller);
    const from = find(".story-from");
    const to = find(".story-to");
    const reveal = find(".story-arrival");
    const timeline = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        scroller,
        trigger: scroller.querySelector<HTMLElement>(".story-track")!,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.15,
        onUpdate: ({ progress }) => update(progress),
        onRefresh: ({ progress }) => update(progress),
      },
    });

    if (study === "lightfold") {
      const fold = find(".lightfold-plane");
      const crease = find(".lightfold-crease");
      timeline
        .addLabel("fold", 0.12)
        .fromTo(fold, { yPercent: 26, rotationX: 59, scale: 0.88, opacity: 0 },
          { yPercent: -2, rotationX: 0, scale: 1, opacity: 0.9, duration: 0.37, ease: "sine.out" }, "fold")
        .to(find(".lightfold-portrait"), { scale: 0.94, xPercent: 6, yPercent: -7, ease: "sine.inOut", duration: 0.62 }, 0)
        .to(from, { yPercent: -17, duration: 0.62 }, 0.17)
        .fromTo(to, { yPercent: 100 }, { yPercent: 0, duration: 0.72, ease: "power2.inOut" }, 0.19)
        .fromTo(crease, { scaleX: 0.12, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 0.49 }, 0.30)
        .to(crease, { opacity: 0, duration: 0.2 }, 0.75)
        .fromTo(reveal, { y: 22, opacity: 0.55 }, { y: 0, opacity: 1, duration: 0.31, ease: "power2.out" }, 0.69);
    } else if (study === "signal") {
      const lenses = find(".signal-node");
      const routes = find(".signal-route");
      const packet = find(".signal-packet");
      timeline
        .addLabel("route", 0.14)
        .fromTo(routes, { scaleX: 0, opacity: 0.15 }, { scaleX: 1, opacity: 0.9, duration: 0.32, stagger: 0.045 }, "route")
        .fromTo(lenses, { scale: 0.92, opacity: 0.78 }, { scale: 1, opacity: 1, duration: 0.29, stagger: 0.07 }, "route")
        .fromTo(packet, { xPercent: -95, opacity: 0 }, { xPercent: 0, opacity: 1, duration: 0.3 }, 0.26)
        .to(packet, { opacity: 0, duration: 0.14 }, 0.53)
        .fromTo(to, { yPercent: 107, opacity: 0.8 }, { yPercent: 0, opacity: 1, duration: 0.46, ease: "power3.inOut" }, 0.52)
        .to(from, { scale: 0.965, yPercent: -10, duration: 0.48 }, 0.50)
        .fromTo(reveal, { y: 17, opacity: 0.6 }, { y: 0, opacity: 1, duration: 0.2, ease: "power2.out" }, 0.80);
    } else {
      const plates = find(".index-plate");
      timeline
        .addLabel("pivot", 0.11)
        .fromTo(to, { scale: 0.96 }, { scale: 1, duration: 0.8, ease: "sine.out" }, "pivot")
        .to(find(".index-heading"), { y: -38, opacity: 0, duration: 0.28 }, "pivot")
        .to(plates, { rotationY: -50, rotationX: 14, xPercent: -30, scale: 0.86, duration: 0.36, stagger: 0.055, ease: "sine.inOut" }, "pivot")
        .to(plates, { rotationY: -86, xPercent: -80, opacity: 0, duration: 0.26, stagger: 0.05 }, 0.46)
        .to(find(".index-cover"), { opacity: 0, duration: 0.35 }, 0.24)
        .to(from, { autoAlpha: 0, duration: 0.12 }, 0.79)
        .fromTo(find(".index-timeline-rule"), { scaleY: 0 }, { scaleY: 1, duration: 0.38 }, 0.51)
        .fromTo(reveal, { x: 18, opacity: 0.52 }, { x: 0, opacity: 1, duration: 0.27, stagger: 0.05, ease: "power2.out" }, 0.63);
    }
  });

  return () => media.revert();
}
