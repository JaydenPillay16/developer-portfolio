import type { ReactNode } from "react";

import {
  SiPython,
  SiCplusplus,
  SiTypescript,
  SiReact,
  SiGit,
  SiGithub,
  SiCss,
} from "@icons-pack/react-simple-icons";

import { ChevronDown, Cloud, Code2, GitBranch, Workflow } from "lucide-react";

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
  skills: Skill[];
};

type TechnologyLogoProps = {
  src: string;
  alt: string;
  size?: number;
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
    icon: <Cloud aria-hidden="true" className="size-5" strokeWidth={1.5} />,
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
    icon: <Code2 aria-hidden="true" className="size-5" strokeWidth={1.5} />,
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
        icon: <SiCss aria-hidden="true" size={18} />,
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
    icon: <Workflow aria-hidden="true" className="size-5" strokeWidth={1.5} />,
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
    icon: <GitBranch aria-hidden="true" className="size-5" strokeWidth={1.5} />,
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
        iconColor: "text-blue-300",
        description:
          "Applying continuous integration and delivery practices to software changes.",
      },
    ],
  },
];

export default function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="skills-section relative bg-[#091a2e] text-[#f4f8ff]"
    >
      <span id="technologies" aria-hidden="true" className="absolute top-0 scroll-mt-24" />
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-28">
        <header
          data-scroll-reveal
          className="grid items-end gap-4 border-b border-[#35506e] pb-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12"
        >
          <h2
            id="skills-heading"
            className="text-[clamp(3rem,7vw,5rem)] font-bold leading-none tracking-[-0.06em]"
          >
            Skills<span aria-hidden="true" className="text-[#76a9ff]">.</span>
          </h2>
          <p className="max-w-xl text-base leading-7 text-[#bdcee3] sm:text-lg sm:leading-8">
            A growing toolkit across cloud engineering, software development,
            enterprise automation, and DevOps, focused on turning technical
            ideas into practical solutions.
          </p>
        </header>

        <div className="divide-y divide-[#35506e] border-b border-[#35506e]">
          {skillGroups.map((group) => (
            <details key={group.id} name="portfolio-skills" className="group">
              <summary className="skills-summary relative grid min-w-0 list-none gap-5 py-6 pl-1 pr-10 transition-colors hover:bg-white/[0.035] focus-visible:outline-offset-[-2px] sm:py-8 sm:pl-3 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12 lg:pr-14">
                <span className="flex min-w-0 items-start gap-3">
                  <span aria-hidden="true" className="mt-0.5 shrink-0 text-[#91baff]">
                    {group.icon}
                  </span>
                  <span className="min-w-0">
                    <span className="block font-[Space_Grotesk] text-xl font-bold leading-snug tracking-[-0.035em] sm:text-2xl">
                      {group.title}
                    </span>
                    <span className="mt-1 block text-sm leading-6 text-[#a9bed6]">
                      {group.subtitle}
                    </span>
                  </span>
                </span>
                <span className="min-w-0">
                  <span className="block text-sm leading-6 text-[#bdcee3]">
                    {group.description}
                  </span>
                  <span className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm font-semibold text-[#d6e6fa] group-open:hidden">
                    {group.skills.map((skill) => (
                      <span key={skill.name} className="inline-flex items-center gap-1.5">
                        <span aria-hidden="true" className={skill.iconColor}>{skill.icon}</span>
                        {skill.name}
                      </span>
                    ))}
                  </span>
                </span>
                <ChevronDown
                  aria-hidden="true"
                  className="absolute right-2 top-7 size-5 text-[#91baff] transition-transform group-open:rotate-180 motion-reduce:transition-none sm:top-9"
                />
              </summary>

              <ul
                role="list"
                className="grid gap-x-8 px-1 pb-6 sm:grid-cols-2 sm:px-3 sm:pb-8 lg:ml-[calc(42.5%+0.7rem)]"
              >
                {group.skills.map((skill) => (
                  <li key={skill.name} className="border-t border-[#304965] py-3.5">
                    <h3 className="flex items-center gap-2.5 text-base font-bold">
                      <span aria-hidden="true" className={skill.iconColor}>{skill.icon}</span>
                      {skill.name}
                    </h3>
                    <p className="mt-1.5 text-sm leading-6 text-[#bdcee3]">{skill.description}</p>
                    {skill.context && (
                      <p className="mt-1.5 text-xs font-semibold text-[#91baff]">{skill.context}</p>
                    )}
                  </li>
                ))}
              </ul>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
