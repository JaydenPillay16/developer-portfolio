import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { installSectionHandoff } from "./sectionHandoffs";

gsap.registerPlugin(ScrollTrigger);

function installHeroHandoff(main: HTMLElement) {
  const halo = main.querySelector<HTMLElement>("[data-hero-halo]");
  const about = main.querySelector<HTMLElement>("#about");
  const rule = about?.querySelector<HTMLElement>("[data-about-rule]");
  const svg = main.querySelector<SVGSVGElement>("[data-hero-about-arc]");
  const path = svg?.querySelector("path");
  if (!halo || !about || !rule || !svg || !path) return;

  // Cubic control points relative to the halo, along its exposed right edge.
  const rim = [[0.82, 0.23], [1.00, 0.34], [1.01, 0.60], [0.84, 0.76]];
  const state = { progress: 0 };
  const clamp = gsap.utils.clamp(0, 1);
  const ease = gsap.parseEase("power1.inOut");
  let from = rim;
  let to = rim;

  const render = () => {
    const { progress } = state;
    const morph = ease(clamp((progress - 0.08) / 0.88));
    const lift = Math.sin(morph * Math.PI) * 60;
    const points = from.map(([x, y], index) => {
      const [targetX, targetY] = to[index];
      return `${gsap.utils.interpolate(x, targetX, morph)} ${gsap.utils.interpolate(y, targetY, morph) + lift}`;
    });

    path.setAttribute("d", `M ${points[0]} C ${points.slice(1).join(" ")}`);
    svg.style.visibility = progress < 1 ? "visible" : "hidden";
    svg.style.opacity = String(0.18 + 0.82 * ease(clamp(progress / 0.45)));
    rule.style.visibility = progress < 1 ? "hidden" : "visible";
    halo.style.opacity = String(1 - ease(clamp(progress * 1.15)));
  };

  const measure = () => {
    const origin = svg.getBoundingClientRect();
    const glow = halo.getBoundingClientRect();
    const target = rule.getBoundingClientRect();
    const y = target.top - origin.top + target.height / 2;
    from = rim.map(([x, y]) => [glow.left - origin.left + glow.width * x, glow.top - origin.top + glow.height * y]);
    to = [0, 0.33, 0.67, 1].map((x) => [target.left - origin.left + target.width * x, y]);
    render();
  };

  gsap.to(state, {
    progress: 1,
    ease: "none",
    onUpdate: render,
    scrollTrigger: {
      trigger: about,
      start: "clamp(top 94%)",
      endTrigger: rule,
      end: "top 18%",
      scrub: 0.2,
      onRefresh: measure,
    },
  });

  return () => {
    svg.style.removeProperty("visibility");
    svg.style.removeProperty("opacity");
    path.removeAttribute("d");
    rule.style.removeProperty("visibility");
    halo.style.removeProperty("opacity");
  };
}

export function installScrollMotion(main: HTMLElement, progress: HTMLElement) {
  const media = gsap.matchMedia(main);

  media.add(
    {
      motionAllowed: "(prefers-reduced-motion: no-preference)",
      desktop: "(min-width: 1024px)",
    },
    ({ conditions }) => {
      if (!conditions?.motionAllowed) return;
      const removeHandoff = conditions.desktop ? installHeroHandoff(main) : undefined;
      const removeSectionHandoffs: (() => void)[] = [];

      gsap.to(progress, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { start: 0, end: "max", scrub: true },
      });

      for (const section of main.querySelectorAll<HTMLElement>(":scope > section")) {
        const remove = installSectionHandoff(section);
        if (remove) removeSectionHandoffs.push(remove);

        const reveal = section.querySelectorAll("[data-scroll-reveal]");
        for (const element of reveal) {
          gsap.from(element, {
            y: 18,
            opacity: 0.65,
            duration: 0.65,
            ease: "power3.out",
            scrollTrigger: { trigger: element, start: "top 88%", once: true },
          });
        }

        const career = section.querySelector("[data-scroll-career]");
        const careerLine = career?.querySelector("[data-scroll-career-line]");
        if (career && careerLine) {
          gsap.fromTo(careerLine, { scaleY: 0 }, {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: career,
              start: "top 72%",
              end: "bottom 72%",
              scrub: 0.3,
            },
          });
        }

        const map = section.querySelector("[data-scroll-system-map]");
        if (map) {
          const routes = map.querySelectorAll("[data-scroll-signal]");
          const junction = map.querySelector("[data-scroll-junction]");
          gsap.set(routes, { attr: { "stroke-dasharray": 1, "stroke-dashoffset": 1 } });
          const trace = gsap.timeline({
            scrollTrigger: {
              trigger: map,
              start: "top 92%",
              end: "bottom 52%",
              scrub: 0.35,
            },
          });

          trace.to(routes, {
            attr: { "stroke-dashoffset": 0 },
            duration: 0.55,
            stagger: 0.16,
            ease: "none",
          });
          if (junction) {
            trace.fromTo(junction, { opacity: 0.25 }, { opacity: 1, duration: 0.18 }, 0.42);
          }
        }

        const book = section.querySelector("[data-scroll-book]");
        if (book) {
          const pages = book.querySelectorAll<HTMLElement>("[data-scroll-page]");
          const rules = book.querySelectorAll("[data-scroll-page-rule]");
          gsap.set(rules, { scaleX: 0 });
          const opening = gsap.timeline({
            scrollTrigger: {
              trigger: book,
              start: "top 94%",
              end: "bottom 58%",
              scrub: 0.4,
            },
          });

          opening.fromTo(pages, {
            rotationY: (_index: number, page: HTMLElement) =>
              page.dataset.scrollPage === "left" ? 55 : -55,
            opacity: 0.45,
          }, { rotationY: 0, opacity: 1, duration: 0.8, ease: "power2.out" });

          opening.to(rules, {
            scaleX: 1,
            duration: 0.42,
            stagger: 0.05,
            ease: "power2.out",
          }, 0.3);
        }
      }

      let frame = 0;
      let active = true;
      const scheduleRefresh = () => {
        if (!active || frame) return;
        frame = requestAnimationFrame(() => {
          frame = 0;
          ScrollTrigger.refresh();
        });
      };

      const resizeObserver = new ResizeObserver(scheduleRefresh);
      resizeObserver.observe(main);
      void document.fonts.ready.then(scheduleRefresh);

      return () => {
        active = false;
        removeHandoff?.();
        removeSectionHandoffs.forEach((remove) => remove());
        resizeObserver.disconnect();
        cancelAnimationFrame(frame);
      };
    },
  );

  return () => media.revert();
}
