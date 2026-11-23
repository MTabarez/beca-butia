import React, { useState } from 'react';
import { ANNUAL_CALL_CONFIG, SCHOLARSHIP_AMOUNTS_CONFIG } from '../data/becasContent';
import { calculateMonthlyInstallment, formatUyuCurrency } from '../utils/becaHelpers';

export interface ScholarshipAmountsProps {
  id?: string;
}

/**
 * Complete Design Revision — Section 11C:
 * Editorial comparative layout for scholarship amounts on neutral background.
 * ZERO colorful product cards, ZERO top colored strips, subtle hairline separators,
 * large tabular Space Grotesk amounts, and explicit 2026 historical vs 2027 notice.
 */
export const ScholarshipAmounts: React.FC<ScholarshipAmountsProps> = ({ id = 'montos' }) => {
  const [viewMode, setViewMode] = useState<'anual' | 'mensual'>('anual');

  return (
    <div id={id} className="scroll-mt-24 butia-container py-20 md:py-28 lg:py-[128px]">
      {/* Asymmetric Editorial Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-14 md:mb-16">
        <div className="lg:col-span-7">
          <h2 className="type-h1 text-[#111111]">
            Montos de referencia según el nivel educativo.
          </h2>
        </div>

        <div className="lg:col-span-5 flex flex-col items-start lg:items-end gap-5">
          <p className="type-body text-[#454545] lg:text-right max-w-md">
            En el ciclo {SCHOLARSHIP_AMOUNTS_CONFIG.referenceYear}, el apoyo se distribuyó en{' '}
            <strong className="font-semibold text-[#111111]">
              {SCHOLARSHIP_AMOUNTS_CONFIG.installmentsCount} pagos mensuales (
              {SCHOLARSHIP_AMOUNTS_CONFIG.installmentsPeriod})
            </strong>
            .
          </p>

          <div
            role="group"
            data-testid="amounts-period-toggle"
            aria-label="Visualizar montos de referencia por período"
            className="w-full sm:w-auto max-w-full grid grid-cols-2 sm:inline-flex items-center p-1 rounded-full bg-white border border-[#D8D8D8]"
          >
            <button
              type="button"
              onClick={() => setViewMode('anual')}
              aria-pressed={viewMode === 'anual'}
              className={`px-2.5 sm:px-4 py-2 rounded-full text-[12px] sm:text-[13.5px] font-semibold leading-tight text-center transition-colors cursor-pointer ${
                viewMode === 'anual'
                  ? 'bg-[#111111] text-white'
                  : 'text-[#454545] hover:text-[#111111]'
              }`}
            >
              Referencia anual (2026)
            </button>
            <button
              type="button"
              onClick={() => setViewMode('mensual')}
              aria-pressed={viewMode === 'mensual'}
              className={`px-2.5 sm:px-4 py-2 rounded-full text-[12px] sm:text-[13.5px] font-semibold leading-tight text-center transition-colors cursor-pointer ${
                viewMode === 'mensual'
                  ? 'bg-[#111111] text-white'
                  : 'text-[#454545] hover:text-[#111111]'
              }`}
            >
              Pago mensual aprox.
            </button>
          </div>
        </div>
      </div>

      {/* Restrained Editorial Comparative List (Hairline-Divided Rows, Zero Product Cards) */}
      <div
        data-testid="scholarship-amounts-list"
        className="border-t border-[#111111]/15 divide-y divide-[#111111]/12"
      >
        {SCHOLARSHIP_AMOUNTS_CONFIG.tiers.map((tier) => {
          const displayedAmount =
            viewMode === 'anual'
              ? formatUyuCurrency(tier.annualAmount2026)
              : formatUyuCurrency(
                  calculateMonthlyInstallment(
                    tier.annualAmount2026,
                    SCHOLARSHIP_AMOUNTS_CONFIG.installmentsCount
                  )
                );

          return (
            <div
              key={tier.id}
              className="py-7 md:py-9 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-baseline"
            >
              <div className="md:col-span-5">
                <h3 className="type-h3 text-[#111111]">{tier.level}</h3>
                <p className="mt-1 type-body-sm text-[#454545]">{tier.gradeLabel}</p>
              </div>

              <div className="md:col-span-4">
                <p
                  data-testid={`amount-value-${tier.id}`}
                  className="font-display font-medium tabular-nums text-[clamp(38px,4vw,58px)] leading-none tracking-[-0.04em] text-[#111111]"
                >
                  {displayedAmount}
                </p>
                <p className="mt-2 type-caption text-[#454545]">
                  {viewMode === 'anual'
                    ? `pesos uruguayos anuales · referencia histórica ${SCHOLARSHIP_AMOUNTS_CONFIG.referenceYear}`
                    : `pesos uruguayos por cuota aprox. · ${SCHOLARSHIP_AMOUNTS_CONFIG.installmentsCount} pagos (${SCHOLARSHIP_AMOUNTS_CONFIG.installmentsPeriod})`}
                </p>
              </div>

              <div className="md:col-span-3 md:text-right">
                <p className="type-body-sm text-[#454545]">{tier.note}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Clean Historical vs Current Distinction Note */}
      <div className="mt-10 pt-6 border-t border-[#111111]/12 flex flex-col lg:flex-row lg:items-baseline justify-between gap-4">
        <p className="type-body-sm text-[#454545] max-w-3xl">
          <strong className="font-semibold text-[#111111]">
            Actualización para la {ANNUAL_CALL_CONFIG.cycleTitle}:
          </strong>{' '}
          {ANNUAL_CALL_CONFIG.amountsUpdateNotice}
        </p>
        <span className="type-caption text-[#454545] whitespace-nowrap shrink-0">
          Referencia histórica {SCHOLARSHIP_AMOUNTS_CONFIG.referenceYear} · MEC / ANEP
        </span>
      </div>
    </div>
  );
};
