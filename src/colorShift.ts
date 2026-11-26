import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** One scroll controller carries the color wash through the three story sections. */
export function installColorShift(main: HTMLElement) {
  const sections = ["skills", "projects", "experience"]
    .map((id) => document.getElementById(id))
    .filter((section): section is HTMLElement => section !== null);
  if (sections.length !== 3) return () => {};

  const washes = sections.map((section) => section.querySelector<HTMLElement>(".color-shift"));
  const rules = sections.map((section) => section.querySelector<HTMLElement>(".color-shift__rule"));
  if (washes.some((wash) => !wash) || rules.some((rule) => !rule)) return () => {};

  main.dataset.colorShift = "";
  let boundaries: number[] = [];
  const height = () => window.innerHeight;
  const setProgress = (scroll: number) => {
    boundaries.forEach((top, index) => {
      const start = top - height() * 0.96;
      const end = top - height() * 0.25;
      const progress = gsap.utils.clamp(0, 1, (scroll - start) / (end - start));
      const wash = washes[index];
      const rule = rules[index];
      if (!wash || !rule) return;
      const visibility = Math.min(progress * 3, (1 - progress) * 2.2, 1);
      gsap.set(wash, { scaleY: 0.18 + progress * 0.82, opacity: Math.max(0, visibility) });
      gsap.set(rule, { scaleX: progress, opacity: Math.max(0, visibility) });
    });
  };

  const trigger = ScrollTrigger.create({
    trigger: sections[0],
    start: "top bottom",
    endTrigger: sections[2],
    end: "top 25%",
    onRefresh: (self) => {
      const scroll = self.scroll();
      boundaries = sections.map((section) => section.getBoundingClientRect().top + scroll);
      setProgress(scroll);
    },
    onUpdate: (self) => setProgress(self.scroll()),
  });

  return () => {
    trigger.kill();
    delete main.dataset.colorShift;
    washes.forEach((wash) => wash && gsap.set(wash, { clearProps: "all" }));
    rules.forEach((rule) => rule && gsap.set(rule, { clearProps: "all" }));
  };
}
