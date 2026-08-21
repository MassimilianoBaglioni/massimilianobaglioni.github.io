// SectionDivider.tsx
import React, { useState } from 'react';

interface SectionDividerProps {
  categories: { slug: string; label: string }[];
  accent?: string;
}

export default function SectionDivider({
  categories,
  accent = 'var(--accent)',
}: SectionDividerProps) {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);

  return (
    <div
      className="mx-auto mt-4 w-full border-t border-border/60 pt-6 font-mono text-base"
      style={{ ['--accent' as any]: accent } as React.CSSProperties}
    >
      <div className="px-4">
        <div className="flex items-center gap-2 text-text-primary/90 text-base font-medium">
          <span style={{ color: accent }}>$</span>
          <span>ls ~/profile</span>
        </div>
        <div className="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-text-primary/90">
          {categories.map((c) => {
            const isHovered = hoveredSlug === c.slug;

            return (
              <a
                key={c.slug}
                href={`#${c.slug}`}
                onMouseEnter={() => setHoveredSlug(c.slug)}
                onMouseLeave={() => setHoveredSlug(null)}
                onFocus={() => setHoveredSlug(c.slug)}
                onBlur={() => setHoveredSlug(null)}
                className="transition-colors text-text-primary font-medium text-base"
                style={{ color: isHovered ? accent : undefined }}
              >
              {c.label}.log
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
