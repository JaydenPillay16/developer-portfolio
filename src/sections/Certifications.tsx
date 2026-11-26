import SectionEdge from "../components/SectionEdge";
const issuers = [
  {
    id: "aws",
    name: "Amazon Web Services",
    logo: "/images/issuers/aws.svg",
    logoSize: "h-9 w-14",
    credentials: [
      {
        name: "AWS Certified Developer – Associate",
        category: "Cloud Development",
        image: "/images/certifications/aws-developer-associate.svg",
      },
      {
        name: "AWS Certified Cloud Practitioner",
        category: "Cloud Fundamentals",
        image: "/images/certifications/aws-cloud-practitioner.svg",
      },
    ],
  },
  {
    id: "microsoft",
    name: "Microsoft",
    logo: "/images/issuers/microsoft.svg",
    logoSize: "size-8",
    credentials: [
      {
        name: "Microsoft Power Platform Developer Associate",
        category: "Application Development",
        image: "/images/certifications/power-platform-developer.svg",
      },
      {
        name: "Microsoft Power Platform Fundamentals",
        category: "Power Platform",
        image: "/images/certifications/power-platform-fundamentals.png",
      },
      {
        name: "Microsoft Power Automate RPA",
        category: "Process Automation",
        image: "/images/certifications/power-automate-rpa.png",
      },
      {
        name: "Microsoft Azure Fundamentals",
        category: "Cloud Fundamentals",
        image: "/images/certifications/azure-fundamentals.svg",
      },
    ],
  },
  {
    id: "scaled-agile",
    name: "Scaled Agile",
    logo: "/images/issuers/scaled-agilee.png",
    logoSize: "size-9",
    credentials: [
      {
        name: "SAFe 6 Practitioner",
        category: "Agile Delivery",
        image: "/images/certifications/safe-6-practitioner.png",
      },
    ],
  },
];

export default function Certifications() {
  return (
    <section
      id="certifications"
      aria-labelledby="certifications-heading"
      className="certifications-section bg-[#091a2e] text-[#f4f8ff]"
    >
      <SectionEdge shape="split" />
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-28">
        <header className="relative grid gap-5 border-b border-[#314a67] pb-8 sm:gap-7 sm:pb-12 lg:grid-cols-[1.35fr_0.65fr] lg:items-end lg:gap-12">
          <h2
            id="certifications-heading"
            className="text-[clamp(2.75rem,6.5vw,5rem)] leading-[0.97] font-bold tracking-[-0.06em]"
          >
            Certifications
            <span className="block text-[#92baff]">&amp; Credentials</span>
          </h2>
          <p className="max-w-[39ch] text-base leading-7 text-[#bdcee3] sm:text-lg sm:leading-8">
            Professional credentials reflecting my continued development across
            cloud computing, software development, automation, and agile
            delivery.
          </p>
          <span
            aria-hidden="true"
            className="absolute -bottom-px left-0 h-0.5 w-24 bg-[#6299ff] sm:w-32"
          />
        </header>

        {issuers.map((issuer) => (
          <section
            key={issuer.id}
            aria-labelledby={`certifications-${issuer.id}`}
            className="grid gap-7 border-b border-[#314a67] py-8 sm:gap-8 sm:py-10 lg:grid-cols-[minmax(0,13rem)_minmax(0,1fr)] lg:gap-10 lg:py-12"
          >
            <div className="flex min-w-0 items-center gap-3 lg:flex-col lg:items-start lg:gap-4 lg:pt-1">
              <img
                src={issuer.logo}
                alt=""
                loading="lazy"
                decoding="async"
                className={`shrink-0 object-contain object-left ${issuer.logoSize}`}
              />
              <h3
                id={`certifications-${issuer.id}`}
                className="text-lg leading-tight font-semibold tracking-tight text-[#e0ebf9] sm:text-xl"
              >
                {issuer.name}
              </h3>
            </div>

            <ul
              role="list"
              className="grid min-w-0 grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 sm:gap-y-8 lg:border-l lg:border-[#314a67] lg:pl-9"
            >
              {issuer.credentials.map((credential) => (
                <li
                  key={credential.name}
                  className="grid min-w-0 grid-cols-[4.25rem_minmax(0,1fr)] items-center gap-4 sm:grid-cols-[4.75rem_minmax(0,1fr)] xl:grid-cols-[5.75rem_minmax(0,1fr)] xl:gap-5"
                >
                  <div className="aspect-square">
                    <img
                      src={credential.image}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="size-full object-contain"
                    />
                  </div>
                  <div>
                    <h4 className="text-base leading-snug font-bold tracking-[-0.025em] text-[#f4f8ff] lg:text-lg xl:text-xl">
                      {credential.name}
                    </h4>
                    <p className="mt-1.5 text-sm leading-5 text-[#afc4dd]">
                      {credential.category}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </section>
  );
}
