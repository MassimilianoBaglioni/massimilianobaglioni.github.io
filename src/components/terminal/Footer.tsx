import { BriefcaseBusiness, GitBranch, Mail } from 'lucide-react';
import { useEffect, useState } from 'react';

interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

interface SiteFooterProps {
  /** Accent used for the status dot, cursor, and prompt colon — defaults to the terminal green used elsewhere. */
  accent?: string;
  /** IANA timezone shown in the status row. Defaults to the site owner's local zone. */
  timezone?: string;
  /** Short label shown next to the clock, e.g. "Europe/Rome" or "Perugia, IT". */
  timezoneLabel?: string;
  links?: FooterLink[];
}

const DEFAULT_LINKS: FooterLink[] = [
  { label: 'github', href: 'https://github.com/MassimilianoBaglioni', external: true },
  {
    label: 'linkedin',
    href: 'https://www.linkedin.com/in/massimiliano-baglioni-018552286/',
    external: true,
  },
  { label: 'mail', href: 'mailto:3d.massimiliano.baglioni@gmail.com' },
];

const FOOTER_ICONS = {
  github: GitBranch,
  linkedin: BriefcaseBusiness,
  mail: Mail,
} as const;

function useClock(timezone: string) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return now.toLocaleTimeString('en-GB', {
    timeZone: timezone,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

function useUptime() {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const start = Date.now();
    const id = setInterval(() => setSeconds(Math.floor((Date.now() - start) / 1000)), 1000);
    return () => clearInterval(id);
  }, []);
  const h = String(Math.floor(seconds / 3600)).padStart(2, '0');
  const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
  const s = String(seconds % 60).padStart(2, '0');
  return `${h}:${m}:${s}`;
}

export default function SiteFooter({
  accent = 'var(--accent)',
  timezone = 'Europe/Rome',
  timezoneLabel = 'Europe/Rome',
  links = DEFAULT_LINKS,
}: SiteFooterProps) {
  const time = useClock(timezone);
  const uptime = useUptime();

  return (
    <footer className=" w-full font-mono text-xs text-text-muted">
      <div className="w-full overflow-hidden border-t border-border bg-bg-card shadow-2xl shadow-black/40">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          {/* Prompt row — nav rendered as directory jumps, echoing the "$ cat" convention above */}
          <div className="flex w-full items-center gap-x-2 border-b border-border py-3">
            <div className="flex min-w-0 flex-1 flex-wrap items-center gap-x-1">
              <span className="text-text-primary">guest@massimiliano</span>
              <span style={{ color: accent }}>:~$</span>
              <span
                aria-hidden
                className="mr-1 inline-block h-3 w-1.5 motion-safe:animate-pulse"
                style={{ backgroundColor: accent }}
              />
            </div>
            <nav
              aria-label="Footer"
              className="flex shrink-0 flex-wrap items-center justify-end gap-x-4"
            >
              {links.map((link) => {
                const Icon = FOOTER_ICONS[link.label as keyof typeof FOOTER_ICONS] ?? Mail;

                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noreferrer' : undefined}
                    className="inline-flex items-center gap-1.5 text-text-muted underline-offset-4 transition-colors hover:text-text-primary hover:underline focus-visible:text-text-primary focus-visible:underline focus-visible:outline-none"
                    aria-label={link.label}
                  >
                    <Icon size={13} className="shrink-0" aria-hidden="true" />
                    <span className="sr-only">{link.label}</span>
                    <span>{link.label}</span>
                  </a>
                );
              })}
            </nav>
          </div>

          {/* Status row — three even segments, like a statusline, instead of two ends with a spacer between */}
          <div className="grid w-full grid-cols-1 items-center gap-y-1.5 py-2.5 sm:grid-cols-3">
            <div className="flex items-center justify-center gap-1.5 sm:justify-start">
              <span
                aria-hidden
                className="h-2 w-2 rounded-full motion-safe:animate-pulse"
                style={{ backgroundColor: accent }}
              />
              <span>online</span>
            </div>

            <div className="flex items-center justify-center gap-x-3">
              <span>
                {time} <span className="text-text-muted/60">{timezoneLabel}</span>
              </span>
              <span aria-hidden className="text-border">
                │
              </span>
              <span>uptime {uptime}</span>
            </div>

            <div className="flex items-center justify-center text-text-muted/60 sm:justify-end">
              © {new Date().getFullYear()} massimiliano baglioni
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
