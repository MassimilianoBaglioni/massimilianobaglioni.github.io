import type { ReactNode } from 'react';

const HIGHLIGHT_KEYWORDS = [
  'Rust',
  'Linux',
  'Open Source',
  'self-hosting',
  'algorithms',
  'data structures',
  'Software Engineer',
  'systems',
  'performance',
  'security',
  'correctness',
  'operating systems',
];

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function HighlightedText({ text }: { text: string }) {
  const regex = new RegExp(`(${HIGHLIGHT_KEYWORDS.map(escapeRegExp).join('|')})`, 'gi');
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, index) => {
        const isMatch = HIGHLIGHT_KEYWORDS.some(
          (keyword) => keyword.toLowerCase() === part.toLowerCase(),
        );

        if (!isMatch) {
          return <span key={`${part}-${index}`}>{part}</span>;
        }

        return (
          <span
            key={`${part}-${index}`}
            className="font-extrabold underline underline-offset-2"
            style={{ color: 'var(--accent)', textDecorationColor: 'var(--accent)' }}
          >
            {part}
          </span>
        );
      })}
    </>
  );
}

export interface CategoryEntry {
  title: string;
  subtitle?: string;
  period?: string;
  description?: string | ReactNode;
}

export interface CategoryCardProps {
  slug: string;
  label: string;
  entries: CategoryEntry[];
  accent?: string;
  icon?: ReactNode;
  className?: string;
  bare?: boolean;
}

export default function CategoryCard({
  label,
  entries,
  accent = 'var(--accent)',
  icon,
  className = '',
  bare = false,
}: CategoryCardProps) {
  return (
    <div
      style={{ '--accent': accent } as React.CSSProperties}
      className={`group relative flex w-full flex-col overflow-hidden font-mono transition-all duration-300 ${
        bare
          ? ''
          : 'rounded-xl border border-border bg-bg-card shadow-2xl shadow-black/40 hover:shadow-2xl hover:shadow-accent/20'
      } ${className}`}
    >
      {/* Title bar, echoing TerminalTitleBar */}
      {!bare && (
        <div className="flex items-center gap-2 border-b border-border px-4 py-2.5 transition-colors duration-300 bg-gradient-to-r from-black/20 to-transparent">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
          </div>
          <span className="ml-1 truncate text-xs text-text-muted">{label}.log</span>
        </div>
      )}

      {/* Body */}
      <div className="flex flex-1 flex-col gap-5 overflow-y-auto px-5 py-5 category-card-scroll">
        <div className="flex items-center gap-2 border-b border-border-subtle pb-3 text-[0.9rem] transition-colors duration-300">
          <span style={{ color: 'var(--accent)' }}>$</span>
          <span className="text-text-muted">cat</span>
          <span className="text-text-primary">{label}.log</span>
          {icon && <span className="ml-auto text-text-muted">{icon}</span>}
        </div>

        <div className="px-1">
          <span className="text-base font-extrabold tracking-[0.12em] text-text-primary transition-colors duration-300 bg-gradient-to-r from-accent to-accent/70 bg-clip-text text-transparent">
            {label.toUpperCase()}
          </span>
        </div>

        <ul className="flex flex-col gap-4">
          {entries.map((entry, i) => {
            const isLast = i === entries.length - 1;
            return (
              <li
                key={i}
                className={`flex gap-3 rounded-lg border border-border-subtle bg-black/10 p-4 text-[0.96rem] leading-relaxed transition-all duration-300 hover:bg-black/20 hover:border-accent/30 ${
                  i === 0 ? 'mt-2' : ''
                }`}
                style={{ boxShadow: 'inset 1px 0 0 var(--accent)' }}
              >
                <span
                  className="select-none pt-0.5 text-xs font-bold text-text-primary/80 transition-colors duration-300"
                  aria-hidden="true"
                >
                  {isLast ? '└─' : '├─'}
                </span>
                <div className="flex min-w-0 flex-1 flex-col gap-2">
                  <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                    <span
                      className="text-base font-extrabold transition-colors duration-300"
                      style={{ color: 'var(--text-strong)' }}
                    >
                      {entry.title}
                    </span>
                    {entry.period && (
                      <span
                        className="text-[0.7rem] font-bold uppercase tracking-[0.12em] transition-colors duration-300 bg-gradient-to-r from-accent to-accent/70 bg-clip-text text-transparent"
                        style={{ color: 'var(--accent)' }}
                      >
                        {entry.period}
                      </span>
                    )}
                  </div>
                  {entry.subtitle && (
                    <span
                      className="text-sm font-semibold transition-colors duration-300"
                      style={{ color: 'var(--text-strong-soft)' }}
                    >
                      {entry.subtitle}
                    </span>
                  )}
                  {entry.description && (
                    <span
                      className="whitespace-pre-line text-sm font-medium leading-relaxed transition-colors duration-300"
                      style={{ color: 'var(--text-strong)' }}
                    >
                      {typeof entry.description === 'string' ? (
                        <HighlightedText text={entry.description} />
                      ) : (
                        entry.description
                      )}
                    </span>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
