import React from 'react';
import { INSTITUTIONAL_PARTNERS_LOGOS } from '../data/becasContent';

export const InstitutionalPartners: React.FC = () => {
  return (
    <div className="border-b border-white/15 pb-12 mb-14">
      <div className="mb-8">
        <p className="type-eyebrow text-[#FBBA06] mb-2">
          Política pública interinstitucional
        </p>
        <p className="type-body-sm text-white/84 max-w-2xl">
          Iniciativa promovida conjuntamente por{' '}
          <strong className="text-white font-semibold">
            ANEP, MEC, BROU, BPS, Ceibal, INJU y MIDES
          </strong>
          .
        </p>
      </div>

      {/* Authentic DIAPO White SVGs extracted directly from becas.edu.uy */}
      <div
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 items-center"
        aria-label="Organismos públicos que integran Becas Butiá"
      >
        {INSTITUTIONAL_PARTNERS_LOGOS.map((partner) => (
          <a
            key={partner.id}
            href={partner.url}
            target="_blank"
            rel="noopener noreferrer"
            title={partner.name}
            aria-label={`${partner.name} (${partner.acronym})`}
            className="group flex items-center justify-center rounded-[12px] bg-white/[0.08] hover:bg-[#009FE3]/30 border border-white/14 px-4 py-3.5 transition-colors duration-200 min-h-[76px]"
          >
            <img
              src={partner.logoSrc}
              alt={`Logo oficial ${partner.acronym} — ${partner.name}`}
              className="h-11 md:h-12 w-auto max-w-full object-contain opacity-92 group-hover:opacity-100 transition-opacity"
            />
          </a>
        ))}
      </div>
    </div>
  );
};
