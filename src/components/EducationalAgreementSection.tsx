import React from 'react';
import { imageAssets } from '../config/imageAssets';
import { ImageReveal } from './ImageReveal';
import { SecondaryButton } from './SecondaryButton';
import type { AppRoute } from '../utils/becaHelpers';

export interface EducationalAgreementSectionProps {
  onNavigate: (route: AppRoute, hash?: string) => void;
  /** Render crisp white editorial contrast when placed on a solid Butiá brand panel */
  onSolidBrand?: boolean;
}

const AGREEMENT_PILLARS = [
  {
    title: 'Asistencia regular a clases',
    description:
      'Sostener la presencia cotidiana en el centro educativo y mantener el vínculo activo con docentes y referentes.',
  },
  {
    title: 'Participación en las actividades',
    description:
      'Acompañar las propuestas pedagógicas, tareas y espacios de aprendizaje que ofrece cada modalidad.',
  },
  {
    title: 'Construcción de trayectoria',
    description:
      'Avanzar paso a paso en el proceso formativo junto a la comunidad educativa y el acompañamiento familiar.',
  },
];

/**
 * Editorial Solid-Brand or Neutral Asymmetric Composition:
 * Image positioned left, open editorial text right — zero numbering, zero decorative eyebrows.
 */
export const EducationalAgreementSection: React.FC<EducationalAgreementSectionProps> = ({
  onNavigate,
  onSolidBrand = false,
}) => {
  const headingClass = onSolidBrand ? 'text-white' : 'text-[#111111]';
  const bodyClass = onSolidBrand ? 'text-white/90' : 'text-[#454545]';
  const dividerClass = onSolidBrand ? 'border-white/25 divide-white/20' : 'border-[#111111]/12 divide-[#111111]/12';

  return (
    <div
      id="acuerdo-educativo"
      className="scroll-mt-24 butia-container py-20 md:py-28 lg:py-[132px]"
    >
      {/* Large Editorial Heading Spanning Top */}
      <div className="max-w-3xl mb-12 md:mb-16">
        <h2 className={`type-h1 ${headingClass}`}>
          Un acuerdo educativo que acompaña tu trayectoria.
        </h2>
      </div>

      {/* Asymmetric Image-Left / Editorial-Text-Right Layout (matching Reference Panel) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        <div className="lg:col-span-5">
          <ImageReveal
            src={imageAssets.educationalAgreement}
            alt="Identidad institucional del programa Becas Butiá junto al Ministerio de Educación y Cultura — Presidencia de la República"
            aspectClass="aspect-[4/4.3]"
            parallaxStrength={20}
          />
        </div>

        <div className="lg:col-span-7 lg:pl-4">
          <p className={`type-body-lg ${headingClass} max-w-2xl`}>
            Quienes reciben la Beca Butiá asumen un compromiso pensado para acompañar su continuidad
            en el centro de estudios: asistir regularmente a clases, cumplir con las actividades
            propuestas y participar activamente en su proceso formativo.
          </p>

          <p className={`mt-4 type-body ${bodyClass} max-w-2xl`}>
            El objetivo es proteger el recorrido de cada estudiante y sostener el vínculo con su
            comunidad educativa, fortaleciendo las oportunidades para avanzar y egresar.
          </p>

          <div className={`mt-10 border-t ${dividerClass} divide-y`}>
            {AGREEMENT_PILLARS.map((item) => (
              <div key={item.title} className="py-5">
                <h3 className={`font-display font-medium text-[20px] ${headingClass}`}>
                  {item.title}
                </h3>
                <p className={`mt-1.5 type-body-sm ${bodyClass} max-w-xl`}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-9">
            <SecondaryButton
              label="Conocé más sobre el acuerdo"
              href="/conoce-la-beca#acuerdo-detalle"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/conoce-la-beca', '#acuerdo-detalle');
              }}
              onDark={onSolidBrand}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
