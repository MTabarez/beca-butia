import React from 'react';
import { Info } from 'lucide-react';
import { StackedSection } from '../components/StackedSection';
import { CTASection } from '../components/CTASection';
import { PrimaryButton } from '../components/PrimaryButton';
import { SecondaryButton } from '../components/SecondaryButton';
import { ImageReveal } from '../components/ImageReveal';
import {
  ANNUAL_CALL_CONFIG,
  ELIGIBILITY_PATHWAYS,
  OFFICIAL_URLS,
} from '../data/becasContent';
import { IMAGE_CREDIT_REFERENCE, imageAssets } from '../config/imageAssets';
import type { AppRoute } from '../utils/becaHelpers';

export interface RequisitosPageProps {
  onNavigate: (route: AppRoute, hash?: string) => void;
}

export const RequisitosPage: React.FC<RequisitosPageProps> = ({ onNavigate }) => {
  return (
    <main id="contenido-principal" className="bg-[var(--color-page)] text-[#111111]">
      {/* HERO — Restrained Editorial Header */}
      <section
        aria-label="Requisitos de las Becas Butiá"
        className="relative z-10 bg-[var(--color-page)] text-[#111111] pt-32 md:pt-40 pb-16 md:pb-24"
      >
        <div className="butia-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-7">
              <h1 className="type-display-lg text-[#111111]">
                ¿Qué necesitás para postularte?
              </h1>
              <p className="mt-6 type-body-lg text-[#454545] max-w-2xl">
                Presentamos en forma clara las modalidades educativas contempladas, la información
                solicitada en el formulario, el acuerdo educativo y los criterios oficiales del
                programa.
              </p>
            </div>

            <div className="lg:col-span-5 flex flex-wrap gap-3 lg:justify-end">
              <PrimaryButton
                label="Ver guía paso a paso"
                href="/como-postularte"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/como-postularte');
                }}
              />
              <SecondaryButton
                label="Conocé la beca"
                href="/conoce-la-beca"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/conoce-la-beca');
                }}
              />
            </div>
          </div>

          <div className="mt-12 md:mt-14">
            <ImageReveal
              src={imageAssets.requirementsHero}
              alt={`${IMAGE_CREDIT_REFERENCE.title} — ${IMAGE_CREDIT_REFERENCE.institution}`}
              aspectClass="aspect-[16/9]"
              priority
              parallaxStrength={16}
            />
          </div>
        </div>
      </section>

      {/* AGE REQUIREMENT TRANSPARENCY + 5 ELIGIBLE MODALITIES */}
      <StackedSection backgroundStyle="var(--color-surface)" zIndex={16} roundedTop>
        <div className="butia-container py-20 md:py-28 space-y-16">
          <div className="rounded-[24px] bg-[#F1F1EF] border border-[#111111]/8 p-7 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-5">
              <h2 className="type-h3 text-[#111111]">
                Requisito de edad ({ANNUAL_CALL_CONFIG.cycleTitle})
              </h2>
            </div>
            <div className="lg:col-span-7 flex items-start gap-3.5">
              <Info className="w-5 h-5 text-[#111111] shrink-0 mt-1" aria-hidden="true" />
              <div className="space-y-2.5 type-body text-[#454545]">
                <p>{ANNUAL_CALL_CONFIG.eligibilityAgeNote}</p>
                <p className="type-body-sm text-[#111111] font-medium">
                  Estado actual: {ANNUAL_CALL_CONFIG.eligibilityAgeStatus}.
                </p>
              </div>
            </div>
          </div>

          <div>
            <div className="max-w-3xl mb-10">
              <h2 className="type-h2 text-[#111111]">
                Cinco caminos dentro de la educación media pública.
              </h2>
            </div>

            <div className="border-t border-[#D8D8D8] divide-y divide-[#D8D8D8]">
              {ELIGIBILITY_PATHWAYS.map((pathway) => (
                <article
                  key={pathway.id}
                  className="py-7 md:py-8 grid grid-cols-1 lg:grid-cols-12 gap-4 items-baseline"
                >
                  <div className="lg:col-span-5">
                    <h3 className="type-h3 text-[#111111]">{pathway.title}</h3>
                    <p className="mt-1 text-[14px] text-[#454545]">{pathway.subtitle}</p>
                  </div>
                  <p className="lg:col-span-7 type-body text-[#454545]">{pathway.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </StackedSection>

      {/* STRUCTURED REQUIREMENTS BREAKDOWN — BALANCED 2x2 GRID */}
      <StackedSection backgroundStyle="var(--color-page)" zIndex={22} roundedTop>
        <div className="butia-container py-20 md:py-28">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <article className="rounded-[26px] bg-white border border-[#111111]/8 p-7 md:p-9">
              <h2 className="type-h3 text-[#111111]">
                Datos necesarios para completar el registro
              </h2>
              <ul className="mt-5 space-y-3 type-body-sm text-[#454545]">
                <li>
                  · Documento de identidad del estudiante (Cédula de Identidad, documento extranjero
                  o pasaporte) tal como figura en el documento.
                </li>
                <li>· Correo electrónico activo para recibir la contraseña inicial y avisos.</li>
                <li>· Documentos e información básica de quienes integran el núcleo familiar.</li>
                <li>
                  · Datos de contacto de una persona adulta referente y del centro educativo
                  público.
                </li>
              </ul>
            </article>

            <article className="rounded-[26px] bg-white border border-[#111111]/8 p-7 md:p-9">
              <h2 className="type-h3 text-[#111111]">
                Un compromiso que acompaña tu trayectoria
              </h2>
              <p className="mt-5 type-body-sm text-[#454545]">
                Al postularse, cada estudiante acepta el Acuerdo Educativo y la cláusula de
                consentimiento informado. Este acuerdo promueve la asistencia regular a clases, el
                cumplimiento de las actividades educativas y la participación activa junto al centro
                de estudios.
              </p>
            </article>

            <article className="rounded-[26px] bg-white border border-[#111111]/8 p-7 md:p-9">
              <h2 className="type-h3 text-[#111111]">
                Evaluación socioeconómica y educativa
              </h2>
              <p className="mt-5 type-body-sm text-[#454545]">
                La adjudicación de las becas considera información socioeconómica del hogar y datos
                de la trayectoria educativa, en articulación con los organismos que integran la red
                interinstitucional del programa, conforme a los criterios oficiales de cada llamado.
              </p>
            </article>

            <article className="rounded-[26px] bg-white border border-[#111111]/8 p-7 md:p-9">
              <h2 className="type-h3 text-[#111111]">La renovación no es automática</h2>
              <p className="mt-5 type-body-sm text-[#454545]">
                Si ya recibiste la beca o te postulaste en años anteriores, podés volver a
                solicitarla en la nueva convocatoria. Aunque el sistema conserve tus datos previos,
                debés ingresar, revisarlos, actualizarlos y confirmar nuevamente el envío de la
                solicitud.
              </p>
            </article>
          </div>
        </div>
      </StackedSection>

      {/* CLOSING CTA */}
      <CTASection
        heading="¿Ya revisaste los requisitos?"
        description="Seguí nuestra guía paso a paso para conocer cómo completar el formulario en línea o consultá el estado de tu solicitud."
        primaryLabel="Cómo postularte"
        primaryHref="/como-postularte"
        primaryExternal={false}
        onPrimaryClick={(e) => {
          e.preventDefault();
          onNavigate('/como-postularte');
        }}
        secondaryLabel="Ingresar al portal de becas"
        secondaryHref={OFFICIAL_URLS.postulacion}
        secondaryExternal
        cardBg="var(--color-butia-yellow)"
      />
    </main>
  );
};
