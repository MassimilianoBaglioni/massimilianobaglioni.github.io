import { useLanguage } from '../../../i18n/LanguageContext';
import type { ProcessedItem } from '../handlers/handlersRegistry';

export function instructionHandler(kind: string, _rawText: string): ProcessedItem {
  return {
    kind,
    data: {},
  };
}

export default function InstructionRenderer() {
  const { t } = useLanguage();

  return (
    <div className="space-y-4 text-sm">
      {/* Diploma Section */}
      <div className="relative overflow-hidden rounded-md border border-border-subtle bg-black/15 p-3">
        <span
          className="absolute bottom-2 left-2 top-2 w-0.5 rounded-full"
          style={{ backgroundColor: 'var(--accent)' }}
        />
        <div className="pl-4">
          <div className="text-base font-extrabold text-terminal-green">
            Diploma Liceo Scientifico
          </div>
          <div className="mt-3 space-y-2">
            <div className="flex items-start">
              <span
                className="mr-2 mt-1 inline-block h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: 'var(--accent)' }}
              ></span>
              <p className="mb-1">{t.instruction.diploma}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bachelor's Degree Section */}
      <div className="relative overflow-hidden rounded-md border border-border-subtle bg-black/15 p-3">
        <span
          className="absolute bottom-2 left-2 top-2 w-0.5 rounded-full"
          style={{ backgroundColor: 'var(--accent)' }}
        />
        <div className="pl-4">
          <div className="flex items-center">
            <div className="text-base font-extrabold text-terminal-green">
              Bachelor degree in Computer Science
            </div>
            <div
              className="ml-2 text-[0.68rem] font-extrabold uppercase tracking-[0.14em] underline underline-offset-2"
              style={{ color: 'var(--text-panel-label)' }}
            >
              108/110
            </div>
          </div>
          <div className="mt-3 space-y-2">
            <div className="flex items-start">
              <span
                className="mr-2 mt-1 inline-block h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: 'var(--accent)' }}
              ></span>
              <p className="mb-1">{t.instruction.bachelorPeriod}</p>
            </div>
            <div className="flex items-start">
              <span
                className="mr-2 mt-1 inline-block h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: 'var(--accent)' }}
              ></span>
              <p className="mb-1">
                {t.instruction.bachelorThesis}(
                <a
                  href="https://www.libreeol.org/info/index.php?langs=it"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  https://www.libreeol.org/info/index.php?langs=it
                </a>
                ). {t.instruction.bachelorTechnologies}.
              </p>
            </div>
            <div className="flex items-start">
              <span
                className="mr-2 mt-1 inline-block h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: 'var(--accent)' }}
              ></span>
              <p className="mb-1">
                {t.instruction.bachelorThesisLink}{' '}
                <a
                  href="/thesis/bachelor_thesis.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  {t.instruction.bachelorThesisPdf}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Master's Degree Section */}
      <div className="relative overflow-hidden rounded-md border border-border-subtle bg-black/15 p-3">
        <span
          className="absolute bottom-2 left-2 top-2 w-0.5 rounded-full"
          style={{ backgroundColor: 'var(--accent)' }}
        />
        <div className="pl-4">
          <div className="flex items-center">
            <div className="text-base font-extrabold text-terminal-green">
              Master degree in Computer Science
            </div>
            <div
              className="ml-2 text-[0.68rem] font-extrabold uppercase tracking-[0.14em] underline underline-offset-2"
              style={{ color: 'var(--text-panel-label)' }}
            >
              110L/110
            </div>
          </div>
          <div className="mt-3 space-y-2">
            <div className="flex items-start">
              <span
                className="mr-2 mt-1 inline-block h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: 'var(--accent)' }}
              ></span>
              <p className="mb-1">{t.instruction.masterCurriculum}</p>
            </div>
            <div className="flex items-start">
              <span
                className="mr-2 mt-1 inline-block h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: 'var(--accent)' }}
              ></span>
              <p className="mb-1">{t.instruction.masterThesis}</p>
            </div>
            <div className="flex items-start">
              <span
                className="mr-2 mt-1 inline-block h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: 'var(--accent)' }}
              ></span>
              <p className="mb-1">
                {t.instruction.masterThesisLink}{' '}
                <a
                  href="/thesis/master_thesis.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  {t.instruction.masterThesisPdf}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
