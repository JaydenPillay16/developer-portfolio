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
  icon: LucideIcon;
};

const cardDetails: Record<
  string,
  {
    category: string;
    supportingText: string;
    tags: string[];
    glow: string;
  }
> = {
  "01": {
    category: "THINK DIFFERENTLY",
    supportingText: "Perspective creates possibility.",
    tags: ["Creative thinking", "New ideas"],
    glow: "rgba(34, 211, 238, 0.18)",
  },
  "02": {
    category: "ALWAYS LEARNING",
    supportingText: "Every question is an opportunity.",
    tags: ["Curiosity", "Discovery"],
    glow: "rgba(167, 139, 250, 0.20)",
  },
  "03": {
    category: "MAKE IT SOLVABLE",
    supportingText: "Clarity turns complexity into progress.",
    tags: ["Critical thinking", "Solutions"],
    glow: "rgba(96, 165, 250, 0.18)",
  },
  "04": {
    category: "BUILT ON PROGRESS",
    supportingText: "Better every day, not perfect overnight.",
    tags: ["Adaptability", "Growth"],
    glow: "rgba(217, 70, 239, 0.17)",
  },
};

function AboutHighlightCard({
  number,
  title,
  description,
  accent,
  index,
  icon,
}: AboutHighlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const details = cardDetails[number] ?? cardDetails["01"];
  const Icon = icon;

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

  const glow = useMotionTemplate`radial-gradient(circle at ${pointerX}% ${pointerY}%, ${details.glow}, transparent 62%)`;

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    if (shouldReduceMotion || !ref.current) return;

    const bounds = ref.current.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;

    const percentX = (x / bounds.width) * 100;
    const percentY = (y / bounds.height) * 100;

    pointerX.set(percentX);
    pointerY.set(percentY);

    rotateY.set(((percentX - 50) / 50) * 2.5);
    rotateX.set(((50 - percentY) / 50) * 2.5);
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
        className={`relative isolate flex h-full min-h-[310px] flex-col overflow-hidden rounded-2xl border border-white/[0.10] bg-gradient-to-br from-slate-800/80 via-[#10172d]/95 to-[#080D1C] p-5 shadow-[0_12px_38px_rgba(0,0,0,0.2)] transition-[border-color,box-shadow,transform] duration-500 group-hover:-translate-y-1 group-hover:border-white/20 group-hover:shadow-[0_24px_65px_rgba(0,0,0,0.32)] sm:min-h-[330px] sm:p-6 lg:p-7`}
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

        {/* Quiet editorial number replaces the oversized watermark icon. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-2 -top-7 z-0 select-none font-mono text-[6.5rem] font-medium leading-none tracking-[-0.1em] text-white/[0.025] transition-colors duration-500 group-hover:text-white/[0.045] sm:-right-1 sm:-top-8 sm:text-[7.5rem]"
        >
          {number}
        </span>

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
          <div className="flex items-center justify-between">
            <motion.span
              className={`group/icon relative inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-[18px] border border-white/15 bg-gradient-to-br ${accent} text-white shadow-[0_10px_28px_rgba(0,0,0,0.24)] transition-[transform,border-radius,box-shadow] duration-300 group-hover:scale-[1.04] group-hover:rounded-2xl group-hover:shadow-[0_12px_32px_rgba(59,130,246,0.2)]`}
              whileHover={shouldReduceMotion ? undefined : { rotate: -3, y: -2 }}
              transition={{ type: "spring", stiffness: 280, damping: 20 }}
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -inset-1.5 rounded-[21px] border border-white/[0.08] transition-all duration-300 group-hover:border-white/[0.18] group-hover:shadow-[0_0_20px_rgba(103,232,249,0.10)]"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-[18px] bg-gradient-to-br from-white/30 via-transparent to-transparent"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-3 top-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent opacity-70"
              />
              <Icon
                aria-hidden="true"
                size={25}
                strokeWidth={1.8}
                className="relative z-10 drop-shadow-[0_2px_5px_rgba(0,0,0,0.25)] transition-transform duration-300 group-hover:scale-110"
              />
              {!shouldReduceMotion && (
                <motion.span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 overflow-hidden rounded-[18px]"
                >
                  <motion.span
                    className="absolute -inset-y-2 left-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/35 to-transparent"
                    initial={{ x: "-180%" }}
                    whileHover={{ x: "450%" }}
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                  />
                </motion.span>
              )}
            </motion.span>

            <span className="relative z-10 rounded-full border border-white/[0.08] bg-white/[0.025] px-3 py-1.5 font-mono text-[10px] tracking-[0.12em] text-slate-500 transition-colors duration-300 group-hover:border-white/[0.14] group-hover:text-slate-300">
              {number} <span className="text-slate-600">/</span> 04
            </span>
          </div>

          {/* Card content */}
          <p className={`mt-7 bg-gradient-to-r ${accent} bg-clip-text text-[10px] font-semibold uppercase tracking-[0.2em] text-transparent`}>
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

          {/* Card footer - no arrow */}
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
