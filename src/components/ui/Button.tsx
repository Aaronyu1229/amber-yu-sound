"use client";

import { type ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary";
  href?: string;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  href,
  className = "",
  type = "button",
  disabled = false,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 px-7 py-3.5 text-xs font-medium tracking-[2px] uppercase rounded transition-all duration-300";

  const variants = {
    primary:
      "bg-gold text-bg hover:bg-gold-light hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(201,165,92,.25)]",
    secondary:
      "border border-purple text-purple hover:bg-purple-dim hover:-translate-y-0.5 hover:border-purple/60",
  };

  const cursor = disabled
    ? "cursor-not-allowed opacity-60 pointer-events-none"
    : "cursor-pointer";

  const cls = `${base} ${variants[variant]} ${cursor} ${className}`;

  if (href) {
    return (
      <a href={href} className={cls}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} disabled={disabled} className={cls}>
      {children}
    </button>
  );
}
