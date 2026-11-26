import { createRoot } from "react-dom/client";
import { useLayoutEffect, useRef, useState } from "react";
import { ArrowUpRight, FileText, Folder, Mail, Pause, Play, RotateCcw } from "lucide-react";
import { gsap } from "gsap";
import logo from "../../src/assets/jp-monogram.png";
import Projects from "../../src/sections/Projects";
import "../../src/index.css";
import "./preview.css";
import { createReveal, type Design } from "./motion";
import type { OrbitScene } from "./orbit";

const concepts = {
  aperture: {
    name: "Cobalt Aperture", duration: "0.88 s", engine: "GSAP · DOM",
    description: "A seam of cobalt light opens into the halo behind your portrait. Your name rises in two strokes as the light moves outward.",
    integration: "Give the existing halo and the two lines of the heading to a single GSAP timeline. The parallel light rays are temporary decorative layers. This is the lightest reveal and my pick for the portfolio.",
  },
  orbit: {
    name: "Orbital Lock", duration: "1.12 s", engine: "GSAP · Three.js",
    description: "A bright point travels along a tilted orbit. A second arc adds depth, and the halo comes up behind your portrait as the orbit dissolves.",
    integration: "Lazy load the Three.js sweep after the hero is visible. Draw only while GSAP moves the playhead, use the CSS orbit when WebGL is unavailable, and release the renderer after the reveal in production.",
  },
  blueprint: {
    name: "Blueprint Fold", duration: "1.05 s", engine: "GSAP · CSS 3D",
    description: "A drafting grid tilts into place behind the hero. Corner marks settle, the type and portrait come forward, and the drawing fades away.",
    integration: "Use a single grid layer and four corner marks, animated with transforms and opacity. Keep the geometry decorative and leave the existing hero and links in the document flow.",
  },
} satisfies Record<Design, { name: string; duration: string; engine: string; description: string; integration: string }>;

const designs = Object.keys(concepts) as Design[];
const requestedDesign = new URLSearchParams(location.search).get("design");
const initialDesign = designs.find((design) => design === requestedDesign) ?? "aperture";
const rows = Array.from({ length: 12 }, (_, index) => index);

function HeroStudy({ onHome }: { onHome: () => void }) {
  return (
    <>
      <div className="study-nav">
        <button type="button" className="study-brand" aria-label="Return Home in preview" onClick={onHome}>
          <img src={logo} width="56" height="40" alt="" />
        </button>
        <nav aria-label="Portfolio links">
          <button type="button" onClick={onHome}>Home</button>
          <a href="/#about">About</a>
          <a href="/#skills">Skills</a>
          <a href="/#projects">Projects</a>
        </nav>
        <a href="/#contact" className="study-contact">Get in Touch <Mail size={15} aria-hidden="true" /></a>
      </div>

      <div className="study-hero home-hero">
        <div className="study-grid-frame" aria-hidden="true">
          <div className="blueprint-grid" />
          <div className="blueprint-brackets"><i /><i /><i /><i /></div>
        </div>
        <div className="home-hero-halo study-halo" aria-hidden="true">
          <div className="home-hero-halo-light" />
          <div className="aperture-rays"><i /><i /></div>
          <div className="study-orbit">
            <div className="orbit-fallback"><i /><i /><i /></div>
          </div>
        </div>
        <div className="study-portrait">
          <img src="/images/hero-portrait-cutout.webp" alt="Jayden Pillay, Software Engineer" width="1000" height="1075" fetchPriority="high" />
        </div>
        <div className="home-hero-shade study-shade" aria-hidden="true" />
        <div className="study-copy">
          <h2 className="study-title" aria-label="Jayden Pillay"><span><b>Jayden</b></span><span><b>Pillay<span className="study-dot">.</span></b></span></h2>
          <p className="study-intro">I build cloud and enterprise software that makes complex work more reliable.</p>
          <div className="study-actions">
            <a className="study-work" href="/#projects">View my work <Folder size={21} aria-hidden="true" /></a>
            <a className="study-cv" href="/Jayden-Pillay-CV.pdf" download>Download CV <FileText size={17} aria-hidden="true" /></a>
          </div>
        </div>
        <div className="study-hero-foot"><span>Johannesburg, South Africa <span aria-hidden="true">/</span> NTT DATA</span><a href="/#projects">Scroll to work</a></div>
      </div>
    </>
  );
}

function Preview() {
  const [design, setDesign] = useState<Design>(initialDesign);
  const [returning, setReturning] = useState(false);
  const [playing, setPlaying] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLInputElement>(null);
  const timeRef = useRef<HTMLOutputElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const concept = concepts[design];

  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const motionPreference = matchMedia("(prefers-reduced-motion: reduce)");
    const reduced = motionPreference.matches;
    let disposed = false;
    let orbitScene: OrbitScene | undefined;
    let orbitProgress = 0;
    let timeline: gsap.core.Timeline;

    const updateControls = () => {
      if (sliderRef.current) sliderRef.current.value = String(Math.round(timeline.progress() * 1000));
      if (timeRef.current) timeRef.current.value = `${timeline.time().toFixed(2)} / ${timeline.duration().toFixed(2)} s`;
    };

    const context = gsap.context(() => {
      timeline = createReveal(stage, design, returning, {
        render: (progress) => {
          orbitProgress = progress;
          orbitScene?.render(progress);
        },
        dispose: () => orbitScene?.dispose(),
      });
      timelineRef.current = timeline;
      timeline.eventCallback("onUpdate", updateControls);
      timeline.eventCallback("onComplete", () => setPlaying(false));
      timeline.progress(1, true).pause();
      updateControls();
    }, stage);

    setPlaying(false);
    if (!reduced) {
      const portrait = stage.querySelector<HTMLImageElement>(".study-portrait img");
      const play = () => {
        if (disposed || document.hidden || motionPreference.matches || timeline.progress() < 1) return;
        timeline.restart();
        setPlaying(true);
      };
      if (portrait?.complete) play();
      else void portrait?.decode().then(play, play);

      const orbit = stage.querySelector<HTMLElement>(".study-orbit");
      if (design === "orbit" && orbit) {
        void import("./orbit").then(({ createOrbit }) => {
          if (disposed || motionPreference.matches) return;
          orbitScene = createOrbit(orbit);
          orbitScene?.render(orbitProgress);
        }).catch(() => { /* The CSS orbit already provides the preview. */ });
      }
    }

    const handleVisibility = () => {
      if (!document.hidden || timeline.paused()) return;
      timeline.pause();
      setPlaying(false);
    };
    const handlePreference = () => {
      if (!motionPreference.matches) return;
      timeline.progress(1).pause();
      orbitScene?.dispose();
      setPlaying(false);
    };
    document.addEventListener("visibilitychange", handleVisibility);
    motionPreference.addEventListener("change", handlePreference);

    return () => {
      disposed = true;
      document.removeEventListener("visibilitychange", handleVisibility);
      motionPreference.removeEventListener("change", handlePreference);
      orbitScene?.dispose();
      context.revert();
      timelineRef.current = null;
    };
  }, [design, returning]);

  function replay() {
    timelineRef.current?.restart();
    setPlaying(true);
  }

  function togglePlayback() {
    const timeline = timelineRef.current;
    if (!timeline) return;
    if (playing) {
      timeline.pause();
      setPlaying(false);
    } else if (timeline.progress() >= 1) replay();
    else {
      timeline.play();
      setPlaying(true);
    }
  }

  function returnHome() {
    if (returning) replay();
    else setReturning(true);
  }

  return (
    <main className="study-shell">
      <header className="study-header">
        <div><h1>Hero reveal studies</h1><p>Three ways to bring the opening frame to life.</p></div>
        <a href="/">Open portfolio <ArrowUpRight size={16} aria-hidden="true" /></a>
      </header>

      <div className="study-toolbar">
        <div className="study-options" role="group" aria-label="Reveal concept">
          {designs.map((option) => <button type="button" key={option} aria-pressed={design === option} onClick={() => setDesign(option)}>{concepts[option].name}</button>)}
        </div>
        <div className="study-options study-modes" role="group" aria-label="Arrival preview">
          <button type="button" aria-pressed={!returning} onClick={() => setReturning(false)}>First visit</button>
          <button type="button" aria-pressed={returning} onClick={returnHome}>Return Home</button>
        </div>
      </div>

      <div className="study-stage" ref={stageRef} data-returning={returning || undefined}>
        <HeroStudy onHome={returnHome} />
        <div className="study-previous" aria-hidden="true" inert><Projects /></div>
        <div className="study-rows" aria-hidden="true">{rows.map((row) => <span key={row} />)}</div>
      </div>

      <div className="study-player">
        <button type="button" onClick={togglePlayback}>{playing ? <Pause size={15} aria-hidden="true" /> : <Play size={15} aria-hidden="true" />}{playing ? "Pause" : "Play"}</button>
        <button type="button" onClick={replay}><RotateCcw size={15} aria-hidden="true" /> Replay</button>
        <input ref={sliderRef} aria-label="Seek animation" type="range" min="0" max="1000" defaultValue="1000" onChange={(event) => {
          timelineRef.current?.pause().progress(Number(event.currentTarget.value) / 1000);
          setPlaying(false);
        }} />
        <output ref={timeRef} aria-live="off" />
      </div>

      <section className="study-notes" aria-label="Design and implementation notes">
        <div><h2>{concept.name}</h2><p>{concept.description}</p><small>{concept.duration} reveal <span aria-hidden="true">·</span> {concept.engine}</small></div>
        <div><h3>How it fits the site</h3><p>{concept.integration}</p><p>On first load, play once after the portrait is ready. On Home navigation, start as the existing rows uncover the hero. Jump straight to the finished hero with reduced motion, and skip the intro on links that open another section.</p></div>
      </section>
    </main>
  );
}

createRoot(document.getElementById("root")!).render(<Preview />);
