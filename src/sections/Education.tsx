import { useRef, useState, type CSSProperties } from "react";
import { motion, useReducedMotion, useInView } from "motion/react";

import {
  GraduationCap,
  School,
  MapPin,
  CalendarDays,
  CheckCircle2,
  BookOpen,
} from "lucide-react";

type EducationItem = {
  qualification: string;
  institution: string;
  location: string;
  period: string;
  status: string;
  description: string;
  icon: typeof GraduationCap;
  accent: string;
  glow: string;
  logo: string;
  logoAlt: string;
  logoFallback: string;
  subjects: string[];
};

const education: EducationItem[] = [
  {
    qualification: "BSc Computer Science and Information Technology",
    institution: "University of KwaZulu-Natal",
    location: "Pietermaritzburg, South Africa",
    period: "2019 – 2023",
    status: "Graduated",
    description:
      "Graduated with a Bachelor of Science in Computer Science and Information Technology, building a foundation in software development, programming, and information technology.",
    icon: GraduationCap,
    accent: "from-blue-400 to-violet-500",
    glow: "rgba(96, 165, 250, 0.16)",
    logo: "/images/institutions/ukzn-logo.png",
    logoAlt: "University of KwaZulu-Natal logo",
    logoFallback: "UKZN",
    subjects: [
      "Computer Science",
      "Software Development",
      "Information Technology",
    ],
  },
  {
    qualification: "National Senior Certificate",
    institution: "Port Shepstone High School",
    location: "Port Shepstone, South Africa",
    period: "2015 – 2019",
    status: "Completed",
    description:
      "Completed Grade 12 and earned my National Senior Certificate, marking an important step in my education.",
    icon: School,
    accent: "from-violet-400 to-fuchsia-500",
    glow: "rgba(167, 139, 250, 0.16)",
    logo: "/images/institutions/port-shepstone-high-school-logo.png",
    logoAlt: "Port Shepstone High School logo",
    logoFallback: "PSHS",
    subjects: [
      "Mathematics",
      "Physical Sciences",
      "Accounting",
      "Life Sciences",
      "English HL",
      "Afrikaans FAL",
      "Life Orientation",
    ],
  },
];

const smoothEase = [0.22, 1, 0.36, 1] as const;

const headingShimmer = {
  backgroundImage:
    "linear-gradient(100deg, #67e8f9 0%, #60a5fa 25%, #a78bfa 45%, #67e8f9 60%, #60a5fa 80%, #a78bfa 100%)",
  backgroundSize: "250% 100%",
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
};

function InstitutionLogo({
  src,
  alt,
  fallback,
  accent,
}: {
  src: string;
  alt: string;
  fallback: string;
  accent: string;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      className={`relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br ${accent} p-px shadow-lg shadow-black/20`}
    >
      <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-[11px] bg-white p-1.5">
        {!failed ? (
          <img
            src={src}
            alt={alt}
            loading="lazy"
            onError={() => setFailed(true)}
            className="h-full w-full object-contain"
          />
        ) : (
          <span className="text-center text-[9px] font-bold tracking-tight text-slate-700">
            {fallback}
          </span>
        )}
      </div>
    </div>
  );
}

function AcademicIcon({
  icon: Icon,
  accent,
  index,
  reduceMotion,
}: {
  icon: typeof GraduationCap;
  accent: string;
  index: number;
  reduceMotion: boolean;
}) {
  return (
    <motion.div
      initial={false}
      animate={
        reduceMotion
          ? {}
          : {
              y: [0, -3, 0],
              rotate: [0, index === 0 ? 2 : -2, 0],
            }
      }
      transition={{
        duration: index === 0 ? 4 : 4.6,
        repeat: reduceMotion ? 0 : Infinity,
        ease: "easeInOut",
        delay: index * 0.3,
      }}
      whileHover={
        reduceMotion
          ? undefined
          : {
              scale: 1.08,
              rotate: index === 0 ? 5 : -5,
              transition: { duration: 0.25 },
            }
      }
      className={`relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br ${accent} shadow-lg shadow-black/20`}
    >
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl"
        animate={
          reduceMotion
            ? {}
            : {
                boxShadow: [
                  "0 0 0px rgba(96,165,250,0)",
                  "0 0 24px rgba(96,165,250,0.18)",
                  "0 0 0px rgba(96,165,250,0)",
                ],
              }
        }
        transition={{
          duration: 3.5,
          repeat: reduceMotion ? 0 : Infinity,
          ease: "easeInOut",
          delay: index * 0.4,
        }}
      />

      <Icon
        size={26}
        strokeWidth={1.6}
        className="relative z-10 text-white transition-colors duration-300 group-hover:text-cyan-100"
      />
    </motion.div>
  );
}

function FoundationHighlight({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.4 }}
      transition={{
        duration: reduceMotion ? 0 : 0.7,
        ease: smoothEase,
      }}
      className="group/foundation relative mt-9 overflow-hidden rounded-2xl border border-blue-300/[0.14] bg-gradient-to-br from-blue-400/[0.09] via-white/[0.025] to-violet-400/[0.07] p-4 sm:p-5"
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -right-12 -top-16 h-36 w-36 rounded-full bg-blue-400/10 blur-3xl"
        animate={
          reduceMotion
            ? {}
            : {
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.9, 0.5],
              }
        }
        transition={{
          duration: 5,
          repeat: reduceMotion ? 0 : Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="relative flex items-center gap-3.5">
        <motion.div
          whileHover={reduceMotion ? undefined : { rotate: 8, scale: 1.07 }}
          className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-cyan-300/20 bg-gradient-to-br from-cyan-300/15 to-violet-400/15 text-cyan-200 shadow-[0_0_25px_rgba(96,165,250,0.1)]"
        >
          <motion.div
            aria-hidden="true"
            className="absolute inset-0 rounded-xl"
            animate={
              reduceMotion
                ? {}
                : {
                    boxShadow: [
                      "0 0 0px rgba(103,232,249,0)",
                      "0 0 22px rgba(103,232,249,0.2)",
                      "0 0 0px rgba(103,232,249,0)",
                    ],
                  }
            }
            transition={{
              duration: 3,
              repeat: reduceMotion ? 0 : Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.div
            animate={
              reduceMotion
                ? {}
                : {
                    y: [0, -2, 0],
                    rotate: [0, -4, 0],
                  }
            }
            transition={{
              duration: 3.8,
              repeat: reduceMotion ? 0 : Infinity,
              ease: "easeInOut",
            }}
          >
            <GraduationCap size={23} strokeWidth={1.7} />
          </motion.div>
        </motion.div>

        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-semibold tracking-tight text-white sm:text-base">
            Built on a strong foundation
          </h3>

          <p className="mt-1.5 text-xs leading-relaxed text-slate-400 sm:text-sm">
            Academic growth and lifelong learning
          </p>
        </div>

        <motion.div
          aria-hidden="true"
          className="hidden shrink-0 text-blue-300/70 sm:block"
          animate={
            reduceMotion
              ? {}
              : {
                  x: [0, 3, 0],
                  y: [0, -2, 0],
                }
          }
          transition={{
            duration: 3.5,
            repeat: reduceMotion ? 0 : Infinity,
            ease: "easeInOut",
          }}
        >
          <BookOpen size={19} strokeWidth={1.5} />
        </motion.div>
      </div>

      <div className="relative mt-4 h-px overflow-hidden bg-white/[0.06]">
        <motion.div
          className="h-full w-1/2 bg-gradient-to-r from-transparent via-cyan-300/70 to-violet-400/70"
          animate={reduceMotion ? {} : { x: ["-100%", "200%"] }}
          transition={{
            duration: 2.5,
            repeat: reduceMotion ? 0 : Infinity,
            repeatDelay: 1.5,
            ease: "easeInOut",
          }}
        />
      </div>
    </motion.div>
  );
}

export default function Education() {
  const prefersReducedMotion = useReducedMotion();
  const reduceMotion = prefersReducedMotion ?? false;

  const headingRef = useRef<HTMLDivElement>(null);

  const isHeadingInView = useInView(headingRef, {
    once: false,
    amount: 0.35,
  });

  return (
    <section
      id="education"
      aria-labelledby="education-heading"
      className="relative isolate overflow-clip bg-[#080b20] px-5 py-12 text-white sm:px-8 sm:py-16 lg:px-16 lg:py-20"
    >
      {/* Ambient background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <motion.div
          animate={
            reduceMotion
              ? {}
              : {
                  x: [0, 25, 0],
                  y: [0, -20, 0],
                  scale: [1, 1.08, 1],
                }
          }
          transition={{
            duration: 15,
            repeat: reduceMotion ? 0 : Infinity,
            ease: "easeInOut",
          }}
          className="absolute -left-40 top-20 h-[28rem] w-[28rem] rounded-full bg-blue-600/[0.09] blur-[120px]"
        />

        <motion.div
          animate={
            reduceMotion
              ? {}
              : {
                  x: [0, -20, 0],
                  y: [0, 25, 0],
                  scale: [1, 1.12, 1],
                }
          }
          transition={{
            duration: 18,
            repeat: reduceMotion ? 0 : Infinity,
            ease: "easeInOut",
          }}
          className="absolute -right-40 top-1/3 h-[30rem] w-[30rem] rounded-full bg-violet-600/[0.09] blur-[130px]"
        />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(148,163,184,0.9) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-violet-400/20 to-transparent" />
      </div>

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-start gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        {/* Sticky heading */}
        <div
          ref={headingRef}
          className="relative z-20 self-start lg:sticky lg:top-24"
        >
          <div className="pb-4 pt-2 text-left lg:py-12">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-blue-400 sm:text-sm">
              Education
            </p>

            <h2
              id="education-heading"
              className="overflow-visible pb-2 text-4xl font-bold leading-[1.12] tracking-tight sm:text-5xl lg:text-6xl"
            >
              My educational
              <br />
              <motion.span
                animate={
                  reduceMotion
                    ? {}
                    : {
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                      }
                }
                transition={{
                  duration: 8,
                  repeat: reduceMotion ? 0 : Infinity,
                  ease: "linear",
                }}
                style={{
                  ...headingShimmer,
                  color: "transparent",
                }}
              >
                journey
              </motion.span>
            </h2>

            <div className="mt-5 h-1 w-32 overflow-hidden rounded-full bg-white/[0.06] sm:w-36">
              <motion.div
                key={isHeadingInView ? "visible" : "hidden"}
                initial={{ scaleX: 0, opacity: 0 }}
                animate={
                  isHeadingInView
                    ? { scaleX: 1, opacity: 1 }
                    : { scaleX: 0, opacity: 0 }
                }
                transition={{
                  duration: reduceMotion ? 0 : 0.85,
                  ease: smoothEase,
                }}
                style={{ transformOrigin: "left center" }}
                className="relative h-full w-full overflow-hidden rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 shadow-[0_0_18px_rgba(96,165,250,0.4)]"
              >
                <motion.div
                  animate={
                    isHeadingInView && !reduceMotion
                      ? { x: ["-100%", "250%"] }
                      : { x: "-100%" }
                  }
                  transition={{
                    duration: 1.1,
                    ease: "easeInOut",
                    delay: 0.2,
                  }}
                  className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-white to-transparent"
                />
              </motion.div>
            </div>

            <motion.p
              initial={false}
              animate={
                isHeadingInView ? { opacity: 1, y: 0 } : { opacity: 0.7, y: 6 }
              }
              transition={{
                duration: reduceMotion ? 0 : 0.6,
                delay: reduceMotion ? 0 : 0.1,
                ease: smoothEase,
              }}
              className="mr-auto mt-6 max-w-xl text-sm leading-7 text-slate-400 sm:text-base sm:leading-8"
            >
              The foundation that shaped my journey into software engineering,
              cloud technology, and automation.
            </motion.p>

            <FoundationHighlight reduceMotion={reduceMotion} />
          </div>
        </div>

        {/* Education cards */}
        <div className="relative grid min-w-0 grid-cols-1 items-stretch gap-5 pb-4 pt-2 sm:grid-cols-2 lg:pt-0">
          {education.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.article
                key={item.qualification}
                initial={
                  reduceMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 35,
                        filter: "blur(8px)",
                      }
                }
                whileInView={{
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                }}
                viewport={{
                  once: false,
                  amount: 0.15,
                }}
                transition={{
                  duration: reduceMotion ? 0 : 0.75,
                  delay: reduceMotion ? 0 : index * 0.12,
                  ease: smoothEase,
                }}
                whileHover={
                  reduceMotion
                    ? undefined
                    : {
                        y: -6,
                        transition: {
                          duration: 0.3,
                          ease: smoothEase,
                        },
                      }
                }
                style={
                  {
                    "--card-glow": item.glow,
                  } as CSSProperties
                }
                className="group relative isolate flex h-full min-w-0 flex-col overflow-hidden rounded-3xl border border-white/[0.09] bg-gradient-to-br from-white/[0.075] via-white/[0.035] to-white/[0.015] p-6 shadow-[0_18px_60px_rgba(0,0,0,0.22)] backdrop-blur-xl transition-[border-color,box-shadow] duration-500 hover:border-blue-300/30 hover:shadow-[0_24px_80px_rgba(37,99,235,0.13)] sm:p-7"
              >
                {/* Ambient card glow */}
                <motion.div
                  aria-hidden="true"
                  className={`pointer-events-none absolute -right-20 -top-24 -z-10 h-64 w-64 rounded-full bg-gradient-to-br ${item.accent} opacity-[0.09] blur-3xl transition-opacity duration-700 group-hover:opacity-25`}
                  animate={
                    reduceMotion
                      ? {}
                      : {
                          scale: [1, 1.12, 1],
                          opacity: [0.06, 0.13, 0.06],
                        }
                  }
                  transition={{
                    duration: 6,
                    repeat: reduceMotion ? 0 : Infinity,
                    ease: "easeInOut",
                    delay: index * 0.4,
                  }}
                />

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(circle at 85% 10%, var(--card-glow), transparent 55%)",
                  }}
                />

                <div
                  aria-hidden="true"
                  className={`pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent ${item.accent} to-transparent opacity-50 transition-opacity duration-500 group-hover:opacity-100`}
                />

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/[0.025] transition-all duration-500 group-hover:ring-white/[0.07]"
                />

                {/* Academic icon and status */}
                <div className="relative flex items-start justify-between gap-3">
                  <AcademicIcon
                    icon={Icon}
                    accent={item.accent}
                    index={index}
                    reduceMotion={reduceMotion}
                  />

                  <motion.div
                    initial={false}
                    whileHover={reduceMotion ? undefined : { scale: 1.04 }}
                    className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/15 bg-emerald-400/[0.07] px-2.5 py-1.5"
                  >
                    <motion.span
                      animate={
                        reduceMotion
                          ? {}
                          : {
                              scale: [1, 1.18, 1],
                              opacity: [0.75, 1, 0.75],
                            }
                      }
                      transition={{
                        duration: 2.5,
                        repeat: reduceMotion ? 0 : Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <CheckCircle2 size={12} className="text-emerald-300" />
                    </motion.span>

                    <span className="text-[10px] font-medium tracking-wide text-emerald-200 sm:text-[11px]">
                      {item.status}
                    </span>
                  </motion.div>
                </div>

                {/* Dates */}
                <div className="mt-7 inline-flex w-fit items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.025] px-3 py-2 text-xs text-slate-400">
                  <CalendarDays size={14} className="text-blue-300" />
                  <span>{item.period}</span>
                </div>

                {/* Qualification: consistent title height */}
                <h3 className="mt-5 min-h-[3.5rem] text-xl font-semibold leading-snug tracking-tight text-white transition-colors duration-300 group-hover:text-blue-100 sm:min-h-[3.75rem] sm:text-[1.35rem]">
                  {item.qualification}
                </h3>

                {/* Institution: aligned across both cards */}
                <div className="mt-4 flex min-h-[4.5rem] min-w-0 items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.025] p-3 transition-colors duration-300 group-hover:border-blue-300/15 group-hover:bg-white/[0.04]">
                  <InstitutionLogo
                    src={item.logo}
                    alt={item.logoAlt}
                    fallback={item.logoFallback}
                    accent={item.accent}
                  />

                  <div className="flex min-w-0 flex-1 flex-col justify-center gap-1">
                    <p className="text-sm font-semibold leading-snug text-blue-200/95 transition-colors duration-300 group-hover:text-cyan-100">
                      {item.institution}
                    </p>

                    <div className="flex items-start gap-1.5 text-xs leading-relaxed text-slate-500">
                      <MapPin size={12} className="mt-0.5 shrink-0" />
                      <span>{item.location}</span>
                    </div>
                  </div>
                </div>

                {/* Description: consistent height and starting position */}
                <p className="mt-5 min-h-[7rem] text-sm leading-7 text-slate-400">
                  {item.description}
                </p>

                {/* Subjects: both headings and first tags align */}
                <div className="mt-6">
                  <p className="mb-3 min-h-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                    {index === 0 ? "Academic focus" : "Subjects"}
                  </p>

                  <div className="flex min-h-[4.5rem] content-start flex-wrap items-start gap-2">
                    {item.subjects.map((subject) => (
                      <motion.span
                        key={subject}
                        initial={false}
                        whileHover={
                          reduceMotion
                            ? undefined
                            : {
                                y: -2,
                                scale: 1.03,
                              }
                        }
                        transition={{ duration: 0.2 }}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.07] bg-white/[0.035] px-2.5 py-1.5 text-[10px] leading-relaxed text-slate-300 transition-colors duration-300 hover:border-blue-300/25 hover:bg-blue-400/[0.07] hover:text-blue-100 sm:text-[11px]"
                      >
                        <span
                          aria-hidden="true"
                          className={`h-1 w-1 shrink-0 rounded-full bg-gradient-to-r ${item.accent} opacity-80`}
                        />
                        {subject}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Qualification type */}
                <div className="mt-auto pt-7">
                  <div
                    className={`h-px w-full bg-gradient-to-r ${item.accent} opacity-20 transition-opacity duration-500 group-hover:opacity-70`}
                  />

                  <div className="mt-4 flex items-center gap-2.5">
                    <motion.span
                      aria-hidden="true"
                      animate={
                        reduceMotion
                          ? {}
                          : {
                              boxShadow: [
                                "0 0 0px rgba(96,165,250,0)",
                                "0 0 12px rgba(96,165,250,0.4)",
                                "0 0 0px rgba(96,165,250,0)",
                              ],
                            }
                      }
                      transition={{
                        duration: 3,
                        repeat: reduceMotion ? 0 : Infinity,
                        ease: "easeInOut",
                        delay: index * 0.5,
                      }}
                      className={`h-2 w-2 shrink-0 rounded-full bg-gradient-to-r ${item.accent}`}
                    />

                    <span
                      className={`bg-gradient-to-r ${item.accent} bg-clip-text text-[11px] font-semibold tracking-wide text-transparent sm:text-xs`}
                    >
                      {index === 0
                        ? "Undergraduate qualification"
                        : "Secondary education"}
                    </span>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
