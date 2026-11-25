import { useEffect, useRef } from "react";

function CursorHalo() {
  const cursorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const cursor = cursorRef.current;

    if (!finePointer || reducedMotion || !cursor) return;

    let pointerX = 0;
    let pointerY = 0;
    let framePending = false;
    let animationFrame = 0;

    const handlePointerMove = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;

      if (framePending) return;
      framePending = true;
      animationFrame = window.requestAnimationFrame(() => {
        cursor.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0) translate(-50%, -50%)`;
        cursor.classList.add("is-visible");
        framePending = false;
      });
    };

    const handlePointerOver = (event: PointerEvent) => {
      const target = event.target;
      cursor.classList.toggle(
        "is-link",
        target instanceof Element && Boolean(target.closest("a, button")),
      );
    };

    const hideCursor = () => cursor.classList.remove("is-visible");

    document.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    document.addEventListener("pointerover", handlePointerOver, {
      passive: true,
    });
    document.addEventListener("pointerleave", hideCursor);

    return () => {
      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerover", handlePointerOver);
      document.removeEventListener("pointerleave", hideCursor);
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return <span ref={cursorRef} className="cursor-ring" aria-hidden="true" />;
}

export default CursorHalo;
