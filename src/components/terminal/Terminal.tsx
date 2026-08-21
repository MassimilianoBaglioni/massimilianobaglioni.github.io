import { useEffect, useRef, useState } from 'react';
import TerminalInput from './TerminalInput';
import TerminalTitleBar from './TerminalTitleBar';
import {
  commandsRegistry,
  renderesRegistry,
  type ProcessedItem,
} from './handlers/handlersRegistry';

const INTRO_COMMANDS = ['echo Welcome. Type a command to get started.', 'welcome'];
const INTRO_START_DELAY_MS = 500;
const INTRO_TYPE_SPEED_MS = 60;
const INTRO_PAUSE_BEFORE_SUBMIT_MS = 350;
const INTRO_PAUSE_BETWEEN_COMMANDS_MS = 500;

export default function Terminal() {
  const [scrollBack, setScrollBack] = useState<ProcessedItem[]>([]);
  const [introValue, setIntroValue] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [introDone, setIntroDone] = useState(false);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const path = '~>';

  function handleCommand(text: string): void {
    const trimmed = text.trim();
    if (!trimmed) return;

    const [commandName, ...rest] = trimmed.split(/\s+/);
    const command = commandName.toLowerCase();
    const rawTextAfterCommand = rest.join(' ');

    setCommandHistory((prev) => {
      const next = [...prev, trimmed];
      return next;
    });
    setHistoryIndex(null);
    setInputValue('');

    setScrollBack((prev) => [...prev, commandsRegistry['echoLine']('echoLine', path + trimmed)]);

    switch (command) {
      case 'about':
      case 'echo':
      case 'welcome':
      case 'instruction':
      case 'project':
      case 'projects':
      case 'work':
      case 'experience':
        setScrollBack((prev) => [...prev, commandsRegistry[command](command, rawTextAfterCommand)]);
        break;
      case 'clear':
        setScrollBack([]);
        break;
      default:
        break;
    }
  }

  function handleHistoryNavigation(direction: 'up' | 'down') {
    if (!introDone || commandHistory.length === 0) return;

    if (direction === 'up') {
      if (historyIndex === null) {
        setHistoryIndex(commandHistory.length - 1);
        setInputValue(commandHistory[commandHistory.length - 1]);
        return;
      }

      if (historyIndex > 0) {
        const nextIndex = historyIndex - 1;
        setHistoryIndex(nextIndex);
        setInputValue(commandHistory[nextIndex]);
      }
      return;
    }

    if (historyIndex === null) return;

    if (historyIndex < commandHistory.length - 1) {
      const nextIndex = historyIndex + 1;
      setHistoryIndex(nextIndex);
      setInputValue(commandHistory[nextIndex]);
      return;
    }

    setHistoryIndex(null);
    setInputValue('');
  }

  function handleBodyClick(): void {
    const selection = window.getSelection();
    if (selection && selection.toString().length > 0) return;
    inputRef.current?.focus();
  }

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [scrollBack]);

  // One-time intro: type a command into the input as if the user typed it, then submit it.
  useEffect(() => {
    let cancelled = false;
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    const schedule = (fn: () => void, delay: number) => {
      timeouts.push(
        setTimeout(() => {
          if (!cancelled) fn();
        }, delay),
      );
    };

    let elapsed = INTRO_START_DELAY_MS;

    for (const cmd of INTRO_COMMANDS) {
      for (let i = 1; i <= cmd.length; i++) {
        schedule(() => setIntroValue(cmd.slice(0, i)), elapsed);
        elapsed += INTRO_TYPE_SPEED_MS;
      }

      elapsed += INTRO_PAUSE_BEFORE_SUBMIT_MS;
      schedule(() => {
        handleCommand(cmd);
        setIntroValue('');
      }, elapsed);

      elapsed += INTRO_PAUSE_BETWEEN_COMMANDS_MS;
    }

    schedule(() => setIntroDone(true), elapsed);

    return () => {
      cancelled = true;
      timeouts.forEach(clearTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mx-auto mt-4 flex h-[72vh] max-h-190 w-full flex-col overflow-hidden rounded-xl border border-border bg-bg-card font-mono shadow-2xl shadow-black/40">
      <TerminalTitleBar title="guest@portfolio: ~" />

      <div
        ref={scrollRef}
        onClick={handleBodyClick}
        className="terminal-scroll min-h-0 flex-1 cursor-text overflow-y-auto px-4 py-3"
      >
        {scrollBack.map((item, index) => {
          const Renderer = renderesRegistry[item.kind];

          if (!Renderer) {
            return (
              <div key={index} className="text-sm text-text-muted">
                Unknown: {item.kind}
              </div>
            );
          }

          return <Renderer key={index} data={item.data} />;
        })}

        <TerminalInput
          ref={inputRef}
          onSubmit={handleCommand}
          value={introDone ? inputValue : introValue}
          onValueChange={introDone ? (next) => {
              setHistoryIndex(null);
              setInputValue(next);
            } : setIntroValue}
          onKeyDown={(event) => {
            if (!introDone) return;

            if (event.key === 'ArrowUp') {
              event.preventDefault();
              handleHistoryNavigation('up');
            }

            if (event.key === 'ArrowDown') {
              event.preventDefault();
              handleHistoryNavigation('down');
            }
          }}
          readOnly={!introDone}
        />
      </div>
    </div>
  );
}
