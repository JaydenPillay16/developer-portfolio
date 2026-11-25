import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("home");
    if (!hero) return;

    const observer = new IntersectionObserver(([entry]) => {
      setVisible(!entry.isIntersecting && entry.boundingClientRect.bottom <= 0);
    });
    observer.observe(hero);

    return () => observer.disconnect();
  }, []);

  function scrollToTop() {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById("main-content")?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: reduceMotion ? "instant" : "smooth" });
  }

  return (
    <button
      type="button"
      aria-label="Back to top"
      title="Back to top"
      inert={!visible}
      onClick={scrollToTop}
      className={`fixed bottom-5 right-5 z-40 grid size-11 place-items-center rounded-[5px] border border-[#6481a0] bg-[#091a2e] text-white transition-[opacity,background-color] duration-200 hover:bg-[#173451] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2875ff] motion-reduce:transition-none sm:bottom-8 sm:right-8 ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <ArrowUp aria-hidden="true" size={19} strokeWidth={2} />
    </button>
  );
}
