import { useLanguage } from '../../../i18n/LanguageContext';
import type { ProcessedItem } from '../handlers/handlersRegistry';

const ABOUT_HIGHLIGHT_KEYWORDS = [
  'Software Engineer',
  'Rust',
  'algorithms',
  'data structures',
  'Linux',
  'open source',
  'self-hosting',
  'systems',
  'performance',
  'security',
  'correctness',
  'operating systems',
];

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function HighlightedAboutText({ text }: { text: string }) {
  const regex = new RegExp(`(${ABOUT_HIGHLIGHT_KEYWORDS.map(escapeRegExp).join('|')})`, 'gi');
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, index) => {
        const isMatch = ABOUT_HIGHLIGHT_KEYWORDS.some(
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

export function aboutHandler(kind: string, _rawText: string): ProcessedItem {
  return {
    kind,
    data: {},
  };
}

export default function AboutRenderer() {
  const { t } = useLanguage();

  return (
    <div className="space-y-4 text-sm leading-relaxed">
      <div className="relative overflow-hidden rounded-md border border-border-subtle bg-black/15 p-3">
        <span
          className="absolute bottom-2 left-2 top-2 w-0.5 rounded-full"
          style={{ backgroundColor: 'var(--accent)' }}
        />
        <div className="pl-4">
          <div className="text-base font-extrabold text-terminal-green">{t.about.heading}</div>
          <div
            className="mt-2 text-[0.68rem] font-extrabold uppercase tracking-[0.14em]"
            style={{ color: 'var(--text-strong-soft)' }}
          >
            {t.about.intro}
          </div>
        </div>
      </div>

      {t.about.sections.map((section) => (
        <div
          key={section.title}
          className="relative overflow-hidden rounded-md border border-border-subtle bg-black/15 p-3"
        >
          <span
            className="absolute bottom-2 left-2 top-2 w-0.5 rounded-full"
            style={{ backgroundColor: 'var(--accent)' }}
          />
          <div className="pl-4">
            <div
              className="mb-2 text-[0.72rem] font-extrabold uppercase tracking-[0.12em]"
              style={{ color: 'var(--text-strong-soft)' }}
            >
              {section.title}
            </div>
            <div
              className="whitespace-pre-line text-[0.9rem] font-medium leading-relaxed"
              style={{ color: 'var(--text-strong)' }}
            >
              <HighlightedAboutText text={section.text} />
            </div>
          </div>
        </div>
      ))}

      {/* Theses card — quick access to bachelor and master PDFs */}
      <div className="relative overflow-hidden rounded-md border border-border-subtle bg-black/15 p-3">
        <span
          className="absolute bottom-2 left-2 top-2 w-0.5 rounded-full"
          style={{ backgroundColor: 'var(--accent)' }}
        />
        <div className="pl-4">
          <div className="text-base font-extrabold text-terminal-green">Theses</div>
          <div className="mt-3 flex flex-wrap gap-2">
            <a
              href="/thesis/bachelor_thesis.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-md bg-slate-800 px-3 py-1 text-sm font-medium text-white shadow-sm hover:bg-slate-700"
            >
              {t.instruction.bachelorThesisPdf}
            </a>

            <a
              href="/thesis/master_thesis.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-md bg-slate-800 px-3 py-1 text-sm font-medium text-white shadow-sm hover:bg-slate-700"
            >
              {t.instruction.masterThesisPdf}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
