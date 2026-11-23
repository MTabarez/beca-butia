import React from 'react';
import { HISTORICAL_STATS } from '../data/becasContent';
import { imageAssets } from '../config/imageAssets';
import { ImageReveal } from './ImageReveal';

/**
 * Neutral Editorial Impact Band:
 * Wide documentary photograph centered in generous negative space,
 * followed by a restrained 3-column hairline-divided figures strip.
 * Near-black #111111 typography, zero decorative eyebrows or colored bullets.
 */
export const StatisticsSection: React.FC = () => {
  return (
    <div id="impacto" className="scroll-mt-24 butia-container py-20 md:py-28 lg:py-[128px]">
      {/* Wide Centered Institutional Photograph */}
      <div className="max-w-5xl mx-auto mb-20 md:mb-28">
        <ImageReveal
          src={imageAssets.impactWide}
          alt="Comunidad estudiantil y autoridades en la presentación oficial de las 70.000 Becas Butiá — ANEP"
          aspectClass="aspect-[16/9]"
          parallaxStrength={24}
        />
      </div>

      {/* Centered Editorial Heading */}
      <div className="max-w-3xl mx-auto text-center mb-14 md:mb-20">
        <h2 className="type-h1 text-[#111111]">Más estudiantes, más oportunidades.</h2>
        <p className="mt-5 type-body-lg text-[#454545] max-w-2xl mx-auto">
          Resultados verificados del ciclo 2026, meta quinquenal proyectada para 2029 y la red de
          organismos públicos que sostiene la política.
        </p>
      </div>

      {/* Clean Hairline-Divided 3-Column Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 border-t border-[#111111]/14">
        {HISTORICAL_STATS.map((metric, idx) => (
          <div
            key={metric.id}
            className={`py-8 md:py-10 flex flex-col justify-between ${
              idx > 0 ? 'md:border-l md:border-[#111111]/12 md:pl-8 lg:pl-10' : ''
            } ${
              idx < HISTORICAL_STATS.length - 1
                ? 'border-b md:border-b-0 border-[#111111]/12 md:pr-6'
                : 'md:pr-4'
            }`}
          >
            <div>
              <p className="type-caption text-[#454545] mb-3">
                {metric.classification} · {metric.yearTag}
              </p>
              <p
                className="font-display font-medium tabular-nums text-[clamp(42px,4.4vw,66px)] leading-none tracking-[-0.045em] text-[#111111]"
                aria-label={`${metric.value}: ${metric.label}`}
              >
                {metric.value}
              </p>
              <h3 className="font-body font-semibold text-[17px] text-[#111111] mt-4 leading-snug">
                {metric.label}
              </h3>
            </div>
            <p className="mt-3 type-body-sm text-[#454545]">{metric.caption}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
