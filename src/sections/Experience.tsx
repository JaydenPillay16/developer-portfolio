import { motion, useReducedMotion } from "motion/react";
import type { ComponentType, SVGProps } from "react";
import {
  SiGithubactions,
  SiJson,
  SiTerraform,
  SiMysql,
} from "@icons-pack/react-simple-icons";
import { Workflow, Code2 } from "lucide-react";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

type TechnologyStyle = {
  icon: IconComponent;
  image?: string;
  color: string;
  hover: string;
};

const technologyStyles: Record<string, TechnologyStyle> = {
  AWS: {
    icon: Code2,
    image: "/images/technologies/aws.svg",
    color: "text-orange-400",
    hover:
      "hover:border-orange-400/40 hover:bg-orange-400/[0.06] hover:shadow-[0_0_18px_rgba(251,146,60,0.10)]",
  },
  "Amazon Connect": {
    icon: Code2,
    image: "/images/technologies/Connect.svg",
    color: "text-cyan-400",
    hover:
      "hover:border-cyan-400/40 hover:bg-cyan-400/[0.06] hover:shadow-[0_0_18px_rgba(34,211,238,0.10)]",
  },
  "Amazon Lex": {
    icon: Code2,
    image: "/images/technologies/amazon-lex.svg",
    color: "text-violet-400",
    hover:
      "hover:border-violet-400/40 hover:bg-violet-400/[0.06] hover:shadow-[0_0_18px_rgba(167,139,250,0.10)]",
  },
  Terraform: {
    icon: SiTerraform,
    color: "text-violet-300",
    hover:
      "hover:border-violet-400/40 hover:bg-violet-400/[0.06] hover:shadow-[0_0_18px_rgba(167,139,250,0.10)]",
  },
  JSON: {
    icon: SiJson,
    color: "text-amber-300",
    hover:
      "hover:border-amber-400/40 hover:bg-amber-400/[0.06] hover:shadow-[0_0_18px_rgba(251,191,36,0.10)]",
  },
  "GitHub Actions": {
    icon: SiGithubactions,
    color: "text-sky-300",
    hover:
      "hover:border-sky-400/40 hover:bg-sky-400/[0.06] hover:shadow-[0_0_18px_rgba(56,189,248,0.10)]",
  },
  "CI/CD": {
    icon: Workflow,
    color: "text-blue-300",
    hover:
      "hover:border-blue-400/40 hover:bg-blue-400/[0.06] hover:shadow-[0_0_18px_rgba(59,130,246,0.10)]",
  },
  "Power Apps": {
    icon: Code2,
    image: "/images/technologies/power-apps.png",
    color: "text-violet-300",
    hover:
      "hover:border-violet-400/40 hover:bg-violet-400/[0.06] hover:shadow-[0_0_18px_rgba(167,139,250,0.10)]",
  },
  "Power Automate": {
    icon: Workflow,
    image: "/images/technologies/power-automate.svg",
    color: "text-sky-300",
    hover:
      "hover:border-sky-400/40 hover:bg-sky-400/[0.06] hover:shadow-[0_0_18px_rgba(56,189,248,0.10)]",
  },
  SharePoint: {
    icon: Code2,
    image: "/images/technologies/sharepoint.svg",
    color: "text-emerald-300",
    hover:
      "hover:border-emerald-400/40 hover:bg-emerald-400/[0.06] hover:shadow-[0_0_18px_rgba(110,231,183,0.10)]",
  },
  SQL: {
    icon: SiMysql,
    color: "text-sky-300",
    hover:
      "hover:border-sky-400/40 hover:bg-sky-400/[0.06] hover:shadow-[0_0_18px_rgba(56,189,248,0.10)]",
  },
  "Software Development": {
    icon: Code2,
    color: "text-blue-300",
    hover:
      "hover:border-blue-400/40 hover:bg-blue-400/[0.06] hover:shadow-[0_0_18px_rgba(59,130,246,0.10)]",
  },
  "Microsoft Power Platform": {
    icon: Code2,
    image: "/images/technologies/power-platform.png",
    color: "text-amber-300",
    hover:
      "hover:border-amber-400/40 hover:bg-amber-400/[0.06] hover:shadow-[0_0_18px_rgba(251,191,36,0.10)]",
  },
};

const defaultTechnologyStyle: TechnologyStyle = {
  icon: Code2,
  color: "text-blue-300",
  hover:
    "hover:border-blue-400/40 hover:bg-blue-400/[0.06] hover:shadow-[0_0_18px_rgba(59,130,246,0.10)]",
};

const smoothEase = [0.22, 1, 0.36, 1] as const;

const experienceTextShimmer = {
  backgroundImage:
    "linear-gradient(100deg, #67e8f9 0%, #60a5fa 25%, #a78bfa 45%, #67e8f9 60%, #60a5fa 80%, #a78bfa 100%)",
  backgroundSize: "250% 100%",
};

const experiences = [
  {
    role: "Associate Software Engineer",
    company: "NTT DATA",
    period: "March 2026 – Present",
    location: "Bryanston, South Africa",
    description:
      "Contributing to cloud-based contact centre solutions and enterprise software development, with a focus on reliable integrations and maintainable implementations.",
    technologies: ["Amazon Connect", "AWS", "Amazon Lex", "Terraform", "JSON"],
    current: true,
  },
  {
    role: "Associate DevOps Engineer",
    company: "NTT DATA",
    period: "October 2025 – March 2026",
    location: "Bryanston, South Africa",
    description:
      "Worked with DevOps practices and delivery workflows, supporting automation and the deployment of software solutions through CI/CD processes.",
    technologies: ["GitHub Actions", "CI/CD", "AWS", "Terraform"],
    current: false,
  },
  {
    role: "Associate Software Developer",
    company: "NTT DATA",
    period: "May 2024 – October 2025",
    location: "Bryanston, South Africa",
    description:
      "Contributed to enterprise applications, document management solutions, and workflow automation using Microsoft technologies.",
    technologies: ["Power Apps", "Power Automate", "SharePoint", "SQL"],
    current: false,
  },
  {
    role: "Graduate Intern",
    company: "NTT DATA",
    period: "July 2023 – April 2024",
    location: "South Africa",
    description:
      "Developed foundational experience in software development, enterprise systems, and collaborative delivery while building practical technical skills.",
    technologies: [
      "Software Development",
      "Microsoft Power Platform",
      "SharePoint",
    ],
    current: false,
  },
];

function TechnologyBadge({ name }: { name: string }) {
  const style = technologyStyles[name] ?? defaultTechnologyStyle;
  const Icon = style.icon;

  return (
    <span
      className={`group inline-flex items-center gap-2 rounded-lg border border-white/[0.09] bg-white/[0.03] px-3 py-2 text-xs font-medium tracking-wide text-slate-200 transition-[transform,border-color,background-color,box-shadow] duration-200 ease-out hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60 ${style.hover}`}
    >
      {style.image ? (
        <img
          aria-hidden="true"
          src={style.image}
          alt=""
          className="h-4 w-4 shrink-0 object-contain transition-transform duration-200 group-hover:scale-105"
        />
      ) : (
        <Icon
          aria-hidden="true"
          className={`h-4 w-4 shrink-0 transition-transform duration-200 group-hover:scale-105 ${style.color}`}
        />
      )}
      {name}
    </span>
  );
}

function TimelineMarker({
  current,
  reduceMotion,
}: {
  current: boolean;
  reduceMotion: boolean;
}) {
  const accent = current
    ? { border: "rgba(103,232,249,0.9)", core: "#a5f3fc", glow: "rgba(34,211,238,0.22)" }
    : { border: "rgba(129,140,248,0.8)", core: "#c4b5fd", glow: "rgba(129,140,248,0.16)" };

  return (
    <motion.span
      aria-hidden="true"
      initial={false}
      whileInView={
        reduceMotion
          ? undefined
          : { scale: [0.88, 1.06, 1] }
      }
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: reduceMotion ? 0 : 0.55,
        ease: smoothEase,
      }}
      className="absolute left-0 top-7 z-10 flex h-6 w-6 items-center justify-center rounded-full border bg-[#0b1020] sm:h-8 sm:w-8"
      style={{
        borderColor: accent.border,
        boxShadow: `0 0 0 3px ${accent.glow}, 0 0 20px ${accent.glow}`,
      }}
    >
      <span
        className="relative z-10 block h-2 w-2 rounded-full"
        style={{
          backgroundColor: accent.core,
          boxShadow: `0 0 12px ${accent.glow}`,
        }}
      />
    </motion.span>
  );
}

function Experience() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="relative isolate overflow-clip bg-[#080b20] px-6 pb-8 text-white sm:px-10 sm:pb-12 lg:px-16 lg:pb-16"
    >
      {/* Ambient background lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -left-40 top-40 h-96 w-96 rounded-full bg-cyan-600/[0.07] blur-[120px]" />
        <div className="absolute -right-40 top-1/2 h-96 w-96 rounded-full bg-violet-600/[0.07] blur-[120px]" />
        <div className="absolute left-1/2 top-[75%] h-72 w-72 -translate-x-1/2 rounded-full bg-blue-600/[0.05] blur-[120px]" />
      </div>

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-start gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        {/* Sticky heading */}
        <div className="relative z-20 self-start lg:sticky lg:top-24">
          <div className="pb-6 pt-10 text-left sm:pt-12 lg:py-16">
            <motion.p
              initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, ease: smoothEase }}
              className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-blue-400 sm:text-sm"
            >
              My journey
            </motion.p>

            <h2
              id="experience-heading"
              className="text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl"
            >
              Professional{" "}
              <motion.span
                className="inline-block bg-clip-text text-transparent"
                style={{
                  ...experienceTextShimmer,
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                }}
                animate={
                  shouldReduceMotion
                    ? undefined
                    : { backgroundPosition: ["100% 50%", "0% 50%"] }
                }
                transition={
                  shouldReduceMotion
                    ? undefined
                    : {
                        duration: 4,
                        ease: "linear",
                        repeat: Infinity,
                        repeatType: "reverse",
                      }
                }
              >
                experience
              </motion.span>
            </h2>

            {/* Animated underline - replays on every viewport entry */}
            <div className="mt-6 h-1 w-32 overflow-hidden rounded-full bg-white/[0.06]">
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.85,
                  ease: smoothEase,
                }}
                style={{ transformOrigin: "left center" }}
                className="relative h-full w-full overflow-hidden rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 shadow-[0_0_18px_rgba(96,165,250,0.4)]"
              >
                {!shouldReduceMotion && (
                  <motion.span
                    className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-white to-transparent"
                    initial={{ x: "-100%" }}
                    whileInView={{ x: "250%" }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      duration: 1.1,
                      ease: "easeInOut",
                      delay: 0.2,
                    }}
                  />
                )}
              </motion.div>
            </div>

            <p className="mr-auto mt-6 max-w-xl text-sm leading-7 text-slate-400 sm:text-base sm:leading-8">
              Growing through different roles, building practical experience,
              and contributing to technology solutions for enterprise needs.
            </p>

            <div className="mt-8 hidden items-center gap-3 lg:flex">
              <span className="h-px w-8 bg-cyan-400/60" />
              <span className="text-xs font-medium tracking-[0.3em] text-slate-500">
                JULY 2023 - PRESENT
              </span>
            </div>
          </div>
        </div>

        {/* Career timeline */}
        <div className="relative min-w-0 pb-24 pt-4 sm:pt-8 lg:pt-16">
          <div
            aria-hidden="true"
            className="absolute bottom-28 left-[11px] top-16 w-px bg-gradient-to-b from-cyan-300 via-blue-500/70 to-violet-500/30 sm:left-[15px] sm:top-20"
          />

          <div className="space-y-8 sm:space-y-10">
            {experiences.map((experience, index) => {
              const accent = experience.current
                ? {
                    border: "rgba(34,211,238,0.9)",
                    sweep: "rgba(103,232,249,0.22)",
                    glow: "0 0 0 1px rgba(34,211,238,0.2), 0 0 32px rgba(34,211,238,0.3), 0 0 75px rgba(34,211,238,0.12), 0 24px 60px rgba(0,0,0,0.3)",
                    hoverGlow:
                      "0 0 0 1px rgba(34,211,238,0.4), 0 0 42px rgba(34,211,238,0.38), 0 0 90px rgba(34,211,238,0.2), 0 28px 70px rgba(59,130,246,0.18)",
                  }
                : {
                    border: "rgba(129,140,248,0.8)",
                    sweep: "rgba(167,139,250,0.2)",
                    glow: "0 0 0 1px rgba(129,140,248,0.16), 0 0 28px rgba(129,140,248,0.22), 0 0 60px rgba(99,102,241,0.1), 0 22px 55px rgba(0,0,0,0.28)",
                    hoverGlow:
                      "0 0 0 1px rgba(167,139,250,0.38), 0 0 40px rgba(129,140,248,0.34), 0 0 85px rgba(99,102,241,0.18), 0 28px 65px rgba(59,130,246,0.15)",
                  };

              return (
                <article
                  key={experience.role}
                  className="relative pl-10 sm:pl-16"
                >
                  <TimelineMarker
                    current={experience.current}
                    reduceMotion={Boolean(shouldReduceMotion)}
                  />

                  {/* Scroll-reactive experience card */}
                  <motion.div
                    initial={
                      shouldReduceMotion
                        ? false
                        : {
                            opacity: 0.35,
                            y: 48,
                            scale: 0.96,
                            borderColor: "rgba(255,255,255,0.06)",
                            boxShadow: "0 0 0 rgba(0,0,0,0)",
                          }
                    }
                    whileInView={
                      shouldReduceMotion
                        ? undefined
                        : {
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            borderColor: accent.border,
                            boxShadow: accent.glow,
                          }
                    }
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      duration: shouldReduceMotion ? 0 : 0.8,
                      delay: shouldReduceMotion ? 0 : index * 0.06,
                      ease: smoothEase,
                    }}
                    whileHover={
                      shouldReduceMotion
                        ? undefined
                        : {
                            y: -6,
                            scale: 1.012,
                            borderColor: "rgba(103,232,249,0.95)",
                            boxShadow: accent.hoverGlow,
                          }
                    }
                    className="group relative rounded-2xl border bg-gradient-to-br from-slate-800/80 via-[#10172d]/95 to-[#080D1C] p-5 transition-colors duration-300 sm:p-8"
                  >
                    {/* Moving light sweep: repeats whenever this card enters view */}
                    {!shouldReduceMotion && (
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl"
                      >
                        <motion.div
                          className="absolute -inset-y-1/2 left-[-80%] w-1/2 rotate-[18deg] blur-lg"
                          style={{
                            background: `linear-gradient(to right, transparent, ${accent.sweep}, transparent)`,
                          }}
                          initial={{ left: "-80%" }}
                          whileInView={{ left: "150%" }}
                          viewport={{ once: true, amount: 0.2 }}
                          transition={{
                            duration: 1.3,
                            delay: index * 0.08,
                            ease: smoothEase,
                          }}
                        />
                      </div>
                    )}

                    {/* Animated top-edge accent */}
                    <motion.div
                      aria-hidden="true"
                      className="pointer-events-none absolute left-8 right-8 top-0 h-px origin-left bg-gradient-to-r from-transparent via-cyan-300 to-transparent"
                      initial={{ scaleX: 0, opacity: 0 }}
                      whileInView={
                        shouldReduceMotion
                          ? { scaleX: 1, opacity: 0.5 }
                          : { scaleX: 1, opacity: [0.2, 1, 0.65] }
                      }
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{
                        duration: 0.9,
                        delay: index * 0.05,
                        ease: smoothEase,
                      }}
                    />

                    {/* Card content */}
                    <div className="relative z-10">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <div className="flex flex-wrap items-center gap-3">
                            <h3 className="text-xl font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-cyan-50 sm:text-2xl">
                              {experience.role}
                            </h3>

                            {experience.current && (
                              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/[0.09] px-3 py-1.5 text-xs font-semibold tracking-wide text-emerald-300">
                                <motion.span
                                  aria-hidden="true"
                                  animate={
                                    shouldReduceMotion
                                      ? undefined
                                      : {
                                          opacity: [1, 0.5, 1],
                                          scale: [1, 1.2, 1],
                                        }
                                  }
                                  transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                  }}
                                  className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"
                                />
                                Current role
                              </span>
                            )}
                          </div>

                          <p className="mt-2 text-sm font-semibold tracking-wide text-blue-300 sm:text-base">
                            {experience.company}
                          </p>
                        </div>

                        <p className="shrink-0 text-sm font-medium leading-6 text-slate-400">
                          {experience.period}
                        </p>
                      </div>

                      <p className="mt-3 text-sm text-slate-500">
                        {experience.location}
                      </p>

                      <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base sm:leading-8">
                        {experience.description}
                      </p>

                      <div className="mt-6 flex flex-wrap gap-2">
                        {experience.technologies.map((technology) => (
                          <TechnologyBadge key={technology} name={technology} />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Experience;
