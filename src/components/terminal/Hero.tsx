// Hero.tsx
import { useLanguage } from '../../i18n/LanguageContext';

interface HeroProps {
  name: string;
  role?: string;
  tagline?: string;
  status?: string;
}

export default function Hero({ name, role, tagline, status }: HeroProps) {
  const { t } = useLanguage();
  return (
    <section className="flex flex-col items-start gap-3 pb-2 sm:pt-16" aria-label="Introduction">
      {status && (
        <div className="flex items-center gap-2 font-mono text-xs text-text-muted [text-shadow:0_1px_8px_rgba(0,0,0,0.85)]">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          {status}
        </div>
      )}

      <h1 className="font-mono text-4xl font-bold tracking-tight text-text-primary sm:text-5xl [text-shadow:0_2px_20px_rgba(0,0,0,0.9)]">
        {name}
      </h1>

      <p className="max-w-4xl whitespace-pre-line font-mono text-sm text-text-muted sm:text-base [text-shadow:0_1px_10px_rgba(0,0,0,0.85)]">
        {role ?? t.hero.role}
      </p>

      {tagline && (
        <p className="max-w-4xl whitespace-pre-line font-mono text-sm leading-relaxed text-text-primary/90 [text-shadow:0_1px_10px_rgba(0,0,0,0.85)]">
          {tagline ?? t.hero.tagline}
        </p>
      )}
    </section>
  );
}
