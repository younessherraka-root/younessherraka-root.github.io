import { useEffect, useRef, type CSSProperties } from 'react';
import { Check, ChevronsRight, Cloud, Container, Database, Network, Server, Terminal } from 'lucide-react';
import { translations, type Language } from './data';
import { openingAnimationDuration, openingRevealStart } from './hooks';
import './opening.css';

function InfrastructureScenes({ label, disciplines }: { label: string; disciplines: readonly string[] }) {
  return (
    <div className="opening-scenes" role="img" aria-label={label}>
      <svg className="opening-scene-art" viewBox="0 0 1000 250" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="opening-flow-gradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#2563eb" />
            <stop offset="0.5" stopColor="#0891b2" />
            <stop offset="1" stopColor="#16a34a" />
          </linearGradient>
        </defs>

        <g className="scene-connections">
          <path className="scene-connection-track" d="M185 125H285M415 125H500M650 125H730" pathLength="100" />
          <path className="scene-connection-line" d="M185 125H285M415 125H500M650 125H730" pathLength="100" />
          <path className="scene-connection-flow" d="M185 125H285M415 125H500M650 125H730" pathLength="100" />
        </g>

        <g className="scene-infrastructure" transform="translate(45 65)">
          {[0, 1, 2].map((rack) => (
            <g transform={`translate(0 ${rack * 42})`} key={rack}>
              <g className="scene-rack" style={{ '--scene-delay': `${180 + rack * 130}ms` } as CSSProperties}>
                <rect className="scene-rack-shell" width="140" height="34" rx="8" />
                <Server x="12" y="7" size={20} strokeWidth={1.5} />
                <path className="scene-rack-vent" d="M46 12H96M46 21H83" />
                <circle className="scene-led" cx="121" cy="17" r="4" />
              </g>
            </g>
          ))}
          <path className="scene-floor" d="M-5 140H145" />
        </g>

        <g transform="translate(285 60)">
          <g className="scene-network">
            <circle className="scene-network-ring scene-network-ring-outer" cx="65" cy="65" r="61" />
            <circle className="scene-network-ring" cx="65" cy="65" r="50" />
            <circle className="scene-network-core" cx="65" cy="65" r="43" />
            <Network x="37" y="37" size={56} strokeWidth={1.35} />
            {[
              [65, 4],
              [126, 65],
              [65, 126],
              [4, 65],
            ].map(([cx, cy], index) => (
              <circle
                className="scene-network-node"
                cx={cx}
                cy={cy}
                r="5"
                style={{ '--node-delay': `${620 + index * 100}ms` } as CSSProperties}
                key={`${cx}-${cy}`}
              />
            ))}
          </g>
        </g>

        <g className="scene-cloud" transform="translate(500 37)">
          <g className="scene-cloud-symbol">
            <Cloud x="10" y="3" size={130} strokeWidth={1.15} />
          </g>
          <path className="scene-cloud-branches" d="M75 105V135M30 135H120M30 135V150M75 135V150M120 135V150" />
          <g className="scene-cloud-resource resource-database">
            <Database x="16" y="151" size={28} strokeWidth={1.45} />
          </g>
          <g className="scene-cloud-resource resource-container">
            <Container x="61" y="151" size={28} strokeWidth={1.45} />
          </g>
          <g className="scene-cloud-resource resource-server">
            <Server x="106" y="151" size={28} strokeWidth={1.45} />
          </g>
          <circle className="scene-upload-packet" cx="75" cy="132" r="4" />
        </g>

        <g className="scene-devops" transform="translate(730 72)">
          <path className="scene-pipeline-track" d="M55 53H106M161 53H212" />
          <path className="scene-pipeline-flow" d="M55 53H106M161 53H212" pathLength="100" />
          <g className="scene-pipeline-step step-code">
            <circle className="scene-step-shell" cx="28" cy="53" r="28" />
            <Terminal x="14" y="39" size={28} strokeWidth={1.45} />
          </g>
          <g className="scene-pipeline-step step-build">
            <circle className="scene-step-shell" cx="134" cy="53" r="28" />
            <Container x="120" y="39" size={28} strokeWidth={1.45} />
          </g>
          <g className="scene-pipeline-step step-deploy">
            <circle className="scene-step-shell" cx="240" cy="53" r="28" />
            <Check x="226" y="39" size={28} strokeWidth={1.8} />
          </g>
          <path className="scene-devops-loop" d="M28 92C28 134 240 134 240 92" />
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
      <button ref={skipRef} className="opening-skip" type="button" onClick={onSkip} aria-label={t.skip}>
        <ChevronsRight size={18} aria-hidden="true" />
      </button>

      <div className="opening-inner" role="status" aria-label={t.announcement}>
        <p className="opening-eyebrow"><i aria-hidden="true" />{t.eyebrow}</p>
        <strong className="opening-name" aria-label="Youness Herraka">
          <span className="opening-word" aria-hidden="true"><span>Youness</span></span>
          <span className="opening-word" aria-hidden="true"><span>Herraka</span></span>
        </strong>
        <InfrastructureScenes label={t.scenes} disciplines={t.disciplines} />
      </div>

      <div className="opening-timeline" aria-hidden="true"><span /></div>
    </div>
  );
}
