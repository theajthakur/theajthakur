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
// Single row — IntersectionObserver animation
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
        transition: "opacity 0.55s ease, transform 0.55s ease",
        transitionDelay: `${Math.min(index * 70, 350)}ms`,
        willChange: "opacity, transform",
      }}
    >
      {/* ── Spine ── */}
      <div className="flex flex-col items-center flex-shrink-0">
        <div className="relative z-10 mt-[3px] h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-background border border-border/70 shadow-sm flex items-center justify-center">
          <div className="absolute inset-0 rounded-full ring-1 ring-primary/15" />
          <div className="h-[18px] w-[18px] sm:h-5 sm:w-5 rounded-full bg-primary/10 border border-primary/35 flex items-center justify-center">
            <div className="h-[7px] w-[7px] rounded-full bg-primary shadow-[0_0_6px_hsl(var(--primary)/0.7)]" />
          </div>
        </div>
        {!isLast && (
          <div
            aria-hidden
            className="flex-1 w-px mt-2 min-h-[32px] rounded-full"
            style={{
              background:
                "linear-gradient(to bottom, hsl(var(--border)/0.6), hsl(var(--border)/0.05))",
            }}
          />
        )}
      </div>

      {/* ── Content ── */}
      <div className={isLast ? "flex-1 min-w-0 pb-2" : "flex-1 min-w-0 pb-9 sm:pb-12"}>
        <p className="mb-2.5 text-[11px] sm:text-xs font-semibold font-heading tracking-widest uppercase text-primary/70">
          {item.title}
        </p>
        {item.content}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Sticky left panel — desktop only
// ─────────────────────────────────────────────
function StickyPanel({ count }: { count: number }) {
  return (
    <div className="sticky top-0 h-screen flex flex-col justify-center gap-8 py-20 pr-8 xl:pr-12">

      {/* Label */}
      <div className="flex items-center gap-3">
        <span
          className="block h-px w-8 rounded-full"
          style={{ background: "hsl(var(--primary)/0.5)" }}
        />
        <span className="text-[10px] tracking-[0.25em] uppercase font-heading text-primary/55">
          Timeline
        </span>
      </div>

      {/* Main heading */}
      <div>
        <h2
          className="text-5xl xl:text-6xl 2xl:text-7xl font-heading font-bold leading-[0.95] tracking-tight"
          style={{
            background:
              "linear-gradient(135deg, hsl(var(--foreground)) 0%, hsl(var(--primary)) 60%, hsl(var(--secondary)) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          MY
          <br />
          JOUR
          <br />
          NEY
        </h2>
      </div>

      {/* Description */}
      <p className="text-muted-foreground text-sm leading-relaxed max-w-[260px]">
        A chronicle of my path as a Full Stack Developer — milestones, freelance
        projects, and AI integrations.
      </p>

      {/* Stats */}
      <div className="space-y-2.5">
        {[
          { label: `${count} milestones`, alpha: 1 },
          { label: "2023 → Present",      alpha: 0.6 },
        ].map(({ label, alpha }) => (
          <div key={label} className="flex items-center gap-2.5">
            <div
              className="h-1.5 w-1.5 rounded-full flex-shrink-0"
              style={{ background: `hsl(var(--primary)/${alpha})` }}
            />
            <span className="text-xs text-muted-foreground">{label}</span>
          </div>
        ))}
      </div>

      {/* Decorative stacked bars */}
      <div className="flex flex-col gap-1.5 mt-auto">
        {[40, 28, 18, 10, 6].map((w, i) => (
          <div
            key={i}
            className="h-px rounded-full"
            style={{
              width: `${w}px`,
              background: `hsl(var(--primary)/${0.5 - i * 0.08})`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Root export
// ─────────────────────────────────────────────
export const Timeline = ({ data }: TimelineProps) => {
  if (!data || data.length === 0) return null;

  return (
    <section className="w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">

        {/* ── Desktop: two-column grid ── */}
        <div className="lg:grid lg:grid-cols-[380px_1fr] xl:grid-cols-[420px_1fr] lg:gap-12 xl:gap-20">

          {/* LEFT: sticky panel — hidden on mobile/tablet */}
          <div className="hidden lg:block">
            <StickyPanel count={data.length} />
          </div>

          {/* RIGHT: header (mobile only) + timeline entries */}
          <div>
            {/* Mobile / tablet header */}
            <div className="lg:hidden text-center pt-14 pb-10 sm:pt-20 sm:pb-12">
              <h2 className="text-3xl sm:text-4xl font-heading tracking-wider text-primary mb-3">
                MY JOURNEY
              </h2>
              <p className="text-muted-foreground text-sm max-w-xl mx-auto leading-relaxed">
                A chronicle of my path as a Full Stack Developer, highlighting key
                milestones, freelance client projects, and AI integrations.
              </p>
            </div>

            {/* Timeline rows */}
            <div className="pb-16 lg:pt-24">
              {data.map((item, index) => (
                <TimelineRow
                  key={index}
                  item={item}
                  index={index}
                  isLast={index === data.length - 1}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
