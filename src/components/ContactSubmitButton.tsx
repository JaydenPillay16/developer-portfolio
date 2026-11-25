/** Adapted from Particle Button by @dorianbaffier (Kokonut UI), MIT license. */
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { AlertCircle, Send } from "lucide-react";

type ButtonState = "idle" | "pending" | "success" | "error";

interface ContactSubmitButtonProps {
  state: ButtonState;
  retry: boolean;
  validationError: boolean;
}

const ease = [0.23, 1, 0.32, 1] as const;

function SuccessBurst() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const button = canvas?.parentElement;
    const context = canvas?.getContext("2d");
    if (!canvas || !button || !context) return;

    const bleed = 56;
    const width = button.offsetWidth;
    const height = button.offsetHeight;
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = (width + bleed * 2) * pixelRatio;
    canvas.height = (height + bleed * 2) * pixelRatio;
    context.scale(pixelRatio, pixelRatio);

    const particles = Array.from({ length: 18 }, (_, index) => {
      const x = width * (0.2 + Math.random() * 0.6);
      const angle = -Math.PI / 2 + (Math.random() - 0.5) * 1.8;
      const speed = 0.18 + Math.random() * 0.22;
      return {
        x,
        y: 0,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        rotation: Math.random() * Math.PI,
        spin: (Math.random() - 0.5) * 0.02,
        width: index % 3 === 0 ? 5 : 3,
        height: index % 3 === 0 ? 2 : 3,
      };
    });

    let frame = 0;
    let last = performance.now();
    const start = last;
    const draw = (now: number) => {
      const elapsed = now - start;
      const delta = Math.min(now - last, 32);
      last = now;
      context.clearRect(0, 0, width + bleed * 2, height + bleed * 2);
      if (elapsed >= 650) return;

      context.fillStyle = "#7db5ff";
      context.globalAlpha = 1 - (elapsed / 650) ** 2;
      for (const particle of particles) {
        particle.vx *= 1 - 0.0022 * delta;
        particle.vy = particle.vy * (1 - 0.0022 * delta) + 0.0016 * delta;
        particle.x += particle.vx * delta;
        particle.y += particle.vy * delta;
        particle.rotation += particle.spin * delta;
        context.save();
        context.translate(particle.x + bleed, particle.y + bleed);
        context.rotate(particle.rotation);
        context.fillRect(-particle.width / 2, -particle.height / 2, particle.width, particle.height);
        context.restore();
      }
      frame = requestAnimationFrame(draw);
    };
    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none absolute -inset-14 size-[calc(100%+112px)]" />;
}

export default function ContactSubmitButton({ state, retry, validationError }: ContactSubmitButtonProps) {
  const reduceMotion = useReducedMotion();
  const [displayState, setDisplayState] = useState<ButtonState>(state);

  useEffect(() => {
    setDisplayState(state);
    if (state !== "success" && state !== "error") return;
    const reset = window.setTimeout(() => setDisplayState("idle"), state === "success" ? 1600 : 3200);
    return () => window.clearTimeout(reset);
  }, [state]);

  const visibleState = state === "pending" ? "pending" : displayState;
  const label = visibleState === "pending" ? "Sending message" : visibleState === "success" ? "Message sent" : visibleState === "error" ? validationError ? "Check fields" : "Try again" : retry ? "Try again" : "Send message";

  return (
    <motion.button
      type="submit"
      disabled={state === "pending"}
      aria-busy={state === "pending" || undefined}
      layout={!reduceMotion}
      animate={visibleState === "error" && !reduceMotion ? { x: [0, -5, 5, -3, 3, 0] } : { x: 0 }}
      transition={{ duration: 0.32, ease: "easeOut" }}
      className="relative inline-flex min-h-[54px] w-full items-center justify-center gap-3 rounded-[5px] bg-[#1659cd] px-5 py-3 font-bold text-white shadow-[0_4px_0_#0e3c8d] transition-colors hover:bg-[#1049ac] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1555bf] active:translate-y-px disabled:cursor-wait sm:w-auto sm:min-w-44"
    >
      {visibleState === "success" && !reduceMotion && <SuccessBurst />}
      <span className="relative flex min-h-6 items-center justify-center overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={visibleState === "idle" ? `${visibleState}-${retry}` : `${visibleState}-${validationError}`}
            initial={reduceMotion ? false : { opacity: 0, y: 7 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -7 }}
            transition={{ duration: reduceMotion ? 0 : 0.18, ease }}
            className="inline-flex items-center gap-3 whitespace-nowrap"
          >
            {visibleState === "pending" && <span aria-hidden="true" className="size-4 rounded-full border-2 border-white/35 border-t-white motion-safe:animate-spin" />}
            {visibleState === "success" && (
              <svg aria-hidden="true" className="size-5" viewBox="0 0 20 20" fill="none">
                <motion.path d="m4 10 4 4 8-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: reduceMotion ? 1 : 0 }} animate={{ pathLength: 1 }} transition={{ duration: reduceMotion ? 0 : 0.3, ease }} />
              </svg>
            )}
            {visibleState === "error" && <AlertCircle aria-hidden="true" className="size-4" />}
            {label}
            {visibleState === "idle" && <Send aria-hidden="true" className="size-4" strokeWidth={1.8} />}
          </motion.span>
        </AnimatePresence>
      </span>
    </motion.button>
  );
}
