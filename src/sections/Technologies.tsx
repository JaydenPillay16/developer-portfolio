import { useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

import {
  SiPython,
  SiCplusplus,
  SiTypescript,
  SiReact,
  SiGit,
  SiGithub,
} from "@icons-pack/react-simple-icons";

import { ArrowDownRight, ChevronDown, GitBranch, Zap } from "lucide-react";

type Skill = {
  name: string;
  icon: ReactNode;
  iconColor: string;
  description: string;
  context?: string;
};

type SkillGroup = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: ReactNode;
  iconColor: string;
  accent: string;
  glow: string;
  skills: Skill[];
};

type TechnologyLogoProps = {
  src: string;
  alt: string;
  size?: number;
};

const smoothEase = [0.22, 1, 0.36, 1] as const;

const headingShimmer = {
  backgroundImage:
    "linear-gradient(100deg, #67e8f9 0%, #60a5fa 25%, #a78bfa 45%, #67e8f9 60%, #60a5fa 80%, #a78bfa 100%)",
  backgroundSize: "250% 100%",
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
};

function TechnologyLogo({ src, alt, size = 18 }: TechnologyLogoProps) {
  return (
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      loading="lazy"
      className="shrink-0 object-contain"
    />
  );
}

const skillGroups: SkillGroup[] = [
  {
    id: "cloud",
    title: "Cloud & AWS Services",
    subtitle: "Cloud solutions and serverless foundations",
    description:
      "Building cloud-based solutions and exploring AWS services for automation, application integration, and contact centre experiences.",
    icon: (
      <img
        src="/images/categories/cloud-aws.png"
        alt="Cloud and AWS Services"
        className="h-14 w-14 object-contain"
      />
    ),
    iconColor: "text-sky-300",
    accent: "from-sky-400 to-blue-500",
    glow: "bg-sky-500/10",
    skills: [
      {
        name: "AWS",
        icon: <TechnologyLogo src="/images/technologies/aws.svg" alt="AWS" />,
        iconColor: "text-orange-400",
        description:
          "Working with AWS services to build and support cloud-based solutions.",
      },
      {
        name: "Amazon Connect",
        icon: (
          <TechnologyLogo
            src="/images/technologies/Connect.svg"
            alt="Amazon Connect"
          />
        ),
        iconColor: "text-sky-300",
        description:
          "Contributing to cloud contact centre solutions, including contact flow development.",
        context: "Professional experience",
      },
      {
        name: "Amazon Lex",
        icon: (
          <TechnologyLogo
            src="/images/technologies/amazon-lex.svg"
            alt="Amazon Lex"
          />
        ),
        iconColor: "text-orange-400",
        description:
          "Building conversational AI chatbots and integrating natural language understanding into Amazon Connect contact centre solutions.",
      },
      {
        name: "AWS Lambda",
        icon: (
          <TechnologyLogo
            src="/images/technologies/aws-lambda.svg"
            alt="AWS Lambda"
          />
        ),
        iconColor: "text-orange-300",
        description:
          "Using serverless functions to run application logic and automation.",
      },
      {
        name: "Amazon DynamoDB",
        icon: (
          <TechnologyLogo
            src="/images/technologies/dynamodb.svg"
            alt="Amazon DynamoDB"
          />
        ),
        iconColor: "text-blue-300",
        description:
          "Using a NoSQL database to store and query application data.",
      },
    ],
  },
  {
    id: "programming",
    title: "Programming & Development",
    subtitle: "Languages, interfaces and applications",
    description:
      "A development foundation spanning programming languages, database queries, and modern frontend development.",
    icon: (
      <img
        src="/images/categories/programming.png"
        alt="Programming and Development"
        className="h-14 w-14 object-contain"
      />
    ),
    iconColor: "text-purple-300",
    accent: "from-purple-400 to-violet-500",
    glow: "bg-purple-500/10",
    skills: [
      {
        name: "Python",
        icon: <SiPython size={18} />,
        iconColor: "text-yellow-300",
        description:
          "Writing scripts and application logic, including AWS Lambda functions.",
      },
      {
        name: "Java",
        icon: (
          <TechnologyLogo src="/images/technologies/java-dark.svg" alt="Java" />
        ),
        iconColor: "text-orange-300",
        description:
          "Applying object-oriented programming fundamentals and application development concepts.",
      },
      {
        name: "C++",
        icon: <SiCplusplus size={18} />,
        iconColor: "text-blue-300",
        description:
          "Working with a compiled language and core programming concepts.",
      },
      {
        name: "SQL",
        icon: (
          <TechnologyLogo
            src="/images/technologies/mysql.svg"
            alt="MySQL and SQL"
          />
        ),
        iconColor: "text-sky-300",
        description: "Querying and working with structured relational data.",
      },
      {
        name: "TypeScript",
        icon: <SiTypescript size={18} />,
        iconColor: "text-blue-400",
        description:
          "Building typed JavaScript applications with clearer data contracts.",
      },
      {
        name: "React",
        icon: <SiReact size={18} />,
        iconColor: "text-cyan-300",
        description:
          "Building reusable components and interactive user interfaces.",
      },
      {
        name: "HTML",
        icon: (
          <TechnologyLogo src="/images/technologies/html.svg" alt="HTML5" />
        ),
        iconColor: "text-orange-400",
        description: "Structuring accessible, semantic web content.",
      },
      {
        name: "CSS",
        icon: <TechnologyLogo src="/images/technologies/css.png" alt="CSS3" />,
        iconColor: "text-blue-300",
        description:
          "Creating responsive layouts, visual styling, and interface details.",
      },
    ],
  },
  {
    id: "automation",
    title: "Automation & Enterprise Platforms",
    subtitle: "Business process automation and collaboration",
    description:
      "Using enterprise platforms to streamline processes, automate repetitive work, and support document-driven business workflows.",
    icon: (
      <img
        src="/images/categories/automation.png"
        alt="Automation and Enterprise Platforms"
        className="h-9 w-9 object-contain"
      />
    ),
    iconColor: "text-emerald-300",
    accent: "from-emerald-400 to-teal-500",
    glow: "bg-emerald-500/10",
    skills: [
      {
        name: "Microsoft Power Platform",
        icon: (
          <TechnologyLogo
            src="/images/technologies/power-platform.png"
            alt="Microsoft Power Platform"
          />
        ),
        iconColor: "text-yellow-300",
        description:
          "Developing business solutions with Microsoft's low-code platform.",
      },
      {
        name: "Power Apps",
        icon: (
          <TechnologyLogo
            src="/images/technologies/power-apps.png"
            alt="Microsoft Power Apps"
          />
        ),
        iconColor: "text-purple-300",
        description:
          "Building low-code business applications and data-driven user interfaces.",
      },
      {
        name: "Power Automate RPA",
        icon: (
          <TechnologyLogo
            src="/images/technologies/power-automate.svg"
            alt="Microsoft Power Automate"
          />
        ),
        iconColor: "text-emerald-300",
        description:
          "Automating repetitive tasks and supporting business process workflows.",
      },
      {
        name: "SharePoint Online",
        icon: (
          <TechnologyLogo
            src="/images/technologies/sharepoint.svg"
            alt="Microsoft SharePoint"
          />
        ),
        iconColor: "text-sky-300",
        description:
          "Working with SharePoint-based solutions, lists, and enterprise document workflows.",
      },
    ],
  },
  {
    id: "devops",
    title: "DevOps & Infrastructure",
    subtitle: "Version control, automation and repeatable delivery",
    description:
      "Supporting collaborative development and deployment workflows, with experience in infrastructure as code and CI/CD practices.",
    icon: (
      <img
        src="/images/categories/devops.png"
        alt="DevOps and Infrastructure"
        className="h-9 w-9 object-contain"
      />
    ),
    iconColor: "text-orange-300",
    accent: "from-orange-400 to-red-500",
    glow: "bg-orange-500/10",
    skills: [
      {
        name: "Terraform",
        icon: (
          <TechnologyLogo
            src="/images/technologies/terraform-light.svg"
            alt="Terraform"
          />
        ),
        iconColor: "text-purple-400",
        description:
          "Managing infrastructure as code to provision and configure AWS resources consistently and efficiently.",
      },
      {
        name: "Git",
        icon: <SiGit size={18} />,
        iconColor: "text-orange-400",
        description: "Managing code changes through version control.",
      },
      {
        name: "GitHub",
        icon: <SiGithub size={18} />,
        iconColor: "text-slate-100",
        description:
          "Hosting repositories and collaborating on software projects.",
      },
      {
        name: "GitHub Actions",
        icon: (
          <TechnologyLogo
            src="/images/technologies/githubactions.svg"
            alt="GitHub Actions"
          />
        ),
        iconColor: "text-blue-300",
        description:
          "Working with automated workflows for build and delivery pipelines.",
      },
      {
        name: "CI/CD",
        icon: <GitBranch size={18} />,
        iconColor: "text-pink-300",
        description:
          "Applying continuous integration and delivery practices to software changes.",
      },
    ],
  },
];

const cardAccents: Record<
  string,
  {
    border: string;
    glow: string;
    sweep: string;
    hoverShadow: string;
    iconGlow: string;
  }
> = {
  cloud: {
    border: "rgba(56,189,248,0.7)",
    glow: "rgba(14,165,233,0.15)",
    sweep: "rgba(125,211,252,0.22)",
    hoverShadow: "0 18px 55px rgba(14,165,233,0.10)",
    iconGlow: "rgba(56,189,248,0.20)",
  },
  programming: {
    border: "rgba(167,139,250,0.75)",
    glow: "rgba(139,92,246,0.16)",
    sweep: "rgba(196,181,253,0.24)",
    hoverShadow: "0 18px 55px rgba(139,92,246,0.11)",
    iconGlow: "rgba(167,139,250,0.22)",
  },
  automation: {
    border: "rgba(52,211,153,0.7)",
    glow: "rgba(16,185,129,0.15)",
    sweep: "rgba(110,231,183,0.22)",
    hoverShadow: "0 18px 55px rgba(16,185,129,0.09)",
    iconGlow: "rgba(52,211,153,0.20)",
  },
  devops: {
    border: "rgba(251,146,60,0.72)",
    glow: "rgba(249,115,22,0.15)",
    sweep: "rgba(253,186,116,0.22)",
    hoverShadow: "0 18px 55px rgba(249,115,22,0.09)",
    iconGlow: "rgba(251,146,60,0.20)",
  },
};

function SkillBadge({ skill, index }: { skill: Skill; index: number }) {
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: reduceMotion ? 0 : 0.4,
        delay: reduceMotion ? 0 : index * 0.045,
        ease: smoothEase,
      }}
      whileHover={reduceMotion ? undefined : { y: -3, scale: 1.01 }}
      className="group/skill relative flex items-start gap-3 overflow-hidden rounded-xl border border-white/[0.07] bg-[#0b1022] p-3.5 transition-[border-color,background-color,box-shadow] duration-300 hover:border-violet-400/25 hover:bg-[#11182e] hover:shadow-lg hover:shadow-violet-500/[0.06]"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-violet-400/[0.045] via-transparent to-cyan-400/[0.025] opacity-0 transition-opacity duration-300 group-hover/skill:opacity-100" />

      <motion.span
        whileHover={reduceMotion ? undefined : { rotate: 4, scale: 1.06 }}
        className={`relative mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.035] ${skill.iconColor} transition-all duration-300 group-hover/skill:border-violet-400/20 group-hover/skill:bg-white/[0.07] group-hover/skill:shadow-[0_0_18px_rgba(139,92,246,0.12)]`}
      >
        {skill.icon}
      </motion.span>

      <div className="relative min-w-0 flex-1">
        <p className="text-sm font-medium text-slate-200 transition-colors duration-300 group-hover/skill:text-white">
          {skill.name}
        </p>

        <p className="mt-1.5 text-xs leading-relaxed text-slate-400">
          {skill.description}
        </p>

        {skill.context && (
          <span className="mt-2.5 inline-flex items-center gap-1.5 rounded-full border border-sky-400/15 bg-sky-400/[0.06] px-2 py-1 text-[9px] font-medium uppercase tracking-wider text-sky-300">
            <span className="h-1 w-1 rounded-full bg-sky-400" />
            {skill.context}
          </span>
        )}
      </div>
    </motion.div>
  );
}

function SkillCard({
  group,
  index,
  expanded,
  onToggle,
}: {
  group: SkillGroup;
  index: number;
  expanded: boolean;
  onToggle: () => void;
}) {
  const reduceMotion = useReducedMotion() ?? false;
  const accent = cardAccents[group.id] ?? cardAccents.programming;

  return (
    <motion.article
      initial={
        reduceMotion
          ? false
          : { opacity: 0.25, y: 42, scale: 0.97, filter: "blur(5px)" }
      }
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        borderColor: accent.border,
        boxShadow: `0 0 0 1px ${accent.glow}, 0 20px 65px rgba(0,0,0,0.25)`,
      }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: reduceMotion ? 0 : 0.8,
        delay: reduceMotion ? 0 : 0.16 + index * 0.13,
        ease: smoothEase,
      }}
      whileHover={
        reduceMotion
          ? undefined
          : {
              y: -5,
              scale: 1.008,
              boxShadow: accent.hoverShadow,
              transition: { duration: 0.25 },
            }
      }
      className={`group relative isolate overflow-hidden rounded-2xl border bg-gradient-to-br from-slate-800/80 via-[#10172d]/95 to-[#080D1C] transition-colors duration-300 ${
        expanded ? "border-white/[0.18]" : "border-white/[0.08]"
      }`}
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-24 -z-10 h-64 w-64 rounded-full blur-[85px]"
        style={{ backgroundColor: accent.glow }}
        animate={
          reduceMotion
            ? undefined
            : {
                opacity: expanded ? [0.65, 0.9, 0.65] : [0.25, 0.5, 0.25],
                scale: expanded ? [1, 1.12, 1] : [1, 1.06, 1],
              }
        }
        transition={{
          duration: 5,
          repeat: reduceMotion ? 0 : Infinity,
          ease: "easeInOut",
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${accent.border}, transparent)`,
        }}
      />

      {!reduceMotion && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-0 w-1/2 skew-x-[-18deg]"
          style={{
            background: `linear-gradient(90deg, transparent, ${accent.sweep}, transparent)`,
          }}
          initial={{ x: "-150%", opacity: 0 }}
          whileInView={{ x: "300%", opacity: [0, 1, 0] }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{
            duration: 1.25,
            delay: 0.2 + index * 0.13,
            ease: "easeInOut",
          }}
        />
      )}

      <button
        type="button"
        onClick={onToggle}
        aria-expanded={expanded}
        aria-controls={`skills-${group.id}`}
        className="relative z-10 w-full p-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-violet-400 sm:p-6"
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3.5 sm:gap-4">
            <motion.span
              animate={
                reduceMotion
                  ? undefined
                  : {
                      boxShadow: expanded
                        ? `0 0 24px ${accent.iconGlow}`
                        : `0 0 0px ${accent.iconGlow}`,
                    }
              }
              transition={{ duration: 0.35 }}
              className={`relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/[0.09] bg-gradient-to-br ${group.accent} ${group.iconColor} transition-all duration-300 group-hover:border-white/[0.18]`}
            >
              {group.icon}
            </motion.span>

            <div className="min-w-0">
              <h3 className="text-base font-semibold tracking-tight text-white sm:text-lg">
                {group.title}
              </h3>

              <p className="mt-1 text-xs leading-relaxed text-slate-400 sm:text-sm">
                {group.subtitle}
              </p>
            </div>
          </div>

          <motion.span
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{
              duration: reduceMotion ? 0 : 0.3,
              ease: "easeInOut",
            }}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 text-slate-400 transition-colors duration-300 group-hover:border-white/20 group-hover:text-white"
          >
            <ChevronDown size={17} />
          </motion.span>
        </div>

        <p className="mt-5 text-sm leading-relaxed text-slate-400">
          {group.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {group.skills.map((skill) => (
            <span
              key={skill.name}
              className="inline-flex items-center gap-2 rounded-lg border border-white/[0.07] bg-white/[0.025] px-2.5 py-1.5 text-xs text-slate-300 transition-all duration-300 group-hover:border-white/[0.1] group-hover:bg-white/[0.04]"
            >
              <span className={skill.iconColor}>{skill.icon}</span>
              {skill.name}
            </span>
          ))}
        </div>

        <div className="mt-5 flex items-center gap-2 text-xs font-medium text-violet-300 transition-colors group-hover:text-violet-200">
          {expanded ? "Hide skill details" : "Explore skill details"}

          <ArrowDownRight
            size={15}
            className={`transition-transform duration-300 ${
              expanded
                ? "-rotate-90"
                : "group-hover:translate-x-0.5 group-hover:translate-y-0.5"
            }`}
          />
        </div>
      </button>

      <motion.div
        id={`skills-${group.id}`}
        initial={false}
        animate={{
          height: expanded ? "auto" : 0,
          opacity: expanded ? 1 : 0,
        }}
        transition={{
          duration: reduceMotion ? 0 : 0.35,
          ease: "easeInOut",
        }}
        className="relative z-10 overflow-hidden"
        aria-hidden={!expanded}
        inert={!expanded}
      >
        <div className="relative border-t border-white/[0.08] p-5 sm:p-6">
          <div
            className={`pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r ${group.accent} opacity-50`}
          />

          <div className="mb-5 flex items-center gap-2.5">
            <span
              className={`flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.035] ${group.iconColor}`}
            >
              <Zap size={15} />
            </span>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-200">
                Skills & experience
              </h4>
              <p className="mt-1 text-xs text-slate-500">
                Technologies and how I use them
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {group.skills.map((skill, skillIndex) => (
              <SkillBadge key={skill.name} skill={skill} index={skillIndex} />
            ))}
          </div>
        </div>
      </motion.div>
    </motion.article>
  );
}

export default function Technologies() {
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);
  const reduceMotion = useReducedMotion() ?? false;

  const toggleGroup = (id: string) => {
    setExpandedGroup((current) => (current === id ? null : id));
  };

  return (
    <section
      id="technologies"
      aria-labelledby="technologies-heading"
      className="relative isolate overflow-clip bg-[#080b20] px-6 pt-8 text-white sm:px-10 sm:pt-12 lg:px-16 lg:pt-16"
    >
      {/* Ambient background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <motion.div
          className="absolute -left-40 top-40 h-96 w-96 rounded-full bg-cyan-600/[0.07] blur-[120px]"
          animate={
            reduceMotion
              ? undefined
              : {
                  x: [0, 30, 0],
                  y: [0, 20, 0],
                }
          }
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute -right-40 top-1/2 h-96 w-96 rounded-full bg-violet-600/[0.07] blur-[120px]"
          animate={
            reduceMotion
              ? undefined
              : {
                  x: [0, -25, 0],
                  y: [0, 30, 0],
                }
          }
          transition={{
            duration: 19,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="absolute inset-0 bg-[radial-gradient(rgba(148,163,184,0.12)_0.7px,transparent_0.7px)] [background-size:26px_26px] opacity-[0.12]" />
      </div>

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-start gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        {/* Sticky heading */}
        <div className="relative z-20 self-start lg:sticky lg:top-24">
          <div className="pb-6 pt-10 text-left sm:pt-12 lg:py-16">
            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{
                duration: reduceMotion ? 0 : 0.6,
                ease: smoothEase,
              }}
              className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-blue-400 sm:text-sm"
            >
              Technical capabilities
            </motion.p>

            <motion.h2
              id="technologies-heading"
              initial={
                reduceMotion
                  ? false
                  : { opacity: 0, y: 26, filter: "blur(5px)" }
              }
              whileInView={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
              }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{
                duration: reduceMotion ? 0 : 0.9,
                ease: smoothEase,
              }}
              className="overflow-visible pb-2 text-4xl font-bold leading-[1.12] tracking-tight sm:text-5xl lg:text-6xl"
            >
              Built on{" "}
              <motion.span
                className="inline-block bg-clip-text pb-1 text-transparent"
                style={headingShimmer}
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                      }
                }
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                curiosity
              </motion.span>
              <br />
              <motion.span
                className="inline-block bg-clip-text pb-1 text-transparent"
                style={headingShimmer}
                animate={
                  reduceMotion
                    ? undefined
                    : { backgroundPosition: ["0% 50%", "100% 50%"] }
                }
                transition={
                  reduceMotion
                    ? undefined
                    : {
                        duration: 4.5,
                        ease: "linear",
                        repeat: Infinity,
                        repeatType: "reverse",
                      }
                }
              >
                Driven by technology
              </motion.span>
            </motion.h2>

            {/* Animated underline */}
            <motion.div
              aria-hidden="true"
              initial={reduceMotion ? false : { opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: reduceMotion ? 0 : 0.85,
                delay: reduceMotion ? 0 : 0.15,
                ease: smoothEase,
              }}
              className="relative mr-auto mt-6 h-1 w-32 origin-left overflow-hidden rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 shadow-[0_0_18px_rgba(96,165,250,0.4)]"
            >
              {!reduceMotion && (
                <motion.span
                  className="absolute inset-y-0 left-0 w-1/2 rounded-full bg-gradient-to-r from-transparent via-white to-transparent"
                  initial={{ x: "-100%" }}
                  whileInView={{ x: "250%" }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{
                    duration: 1.1,
                    ease: "easeInOut",
                    delay: 0.3,
                  }}
                />
              )}
            </motion.div>

            {/* Description follows the heading */}
            <motion.p
              initial={
                reduceMotion
                  ? false
                  : { opacity: 0, y: 22, filter: "blur(4px)" }
              }
              whileInView={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
              }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{
                duration: reduceMotion ? 0 : 0.85,
                delay: reduceMotion ? 0 : 0.2,
                ease: smoothEase,
              }}
              className="mr-auto mt-6 max-w-xl text-sm leading-7 text-slate-400 sm:text-base sm:leading-8"
            >
              A growing toolkit across cloud engineering, software development,
              enterprise automation, and DevOps - focused on turning technical
              ideas into practical solutions.
            </motion.p>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: reduceMotion ? 0 : 0.65,
                delay: reduceMotion ? 0 : 0.35,
                ease: smoothEase,
              }}
              className="mt-8 hidden items-center gap-3 lg:flex"
            >
              <span className="h-px w-8 bg-cyan-400/60" />
              <span className="text-xs font-medium tracking-[0.3em] text-slate-500">
                CLOUD · DEVELOPMENT · AUTOMATION
              </span>
            </motion.div>
          </div>
        </div>

        {/* Technology cards */}
        <div className="relative min-w-0 space-y-5 pb-12 pt-4 sm:pt-8 lg:pt-16">
          {skillGroups.map((group, index) => (
            <SkillCard
              key={group.id}
              group={group}
              index={index}
              expanded={expandedGroup === group.id}
              onToggle={() => toggleGroup(group.id)}
            />
          ))}
        </div>
      </div>

      {/* Closing transition */}
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{
          duration: reduceMotion ? 0 : 0.7,
          ease: smoothEase,
        }}
        className="relative mx-auto mt-12 max-w-7xl border-t border-white/[0.07] pb-10 pt-8 sm:mt-16 sm:pt-10"
      >
        <div className="flex flex-col items-center justify-center gap-3 text-center sm:flex-row sm:gap-4">
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-500 sm:text-xs">
            Always learning
          </span>

          <span
            aria-hidden="true"
            className="hidden h-px w-8 bg-gradient-to-r from-cyan-400/60 to-violet-400/60 sm:block"
          />

          <span className="text-xs text-slate-400 sm:text-sm">
            Building, exploring, and improving with every project.
          </span>
        </div>
      </motion.div>
    </section>
  );
}
