import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { INSTITUTIONAL_PARTNERS_LOGOS, SEVEN_INSTITUTIONS_DETAIL } from '../data/becasContent';

/**
 * Institutional Network Band:
 * Clean centered heading, authentic official institutional logos on high-contrast Navy ribbon,
 * and open hairline-divided directory for all 7 participating public organisms.
 */
export const InstitutionalNetworkSection: React.FC = () => {
  return (
    <div
      id="red-institucional"
      className="scroll-mt-24 butia-container py-20 md:py-28 lg:py-[128px]"
    >
      <div className="max-w-3xl mx-auto text-center mb-14 md:mb-16">
        <h2 className="type-h1 text-[#111111]">
          Siete instituciones públicas trabajando por más oportunidades.
        </h2>
        <p className="mt-5 type-body-lg text-[#454545] max-w-2xl mx-auto">
          Las Becas Butiá integran el esfuerzo de organismos del Estado uruguayo para articular el
          respaldo económico, la información social y el acompañamiento educativo en todo el país.
        </p>
      </div>

      {/* Authentic Institutional DIAPO Logos Strip on high-contrast Navy container */}
      <div
        className="rounded-[24px] bg-[#392665] px-6 py-8 md:px-10 md:py-10 mb-14"
        aria-label="Logotipos oficiales de las instituciones participantes"
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 items-center">
          {INSTITUTIONAL_PARTNERS_LOGOS.map((partner) => (
            <a
              key={partner.id}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              title={partner.name}
              aria-label={`${partner.name} (${partner.acronym})`}
              className="group flex items-center justify-center py-2 opacity-90 hover:opacity-100 transition-opacity"
            >
              <img
                src={partner.logoSrc}
                alt={`Logo oficial ${partner.acronym} — ${partner.name}`}
                className="h-11 md:h-12 w-auto max-w-full object-contain"
              />
            </a>
          ))}
        </div>
      </div>

      {/* Clean Open Hairline Directory (Zero Generic Card Boxes) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-[#111111]/12">
        {SEVEN_INSTITUTIONS_DETAIL.map((inst) => (
          <a
            key={inst.acronym}
            href={inst.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group py-7 md:pr-8 border-b border-[#111111]/12 flex flex-col justify-between transition-colors"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <span className="font-display font-medium text-[20px] text-[#111111] group-hover:text-[#009FE3] transition-colors">
                  {inst.acronym}
                </span>
                <ArrowUpRight
                  className="w-4 h-4 text-[#454545] group-hover:text-[#111111] transition-colors"
                  aria-hidden="true"
                />
              </div>
              <h3 className="font-body font-semibold text-[15px] text-[#111111] leading-snug">
                {inst.fullName}
              </h3>
              <p className="mt-2 type-body-sm text-[#454545]">{inst.description}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};
