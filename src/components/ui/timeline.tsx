"use client";
import React, { useEffect, useRef, useState } from "react";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
interface TimelineItem {
  title: string;
  content: React.ReactNode;
}

interface TimelineProps {
  data: TimelineItem[];
}

// ─────────────────────────────────────────────
// Single row — self-contained, scroll-triggered
// ─────────────────────────────────────────────
function TimelineRow({
  item,
  index,
  isLast,
}: {
  item: TimelineItem;
  index: number;
  isLast: boolean;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={rowRef}
      className="flex gap-4 sm:gap-6"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.55s ease, transform 0.55s ease`,
        transitionDelay: `${Math.min(index * 70, 350)}ms`,
        willChange: "opacity, transform",
      }}
    >
      {/* ── Left spine: bullet + connector ── */}
      <div className="flex flex-col items-center flex-shrink-0">
        {/* Bullet */}
        <div className="relative z-10 mt-[3px] h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-background border border-border/70 shadow-sm flex items-center justify-center">
          {/* outer glow ring */}
          <div className="absolute inset-0 rounded-full ring-1 ring-primary/15" />
          {/* middle ring */}
          <div className="h-[18px] w-[18px] sm:h-5 sm:w-5 rounded-full bg-primary/10 border border-primary/35 flex items-center justify-center">
            {/* core dot */}
            <div className="h-[7px] w-[7px] rounded-full bg-primary shadow-[0_0_6px_hsl(var(--primary)/0.7)]" />
          </div>
        </div>

        {/* Connector line — stretches to fill gap to next bullet */}
        {!isLast && (
          <div
            aria-hidden
            className="flex-1 w-px mt-2 min-h-[32px] rounded-full"
            style={{
              background:
                "linear-gradient(to bottom, hsl(var(--border)/0.7), hsl(var(--border)/0.1))",
            }}
          />
        )}
      </div>

      {/* ── Right content ── */}
      <div className={isLast ? "flex-1 min-w-0 pb-2" : "flex-1 min-w-0 pb-9 sm:pb-12"}>
        {/* Date / period label */}
        <p className="mb-2.5 text-[11px] sm:text-xs font-semibold font-heading tracking-widest uppercase text-primary/70">
          {item.title}
        </p>

        {/* Injected card from Timeline.js */}
        {item.content}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Main export — drop-in replacement
// ─────────────────────────────────────────────
export const Timeline = ({ data }: TimelineProps) => {
  if (!data || data.length === 0) return null;

  return (
    <section className="w-full px-4 sm:px-6 md:px-10">
      {/* Section header */}
      <div className="max-w-2xl mx-auto pt-14 pb-10 sm:pt-20 sm:pb-12 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl mb-3 text-primary font-heading tracking-wider">
          MY JOURNEY
        </h2>
        <p className="text-muted-foreground text-sm md:text-base max-w-xl mx-auto leading-relaxed">
          A chronicle of my path as a Full Stack Developer, highlighting key milestones,
          freelance client projects, and AI integrations.
        </p>
      </div>

      {/* Timeline rows */}
      <div className="max-w-2xl mx-auto pb-16">
        {data.map((item, index) => (
          <TimelineRow
            key={index}
            item={item}
            index={index}
            isLast={index === data.length - 1}
          />
        ))}
      </div>
    </section>
  );
};
