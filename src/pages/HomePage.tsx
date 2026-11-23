import React from 'react';
import { UnifiedHeroCollage } from '../components/UnifiedHeroCollage';
import { StackedSection } from '../components/StackedSection';
import { EligibilitySection } from '../components/EligibilitySection';
import { StatisticsSection } from '../components/StatisticsSection';
import { EducationalAgreementSection } from '../components/EducationalAgreementSection';
import { ProgramSupportGrid } from '../components/ProgramSupportGrid';
import { ScholarshipAmounts } from '../components/ScholarshipAmounts';
import { ApplicationSteps } from '../components/ApplicationSteps';
import { InstitutionalNetworkSection } from '../components/InstitutionalNetworkSection';
import { FAQAccordion } from '../components/FAQAccordion';
import { CTASection } from '../components/CTASection';
import { OFFICIAL_URLS } from '../data/becasContent';
import type { AppRoute } from '../utils/becaHelpers';

export interface HomePageProps {
  onNavigate: (route: AppRoute, hash?: string) => void;
}

/**
 * Complete Design Revision — Restrained Editorial Visual Rhythm:
 * Neutral off-white/gray dominant surfaces (#F1F1EF / #FFFFFF) punctuated by
 * selective solid Butiá brand panels (Cyan #009FE3 for Acuerdo Educativo,
 * Yellow #FBBA06 for final CTA, Navy #392665 for Footer) with overlapping
 * rounded top corners and subtle depth shadows.
 */
export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <main id="contenido-principal" className="bg-[var(--color-page)] text-[#111111]">
      {/* CONTINUOUS HERO -> CONTRACTING VIDEO -> COLLAGE -> STATEMENT (NEUTRAL #E4E4E0) */}
      <UnifiedHeroCollage onNavigate={onNavigate} />

      {/* 5 EDUCATIONAL MODALITIES — FLUID HORIZONTAL CAROUSEL (3 VISIBLE + PEEK ON DESKTOP) */}
      <StackedSection
        backgroundStyle="var(--color-surface)"
        zIndex={20}
        roundedTop
        className="!mt-0"
      >
        <EligibilitySection onNavigate={onNavigate} />
      </StackedSection>

      {/* NATIONAL IMPACT — NEUTRAL EDITORIAL WITH STICKY UNDERLAY SO NEXT PANEL RISES OVER IT */}
      <StackedSection
        backgroundStyle="var(--color-page)"
        zIndex={24}
        roundedTop
        stickyUnderlay
      >
        <StatisticsSection />
      </StackedSection>

      {/* EDUCATIONAL AGREEMENT — SELECTED STRONG SOLID BUTIÁ CYAN PANEL (#009FE3) */}
      <StackedSection
        backgroundStyle="var(--color-butia-cyan)"
        textClassName="text-white"
        zIndex={28}
        roundedTop
      >
        <EducationalAgreementSection onNavigate={onNavigate} onSolidBrand />
      </StackedSection>

      {/* 4 WAYS THE PROGRAM SUPPORTS STUDENTS — BALANCED 2x2 EDITORIAL GRID */}
      <StackedSection
        backgroundStyle="var(--color-surface)"
        zIndex={30}
        roundedTop
      >
        <ProgramSupportGrid onNavigate={onNavigate} />
      </StackedSection>

      {/* SCHOLARSHIP AMOUNTS — CLEAN HAIRLINE EDITORIAL COMPARISON ON NEUTRAL #F1F1EF */}
      <StackedSection
        backgroundStyle="var(--color-page)"
        zIndex={32}
        roundedTop
      >
        <ScholarshipAmounts />
      </StackedSection>

      {/* HOW TO APPLY — ASYMMETRIC STEPS + PHOTOGRAPH ON WHITE */}
      <StackedSection
        backgroundStyle="var(--color-surface)"
        zIndex={34}
        roundedTop
      >
        <ApplicationSteps onNavigate={onNavigate} />
      </StackedSection>

      {/* INSTITUTIONAL NETWORK — AUTHENTIC LOGOS & OPEN HAIRLINE DIRECTORY ON NEUTRAL #F1F1EF */}
      <StackedSection
        backgroundStyle="var(--color-page)"
        zIndex={36}
        roundedTop
      >
        <InstitutionalNetworkSection />
      </StackedSection>

      {/* FAQ ACCORDION — CLEAN TWO-COLUMN EDITORIAL ON WHITE */}
      <StackedSection
        backgroundStyle="var(--color-surface)"
        zIndex={38}
        roundedTop
      >
        <FAQAccordion />
      </StackedSection>

      {/* CLOSING CTA — SOLID BUTIÁ YELLOW PANEL (#FBBA06) */}
      <CTASection
        heading="Tu camino educativo importa."
        description="Conocé las Becas Butiá y descubrí cómo acceder a este apoyo para acompañar tu trayectoria en la educación media pública."
        primaryLabel="Conocé cómo postularte"
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
