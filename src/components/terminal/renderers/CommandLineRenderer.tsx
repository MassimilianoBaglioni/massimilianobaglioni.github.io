import type { ProcessedItem } from '../handlers/handlersRegistry';

export function commandLineHandler(kind: string, rawText: string): ProcessedItem {
  const [path, ...rest] = rawText.split('>');
  const text = rest.join('>');

  return {
    kind,
    data: {
      path,
      text,
    } satisfies CommandLineRendererPayload,
  };
}

export type CommandLineRendererPayload = {
  path: string;
  text: string;
};

export default function CommandLineRenderer({ data }: { data: unknown }) {
  const payload = data as CommandLineRendererPayload;
  return (
    <div className="flex items-center gap-2 py-0.5 text-sm">
      <span className="shrink-0 whitespace-pre">
        <span className="text-text-muted">{payload.path + '/'} </span>
        <span className="shrink-0 text-terminal-green">{'❯❯'}</span>
      </span>

      <div className="min-w-0 flex-1">
        <span className="block w-full font-semibold" style={{ color: 'var(--terminal-command)' }}>
          {payload.text}
        </span>
      </div>
    </div>
  );
}
