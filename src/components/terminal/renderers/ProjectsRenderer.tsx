import type { ReactNode } from 'react';
import { useLanguage } from '../../../i18n/LanguageContext';
import type { ProcessedItem } from '../handlers/handlersRegistry';

export function projectsHandler(kind: string, rawText: string): ProcessedItem {
  return {
    kind,
    data: rawText,
  };
}

export default function ProjectsRenderer({ data }: { data: unknown }) {
  const { t } = useLanguage();

  const projectLinkClass =
    'inline-block rounded-md bg-slate-800 px-3 py-1 text-sm font-medium text-white shadow-sm hover:bg-slate-700';

  function ProjectLinkButton({ href, label }: { href: string; label: string }) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={projectLinkClass}
      >
        {label}
      </a>
    );
  }

  const allProjects = [
    {
      id: 'discord-bot',
      key: 'discord',
      title: t.projects.discordBotTitle,
      subtitle: t.projects.discordBotSubtitle,
      description: (
        <>
          {t.projects.discordBotDescription}
          <div className="mt-3 flex flex-wrap gap-2">
            <ProjectLinkButton
              href="https://github.com/MassimilianoBaglioni/soundboard-bot"
              label="GitHub"
            />
          </div>
        </>
      ),
    },
    {
      id: 'video-streamer',
      key: 'streamer',
      title: t.projects.videoStreamerTitle,
      subtitle: t.projects.videoStreamerSubtitle,
      description: (
        <>
          {t.projects.videoStreamerDescription}
          <div className="mt-3 flex flex-wrap gap-2">
            <ProjectLinkButton
              href="https://github.com/MassimilianoBaglioni/streaming_service"
              label="GitHub"
            />
          </div>
        </>
      ),
    },
    {
      id: 'compilers',
      key: 'compiler',
      title: t.projects.compilersTitle,
      subtitle: t.projects.compilersSubtitle,
      description: (
        <>
          {t.projects.compilersDescription}
          <div className="mt-3 flex flex-wrap gap-2">
            <ProjectLinkButton
              href="https://github.com/MassimilianoBaglioni/simple_compiler_interpreter"
              label="GitHub"
            />
          </div>
        </>
      ),
    },
    {
      id: 'fast-access',
      key: 'fast-access',
      title: t.projects.fastAccessTitle,
      subtitle: t.projects.fastAccessSubtitle,
      description: (
        <>
          {t.projects.fastAccessDescription}{' '}
          <a
            href="https://tuskanny.com/en/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            Tuskanny
          </a>
          .
          <div className="mt-3 flex flex-wrap gap-2">
            <ProjectLinkButton href="/thesis/master_thesis.pdf" label={t.instruction.masterThesisPdf} />
          </div>
        </>
      ),
    },
  ] as const satisfies ReadonlyArray<{
    id: string;
    key: string;
    title: string;
    subtitle: string;
    description: ReactNode;
  }>;

  const rawFilter = typeof data === 'string' ? data.trim() : '';
  const filterTerm = rawFilter.toLowerCase();
  const helpRequested = rawFilter === '--help' || rawFilter === 'help' || rawFilter === '-h';

  if (helpRequested) {
    return (
      <div className="space-y-3 rounded-md border border-border-subtle bg-black/15 p-3 text-sm text-text-primary">
        <div className="font-extrabold uppercase tracking-[0.12em] text-text-muted">
          project usage
        </div>
        <div className="text-text-primary">
          Usage: <span className="font-semibold text-text-strong">projects [project-name]</span>
        </div>
        <div className="text-text-muted">
          You can pass a project name as an optional parameter to filter the list.
        </div>
        <div className="font-extrabold uppercase tracking-[0.12em] text-text-muted">
          available projects
        </div>
        <ul className="space-y-2 pl-5 text-text-primary">
          {allProjects.map((project) => (
            <li key={project.id} className="list-disc">
              <span className="font-semibold text-text-strong">{project.id}</span>
              <span className="text-text-muted"> — {project.title}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  const filteredProjects = allProjects.filter((project) => {
    if (!filterTerm) return true;

    const haystacks = [project.id, project.key, project.title, project.subtitle];
    return haystacks.some((value) => value.toLowerCase().includes(filterTerm));
  });

  if (filteredProjects.length === 0) {
    return (
      <div className="rounded-md border border-border-subtle bg-black/15 p-4 text-sm text-text-primary">
        No project matched <span className="font-bold text-text-strong">{rawFilter}</span>.
        <div className="mt-2 text-text-muted">Try: discord, streamer, compiler, fast-access</div>
      </div>
    );
  }

  return (
    <div className="space-y-4 text-sm leading-relaxed">
      {filteredProjects.map((project) => (
        <div
          key={project.id}
          className="relative overflow-hidden rounded-md border border-border-subtle bg-black/15 p-3"
        >
          <span
            className="absolute bottom-2 left-2 top-2 w-0.5 rounded-full"
            style={{ backgroundColor: 'var(--accent)' }}
          />

          <div className="pl-4">
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
              <div className="text-base font-extrabold text-text-strong">{project.title}</div>
              <div className="text-[0.68rem] font-extrabold uppercase tracking-[0.12em] text-text-muted">
                {project.subtitle}
              </div>
            </div>

            <div className="mt-3 whitespace-pre-line text-sm font-medium leading-relaxed text-text-primary">
              {project.description}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
