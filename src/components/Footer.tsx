import React, { useState } from 'react';
import { ArrowUp, ArrowUpRight, Mail, Phone } from 'lucide-react';
import { FOOTER_COLUMNS, OFFICIAL_URLS, type FooterPreviewLink } from '../data/becasContent';
import { InstitutionalPartners } from './InstitutionalPartners';
import { resolveAssetUrl, type AppRoute } from '../utils/becaHelpers';

export interface FooterProps {
  onNavigate: (route: AppRoute, hash?: string) => void;
}

/**
 * Section 16 — Footer Navigation Hover Preview:
 * - Preserves authentic Butiá Navy (#392665) closing band & official institutional logos
 * - Desktop: hovering/focusing any navigation link smoothly reveals an editorial photographic
 *   preview and smoothly hides it again when hover ends
 * - Mobile: completely clean and static (no floating preview)
 */
export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [activePreview, setActivePreview] = useState<FooterPreviewLink | null>(null);
  const [lastPreview, setLastPreview] = useState<FooterPreviewLink>(FOOTER_COLUMNS.programa[0]);

  const handleInternalClick = (e: React.MouseEvent, link: FooterPreviewLink) => {
    if (link.externalUrl) return;
    e.preventDefault();
    if (link.route) {
      onNavigate(link.route, link.hash);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEnter = (link: FooterPreviewLink) => {
    setLastPreview(link);
    setActivePreview(link);
  };

  const handleLeave = () => {
    setActivePreview(null);
  };

  const isPreviewVisible = activePreview !== null;

  const renderLinkItem = (link: FooterPreviewLink) => {
    const isExternal = Boolean(link.externalUrl);
    const href = isExternal
      ? link.externalUrl
      : link.hash
        ? `${link.route ?? '/'}${link.hash}`
        : (link.route ?? '/');

    return (
      <li key={link.id}>
        <a
          href={href}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          onClick={(e) => handleInternalClick(e, link)}
          onMouseEnter={() => handleEnter(link)}
          onFocus={() => handleEnter(link)}
          onMouseLeave={handleLeave}
          onBlur={handleLeave}
          className="group inline-flex items-center gap-1.5 py-1.5 text-[15px] font-medium text-white/82 hover:text-white transition-colors"
        >
          <span className="border-b border-transparent group-hover:border-[#FBBA06] transition-colors">
            {link.label}
          </span>
          {isExternal && (
            <ArrowUpRight
              className="w-3.5 h-3.5 text-white/50 group-hover:text-[#FBBA06] transition-colors"
              aria-hidden="true"
            />
          )}
        </a>
      </li>
    );
  };

  return (
    <footer className="relative z-50 bg-[#392665] text-white pt-16 md:pt-20 pb-10">
      <div className="butia-container">
        {/* Top Band: Official Institutional Logos */}
        <InstitutionalPartners />

        {/* Main Footer Grid: Contact + Floating Desktop Hover Preview + 3 Navigation Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-10 border-b border-white/16">
          {/* Left Column: Contact & Floating Hover-Triggered Photographic Preview */}
          <div className="lg:col-span-5 relative flex flex-col justify-center">
            <div>
              <h2 className="type-h3 text-white max-w-md">
                ¿Necesitás orientación sobre tu beca o postulación?
              </h2>
              <div className="mt-5 flex flex-col gap-2.5 type-body-sm text-white/84">
                <a
                  href={`tel:${OFFICIAL_URLS.telefonoFijo.replace(/\s+/g, '')}`}
                  className="inline-flex items-center gap-2.5 hover:text-white transition-colors w-fit"
                >
                  <Phone className="w-4 h-4 text-[#009FE3]" aria-hidden="true" />
                  <span>
                    <strong className="text-white font-semibold">0800 2342</strong> (teléfonos fijos) ·{' '}
                    <strong className="text-white font-semibold">*2342</strong> (celulares)
                  </span>
                </a>
                <p className="type-caption text-white/68 pl-6">
                  Horario publicado: {OFFICIAL_URLS.horarioAtencion}
                </p>
                <a
                  href={OFFICIAL_URLS.email}
                  className="inline-flex items-center gap-2.5 hover:text-white transition-colors w-fit"
                >
                  <Mail className="w-4 h-4 text-[#FBBA06]" aria-hidden="true" />
                  <span>{OFFICIAL_URLS.emailLabel}</span>
                </a>
              </div>
            </div>

            {/* Section 16: Desktop Photographic Preview — Floats cleanly on link hover with zero idle vertical void */}
            <div
              className="hidden lg:flex items-center absolute inset-0 z-20 pointer-events-none"
              aria-live="polite"
              data-testid="footer-hover-preview"
              data-preview-visible={isPreviewVisible ? 'true' : 'false'}
            >
              <div
                className={`relative w-full max-w-[400px] rounded-[20px] overflow-hidden aspect-[4/2.1] bg-[#241645] border border-white/15 shadow-[0_20px_48px_rgba(0,0,0,0.28)] transition-all duration-[360ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  isPreviewVisible
                    ? 'opacity-100 translate-y-0 scale-100'
                    : 'opacity-0 translate-y-2 scale-[0.97]'
                }`}
              >
                <img
                  key={lastPreview.id}
                  src={lastPreview.previewImageSrc}
                  alt={lastPreview.previewImageAlt}
                  className="w-full h-full object-cover object-[50%_22%]"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-[#190F33]/92 via-[#190F33]/25 to-transparent"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-[13px] font-medium text-[#FBBA06] mb-1">
                    {lastPreview.label}
                  </p>
                  <p className="type-body-sm text-white/95 max-w-sm">
                    {lastPreview.previewCaption}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Columns: 3 Clean Link Columns */}
          <div className="lg:col-span-7 lg:pl-8 grid grid-cols-1 sm:grid-cols-3 gap-10">
            <div>
              <h3 className="text-[13px] font-medium text-white/55 mb-4">Programa</h3>
              <ul className="space-y-1.5">{FOOTER_COLUMNS.programa.map(renderLinkItem)}</ul>
            </div>

            <div>
              <h3 className="text-[13px] font-medium text-white/55 mb-4">Información</h3>
              <ul className="space-y-1.5">{FOOTER_COLUMNS.informacion.map(renderLinkItem)}</ul>
            </div>

            <div>
              <h3 className="text-[13px] font-medium text-white/55 mb-4">Conectate</h3>
              <ul className="space-y-1.5">{FOOTER_COLUMNS.conectate.map(renderLinkItem)}</ul>
            </div>
          </div>
        </div>

        {/* Bottom Brand Lockup */}
        <div className="pt-8 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <p className="font-display font-medium text-white text-[16px]">
              Becas Butiá — Contigo caminamos los sueños
            </p>
            <p className="type-body-sm text-white/74 mt-1">{OFFICIAL_URLS.direccionAnep}</p>
            <p className="type-caption text-white/58 mt-4">
              Administración Nacional de Educación Pública · Ministerio de Educación y Cultura ·
              Uruguay
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/');
              }}
              aria-label="Volver al inicio de Becas Butiá"
              className="rounded-[12px] bg-white px-5 py-3 hover:bg-[#F1F1EF] transition-colors"
            >
              <img
                src={resolveAssetUrl('/assets/brand/logo-butia.svg')}
                alt="Becas Butiá"
                className="h-11 md:h-12 w-auto block"
              />
            </a>

            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 text-[14px] font-medium text-white/85 hover:text-[#FBBA06] transition-colors py-2 cursor-pointer whitespace-nowrap"
            >
              <span>Volver arriba</span>
              <ArrowUp className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
