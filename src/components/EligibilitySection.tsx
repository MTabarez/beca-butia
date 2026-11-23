import React, { useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { ANNUAL_CALL_CONFIG, ELIGIBILITY_PATHWAYS } from '../data/becasContent';
import { FeatureCard, type FeatureCardTheme } from './FeatureCard';
import { IconButton } from './IconButton';
import { PrimaryButton } from './PrimaryButton';
import { computeNearestSnapIndex } from '../animations/parallaxTimeline';
import type { AppRoute } from '../utils/becaHelpers';

export interface EligibilitySectionProps {
  onNavigate: (route: AppRoute, hash?: string) => void;
}

const MODALITY_THEMES: FeatureCardTheme[] = ['yellow', 'neutral', 'cyan', 'magenta', 'navy'];

/**
 * Complete Design Revision — Section 11A + Section 12 + Section 13:
 * 5 Educational Modalities presented in a fluid horizontal carousel:
 * - Shows 3 consistent-dimension cards on desktop with partial peek of the next card.
 * - Remaining 2 categories reached via smooth inertial mouse drag, touch swipe, or arrow controls.
 * - Exact reference card hover (~10% centered image contraction + arrow repositioning).
 */
export const EligibilitySection: React.FC<EligibilitySectionProps> = ({ onNavigate }) => {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const dragStateRef = useRef({
    startX: 0,
    startScrollLeft: 0,
    lastX: 0,
    lastTime: 0,
    velocityPxPerSec: 0,
    moved: false,
  });

  const getCardStep = (): number => {
    const track = trackRef.current;
    if (!track || track.children.length === 0) return 400;
    const first = track.children[0] as HTMLElement;
    return first.offsetWidth + 24;
  };

  const scrollToSlide = (targetIndex: number) => {
    const bounded = Math.max(0, Math.min(ELIGIBILITY_PATHWAYS.length - 1, targetIndex));
    setActiveIndex(bounded);
    const track = trackRef.current;
    if (!track) return;
    const cardEl = track.children[bounded] as HTMLElement | undefined;
    if (cardEl) {
      track.scrollTo({
        left: cardEl.offsetLeft - track.offsetLeft,
        behavior: 'smooth',
      });
    }
  };

  const handleScrollSync = () => {
    const track = trackRef.current;
    if (!track || isDragging) return;
    const step = getCardStep();
    if (step <= 0) return;
    const idx = Math.max(
      0,
      Math.min(ELIGIBILITY_PATHWAYS.length - 1, Math.round(track.scrollLeft / step))
    );
    setActiveIndex(idx);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.closest('a, button')) return;
    const track = trackRef.current;
    if (!track) return;

    track.setPointerCapture(e.pointerId);
    setIsDragging(true);
    dragStateRef.current = {
      startX: e.clientX,
      startScrollLeft: track.scrollLeft,
      lastX: e.clientX,
      lastTime: performance.now(),
      velocityPxPerSec: 0,
      moved: false,
    };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || !trackRef.current) return;
    const now = performance.now();
    const dt = Math.max(1, now - dragStateRef.current.lastTime);
    const dxStep = e.clientX - dragStateRef.current.lastX;
    dragStateRef.current.velocityPxPerSec = (-dxStep / dt) * 1000;
    dragStateRef.current.lastX = e.clientX;
    dragStateRef.current.lastTime = now;

    const totalDelta = e.clientX - dragStateRef.current.startX;
    if (Math.abs(totalDelta) > 4) {
      dragStateRef.current.moved = true;
    }
    trackRef.current.scrollLeft = dragStateRef.current.startScrollLeft - totalDelta;
  };

  const finishDrag = () => {
    if (!isDragging || !trackRef.current) return;
    setIsDragging(false);
    const step = getCardStep();
    const target = computeNearestSnapIndex(
      trackRef.current.scrollLeft,
      dragStateRef.current.velocityPxPerSec,
      step,
      ELIGIBILITY_PATHWAYS.length
    );
    scrollToSlide(target);
  };

  return (
    <div id="modalidades" className="scroll-mt-24 py-20 md:py-28 lg:py-[128px] overflow-hidden">
      <div className="butia-container">
        {/* Centered Oversized Editorial Heading (like Reference "Pathways") + Fluid Controls */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="type-display-lg text-[#111111]">Modalidades educativas</h2>
          <p className="mt-5 type-body-lg text-[#454545] max-w-2xl mx-auto">
            Estudiantes de todo el país que cursen educación media pública en cualquiera de las
            cinco modalidades habilitadas pueden postularse según la convocatoria vigente.
          </p>
        </div>

        {/* Controls Bar */}
        <div className="flex items-center justify-end gap-4 mb-6">
          <div className="flex items-center gap-2.5">
            <IconButton
              ariaLabel="Modalidad anterior"
              onClick={() => scrollToSlide(activeIndex - 1)}
              disabled={activeIndex === 0}
            >
              <ArrowLeft className="w-5 h-5" aria-hidden="true" />
            </IconButton>
            <IconButton
              ariaLabel="Siguiente modalidad"
              onClick={() => scrollToSlide(activeIndex + 1)}
              disabled={activeIndex >= ELIGIBILITY_PATHWAYS.length - 1}
            >
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </IconButton>
          </div>
        </div>
      </div>

      {/* Full-bleed Fluid Carousel Track: 3 full cards + partial peek on desktop */}
      <div className="max-w-[1440px] mx-auto px-5 md:px-7 lg:px-[42px]">
        <div
          ref={trackRef}
          onScroll={handleScrollSync}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={finishDrag}
          onPointerCancel={finishDrag}
          data-testid="modalities-carousel-track"
          className={`flex items-start lg:items-stretch gap-6 overflow-x-auto no-scrollbar pb-4 pt-2 select-none ${
            isDragging ? 'cursor-grabbing snap-none' : 'cursor-grab snap-x snap-mandatory'
          }`}
        >
          {ELIGIBILITY_PATHWAYS.map((pathway, index) => (
            <div
              key={pathway.id}
              className="snap-start shrink-0 w-[84vw] sm:w-[390px] lg:w-[calc((100%-56px)/3.18)] min-w-[300px]"
            >
              <FeatureCard
                heading={pathway.title}
                description={pathway.description}
                imageSrc={pathway.imageSrc}
                imageAlt={pathway.imageAlt}
                ctaLabel="Explorar"
                ctaHref="/requisitos"
                onCtaClick={(e) => {
                  e.preventDefault();
                  onNavigate('/requisitos');
                }}
                theme={MODALITY_THEMES[index % MODALITY_THEMES.length]}
                className="h-auto lg:h-full lg:min-h-[530px]"
              />
            </div>
          ))}
        </div>

        {/* Footer Info & Requirements Link */}
        <div className="mt-10 pt-7 border-t border-[#D8D8D8] flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <p className="type-body-sm text-[#454545] max-w-3xl">
            <strong className="text-[#111111]">
              Franja etaria ({ANNUAL_CALL_CONFIG.cycleTitle}):
            </strong>{' '}
            {ANNUAL_CALL_CONFIG.eligibilityAgeNote}
          </p>
          <PrimaryButton
            label="Ver requisitos completos"
            href="/requisitos"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/requisitos');
            }}
            tone="dark"
          />
        </div>
      </div>
    </div>
  );
};
