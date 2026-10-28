import { motion, useReducedMotion } from "motion/react";

const certifications = [
  {
    name: "AWS Certified Developer – Associate",
    issuer: "Amazon Web Services",
    category: "Cloud Development",
    image: "/images/certifications/aws-developer-associate.svg",
    issuerLogo: "/images/issuers/aws.svg",
    accent: "from-orange-400/15 to-amber-500/[0.03]",
    glow: "hover:border-orange-400/30 hover:shadow-[0_16px_40px_rgba(251,146,60,0.07)]",
  },
  {
    name: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    category: "Cloud Fundamentals",
    image: "/images/certifications/aws-cloud-practitioner.svg",
    issuerLogo: "/images/issuers/aws.svg",
    accent: "from-orange-400/15 to-amber-500/[0.03]",
    glow: "hover:border-orange-400/30 hover:shadow-[0_16px_40px_rgba(251,146,60,0.07)]",
  },
  {
    name: "Microsoft Power Platform Developer Associate",
    issuer: "Microsoft",
    category: "Application Development",
    image: "/images/certifications/power-platform-developer.svg",
    issuerLogo: "/images/issuers/microsoft.svg",
    accent: "from-blue-400/15 to-cyan-500/[0.03]",
    glow: "hover:border-cyan-400/30 hover:shadow-[0_16px_40px_rgba(34,211,238,0.07)]",
  },
  {
    name: "Microsoft Power Platform Fundamentals",
    issuer: "Microsoft",
    category: "Power Platform",
    image: "/images/certifications/power-platform-fundamentals.png",
    issuerLogo: "/images/issuers/microsoft.svg",
    accent: "from-blue-400/15 to-cyan-500/[0.03]",
    glow: "hover:border-blue-400/30 hover:shadow-[0_16px_40px_rgba(59,130,246,0.07)]",
  },
  {
    name: "Microsoft Power Automate RPA",
    issuer: "Microsoft",
    category: "Process Automation",
    image: "/images/certifications/power-automate-rpa.png",
    issuerLogo: "/images/issuers/microsoft.svg",
    accent: "from-violet-400/15 to-purple-500/[0.03]",
    glow: "hover:border-violet-400/30 hover:shadow-[0_16px_40px_rgba(167,139,250,0.07)]",
  },
  {
    name: "SAFe 6 Practitioner",
    issuer: "Scaled Agile",
    category: "Agile Delivery",
    image: "/images/certifications/safe-6-practitioner.png",
    issuerLogo: "/images/issuers/scaled-agilee.png",
    accent: "from-violet-400/15 to-purple-500/[0.03]",
    glow: "hover:border-violet-400/30 hover:shadow-[0_16px_40px_rgba(167,139,250,0.07)]",
  },
  {
    name: "Microsoft Azure Fundamentals",
    issuer: "Microsoft",
    category: "Cloud Fundamentals",
    image: "/images/certifications/azure-fundamentals.svg",
    issuerLogo: "/images/issuers/microsoft.svg",
    accent: "from-sky-400/15 to-blue-500/[0.03]",
    glow: "hover:border-sky-400/30 hover:shadow-[0_16px_40px_rgba(56,189,248,0.07)]",
  },
];

const smoothEase = [0.22, 1, 0.36, 1] as const;

const shimmerStyle = {
  backgroundImage:
    "linear-gradient(100deg, #67e8f9 0%, #60a5fa 25%, #a78bfa 45%, #67e8f9 60%, #60a5fa 80%, #a78bfa 100%)",
  backgroundSize: "250% 100%",
};

function Certifications() {
  const shouldReduceMotion = useReducedMotion() ?? false;

  return (
    <section
      id="certifications"
      aria-labelledby="certifications-heading"
      className="relative isolate overflow-clip bg-[#080b20] px-5 py-24 text-white sm:px-10 sm:py-32 lg:px-16"
    >
      {/* Ambient background effects */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-blue-600/[0.06] blur-[120px]" />
        <div className="absolute -right-32 top-1/3 h-96 w-96 rounded-full bg-violet-600/[0.07] blur-[140px]" />
        <div className="absolute inset-0 bg-[radial-gradient(rgba(148,163,184,0.12)_0.7px,transparent_0.7px)] [background-size:26px_26px] opacity-[0.10]" />
      </div>

      <div className="mx-auto max-w-7xl">
        {/* Sticky heading — stays above the cards */}
        <div className="relative z-20 mb-10 bg-[#080b20]/95 py-4 text-left backdrop-blur-md sm:mb-12 lg:sticky lg:top-20">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-blue-400">
            Professional Development
          </p>

          <h2
            id="certifications-heading"
            className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
          >
            Certifications{" "}
            <motion.span
              className="inline-block bg-clip-text text-transparent"
              style={shimmerStyle}
              animate={
                shouldReduceMotion
                  ? undefined
                  : { backgroundPosition: ["100% 50%", "0% 50%"] }
              }
              transition={
                shouldReduceMotion
                  ? undefined
                  : {
                      duration: 4,
                      ease: "linear",
                      repeat: Infinity,
                      repeatType: "reverse",
                    }
              }
            >
              &amp; Credentials
            </motion.span>
          </h2>

          {/* Animated glowing underline */}
          <motion.div
            aria-hidden="true"
            initial={shouldReduceMotion ? false : { opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.8,
              ease: smoothEase,
            }}
            className="relative mt-6 h-[3px] w-32 origin-left overflow-hidden rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 shadow-[0_0_16px_rgba(59,130,246,0.35)]"
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
                  repeatDelay: 1.2,
                }}
              />
            )}
          </motion.div>

          <p className="mt-6 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg sm:leading-8">
            Professional credentials reflecting my continued development across
            cloud computing, software development, automation, and agile
            delivery.
          </p>
        </div>

        {/* Certification cards — separate from the sticky heading */}
        <div className="grid min-w-0 grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((certification, index) => (
            <motion.article
              key={certification.name}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={
                shouldReduceMotion ? undefined : { opacity: 1, y: 0 }
              }
              viewport={{ once: true, amount: 0.12 }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.65,
                delay: shouldReduceMotion ? 0 : (index % 3) * 0.08,
                ease: smoothEase,
              }}
              whileHover={
                shouldReduceMotion
                  ? undefined
                  : {
                      y: -4,
                      transition: { duration: 0.25, ease: "easeOut" },
                    }
              }
              className={`group relative isolate flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-white/[0.10] bg-gradient-to-br from-slate-800/40 via-[#10172d]/80 to-[#080D1C] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-[border-color,box-shadow] duration-300 ${
                index === certifications.length - 1 ? "lg:col-start-2" : ""
              } ${certification.glow}`}
            >
              {/* Subtle certification accent */}
              <div
                aria-hidden="true"
                className={`pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br ${certification.accent} opacity-50 transition-opacity duration-300 group-hover:opacity-100`}
              />

              {/* Top edge accent */}
              <div
                aria-hidden="true"
                className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${certification.accent
                  .replace("/15", "/70")
                  .replace("/[0.03]", "/20")} opacity-70`}
              />

              <div className="relative flex h-full flex-col">
                {/* Certification badge */}
                <div className="mb-6 flex items-start justify-between gap-3">
                  <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.03] p-2 transition-transform duration-300 group-hover:scale-[1.04] motion-reduce:transform-none">
                    <img
                      src={certification.image}
                      alt={`${certification.name} certification badge`}
                      className="h-full w-full object-contain"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Certification details */}
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                  {certification.category}
                </p>

                <h3 className="min-h-[3.5rem] text-lg font-bold leading-snug tracking-tight text-white">
                  {certification.name}
                </h3>

                {/* Issuer logo and name */}
                <div className="mt-auto flex min-h-[76px] items-center gap-1.5 border-t border-white/[0.09] pt-5">
                  <div className="flex h-9 w-16 shrink-0 items-center justify-start">
                    <img
                      src={certification.issuerLogo}
                      alt={`${certification.issuer} logo`}
                      className={`h-8 w-16 object-contain object-left ${
                        certification.issuer === "Scaled Agile"
                          ? "scale-125"
                          : ""
                      }`}
                      loading="lazy"
                    />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs text-slate-500">Issued by</p>
                    <p className="text-sm font-medium leading-5 text-slate-200">
                      {certification.issuer}
                    </p>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Certifications;
