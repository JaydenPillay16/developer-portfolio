import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "motion/react";
import { useRef, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

function Reveal({ children, className = "", delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.88", "end 0.12"],
  });

  const rawOpacity = useTransform(
    scrollYProgress,
    [0, 0.22, 0.78, 1],
    [0, 1, 1, 0],
  );

  const rawY = useTransform(
    scrollYProgress,
    [0, 0.22, 0.78, 1],
    [48, 0, 0, -32],
  );

  const rawScale = useTransform(
    scrollYProgress,
    [0, 0.22, 0.78, 1],
    [0.96, 1, 1, 0.985],
  );

  const rawBlur = useTransform(
    scrollYProgress,
    [0, 0.22, 0.78, 1],
    [8, 0, 0, 5],
  );

  const opacity = useSpring(rawOpacity, {
    stiffness: 110,
    damping: 26,
    mass: 0.7,
  });

  const y = useSpring(rawY, {
    stiffness: 110,
    damping: 26,
    mass: 0.7,
  });

  const scale = useSpring(rawScale, {
    stiffness: 110,
    damping: 26,
    mass: 0.7,
  });

  const blur = useSpring(rawBlur, {
    stiffness: 110,
    damping: 26,
    mass: 0.7,
  });

  const filter = useMotionTemplate`blur(${blur}px)`;

  return (
    <motion.div
      ref={ref}
      className={className}
      style={
        shouldReduceMotion
          ? undefined
          : {
              opacity,
              y,
              scale,
              filter,
            }
      }
      transition={{
        delay: shouldReduceMotion ? 0 : delay,
      }}
    >
      {children}
    </motion.div>
  );
}

export default Reveal;
