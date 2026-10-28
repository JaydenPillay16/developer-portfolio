import type { ReactNode, MouseEventHandler, ButtonHTMLAttributes } from "react";

type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
  href?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  className?: string;
};

function Button({
  children,
  variant = "primary",
  href,
  onClick,
  type = "button",
  className = "",
}: ButtonProps) {
  const baseStyles =
    "group relative inline-flex min-h-12 items-center justify-center gap-2 overflow-hidden rounded-xl px-7 py-3.5 text-sm font-semibold tracking-wide transition-all duration-300 ease-out hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-400 active:translate-y-0 active:scale-[0.98] sm:text-base";

  const variants = {
    primary:
      "bg-gradient-to-r from-blue-500 via-blue-500 to-violet-500 text-white shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30",

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
        className="pointer-events-none absolute inset-0 -translate-x-[150%] skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-in-out group-hover:translate-x-[150%]"
      />

      {/* Subtle hover highlight */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-xl opacity-0 ring-1 ring-inset ring-white/30 transition-opacity duration-300 group-hover:opacity-100"
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
