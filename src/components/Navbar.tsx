import { useEffect, useRef, useState } from "react";
import { Mail } from "lucide-react";
import jpLogo from "../assets/jp-monogram.png";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Certifications", href: "#certifications" },
];

const contactHref = "#contact";
const mobilePrimaryLinks = navLinks.slice(0, 4);
const mobileMoreLinks = navLinks.slice(4);
const tabletPrimaryLinks = navLinks.slice(0, 3);
const tabletMoreLinks = navLinks.slice(3);

function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const mobileToggleRef = useRef<HTMLButtonElement>(null);
  const tabletMoreRef = useRef<HTMLButtonElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const sections = [...navLinks.map(({ href }) => href), contactHref]
      .map((href) => document.getElementById(href.slice(1)))
      .filter((element): element is HTMLElement => element !== null);

    if (!sections.length) return;

    let currentId = "";
    let frame = 0;
    let positions: { id: string; top: number }[] = [];
    let marker = 0;
    let scrollEnd = 0;

    const update = () => {
      frame = 0;
      const scroll = window.scrollY;
      const position = scroll + marker;
      const current = scrollEnd > 0 && scroll >= scrollEnd - 2
        ? positions.at(-1)
        : positions.findLast(({ top }) => top <= position) ?? positions[0];

      if (current && current.id !== currentId) {
        currentId = current.id;
        setActiveSection(current.id);
      }
    };

    const scheduleUpdate = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    const measure = () => {
      const scroll = window.scrollY;
      positions = sections
        .map((section) => ({ id: section.id, top: section.getBoundingClientRect().top + scroll }))
        .sort((a, b) => a.top - b.top);
      marker = Math.min(
        Math.max((navRef.current?.offsetHeight ?? 76) + 16, window.innerHeight * 0.28),
        window.innerHeight - 1,
      );
      scrollEnd = document.documentElement.scrollHeight - window.innerHeight;
      scheduleUpdate();
    };

    measure();
    const observer = new ResizeObserver(measure);
    sections.forEach((section) => observer.observe(section));
    const main = document.getElementById("main-content");
    if (main) observer.observe(main);

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", measure);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => { document.body.style.overflow = previousOverflow; };
  }, [menuOpen]);

  useEffect(() => {
    const tablet = window.matchMedia("(min-width: 768px)");
    const desktop = window.matchMedia("(min-width: 1024px)");
    const closeOnResize = () => {
      setMenuOpen(false);
      setMoreOpen(false);
    };
    tablet.addEventListener("change", closeOnResize);
    desktop.addEventListener("change", closeOnResize);
    return () => {
      tablet.removeEventListener("change", closeOnResize);
      desktop.removeEventListener("change", closeOnResize);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen && !moreOpen) return;
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMenuOpen(false);
      setMoreOpen(false);
      if (menuOpen) mobileToggleRef.current?.focus();
      else tabletMoreRef.current?.focus();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [menuOpen, moreOpen]);

  const closeMenus = () => {
    setMenuOpen(false);
    setMoreOpen(false);
  };

  const isActive = (href: string) => activeSection === href.slice(1);
  const contactActive = isActive(contactHref);

  const renderNavLink = (link: (typeof navLinks)[number], mobile = false) => {
    const active = isActive(link.href);

    return (
      <a
        key={link.href}
        href={link.href}
        aria-current={active ? "location" : undefined}
        onClick={closeMenus}
        className={[
          "relative flex items-center justify-between gap-3 rounded-sm transition-colors",
          "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-300",
          mobile ? "w-full px-4 py-3 text-sm font-medium" : "whitespace-nowrap py-2 text-[13px] font-medium",
          active
            ? mobile ? "bg-[#173451] text-[#b9d6ff]!" : "text-[#b9d6ff]!"
            : mobile ? "text-slate-300! hover:bg-white/[0.06] hover:text-white!" : "text-slate-300! hover:text-white!",
        ].join(" ")}
      >
        <span>{link.label}</span>
        <span
          aria-hidden="true"
          className={[
            "pointer-events-none bg-[#74aaff]",
            mobile
              ? `h-0.5 w-4 shrink-0 ${active ? "opacity-100" : "opacity-0"}`
              : `absolute inset-x-0 -bottom-0.5 h-0.5 origin-left transition-[transform,opacity] duration-200 motion-reduce:transition-none ${active ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"}`,
          ].join(" ")}
        />
      </a>
    );
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/12 bg-[#091a2e]">
      <nav
        ref={navRef}
        className="mx-auto flex min-h-[76px] max-w-[1440px] items-center justify-between gap-4 px-5 sm:px-8 xl:px-12"
        aria-label="Main navigation"
      >
        {/* Brand: custom JP logo */}
        <a
          href="#home"
          onClick={closeMenus}
          className="group flex shrink-0 items-center gap-4 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          aria-label="Jayden Pillay - Home"
        >
          <img
            src={jpLogo}
            alt=""
            aria-hidden="true"
            className="h-10 w-14 shrink-0 object-contain transition-transform duration-200 group-hover:scale-[1.04]"
          />
          <span aria-hidden="true" className="h-9 w-px bg-white/45" />

          <span className="flex flex-col">
            <span className="text-sm font-semibold tracking-wide text-white sm:text-[15px]">
              Jayden Pillay
            </span>

            <span className="mt-1 text-[9px] font-semibold tracking-[0.19em] text-blue-300 sm:text-[10px]">
              SOFTWARE ENGINEER
            </span>
          </span>
        </a>

        {/* Desktop navigation */}
        <div className="ml-auto hidden items-center gap-4 lg:flex xl:gap-6 2xl:gap-7">
          {navLinks.map((link) => (
            <div key={link.href} className="group relative">
              {renderNavLink(link)}
            </div>
          ))}
        </div>

        <a
          href={contactHref}
          onClick={closeMenus}
          aria-current={contactActive ? "location" : undefined}
          className="ml-4 hidden min-h-11 shrink-0 items-center gap-3 rounded-[5px] border border-blue-300/25 bg-[#1659cd] aria-[current=location]:border-[#b9d6ff] aria-[current=location]:ring-2 aria-[current=location]:ring-[#74aaff] px-4 text-sm font-bold text-white shadow-[0_4px_0_#1748a7] transition-[transform,background-color,box-shadow] hover:-translate-y-0.5 hover:bg-[#3980ff] hover:shadow-[0_4px_0_#1748a7,0_8px_22px_rgba(40,117,255,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080b20] md:inline-flex"
        >
          Get in Touch
          <Mail
            aria-hidden="true"
            className="h-4 w-4 shrink-0"
            strokeWidth={1.8}
          />
        </a>

        {/* Mobile and tablet navigation controls */}
        <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3 lg:hidden">
          {/* Mobile/tablet: primary links and More menu */}
          <div className="hidden items-center gap-3 md:flex lg:hidden">
            {tabletPrimaryLinks.map((link) => (
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
                ref={tabletMoreRef}
                className={[
                  "inline-flex items-center gap-1.5 rounded-lg px-3 py-2",
                  "text-sm font-medium transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400",
                  moreOpen || tabletMoreLinks.some(({ href }) => isActive(href))
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
                  className="absolute right-0 top-[calc(100%+14px)] w-56 rounded-2xl border border-white/10 bg-[#10243b] p-2 shadow-2xl shadow-black/30"
                >
                  {tabletMoreLinks.map((link) => renderNavLink(link, true))}
                </div>
              )}
            </div>
          </div>

          {/* Compact mobile menu */}
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            ref={mobileToggleRef}
            className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-slate-200 transition-colors duration-200 hover:border-cyan-400/40 hover:bg-white/[0.06] hover:text-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 md:hidden"
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
        <div className="max-h-[80vh] overflow-y-auto bg-[#091a2e] px-5 py-4 sm:px-8">
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {mobilePrimaryLinks.map((link) => renderNavLink(link, true))}

            <div className="my-3 h-px bg-white/[0.08]" />

            <button
              type="button"
              onClick={() => setMoreOpen((open) => !open)}
              className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-colors hover:bg-white/[0.04] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                mobileMoreLinks.some(({ href }) => isActive(href)) ? "text-[#b9d6ff]" : "text-slate-300"
              }`}
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

            <a
              href={contactHref}
              aria-current={contactActive ? "location" : undefined}
              onClick={closeMenus}
              className="mt-3 inline-flex min-h-12 items-center justify-between gap-5 rounded-[5px] border border-blue-300/25 bg-[#1659cd] aria-[current=location]:border-[#b9d6ff] aria-[current=location]:ring-2 aria-[current=location]:ring-[#74aaff] px-4 py-3 text-sm font-bold text-white shadow-[0_4px_0_#1748a7] transition-[transform,background-color,box-shadow] hover:-translate-y-0.5 hover:bg-[#3980ff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
            >
              Get in Touch
              <Mail
                aria-hidden="true"
                className="h-4 w-4 shrink-0"
                strokeWidth={1.8}
              />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
