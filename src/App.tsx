import type { AriaRole, CSSProperties, ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';
import {
  ArrowDown,
  ArrowRight,
  Award,
  Briefcase,
  Cloud,
  Code2,
  Database,
  Download,
  ExternalLink,
  Github,
  GraduationCap,
  Languages,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Network,
  RotateCcw,
  Server,
  Workflow,
  X,
} from 'lucide-react';
import {
  assetPaths,
  communicationLanguages,
  certifications,
  contactMethods,
  cvHrefs,
  educationItems,
  experienceItems,
  hasCv,
  languages,
  navItems,
  profileLinks,
  projects,
  skillGroups,
  translations,
  type Language,
} from './data';
import {
  usePointerParallax,
  usePrefersReducedMotion,
  useAnchorScroll,
  useOpeningAnimation,
  useJavascriptAnimations,
  useReveal,
  useScrollVariables,
} from './hooks';
import OpeningAnimation from './OpeningAnimation';

type Translation = (typeof translations)[Language];
type Project = (typeof projects)[number];

const iconBySkillGroup = {
  systems: Server,
  networking: Network,
  cloud: Cloud,
  databases: Database,
  automation: Workflow,
  programming: Code2,
} as const;

const iconByContactMethod = {
  email: Mail,
  location: MapPin,
} as const;

const externalRel = 'noopener noreferrer';


function getInitialLanguage(): Language {
  if (typeof window === 'undefined') return 'en';
  const stored = window.localStorage.getItem('portfolio-language');
  return languages.includes(stored as Language) ? (stored as Language) : 'en';
}

function App() {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);
  const prefersReducedMotion = usePrefersReducedMotion();
  const {
    isVisible: showOpeningAnimation,
    dismiss: dismissOpeningAnimation,
    replay: replayOpeningAnimation,
  } = useOpeningAnimation(prefersReducedMotion);
  const t = translations[language];

  useScrollVariables(prefersReducedMotion);
  useJavascriptAnimations(prefersReducedMotion);
  useAnchorScroll();

  useEffect(() => {
    document.documentElement.lang = language;
    window.localStorage.setItem('portfolio-language', language);
  }, [language]);

  return (
    <>
      {showOpeningAnimation && <OpeningAnimation language={language} onSkip={dismissOpeningAnimation} />}
      <div className="site-content" {...(showOpeningAnimation ? { inert: '' } : {})}>
        <a className="skip-link" href="#main">
          {t.nav.skipToContent}
        </a>
        <div className="motion-progress" aria-hidden="true" />
        <Navigation language={language} setLanguage={setLanguage} t={t} />
        <main id="main" tabIndex={-1}>
          <Hero t={t} prefersReducedMotion={prefersReducedMotion} />
          <About t={t} prefersReducedMotion={prefersReducedMotion} />
          <Skills t={t} language={language} prefersReducedMotion={prefersReducedMotion} />
          <Projects t={t} language={language} prefersReducedMotion={prefersReducedMotion} />
          <Experience t={t} language={language} prefersReducedMotion={prefersReducedMotion} />
          <Education t={t} language={language} prefersReducedMotion={prefersReducedMotion} />
          <Certifications t={t} language={language} prefersReducedMotion={prefersReducedMotion} />
          <Contact t={t} language={language} prefersReducedMotion={prefersReducedMotion} />
        </main>
        <Footer t={t} onReplay={prefersReducedMotion ? undefined : replayOpeningAnimation} />
      </div>
    </>
  );
}


function Navigation({
  language,
  setLanguage,
  t,
}: {
  language: Language;
  setLanguage: (language: Language) => void;
  t: Translation;
}) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 1180) setIsOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const renderNavLinks = () =>
    navItems.map((item) => (
      <a key={item.id} href={`#${item.id}`} onClick={() => setIsOpen(false)}>
        {t.nav[item.labelKey]}
      </a>
    ));
  return (
    <header className="site-header">
      <nav className="nav-pill" aria-label={t.accessibility.mainNavigation}>
        <a className="brand-mark" href="#home" aria-label={t.accessibility.home}>
          YH
        </a>

        <div className="nav-links desktop-links">{renderNavLinks()}</div>

        <div className="nav-actions">
          <LanguageSwitch
            language={language}
            setLanguage={(nextLanguage) => {
              setLanguage(nextLanguage);
              setIsOpen(false);
            }}
            label={t.accessibility.languageSwitch}
          />
          {hasCv && <CvDownloadMenu t={t} language={language} menuId="desktop-cv-menu" />}
          <button
            className="menu-button"
            type="button"
            aria-label={isOpen ? t.nav.close : t.nav.menu}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsOpen((current) => !current)}
          >
            {isOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {isOpen && (
        <div id="mobile-menu" className="mobile-panel is-open">
          <div className="nav-links mobile-links">{renderNavLinks()}</div>
          {hasCv && (
            <CvDownloadMenu
              t={t}
              language={language}
              menuId="mobile-cv-menu"
              variant="mobile"
              onSelect={() => setIsOpen(false)}
            />
          )}
        </div>
      )}
    </header>
  );
}

function LanguageSwitch({
  language,
  setLanguage,
  label,
}: {
  language: Language;
  setLanguage: (language: Language) => void;
  label: string;
}) {
  return (
    <div className="language-switch" role="group" aria-label={label}>
      {languages.map((item) => (
        <button
          key={item}
          type="button"
          className={language === item ? 'is-active' : ''}
          aria-pressed={language === item}
          onClick={() => setLanguage(item)}
        >
          {item.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

function CvDownloadMenu({
  t,
  language,
  menuId,
  variant = 'desktop',
  onSelect,
}: {
  t: Translation;
  language: Language;
  menuId: string;
  variant?: 'desktop' | 'mobile';
  onSelect?: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const cvOptions =
    language === 'fr'
      ? [
          { language: 'fr' as const, label: t.nav.cvFrench },
          { language: 'en' as const, label: t.nav.cvEnglish },
        ]
      : [
          { language: 'en' as const, label: t.nav.cvEnglish },
          { language: 'fr' as const, label: t.nav.cvFrench },
        ];

  useEffect(() => {
    if (!isOpen) return;

    const closeOnPointerDown = (event: PointerEvent) => {
      if (menuRef.current?.contains(event.target as Node)) return;
      setIsOpen(false);
    };

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('pointerdown', closeOnPointerDown);
    document.addEventListener('keydown', closeOnEscape);

    return () => {
      document.removeEventListener('pointerdown', closeOnPointerDown);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [isOpen]);

  return (
    <div className={`cv-menu ${variant === 'mobile' ? 'mobile-cv-menu' : ''}`} ref={menuRef}>
      <button
        className="cv-trigger"
        type="button"
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-controls={menuId}
        onClick={() => setIsOpen((current) => !current)}
      >
        <Download size={16} aria-hidden="true" />
        <span>{t.nav.downloadCv}</span>
      </button>
      {isOpen && (
        <div id={menuId} className="cv-menu-list" aria-label={t.nav.downloadCv}>
          {cvOptions.map((option) => (
            <a
              className="cv-option"
              href={cvHrefs[option.language]}
              download
              key={option.language}
              onClick={() => {
                setIsOpen(false);
                onSelect?.();
              }}
            >
              <Download size={15} aria-hidden="true" />
              <span>{option.label}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

function Hero({
  t,
  prefersReducedMotion,
}: {
  t: Translation;
  prefersReducedMotion: boolean;
}) {
  const parallax = usePointerParallax(prefersReducedMotion);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const portraitStyle = {
    '--portrait-x': `${parallax.x}px`,
    '--portrait-y': `${parallax.y}px`,
  } as CSSProperties;

  return (
    <section id="home" className="hero-section" aria-labelledby="hero-title">
      <NetworkField />
      <div className="hero-content">
        <div className="hero-meta">
          <span className="eyebrow">{t.hero.role}</span>
          <span className="location">
            <MapPin size={16} aria-hidden="true" />
            {t.hero.location}
          </span>
        </div>

        <div className="portrait-stage" style={portraitStyle}>
          {!imageLoaded && !imageError && <div className="portrait-loading" aria-hidden="true" />}
          {imageError ? (
            <div className="portrait-fallback" role="img" aria-label={t.accessibility.portrait}>
              YH
            </div>
          ) : (
            <img
              className={imageLoaded ? 'is-loaded' : ''}
              src={assetPaths.portrait}
              alt={t.accessibility.portrait}
              width="922"
              height="1320"
              decoding="async"
              loading="eager"
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />
          )}
        </div>

        <div className="hero-copy">
          <h1 id="hero-title">Youness HERRAKA</h1>
          <p className="hero-support">{t.hero.support}</p>
          <p className="hero-title-line">{t.hero.title}</p>
          <p className="availability">
            <span aria-hidden="true" />
            {t.hero.availability}
          </p>
          {t.hero.headline && <p className="hero-headline">{t.hero.headline}</p>}

          <div className="hero-actions" aria-label={t.accessibility.primaryActions}>
            <a className="button primary" href="#projects">
              {t.hero.viewProjects}
              <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a className="button secondary" href="#contact">
              {t.hero.contactMe}
            </a>
          </div>

          <div className="hero-socials" aria-label={t.accessibility.professionalLinks}>
            <ExternalProfileLink href={profileLinks.github} label={t.hero.github} icon={<Github size={18} />} />
            <ExternalProfileLink
              href={profileLinks.linkedin}
              label={t.hero.linkedin}
              icon={<Linkedin size={18} />}
            />
          </div>
        </div>
      </div>

      <a className="scroll-indicator" href="#about" aria-label={t.hero.scroll}>
        <span>{t.hero.scroll}</span>
        <ArrowDown size={18} aria-hidden="true" />
      </a>
    </section>
  );
}

function NetworkField() {
  return (
    <svg className="network-field" viewBox="0 0 1440 820" aria-hidden="true">
      <defs>
        <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
          <path d="M80 0H0V80" fill="none" />
        </pattern>
      </defs>
      <rect width="1440" height="820" fill="url(#grid)" />
      <path className="network-line line-a" d="M110 640 C310 430 390 510 560 310 S900 180 1020 340 S1220 520 1340 260" />
      <path className="network-line line-b" d="M170 260 C330 320 430 150 610 210 S880 470 1060 420 S1240 310 1360 420" />
      <path className="network-line line-c" d="M220 520 L430 420 L640 500 L820 340 L1030 470 L1220 330" />
      {[110, 430, 640, 820, 1020, 1220, 1340].map((x, index) => (
        <circle key={x} className="network-node" cx={x} cy={[640, 420, 500, 340, 340, 330, 260][index]} r="5" />
      ))}
    </svg>
  );
}

function About({ t, prefersReducedMotion }: { t: Translation; prefersReducedMotion: boolean }) {
  return (
    <section id="about" className="about-section section-dark" aria-labelledby="about-title">
      <div className="section-word" aria-hidden="true">
        {t.about.watermark}
      </div>
      <Reveal prefersReducedMotion={prefersReducedMotion} className="section-shell about-grid">
        <div>
          <span className="eyebrow light">{t.about.eyebrow}</span>
          <h2 id="about-title">{t.about.title}</h2>
        </div>
        <div className="about-copy">
          {t.about.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <div className="focus-list" aria-label={t.accessibility.focusAreas}>
            {t.about.focus.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function Skills({
  t,
  language,
  prefersReducedMotion,
}: {
  t: Translation;
  language: Language;
  prefersReducedMotion: boolean;
}) {
  return (
    <section id="skills" className="skills-section" aria-labelledby="skills-title">
      <Reveal prefersReducedMotion={prefersReducedMotion} className="section-shell">
        <div className="section-heading">
          <span className="eyebrow">{t.skills.eyebrow}</span>
          <h2 id="skills-title">{t.skills.title}</h2>
          <p>{t.skills.intro}</p>
        </div>
        <div className="skills-grid">
          {skillGroups.map((group, index) => {
            const Icon = iconBySkillGroup[group.id];
            return (
              <article
                className="skill-card js-tilt"
                key={group.id}
                style={{ '--delay': `${index * 80}ms` } as CSSProperties}
              >
                <div className="skill-card-header">
                  <Icon size={24} aria-hidden="true" />
                  <h3>{group.title[language]}</h3>
                </div>
                <ul>
                  {group.skills.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
        <div className="communication-panel">
          <div className="communication-heading">
            <span className="communication-icon" aria-hidden="true">
              <Languages size={22} />
            </span>
            <div>
              <h3>{t.skills.communicationTitle}</h3>
              <p>{t.skills.communicationIntro}</p>
            </div>
          </div>
          <div className="communication-list" aria-label={t.skills.communicationTitle}>
            {communicationLanguages.map((item) => (
              <div className="communication-item" key={item.id}>
                <span className="communication-name">{item.name[language]}</span>
                <span className="communication-level">{item.level[language]}</span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function Projects({
  t,
  language,
  prefersReducedMotion,
}: {
  t: Translation;
  language: Language;
  prefersReducedMotion: boolean;
}) {
  return (
    <section id="projects" className="projects-section" aria-labelledby="projects-title">
      <Reveal prefersReducedMotion={prefersReducedMotion} className="section-shell">
        <div className="section-heading wide">
          <span className="eyebrow">{t.projects.eyebrow}</span>
          <h2 id="projects-title">{t.projects.title}</h2>
          <p>{t.projects.intro}</p>
        </div>
      </Reveal>

      <div className="project-list section-shell">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            language={language}
            t={t}
            prefersReducedMotion={prefersReducedMotion}
          />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  language,
  t,
  prefersReducedMotion,
}: {
  project: Project;
  language: Language;
  t: Translation;
  prefersReducedMotion: boolean;
}) {
  const linkLabel = project.linkType === 'linkedin' ? t.projects.linkedin : t.projects.github;
  const actionLabel = project.linkType === 'linkedin' ? t.projects.viewPublication : t.projects.viewProject;
  const Icon = project.linkType === 'linkedin' ? Linkedin : Github;
  const titleId = `project-title-${project.id}`;

  return (
    <Reveal
      prefersReducedMotion={prefersReducedMotion}
      className={`project-card js-tilt ${project.prominence === 'secondary' ? 'is-secondary' : ''}`}
      role="article"
      ariaLabelledby={titleId}
    >
      <div className="project-visual-wrap">
        <ProjectVisual variant={project.visual} />
      </div>
      <div className="project-content">
        <div className="project-title-row">
          <h3 id={titleId}>{project.name}</h3>
          <a
            className="project-icon-link"
            href={project.url}
            target="_blank"
            rel={externalRel}
            aria-label={`${linkLabel}: ${project.name}`}
          >
            <Icon size={20} aria-hidden="true" />
            <ExternalLink size={16} aria-hidden="true" />
          </a>
        </div>
        <p>{project.description[language]}</p>
        <ul className="project-highlights" aria-label={t.projects.proofLabel}>
          {project.highlights[language].map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
        <ul className="tag-list" aria-label={`${project.name} technologies`}>
          {project.tags.map((tag, tagIndex) => (
            <li key={tag} style={{ '--delay': `${tagIndex * 35}ms` } as CSSProperties}>
              {tag}
            </li>
          ))}
        </ul>
        <a className="button project-button" href={project.url} target="_blank" rel={externalRel}>
          {actionLabel}
          <ArrowRight size={18} aria-hidden="true" />
        </a>
      </div>
    </Reveal>
  );
}

function ProjectVisual({ variant }: { variant: Project['visual'] }) {
  const diagrams: Record<
    Project['visual'],
    {
      title: string;
      nodes: Array<{ label: string; x: number; y: number; w: number; h: number; tone?: 'primary' | 'light' }>;
      badges: Array<{ x: number; y: number; label: string }>;
    }
  > = {
    azure: {
      title: 'Azure Orchestration',
      nodes: [
        { label: 'React UI', x: 38, y: 72, w: 118, h: 44 },
        { label: 'Express API', x: 181, y: 72, w: 118, h: 44, tone: 'primary' },
        { label: 'n8n', x: 324, y: 72, w: 118, h: 44 },
        { label: 'Terraform', x: 78, y: 220, w: 144, h: 44 },
        { label: 'Postgres', x: 258, y: 220, w: 144, h: 44 },
      ],
      badges: [
        { x: 46, y: 152, label: 'AZ' },
        { x: 368, y: 152, label: 'SDK' },
      ],
    },
    hybrid: {
      title: 'Hybrid Control Plane',
      nodes: [
        { label: 'AWS CDK', x: 38, y: 72, w: 118, h: 44 },
        { label: 'n8n', x: 181, y: 72, w: 118, h: 44, tone: 'primary' },
        { label: 'Dashboard', x: 324, y: 72, w: 118, h: 44 },
        { label: 'Python Agent', x: 78, y: 220, w: 144, h: 44 },
        { label: 'Docker', x: 258, y: 220, w: 144, h: 44 },
      ],
      badges: [
        { x: 46, y: 152, label: 'AWS' },
        { x: 368, y: 152, label: 'LAN' },
      ],
    },
    vm: {
      title: 'Azure VM Deployment',
      nodes: [
        { label: 'Azure CLI', x: 38, y: 72, w: 118, h: 44 },
        { label: 'VNet', x: 181, y: 72, w: 118, h: 44, tone: 'primary' },
        { label: 'NSG', x: 324, y: 72, w: 118, h: 44 },
        { label: 'Ubuntu VM', x: 78, y: 220, w: 144, h: 44 },
        { label: 'Nginx', x: 258, y: 220, w: 144, h: 44 },
      ],
      badges: [
        { x: 46, y: 152, label: 'RG' },
        { x: 368, y: 152, label: 'IP' },
      ],
    },
    openstack: {
      title: 'Private Cloud Lab',
      nodes: [
        { label: 'Kolla', x: 38, y: 72, w: 118, h: 44 },
        { label: 'Neutron', x: 181, y: 72, w: 118, h: 44, tone: 'primary' },
        { label: 'Nova', x: 324, y: 72, w: 118, h: 44 },
        { label: 'Proxmox', x: 78, y: 220, w: 144, h: 44 },
        { label: 'Docker', x: 258, y: 220, w: 144, h: 44 },
      ],
      badges: [
        { x: 46, y: 152, label: 'VM' },
        { x: 368, y: 152, label: 'NAT' },
      ],
    },
    snake: {
      title: 'Python Game Loop',
      nodes: [
        { label: 'Python', x: 38, y: 72, w: 118, h: 44 },
        { label: 'Input', x: 181, y: 72, w: 118, h: 44, tone: 'primary' },
        { label: 'State', x: 324, y: 72, w: 118, h: 44 },
        { label: 'Score', x: 78, y: 220, w: 144, h: 44 },
        { label: 'UI Loop', x: 258, y: 220, w: 144, h: 44 },
      ],
      badges: [
        { x: 46, y: 152, label: 'FPS' },
        { x: 368, y: 152, label: 'HUD' },
      ],
    },
  };
  const diagram = diagrams[variant];
  const links = ['M156 94H181', 'M299 94H324', 'M240 116V196', 'M240 196H150V220', 'M240 196H330V220'];

  return (
    <div className={`project-visual visual-${variant}`} aria-hidden="true">
      <svg viewBox="0 0 480 300" preserveAspectRatio="xMidYMid meet" focusable="false">
        <rect className="visual-plane" x="10" y="10" width="460" height="280" rx="18" />
        <path className="visual-grid" d="M36 70H444M36 140H444M36 210H444M96 34V266M192 34V266M288 34V266M384 34V266" />
        <text className="visual-title" x="30" y="45">
          {diagram.title}
        </text>
        <g className="visual-links">
          {links.map((path) => (
            <path key={path} className="visual-line main" d={path} />
          ))}
        </g>
        {diagram.badges.map((badge) => (
          <g className="visual-badge" key={badge.label} transform={`translate(${badge.x} ${badge.y})`}>
            <rect x="0" y="0" width="66" height="34" rx="10" />
            <text x="33" y="22" textAnchor="middle">
              {badge.label}
            </text>
          </g>
        ))}
        {diagram.nodes.map((node) => (
          <g
            className={`visual-node-group ${node.tone ? `is-${node.tone}` : ''}`}
            key={node.label}
          >
            <rect className="visual-node" x={node.x} y={node.y} width={node.w} height={node.h} rx="12" />
            <text x={node.x + node.w / 2} y={node.y + node.h / 2 + 5} textAnchor="middle">
              {node.label}
            </text>
          </g>
        ))}
        <g className="visual-status" transform="translate(406 32)">
          <circle cx="0" cy="0" r="4" />
          <circle cx="14" cy="0" r="4" />
          <circle cx="28" cy="0" r="4" />
        </g>
      </svg>
    </div>
  );
}

function Experience({
  t,
  language,
  prefersReducedMotion,
}: {
  t: Translation;
  language: Language;
  prefersReducedMotion: boolean;
}) {
  return (
    <section id="experience" className="experience-section section-dark" aria-labelledby="experience-title">
      <Reveal prefersReducedMotion={prefersReducedMotion} className="section-shell experience-layout">
        <div className="section-heading">
          <span className="eyebrow light">{t.experience.eyebrow}</span>
          <h2 id="experience-title">{t.experience.title}</h2>
          <p>{t.experience.intro}</p>
        </div>
        <div className="experience-list">
          {experienceItems.map((item) => (
            <article className="experience-card" key={item.id}>
              <div className="timeline-marker" aria-hidden="true">
                <Briefcase size={23} />
              </div>
              <div>
                <p className="experience-period">{item.period[language]}</p>
                <h3>{item.role[language]}</h3>
                <p className="experience-company">{item.organization}</p>
                <p className="experience-location">{item.location[language]}</p>
                <p>{item.summary[language]}</p>
                <ul className="experience-bullets">
                  {item.bullets[language].map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
                <ul className="tag-list" aria-label={`${item.role[language]} technologies`}>
                  {item.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

function Education({
  t,
  language,
  prefersReducedMotion,
}: {
  t: Translation;
  language: Language;
  prefersReducedMotion: boolean;
}) {
  return (
    <section id="education" className="education-section" aria-labelledby="education-title">
      <Reveal prefersReducedMotion={prefersReducedMotion} className="section-shell education-layout">
        <div className="section-heading">
          <span className="eyebrow">{t.education.eyebrow}</span>
          <h2 id="education-title">{t.education.title}</h2>
        </div>
        <div className="education-list">
          {educationItems.map((item) => (
            <article className="education-card" key={item.id}>
              <div className="timeline-marker" aria-hidden="true">
                <GraduationCap size={24} />
              </div>
              <div>
                <p className="education-period">{item.period[language]}</p>
                <p className="education-school">{item.school[language]}</p>
                <h3>{item.diploma[language]}</h3>
                <p className="education-option">{item.option[language]}</p>
                <p>{item.body[language]}</p>
              </div>
            </article>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

function Certifications({
  t,
  language,
  prefersReducedMotion,
}: {
  t: Translation;
  language: Language;
  prefersReducedMotion: boolean;
}) {
  return (
    <section id="certifications" className="certifications-section" aria-labelledby="certifications-title">
      <Reveal prefersReducedMotion={prefersReducedMotion} className="section-shell certifications-layout">
        <div className="section-heading">
          <span className="eyebrow">{t.certifications.eyebrow}</span>
          <h2 id="certifications-title">{t.certifications.title}</h2>
          <p>{t.certifications.intro}</p>
        </div>
        <div className="certification-stack">
          <div className="certification-list">
            {certifications.map((item, index) => (
              <article
                className="certification-card js-tilt"
                key={item.id}
                style={{ '--delay': `${index * 70}ms` } as CSSProperties}
              >
                <span className="certification-icon" aria-hidden="true">
                  <Award size={22} />
                </span>
                <div>
                  <p className="certification-issuer">{item.issuer}</p>
                  <h3>{item.title[language]}</h3>
                  <p>{item.focus[language]}</p>
                </div>
              </article>
            ))}
          </div>
          <a className="profile-link is-primary certification-profile-link" href={profileLinks.credly} target="_blank" rel={externalRel}>
            <Award size={18} aria-hidden="true" />
            <span>{t.certifications.viewCredly}</span>
            <ExternalLink size={15} aria-hidden="true" />
          </a>
        </div>
      </Reveal>
    </section>
  );
}

function Contact({
  t,
  language,
  prefersReducedMotion,
}: {
  t: Translation;
  language: Language;
  prefersReducedMotion: boolean;
}) {
  return (
    <section id="contact" className="contact-section section-dark" aria-labelledby="contact-title">
      <Reveal prefersReducedMotion={prefersReducedMotion} className="section-shell contact-layout">
        <div>
          <span className="eyebrow light">{t.contact.eyebrow}</span>
          <h2 id="contact-title">{t.contact.title}</h2>
        </div>
        <div className="contact-panel">
          <p>{t.contact.body}</p>
          <div className="contact-methods">
            {contactMethods.map((method) => {
              const Icon = iconByContactMethod[method.id];
              const value = typeof method.value === 'string' ? method.value : method.value[language];
              const className = `contact-method contact-method-${method.id}`;
              const methodContent = (
                <>
                  <Icon size={18} aria-hidden="true" />
                  <span className="contact-method-copy">
                    <strong>{method.label[language]}</strong>
                    <span className="contact-method-value">{value}</span>
                  </span>
                </>
              );

              return 'href' in method ? (
                <a className={className} href={method.href} key={method.id}>
                  {methodContent}
                </a>
              ) : (
                <div className={className} key={method.id}>
                  {methodContent}
                </div>
              );
            })}
          </div>
          <div className="contact-actions">
            <ExternalProfileLink href={profileLinks.linkedin} label={t.contact.linkedin} icon={<Linkedin size={18} />} primary />
            <ExternalProfileLink href={profileLinks.github} label={t.contact.github} icon={<Github size={18} />} />
            <ExternalProfileLink href={profileLinks.credly} label={t.contact.credly} icon={<Award size={18} />} />
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function Footer({ t, onReplay }: { t: Translation; onReplay?: () => void }) {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <p>Youness HERRAKA © {new Date().getFullYear()}</p>
        <p>{t.footer.built}</p>
        <div className="footer-links">
          {onReplay && (
            <button className="opening-replay" type="button" onClick={onReplay} aria-label={t.opening.replay}>
              <RotateCcw size={18} aria-hidden="true" />
              <span className="opening-tooltip" aria-hidden="true">{t.opening.replay}</span>
            </button>
          )}
          <a href={profileLinks.github} target="_blank" rel={externalRel} aria-label="GitHub">
            <Github size={18} aria-hidden="true" />
          </a>
          <a href={profileLinks.linkedin} target="_blank" rel={externalRel} aria-label="LinkedIn">
            <Linkedin size={18} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}

function Reveal({
  children,
  className,
  prefersReducedMotion,
  role,
  ariaLabelledby,
}: {
  children: ReactNode;
  className?: string;
  prefersReducedMotion: boolean;
  role?: AriaRole;
  ariaLabelledby?: string;
}) {
  const { ref, isVisible } = useReveal<HTMLDivElement>(prefersReducedMotion);

  return (
    <div
      ref={ref}
      className={`reveal ${isVisible ? 'is-visible' : ''} ${className ?? ''}`}
      role={role}
      aria-labelledby={ariaLabelledby}
    >
      {children}
    </div>
  );
}

function ExternalProfileLink({
  href,
  label,
  icon,
  primary = false,
}: {
  href: string;
  label: string;
  icon: ReactNode;
  primary?: boolean;
}) {
  return (
    <a className={`profile-link ${primary ? 'is-primary' : ''}`} href={href} target="_blank" rel={externalRel}>
      {icon}
      <span>{label}</span>
      <ExternalLink size={15} aria-hidden="true" />
    </a>
  );
}

export default App;
