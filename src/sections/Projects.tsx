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
        <div className="relative grid min-w-0 gap-5 sm:gap-6 lg:gap-7">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-8 left-4 top-8 hidden w-px bg-gradient-to-b from-cyan-300/30 via-blue-400/15 to-violet-400/25 sm:block"
          />
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
              whileHover={
                shouldReduceMotion
                  ? undefined
                  : {
                      y: -5,
                      borderColor: project.featured
                        ? "rgba(103,232,249,0.38)"
                        : "rgba(167,139,250,0.32)",
                      boxShadow: project.featured
                        ? "0 24px 70px rgba(0,0,0,0.34), 0 0 36px rgba(34,211,238,0.10)"
                        : "0 24px 70px rgba(0,0,0,0.34), 0 0 36px rgba(129,140,248,0.10)",
                    }
              }
              className={`group relative min-w-0 overflow-hidden rounded-2xl border border-white/[0.09] bg-gradient-to-br from-[#131d37] via-[#0e162e] to-[#090f22] shadow-[0_16px_45px_rgba(0,0,0,0.16)] transition-[border-color,box-shadow] duration-300 hover:border-white/[0.2] ${
                project.featured ? "sm:p-8" : "sm:p-7"
              } p-6`}
            >
              {/* Fine accent line */}
              <div
                aria-hidden="true"
                className={`absolute left-8 right-8 top-0 h-px origin-left scale-x-50 bg-gradient-to-r ${project.accent} opacity-70 transition-[transform,opacity] duration-500 group-hover:scale-x-100 group-hover:opacity-100`}
              />

              {/* Soft color wash that appears on hover */}
              <div
                aria-hidden="true"
                className={`pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-gradient-to-br ${project.accent} opacity-[0.045] blur-[90px] transition-opacity duration-500 group-hover:opacity-[0.13]`}
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(ellipse_at_15%_0%,rgba(255,255,255,0.055),transparent_45%)] opacity-70"
              />

              <div className="relative z-10">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-md border border-white/[0.08] bg-white/[0.035] px-1.5 font-mono text-[11px] font-medium text-slate-400">
                      {project.number}
                    </span>

                    <span
                      aria-hidden="true"
                      className="h-1 w-1 rounded-full bg-slate-600"
                    />

                    <span className="text-[10px] font-semibold tracking-[0.19em] text-slate-400 sm:text-[11px]">
                      {project.category}
                    </span>
                  </div>

                  {project.featured && (
                    <span className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/[0.07] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-cyan-200">
                      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_rgba(103,232,249,0.8)]" />
                      Featured work
                    </span>
                  )}
                </div>

                <div className="mt-6 flex items-start gap-4 sm:mt-7">
                  <div
                    aria-hidden="true"
                    className={`mt-1 h-12 w-1 shrink-0 rounded-full bg-gradient-to-b ${project.accent} opacity-80 shadow-[0_0_16px_rgba(96,165,250,0.2)] transition-all duration-300 group-hover:h-14 group-hover:opacity-100`}
                  />

                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-blue-300 sm:text-sm sm:normal-case sm:tracking-normal">
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

                <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-300/80 sm:text-[15px] sm:leading-8">
                  {project.description}
                </p>

                <div className="mt-6 border-t border-white/[0.08] pt-5 sm:mt-7 sm:pt-6">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                      Technologies & tools
                    </p>
                    <span aria-hidden="true" className="h-px w-10 bg-gradient-to-r from-white/10 to-transparent" />
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((technology, techIndex) => (
                      <motion.span
                        key={technology}
                        initial={shouldReduceMotion ? false : { opacity: 0, y: 5 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{
                          duration: shouldReduceMotion ? 0 : 0.35,
                          delay: shouldReduceMotion ? 0 : index * 0.08 + techIndex * 0.035,
                          ease: smoothEase,
                        }}
                        className="inline-flex items-center gap-2 rounded-lg border border-white/[0.085] bg-[#080d1d]/55 px-2.5 py-1.5 text-xs font-medium text-slate-300 transition-[border-color,background-color,color,transform] duration-200 group-hover:border-white/[0.12] hover:-translate-y-0.5 hover:border-cyan-300/25 hover:bg-white/[0.055] hover:text-white"
                      >
                        <span aria-hidden="true" className={`h-1 w-1 rounded-full bg-gradient-to-r ${project.accent} opacity-80`} />
                        {technology}
                      </motion.span>
                    ))}
                  </div>
                </div>

                <div className="mt-5 flex items-center gap-2.5 text-xs text-slate-500 sm:mt-6">
                  <span
                    aria-hidden="true"
                    className={`h-1.5 w-1.5 rounded-full bg-gradient-to-r ${project.accent} shadow-[0_0_8px_rgba(34,211,238,0.35)]`}
                  />
                  <span className="tracking-wide">Professional experience</span>
                  <span aria-hidden="true" className="ml-auto h-px w-8 bg-white/[0.08]" />
                  <span className="font-mono text-[10px] text-slate-600">{project.number} / 03</span>
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
