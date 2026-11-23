import React from 'react';
import { PrimaryButton } from './PrimaryButton';
import type { AppRoute } from '../utils/becaHelpers';

export interface EditorialStatementProps {
  onNavigate?: (route: AppRoute, hash?: string) => void;
  statement?: string;
  supportingText?: string;
  ctaLabel?: string;
  ctaRoute?: AppRoute;
}

/**
 * Large Centered Editorial Statement — Stage E of the Unified Hero/Collage sequence.
 * Restrained near-black (#111111) Space Grotesk 400/500, zero decorative eyebrows.
 */
export const EditorialStatement: React.FC<EditorialStatementProps> = ({
  onNavigate,
  statement = 'Una beca para acompañar tu trayectoria educativa y abrir más oportunidades para seguir estudiando.',
  supportingText = 'Las Becas Butiá combinan respaldo económico y cercanía en el centro educativo para proteger el derecho a la educación media pública en todo Uruguay.',
  ctaLabel = 'Conocé la beca',
  ctaRoute = '/conoce-la-beca',
}) => {
  return (
    <div
      data-testid="editorial-statement"
      className="w-full max-w-[850px] mx-auto px-5 md:px-7 text-center"
    >
      <h2 className="font-display font-normal text-[#111111] text-[clamp(28px,3.8vw,54px)] leading-[1.09] tracking-[-0.035em]">
        {statement}
      </h2>

      {supportingText && (
        <p className="mt-6 md:mt-7 type-body-lg text-[#454545] max-w-[640px] mx-auto">
          {supportingText}
        </p>
      )}

      {onNavigate && ctaLabel && (
        <div className="mt-8 md:mt-10 flex justify-center">
          <PrimaryButton
            label={ctaLabel}
            href={ctaRoute}
            onClick={(e) => {
              e.preventDefault();
              onNavigate(ctaRoute);
            }}
            tone="dark"
          />
        </div>
      )}
    </div>
  );
};
