import { useEffect, useRef, type CSSProperties } from 'react';
import { Check, ChevronsRight, Cloud, Container, Database, GitBranch, Monitor, Server, Terminal } from 'lucide-react';
import { translations, type Language } from './data';
import { openingAnimationDuration, openingRevealStart } from './hooks';
import './opening.css';

function InfrastructureScenes({ label, disciplines }: { label: string; disciplines: readonly string[] }) {
  return (
    <div className="opening-scenes" role="img" aria-label={label}>
      <svg className="opening-scene-art" viewBox="0 0 840 240" aria-hidden="true" focusable="false">
        <g className="scene-connections">
          <path className="scene-connection-track" d="M214 120H314M520 120H626" />
          <path className="scene-connection-flow flow-cloud" d="M214 120H314" pathLength="100" />
          <path className="scene-connection-flow flow-devops" d="M520 120H626" pathLength="100" />
        </g>

        <g className="scene-it">
          <path className="scene-plinth" d="M54 194H250M68 200H236" />
          <path className="scene-local-link" d="M105 146V175H205V149" />
          {[0, 1, 2].map((rack) => (
            <g transform={`translate(66 ${48 + rack * 35})`} key={rack}>
              <g className="scene-rack" style={{ '--rack-delay': `${100 + rack * 120}ms` } as CSSProperties}>
                <rect className="scene-device" width="78" height="28" rx="4" />
                <Server x="7" y="6" size={16} strokeWidth={1.6} />
                <path className="scene-vent" d="M33 10H57M33 17H50" />
                <rect className="scene-led" x="66" y="11" width="5" height="5" rx="1" />
              </g>
            </g>
          ))}
          <g className="scene-workstation">
            <Monitor x="165" y="93" size={70} strokeWidth={1.2} />
            <path className="scene-terminal-line" d="M179 115L185 120L179 125M190 125H205" />
          </g>
        </g>

        <g className="scene-cloud">
          <path className="scene-plinth" d="M327 194H513M341 200H499" />
          <g className="scene-cloud-symbol">
            <Cloud x="360" y="23" size={120} strokeWidth={1.15} />
          </g>
          <path className="scene-cloud-branches" d="M420 118V150M370 160V150H470V160M420 150V160" />
          <g className="scene-cloud-resources">
            <Container x="357" y="159" size={26} strokeWidth={1.4} />
            <Database x="407" y="159" size={26} strokeWidth={1.4} />
            <Server x="457" y="159" size={26} strokeWidth={1.4} />
          </g>
          <rect className="scene-upload-packet" x="417" y="121" width="6" height="6" rx="1" />
        </g>

        <g className="scene-devops">
          <path className="scene-plinth" d="M592 194H788M606 200H774" />
          <g className="scene-branch">
            <GitBranch x="669" y="42" size={40} strokeWidth={1.4} />
          </g>
          <path className="scene-pipeline-track" d="M634 120H750M750 142V165H634V142" />
          <path className="scene-pipeline-flow" d="M634 120H750" pathLength="100" />
          <g className="scene-pipeline-step step-code">
            <rect className="scene-device" x="612" y="98" width="44" height="44" rx="6" />
            <Terminal x="622" y="108" size={24} strokeWidth={1.5} />
          </g>
          <g className="scene-pipeline-step step-build">
            <rect className="scene-device" x="670" y="98" width="44" height="44" rx="6" />
            <Container x="680" y="108" size={24} strokeWidth={1.5} />
          </g>
          <g className="scene-pipeline-step step-deploy">
            <rect className="scene-device" x="728" y="98" width="44" height="44" rx="6" />
            <Check x="738" y="108" size={24} strokeWidth={1.8} />
          </g>
        </g>
      </svg>
      <div className="opening-scene-labels" aria-hidden="true">
        {disciplines.map((discipline, index) => (
          <span key={discipline}><small>0{index + 1}</small>{discipline}</span>
        ))}
      </div>
    </div>
  );
}

export default function OpeningAnimation({ language, onSkip }: { language: Language; onSkip: () => void }) {
  const t = translations[language].opening;
  const skipRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    skipRef.current?.focus({ preventScroll: true });
  }, []);

  return (
    <div
      className="opening-sequence"
      style={{
        '--opening-duration': `${openingAnimationDuration}ms`,
        '--opening-reveal': `${openingRevealStart}ms`,
        '--opening-exit': `${openingAnimationDuration - openingRevealStart}ms`,
      } as CSSProperties}
    >
      <div className="opening-shutter opening-shutter-left" aria-hidden="true" />
      <div className="opening-shutter opening-shutter-right" aria-hidden="true" />
      <div className="opening-masthead" aria-hidden="true">
        <span className="opening-signature">YH<span>.</span></span>
        <span>Portfolio</span>
      </div>
      <button ref={skipRef} className="opening-skip" type="button" onClick={onSkip} aria-label={t.skip}>
        <ChevronsRight size={20} aria-hidden="true" />
      </button>

      <div className="opening-inner" role="status" aria-label={t.announcement}>
        <InfrastructureScenes label={t.scenes} disciplines={t.disciplines} />
        <p className="opening-eyebrow">{t.eyebrow}</p>
        <strong className="opening-name" aria-label="Youness Herraka">
          <span className="opening-word" aria-hidden="true"><span>Youness</span></span>
          <span className="opening-word" aria-hidden="true"><span>Herraka</span></span>
        </strong>
      </div>

      <div className="opening-baseline" aria-hidden="true">
        <span>Youness Herraka</span>
        <span>{t.location}</span>
      </div>
      <div className="opening-timeline" aria-hidden="true"><span /></div>
    </div>
  );
}
