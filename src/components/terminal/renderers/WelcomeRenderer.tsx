import { ChevronDown } from 'lucide-react';
import { useLanguage } from '../../../i18n/LanguageContext';
import type { ProcessedItem } from '../handlers/handlersRegistry';

export function welcomeHandler(kind: string, _rawText: string): ProcessedItem {
  return {
    kind,
    data: {},
  };
}

export default function WelcomeRenderer({ data: _data }: { data: unknown }) {
  const { t } = useLanguage();
  const longestName = Math.max(...t.welcome.commands.map((c) => c.name.length));

  return (
    <div className="text-sm">
      <div className="pb-1 font-medium" style={{ color: 'var(--text-strong)' }}>
        {t.welcome.greeting || '\u00A0'}
      </div>
      <div className="pb-1" style={{ color: 'var(--text-strong-soft)' }}>
        {t.welcome.intro || '\u00A0'}
      </div>

      <div className="pb-1">{'\u00A0'}</div>

      <div className="pb-1 font-medium" style={{ color: 'var(--text-strong)' }}>
        {t.welcome.commandsIntro || '\u00A0'}
      </div>

      {t.welcome.commands.map((cmd, index) => {
        const isLast = index === t.welcome.commands.length - 1;
        const connector = isLast ? '\u2514\u2500\u2500 ' : '\u251C\u2500\u2500 ';

        return (
          <div key={cmd.name} className="pb-1 pl-2 font-mono">
            <span style={{ color: 'var(--text-strong-soft)' }}>{connector}</span>
            <span className="font-extrabold" style={{ color: 'var(--text-panel-label)' }}>
              {cmd.name.padEnd(longestName + 2)}
            </span>
            <span style={{ color: 'var(--text-strong-soft)' }}>{cmd.description}</span>
          </div>
        );
      })}

      <div className="pb-1">{'\u00A0'}</div>

      <div className="pb-1 font-bold" style={{ color: 'var(--text-panel-label)' }}>
        {t.welcome.fallbackTitle || '\u00A0'}
      </div>
      <div className="pb-1" style={{ color: 'var(--text-strong-soft)' }}>
        {t.welcome.fallbackText || '\u00A0'}
      </div>

      <div className="flex justify-end pr-1">
        <ChevronDown className="h-4 w-4 animate-bounce text-terminal-green" aria-hidden="true" />
      </div>
    </div>
  );
}
