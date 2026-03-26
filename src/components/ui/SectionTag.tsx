"use client";

export default function SectionTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block text-[10px] font-medium tracking-[5px] uppercase text-purple font-body">
      {children}
    </span>
  );
}
