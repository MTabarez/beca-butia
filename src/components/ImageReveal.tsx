import React, { useEffect, useRef, useState } from 'react';
import { resolveAssetUrl } from '../utils/becaHelpers';

export interface ImageRevealProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  aspectClass?: string;
  parallaxStrength?: number;
  hoverScaleDown?: boolean;
  priority?: boolean;
  caption?: string;
}

export const ImageReveal: React.FC<ImageRevealProps> = ({
  src,
  alt,
  className = '',
  imgClassName = '',
  aspectClass = 'aspect-[4/3]',
  parallaxStrength = 0,
  hoverScaleDown = false,
  priority = false,
  caption,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [hasError, setHasError] = useState(false);
  const [isVisible, setIsVisible] = useState(priority);

  useEffect(() => {
    if (priority) return;
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        }
      },
      { rootMargin: '0px 0px -60px 0px', threshold: 0.05 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [priority]);

  useEffect(() => {
    if (!parallaxStrength) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isSmallScreen = window.innerWidth < 768;
    if (prefersReduced || isSmallScreen) return;

    let rafId = 0;
    const updateParallax = () => {
      const container = containerRef.current;
      const img = imgRef.current;
      if (!container || !img) return;
      const rect = container.getBoundingClientRect();
      const viewHeight = window.innerHeight || 900;
      const progress = (rect.top + rect.height * 0.5 - viewHeight * 0.5) / viewHeight;
      const clamped = Math.max(-1, Math.min(1, progress));
      const offsetY = clamped * parallaxStrength;
      img.style.transform = `translate3d(0, ${offsetY.toFixed(1)}px, 0) scale(1.09)`;
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateParallax);
    };

    updateParallax();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [parallaxStrength]);

  return (
    <figure className={`m-0 ${className}`}>
      <div
        ref={containerRef}
        className={`relative overflow-hidden rounded-[20px] bg-[#D8D8D8] ${aspectClass} ${
          !priority ? `reveal-up ${isVisible ? 'is-visible' : ''}` : ''
        }`}
      >
        {hasError ? (
          <div
            className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[#F1F1EF]"
            role="img"
            aria-label={alt}
          >
            <img
              src={resolveAssetUrl('/assets/brand/logo-butia.svg')}
              alt="Becas Butiá"
              className="h-10 w-auto mb-3 opacity-85"
            />
            <p className="type-body-sm text-[#454545] max-w-xs">{alt}</p>
          </div>
        ) : (
          <img
            ref={imgRef}
            src={src}
            alt={alt}
            loading={priority ? 'eager' : 'lazy'}
            referrerPolicy="no-referrer"
            onError={() => setHasError(true)}
            className={`w-full h-full object-cover object-[50%_22%] will-change-transform ${
              hoverScaleDown
                ? 'transition-transform duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] scale-100 group-hover:scale-[0.96]'
                : 'transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]'
            } ${imgClassName}`}
          />
        )}
      </div>
      {caption && (
        <figcaption className="mt-2.5 type-caption text-[#454545]">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};
