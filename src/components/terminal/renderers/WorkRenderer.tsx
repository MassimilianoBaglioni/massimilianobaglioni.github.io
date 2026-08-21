import { useLanguage } from '../../../i18n/LanguageContext';
import type { ProcessedItem } from '../handlers/handlersRegistry';

export function workHandler(kind: string, _rawText: string): ProcessedItem {
  return {
    kind,
    data: {},
  };
}

export default function WorkRenderer() {
  const { t } = useLanguage();

  const entries = [
    {
      company: 'DS Digital Services',
      role: t.work.developer,
      period: 'Dec 2021 – Dec 2024',
      bullets: t.work.dsDigitalServicesBullets,
    },
    {
      company: 'Cheapfit',
      role: t.work.developer,
      period: 'June 2022 – Sept 2024',
      bullets: t.work.cheapfitBullets,
    },
    {
      company: 'Advancia Technology',
      role: t.work.fullStackDeveloper,
      period: 'Nov 2025 – Present',
      bullets: t.work.avanciaBullets,
    },
  ];

  return (
    <div className="space-y-4 text-sm leading-relaxed">
      {entries.map((entry, index) => (
        <div
          key={entry.company}
          className="relative overflow-hidden rounded-md border border-border-subtle bg-black/15 p-3"
        >
          <span
            className="absolute bottom-2 left-2 top-2 w-0.5 rounded-full"
            style={{ backgroundColor: 'var(--accent)' }}
          />

          <div className="pl-4">
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
              <div className="text-base font-extrabold text-text-strong">{entry.company}</div>
              <div className="text-[0.68rem] font-extrabold uppercase tracking-[0.12em] text-text-muted">
                {entry.role}
              </div>
            </div>

            <div className="mt-2 text-[0.68rem] font-bold uppercase tracking-[0.12em] text-text-primary">
              {entry.period}
            </div>

            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-relaxed text-text-primary">
              {entry.bullets.map((bullet) => (
                <li key={`${entry.company}-${bullet}-${index}`}>{bullet}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}
