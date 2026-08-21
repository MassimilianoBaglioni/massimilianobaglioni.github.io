type TerminalTitleBarProps = {
  title?: string;
};

export default function TerminalTitleBar({ title = 'guest@portfolio: ~' }: TerminalTitleBarProps) {
  return (
    <div className="flex items-center gap-2 rounded-t-xl border-b border-border-subtle bg-bg-header px-4 py-2.5">
      <div className="flex gap-1.5">
        <span className="h-3 w-3 rounded-full bg-[var(--color-terminal-red)]" />
        <span className="h-3 w-3 rounded-full bg-[var(--color-terminal-yellow)]" />
        <span className="h-3 w-3 rounded-full bg-[var(--color-terminal-success)]" />
      </div>

      <span className="flex-1 select-none text-center font-mono text-xs text-text-muted">
        {title}
      </span>

      {}
      <div className="w-[52px]" aria-hidden="true" />
    </div>
  );
}
