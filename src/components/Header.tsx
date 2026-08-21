import { useLanguage } from '../i18n/LanguageContext';

interface HeaderProps {
  onNavigate?: (target: string) => void;
}

export default function Header({ onNavigate }: HeaderProps) {
  const { t, lang, setLang } = useLanguage();

  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    if (!onNavigate) return;
    event.preventDefault();
    onNavigate(target);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg-header">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-4 px-4 py-5 sm:px-6 lg:px-8 md:flex-row md:justify-between md:gap-0">
        <div className="flex items-center gap-1 font-mono text-lg font-bold">
          <span className="text-accent">~/portfolio</span>
          <span className="text-accent">❯❯</span>
          <span className="text-accent">_</span>
        </div>

        <div className="flex items-center gap-4">
          <nav className="hidden sm:flex justify-center gap-6 text-lg font-mono font-medium md:gap-10">
            <a
              href="#about"
              onClick={(e) => handleNavClick(e, 'about')}
              className="transition-colors hover:text-accent"
            >
              {t.header.nav.about}
            </a>
            <a
              href="#projects"
              onClick={(e) => handleNavClick(e, 'projects')}
              className="transition-colors hover:text-accent"
            >
              {t.header.nav.projects}
            </a>
            <a
              href="#instruction"
              onClick={(e) => handleNavClick(e, 'instruction')}
              className="transition-colors hover:text-accent"
            >
              {t.header.nav.education}
            </a>
            <a
              href="#open-source"
              onClick={(e) => handleNavClick(e, 'open-source')}
              className="transition-colors hover:text-accent"
            >
              {t.header.nav.openSource}
            </a>
          </nav>

          <div className="flex items-center gap-2 rounded-md bg-bg-card/50 px-1 py-0.5 text-sm font-mono">
            <button
              onClick={() => setLang('en')}
              aria-pressed={lang === 'en'}
              className={`px-2 py-0.5 rounded text-xs ${lang === 'en' ? 'text-accent' : 'text-text-muted'}`}
            >
              EN
            </button>
            <span className="text-border">|</span>
            <button
              onClick={() => setLang('it')}
              aria-pressed={lang === 'it'}
              className={`px-2 py-0.5 rounded text-xs ${lang === 'it' ? 'text-accent' : 'text-text-muted'}`}
            >
              IT
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
