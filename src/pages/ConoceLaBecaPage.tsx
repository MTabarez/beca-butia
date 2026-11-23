import React from 'react';
import { ArrowUpRight, Mail, Phone } from 'lucide-react';
import { StackedSection } from '../components/StackedSection';
import { EditorialSection } from '../components/EditorialSection';
import { ScholarshipAmounts } from '../components/ScholarshipAmounts';
import { FAQAccordion } from '../components/FAQAccordion';
import { CTASection } from '../components/CTASection';
import { PrimaryButton } from '../components/PrimaryButton';
import { SecondaryButton } from '../components/SecondaryButton';
import { ImageReveal } from '../components/ImageReveal';
import {
  ANNUAL_CALL_CONFIG,
  ELIGIBILITY_PATHWAYS,
  FAQ_ITEMS,
  INSTITUTIONAL_PARTNERS_LOGOS,
  OFFICIAL_URLS,
  SEVEN_INSTITUTIONS_DETAIL,
} from '../data/becasContent';
import { IMAGE_CREDIT_REFERENCE, imageAssets } from '../config/imageAssets';
import type { AppRoute } from '../utils/becaHelpers';

export interface ConoceLaBecaPageProps {
  onNavigate: (route: AppRoute, hash?: string) => void;
}

export const ConoceLaBecaPage: React.FC<ConoceLaBecaPageProps> = ({ onNavigate }) => {
  const refAlt = `${IMAGE_CREDIT_REFERENCE.title} — ${IMAGE_CREDIT_REFERENCE.institution}`;

  return (
    <main id="contenido-principal" className="bg-[var(--color-page)] text-[#111111]">
      {/* HERO — Restrained Editorial Header on Neutral Surface */}
      <section
        aria-label="Conocé las Becas Butiá"
        className="relative z-10 bg-[var(--color-page)] text-[#111111] pt-32 md:pt-40 pb-16 md:pb-24"
      >
        <div className="butia-container">
          <div className="max-w-4xl">
            <h1 className="type-display-lg text-[#111111]">
              Una beca para acompañar tu camino educativo.
            </h1>

            <p className="mt-6 md:mt-8 type-body-lg text-[#454545] max-w-2xl">
              Un apoyo económico y una política de acompañamiento que buscan proteger las
              trayectorias de estudiantes de educación media pública en todo el país.
            </p>

            {/* Clean Inline Section Index (Zero Numbering) */}
            <nav
              aria-label="Índice de secciones"
              className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2.5 text-[14px] font-medium text-[#111111]"
            >
              {[
                { label: 'Qué es', href: '#que-es' },
                { label: 'Propósito', href: '#para-que-existe' },
                { label: 'Destinatarios y modalidades', href: '#a-quien-esta-dirigida' },
                { label: 'Apoyo económico', href: '#apoyo-economico-detalle' },
                { label: 'Acuerdo y selección', href: '#acuerdo-detalle' },
                { label: 'Instituciones', href: '#instituciones-detalle' },
                { label: 'Solicitud y ayuda', href: '#como-solicitarla' },
              ].map((anchor) => (
                <a
                  key={anchor.href}
                  href={anchor.href}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/conoce-la-beca', anchor.href);
                  }}
                  className="py-1 border-b border-[#111111]/25 hover:border-[#009FE3] hover:text-[#009FE3] transition-colors whitespace-nowrap"
                >
                  {anchor.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="mt-12 md:mt-16">
            <ImageReveal
              src={imageAssets.detailHero}
              alt={refAlt}
              aspectClass="aspect-[16/9]"
              priority
              parallaxStrength={16}
            />
          </div>
        </div>
      </section>

      {/* QUÉ ES LA BECA BUTIÁ */}
      <StackedSection backgroundStyle="var(--color-surface)" zIndex={14} roundedTop>
        <EditorialSection
          id="que-es"
          heading="Una política pública que combina respaldo económico y cercanía educativa."
          lead="La Beca Butiá —«Contigo caminamos los sueños»— es un apoyo dirigido a estudiantes de educación media pública en Uruguay."
          paragraphs={[
            'Su diseño integra la transferencia de un apoyo económico con el seguimiento y el acompañamiento de cada estudiante en su centro educativo, articulando la labor de siete organismos públicos del país.',
            'El programa busca garantizar el derecho a la educación media pública y brindar mejores condiciones para que adolescentes y jóvenes puedan sostener sus estudios en todo el territorio nacional.',
          ]}
          image={{
            src: imageAssets.detailEditorialOne,
            alt: refAlt,
          }}
          imagePosition="left"
          cta={{
            label: 'Ver cómo postularte paso a paso',
            href: '/como-postularte',
            variant: 'primary',
            onClick: (e) => {
              e.preventDefault();
              onNavigate('/como-postularte');
            },
          }}
        />
      </StackedSection>

      {/* PARA QUÉ EXISTE EL PROGRAMA */}
      <StackedSection backgroundStyle="var(--color-page)" zIndex={18} roundedTop>
        <div id="para-que-existe" className="scroll-mt-24 butia-container py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5">
              <h2 className="type-h2 text-[#111111]">
                Proteger las trayectorias y favorecer la continuidad educativa.
              </h2>
            </div>

            <div className="lg:col-span-7 space-y-5 type-body text-[#454545]">
              <p>
                Becas Butiá existe para reducir los factores económicos y sociales que pueden
                dificultar la permanencia en el sistema educativo, acompañando tanto el tránsito por
                Educación Media Básica como el avance y egreso en Educación Media Superior.
              </p>
              <p>
                A lo largo del año 2026, el programa alcanzó{' '}
                <strong className="text-[#111111] font-semibold">20.958 becas otorgadas</strong>{' '}
                (dato oficial presentado en junio de 2026) y forma parte de una estrategia de
                ampliación progresiva cuya meta proyectada para 2029 es llegar a{' '}
                <strong className="text-[#111111] font-semibold">70.000 estudiantes</strong> en todo
                el país.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-[#D8D8D8]">
                {[
                  {
                    title: 'Continuidad',
                    desc: 'Acompañar las necesidades cotidianas vinculadas al estudio para sostener el año lectivo.',
                  },
                  {
                    title: 'Vínculo',
                    desc: 'Fortalecer la asistencia, la participación y la cercanía con docentes y referentes.',
                  },
                  {
                    title: 'Egreso',
                    desc: 'Respaldar con montos progresivos el avance en Educación Media Superior.',
                  },
                ].map((goal) => (
                  <div key={goal.title}>
                    <h3 className="font-display font-medium text-[20px] text-[#111111]">
                      {goal.title}
                    </h3>
                    <p className="mt-2 type-body-sm text-[#454545]">{goal.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </StackedSection>

      {/* A QUIÉN ESTÁ DIRIGIDA & MODALIDADES */}
      <StackedSection backgroundStyle="var(--color-surface)" zIndex={22} roundedTop>
        <div id="a-quien-esta-dirigida" className="scroll-mt-24">
          <EditorialSection
            heading="Estudiantes de educación media pública de todo Uruguay."
            lead="Está orientada a adolescentes y jóvenes que cursan o proyectan cursar educación media pública y cumplen las condiciones de la convocatoria vigente."
            paragraphs={[
              ANNUAL_CALL_CONFIG.eligibilityAgeNote,
              'Además de la modalidad educativa y la edad vigente en el llamado, el proceso contempla información socioeconómica del hogar y datos de la trayectoria educativa.',
            ]}
            image={{
              src: imageAssets.detailEditorialTwo,
              alt: refAlt,
            }}
            secondaryInsetImage={{
              src: imageAssets.detailEditorialInset,
              alt: refAlt,
            }}
            imagePosition="right"
            cta={{
              label: 'Ver página completa de requisitos',
              href: '/requisitos',
              variant: 'primary',
              onClick: (e) => {
                e.preventDefault();
                onNavigate('/requisitos');
              },
            }}
          />

          <div id="modalidades-detalle" className="scroll-mt-24 butia-container pb-20 md:pb-28 -mt-4">
            <div className="mb-10">
              <h3 className="type-h2 text-[#111111]">
                Cinco modalidades de educación media pública habilitadas.
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
              {ELIGIBILITY_PATHWAYS.map((pathway) => (
                <article
                  key={pathway.id}
                  className="rounded-[22px] bg-[#F1F1EF] p-6 border border-[#111111]/8 flex flex-col justify-between"
                >
                  <div>
                    <h4 className="font-display font-medium text-[20px] text-[#111111] leading-snug">
                      {pathway.title}
                    </h4>
                    <p className="mt-1 text-[13px] font-medium text-[#454545]">
                      {pathway.subtitle}
                    </p>
                    <p className="mt-3 type-body-sm text-[#454545]">{pathway.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </StackedSection>

      {/* CÓMO FUNCIONA EL APOYO ECONÓMICO */}
      <StackedSection backgroundStyle="var(--color-page)" zIndex={26} roundedTop>
        <ScholarshipAmounts id="apoyo-economico-detalle" />
      </StackedSection>

      {/* ACUERDO EDUCATIVO & PROCESO DE SELECCIÓN */}
      <StackedSection backgroundStyle="var(--color-surface)" zIndex={30} roundedTop>
        <div className="butia-container py-20 md:py-28 space-y-20">
          <div
            id="acuerdo-detalle"
            className="scroll-mt-24 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start border-b border-[#D8D8D8] pb-16"
          >
            <div className="lg:col-span-5">
              <h2 className="type-h2 text-[#111111]">
                Un compromiso compartido para sostener tu recorrido.
              </h2>
            </div>
            <div className="lg:col-span-7 space-y-6">
              <p className="type-body text-[#454545]">
                Al postularse, cada estudiante acepta un acuerdo educativo diseñado para acompañar
                su presencia y participación en el centro de estudios: asistir regularmente a
                clases, cumplir con las actividades escolares y mantenerse vinculado con su
                comunidad educativa.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {[
                  {
                    title: 'Asistencia regular',
                    text: 'Acompañar el calendario de clases y mantener un vínculo sostenido con el centro educativo.',
                  },
                  {
                    title: 'Actividades educativas',
                    text: 'Participar en las propuestas, tareas y espacios formativos del curso.',
                  },
                  {
                    title: 'Acompañamiento',
                    text: 'Contar con el respaldo de referentes docentes y familiares ante cualquier dificultad.',
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-[20px] bg-[#F1F1EF] p-5 border border-[#111111]/8"
                  >
                    <h3 className="font-display font-medium text-[17px] text-[#111111]">
                      {item.title}
                    </h3>
                    <p className="mt-2 type-body-sm text-[#454545]">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div
            id="proceso-seleccion"
            className="scroll-mt-24 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start"
          >
            <div className="lg:col-span-5">
              <h2 className="type-h2 text-[#111111]">
                Criterios socioeconómicos y educativos transparentes.
              </h2>
            </div>
            <div className="lg:col-span-7 space-y-4 type-body text-[#454545]">
              <p>
                Una vez cerrado el período de postulación de cada convocatoria, las solicitudes son
                evaluadas en función de los criterios oficiales definidos para el programa,
                ponderando información socioeconómica del hogar e información educativa de las y los
                estudiantes.
              </p>
              <p>
                Quienes ya recibieron una beca en ciclos anteriores pueden volver a postularse,
                recordando que{' '}
                <strong className="text-[#111111] font-semibold">
                  la renovación no es automática
                </strong>
                : es necesario revisar los datos, actualizar la solicitud y enviarla nuevamente
                dentro del plazo vigente.
              </p>
            </div>
          </div>
        </div>
      </StackedSection>

      {/* QUÉ INSTITUCIONES PARTICIPAN — SELECTED SOLID BRAND PANEL */}
      <StackedSection
        backgroundStyle="var(--color-butia-cyan)"
        textClassName="text-white"
        zIndex={34}
        roundedTop
      >
        <div
          id="instituciones-detalle"
          className="scroll-mt-24 butia-container py-20 md:py-28 text-white"
        >
          <div className="max-w-3xl mb-12">
            <h2 className="type-h2 text-white">
              Siete organismos públicos articulados en todo el país.
            </h2>
          </div>

          <div className="rounded-[24px] bg-[#392665] p-6 md:p-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
            {INSTITUTIONAL_PARTNERS_LOGOS.map((partner) => (
              <a
                key={partner.id}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center rounded-[12px] bg-white/[0.08] hover:bg-white/[0.16] border border-white/14 px-4 py-3.5 min-h-[76px] transition-colors"
              >
                <img
                  src={partner.logoSrc}
                  alt={`Logo oficial ${partner.acronym}`}
                  className="h-11 w-auto max-w-full object-contain"
                />
              </a>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-8 pt-6 border-t border-white/25">
            {SEVEN_INSTITUTIONS_DETAIL.map((inst) => (
              <div key={inst.acronym}>
                <span className="font-display font-medium text-[22px] text-white">
                  {inst.acronym}
                </span>
                <h3 className="font-body font-medium text-[14px] text-white/95 mt-1">
                  {inst.fullName}
                </h3>
                <p className="mt-2 type-caption text-white/85">{inst.description}</p>
              </div>
            ))}
          </div>
        </div>
      </StackedSection>

      {/* CÓMO SOLICITARLA & DÓNDE CONSULTAR */}
      <StackedSection backgroundStyle="var(--color-surface)" zIndex={36} roundedTop>
        <div className="butia-container py-20 md:py-28 space-y-16">
          <div
            id="como-solicitarla"
            className="scroll-mt-24 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start border-b border-[#D8D8D8] pb-16"
          >
            <div className="lg:col-span-5">
              <h2 className="type-h2 text-[#111111]">
                Postulación en línea en el portal oficial del MEC.
              </h2>
            </div>
            <div className="lg:col-span-7 space-y-4 type-body text-[#454545]">
              <p>
                La solicitud se realiza gratuitamente a través del portal oficial{' '}
                <strong className="text-[#111111] font-semibold">
                  becas.servicios.mec.gub.uy
                </strong>
                , completando el formulario organizado por secciones con los datos del estudiante,
                su hogar y su centro educativo.
              </p>
              <p>
                Podés guardar avances parciales mediante la opción «Guardar» y retomar tu carga
                antes de confirmar el envío definitivo.
              </p>
              <div className="pt-2 flex flex-wrap gap-3">
                <PrimaryButton
                  label="Guía paso a paso"
                  href="/como-postularte"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/como-postularte');
                  }}
                />
                <SecondaryButton
                  label="Ingresar al portal de becas"
                  href={OFFICIAL_URLS.postulacion}
                  external
                />
              </div>
            </div>
          </div>

          <div
            id="donde-consultar"
            className="scroll-mt-24 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start"
          >
            <div className="lg:col-span-5">
              <h2 className="type-h2 text-[#111111]">
                Canales oficiales de consulta y asistencia.
              </h2>
            </div>
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="rounded-[22px] bg-[#F1F1EF] p-6 border border-[#111111]/8">
                <h3 className="font-display font-medium text-[19px] text-[#111111] mb-2">
                  Portal de consulta de resultados
                </h3>
                <p className="type-body-sm text-[#454545] mb-4">
                  Verificá el estado de tu postulación y la información sobre pagos una vez
                  finalizada la selección.
                </p>
                <a
                  href={OFFICIAL_URLS.consulta}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[14px] font-medium text-[#111111] underline decoration-[#111111]/40 underline-offset-4 hover:decoration-[#009FE3] hover:text-[#009FE3]"
                >
                  <span>consultar.servicios.mec.gub.uy</span>
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </a>
              </div>

              <div className="rounded-[22px] bg-[#F1F1EF] p-6 border border-[#111111]/8">
                <h3 className="font-display font-medium text-[19px] text-[#111111] mb-2">
                  Atención al usuario (MEC)
                </h3>
                <ul className="space-y-2 type-body-sm text-[#454545]">
                  <li className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#111111] shrink-0" aria-hidden="true" />
                    <span>
                      <strong className="text-[#111111] font-semibold">0800 2342</strong> (fijos) ·{' '}
                      <strong className="text-[#111111] font-semibold">*2342</strong> (celulares)
                    </span>
                  </li>
                  <li className="type-caption text-[#454545] pl-6">
                    Horario publicado: {OFFICIAL_URLS.horarioAtencion}
                  </li>
                  <li className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-[#111111] shrink-0" aria-hidden="true" />
                    <a href={OFFICIAL_URLS.email} className="underline hover:text-[#111111]">
                      {OFFICIAL_URLS.emailLabel}
                    </a>
                  </li>
                </ul>
                <a
                  href={OFFICIAL_URLS.formularioContacto}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-4 text-[14px] font-medium text-[#111111] underline decoration-[#111111]/40 underline-offset-4 hover:decoration-[#009FE3] hover:text-[#009FE3]"
                >
                  <span>Formulario de atención en línea</span>
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </StackedSection>

      {/* FOCUSED FAQ */}
      <StackedSection backgroundStyle="var(--color-page)" zIndex={38} roundedTop>
        <FAQAccordion
          id="preguntas-beca"
          heading="Lo esencial sobre la Beca Butiá."
          items={FAQ_ITEMS}
        />
      </StackedSection>

      {/* CLOSING CTA */}
      <CTASection
        heading="¿Listo para conocer el proceso de solicitud?"
        description="Consultá nuestra guía paso a paso basada en la documentación oficial del MEC o ingresá directamente a los portales oficiales."
        primaryLabel="Ver guía de postulación"
        primaryHref="/como-postularte"
        primaryExternal={false}
        onPrimaryClick={(e) => {
          e.preventDefault();
          onNavigate('/como-postularte');
        }}
        secondaryLabel="Consultar mi beca"
        secondaryHref={OFFICIAL_URLS.consulta}
        secondaryExternal
        cardBg="var(--color-butia-yellow)"
      />
    </main>
  );
};
