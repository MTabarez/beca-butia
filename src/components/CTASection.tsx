import React from 'react';
import { OFFICIAL_URLS } from '../data/becasContent';
import { IMAGE_CREDIT_REFERENCE, imageAssets } from '../config/imageAssets';
import { PrimaryButton } from './PrimaryButton';
import { SecondaryButton } from './SecondaryButton';

export interface CTASectionProps {
  heading?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  primaryExternal?: boolean;
  onPrimaryClick?: (e: React.MouseEvent<HTMLElement>) => void;
  secondaryLabel?: string;
  secondaryHref?: string;
  secondaryExternal?: boolean;
  onSecondaryClick?: (e: React.MouseEvent<HTMLElement>) => void;
  cardBg?: string;
}

/**
 * Closing Editorial CTA Panel:
 * Full-bleed photographic backdrop with centered rounded (36px) Butiá Yellow (#FBBA06) card,
 * crisp near-black (#111111) typography and black pill button, zero decorative eyebrows.
 */
export const CTASection: React.FC<CTASectionProps> = ({
  heading = 'Tu camino educativo importa.',
  description = 'Conocé las Becas Butiá y descubrí cómo acceder a este apoyo para acompañar tu trayectoria en la educación media pública.',
  primaryLabel = 'Conocé cómo postularte',
  primaryHref = '/como-postularte',
  primaryExternal = false,
  onPrimaryClick,
  secondaryLabel = 'Ingresar al portal de becas',
  secondaryHref = OFFICIAL_URLS.postulacion,
  secondaryExternal = true,
  onSecondaryClick,
  cardBg = 'var(--color-butia-yellow)',
}) => {
  const isDarkCard =
    cardBg === 'var(--color-butia-cyan)' ||
    cardBg === 'var(--color-butia-magenta)' ||
    cardBg === 'var(--color-butia-navy)';

  return (
    <section
      aria-label="Llamado a la acción Becas Butiá"
      className="relative z-40 overflow-hidden bg-[#111111]"
    >
      <img
        src={imageAssets.ctaBackground}
        alt={`${IMAGE_CREDIT_REFERENCE.title} — ${IMAGE_CREDIT_REFERENCE.institution}`}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover object-[50%_22%]"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-black/48" />

      <div className="relative z-10 butia-container py-20 md:py-28 lg:py-[128px]">
        <div
          style={{ backgroundColor: cardBg }}
          className="hover-media-card mx-auto max-w-5xl rounded-[28px] md:rounded-[36px] p-7 md:p-11 lg:p-14 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center shadow-[0_24px_64px_rgba(0,0,0,0.22)]"
        >
          <div className="lg:col-span-6 flex flex-col justify-between h-full">
            <div>
              <h2 className={`type-h2 ${isDarkCard ? 'text-white' : 'text-[#111111]'}`}>
                {heading}
              </h2>
              <p
                className={`mt-4 type-body max-w-md ${
                  isDarkCard ? 'text-white/90' : 'text-[#111111]/82'
                }`}
              >
                {description}
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <PrimaryButton
                label={primaryLabel}
                href={primaryHref}
                external={primaryExternal}
                onClick={onPrimaryClick}
                tone={isDarkCard ? 'light' : 'dark'}
              />
              {secondaryLabel && secondaryHref && (
                <SecondaryButton
                  label={secondaryLabel}
                  href={secondaryHref}
                  external={secondaryExternal}
                  onClick={onSecondaryClick}
                  onDark={isDarkCard}
                />
              )}
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="hover-media-frame aspect-[4/3] bg-black/10">
              <img
                src={imageAssets.ctaInset}
                alt={`Fotografía de referencia · ${IMAGE_CREDIT_REFERENCE.title}`}
                loading="lazy"
                className="hover-media-img"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
