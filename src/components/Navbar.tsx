import { useEffect, useRef, useState } from "react";
import jpLogo from "../assets/Jp-logo-no-background.png";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#technologies" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];

const mobilePrimaryLinks = navLinks.slice(0, 3);
const mobileMoreLinks = navLinks.slice(3);

function Navbar() {
  const [shimmerSection, setShimmerSection] = useState<string | null>(null);
  const clickedSectionRef = useRef<string | null>(null);
  const scrollTimeoutRef = useRef<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const updateScrollState = () => {
      setScrolled(window.scrollY > 16);
    };

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateScrollState);
    };
  }, []);

  useEffect(() => {
    const sectionIds = ["home", ...navLinks.map((link) => link.href.slice(1))];

    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleSections[0] && !clickedSectionRef.current) {
          setActiveSection(visibleSections[0].target.id);
        }
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 0.75],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setMoreOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current !== null) {
        window.clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  const closeMenus = () => {
    setMenuOpen(false);
    setMoreOpen(false);
  };

  const isActive = (href: string) => activeSection === href.slice(1);

  const renderNavLink = (link: (typeof navLinks)[number], mobile = false) => {
    const sectionId = link.href.slice(1);
    const active = isActive(link.href);
    const shimmering = active && shimmerSection === sectionId;

    return (
      <a
        key={link.href}
        href={link.href}
        aria-current={active ? "location" : undefined}
        onClick={() => {
          setActiveSection(sectionId);
          setShimmerSection(sectionId);

          window.setTimeout(() => {
            setShimmerSection((current) =>
              current === sectionId ? null : current,
            );
          }, 650);

          clickedSectionRef.current = sectionId;
          closeMenus();

          if (scrollTimeoutRef.current !== null) {
            window.clearTimeout(scrollTimeoutRef.current);
          }

          scrollTimeoutRef.current = window.setTimeout(() => {
            clickedSectionRef.current = null;
            scrollTimeoutRef.current = null;
          }, 1000);
        }}
        className={[
          "relative flex items-center justify-between gap-3",
          mobile
            ? "w-full rounded-xl px-4 py-3 text-sm font-medium transition-colors duration-200"
            : "whitespace-nowrap py-2 text-[13px] font-medium transition-all duration-300 ease-out",
          "focus-visible:outline-none focus-visible:ring-2",
          "focus-visible:ring-cyan-400 focus-visible:ring-offset-2",
          "focus-visible:ring-offset-[#080b20]",
          active
            ? mobile
              ? "bg-cyan-400/[0.08] text-cyan-200"
              : "text-cyan-200 drop-shadow-[0_0_8px_rgba(103,232,249,0.3)]"
            : mobile
              ? "text-slate-300 hover:bg-white/[0.04] hover:text-white"
              : "text-slate-400 hover:text-cyan-200 hover:drop-shadow-[0_0_10px_rgba(103,232,249,0.65)] hover:-translate-y-0.5",
        ].join(" ")}
      >
        <span>{link.label}</span>

        {mobile ? (
          <span
            className={[
              "h-1.5 w-1.5 shrink-0 rounded-full transition-colors duration-200",
              active
                ? "bg-cyan-300 shadow-[0_0_8px_rgba(103,232,249,0.6)]"
                : "bg-transparent group-hover:bg-slate-500",
            ].join(" ")}
            aria-hidden="true"
          />
        ) : (
          <span
            className={[
              "absolute inset-x-0 -bottom-[1px] h-[2px] origin-center",
              "rounded-full bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400",
              "transition-all duration-300 ease-out",
              active
                ? "scale-x-100 opacity-100 shadow-[0_0_10px_rgba(103,232,249,0.65)]"
                : "scale-x-0 opacity-70 group-hover:scale-x-75 group-hover:opacity-100 group-hover:shadow-[0_0_8px_rgba(103,232,249,0.4)]",
              shimmering ? "animate-pulse" : "",
            ].join(" ")}
            aria-hidden="true"
          />
        )}
      </a>
    );
  };

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50",
        "border-b border-white/[0.08]",
        "bg-[#080b20]/75 backdrop-blur-2xl",
        "transition-[background-color,box-shadow,border-color] duration-300",
        scrolled
          ? "border-white/[0.12] bg-[#080b20]/90 shadow-lg shadow-black/10"
          : "shadow-none",
      ].join(" ")}
    >
      <nav
        className="mx-auto flex min-h-[76px] max-w-[1440px] items-center justify-between gap-4 px-5 sm:px-8 xl:px-12"
        aria-label="Main navigation"
      >
        {/* Brand: custom JP logo */}
        <a
          href="#home"
          onClick={() => {
            closeMenus();
            setActiveSection("home");
            clickedSectionRef.current = null;
          }}
          className="group flex shrink-0 items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          aria-label="Jayden Pillay - Home"
        >
          <span className="relative flex h-11 w-11 shrink-0 items-center justify-center transition-transform duration-300 group-hover:scale-105">
            <img
              src={jpLogo}
              alt=""
              aria-hidden="true"
              className="h-full w-full object-contain transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(103,232,249,0.3)]"
            />
          </span>

          <span className="flex flex-col">
            <span className="text-sm font-semibold tracking-wide text-white sm:text-[15px]">
              Jayden Pillay
            </span>

            <span className="mt-1 bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-[9px] font-semibold tracking-[0.19em] text-transparent sm:text-[10px]">
              SOFTWARE ENGINEER
            </span>
          </span>
        </a>

        {/* Desktop navigation: shifted right */}
        <div className="ml-auto hidden translate-x-2 items-center gap-5 lg:flex xl:translate-x-4 xl:gap-6 2xl:translate-x-5 2xl:gap-7">
          {navLinks.map((link) => (
            <div key={link.href} className="group relative">
              {renderNavLink(link)}
            </div>
          ))}
        </div>

        {/* Mobile and tablet navigation controls */}
        <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3 lg:hidden">
          {/* Mobile/tablet: primary links and More menu */}
          <div className="hidden items-center gap-3 md:flex lg:hidden">
            {mobilePrimaryLinks.slice(0, 2).map((link) => (
              <div key={link.href} className="group relative">
                {renderNavLink(link)}
              </div>
            ))}

            <div className="relative">
              <button
                type="button"
                onClick={() => setMoreOpen((open) => !open)}
                aria-expanded={moreOpen}
                aria-controls="navbar-more-menu"
                className={[
                  "inline-flex items-center gap-1.5 rounded-lg px-3 py-2",
                  "text-sm font-medium transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400",
                  moreOpen
                    ? "bg-white/[0.06] text-cyan-300"
                    : "text-slate-300 hover:text-white",
                ].join(" ")}
              >
                More
                <svg
                  className={[
                    "h-4 w-4 transition-transform duration-200",
                    moreOpen ? "rotate-180" : "",
                  ].join(" ")}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  aria-hidden="true"
                >
                  <path
                    d="m7 10 5 5 5-5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {moreOpen && (
                <div
                  id="navbar-more-menu"
                  className="absolute right-0 top-[calc(100%+14px)] w-56 rounded-2xl border border-white/10 bg-[#0d1428]/95 p-2 shadow-2xl shadow-black/30 backdrop-blur-2xl"
                >
                  {mobileMoreLinks.map((link) => renderNavLink(link, true))}
                </div>
              )}
            </div>
          </div>

          {/* Compact mobile menu */}
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-slate-200 transition-colors duration-200 hover:border-cyan-400/40 hover:bg-white/[0.06] hover:text-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 md:hidden"
            aria-label={
              menuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={menuOpen}
            aria-controls="navbar-mobile-menu"
          >
            <svg
              width="21"
              height="21"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              aria-hidden="true"
            >
              {menuOpen ? (
                <path d="m6 6 12 12M18 6 6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile navigation panel */}
      <div
        id="navbar-mobile-menu"
        aria-hidden={!menuOpen}
        inert={!menuOpen}
        className={[
          "overflow-hidden border-t border-white/[0.08] md:hidden",
          "transition-[max-height,opacity] duration-300 ease-out",
          menuOpen
            ? "max-h-[80vh] opacity-100"
            : "pointer-events-none max-h-0 opacity-0",
        ].join(" ")}
      >
        <div className="max-h-[80vh] overflow-y-auto bg-[#080b20]/95 px-5 py-4 backdrop-blur-2xl sm:px-8">
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            <a
              href="#home"
              onClick={() => {
                closeMenus();
                setActiveSection("home");
                clickedSectionRef.current = null;
              }}
              className="mb-2 flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition-colors hover:bg-white/[0.04] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              Home
              <span className="text-xs text-slate-500">Top</span>
            </a>

            {mobilePrimaryLinks.map((link) => renderNavLink(link, true))}

            <div className="my-3 h-px bg-white/[0.08]" />

            <button
              type="button"
              onClick={() => setMoreOpen((open) => !open)}
              className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition-colors hover:bg-white/[0.04] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              aria-expanded={moreOpen}
              aria-controls="navbar-mobile-more"
            >
              <span>More sections</span>
              <svg
                className={[
                  "h-4 w-4 transition-transform duration-200",
                  moreOpen ? "rotate-180" : "",
                ].join(" ")}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                aria-hidden="true"
              >
                <path
                  d="m7 10 5 5 5-5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <div
              id="navbar-mobile-more"
              aria-hidden={!moreOpen}
              inert={!moreOpen}
              className={[
                "grid overflow-hidden transition-[grid-template-rows,opacity] duration-300",
                moreOpen
                  ? "grid-rows-[1fr] opacity-100"
                  : "pointer-events-none grid-rows-[0fr] opacity-0",
              ].join(" ")}
            >
              <div className="min-h-0 overflow-hidden">
                <div className="ml-3 border-l border-white/10 py-1 pl-2">
                  {mobileMoreLinks.map((link) => renderNavLink(link, true))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
