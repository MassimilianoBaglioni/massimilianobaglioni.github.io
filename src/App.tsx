import { Code2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import CategoryCard from './components/feed/CategoryCard';
import CategoryFeed, { type CategoryFeedHandle } from './components/feed/Feed';
import Header from './components/Header';
import MatrixBackground from './components/matrix/MatrixBackground';
import {
  CHARACTER_SET_OPTIONS,
  DEFAULT_CHARACTER_SET_KEYS,
  DEFAULT_MATRIX_CONFIG,
  buildCharacterSet,
  type MatrixConfig,
} from './components/matrix/matrixConfig';
import SiteFooter from './components/terminal/Footer';
import Hero from './components/terminal/Hero';
import SectionDivider from './components/terminal/SectionDivider';
import Terminal from './components/terminal/Terminal';
import { useLanguage } from './i18n/LanguageContext';

type GitHubPr = {
  html_url: string;
  title: string;
  state: 'open' | 'closed';
  number: number;
  labels?: Array<{ name: string }>;
};

type ContributionSource = {
  title: string;
  apiUrl: string;
  subtitle?: string;
};

const openSourceSources: ContributionSource[] = [
  {
    title: 'Rust Lang',
    subtitle: 'clippy',
    apiUrl:
      'https://api.github.com/search/issues?q=repo:rust-lang/rust-clippy+is:pr+author:@MassimilianoBaglioni',
  },
];

const tagPalette = [
  'border-cyan-400/40 bg-cyan-500/15 text-cyan-100',
  'border-violet-400/40 bg-violet-500/15 text-violet-100',
  'border-amber-400/40 bg-amber-500/15 text-amber-100',
  'border-rose-400/40 bg-rose-500/15 text-rose-100',
  'border-emerald-400/40 bg-emerald-500/15 text-emerald-100',
  'border-sky-400/40 bg-sky-500/15 text-sky-100',
];

function getTagTone(label: string) {
  const hash = Array.from(label).reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return tagPalette[hash % tagPalette.length];
}

function WorkExperienceTimeline() {
  const { t } = useLanguage();

  const entries = [
    {
      company: 'DS Digital Services',
      role: t.work.developer,
      location: 'Assisi, PG, IT',
      period: 'Dec 2021 – Dec 2024',
      bullets: t.work.dsDigitalServicesBullets,
      technologies: ['WordPress', 'PHP', 'JavaScript'],
    },
    {
      company: 'Cheapfit',
      role: t.work.developer,
      location: 'Assisi, PG, IT',
      period: 'June 2022 – Sept 2024',
      bullets: t.work.cheapfitBullets,
      technologies: ['PHP', 'Python', 'React', 'JavaScript', 'HTML', 'CSS', 'MySQL', 'REST APIs'],
    },
    {
      company: 'Advancia Technology',
      role: t.work.fullStackDeveloper,
      location: 'Viareggio, LU, IT',
      period: 'Nov 2025 – Present',
      bullets: t.work.avanciaBullets,
      technologies: [
        'Java',
        'Spring Boot',
        'Spring Batch',
        'Hibernate',
        'OracleDB',
        'MySQL',
        'Angular',
        'RxJS',
        'REST APIs',
        'Kubernetes',
        'Jenkins',
        'Docker',
      ],
    },
  ];

  return (
    <div className="relative space-y-5 before:absolute before:left-[10px] before:top-0 before:bottom-0 before:w-px before:bg-border/80">
      {entries.map((entry) => (
        <div key={entry.company} className="relative pl-8">
          <span className="absolute left-[2px] top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full border border-accent/80 bg-accent/20 shadow-[0_0_14px_rgba(126,231,168,0.8)]" />
          <div className="rounded-md border border-border-subtle bg-black/10 p-4">
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
              <span className="text-base font-extrabold text-text-strong">{entry.company}</span>
              <span className="text-sm font-semibold text-text-primary">— {entry.role}</span>
            </div>
            <div className="mt-2 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-text-primary">
              {entry.location} · {entry.period}
            </div>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-relaxed text-text-primary">
              {entry.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
            <div className="mt-3 text-[0.74rem] leading-relaxed text-text-primary">
              <span className="font-bold uppercase tracking-[0.12em] text-text-strong">
                {t.work.technologies}:
              </span>{' '}
              {entry.technologies.join(', ')}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function OpenSourceContributionList({ source }: { source: ContributionSource }) {
  const [items, setItems] = useState<GitHubPr[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        const urls = [source.apiUrl, source.apiUrl.replace('author:@', 'author:')];

        for (const url of urls) {
          const response = await fetch(url, {
            headers: {
              Accept: 'application/vnd.github+json',
            },
          });

          if (!response.ok) {
            if (url === urls[urls.length - 1]) {
              throw new Error(`GitHub API error: ${response.status}`);
            }
            continue;
          }

          const data = (await response.json()) as { items?: GitHubPr[] };

          if (!ignore) {
            setItems(data.items ?? []);
          }
          return;
        }
      } catch (err) {
        if (!ignore) {
          setError(err instanceof Error ? err.message : 'Unable to load pull requests');
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    load();
    return () => {
      ignore = true;
    };
  }, [source.apiUrl]);

  return (
    <div className="space-y-3">
      {loading ? (
        <div className="text-sm text-text-muted">Loading pull requests…</div>
      ) : error ? (
        <div className="rounded-md border border-red-500/30 bg-red-500/5 px-3 py-2 text-sm text-red-200">
          {error}
        </div>
      ) : items.length === 0 ? (
        <div className="text-sm text-text-muted">No pull requests found.</div>
      ) : (
        <div className="space-y-2">
          {items.map((item) => (
            <a
              key={`${item.number}-${item.title}`}
              href={item.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-md border border-border-subtle bg-black/10 p-3 transition-colors duration-200 hover:border-accent/30 hover:bg-black/20"
            >
              <div className="mb-2 flex items-center gap-2 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-text-muted">
                <span
                  className={`inline-flex rounded-full border px-2 py-0.5 font-extrabold shadow-sm ${
                    item.state === 'open'
                      ? 'border-emerald-400/40 bg-emerald-500/20 text-emerald-100'
                      : 'border-fuchsia-400/40 bg-fuchsia-500/20 text-fuchsia-100'
                  }`}
                >
                  {item.state}
                </span>
                <span># {item.number}</span>
              </div>
              <div className="text-sm font-semibold text-text-primary">{item.title}</div>
              <div className="mt-2 flex flex-wrap gap-2 text-[0.7rem] text-text-muted">
                {item.labels && item.labels.length > 0 ? (
                  item.labels.slice(0, 3).map((label) => (
                    <span
                      key={label.name}
                      className={`rounded-full border px-2 py-0.5 ${getTagTone(label.name)}`}
                    >
                      {label.name}
                    </span>
                  ))
                ) : (
                  <span className="rounded-full border border-border-subtle bg-slate-500/10 px-2 py-0.5 text-slate-200">
                    pull request
                  </span>
                )}
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

function App() {
  const { t } = useLanguage();
  const feedRef = useRef<CategoryFeedHandle>(null);
  const [matrixConfig, setMatrixConfig] = useState<MatrixConfig>(DEFAULT_MATRIX_CONFIG);
  const [selectedCharacterGroups, setSelectedCharacterGroups] = useState<Record<string, boolean>>(
    () =>
      Object.fromEntries(
        CHARACTER_SET_OPTIONS.map((option) => [
          option.key,
          DEFAULT_CHARACTER_SET_KEYS.includes(
            option.key as (typeof DEFAULT_CHARACTER_SET_KEYS)[number],
          ),
        ]),
      ),
  );

  const updateMatrixSetting = <K extends keyof MatrixConfig>(key: K, value: MatrixConfig[K]) => {
    setMatrixConfig((prev) => ({ ...prev, [key]: value }));
  };

  const restoreMatrixDefaults = () => {
    setMatrixConfig(DEFAULT_MATRIX_CONFIG);
    setSelectedCharacterGroups(
      Object.fromEntries(
        CHARACTER_SET_OPTIONS.map((option) => [
          option.key,
          DEFAULT_CHARACTER_SET_KEYS.includes(
            option.key as (typeof DEFAULT_CHARACTER_SET_KEYS)[number],
          ),
        ]),
      ),
    );
  };

  const toggleCharacterGroup = (key: string) => {
    setSelectedCharacterGroups((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      const selectedKeys = Object.entries(next)
        .filter(([, enabled]) => enabled)
        .map(([name]) => name);

      setMatrixConfig((current) => ({
        ...current,
        characters: buildCharacterSet(selectedKeys),
      }));

      return next;
    });
  };

  const handleHeaderNavigate = (target: string) => {
    const targetElement = document.getElementById(target);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    if (['about', 'projects', 'instruction'].includes(target)) {
      window.setTimeout(() => {
        feedRef.current?.scrollToSlug(target);
      }, 350);
    }

    if (window.location.hash !== `#${target}`) {
      window.history.pushState(null, '', `#${target}`);
    }
  };

  const projectLinkClass =
    'inline-block rounded-md bg-slate-800 px-3 py-1 text-sm font-medium text-white shadow-sm hover:bg-slate-700';

  function ProjectLinkButton({ href, label }: { href: string; label: string }) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={projectLinkClass}>
        {label}
      </a>
    );
  }

  // Prepare localized text snippets that need inline anchors
  const bachelorThesisText = t.instruction.bachelorThesis;
  const libreeolKey = 'LibreEOL';
  const libreeolIndex = bachelorThesisText.indexOf(libreeolKey);

  const categories = [
    {
      slug: 'about',
      label: t.header.nav.about,
      accent: 'var(--accent)',
      entries: t.about.sections.map((section) => ({
        title: section.title,
        description: section.text,
      })),
    },
    {
      slug: 'projects',
      label: t.header.nav.projects,
      accent: 'var(--accent)',
      entries: [
        {
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
                <ProjectLinkButton
                  href="/thesis/master_thesis.pdf"
                  label={t.instruction.masterThesisPdf}
                />
              </div>
            </>
          ),
        },
      ],
    },
    {
      slug: 'instruction',
      label: 'Education',
      accent: 'var(--accent)',
      entries: [
        {
          title: 'Diploma Liceo Scientifico',
          subtitle: 'Completed 2019',
        },
        {
          title: t.instruction.bachelorDegree,
          subtitle: 'University of Perugia',
          period: 'Oct 2019 - Apr 2023',
          description: (
            <>
              {t.instruction.bachelorPeriod}
              {'\n'}
              {libreeolIndex !== -1 ? (
                <>
                  {bachelorThesisText.slice(0, libreeolIndex)}
                  <a
                    href="https://www.libreeol.org/info/index.php?langs=it"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline"
                  >
                    {libreeolKey}
                  </a>
                  {bachelorThesisText.slice(libreeolIndex + libreeolKey.length)}
                </>
              ) : (
                t.instruction.bachelorThesis
              )}
              {''}. {t.instruction.bachelorTechnologies}
              <div className="mt-2">
                <a
                  href="/thesis/bachelor_thesis.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-md bg-slate-800 px-3 py-1 text-sm font-medium text-white shadow-sm hover:bg-slate-700"
                >
                  {t.instruction.bachelorThesisPdf}
                </a>
              </div>
            </>
          ),
        },
        {
          title: 'Master degree in Computer Science',
          subtitle: 'University of Pisa',
          period: 'Oct 2023 - Oct 2025',
          description: (
            <>
              {t.instruction.masterCurriculum}
              {'\n'}
              {t.instruction.masterThesis}
              <div className="mt-2">
                <a
                  href="/thesis/master_thesis.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-md bg-slate-800 px-3 py-1 text-sm font-medium text-white shadow-sm hover:bg-slate-700"
                >
                  {t.instruction.masterThesisPdf}
                </a>
              </div>
            </>
          ),
        },
      ],
    },
  ];

  return (
    <div className="relative h-screen w-screen overflow-hidden" style={{ colorScheme: 'dark' }}>
      <MatrixBackground config={matrixConfig} />

      <div className="absolute inset-0 z-10 overflow-y-auto">
        <Header onNavigate={handleHeaderNavigate} />

        <div className="relative mx-auto w-full max-w-5xl">
          {/* Full-height backdrop */}
          <div
            className="pointer-events-none absolute inset-0 bg-bg-base/60 backdrop-blur-sm sm:border sm:border-border/60"
            aria-hidden="true"
          />

          <main className="relative z-10 mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
            <style>{`
              ::selection {
                background: rgba(126, 231, 168, 0.45);
                color: #f8fafc;
              }
            `}</style>
            <div className="relative z-10 space-y-8 pb-16">
              <Hero
                name="Massimiliano Baglioni"
                role={t.hero.role}
                tagline={t.hero.tagline}
                status={t.personalInfo.located}
              />
              <Terminal />

              <div id="projects">
                <SectionDivider
                  categories={categories.map((c) => ({
                    slug: c.slug,
                    label: c.label,
                  }))}
                />
              </div>

              <CategoryFeed ref={feedRef} categories={categories} />

              <div className="mt-8 flex items-center gap-3 px-1 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-text-muted">
                <span className="h-px flex-1 bg-border" aria-hidden="true" />
                <span className="inline-flex items-center gap-2" style={{ color: 'var(--accent)' }}>
                  <Code2 size={14} aria-hidden="true" />
                  Work Experience
                </span>
                <span className="h-px flex-1 bg-border" aria-hidden="true" />
              </div>

              <div className="mt-4">
                <CategoryCard
                  slug="work"
                  label={t.work.title}
                  accent="var(--accent)"
                  entries={[
                    {
                      title: t.work.professionalExperience,
                      description: (
                        <>
                          <WorkExperienceTimeline />
                          <div className="mt-5 border-t border-border-subtle pt-4 text-center">
                            <a
                              href="/cv.pdf"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center gap-2 rounded-md border border-border-subtle bg-slate-800 px-3 py-1.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-slate-700 hover:border-accent/40"
                            >
                              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-accent/15 text-[10px] font-bold text-accent">
                                ↓
                              </span>
                              {t.work.downloadCv}
                            </a>
                          </div>
                        </>
                      ),
                    },
                  ]}
                />
              </div>

              <div className="mt-8 flex items-center gap-3 px-1 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-text-muted">
                <span className="h-px flex-1 bg-border" aria-hidden="true" />
                <span className="inline-flex items-center gap-2" style={{ color: 'var(--accent)' }}>
                  <Code2 size={14} aria-hidden="true" />
                  Open Source Contributions
                </span>
                <span className="h-px flex-1 bg-border" aria-hidden="true" />
              </div>

              <div id="open-source" className="mt-4">
                <CategoryCard
                  slug="open-source"
                  label="Open Source"
                  accent="var(--accent)"
                  entries={openSourceSources.map((source) => ({
                    title: source.title,
                    subtitle: source.subtitle,
                    description: <OpenSourceContributionList source={source} />,
                  }))}
                />
              </div>

              <div className="mt-8 rounded-xl border border-border bg-black/20 p-4 shadow-2xl shadow-black/30 backdrop-blur-sm">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div className="text-[0.72rem] font-extrabold uppercase tracking-[0.18em] text-text-muted">
                    {t.matrix.title}
                  </div>
                  <button
                    type="button"
                    onClick={restoreMatrixDefaults}
                    className="rounded-md border border-border-subtle bg-slate-800 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-text-primary transition-colors hover:border-accent/40 hover:text-accent"
                  >
                    {t.matrix.restoreDefaults}
                  </button>
                </div>

                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  <label className="space-y-2 text-sm text-text-primary">
                    <span className="block text-[0.68rem] font-bold uppercase tracking-[0.12em] text-text-muted">
                      {t.matrix.labels.density}
                    </span>
                    <input
                      type="range"
                      min="0.1"
                      max="1"
                      step="0.05"
                      value={matrixConfig.density}
                      onChange={(e) => updateMatrixSetting('density', Number(e.target.value))}
                      className="w-full accent-accent"
                    />
                    <span className="text-text-muted">{matrixConfig.density.toFixed(2)}</span>
                  </label>

                  <label className="space-y-2 text-sm text-text-primary">
                    <span className="block text-[0.68rem] font-bold uppercase tracking-[0.12em] text-text-muted">
                      {t.matrix.labels.fontSize}
                    </span>
                    <input
                      type="range"
                      min="10"
                      max="24"
                      step="1"
                      value={matrixConfig.fontSize}
                      onChange={(e) => updateMatrixSetting('fontSize', Number(e.target.value))}
                      className="w-full accent-accent"
                    />
                    <span className="text-text-muted">{matrixConfig.fontSize}px</span>
                  </label>

                  <label className="space-y-2 text-sm text-text-primary">
                    <span className="block text-[0.68rem] font-bold uppercase tracking-[0.12em] text-text-muted">
                      {t.matrix.labels.alpha}
                    </span>
                    <input
                      type="range"
                      min="0.05"
                      max="0.6"
                      step="0.01"
                      value={matrixConfig.alpha}
                      onChange={(e) => updateMatrixSetting('alpha', Number(e.target.value))}
                      className="w-full accent-accent"
                    />
                    <span className="text-text-muted">{matrixConfig.alpha.toFixed(2)}</span>
                  </label>

                  <label className="space-y-2 text-sm text-text-primary">
                    <span className="block text-[0.68rem] font-bold uppercase tracking-[0.12em] text-text-muted">
                      {t.matrix.labels.effectAlpha}
                    </span>
                    <input
                      type="range"
                      min="0.2"
                      max="1"
                      step="0.05"
                      value={matrixConfig.effectAlpha}
                      onChange={(e) => updateMatrixSetting('effectAlpha', Number(e.target.value))}
                      className="w-full accent-accent"
                    />
                    <span className="text-text-muted">{matrixConfig.effectAlpha.toFixed(2)}</span>
                  </label>

                  <label className="space-y-2 text-sm text-text-primary">
                    <span className="block text-[0.68rem] font-bold uppercase tracking-[0.12em] text-text-muted">
                      {t.matrix.labels.cursorRadius}
                    </span>
                    <input
                      type="range"
                      min="20"
                      max="220"
                      step="10"
                      value={matrixConfig.cursorRadius}
                      onChange={(e) => updateMatrixSetting('cursorRadius', Number(e.target.value))}
                      className="w-full accent-accent"
                    />
                    <span className="text-text-muted">{matrixConfig.cursorRadius}px</span>
                  </label>

                  <label className="space-y-2 text-sm text-text-primary">
                    <span className="block text-[0.68rem] font-bold uppercase tracking-[0.12em] text-text-muted">
                      {t.matrix.labels.minSpeed}
                    </span>
                    <input
                      type="range"
                      min="40"
                      max="220"
                      step="10"
                      value={matrixConfig.minSpeed}
                      onChange={(e) => updateMatrixSetting('minSpeed', Number(e.target.value))}
                      className="w-full accent-accent"
                    />
                    <span className="text-text-muted">{matrixConfig.minSpeed}ms</span>
                  </label>

                  <label className="space-y-2 text-sm text-text-primary">
                    <span className="block text-[0.68rem] font-bold uppercase tracking-[0.12em] text-text-muted">
                      {t.matrix.labels.maxSpeed}
                    </span>
                    <input
                      type="range"
                      min="120"
                      max="600"
                      step="20"
                      value={matrixConfig.maxSpeed}
                      onChange={(e) => updateMatrixSetting('maxSpeed', Number(e.target.value))}
                      className="w-full accent-accent"
                    />
                    <span className="text-text-muted">{matrixConfig.maxSpeed}ms</span>
                  </label>

                  <label className="space-y-2 text-sm text-text-primary">
                    <span className="block text-[0.68rem] font-bold uppercase tracking-[0.12em] text-text-muted">
                      {t.matrix.labels.trailLength}
                    </span>
                    <input
                      type="range"
                      min="1"
                      max="60"
                      step="1"
                      value={matrixConfig.maxTrailLenght}
                      onChange={(e) =>
                        updateMatrixSetting('maxTrailLenght', Number(e.target.value))
                      }
                      className="w-full accent-accent"
                    />
                    <span className="text-text-muted">{matrixConfig.maxTrailLenght}</span>
                  </label>

                  <label className="space-y-2 text-sm text-text-primary md:col-span-2 xl:col-span-1">
                    <span className="block text-[0.68rem] font-bold uppercase tracking-[0.12em] text-text-muted">
                      {t.matrix.labels.mainColor}
                    </span>
                    <input
                      type="color"
                      value={matrixConfig.color}
                      onChange={(e) => updateMatrixSetting('color', e.target.value)}
                      className="h-10 w-full cursor-pointer rounded border border-border bg-transparent p-1"
                    />
                  </label>

                  <label className="space-y-2 text-sm text-text-primary md:col-span-2 xl:col-span-1">
                    <span className="block text-[0.68rem] font-bold uppercase tracking-[0.12em] text-text-muted">
                      {t.matrix.labels.accentColor}
                    </span>
                    <input
                      type="color"
                      value={matrixConfig.accentColor}
                      onChange={(e) => updateMatrixSetting('accentColor', e.target.value)}
                      className="h-10 w-full cursor-pointer rounded border border-border bg-transparent p-1"
                    />
                  </label>

                  <div className="space-y-2 text-sm text-text-primary md:col-span-2 xl:col-span-3">
                    <span className="block text-[0.68rem] font-bold uppercase tracking-[0.12em] text-text-muted">
                      {t.matrix.labels.characterSets}
                    </span>
                    <div className="flex flex-wrap gap-3">
                      {CHARACTER_SET_OPTIONS.map((option) => (
                        <label
                          key={option.key}
                          className="inline-flex items-center gap-2 rounded-md border border-border-subtle bg-slate-900/60 px-2.5 py-1.5"
                        >
                          <input
                            type="checkbox"
                            checked={Boolean(selectedCharacterGroups[option.key])}
                            onChange={() => toggleCharacterGroup(option.key)}
                            className="h-4 w-4 accent-accent"
                          />
                          <span>{t.matrix.characterSetOptions[option.key as keyof typeof t.matrix.characterSetOptions]}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>

        <SiteFooter />
      </div>
    </div>
  );
}

export default App;
