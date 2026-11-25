import { motion, useReducedMotion } from "motion/react";

const projects = [
  {
    category: "Cloud engineering",
    title: "Amazon Connect Contact Centre Solution",
    client: "ABSA Group",
    description:
      "I contribute to contact flows, conversational experiences, and infrastructure configuration for ABSA Group’s cloud contact centre.",
    technologies: [
      "Amazon Connect",
      "Amazon Lex",
      "AWS",
      "Terraform",
      "JSON",
      "GitHub Actions",
    ],
    featured: true,
  },
  {
    category: "Enterprise software",
    title: "Internal Document & Records Management System",
    client: "IRIS",
    description:
      "I supported the organisation of business records and the digital document workflows used to manage them.",
    technologies: [
      "SharePoint",
      "Microsoft Power Platform",
      "Power Automate",
      "Enterprise Workflows",
    ],
  },
  {
    category: "Process automation",
    title: "Automated Quality Documentation",
    client: "AQD",
    description:
      "I worked on automating quality documentation workflows to reduce manual document handling.",
    technologies: [
      "Power Automate",
      "SharePoint",
      "Workflow Automation",
      "Document Management",
    ],
  },
];

const revealEase = [0.22, 1, 0.36, 1] as const;

const signalRoutes = [
  "M118 165H220",
  "M220 165V92H324",
  "M220 165V238H324",
  "M420 92H493V165",
  "M420 238H493V165",
];

function SystemMap() {
  return (
    <div className="relative min-w-0">
      <div className="mb-4 flex items-center justify-between border-b border-white/20 pb-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#a8bdd5] sm:text-xs">
        <span>System components</span>
        <span>Amazon Connect / AWS</span>
      </div>

      <svg
        data-scroll-system-map
        viewBox="0 0 600 330"
        role="img"
        aria-label="Diagram of Amazon Connect, Amazon Lex, AWS, Terraform and GitHub Actions"
        className="block h-auto w-full overflow-visible"
      >
        <defs>
          <pattern
            id="project-grid"
            width="24"
            height="24"
            patternUnits="userSpaceOnUse"
          >
            <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#9db4d0" strokeOpacity="0.1" strokeWidth="1" />
          </pattern>
        </defs>

        <rect width="600" height="330" fill="url(#project-grid)" />

        <g fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d={signalRoutes.join(" ")} stroke="#304d73" />
          {signalRoutes.map((route) => (
            <path
              key={route}
              data-scroll-signal
              d={route}
              pathLength={1}
              stroke="#4f91ff"
            />
          ))}
        </g>

        <circle
          data-scroll-junction
          cx="220"
          cy="165"
          r="5"
          fill="#4f91ff"
        />

        <g fill="#0a1b30" stroke="#7597c1" strokeWidth="1.25">
          <rect x="14" y="131" width="104" height="68" />
          <rect x="324" y="61" width="96" height="62" />
          <rect x="324" y="207" width="96" height="62" />
          <rect x="493" y="131" width="92" height="68" />
        </g>

        <g fill="#f4f8ff" fontFamily="DM Sans, sans-serif" textAnchor="middle">
          <text x="66" y="159" fontSize="10" fontWeight="600" letterSpacing="1.2">AMAZON</text>
          <text x="66" y="177" fontSize="14" fontWeight="700">Connect</text>
          <text x="372" y="88" fontSize="10" fontWeight="600" letterSpacing="1.2">CONVERSATION</text>
          <text x="372" y="106" fontSize="14" fontWeight="700">Amazon Lex</text>
          <text x="372" y="234" fontSize="10" fontWeight="600" letterSpacing="1.2">CLOUD PLATFORM</text>
          <text x="372" y="252" fontSize="14" fontWeight="700">AWS</text>
          <text x="539" y="159" fontSize="10" fontWeight="600" letterSpacing="1.2">DELIVERY</text>
          <text x="539" y="177" fontSize="12" fontWeight="700">IaC / CI</text>
        </g>

        <g fill="#8fa9c8" fontFamily="DM Sans, sans-serif" fontSize="10" letterSpacing="1.3">
          <text x="14" y="294">CONTACT FLOWS</text>
          <text x="324" y="294">INFRASTRUCTURE</text>
          <text x="493" y="294">TERRAFORM · GITHUB ACTIONS</text>
        </g>
      </svg>
      <p className="mt-3 text-xs leading-5 text-[#9db2cb]">
        A visual index of the platforms and delivery tools used in this work.
      </p>
    </div>
  );
}

function TechnologyList({ technologies }: { technologies: string[] }) {
  return (
    <ul
      aria-label="Technologies and tools"
      className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium leading-5 text-[#145ee8] sm:mt-6 sm:text-sm"
    >
      {technologies.map((technology, index) => (
        <li key={technology} className="inline-flex items-center gap-2">
          {index > 0 && (
            <span aria-hidden="true" className="text-[#8ca3bd]">
              ·
            </span>
          )}
          <span>{technology}</span>
        </li>
      ))}
    </ul>
  );
}

function Projects() {
  const shouldReduceMotion = useReducedMotion() ?? false;
  const featuredProject = projects[0];
  const additionalProjects = projects.slice(1);

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="portfolio-projects scroll-mt-24 bg-[#f3f7fc] text-[#0b1b30]"
    >
      <div className="mx-auto max-w-7xl px-5 pb-20 pt-20 sm:px-8 sm:pb-24 sm:pt-24 lg:px-12 lg:pb-28 lg:pt-28">
        <motion.header
          initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.6, ease: revealEase }}
          className="mb-10 border-b border-[#b9cbe0] pb-8 sm:mb-12 sm:pb-10"
        >
          <h2
            id="projects-heading"
            className="max-w-3xl text-4xl font-bold leading-[0.98] tracking-[-0.055em] sm:text-5xl lg:text-6xl"
          >
            Selected work
          </h2>
        </motion.header>

        <motion.article
          initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.16 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.65, ease: revealEase }}
          className="relative left-1/2 grid w-screen -translate-x-1/2 overflow-hidden bg-[#091a2e] text-white lg:grid-cols-[minmax(0,1fr)_minmax(400px,0.9fr)]"
        >
          <div className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-8 sm:py-14 lg:col-span-2 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(400px,0.9fr)] lg:gap-12 lg:px-12 lg:py-[4.5rem] xl:gap-20">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#76a9ff] sm:text-sm">
                {featuredProject.category}
              </p>
              <p className="mt-6 text-sm font-semibold text-[#b4c6dc] sm:text-base">
                {featuredProject.client}
              </p>
              <h3 className="mt-2 max-w-xl text-3xl font-bold leading-[1.04] tracking-[-0.045em] text-white sm:text-4xl lg:text-5xl">
                {featuredProject.title}
              </h3>
              <p className="mt-5 max-w-xl text-sm leading-7 text-[#c2d0df] sm:mt-6 sm:text-base sm:leading-8">
                <strong className="font-semibold text-white">My contribution. </strong>
                {featuredProject.description}
              </p>
              <TechnologyList technologies={featuredProject.technologies} />
            </div>

            <div className="mt-10 border-t border-white/20 pt-7 sm:mt-12 sm:pt-8 lg:mt-0 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
              <SystemMap />
            </div>
          </div>
        </motion.article>

        <div className="border-b border-[#b9cbe0]">
          {additionalProjects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.55,
                delay: shouldReduceMotion ? 0 : index * 0.08,
                ease: revealEase,
              }}
              className="grid gap-4 border-b border-[#c9d7e7] py-8 last:border-b-0 sm:py-10 lg:grid-cols-[minmax(180px,0.7fr)_minmax(0,1.8fr)_minmax(190px,0.8fr)] lg:gap-10 lg:py-11"
            >
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#145ee8]">
                  {project.category}
                </p>
                <p className="mt-2 text-sm font-semibold text-[#52677f]">
                  {project.client}
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold leading-snug tracking-[-0.035em] text-[#10243b] sm:text-2xl">
                  {project.title}
                </h3>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-[#30455d] sm:text-base sm:leading-7">
                  <strong className="font-semibold text-[#10243b]">My contribution. </strong>
                  {project.description}
                </p>
              </div>

              <div className="border-t border-[#d5dfeb] pt-4 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#52677f]">
                  Technologies
                </p>
                <TechnologyList technologies={project.technologies} />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
