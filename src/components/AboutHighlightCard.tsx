import { Lightbulb, Search, Puzzle, TrendingUp } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { useRef, type MouseEvent } from "react";

type AboutHighlightCardProps = {
  number: string;
  title: string;
  description: string;
  accent: string;
  index: number;
};

const cardDetails: Record<
  string,
  {
    category: string;
    supportingText: string;
    tags: string[];
    icon: LucideIcon;
  }
> = {
  "01": {
    category: "THINK DIFFERENTLY",
    supportingText: "Perspective creates possibility.",
    tags: ["Creative thinking", "New ideas"],
    icon: Lightbulb,
  },
  "02": {
    category: "ALWAYS LEARNING",
    supportingText: "Every question is an opportunity.",
    tags: ["Curiosity", "Discovery"],
    icon: Search,
  },
  "03": {
    category: "MAKE IT SOLVABLE",
    supportingText: "Clarity turns complexity into progress.",
    tags: ["Critical thinking", "Solutions"],
    icon: Puzzle,
  },
  "04": {
    category: "BUILT ON PROGRESS",
    supportingText: "Better every day, not perfect overnight.",
    tags: ["Adaptability", "Growth"],
    icon: TrendingUp,
  },
};

function AboutHighlightCard({
  number,
  title,
  description,
  accent,
  index,
}: AboutHighlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const details = cardDetails[number] ?? cardDetails["01"];
  const Icon = details.icon;

  const pointerX = useMotionValue(50);
  const pointerY = useMotionValue(50);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const smoothRotateX = useSpring(rotateX, {
    stiffness: 180,
    damping: 24,
  });

  const smoothRotateY = useSpring(rotateY, {
    stiffness: 180,
    damping: 24,
  });

  const glow = useMotionTemplate`radial-gradient(circle at ${pointerX}% ${pointerY}%, rgba(99, 102, 241, 0.20), transparent 60%)`;

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    if (shouldReduceMotion || !ref.current) return;

    const bounds = ref.current.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;

    const percentX = (x / bounds.width) * 100;
    const percentY = (y / bounds.height) * 100;

    pointerX.set(percentX);
    pointerY.set(percentY);

    rotateY.set(((percentX - 50) / 50) * 4);
    rotateX.set(((50 - percentY) / 50) * 4);
  }

  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
    pointerX.set(50);
    pointerY.set(50);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={
        shouldReduceMotion
          ? undefined
          : {
              rotateX: smoothRotateX,
              rotateY: smoothRotateY,
              transformPerspective: 900,
            }
      }
      initial={
        shouldReduceMotion
          ? false
          : {
              opacity: 0,
              y: 18,
            }
      }
      whileInView={
        shouldReduceMotion
          ? undefined
          : {
              opacity: 1,
              y: 0,
            }
      }
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.55,
        delay: shouldReduceMotion ? 0 : index * 0.07,
        ease: [0.22, 1, 1, 1],
      }}
      className="group relative h-full"
    >
      <div
        className={`relative isolate flex h-full min-h-[310px] flex-col overflow-hidden rounded-2xl border border-white/[0.10] bg-gradient-to-br from-slate-800/80 via-[#10172d]/95 to-[#080D1C] p-5 shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-[border-color,box-shadow,transform] duration-500 group-hover:-translate-y-1 group-hover:border-blue-400/30 group-hover:shadow-[0_20px_60px_rgba(59,130,246,0.12)] sm:min-h-[330px] sm:p-6 lg:p-7`}
      >
        {/* Accent wash */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 z-0 rounded-2xl bg-gradient-to-br ${accent} opacity-[0.07] transition-opacity duration-500 group-hover:opacity-[0.16]`}
        />

        {/* Inner glass surface */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-px z-0 rounded-[15px] bg-gradient-to-br from-[#11182d]/95 via-[#0d1428]/95 to-[#090e1e]/95"
        />

        {/* Ambient accent lighting */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute -right-12 -top-16 z-0 h-48 w-48 rounded-full bg-gradient-to-br ${accent} opacity-[0.10] blur-3xl transition-all duration-700 group-hover:scale-125 group-hover:opacity-25`}
        />

        {/* Decorative background icon */}
        <Icon
          aria-hidden="true"
          size={180}
          strokeWidth={0.65}
          className="pointer-events-none absolute -bottom-8 -right-7 z-0 h-36 w-36 rotate-[-12deg] text-white/[0.025] transition-all duration-700 group-hover:rotate-0 group-hover:scale-110 group-hover:text-white/[0.05] sm:h-44 sm:w-44"
        />

        {/* Cursor-following light */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: glow }}
        />

        {/* Top accent line */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-x-0 top-0 z-20 h-px bg-gradient-to-r ${accent} opacity-70 transition-opacity duration-300 group-hover:opacity-100`}
        />

        {/* Foreground content */}
        <div className="relative z-10 flex h-full flex-col">
          {/* Icon only — card numbering removed */}
          <div className="flex items-center">
            <motion.span
              className={`relative inline-flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-br ${accent} text-white shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:rounded-xl group-hover:shadow-xl`}
              whileHover={
                shouldReduceMotion ? undefined : { rotate: -4, y: -2 }
              }
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 18,
              }}
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent"
              />

              <Icon
                aria-hidden="true"
                size={23}
                strokeWidth={1.8}
                className="relative z-10"
              />

              {!shouldReduceMotion && (
                <motion.span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  whileHover={{ x: "200%" }}
                  transition={{
                    duration: 0.65,
                    ease: "easeInOut",
                  }}
                />
              )}
            </motion.span>
          </div>

          {/* Card content */}
          <p className="mt-7 text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-300/80">
            {details.category}
          </p>

          <h3 className="mt-2 text-xl font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-blue-100 sm:text-2xl">
            {title}
          </h3>

          <p className="mt-3 text-sm leading-7 text-slate-400 transition-colors duration-300 group-hover:text-slate-300 sm:text-base">
            {description}
          </p>

          {/* Supporting tags */}
          <div className="mt-5 flex flex-wrap gap-2">
            {details.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-slate-300 transition-all duration-300 group-hover:border-white/15 group-hover:bg-white/[0.07]"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Card footer — no arrow */}
          <div className="mt-auto border-t border-white/[0.08] pt-4 transition-colors duration-300 group-hover:border-white/[0.14]">
            <span className="text-xs leading-5 text-slate-500 transition-colors duration-300 group-hover:text-slate-300">
              {details.supportingText}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default AboutHighlightCard;
