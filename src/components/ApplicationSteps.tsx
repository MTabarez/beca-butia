import React from 'react';
import { APPLICATION_STEPS, OFFICIAL_URLS } from '../data/becasContent';
import { imageAssets } from '../config/imageAssets';
import { PrimaryButton } from './PrimaryButton';
import { SecondaryButton } from './SecondaryButton';
import { ImageReveal } from './ImageReveal';
import type { AppRoute } from '../utils/becaHelpers';

export interface ApplicationStepsProps {
  id?: string;
  onNavigate?: (route: AppRoute, hash?: string) => void;
}

/**
 * Open Asymmetric Editorial Application Process:
 * Left-aligned editorial stages + right-aligned documentary photograph.
 * Zero decorative eyebrows, zero colorful step numbers.
 */
export const ApplicationSteps: React.FC<ApplicationStepsProps> = ({
  id = 'como-postularte',
  onNavigate,
}) => {
  return (
    <div id={id} className="scroll-mt-24 butia-container py-20 md:py-28 lg:py-[128px]">
      <div className="max-w-3xl mb-14 md:mb-16">
        <h2 className="type-h1 text-[#111111]">¿Cómo solicitar la Beca Butiá?</h2>
        <p className="mt-5 type-body-lg text-[#454545] max-w-2xl">
          La postulación se realiza en línea y de forma gratuita a través del sistema oficial del
          MEC.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        <div className="lg:col-span-7">
          <ol className="divide-y divide-[#111111]/12 border-t border-b border-[#111111]/12">
            {APPLICATION_STEPS.map((step) => (
              <li key={step.number} className="py-8 md:py-9">
                <h3 className="type-h3 text-[#111111]">{step.title}</h3>
                <p className="mt-2.5 type-body font-medium text-[#111111] leading-snug">
                  {step.description}
                </p>
                <p className="mt-2 type-body-sm text-[#454545]">{step.detail}</p>
              </li>
            ))}
          </ol>

          <div className="mt-9 flex flex-wrap items-center gap-3.5">
            <PrimaryButton
              label="Ingresar al portal de becas"
              href={OFFICIAL_URLS.postulacion}
              external
              tone="dark"
            />
            <SecondaryButton
              label="Consultar mi beca"
              href={OFFICIAL_URLS.consulta}
              external
            />
            {onNavigate && (
              <SecondaryButton
                label="Ver guía paso a paso"
                href="/como-postularte"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/como-postularte');
                }}
              />
            )}
          </div>
        </div>

        <div className="lg:col-span-5">
          <ImageReveal
            src={imageAssets.applicationSteps}
            alt="Cuadernolas oficiales y códigos QR de inscripción de Becas Butiá — El Popular"
            aspectClass="aspect-[4/3.6]"
            parallaxStrength={20}
          />
        </div>
      </div>
    </div>
  );
};
