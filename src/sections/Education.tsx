import { CheckIcon, ReaderIcon, SewingPinIcon } from "@radix-ui/react-icons";
import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";

const education = [
  {
    qualification: "BSc Computer Science and Information Technology",
    level: "Undergraduate qualification",
    institution: "University of KwaZulu-Natal",
    location: "Pietermaritzburg, South Africa",
    from: "2019",
    to: "2023",
    status: "Graduated",
    description:
      "Graduated with a Bachelor of Science in Computer Science and Information Technology, building a foundation in software development, programming, and information technology.",
    logo: "/images/institutions/ukzn-logo.png",
    logoFallback: "UKZN",
    subjectLabel: "Academic focus",
    subjects: [
      "Computer Science",
      "Software Development",
      "Information Technology",
    ],
  },
  {
    qualification: "National Senior Certificate",
    level: "Secondary education",
    institution: "Port Shepstone High School",
    location: "Port Shepstone, South Africa",
    from: "2015",
    to: "2019",
    status: "Completed",
    description:
      "Completed Grade 12 and earned my National Senior Certificate, marking an important step in my education.",
    logo: "/images/institutions/port-shepstone-high-school-logo.png",
    logoFallback: "PSHS",
    subjectLabel: "Subjects",
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

const ease = [0.22, 1, 0.36, 1] as const;
const pageLineWidths = ["w-full", "w-4/5", "w-[92%]", "w-[62%]"];

function OpenBook() {
  return (
    <div
      data-scroll-book
      aria-hidden="true"
      className="pointer-events-none mx-auto w-full max-w-[26rem] py-6 sm:py-10"
    >
      <div className="grid grid-cols-2">
        {["left", "right"].map((side) => {
          const isLeft = side === "left";

          return (
            <div
              key={side}
              className={`[perspective:800px] ${
                isLeft ? "origin-right skew-y-[8deg]" : "origin-left -skew-y-[8deg]"
              }`}
            >
              <div
                data-scroll-page={side}
                className={`relative border border-[#6299ff] bg-[#10294f] p-[clamp(1rem,3vw,2rem)] shadow-[0_5px_0_#0b1e39,0_6px_0_#416596,0_11px_0_#0b1e39,0_12px_0_#294975] ${
                  isLeft ? "origin-right rounded-tl-lg" : "origin-left rounded-tr-lg border-l-0"
                }`}
              >
                <div className="grid gap-3 sm:gap-4">
                  {pageLineWidths.map((width) => (
                    <span
                      key={width}
                      data-scroll-page-rule
                      className={`block h-px origin-left bg-[#6299ff]/65 ${width}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function InstitutionMark({ item }: { item: (typeof education)[number] }) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      aria-hidden="true"
      className="grid h-14 w-[4.75rem] shrink-0 place-items-center md:h-24 md:w-28"
    >
      {failed ? (
        <span className="text-sm font-bold tracking-wide text-[#30455d]">
          {item.logoFallback}
        </span>
      ) : (
        <img
          src={item.logo}
          alt=""
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          className="h-full w-full object-contain object-right md:object-left"
        />
      )}
    </div>
  );
}

export default function Education() {
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <section
      id="education"
      aria-labelledby="education-heading"
      className="education-section bg-[#f3f7fc] text-[#0b1b30]"
    >
      <header className="border-t-2 border-[#2673f7] bg-[#091a2e] text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-6 px-5 py-12 sm:px-8 sm:py-16 md:grid-cols-[1.2fr_0.8fr] md:gap-10 lg:px-12 lg:py-20">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0.55, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: reduceMotion ? 0 : 0.65, ease }}
          >
            <h2
              id="education-heading"
              className="text-[clamp(3rem,8vw,6.25rem)] leading-[0.95] font-bold tracking-[-0.065em]"
            >
              Education
            </h2>
            <p className="mt-5 max-w-lg text-base leading-7 text-[#bdcee3] sm:mt-6 sm:text-lg sm:leading-8">
              The foundation that shaped my journey into software engineering,
              cloud technology, and automation.
            </p>
          </motion.div>
          <OpenBook />
        </div>
      </header>

      <ol
        role="list"
        className="mx-auto max-w-7xl divide-y divide-[#bdcde0] px-5 pb-8 sm:px-8 sm:pb-12 lg:px-12 lg:pb-16"
      >
        {education.map((item, index) => (
          <li key={item.qualification}>
            <motion.article
              initial={reduceMotion ? false : { opacity: 0.6, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ duration: reduceMotion ? 0 : 0.65, ease }}
              className="grid gap-5 py-9 sm:py-12 md:grid-cols-[minmax(0,12rem)_minmax(0,1fr)] md:gap-8 lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] lg:gap-12 lg:py-16"
            >
              <div className="flex items-center justify-between gap-4 md:flex-col md:items-start md:justify-start md:gap-7">
                <div>
                  <p className="text-xl leading-tight font-semibold tracking-[-0.04em] text-[#1458cf] tabular-nums sm:text-2xl lg:text-3xl">
                    <time dateTime={item.from}>{item.from}</time>
                    {" to "}
                    <time dateTime={item.to}>{item.to}</time>
                  </p>
                  <p className="mt-2 flex items-center gap-1.5 text-sm font-semibold text-[#30455d]">
                    <CheckIcon
                      aria-hidden="true"
                      className="size-4 shrink-0 text-[#1458cf]"
                    />
                    {item.status}
                  </p>
                </div>
                <InstitutionMark item={item} />
              </div>

              <div className="min-w-0">
                <h3
                  className={`max-w-3xl text-balance leading-[1.06] font-bold tracking-[-0.045em] ${
                    index === 0 ? "text-3xl sm:text-4xl lg:text-5xl" : "text-2xl sm:text-3xl lg:text-4xl"
                  }`}
                >
                  {item.qualification}
                </h3>
                <p className="mt-4 text-base leading-snug font-semibold text-[#142b45] sm:text-lg">
                  {item.institution}
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm leading-6 text-[#475d75]">
                  <p className="flex items-center gap-1.5">
                    <SewingPinIcon
                      aria-hidden="true"
                      className="size-4 shrink-0 text-[#1458cf]"
                    />
                    {item.location}
                  </p>
                  <p>{item.level}</p>
                </div>
                <p className="mt-4 max-w-[65ch] text-base leading-7 text-[#30455d] sm:mt-5">
                  {item.description}
                </p>

                <div className="mt-6 border-t border-[#cfdae7] pt-4 sm:mt-7 sm:pt-5">
                  <h4 className="flex items-center gap-2 text-sm font-bold text-[#1458cf]">
                    <ReaderIcon aria-hidden="true" className="size-4 shrink-0" />
                    {item.subjectLabel}
                  </h4>
                  <ul
                    role="list"
                    className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm leading-6 text-[#30455d]"
                  >
                    {item.subjects.map((subject) => (
                      <li key={subject} className="flex items-baseline gap-2">
                        <span
                          aria-hidden="true"
                          className="relative -top-[2px] size-[3px] shrink-0 bg-[#5680b6]"
                        />
                        {subject}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.article>
          </li>
        ))}
      </ol>
    </section>
  );
}
