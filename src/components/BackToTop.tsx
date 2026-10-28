import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const reduceMotion = useReducedMotion() ?? false;

  useEffect(() => {
    const handleScroll = () => {
      // Show the button after leaving the Home section.
      setVisible(window.scrollY > window.innerHeight * 0.5);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  return (
    <motion.button
      type="button"
      aria-label="Back to top"
      title="Back to top"
      onClick={scrollToTop}
      initial={false}
      animate={
        visible
          ? {
              opacity: 1,
              scale: 1,
              y: 0,
              pointerEvents: "auto",
            }
          : {
              opacity: 0,
              scale: 0.7,
              y: 16,
              pointerEvents: "none",
            }
      }
      transition={{
        duration: reduceMotion ? 0 : 0.3,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={
        reduceMotion
          ? undefined
          : {
              scale: 1.1,
              rotate: -5,
            }
      }
      whileTap={
        reduceMotion
          ? undefined
          : {
              scale: 0.92,
            }
      }
      className="group fixed bottom-6 right-6 z-[100] flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-600 text-white shadow-[0_8px_30px_rgba(59,130,246,0.3)] outline-none transition-shadow duration-300 hover:shadow-[0_8px_40px_rgba(139,92,246,0.5)] focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-4 focus-visible:ring-offset-[#080b20] sm:bottom-8 sm:right-8 sm:h-14 sm:w-14"
    >
      {/* Animated outer glow */}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute -inset-1 -z-10 rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-500 opacity-40 blur-md"
        animate={
          reduceMotion
            ? {}
            : {
                opacity: [0.25, 0.65, 0.25],
                scale: [0.95, 1.08, 0.95],
              }
        }
        transition={{
          duration: 2.8,
          repeat: reduceMotion ? 0 : Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Subtle shine passing over the button */}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl"
      >
        <motion.span
          className="absolute -inset-y-2 left-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/35 to-transparent"
          animate={reduceMotion ? {} : { x: ["-180%", "450%"] }}
          transition={{
            duration: 1.6,
            repeat: reduceMotion ? 0 : Infinity,
            repeatDelay: 3,
            ease: "easeInOut",
          }}
        />
      </motion.span>

      <motion.span
        className="relative z-10 flex items-center justify-center"
        animate={
          reduceMotion
            ? {}
            : {
                y: [0, -2, 0],
              }
        }
        transition={{
          duration: 1.8,
          repeat: reduceMotion ? 0 : Infinity,
          ease: "easeInOut",
        }}
      >
        <ArrowUp
          size={22}
          strokeWidth={2.5}
          className="transition-transform duration-300 group-hover:-translate-y-0.5"
        />
      </motion.span>
    </motion.button>
  );
}
