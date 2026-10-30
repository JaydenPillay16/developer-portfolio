import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";

function CursorHalo() {
  const shouldReduceMotion = useReducedMotion();
  const [isEnabled, setIsEnabled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isInteractive, setIsInteractive] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const pointerX = useMotionValue(-100);
  const pointerY = useMotionValue(-100);
  const x = useSpring(pointerX, { stiffness: 500, damping: 38, mass: 0.22 });
  const y = useSpring(pointerY, { stiffness: 500, damping: 38, mass: 0.22 });

  useEffect(() => {
    if (shouldReduceMotion) return;

    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const updateEnabled = () => {
      setIsEnabled(finePointer.matches);
      document.body.classList.toggle("has-custom-cursor", finePointer.matches);
    };
    const hide = () => {
      setIsVisible(false);
      setIsPressed(false);
    };

    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;

      pointerX.set(event.clientX - 16);
      pointerY.set(event.clientY - 16);
      setIsVisible(true);

      const target = event.target;
      setIsInteractive(
        target instanceof Element &&
          Boolean(
            target.closest(
              'a, button, [role="button"], input, select, textarea, label[for]',
            ),
          ),
      );
    };

    const press = (event: PointerEvent) => {
      if (event.pointerType === "mouse") setIsPressed(true);
    };
    const release = () => setIsPressed(false);

    updateEnabled();
    finePointer.addEventListener("change", updateEnabled);
    document.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerdown", press, { passive: true });
    window.addEventListener("pointerup", release, { passive: true });
    window.addEventListener("blur", hide);
    document.documentElement.addEventListener("pointerleave", hide);

    return () => {
      document.body.classList.remove("has-custom-cursor");
      finePointer.removeEventListener("change", updateEnabled);
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerdown", press);
      window.removeEventListener("pointerup", release);
      window.removeEventListener("blur", hide);
      document.documentElement.removeEventListener("pointerleave", hide);
    };
  }, [pointerX, pointerY, shouldReduceMotion]);

  if (!isEnabled || shouldReduceMotion) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[9999] h-8 w-8 rounded-full border border-cyan-200/45 bg-[radial-gradient(circle,rgba(103,232,249,0.10),rgba(99,102,241,0.07)_58%,rgba(8,11,32,0.02)_100%)] shadow-[0_0_18px_rgba(34,211,238,0.16),inset_0_0_12px_rgba(139,92,246,0.12)] after:absolute after:inset-[4px] after:rounded-full after:border after:border-violet-300/35 after:content-['']"
      style={{ x, y, opacity: isVisible ? 1 : 0 }}
      animate={{ scale: isPressed ? 0.82 : isInteractive ? 1.45 : 1 }}
      transition={{
        scale: { type: "spring", stiffness: 420, damping: 24 },
        opacity: { duration: 0.14 },
      }}
    >
      <span className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-100 shadow-[0_0_8px_rgba(103,232,249,0.9)]" />
    </motion.div>
  );
}

export default CursorHalo;
