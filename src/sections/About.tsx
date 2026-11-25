import { Workflow } from "lucide-react";

const highlights = [
  {
    title: "Creative",
    description:
      "I look beyond the obvious, explore different perspectives, and find thoughtful ways to turn ideas into practical solutions.",
  },
  {
    title: "Curious",
    description:
      "I want to understand how things work, why they work, and how they can be improved. Learning is a constant part of my journey.",
  },
  {
    title: "Problem Solver",
    description:
      "I approach challenges logically, breaking complexity into manageable steps and focusing on solutions that make a difference.",
  },
  {
    title: "Growth Driven",
    description:
      "I believe progress comes from challenging myself, staying adaptable, and consistently pushing beyond what I already know.",
  },
];

const skills = [
  { name: "AWS", icon: "/images/issuers/aws.svg", type: "image" },
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
  { name: "CI/CD", icon: "workflow", type: "icon" },
  {
    name: "Power Platform",
    icon: "/images/technologies/power-platform.png",
    type: "image",
  },
];

function About() {
  return (
    <section
      id="about"
      className="about-section scroll-mt-24 bg-[#f3f7fc] text-[#0b1b30]"
    >
      <div className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
        <p className="mb-5 flex items-center gap-4 text-xs font-bold uppercase tracking-[0.16em] text-[#145ee8] sm:text-sm">
          About
          <span aria-hidden="true" data-about-rule className="h-0.5 flex-1 bg-[#3d82f8]" />
        </p>
        <header data-scroll-reveal className="max-w-4xl">
          <h2 className="max-w-3xl text-4xl font-bold leading-[0.98] tracking-[-0.055em] sm:text-5xl lg:text-6xl">
            A little more
            <br className="hidden sm:block" /> about me
          </h2>

          <p className="mt-6 text-lg font-semibold leading-7 tracking-[-0.02em] text-[#10243b] sm:text-xl">
            Turning complex challenges into practical solutions
          </p>

          <div className="mt-3 max-w-3xl space-y-4 text-base leading-7 text-[#30455d] sm:text-lg sm:leading-8">
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
              the software development lifecycle, from understanding a problem
              and designing a solution to implementing, testing, and deploying
              it. I'm particularly interested in building solutions that are
              scalable, reliable, and genuinely useful.
            </p>

            <p>
              Beyond technology, I'm naturally curious, creative, and driven by
              challenges. I enjoy breaking complex problems into manageable
              pieces, exploring different approaches, and continually learning
              how to do things better. For me, engineering is about more than
              writing code. It's about thinking critically, collaborating, and
              turning ideas into something meaningful.
            </p>
          </div>
        </header>

        <div className="mt-10 border-t border-[#b9cbe0] pt-6 sm:mt-12 sm:pt-7">
          <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.15em] text-[#145ee8] sm:mb-5 sm:text-sm">
            Areas of focus
          </h3>
          <ul className="grid grid-cols-2 gap-x-6 sm:grid-cols-3 lg:grid-cols-5">
            {skills.map((skill) => (
              <li
                key={skill.name}
                className="flex min-h-14 items-center gap-3 border-b border-[#cfdae7] py-3 text-sm font-semibold text-[#142b45] sm:min-h-16 sm:text-base"
              >
                {skill.type === "icon" ? (
                  <Workflow
                    aria-hidden="true"
                    className="h-5 w-5 shrink-0 text-[#145ee8]"
                    strokeWidth={1.8}
                  />
                ) : (
                  <img
                    src={skill.icon}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className="h-5 w-5 shrink-0 object-contain"
                  />
                )}
                <span>{skill.name}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 border-t border-[#b9cbe0] pt-6 sm:mt-12 sm:pt-7">
          <h3 className="mb-2 text-xs font-bold uppercase tracking-[0.15em] text-[#145ee8] sm:text-sm">
            What drives me
          </h3>
          <div className="divide-y divide-[#cfdae7]">
            {highlights.map((highlight) => (
              <article
                key={highlight.title}
                className="grid gap-2 py-4 sm:grid-cols-[minmax(180px,0.36fr)_1fr] sm:gap-8 sm:py-[18px]"
              >
                <h4 className="text-base font-bold tracking-[-0.025em] text-[#10243b] sm:text-lg">
                  {highlight.title}
                </h4>
                <p className="max-w-3xl text-sm leading-6 text-[#30455d] sm:text-base sm:leading-7">
                  {highlight.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
