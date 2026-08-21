import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import CategoryCard, { type CategoryCardProps } from './CategoryCard';
import TerminalTitleBar from '../terminal/TerminalTitleBar';

interface CategoryFeedProps {
  categories: CategoryCardProps[];
}

export interface CategoryFeedHandle {
  scrollToSlug: (slug: string) => void;
}

const CategoryFeed = forwardRef<CategoryFeedHandle, CategoryFeedProps>(function CategoryFeed(
  { categories },
  ref,
) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  function goTo(index: number) {
    const root = scrollRef.current;
    const target = slideRefs.current[index];
    if (!root || !target) return;

    const rootRect = root.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    const delta = targetRect.top - rootRect.top;
    root.scrollTo({ top: root.scrollTop + delta, behavior: 'smooth' });
  }

  function scrollToSlug(slug: string) {
    const index = categories.findIndex((cat) => cat.slug === slug);
    if (index !== -1) {
      requestAnimationFrame(() => goTo(index));
    }
  }

  useImperativeHandle(ref, () => ({ scrollToSlug }), [categories]);

  useEffect(() => {
    const root = scrollRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const index = slideRefs.current.findIndex((el) => el === visible.target);
        if (index !== -1) setActiveIndex(index);
      },
      { root, threshold: [0.5, 0.75] },
    );

    slideRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [categories.length]);

  const active = categories[activeIndex];
  const activeAccent = active?.accent ?? 'var(--accent)';

  return (
    <div
      className="mx-auto mt-8 flex h-[82vh] max-h-[820px] w-full flex-col overflow-hidden rounded-xl border border-border bg-bg-card font-mono shadow-2xl shadow-black/40"
    >
      <TerminalTitleBar title="guest@about" />

      <div className="relative flex flex-1 min-h-0">
        {/* Snap-scrolling slides */}
        <div
          ref={scrollRef}
          className="terminal-scroll flex-1 snap-y snap-mandatory overflow-y-auto scroll-smooth"
        >
          {categories.map((cat, i) => (
            <div
              key={cat.slug}
              id={cat.slug}
              ref={(el) => {
                slideRefs.current[i] = el;
              }}
              className="flex h-full min-h-full w-full snap-start snap-always flex-col"
            >
              <CategoryCard {...cat} bare className="h-full" />
            </div>
          ))}
        </div>

        {/* Reel-style dot rail */}
        <div className="pointer-events-none absolute right-2 top-1/2 flex -translate-y-1/2 flex-col gap-2">
          {categories.map((cat, i) => (
            <button
              key={cat.slug}
              onClick={() => goTo(i)}
              aria-label={`Go to ${cat.label}`}
              aria-current={i === activeIndex}
              className="pointer-events-auto h-2 w-2 rounded-full transition-all duration-300"
              style={{
                backgroundColor:
                  i === activeIndex ? (cat.accent ?? 'var(--accent)') : 'currentColor',
                opacity: i === activeIndex ? 1 : 0.25,
                transform: i === activeIndex ? 'scale(1.4)' : 'scale(1)',
              }}
            />
          ))}
        </div>
      </div>

      {/* Footer, mirrors the current slide's accent */}
      <div className="flex items-center gap-2 border-t border-border px-4 py-2 text-xs text-text-muted">
        <span style={{ color: activeAccent }}>~/{active?.slug}</span>
        <span>{active?.label}</span>
        <span className="ml-auto text-text-muted/60">
          {activeIndex + 1} / {categories.length}
        </span>
      </div>
    </div>
  );
});

export default CategoryFeed;
