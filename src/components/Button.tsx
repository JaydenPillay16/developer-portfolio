import type { ReactNode, MouseEventHandler, ButtonHTMLAttributes } from "react";

type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
  href?: string;
  animateNavigation?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  className?: string;
};

function Button({
  children,
  variant = "primary",
  href,
  animateNavigation,
  onClick,
  type = "button",
  className = "",
}: ButtonProps) {
  const baseStyles =
    "group relative inline-flex min-h-[54px] items-center justify-between gap-8 overflow-hidden rounded-[5px] px-6 py-3 text-base font-bold tracking-[-0.02em] transition-[transform,background-color,box-shadow] duration-200 ease-out hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-300 active:translate-y-0 active:scale-[0.99] sm:px-7 sm:text-lg";

  const variants = {
    primary:
      "border border-blue-400/30 bg-[#2875ff] text-white shadow-[0_6px_0_#1748a7] hover:bg-[#3980ff] hover:shadow-[0_6px_0_#1748a7,0_10px_28px_rgba(40,117,255,0.22)]",

    secondary:
      "border border-violet-400/40 bg-violet-500/10 text-white hover:border-violet-300/70 hover:bg-violet-500/20 hover:shadow-lg hover:shadow-violet-500/20",

    outline:
      "border border-white/20 bg-white/[0.03] text-slate-200 hover:border-blue-400/70 hover:bg-blue-500/10 hover:text-white hover:shadow-lg hover:shadow-blue-500/15",
  };

  const content = (
    <>
      {/* Animated shine across the button */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -translate-x-[150%] skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/12 to-transparent transition-transform duration-700 ease-in-out group-hover:translate-x-[150%]"
      />

      {/* Subtle hover highlight */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[5px] opacity-0 ring-1 ring-inset ring-white/30 transition-opacity duration-300 group-hover:opacity-100"
      />

      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
      </span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        data-section-transition={animateNavigation ? "" : undefined}
        className={`${baseStyles} ${variants[variant]} ${className}`}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {content}
    </button>
  );
}

export default Button;
