import React, { useEffect, useRef } from 'react';

export interface StackedSectionProps {
  id?: string;
  children: React.ReactNode;
  backgroundStyle: string;
  textClassName?: string;
  zIndex: number;
  roundedTop?: boolean;
  /**
   * When true on desktop, gently pins the panel as the next rounded sheet rises over it,
   * creating true physical overlap depth with a subtle receding scrim.
   */
  stickyUnderlay?: boolean;
  className?: string;
}

/**
 * Section 10 — Overlapping Rounded Panels & Physical Depth Shadows:
 * - Incoming panels carry large rounded upper corners (36px -> 52px) and
 *   box-shadow: 0 -14px 42px rgba(0, 0, 0, 0.10).
 * - Optional stickyUnderlay lets the retiring panel remain briefly visible
 *   behind the incoming panel while a scroll-linked scrim subtly dims it.
 */
export const StackedSection: React.FC<StackedSectionProps> = ({
  id,
  children,
  backgroundStyle,
  textClassName = 'text-[#111111]',
  zIndex,
  roundedTop = false,
  stickyUnderlay = false,
  className = '',
}) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const scrimRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!stickyUnderlay) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || window.innerWidth < 1024) return;

    let rafId = 0;

    const updateStickyTop = () => {
      const el = sectionRef.current;
      if (!el) return;
      if (window.innerWidth < 1024) {
        el.style.top = '';
        return;
      }
      const vh = window.innerHeight || 900;
      const offset = Math.min(0, Math.round(vh - el.offsetHeight));
      el.style.top = `${offset}px`;
    };

    const updateDepth = () => {
      const el = sectionRef.current;
      const scrim = scrimRef.current;
      if (!el || !scrim) return;

      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 900;
      const nextSibling = el.nextElementSibling as HTMLElement | null;

      if (nextSibling) {
        const nextTop = nextSibling.getBoundingClientRect().top;
        // As the incoming rounded panel travels upward over this panel, softly dim this underlay
        if (nextTop < vh && nextTop > -120) {
          const progress = Math.min(1, Math.max(0, (vh - nextTop) / (vh * 0.9)));
          scrim.style.opacity = (progress * 0.16).toFixed(3);
          return;
        }
      }

      if (rect.bottom <= 0) {
        scrim.style.opacity = '0.16';
      } else {
        scrim.style.opacity = '0';
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateDepth);
    };

    const onResize = () => {
      updateStickyTop();
      onScroll();
    };

    updateStickyTop();
    updateDepth();
    const ro = new ResizeObserver(() => {
      updateStickyTop();
      updateDepth();
    });
    if (sectionRef.current) ro.observe(sectionRef.current);

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, [stickyUnderlay]);

  return (
    <section
      ref={sectionRef}
      id={id}
      data-overlapping-panel={roundedTop ? 'true' : 'false'}
      style={{ backgroundColor: backgroundStyle, zIndex }}
      className={`relative ${
        roundedTop ? 'stacked-panel-surface -mt-8 md:-mt-12 lg:-mt-14' : ''
      } ${stickyUnderlay ? 'lg:sticky' : ''} ${textClassName} ${className}`}
    >
      {children}
      {stickyUnderlay && (
        <div
          ref={scrimRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-black opacity-0 transition-opacity duration-150 rounded-[inherit]"
        />
      )}
    </section>
  );
};
