import { useLayoutEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { ArrowDown, ArrowUpRight, RotateCcw } from "lucide-react";
import "../../src/index.css";
import "../hero-reveals/preview.css";
import "./stories.css";
import { installStudy, type Study } from "./choreography";

const studies = {
  lightfold: {
    name: "Lightfold",
    sections: "Hero to About",
    description: "The grid behind the portrait tips forward as you scroll. Its leading edge becomes a cobalt crease, then the white About page rises into place and takes over the screen.",
    integration: "Extend Blueprint Fold into the next section with one decorative plane and a short ScrollTrigger timeline. Keep both sections in the document flow. My pick for the opening transition.",
  },
  signal: {
    name: "Signal Path",
    sections: "Skills to Projects",
    description: "AWS, Amazon Connect and Terraform become parts of a circuit. A pulse moves through the routes and hands off to the project where those tools come together.",
    integration: "Place the route graphic beside the final Skills row. Animate a few pre-positioned lines and a pulse with transforms, then let Selected Work take over. The transition makes the connection between skills and actual work visible.",
  },
  index: {
    name: "Index Pivot",
    sections: "Projects to Experience",
    description: "Three project plates turn edge-on in sequence. The gaps expose the Experience timeline, and its blue rule locks into place as the final plate clears.",
    integration: "Build the plates as temporary CSS 3D layers over the real Experience section. Drive the panels and the timeline from one ScrollTrigger. This has the strongest depth and fits best as a single moment on the page.",
  },
} satisfies Record<Study, { name: string; sections: string; description: string; integration: string }>;

const options = Object.keys(studies) as Study[];
const requested = new URLSearchParams(location.search).get("study");
const initialStudy = options.find((option) => option === requested) ?? "lightfold";

function Lightfold() {
  return (
    <>
      <div className="story-from lightfold-home story-dark">
        <div className="story-portrait-light" aria-hidden="true" />
        <img className="lightfold-portrait" src="/images/hero-portrait-cutout.webp" alt="Jayden Pillay, Software Engineer" width="1000" height="1075" />
        <div className="lightfold-plane" aria-hidden="true" />
        <div className="lightfold-copy">
          <h2>Jayden<br />Pillay<span>.</span></h2>
          <p>I build cloud and enterprise software that makes complex work more reliable.</p>
        </div>
      </div>
      <div className="story-to story-paper">
        <div className="lightfold-crease" aria-hidden="true" />
        <div className="story-arrival story-editorial">
          <p className="story-label">About <span aria-hidden="true" /></p>
          <h2>A little more<br />about me</h2>
          <p>I’m a Software Engineer at NTT DATA. My work spans cloud engineering, software development, and automation.</p>
          <div className="lightfold-focus"><span>AWS</span><span>Amazon Connect</span><span>Terraform</span><span>CI/CD</span></div>
        </div>
      </div>
    </>
  );
}

const nodes = [
  ["AWS", "/images/issuers/aws.svg"],
  ["Amazon Connect", "/images/technologies/Connect.svg"],
  ["Terraform", "/images/technologies/terraform-light.svg"],
];

function SignalPath() {
  return (
    <>
      <div className="story-from story-dark signal-skills">
        <div className="story-editorial">
          <h2>Skills</h2>
          <p>A growing toolkit across cloud engineering, software development, enterprise automation, and DevOps.</p>
        </div>
        <div className="signal-diagram" aria-label="AWS, Amazon Connect and Terraform connect to the contact centre project.">
          <div className="signal-inputs">
            {nodes.map(([name, icon]) => <div className="signal-node" key={name}><img src={icon} alt="" width="24" height="24" /><span>{name}</span></div>)}
          </div>
          <div className="signal-routes" aria-hidden="true"><i className="signal-route" /><i className="signal-route" /><i className="signal-route" /><i className="signal-packet" /></div>
          <div className="signal-output"><span>Contact centre</span><strong>ABSA Group</strong></div>
        </div>
      </div>
      <div className="story-to story-paper signal-projects">
        <div className="story-editorial story-arrival">
          <p className="story-label">Selected work <span aria-hidden="true" /></p>
          <h2>Amazon Connect<br />Contact Centre Solution</h2>
          <p>Contact flows, conversational experiences, and infrastructure configuration for ABSA Group’s cloud contact centre.</p>
          <div className="lightfold-focus"><span>Amazon Connect</span><span>Amazon Lex</span><span>AWS</span><span>Terraform</span></div>
        </div>
      </div>
    </>
  );
}

const plates = [
  ["Cloud engineering", "Amazon Connect Contact Centre Solution"],
  ["Enterprise software", "Internal Document & Records Management System"],
  ["Process automation", "Automated Quality Documentation"],
];

const roles = [
  ["March 2026 to Present", "Associate Software Engineer"],
  ["October 2025 to March 2026", "Associate DevOps Engineer"],
  ["May 2024 to October 2025", "Associate Software Developer"],
];

function IndexPivot() {
  return (
    <>
      <div className="story-from index-from story-dark">
        <div className="index-cover" />
        <div className="story-editorial index-work">
          <h2 className="index-heading">Selected work</h2>
          <div className="index-plates">
            {plates.map(([category, title]) => <div className="index-plate" key={title}><span>{category}</span><strong>{title}</strong></div>)}
          </div>
        </div>
      </div>
      <div className="story-to story-paper index-to">
        <div className="story-editorial">
          <h2>Professional<br />experience</h2>
          <div className="index-timeline">
            <span className="index-timeline-rule" aria-hidden="true" />
            {roles.map(([period, title]) => <div className="story-arrival index-role" key={title}><time>{period}</time><strong>{title}</strong></div>)}
          </div>
        </div>
      </div>
    </>
  );
}

function StudyPlayer({ study }: { study: Study }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const rangeRef = useRef<HTMLInputElement>(null);
  const progressRef = useRef<HTMLOutputElement>(null);

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const update = (progress: number) => {
      const percent = Math.round(progress * 100);
      if (rangeRef.current) rangeRef.current.value = String(percent);
      if (progressRef.current) progressRef.current.value = `${percent}%`;
    };
    const cleanup = installStudy(scroller, study, update);
    const sync = () => update(scroller.scrollTop / Math.max(1, scroller.scrollHeight - scroller.clientHeight));
    scroller.addEventListener("scroll", sync, { passive: true });
    return () => {
      cleanup();
      scroller.removeEventListener("scroll", sync);
    };
  }, [study]);

  const seek = (fraction: number) => {
    const scroller = scrollerRef.current;
    if (scroller) scroller.scrollTop = fraction * (scroller.scrollHeight - scroller.clientHeight);
  };

  return (
    <>
      <div className="story-player-label"><ArrowDown size={17} aria-hidden="true" /><span>Scroll inside the preview or drag the slider. Scroll back up to reverse.</span></div>
      <div ref={scrollerRef} className="story-scroller" role="region" tabIndex={0} aria-label={`${studies[study].name} scroll preview`}>
        <div className="story-track">
          <div className={`story-stage story-${study}`}>
            {study === "lightfold" ? <Lightfold /> : study === "signal" ? <SignalPath /> : <IndexPivot />}
          </div>
        </div>
      </div>
      <div className="study-player">
        <button type="button" onClick={() => seek(0)}><RotateCcw size={15} aria-hidden="true" /> Reset</button>
        <input ref={rangeRef} type="range" min="0" max="100" defaultValue="0" aria-label="Scroll preview position" onChange={(event) => seek(Number(event.currentTarget.value) / 100)} />
        <output ref={progressRef} aria-live="off">0%</output>
      </div>
    </>
  );
}

function Preview() {
  const [study, setStudy] = useState<Study>(initialStudy);
  const concept = studies[study];
  return (
    <main className="study-shell">
      <header className="study-header">
        <div><h1>Scroll studies</h1><p>Three ways to connect the portfolio’s sections.</p></div>
        <a href="/">Open portfolio <ArrowUpRight size={16} aria-hidden="true" /></a>
      </header>
      <div className="study-toolbar">
        <div className="study-options" role="group" aria-label="Scroll concept">
          {options.map((option) => <button type="button" key={option} aria-pressed={study === option} onClick={() => setStudy(option)}>{studies[option].name}</button>)}
        </div>
        <span className="story-destination">{concept.sections}</span>
      </div>
      <StudyPlayer study={study} key={study} />
      <section className="study-notes" aria-label="Design and implementation notes">
        <div><h2>{concept.name}</h2><p>{concept.description}</p></div>
        <div><h3>How it fits the site</h3><p>{concept.integration}</p><p>Use native scrolling and one reversible timeline. With reduced motion, the sections flow normally.</p></div>
      </section>
    </main>
  );
}

createRoot(document.getElementById("root")!).render(<Preview />);
