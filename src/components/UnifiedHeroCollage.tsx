import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { PrimaryButton } from './PrimaryButton';
import { SecondaryButton } from './SecondaryButton';
import { EditorialStatement } from './EditorialStatement';
import { IMAGE_CREDIT_REFERENCE, imageAssets, videoAssets } from '../config/imageAssets';
import { computePinnedProgress } from '../animations/scrollProgress';
import { computeUnifiedHeroCollage } from '../animations/parallaxTimeline';
import type { AppRoute } from '../utils/becaHelpers';

export interface UnifiedHeroCollageProps {
  onNavigate: (route: AppRoute, hash?: string) => void;
}

/**
 * Complete Design Revision — Sections 6, 7 & 9:
 * ONE CONTINUOUS VISUAL TRANSFORMATION (ZERO COMPONENT RESET):
 * - Stage A (p = 0.00): Full-screen 100vw x 100svh hero media, headline, nav overlay, scroll cue.
 * - Stage B (p = 0.00 -> 0.34): The EXACT SAME <video> progressively contracts deeply from
 *   100vw x 100svh into the central editorial video (~42vw x 46svh, 24px radius) on #F1F1EF.
 * - Stage C (p = 0.22 -> 0.56): Floating portrait photographs join around the contracted hero video
 *   while oversized institutional typography ("Conocé el programa") integrates behind.
 * - Stage D (p = 0.42 -> 0.84): True independent parallax — central video exits fastest upward,
 *   portraits travel at distinct speeds and clear before typography, phrase stays exposed then exits.
 * - Stage E (p = 0.72 -> 0.96): Large centered Editorial Statement rises smoothly from below.
 */
export const UnifiedHeroCollage: React.FC<UnifiedHeroCollageProps> = ({ onNavigate }) => {
  const wrapperRef = useRef<HTMLElement | null>(null);
  const mediaBoxRef = useRef<HTMLDivElement | null>(null);
  const scrimRef = useRef<HTMLDivElement | null>(null);
  const heroHeadingRef = useRef<HTMLDivElement | null>(null);
  const videoCtaRef = useRef<HTMLAnchorElement | null>(null);

  const phraseRef = useRef<HTMLDivElement | null>(null);
  const upperLeftPhotoRef = useRef<HTMLDivElement | null>(null);
  const upperRightPhotoRef = useRef<HTMLDivElement | null>(null);
  const lowerLeftPhotoRef = useRef<HTMLDivElement | null>(null);
  const statementLayerRef = useRef<HTMLDivElement | null>(null);

  const [reducedMotion, setReducedMotion] = useState(false);
  const refAlt = `${IMAGE_CREDIT_REFERENCE.title} — ${IMAGE_CREDIT_REFERENCE.institution}`;

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    let rafId = 0;

    const applyScrollFrame = () => {
      const wrapper = wrapperRef.current;
      const mediaBox = mediaBoxRef.current;
      if (!wrapper || !mediaBox) return;

      const rect = wrapper.getBoundingClientRect();
      const vh = window.innerHeight || 900;
      const vw = window.innerWidth || 1440;
      const isMobile = vw < 768;
      const isTablet = vw >= 768 && vw < 1024;

      const progress = computePinnedProgress(rect.top, rect.height, vh);
      const s = computeUnifiedHeroCollage(progress);

      wrapper.dataset.heroProgress = progress.toFixed(3);

      // Responsive final contracted width so central video stays proportionate on every viewport
      const targetWidth = isMobile ? 80 : isTablet ? 56 : 42;
      const targetHeight = isMobile ? 34 : isTablet ? 40 : 46;
      const targetTop = isMobile ? 33 : isTablet ? 30 : 27;

      const normalizedShrink = (100 - s.videoWidthPercent) / (100 - 42);
      const widthPct = 100 - (100 - targetWidth) * normalizedShrink;
      const heightVh = 100 - (100 - targetHeight) * normalizedShrink;
      const topVh = targetTop * normalizedShrink;

      mediaBox.style.width = `${widthPct.toFixed(2)}%`;
      mediaBox.style.height = `${heightVh.toFixed(2)}svh`;
      mediaBox.style.top = `${topVh.toFixed(2)}svh`;
      mediaBox.style.borderRadius = `${s.videoRadiusPx.toFixed(1)}px`;
      mediaBox.style.transform = `translate3d(-50%, ${s.videoTranslateYVh.toFixed(2)}vh, 0)`;
      mediaBox.style.boxShadow =
        s.videoShadowOpacity > 0.02
          ? `0 24px 60px rgba(0, 0, 0, ${(s.videoShadowOpacity * 0.16).toFixed(3)})`
          : 'none';

      if (scrimRef.current) {
        scrimRef.current.style.opacity = s.heroOverlayOpacity.toFixed(3);
      }

      if (heroHeadingRef.current) {
        heroHeadingRef.current.style.opacity = s.heroHeadingOpacity.toFixed(3);
        heroHeadingRef.current.style.transform = `translate3d(0, ${s.heroHeadingTranslateYPx.toFixed(1)}px, 0)`;
        heroHeadingRef.current.style.pointerEvents = s.heroHeadingOpacity > 0.35 ? 'auto' : 'none';
      }

      if (videoCtaRef.current) {
        videoCtaRef.current.style.opacity = s.videoCtaOpacity.toFixed(3);
        videoCtaRef.current.style.pointerEvents = s.videoCtaOpacity > 0.45 ? 'auto' : 'none';
      }

      if (phraseRef.current) {
        phraseRef.current.style.opacity = s.phraseOpacity.toFixed(3);
        phraseRef.current.style.transform = `translate3d(0, ${s.phraseYVh.toFixed(2)}vh, 0)`;
      }

      if (upperLeftPhotoRef.current) {
        upperLeftPhotoRef.current.style.opacity = s.upperLeftPhotoOpacity.toFixed(3);
        upperLeftPhotoRef.current.style.transform = `translate3d(0, ${s.upperLeftPhotoYVh.toFixed(2)}vh, 0)`;
      }

      if (upperRightPhotoRef.current) {
        upperRightPhotoRef.current.style.opacity = s.upperRightPhotoOpacity.toFixed(3);
        upperRightPhotoRef.current.style.transform = `translate3d(0, ${s.upperRightPhotoYVh.toFixed(2)}vh, 0)`;
      }

      if (lowerLeftPhotoRef.current) {
        lowerLeftPhotoRef.current.style.opacity = s.lowerLeftPhotoOpacity.toFixed(3);
        lowerLeftPhotoRef.current.style.transform = `translate3d(0, ${s.lowerLeftPhotoYVh.toFixed(2)}vh, 0)`;
      }

      if (statementLayerRef.current) {
        statementLayerRef.current.style.opacity = s.statementOpacity.toFixed(3);
        statementLayerRef.current.style.transform = `translate3d(0, ${s.statementYVh.toFixed(2)}vh, 0)`;
        statementLayerRef.current.style.pointerEvents = s.statementOpacity > 0.45 ? 'auto' : 'none';
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(applyScrollFrame);
    };

    applyScrollFrame();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [reducedMotion]);

  if (reducedMotion) {
    return (
      <section
        aria-label="Presentación Becas Butiá"
        className="relative z-10 bg-[var(--color-page)]"
      >
        <div className="relative min-h-[92svh] w-full overflow-hidden flex flex-col justify-end bg-[#111111]">
          <img
            src={imageAssets.hero}
            alt={refAlt}
            className="absolute inset-0 w-full h-full object-cover object-[50%_22%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/20" />
          <div className="relative z-10 butia-container pt-28 pb-12">
            <h1 className="type-display-xl text-white max-w-[14ch]">
              Tu futuro tiene oportunidades.
            </h1>
            <p className="mt-6 type-body-lg text-white/90 max-w-xl">
              Acompañamos a estudiantes de educación media pública de todo Uruguay con apoyo
              económico y cercanía educativa para sostener sus trayectorias.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <PrimaryButton
                label="Conocé la beca"
                href="/conoce-la-beca"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/conoce-la-beca');
                }}
                tone="light"
              />
              <SecondaryButton
                label="Cómo postularte"
                href="/como-postularte"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/como-postularte');
                }}
                onDark
              />
            </div>
          </div>
        </div>
        <div className="py-24">
          <EditorialStatement onNavigate={onNavigate} />
        </div>
      </section>
    );
  }

  return (
    <section
      ref={wrapperRef}
      aria-label="Presentación Becas Butiá y composición editorial"
      data-testid="unified-hero-collage"
      data-hero-progress="0.000"
      className="relative z-10 w-full bg-[var(--color-page)] h-[360vh] md:h-[460vh] md:pb-24"
    >
      {/* SINGLE STICKY VIEWPORT STAGE — ZERO RESET BETWEEN HERO, COLLAGE & STATEMENT */}
      <div className="sticky top-0 h-[100svh] w-full bg-[var(--color-page)] overflow-hidden">
        {/* LAYER Z-1: Integrated Meaningful Institutional Phrase (replaces decorative "FUTURO") */}
        <div
          ref={phraseRef}
          data-testid="collage-editorial-phrase"
          style={{ opacity: 0, transform: 'translate3d(0, 8vh, 0)' }}
          className="absolute inset-0 z-[1] flex items-center justify-center pointer-events-none select-none px-6 text-center will-change-[transform,opacity]"
        >
          <p className="font-display font-normal text-[#111111] text-[clamp(48px,8.4vw,122px)] leading-[0.94] tracking-[-0.045em] max-w-[14ch]">
            Becas Butiá
          </p>
        </div>

        {/* LAYER Z-2: Floating Portrait A — Upper Left (3:4) */}
        <div
          ref={upperLeftPhotoRef}
          data-testid="collage-photo-ul"
          style={{ opacity: 0, transform: 'translate3d(0, 42vh, 0)' }}
          className="absolute z-[2] top-[10vh] left-[4vw] md:left-[6vw] lg:left-[7vw] w-[104px] md:w-[146px] lg:w-[172px] aspect-[3/4] rounded-[20px] overflow-hidden bg-[#D8D8D8] will-change-[transform,opacity]"
        >
          <img
            src={imageAssets.programPrimary}
            alt="Estudiantes caminando por centro educativo público — ANEP"
            className="w-full h-full object-cover object-[50%_22%]"
          />
        </div>

        {/* LAYER Z-2: Floating Portrait B — Upper Right (3:4, tablet & desktop) */}
        <div
          ref={upperRightPhotoRef}
          data-testid="collage-photo-ur"
          style={{ opacity: 0, transform: 'translate3d(0, 52vh, 0)' }}
          className="hidden sm:block absolute z-[2] top-[15vh] right-[4vw] md:right-[6vw] lg:right-[7.5vw] w-[122px] md:w-[152px] lg:w-[176px] aspect-[3/4] rounded-[20px] overflow-hidden bg-[#D8D8D8] will-change-[transform,opacity]"
        >
          <img
            src={imageAssets.heroFloatingInset}
            alt="Estudiante participando en encuentro oficial de Becas Butiá — DGES"
            className="w-full h-full object-cover object-[50%_20%]"
          />
        </div>

        {/* LAYER Z-2: Floating Portrait C — Lower Left (3:4) */}
        <div
          ref={lowerLeftPhotoRef}
          data-testid="collage-photo-ll"
          style={{ opacity: 0, transform: 'translate3d(0, 48vh, 0)' }}
          className="absolute z-[2] top-[62vh] left-[3.5vw] md:left-[5.5vw] lg:left-[6.5vw] w-[100px] md:w-[136px] lg:w-[158px] aspect-[3/4] rounded-[20px] overflow-hidden bg-[#D8D8D8] will-change-[transform,opacity]"
        >
          <img
            src={imageAssets.programInset}
            alt="Estudiantes con cuadernolas oficiales de Becas Butiá — DGES"
            className="w-full h-full object-cover object-[50%_24%]"
          />
        </div>

        {/* LAYER Z-3: THE SAME SINGLE HERO VIDEO ELEMENT
            Contracts smoothly from 100vw x 100svh -> 42vw x 46svh central collage video -> exits upward */}
        <div
          ref={mediaBoxRef}
          data-testid="hero-video-frame"
          style={{
            width: '100%',
            height: '100svh',
            top: '0svh',
            left: '50%',
            borderRadius: '0px',
            transform: 'translate3d(-50%, 0vh, 0)',
          }}
          className="absolute z-[3] overflow-hidden bg-[#1A1A1A] flex flex-col justify-end will-change-[width,height,top,border-radius,transform]"
        >
          {/* Base reference frame beneath HTML5 <video> poster for instant first paint */}
          <img
            src={imageAssets.hero}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 z-0 w-full h-full object-cover object-[50%_22%]"
          />

          {/* Continuous real HTML5 <video> element */}
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={videoAssets.heroPoster}
            aria-label={refAlt}
            className="absolute inset-0 z-[1] w-full h-full object-cover object-[50%_22%]"
          >
            {videoAssets.heroVideoSrc && (
              <source src={videoAssets.heroVideoSrc} type="video/mp4" />
            )}
          </video>

          {/* Controlled gradient scrim (top edge for transparent nav + bottom edge for headline) */}
          <div
            ref={scrimRef}
            aria-hidden="true"
            style={{ opacity: 0.62 }}
            className="absolute inset-0 z-[2] bg-gradient-to-t from-black/92 via-black/38 to-black/58 pointer-events-none"
          />

          {/* Stage A Headline & Actions (anchored inside full-screen hero, gracefully clears on shrink) */}
          <div
            ref={heroHeadingRef}
            className="relative z-10 w-full max-w-[1440px] mx-auto px-5 md:px-7 lg:px-[42px] pt-28 pb-10 md:pb-14 will-change-[transform,opacity]"
          >
            <h1 className="type-display-xl text-white max-w-[13ch] sm:max-w-[14ch]">
              Tu futuro tiene oportunidades.
            </h1>

            <div className="mt-6 md:mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
              <p className="lg:col-span-6 type-body-lg text-white/90 max-w-xl">
                Acompañamos a estudiantes de educación media pública de todo Uruguay con apoyo
                económico y cercanía educativa para sostener sus trayectorias.
              </p>

              <div className="lg:col-span-6 flex flex-wrap items-center gap-3.5 lg:justify-end">
                <PrimaryButton
                  label="Conocé la beca"
                  href="/conoce-la-beca"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/conoce-la-beca');
                  }}
                  tone="light"
                />
                <SecondaryButton
                  label="Cómo postularte"
                  href="/como-postularte"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/como-postularte');
                  }}
                  onDark
                />
              </div>
            </div>
          </div>

          {/* Stage C Action Pill (appears once hero has contracted into central editorial video) */}
          <a
            ref={videoCtaRef}
            href="/conoce-la-beca"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/conoce-la-beca');
            }}
            style={{ opacity: 0, pointerEvents: 'none' }}
            className="absolute z-[12] bottom-4 right-4 inline-flex items-center gap-2 h-[40px] px-4 rounded-full bg-white text-[#111111] hover:bg-[#111111] hover:text-white text-[13.5px] font-semibold transition-colors duration-300 shadow-sm"
          >
            <span>Conocé la beca</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </a>
        </div>

        {/* LAYER Z-5: Stage E Centered Editorial Statement (enters overlapping phrase exit) */}
        <div
          ref={statementLayerRef}
          data-testid="collage-statement-layer"
          style={{ opacity: 0, transform: 'translate3d(0, 62vh, 0)', pointerEvents: 'none' }}
          className="absolute inset-0 z-[5] flex items-end justify-center pb-12 sm:pb-16 md:items-center md:pb-28 will-change-[transform,opacity]"
        >
          <EditorialStatement onNavigate={onNavigate} />
        </div>
      </div>
    </section>
  );
};
