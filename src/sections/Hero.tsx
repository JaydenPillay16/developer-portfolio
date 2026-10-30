import Button from "../components/Button";
import { FaGithub, FaLinkedin, FaDownload } from "react-icons/fa";
import { motion, useReducedMotion } from "motion/react";
import { useRef, useState } from "react";

const heroEntrance = {
  hidden: {
    opacity: 0,
    y: 24,
    filter: "blur(6px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
  },
};

const heroTransition = {
  duration: 0.75,
  ease: [0.22, 1, 0.36, 1] as const,
};

function Hero() {
  const shouldReduceMotion = useReducedMotion() ?? false;

  const [isDownloading, setIsDownloading] = useState(false);
  const downloadTimeoutRef = useRef<number | null>(null);

  function handleDownload() {
    setIsDownloading(true);

    if (downloadTimeoutRef.current !== null) {
      window.clearTimeout(downloadTimeoutRef.current);
    }

    downloadTimeoutRef.current = window.setTimeout(() => {
      setIsDownloading(false);
      downloadTimeoutRef.current = null;
    }, 1200);
  }

  const portraitRef = useRef<HTMLDivElement>(null);

  const [portraitTilt, setPortraitTilt] = useState({
    rotateX: 0,
    rotateY: 0,
  });

  const handlePortraitMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !portraitRef.current) return;

    const rect = portraitRef.current.getBoundingClientRect();

    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    setPortraitTilt({
      rotateX: (0.5 - y) * 10,
      rotateY: (x - 0.5) * 10,
    });
  };

  const handlePortraitMouseLeave = () => {
    setPortraitTilt({
      rotateX: 0,
      rotateY: 0,
    });
  };

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden bg-[#080b20] px-6 pb-16 pt-32 text-white sm:px-10 lg:px-16"
    >
      {/* Ambient background glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-blue-600/10 blur-[120px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-violet-600/15 blur-[120px]"
      />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 md:gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 xl:gap-20">
        {/* Introduction with staggered entrance */}
        <motion.div
          className="max-w-2xl"
          initial={shouldReduceMotion ? false : "hidden"}
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: shouldReduceMotion ? 0 : 0.14,
                delayChildren: shouldReduceMotion ? 0 : 0.15,
              },
            },
          }}
        >
          {/* Animated professional identity badge */}
          <motion.div
            variants={heroEntrance}
            transition={heroTransition}
            className="mb-8"
          >
            <motion.div
              whileHover={
                shouldReduceMotion ? undefined : { y: -2, scale: 1.015 }
              }
              transition={{ duration: 0.25 }}
              className="group relative isolate inline-flex max-w-full flex-wrap items-center gap-x-3 gap-y-2 overflow-hidden rounded-2xl border border-cyan-300/15 bg-gradient-to-r from-[#0c122b]/95 via-[#101832]/90 to-[#11132d]/95 px-3.5 py-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_12px_32px_rgba(0,0,0,0.18)] backdrop-blur-xl transition-[transform,border-color,box-shadow] duration-300 hover:border-cyan-300/35 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_14px_36px_rgba(59,130,246,0.12)] sm:rounded-full sm:px-4"
            >
              {/* Moving glass highlight */}
              {!shouldReduceMotion && (
                <motion.span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 rotate-[20deg] bg-gradient-to-r from-transparent via-white/[0.08] to-transparent"
                  animate={{ x: ["0%", "500%"] }}
                  transition={{
                    duration: 2.6,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatDelay: 5,
                  }}
                />
              )}

              {/* Animated status indicator */}
              <span className="relative flex h-3 w-3 shrink-0 items-center justify-center">
                {!shouldReduceMotion && (
                  <motion.span
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full bg-emerald-300/55"
                    animate={{
                      scale: [1, 1.9, 1.9],
                      opacity: [0.6, 0, 0],
                    }}
                    transition={{
                      duration: 2.4,
                      ease: "easeOut",
                      repeat: Infinity,
                      repeatDelay: 0.6,
                    }}
                  />
                )}

                <span className="relative h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(52,211,153,0.75)] ring-2 ring-emerald-300/15" />
              </span>

              {/* Refined identity typography */}
              <span className="relative flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-slate-300 sm:gap-x-3 sm:text-xs sm:tracking-[0.2em]">
                <span className="whitespace-nowrap">Software Engineer</span>

                <span
                  aria-hidden="true"
                  className="hidden h-3.5 w-px bg-gradient-to-b from-transparent via-blue-400/70 to-transparent sm:block"
                />

                <span className="whitespace-nowrap bg-gradient-to-r from-cyan-300 via-blue-300 to-violet-300 bg-clip-text text-transparent">
                  Cloud &amp; Automation
                </span>
              </span>
            </motion.div>
          </motion.div>

          {/* Intro label */}
          <motion.p
            variants={heroEntrance}
            transition={heroTransition}
            className="mt-5 max-w-xl text-base leading-7 text-slate-400 sm:text-lg sm:leading-8"
          >
            Hello, I&apos;m
          </motion.p>

          {/* Name */}
          <motion.h1
            variants={heroEntrance}
            transition={heroTransition}
            className="text-5xl font-extrabold leading-[1.02] tracking-[-0.045em] sm:text-6xl lg:text-7xl xl:text-8xl"
          >
            JAYDEN
            <motion.span
              className="mt-2 block bg-clip-text text-transparent drop-shadow-[0_8px_28px_rgba(59,130,246,0.12)]"
              style={{
                backgroundImage:
                  "linear-gradient(100deg, #3b82f6 0%, #6366f1 38%, #8b5cf6 72%, #a855f7 100%)",
                backgroundSize: "200% 100%",
                backgroundPosition: "0% 50%",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
              }}
              animate={
                shouldReduceMotion
                  ? undefined
                  : { backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }
              }
              transition={
                shouldReduceMotion
                  ? undefined
                  : { duration: 8, ease: "linear", repeat: Infinity }
              }
            >
              PILLAY
            </motion.span>
          </motion.h1>

          {/* Professional headline */}
          <motion.h2
            variants={heroEntrance}
            transition={heroTransition}
            className="mt-7 max-w-xl text-xl font-semibold leading-snug tracking-tight text-slate-100 sm:text-2xl"
          >
            Building technology that makes a difference.
          </motion.h2>

          {/* Introduction */}
          <motion.p
            variants={heroEntrance}
            transition={heroTransition}
            className="mt-5 max-w-xl text-base leading-8 text-slate-400 sm:text-lg"
          >
            I&apos;m a software engineer building cloud-native solutions,
            intelligent automation, and enterprise applications that turn
            complex challenges into scalable, reliable digital solutions.
          </motion.p>

          {/* Action buttons */}
          <motion.div
            variants={heroEntrance}
            transition={heroTransition}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Button href="#projects" variant="primary">
              View My Work
            </Button>

            <Button href="#contact" variant="outline">
              Get In Touch
            </Button>

            {/* Download CV */}
            <motion.a
              href="/Jayden-Pillay-CV.pdf"
              download="Jayden-Pillay-CV.pdf"
              onClick={handleDownload}
              whileHover={
                shouldReduceMotion ? undefined : { y: -3, scale: 1.03 }
              }
              whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
              aria-label="Download Jayden Pillay's CV as a PDF"
              className="group relative isolate inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-xl border border-blue-400/30 bg-white/[0.04] px-5 py-3.5 text-sm font-semibold text-white shadow-[0_0_20px_rgba(59,130,246,0.04)] backdrop-blur-sm transition-all duration-300 hover:border-cyan-300/60 hover:bg-blue-500/[0.08] hover:shadow-[0_0_30px_rgba(59,130,246,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              {/* Animated shine sweep */}
              {!shouldReduceMotion && (
                <motion.span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-xl"
                >
                  <motion.span
                    className="absolute -inset-y-1/2 -left-1/2 w-1/3 rotate-[25deg] bg-gradient-to-r from-transparent via-white/25 to-transparent blur-[2px]"
                    animate={{ x: ["-100%", "500%"] }}
                    transition={{
                      duration: 1.8,
                      ease: "easeInOut",
                      repeat: Infinity,
                      repeatDelay: 2.5,
                    }}
                  />
                </motion.span>
              )}

              {/* Subtle hover glow */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-r from-blue-500/0 via-cyan-400/10 to-violet-500/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />

              <motion.span
                animate={
                  isDownloading && !shouldReduceMotion
                    ? { y: [0, -3, 0], scale: [1, 1.15, 1] }
                    : { y: 0, scale: 1 }
                }
                transition={{ duration: 0.35 }}
                className="relative z-10 inline-flex"
              >
                <FaDownload
                  aria-hidden="true"
                  className="text-sm text-cyan-300 transition-transform duration-300 group-hover:-translate-y-0.5"
                />
              </motion.span>

              <span className="relative z-10">
                {isDownloading ? "Downloading CV..." : "Download CV"}
              </span>
            </motion.a>
          </motion.div>

          {/* Social links */}
          <motion.div
            variants={heroEntrance}
            transition={heroTransition}
            className="mt-10 flex flex-wrap items-center gap-6 text-sm"
          >
            <span className="text-xs font-medium uppercase tracking-[0.22em] text-slate-500">
              Connect
            </span>

            <a
              href="https://github.com/JaydenPillay16"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit my GitHub profile"
              className="group inline-flex items-center gap-2 text-slate-400 transition-all duration-300 hover:-translate-y-0.5 hover:text-white"
            >
              <FaGithub
                className="text-xl transition-all duration-300 group-hover:scale-125 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.9)]"
                aria-hidden="true"
              />
              <span className="inline-block transition-all duration-300 group-hover:scale-110 group-hover:font-semibold group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.65)]">
                GitHub
              </span>
            </a>

            <a
              href="https://www.linkedin.com/in/jayden-pillay-44947a261/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit my LinkedIn profile"
              className="group inline-flex items-center gap-2 text-slate-400 transition-all duration-300 hover:-translate-y-0.5 hover:text-blue-400"
            >
              <FaLinkedin
                className="text-xl text-[#0A66C2] transition-all duration-300 group-hover:scale-125 group-hover:drop-shadow-[0_0_8px_rgba(10,102,194,0.95)]"
                aria-hidden="true"
              />
              <span className="inline-block transition-all duration-300 group-hover:scale-110 group-hover:font-semibold group-hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]">
                LinkedIn
              </span>
            </a>
          </motion.div>
        </motion.div>

        {/* Animated portrait panel */}
        <motion.div
          initial={
            shouldReduceMotion ? false : { opacity: 0, y: 30, scale: 0.97 }
          }
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: shouldReduceMotion ? 0 : 1,
            delay: shouldReduceMotion ? 0 : 0.65,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative mx-auto w-full max-w-sm sm:max-w-md lg:max-w-[26rem] xl:max-w-lg"
        >
          {/* Ambient blue-purple glow */}
          <div
            aria-hidden="true"
            className="portrait-glow pointer-events-none absolute -inset-5 rounded-[2.5rem] bg-gradient-to-br from-blue-500/30 via-violet-500/20 to-purple-600/30 blur-2xl"
          />

          {/* Portrait card */}
          <motion.div
            ref={portraitRef}
            onMouseMove={handlePortraitMouseMove}
            onMouseLeave={handlePortraitMouseLeave}
            animate={portraitTilt}
            transition={{
              type: "spring",
              stiffness: 180,
              damping: 22,
              mass: 0.6,
            }}
            style={{
              transformStyle: "preserve-3d",
              willChange: "transform",
            }}
            className="portrait-card group relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10 bg-[#080b20] shadow-2xl shadow-blue-950/40 transition-shadow duration-500 hover:shadow-blue-900/40"
          >
            {/* Your image fills the entire card */}
            <img
              src="/images/hero-portrait.jpg"
              alt="Jayden Pillay, Software Engineer"
              fetchPriority="high"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
            />

            {/* Subtle blue-violet portrait lighting */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-400/[0.08] via-transparent to-violet-500/[0.12] opacity-70 mix-blend-screen"
            />

            {/* Dark edge gradient for depth */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080b20]/40 via-transparent to-[#080b20]/10"
            />

            {/* Animated light streak */}
            <div
              aria-hidden="true"
              className="portrait-shimmer pointer-events-none absolute inset-0"
            />

            {/* Premium inner border */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/15"
            >
              <div className="absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-blue-300/[0.06]" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
