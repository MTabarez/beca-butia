import React from 'react';
import { ArrowUpRight, CheckCircle2, Mail, Phone } from 'lucide-react';
import { StackedSection } from '../components/StackedSection';
import { CTASection } from '../components/CTASection';
import { PrimaryButton } from '../components/PrimaryButton';
import { SecondaryButton } from '../components/SecondaryButton';
import { ImageReveal } from '../components/ImageReveal';
import { OFFICIAL_URLS, USER_GUIDE_STEPS } from '../data/becasContent';
import { imageAssets } from '../config/imageAssets';
import type { AppRoute } from '../utils/becaHelpers';

export interface ComoPostulartePageProps {
  onNavigate: (route: AppRoute, hash?: string) => void;
}

export const ComoPostulartePage: React.FC<ComoPostulartePageProps> = ({ onNavigate }) => {
  return (
    <main id="contenido-principal" className="bg-[var(--color-page)] text-[#111111]">
      {/* HERO — Restrained Editorial Header */}
      <section
        aria-label="Cómo postularte a las Becas Butiá"
        className="relative z-10 bg-[var(--color-page)] text-[#111111] pt-32 md:pt-40 pb-16 md:pb-24"
      >
        <div className="butia-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-7">
              <h1 className="type-display-lg text-[#111111]">
                Tu solicitud, paso a paso.
              </h1>
              <p className="mt-6 type-body-lg text-[#454545] max-w-2xl">
                Reunimos las indicaciones basadas en la Guía del Usuario del MEC para que puedas
                registrarte, completar el formulario en línea a tu ritmo y consultar el resultado
                sin dificultades.
              </p>
            </div>

            <div className="lg:col-span-5 flex flex-wrap gap-3 lg:justify-end">
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
            </div>
          </div>

          <div className="mt-12 md:mt-14">
            <ImageReveal
              src={imageAssets.guideHero}
              alt="Cuadernolas oficiales y códigos QR del programa Becas Butiá — El Popular"
              aspectClass="aspect-[16/9]"
              priority
              parallaxStrength={16}
            />
          </div>
        </div>
      </section>

      {/* 6-STEP OFFICIAL USER GUIDE FLOW */}
      <StackedSection backgroundStyle="var(--color-surface)" zIndex={16} roundedTop>
        <div className="butia-container py-16 md:py-24">
          <div className="max-w-3xl mb-12 md:mb-16">
            <h2 className="type-h2 text-[#111111]">
              Seis etapas claras para completar tu postulación en línea.
            </h2>
          </div>

          <ol className="border-t border-[#D8D8D8] divide-y divide-[#D8D8D8]">
            {USER_GUIDE_STEPS.map((step) => (
              <li
                key={step.id}
                id={step.id}
                className="scroll-mt-24 py-10 md:py-12 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10"
              >
                <div className="lg:col-span-5">
                  <span className="font-display font-normal text-[14px] text-[#454545] block mb-2">
                    Paso {step.number}
                  </span>
                  <h3 className="type-h3 text-[#111111]">{step.title}</h3>
                  <p className="mt-3 type-body-sm text-[#454545]">{step.summary}</p>
                </div>

                <div className="lg:col-span-7 flex flex-col justify-center">
                  <ul className="space-y-3.5">
                    {step.details.map((detail) => (
                      <li
                        key={detail}
                        className="flex items-start gap-3 type-body text-[#111111]"
                      >
                        <CheckCircle2
                          className="w-5 h-5 text-[#007405] shrink-0 mt-1"
                          aria-hidden="true"
                        />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </StackedSection>

      {/* SUPPORT CHANNELS & OFFICIAL REFERENCES */}
      <StackedSection backgroundStyle="var(--color-page)" zIndex={22} roundedTop>
        <div className="butia-container py-20 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5">
              <h2 className="type-h2 text-[#111111]">
                ¿Necesitás ayuda para completar tu formulario?
              </h2>
              <p className="mt-4 type-body text-[#454545]">
                Si tenés dudas sobre tu acceso, recuperación de contraseña o carga de datos, el
                Ministerio de Educación y Cultura brinda canales gratuitos de orientación.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="rounded-[22px] bg-white p-6 md:p-7 border border-[#111111]/8">
                <h3 className="font-display font-medium text-[19px] text-[#111111] mb-3">
                  Canales telefónicos y correo (MEC)
                </h3>
                <ul className="space-y-2.5 type-body-sm text-[#454545]">
                  <li className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-[#111111] shrink-0" aria-hidden="true" />
                    <span>
                      <strong className="text-[#111111] font-semibold">0800 2342</strong> (teléfonos
                      fijos)
                    </span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-[#111111] shrink-0" aria-hidden="true" />
                    <span>
                      <strong className="text-[#111111] font-semibold">*2342</strong> (celulares)
                    </span>
                  </li>
                  <li className="type-caption text-[#454545] pl-6">
                    Horario publicado: {OFFICIAL_URLS.horarioAtencion}
                  </li>
                  <li className="flex items-center gap-2.5 pt-1">
                    <Mail className="w-4 h-4 text-[#111111] shrink-0" aria-hidden="true" />
                    <a href={OFFICIAL_URLS.email} className="underline hover:text-[#111111]">
                      {OFFICIAL_URLS.emailLabel}
                    </a>
                  </li>
                </ul>
              </div>

              <div className="rounded-[22px] bg-white p-6 md:p-7 border border-[#111111]/8">
                <h3 className="font-display font-medium text-[19px] text-[#111111] mb-3">
                  Portales oficiales de referencia
                </h3>
                <ul className="space-y-2.5 type-body-sm">
                  {[
                    { label: 'Portal de becas (postulación)', href: OFFICIAL_URLS.postulacion },
                    { label: 'Portal de consulta de resultados', href: OFFICIAL_URLS.consulta },
                    { label: 'Portal Butiá en MEC (gub.uy)', href: OFFICIAL_URLS.portalButiaMec },
                    {
                      label: 'Formulario oficial de atención al usuario',
                      href: OFFICIAL_URLS.formularioContacto,
                    },
                  ].map((item) => (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[#111111] font-medium hover:text-[#009FE3]"
                      >
                        <span>{item.label}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </StackedSection>

      {/* CLOSING CTA */}
      <CTASection
        heading="¿Querés confirmar antes los requisitos y modalidades?"
        description="Repasá las cinco modalidades educativas contempladas, los criterios de selección y las condiciones para quienes ya recibieron una beca."
        primaryLabel="Consultar requisitos"
        primaryHref="/requisitos"
        primaryExternal={false}
        onPrimaryClick={(e) => {
          e.preventDefault();
          onNavigate('/requisitos');
        }}
        secondaryLabel="Ingresar al portal de becas"
        secondaryHref={OFFICIAL_URLS.postulacion}
        secondaryExternal
        cardBg="var(--color-butia-yellow)"
      />
    </main>
  );
};
