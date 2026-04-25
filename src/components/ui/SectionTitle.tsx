"use client";

interface SectionTitleProps {
  children: string;
  highlight?: string;
  className?: string;
}

export default function SectionTitle({
  children,
  highlight,
  className = "",
}: SectionTitleProps) {
  if (!highlight) {
    return (
      <h2
        className={`font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-ivory leading-tight break-words ${className}`}
      >
        {children}
      </h2>
    );
  }

  const parts = children.split(highlight);
  return (
    <h2
      className={`font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-ivory leading-tight break-words ${className}`}
    >
      {parts[0]}
      <span className="text-gold">{highlight}</span>
      {parts[1]}
    </h2>
  );
}
