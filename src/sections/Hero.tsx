import { FileText, Folder } from "lucide-react";
import Button from "../components/Button";
import HeroHalo from "../components/HeroHalo";

function Hero() {
  return (
    <section id="home" className="home-hero relative isolate flex h-[780px] items-center overflow-hidden bg-[#07111f] px-6 pb-24 pt-32 text-white sm:px-10 lg:px-16">
      <HeroHalo />
      <img src="/images/hero-portrait-cutout.webp" alt="Jayden Pillay, Software Engineer" width="1000" height="1075" fetchPriority="high" decoding="async" className="home-hero-photo" />
      <div aria-hidden="true" className="home-hero-shade pointer-events-none absolute inset-0 z-10" />
      <div className="relative z-20 mx-auto w-full max-w-7xl">
        <div className="max-w-[640px]">
          <h1 className="text-[clamp(4.5rem,8.5vw,7.5rem)] font-bold leading-[0.86] tracking-[-0.038em]">Jayden<br />Pillay<span className="text-[#2875ff]">.</span></h1>
          <p className="mt-9 max-w-[560px] text-[clamp(1.3rem,2.1vw,1.75rem)] leading-[1.35] tracking-[-0.025em] text-[#e3ebf8]">I build cloud and enterprise software that makes complex work more reliable.</p>
          <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4 max-sm:flex-col max-sm:items-start">
            <Button href="#projects" variant="primary" className="min-w-[260px] sm:min-w-[290px]"><span>View my work</span><Folder aria-hidden="true" className="h-[22px] w-[22px]" strokeWidth={1.7} /></Button>
            <a href="/Jayden-Pillay-CV.pdf" download="Jayden-Pillay-CV.pdf" className="inline-flex min-h-11 items-center gap-2.5 border-b border-[#a9caff] text-sm font-bold text-white transition-colors hover:text-[#a9caff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300">Download CV <FileText aria-hidden="true" className="h-[18px] w-[18px]" strokeWidth={1.7} /></a>
          </div>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 z-20 flex items-center justify-between gap-4 border-t border-white/25 px-6 py-4 text-xs text-[#cddbf1] sm:px-10 lg:px-16">
        <span>Johannesburg, South Africa <span aria-hidden="true" className="mx-2">/</span> NTT DATA</span>
        <a href="#projects" className="shrink-0 text-[#9dc4ff] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300">Scroll to work</a>
      </div>
    </section>
  );
}

export default Hero;
