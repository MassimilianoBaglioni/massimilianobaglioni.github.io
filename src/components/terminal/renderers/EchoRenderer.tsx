import type { ProcessedItem } from '../handlers/handlersRegistry';

export function echoHandler(kind: string, rawText: string): ProcessedItem {
  return {
    kind,
    data: rawText,
  };
}

export type EchoData = { text: string };

export default function EchoRenderer({ data }: { data: unknown }) {
  const text = data as string;
  return (
    <div className="pb-1 text-sm" style={{ color: 'var(--text-strong-soft)' }}>
      {text || '\u00A0'}
    </div>
  );
}
