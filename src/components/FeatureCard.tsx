import React from 'react';
import { ArrowRight } from 'lucide-react';

export type FeatureCardTheme = 'yellow' | 'cyan' | 'magenta' | 'navy' | 'neutral';

export interface FeatureCardProps {
  heading: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  ctaLabel?: string;
  ctaHref: string;
  onCtaClick?: (e: React.MouseEvent<HTMLElement>) => void;
  theme: FeatureCardTheme;
  className?: string;
}

const THEME_CONFIG: Record<
  FeatureCardTheme,
  { bg: string; headingColor: string; bodyColor: string; lightPill: boolean }
> = {
  yellow: {
    bg: 'var(--color-butia-yellow)',
    headingColor: '#111111',
    bodyColor: 'rgba(17, 17, 17, 0.80)',
    lightPill: false,
  },
  cyan: {
    bg: 'var(--color-butia-cyan)',
    headingColor: '#FFFFFF',
    bodyColor: 'rgba(255, 255, 255, 0.90)',
    lightPill: false,
  },
  magenta: {
    bg: 'var(--color-butia-magenta)',
    headingColor: '#FFFFFF',
    bodyColor: 'rgba(255, 255, 255, 0.90)',
    lightPill: false,
  },
  navy: {
    bg: 'var(--color-butia-navy)',
    headingColor: '#FFFFFF',
    bodyColor: 'rgba(255, 255, 255, 0.86)',
    lightPill: true,
  },
  neutral: {
    bg: 'var(--color-page)',
    headingColor: '#111111',
    bodyColor: '#454545',
    lightPill: false,
  },
};

/**
 * Complete Design Revision — Section 12 EXACT REFERENCE CARD & HOVER BEHAVIOR:
 * - Fixed outer colored container with rounded corners, NO numbering or decorative eyebrows.
 * - Top row: Heading (left) + Black pill-shaped Explore button (right) whose arrow animates
 *   from AFTER the word ("Explorar ->") to BEFORE the word ("-> Explorar") on hover.
 * - Description below.
 * - Large bottom photograph (341:330 ratio) that smoothly contracts ~10% (scale(1) -> scale(0.90))
 *   centered inside its available area on hover over 500ms cubic-bezier(0.22, 1, 0.36, 1).
 * - Outer card remains visually stable (subtle -4px vertical lift only); sibling cards stay static.
 */
export const FeatureCard: React.FC<FeatureCardProps> = ({
  heading,
  description,
  imageSrc,
  imageAlt,
  ctaLabel = 'Explorar',
  ctaHref,
  onCtaClick,
  theme,
  className = '',
}) => {
  const styles = THEME_CONFIG[theme];

  return (
    <article
      data-testid="reference-card"
      style={{ backgroundColor: styles.bg }}
      className={`butia-ref-card ${className}`}
    >
      <div>
        <div className="flex items-start justify-between gap-4">
          <h3
            style={{ color: styles.headingColor }}
            className="font-display font-medium text-[clamp(24px,2.1vw,30px)] leading-[1.12] tracking-[-0.03em]"
          >
            {heading}
          </h3>

          <a
            href={ctaHref}
            onClick={onCtaClick}
            className={`butia-explore-pill ${styles.lightPill ? 'butia-explore-pill--light' : ''}`}
          >
            <span className="butia-explore-pill__arrow-left" aria-hidden="true">
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.2]" />
            </span>
            <span>{ctaLabel}</span>
            <span className="butia-explore-pill__arrow-right" aria-hidden="true">
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.2]" />
            </span>
          </a>
        </div>

        <p
          style={{ color: styles.bodyColor }}
          className="mt-4 type-body-sm leading-[1.55] max-w-[34ch]"
        >
          {description}
        </p>
      </div>

      {/* Centered contraction image area (~10% inward contraction on hover: scale 1 -> 0.90) */}
      <div className="butia-ref-card__media-slot mt-5 md:mt-7">
        <div className="butia-ref-card__media-frame">
          <img
            src={imageSrc}
            alt={imageAlt}
            loading="lazy"
            draggable={false}
            className="butia-ref-card__img"
          />
        </div>
      </div>
    </article>
  );
};
