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
          <span aria-hidden="true" className="h-0.5 flex-1 bg-[#3d82f8]" />
        </p>
        <header className="max-w-4xl">
          <h2 className="max-w-3xl text-4xl font-bold leading-[0.98] tracking-[-0.055em] sm:text-5xl lg:text-6xl">
            A little more<br />about me
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
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {skills.map((skill) => (
              <li
                key={skill.name}
                className="flex min-h-[76px] items-center gap-3 rounded-lg border border-[#cbd8e7] bg-white px-3 py-3 text-sm font-semibold text-[#142b45] shadow-[0_1px_2px_rgba(11,27,48,0.04)] sm:gap-3.5 sm:px-4 sm:text-base"
              >
                <span className={`flex size-10 shrink-0 items-center justify-center rounded-md border ${skill.name === "AWS" ? "border-[#173b64] bg-[#102b49]" : "border-[#e0e8f1] bg-[#edf3fa]"}`}>
                  {skill.type === "icon" ? (
                    <Workflow
                      aria-hidden="true"
                      className="h-5 w-5 text-[#145ee8]"
                      strokeWidth={1.8}
                    />
                  ) : (
                    <img
                      src={skill.icon}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      className={`${skill.name === "AWS" ? "h-6 w-8" : "h-6 w-6"} object-contain`}
                    />
                  )}
                </span>
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
