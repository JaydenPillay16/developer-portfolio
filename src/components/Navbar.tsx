import { useEffect, useEffectEvent, useRef, useState, type MouseEvent } from "react";
import { createPortal } from "react-dom";
import { Mail } from "lucide-react";
import { gsap } from "gsap";
import jpLogo from "../assets/jp-monogram.png";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Certifications", href: "#certifications" },
];

const contactHref = "#contact";
const mobilePrimaryLinks = navLinks.slice(0, 4);
const mobileMoreLinks = navLinks.slice(4);
const widePrimaryLinks = mobilePrimaryLinks.slice(1);
const transitionRows = Array.from({ length: 12 }, (_, index) => index);

function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const mobileToggleRef = useRef<HTMLButtonElement>(null);
  const wideMoreRef = useRef<HTMLButtonElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const transitionRef = useRef<HTMLDivElement>(null);
  const transitionTimeline = useRef<gsap.core.Timeline | null>(null);
  const transitioning = useRef(false);

  useEffect(() => () => {
    transitionTimeline.current?.kill();
    transitioning.current = false;
  }, []);

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
    const wide = window.matchMedia("(min-width: 768px)");
    const closeOnResize = () => {
      setMenuOpen(false);
      setMoreOpen(false);
    };
    wide.addEventListener("change", closeOnResize);
    return () => {
      wide.removeEventListener("change", closeOnResize);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen && !moreOpen) return;
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMenuOpen(false);
      setMoreOpen(false);
      if (menuOpen) mobileToggleRef.current?.focus();
      else wideMoreRef.current?.focus();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [menuOpen, moreOpen]);

  const closeMenus = () => {
    setMenuOpen(false);
    setMoreOpen(false);
  };

  const handleNavigation = (event: MouseEvent<HTMLAnchorElement> | globalThis.MouseEvent, href: string) => {
    closeMenus();
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const target = document.getElementById(href.slice(1));
    const overlay = transitionRef.current;
    if (!target || !overlay) return;
    event.preventDefault();
    if (transitioning.current) return;
    transitioning.current = true;
    const returningHome = target.id === "home" && window.scrollY > 24;

    const navigate = () => {
      if (window.location.hash !== href) window.history.pushState(null, "", href);
      target.scrollIntoView({ behavior: "instant", block: "start" });
      setActiveSection(target.id);
    };

    const clearTransition = () => {
      gsap.set(overlay, { autoAlpha: 0, pointerEvents: "none" });
      transitioning.current = false;
      transitionTimeline.current = null;
    };

    try {
      const rows = overlay.querySelectorAll<HTMLElement>("[data-transition-row]");
      gsap.set(overlay, { autoAlpha: 1, pointerEvents: "auto" });
      gsap.set(rows, { xPercent: -105 });
      transitionTimeline.current = gsap.timeline({ onComplete: clearTransition })
        .to(rows, { xPercent: 0, duration: returningHome ? 0.25 : 0.43, stagger: returningHome ? 0.016 : 0.035, ease: "power3.inOut" })
        .call(navigate)
        .addLabel("uncover", returningHome ? "+=0" : "+=0.08")
        .to(rows, { xPercent: 105, duration: returningHome ? 0.34 : 0.48, stagger: returningHome ? 0.016 : 0.035, ease: "power3.inOut" }, "uncover");
    } catch {
      transitionTimeline.current?.kill();
      clearTransition();
      navigate();
    }
  };

  const handleSectionLink = useEffectEvent((event: globalThis.MouseEvent) => {
    if (!(event.target instanceof Element)) return;
    const link = event.target.closest<HTMLAnchorElement>('a[data-section-transition][href^="#"]');
    if (link) handleNavigation(event, link.hash);
  });

  useEffect(() => {
    const onClick = (event: globalThis.MouseEvent) => handleSectionLink(event);
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const isActive = (href: string) => activeSection === href.slice(1);
  const contactActive = isActive(contactHref);

  const renderNavLink = (link: (typeof navLinks)[number], mobile = false) => {
    const active = isActive(link.href);

    return (
      <a
        key={link.href}
        href={link.href}
        aria-current={active ? "location" : undefined}
        onClick={(event) => handleNavigation(event, link.href)}
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
    <header data-site-nav className="fixed inset-x-0 top-0 z-50 border-b border-white/12 bg-[#091a2e]">
      <nav
        ref={navRef}
        className="mx-auto flex min-h-[76px] max-w-[1440px] items-center justify-between gap-4 px-5 sm:px-8 xl:px-12"
        aria-label="Main navigation"
      >
        {/* Brand: custom JP logo */}
        <a
          href="#home"
          onClick={(event) => handleNavigation(event, "#home")}
          className="group flex shrink-0 items-center gap-4 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          aria-label="Jayden Pillay - Home"
          aria-current={isActive("#home") ? "location" : undefined}
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

        <div className="ml-auto hidden items-center gap-3 md:flex lg:gap-5 xl:gap-7">
          {widePrimaryLinks.map((link) => (
            <div key={link.href} className="group relative">
              {renderNavLink(link)}
            </div>
          ))}

          <div
            className="relative"
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) setMoreOpen(false);
            }}
          >
            <button
              type="button"
              onClick={() => setMoreOpen((open) => !open)}
              aria-expanded={moreOpen}
              aria-controls="navbar-more-menu"
              ref={wideMoreRef}
              className={[
                "inline-flex min-h-11 items-center gap-1.5 rounded-lg px-3 py-2",
                "text-sm font-medium transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400",
                moreOpen || mobileMoreLinks.some(({ href }) => isActive(href))
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

            <div
              id="navbar-more-menu"
              hidden={!moreOpen}
              className="absolute right-0 top-[calc(100%+14px)] w-56 rounded-2xl border border-white/10 bg-[#10243b] p-2 shadow-2xl shadow-black/30"
            >
              {mobileMoreLinks.map((link) => renderNavLink(link, true))}
            </div>
          </div>
        </div>

        <a
          href={contactHref}
          onClick={(event) => handleNavigation(event, contactHref)}
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

        <div className="ml-auto flex shrink-0 md:hidden">
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
              onClick={(event) => handleNavigation(event, contactHref)}
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
      {createPortal(
        <div
          ref={transitionRef}
          aria-hidden="true"
          className="pointer-events-none invisible fixed inset-0 z-[100] grid opacity-0"
          style={{ gridTemplateRows: "repeat(12, minmax(0, 1fr))" }}
        >
          {transitionRows.map((row) => (
            <span
              key={row}
              data-transition-row
              className="block h-full w-full bg-[#091a2e]"
            />
          ))}
        </div>,
        document.body,
      )}
    </header>
  );
}

export default Navbar;
