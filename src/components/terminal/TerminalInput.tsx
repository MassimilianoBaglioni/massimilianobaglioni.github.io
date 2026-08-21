import { forwardRef, useState } from 'react';

type TerminalInputProps = {
  onSubmit: (text: string) => void;
  path?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
};

const TerminalInput = forwardRef<HTMLInputElement, TerminalInputProps>(function TerminalInput(
  { onSubmit, path = '~/', value, onValueChange, onKeyDown, readOnly = false },
  ref,
) {
  const [internalText, setInternalText] = useState('');
  const isControlled = value !== undefined;
  const currentText = isControlled ? value : internalText;

  function setCurrentText(next: string) {
    if (isControlled) {
      onValueChange?.(next);
    } else {
      setInternalText(next);
    }
  }

  return (
    <div className="flex items-center gap-2 py-0.5 text-sm">
      <span className="shrink-0 whitespace-pre">
        <span className="text-text-muted">{path} </span>
        <span className="text-terminal-green">{'❯❯'}</span>
      </span>

      <div className="relative min-w-0 flex-1">
        <input
          ref={ref}
          type="text"
          value={currentText}
          onChange={(e) => {
            if (readOnly) return;
            setCurrentText(e.target.value);
          }}
          onKeyDown={(e) => {
            if (readOnly) return;

            onKeyDown?.(e);

            if (e.key === 'Enter' && currentText.trim() !== '') {
              onSubmit(currentText);
              setCurrentText('');
            }
          }}
          readOnly={readOnly}
          autoFocus
          spellCheck={false}
          autoComplete="off"
          className="w-full min-w-0 border-0 bg-transparent p-0 font-mono font-semibold caret-transparent outline-none"
          style={{ color: 'var(--terminal-command)' }}
        />
        <span
          className="cursor-blink pointer-events-none absolute top-0 h-[1.1em] w-[0.55em] translate-y-[0.1em] bg-terminal-green"
          style={{ left: `${currentText.length}ch` }}
          aria-hidden="true"
        />
      </div>
    </div>
  );
});

export default TerminalInput;
