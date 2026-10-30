import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import {
  BrainCircuit,
  Palette,
  Rocket,
  SearchCode,
  Workflow,
} from "lucide-react";
import { useRef, useState } from "react";
import AboutHighlightCard from "../components/AboutHighlightCard";

const highlights = [
  {
    number: "01",
    title: "Creative",
    description:
      "I look beyond the obvious, explore different perspectives, and find thoughtful ways to turn ideas into practical solutions.",
    accent: "from-blue-500 to-cyan-400",
    icon: Palette,
  },
  {
    number: "02",
    title: "Curious",
    description:
      "I want to understand how things work, why they work, and how they can be improved. Learning is a constant part of my journey.",
    accent: "from-violet-500 to-purple-400",
    icon: SearchCode,
  },
  {
    number: "03",
    title: "Problem Solver",
    description:
      "I approach challenges logically, breaking complexity into manageable steps and focusing on solutions that make a difference.",
    accent: "from-cyan-400 to-blue-500",
    icon: BrainCircuit,
  },
  {
    number: "04",
    title: "Growth Driven",
    description:
      "I believe progress comes from challenging myself, staying adaptable, and consistently pushing beyond what I already know.",
    accent: "from-fuchsia-500 to-violet-500",
    icon: Rocket,
  },
];

const skills = [
  {
    name: "AWS",
    icon: "/images/issuers/aws.svg",
    type: "image",
  },
  {
    name: "Amazon Connect",
    icon: "/images/technologies/Connect.svg",
    type: "image",
  },
  {
    name: "Terraform",
    icon: "/images/technologies/terraform-light.svg",
    type: "image",
  },
  {
    name: "CI/CD",
    icon: "react",
    type: "react",
  },
  {
    name: "Power Platform",
    icon: "/images/technologies/power-platform.png",
    type: "image",
  },
];

function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 24,
    mass: 0.4,
  });

  const [activeCard, setActiveCard] = useState(0);

  useMotionValueEvent(progress, "change", (latest) => {
    const nextCard = Math.min(3, Math.floor(latest * 4));

    setActiveCard(nextCard);
  });
  // Each card enters the shared display, settles, and exits
  // as the next card takes its place.
  const card1Y = useTransform(progress, [0, 0.05, 0.18, 0.25], [48, 0, 0, -52]);
  const card1Rotate = useTransform(
    progress,
    [0, 0.05, 0.18, 0.25],
    [5, 0, 0, -5],
  );
  const card1Opacity = useTransform(
    progress,
    [0, 0.035, 0.21, 0.255],
    [0, 1, 1, 0],
  );
  const card1Scale = useTransform(
    progress,
    [0, 0.05, 0.18, 0.25],
    [0.98, 1, 1, 0.98],
  );

  const card2Y = useTransform(
    progress,
    [0.22, 0.28, 0.43, 0.5],
    [48, 0, 0, -52],
  );
  const card2Rotate = useTransform(
    progress,
    [0.22, 0.28, 0.43, 0.5],
    [5, 0, 0, -5],
  );
  const card2Opacity = useTransform(
    progress,
    [0.22, 0.255, 0.46, 0.505],
    [0, 1, 1, 0],
  );
  const card2Scale = useTransform(
    progress,
    [0.22, 0.28, 0.43, 0.5],
    [0.98, 1, 1, 0.98],
  );

  const card3Y = useTransform(
    progress,
    [0.47, 0.53, 0.68, 0.75],
    [48, 0, 0, -52],
  );
  const card3Rotate = useTransform(
    progress,
    [0.47, 0.53, 0.68, 0.75],
    [5, 0, 0, -5],
  );
  const card3Opacity = useTransform(
    progress,
    [0.47, 0.505, 0.71, 0.755],
    [0, 1, 1, 0],
  );
  const card3Scale = useTransform(
    progress,
    [0.47, 0.53, 0.68, 0.75],
    [0.98, 1, 1, 0.98],
  );

  const card4Y = useTransform(progress, [0.72, 0.78, 0.94, 1], [48, 0, 0, -24]);
  const card4Rotate = useTransform(
    progress,
    [0.72, 0.78, 0.94, 1],
    [5, 0, 0, -2],
  );
  const card4Opacity = useTransform(
    progress,
    [0.72, 0.755, 0.98, 1],
    [0, 1, 1, 1],
  );
  const card4Scale = useTransform(
    progress,
    [0.72, 0.78, 0.94, 1],
    [0.98, 1, 1, 1],
  );

  const cardAnimations = [
    {
      y: card1Y,
      rotateX: card1Rotate,
      opacity: card1Opacity,
      scale: card1Scale,
    },
    {
      y: card2Y,
      rotateX: card2Rotate,
      opacity: card2Opacity,
      scale: card2Scale,
    },
    {
      y: card3Y,
      rotateX: card3Rotate,
      opacity: card3Opacity,
      scale: card3Scale,
    },
    {
      y: card4Y,
      rotateX: card4Rotate,
      opacity: card4Opacity,
      scale: card4Scale,
    },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className={`relative isolate overflow-x-clip bg-[#0b1026] text-white ${
        shouldReduceMotion ? "min-h-screen" : "lg:min-h-[400vh]"
      }`}
    >
      {/* Ambient background lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -left-40 top-40 h-96 w-96 rounded-full bg-blue-600/[0.08] blur-[120px]" />
        <div className="absolute -right-40 bottom-10 h-96 w-96 rounded-full bg-violet-600/[0.08] blur-[120px]" />
        <div className="absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-500/[0.035] blur-[120px]" />
      </div>

      <div
        className={`relative mx-auto grid w-full min-w-0 max-w-7xl grid-cols-1 items-center gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12 lg:px-10 lg:pb-24 lg:pt-8 xl:px-12 ${
          shouldReduceMotion ? "" : "lg:sticky lg:top-0 lg:min-h-screen"
        }`}
      >
        {/* Introduction */}
        <div className="relative min-w-0 text-left">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-8 -top-8 h-32 w-32 rounded-full bg-blue-500/20 blur-3xl"
          />

          <div className="relative">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-gradient-to-r from-cyan-400 to-violet-500" />
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-400 sm:text-sm">
                A little about me
              </p>
            </div>

            <h2 className="max-w-2xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl xl:text-6xl">
              Building solutions.
              <br />
              Solving problems.
              <br />
              <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-500 bg-clip-text text-transparent">
                Always evolving.
              </span>
            </h2>

            <motion.div
              aria-hidden="true"
              initial={shouldReduceMotion ? false : { opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative mt-5 h-1 w-32 origin-left overflow-hidden rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 shadow-[0_0_16px_rgba(59,130,246,0.35)]"
            >
              {!shouldReduceMotion && (
                <motion.span
                  aria-hidden="true"
                  className="absolute inset-y-0 left-0 w-1/2 rounded-full bg-gradient-to-r from-transparent via-white to-transparent blur-[1px]"
                  animate={{ x: ["-100%", "250%"] }}
                  transition={{
                    duration: 1.8,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatDelay: 1.5,
                  }}
                />
              )}
            </motion.div>
          </div>

          <h3 className="mt-7 text-lg font-semibold leading-snug text-slate-100 sm:mt-8 sm:text-xl lg:text-2xl">
            Turning complex challenges into practical solutions
          </h3>

          <div className="mt-4 max-w-2xl space-y-4 text-sm leading-7 text-slate-400 sm:text-base">
            <p>
              I'm a Software Engineer at NTT DATA with experience building
              cloud-based, automation, and enterprise software solutions. My
              work spans software development, DevOps, and cloud technologies,
              where I turn technical requirements into practical solutions that
              support real business needs.
            </p>

            <p>
              With hands-on experience in AWS, Amazon Connect, infrastructure as
              code, CI/CD, and Microsoft Power Platform, I enjoy working across
              the software development lifecycle - from understanding a problem
              and designing a solution to implementing, testing, and deploying
              it. I'm particularly interested in building solutions that are
              scalable, reliable, and genuinely useful.
            </p>

            <p>
              Beyond technology, I'm naturally curious, creative, and driven by
              challenges. I enjoy breaking complex problems into manageable
              pieces, exploring different approaches, and continually learning
              how to do things better. For me, engineering is about more than
              writing code - it's about thinking critically, collaborating, and
              turning ideas into something meaningful.
            </p>
          </div>

          {/* Technical focus */}
          <div className="mt-6">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">
              Areas of focus
            </p>

            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill.name}
                  className="group/skill inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-slate-800/40 px-3 py-2 text-xs font-medium tracking-wide text-slate-300 transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-400/40 hover:bg-blue-500/[0.08] hover:text-blue-200 sm:px-4 sm:text-sm"
                >
                  {skill.type === "react" ? (
                    <Workflow
                      aria-hidden="true"
                      className="h-4 w-4 shrink-0 text-cyan-400 transition-transform duration-300 group-hover/skill:scale-110"
                    />
                  ) : (
                    <img
                      src={skill.icon}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      className="h-4 w-4 shrink-0 object-contain transition-transform duration-300 group-hover/skill:scale-110"
                    />
                  )}

                  <span>{skill.name}</span>
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Mobile and reduced-motion layout: show all four cards */}
        <div
          className={`grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 ${
            shouldReduceMotion ? "" : "lg:hidden"
          }`}
        >
          {highlights.map((highlight, index) => (
            <AboutHighlightCard
              key={highlight.number}
              {...highlight}
              index={index}
            />
          ))}
        </div>

        {/* Desktop cinematic card sequence */}
        {!shouldReduceMotion && (
          <div
            className="relative mx-auto hidden min-w-0 w-full max-w-xl lg:block"
            style={{ perspective: 1200 }}
          >
            <div className="relative h-[400px]">
              {highlights.map((highlight, index) => (
                <motion.div
                  key={highlight.number}
                  className="absolute inset-0"
                  style={{
                    ...cardAnimations[index],
                    transformPerspective: 1200,
                    transformOrigin: "center bottom",
                    backfaceVisibility: "hidden",
                    pointerEvents: "auto",
                  }}
                >
                  <AboutHighlightCard {...highlight} index={index} />
                </motion.div>
              ))}
            </div>

            <div className="mt-8 flex items-center gap-4 px-1">
              <div className="shrink-0">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                  More about me
                </p>
                <p className="text-sm font-semibold tracking-[-0.02em] text-white/90">
                  Personal highlights
                </p>
              </div>

              {/* Premium segmented progress tracker */}
              <div
                className="flex flex-1 items-center gap-1.5"
                role="progressbar"
                aria-label="About me card progress"
                aria-valuemin={1}
                aria-valuemax={4}
                aria-valuenow={activeCard + 1}
              >
                {highlights.map((highlight, index) => {
                  const isActive = index === activeCard;
                  const isComplete = index < activeCard;

                  return (
                    <div
                      key={highlight.number}
                      className="relative h-[5px] flex-1 overflow-hidden rounded-full bg-white/[0.08]"
                    >
                      <motion.div
                        className={`absolute inset-0 rounded-full ${
                          isActive
                            ? "bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400"
                            : "bg-gradient-to-r from-blue-500 to-violet-500"
                        }`}
                        initial={false}
                        animate={{
                          scaleX: isComplete || isActive ? 1 : 0,
                          opacity: isComplete ? 0.55 : isActive ? 1 : 0,
                        }}
                        transition={{
                          duration: 0.65,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        style={{ transformOrigin: "left" }}
                      />

                      {isActive && (
                        <motion.div
                          aria-hidden="true"
                          className="absolute inset-0 rounded-full bg-cyan-300/50 blur-[5px]"
                          initial={false}
                          animate={{ opacity: [0.25, 0.65, 0.25] }}
                          transition={{
                            duration: 2.2,
                            ease: "easeInOut",
                            repeat: Infinity,
                          }}
                        />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Animated counter */}
              <div className="flex items-baseline gap-2 font-sans">
                <motion.span
                  key={activeCard}
                  initial={{ opacity: 0, y: 3 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-xl font-medium tracking-[-0.04em] text-white"
                >
                  {String(activeCard + 1).padStart(2, "0")}
                </motion.span>

                <span className="text-sm font-light text-cyan-400/70">/</span>

                <span className="text-sm font-normal tracking-tight text-white/45">
                  {String(highlights.length).padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Reduced-motion desktop layout */}
        {shouldReduceMotion && (
          <div className="hidden min-w-0 grid-cols-2 gap-4 lg:grid">
            {highlights.map((highlight, index) => (
              <AboutHighlightCard
                key={highlight.number}
                {...highlight}
                index={index}
              />
            ))}
          </div>
        )}

        {/* Full-bleed marquee gives the About section a distinctive closing beat. */}
        <div className="relative left-1/2 z-20 mt-8 w-screen min-w-0 -translate-x-1/2 overflow-hidden border-y border-white/[0.07] bg-[linear-gradient(90deg,rgba(9,15,37,0.96),rgba(14,20,49,0.88),rgba(9,15,37,0.96))] py-4 shadow-[0_0_60px_rgba(59,130,246,0.07)] sm:py-5 lg:col-span-full lg:mt-0 lg:py-6">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/60 to-violet-400/50"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-violet-400/35 to-cyan-300/40"
          />

          {shouldReduceMotion ? (
            <p className="px-5 text-center text-lg font-semibold tracking-tight text-slate-200 sm:text-2xl">
              Driven by curiosity
              <span className="mx-3 text-cyan-300">·</span>
              Focused on meaningful solutions
            </p>
          ) : (
            <div
              className="overflow-hidden py-2 sm:py-3"
              style={{
                maskImage:
                  "linear-gradient(90deg, transparent, black 5%, black 95%, transparent)",
              }}
              role="group"
              aria-label="Driven by curiosity. Focused on meaningful solutions. Always learning. Building with purpose."
            >
              <div aria-hidden="true" className="about-marquee flex w-max items-center">
                {[0, 1].map((copy) => (
                  <div
                    key={copy}
                    className="flex shrink-0 items-center gap-8 px-6 text-xl font-semibold tracking-[-0.035em] text-slate-200 sm:gap-12 sm:px-10 sm:text-3xl xl:gap-16 xl:text-4xl"
                  >
                    <span>
                      Driven by <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">curiosity</span>
                    </span>
                    <span className="h-2 w-2 shrink-0 rounded-full bg-cyan-300 shadow-[0_0_14px_rgba(103,232,249,0.8)]" />
                    <span>
                      Focused on <span className="bg-gradient-to-r from-blue-300 to-violet-400 bg-clip-text text-transparent">meaningful solutions</span>
                    </span>
                    <span className="h-2 w-2 shrink-0 rounded-full bg-blue-300 shadow-[0_0_14px_rgba(96,165,250,0.8)]" />
                    <span>
                      Always <span className="bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">learning</span>
                    </span>
                    <span className="h-2 w-2 shrink-0 rounded-full bg-violet-300 shadow-[0_0_14px_rgba(167,139,250,0.8)]" />
                    <span>
                      Building with <span className="bg-gradient-to-r from-blue-300 via-violet-300 to-fuchsia-300 bg-clip-text text-transparent">purpose</span>
                    </span>
                    <span className="h-2 w-2 shrink-0 rounded-full bg-cyan-300 shadow-[0_0_14px_rgba(103,232,249,0.8)]" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default About;
