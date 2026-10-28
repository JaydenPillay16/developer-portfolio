import { motion, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { useInView } from "motion/react";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  highlight?: string;
  description: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  highlight,
  description,
}: SectionHeadingProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.35,
  });

  const reduceMotionPreference = useReducedMotion();
  const reduceMotion = reduceMotionPreference ?? false;

  const entrance = {
    hidden: {
      opacity: 0,
      y: 24,
      filter: "blur(8px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
    },
  };

  return (
    <div
      ref={ref}
      className="relative mx-auto mb-16 max-w-5xl text-center sm:mb-20"
    >
      {/* Eyebrow */}
      <motion.p
        variants={entrance}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{
          duration: reduceMotion ? 0 : 0.6,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="mb-6 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300 sm:text-sm"
      >
        {eyebrow}
      </motion.p>

      {/* Heading */}
      <motion.h2
        variants={entrance}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{
          duration: reduceMotion ? 0 : 0.8,
          delay: reduceMotion ? 0 : 0.1,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="text-4xl font-bold leading-[1.12] tracking-[-0.045em] text-white sm:text-5xl md:text-6xl lg:text-7xl"
      >
        <span className="bg-gradient-to-r from-[#fff0c2] via-[#f7f5e9] to-[#a9e8ff] bg-clip-text text-transparent">
          {title}
        </span>

        {highlight && (
          <>
            {" "}
            <span className="relative inline-block">
              <motion.span
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        backgroundPosition: [
                          "0% 50%",
                          "100% 50%",
                          "0% 50%",
                        ],
                      }
                }
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-[length:200%_auto] bg-clip-text text-transparent"
              >
                {highlight}
              </motion.span>
            </span>
          </>
        )}
      </motion.h2>

      {/* Animated divider */}
      <div className="relative mx-auto mt-8 flex h-1 w-44 items-center justify-center overflow-hidden">
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={
            isInView
              ? { scaleX: 1, opacity: 1 }
              : { scaleX: 0, opacity: 0 }
          }
          transition={{
            duration: reduceMotion ? 0 : 0.9,
            delay: reduceMotion ? 0 : 0.3,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="h-[3px] w-full origin-center rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500"
        />
      </div>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={
          isInView
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: 16 }
        }
        transition={{
          duration: reduceMotion ? 0 : 0.7,
          delay: reduceMotion ? 0 : 0.4,
          ease: "easeOut",
        }}
        className="mx-auto mt-7 max-w-4xl text-base leading-7 text-slate-400 sm:text-lg sm:leading-8"
      >
        {description}
      </motion.p>
    </div>
  );
}