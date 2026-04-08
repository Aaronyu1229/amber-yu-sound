"use client";

export default function SectionTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block text-xs font-medium tracking-[3px] uppercase text-purple font-body">
      {children}
    </span>
  );
}
