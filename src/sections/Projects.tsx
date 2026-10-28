import { motion, useReducedMotion } from "motion/react";

const projects = [
  {
    number: "01",
    category: "CLOUD ENGINEERING",
    title: "Amazon Connect Contact Centre Solution",
    client: "ABSA Group",
    description:
      "Contributing to a cloud-based contact centre solution, working with contact flows, conversational experiences, and infrastructure configuration to support enterprise contact centre requirements.",
    technologies: [
      "Amazon Connect",
      "Amazon Lex",
      "AWS",
      "Terraform",
      "JSON",
      "GitHub Actions",
    ],
    accent: "from-blue-500 to-cyan-400",
    featured: true,
  },
  {
    number: "02",
    category: "ENTERPRISE SOFTWARE",
    title: "Internal Document & Records Management System",
    client: "IRIS",
    description:
      "Contributed to an internal document and records management system, supporting the organisation of business information and digital document workflows.",
    technologies: [
      "SharePoint",
      "Microsoft Power Platform",
      "Power Automate",
      "Enterprise Workflows",
    ],
    accent: "from-violet-500 to-purple-400",
    featured: false,
  },
  {
    number: "03",
    category: "PROCESS AUTOMATION",
    title: "Automated Quality Documentation",
    client: "AQD",
    description:
      "Worked on document-focused automation to help streamline quality documentation processes and reduce manual work within enterprise workflows.",
    technologies: [
      "Power Automate",
      "SharePoint",
      "Workflow Automation",
      "Document Management",
    ],
    accent: "from-fuchsia-500 to-pink-400",
    featured: false,
  },
];

const smoothEase = [0.22, 1, 0.36, 1] as const;

function Projects() {
  const shouldReduceMotion = useReducedMotion() ?? false;

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="relative isolate overflow-clip bg-[#080b20] px-6 py-20 text-white sm:px-10 sm:py-24 lg:px-16 lg:py-28"
    >
      {/* Subtle ambient background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-12rem] top-24 -z-10 h-96 w-96 rounded-full bg-blue-600/[0.06] blur-[120px]"
      />

      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-16">
        {/* Left heading column */}
        <div className="lg:sticky lg:top-24 lg:h-fit">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.65,
              ease: smoothEase,
            }}
          >
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300/80">
              Selected work
            </p>

            <h2
              id="projects-heading"
              className="max-w-xl text-4xl font-bold leading-[1.12] tracking-tight sm:text-5xl lg:text-6xl"
            >
              Projects I've{" "}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-violet-400 bg-clip-text text-transparent">
                worked on
              </span>
            </h2>

            <motion.div
              aria-hidden="true"
              initial={shouldReduceMotion ? false : { opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.75,
                delay: shouldReduceMotion ? 0 : 0.15,
                ease: smoothEase,
              }}
              className="relative mt-5 h-1 w-28 origin-left overflow-hidden rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 shadow-[0_0_16px_rgba(59,130,246,0.3)]"
            >
              {!shouldReduceMotion && (
                <motion.span
                  aria-hidden="true"
                  className="absolute inset-y-0 left-0 w-1/2 rounded-full bg-gradient-to-r from-transparent via-white to-transparent blur-[1px]"
                  animate={{ x: ["-100%", "250%"] }}
                  transition={{
                    duration: 1.6,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatDelay: 2,
                  }}
                />
              )}
            </motion.div>

            <motion.p
              initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.6,
                delay: shouldReduceMotion ? 0 : 0.2,
                ease: smoothEase,
              }}
              className="mt-6 max-w-md text-base leading-7 text-slate-400"
            >
              A selection of enterprise technology and automation work from my
              professional experience, highlighting the systems and tools behind
              the work.
            </motion.p>

            <div className="mt-8 flex items-center gap-3">
              <span
                aria-hidden="true"
                className="h-px w-8 bg-gradient-to-r from-cyan-400/70 to-blue-500/20"
              />
              <span className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                03 featured projects
              </span>
            </div>
          </motion.div>
        </div>

        {/* Right project column */}
        <div className="grid min-w-0 gap-5 sm:gap-6">
          {projects.map((project, index) => (
            <motion.article
              key={project.number}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.65,
                delay: shouldReduceMotion ? 0 : index * 0.1,
                ease: smoothEase,
              }}
              className={`group relative min-w-0 overflow-hidden rounded-2xl border border-white/[0.09] bg-gradient-to-br from-[#101831] via-[#0d142b] to-[#0b1024] transition-colors duration-300 hover:border-white/[0.18] ${
                project.featured ? "sm:p-8" : "sm:p-7"
              } p-6`}
            >
              {/* Fine accent line */}
              <div
                aria-hidden="true"
                className={`absolute left-0 top-0 h-px w-1/3 bg-gradient-to-r ${project.accent} opacity-70 transition-all duration-500 group-hover:w-2/3 group-hover:opacity-100`}
              />

              {/* Decorative glow, kept deliberately subtle */}
              <div
                aria-hidden="true"
                className={`pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full bg-gradient-to-br ${project.accent} opacity-[0.045] blur-3xl transition-opacity duration-300 group-hover:opacity-[0.09]`}
              />

              <div className="relative">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm text-slate-500">
                      {project.number}
                    </span>

                    <span
                      aria-hidden="true"
                      className="h-1 w-1 rounded-full bg-slate-600"
                    />

                    <span className="text-[10px] font-semibold tracking-[0.17em] text-slate-400 sm:text-[11px]">
                      {project.category}
                    </span>
                  </div>

                  {project.featured && (
                    <span className="rounded-full border border-cyan-300/15 bg-cyan-300/[0.06] px-2.5 py-1 text-[10px] font-medium tracking-wide text-cyan-200/90">
                      Featured
                    </span>
                  )}
                </div>

                <div className="mt-6 flex items-start gap-4">
                  <div
                    aria-hidden="true"
                    className={`mt-1 h-10 w-1 shrink-0 rounded-full bg-gradient-to-b ${project.accent} opacity-80`}
                  />

                  <div className="min-w-0">
                    <p className="text-sm font-medium text-blue-300">
                      {project.client}
                    </p>

                    <h3
                      className={`mt-2 font-semibold leading-snug tracking-tight text-white transition-colors duration-300 group-hover:text-cyan-50 ${
                        project.featured
                          ? "text-2xl sm:text-3xl"
                          : "text-xl sm:text-2xl"
                      }`}
                    >
                      {project.title}
                    </h3>
                  </div>
                </div>

                <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-400 sm:text-[15px]">
                  {project.description}
                </p>

                <div className="mt-6 border-t border-white/[0.07] pt-5">
                  <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Technologies & tools
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((technology) => (
                      <span
                        key={technology}
                        className="rounded-md border border-white/[0.08] bg-white/[0.025] px-2.5 py-1.5 text-xs text-slate-300 transition-colors duration-200 group-hover:border-white/[0.12]"
                      >
                        {technology}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-2 text-xs text-slate-500">
                  <span
                    aria-hidden="true"
                    className={`h-1.5 w-1.5 rounded-full bg-gradient-to-r ${project.accent}`}
                  />
                  Professional experience
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
