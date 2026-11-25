import { motion, useReducedMotion } from "motion/react";

const experiences = [
  {
    role: "Associate Software Engineer",
    company: "NTT DATA",
    period: "March 2026 to Present",
    location: "Bryanston, South Africa",
    description:
      "Contributing to cloud-based contact centre solutions and enterprise software development, with a focus on reliable integrations and maintainable implementations.",
    technologies: ["Amazon Connect", "AWS", "Amazon Lex", "Terraform", "JSON"],
    current: true,
  },
  {
    role: "Associate DevOps Engineer",
    company: "NTT DATA",
    period: "October 2025 to March 2026",
    location: "Bryanston, South Africa",
    description:
      "Worked with DevOps practices and delivery workflows, supporting automation and the deployment of software solutions through CI/CD processes.",
    technologies: ["GitHub Actions", "CI/CD", "AWS", "Terraform"],
    current: false,
  },
  {
    role: "Associate Software Developer",
    company: "NTT DATA",
    period: "May 2024 to October 2025",
    location: "Bryanston, South Africa",
    description:
      "Contributed to enterprise applications, document management solutions, and workflow automation using Microsoft technologies.",
    technologies: ["Power Apps", "Power Automate", "SharePoint", "SQL"],
    current: false,
  },
  {
    role: "Graduate Intern",
    company: "NTT DATA",
    period: "July 2023 to April 2024",
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

const revealEase = [0.22, 1, 0.36, 1] as const;

function Experience() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="experience-section scroll-mt-24 bg-[#f3f7fc] px-5 pb-20 text-[#0b1b30] sm:px-8 sm:pb-24 lg:px-12 lg:pb-28"
    >
      <div className="mx-auto max-w-7xl">
        <motion.header
          initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.6, ease: revealEase }}
          className="max-w-4xl pb-8 pt-20 sm:pb-10 sm:pt-24 lg:pb-12 lg:pt-28"
        >
          <h2
            id="experience-heading"
            className="max-w-3xl text-4xl font-bold leading-[0.98] tracking-[-0.055em] sm:text-5xl lg:text-6xl"
          >
            Professional experience
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-7 text-[#30455d] sm:mt-6 sm:text-lg sm:leading-8">
            Growing through different roles, building practical experience,
            and contributing to technology solutions for enterprise needs.
          </p>
        </motion.header>

        <div data-scroll-career className="relative ml-[5px] border-l border-[#9bb8da] sm:ml-[6px]">
          <div
            aria-hidden="true"
            data-scroll-career-line
            className="absolute -bottom-1 -top-1 left-[-1px] w-[2px] origin-top bg-[#1765f5]"
          />

          {experiences.map((experience, index) => (
            <motion.article
              key={`${experience.role}-${experience.period}`}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.55,
                delay: shouldReduceMotion ? 0 : index * 0.06,
                ease: revealEase,
              }}
              className="group relative grid gap-3 border-b border-[#c9d7e7] py-6 pl-7 last:border-b-0 sm:py-7 sm:pl-9 lg:grid-cols-[190px_minmax(0,1fr)] lg:gap-10 lg:py-8"
            >
              <span
                aria-hidden="true"
                className={`absolute left-[-6px] top-[30px] h-[11px] w-[11px] rounded-full border-2 border-[#1765f5] bg-[#f3f7fc] transition-colors duration-200 group-hover:bg-[#1765f5] ${
                  experience.current ? "!bg-[#1765f5]" : ""
                }`}
              />

              <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 lg:block">
                <p
                  className={`text-sm font-bold tracking-[-0.01em] sm:text-base ${
                    experience.current ? "text-[#145ee8]" : "text-[#142b45]"
                  }`}
                >
                  <time>{experience.period}</time>
                </p>
                <p className="text-sm leading-6 text-[#5b6e83] lg:mt-2">
                  {experience.location}
                </p>
              </div>

              <div className="min-w-0 border-l border-[#c9d7e7] pl-4 sm:pl-5">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                  <h3
                    className={`text-lg font-bold leading-snug tracking-[-0.035em] sm:text-xl ${
                      experience.current ? "text-[#145ee8]" : "text-[#10243b]"
                    }`}
                  >
                    {experience.role}
                  </h3>
                  <img
                    src="/images/companies/ntt-data.svg"
                    alt={experience.company}
                    width="112"
                    height="23"
                    loading="lazy"
                    decoding="async"
                    className="h-[18px] w-[88px] shrink-0 object-contain object-left brightness-0 sm:object-right"
                  />
                </div>

                <p className="mt-3 max-w-3xl text-sm leading-6 text-[#30455d] sm:text-base sm:leading-7">
                  {experience.description}
                </p>

                <ul
                  aria-label="Technologies used"
                  className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium leading-5 text-[#145ee8] sm:mt-4 sm:text-sm"
                >
                  {experience.technologies.map((technology, technologyIndex) => (
                    <li key={technology} className="inline-flex items-center gap-2">
                      {technologyIndex > 0 && (
                        <span aria-hidden="true" className="text-[#8ca3bd]">
                          ·
                        </span>
                      )}
                      <span>{technology}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Experience;
