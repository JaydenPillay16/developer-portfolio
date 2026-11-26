import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function installBlueprintReveal(section: HTMLElement) {
  const media = gsap.matchMedia(section);
  media.add("(prefers-reduced-motion: no-preference)", () => {
    section.dataset.blueprint = "";
    const find = gsap.utils.selector(section);
    const hero = find(".home-hero")[0] as HTMLElement;
    const nav = document.querySelector<HTMLElement>("[data-site-nav]");
    const cover = find(".blueprint-cover")[0] as HTMLElement;
    const stage = find(".hero-stage")[0] as HTMLElement;

    const syncControls = (progress: number) => {
      hero.inert = progress < 0.8;
      cover.inert = progress >= 0.8;
    };

    const sequence = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: section, start: "top top",
        end: () => "+=" + (section.offsetHeight - stage.offsetHeight),
        scrub: true, invalidateOnRefresh: true,
        onUpdate: self => syncControls(self.progress),
        onRefresh: self => syncControls(self.progress),
      },
    });
    sequence
      .fromTo(".blueprint-glint", { xPercent: -55, opacity: 0 }, { xPercent: 45, opacity: 1, duration: 0.12 }, 0)
      .fromTo(".blueprint-rule", { scaleX: 0 }, { scaleX: 1, duration: 0.29 }, 0.08)
      .fromTo(".blueprint-sheet", { rotationX: 85, scaleY: 0.04, opacity: 0 },
        { rotationX: 0, scaleY: 1, opacity: 1, duration: 0.42, ease: "sine.inOut" }, 0.21)
      .to(".blueprint-enter", { opacity: 0, duration: 0.24 }, 0.22)
      .to(".blueprint-glint, .blueprint-rule", { opacity: 0, duration: 0.22 }, 0.4)
      .to(cover, { autoAlpha: 0, ease: "sine.inOut", duration: 0.39 }, 0.48)
      .fromTo(".home-hero-photo", { y: 14 }, { y: 0, duration: 0.36 }, 0.49)
      .fromTo(".home-hero-halo-light", { scale: 0.92, opacity: 0.3 }, { scale: 1, opacity: 1, duration: 0.37 }, 0.5)
      .to({}, { duration: 0.13 }, 0.87);
    if (nav) sequence.fromTo(nav, { autoAlpha: 0, y: -5 }, { autoAlpha: 1, y: 0, duration: 0.18 }, 0.69);
    sequence.scrollTrigger?.refresh();
    syncControls(sequence.progress());

    return () => {
      delete section.dataset.blueprint;
      hero.inert = false;
      cover.inert = false;
    };
  });
  return () => media.revert();
}
