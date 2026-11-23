import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ChevronDown, Menu, Search, X } from 'lucide-react';
import { PrimaryButton } from './PrimaryButton';
import { IconButton } from './IconButton';
import { OFFICIAL_URLS } from '../data/becasContent';
import { evaluateHeaderVisibility } from '../animations/scrollProgress';
import { resolveAssetUrl, type AppRoute } from '../utils/becaHelpers';

export interface DirectionalHeaderProps {
  currentRoute: AppRoute;
  onNavigate: (route: AppRoute, hash?: string) => void;
  onOpenSearch: () => void;
}

/**
 * DirectionalHeader — Restrained Editorial Navigation:
 * - Over hero video at top of homepage: transparent with crisp white navigation
 * - Scrolled state (or internal pages): clean white surface, near-black (#111111) typography
 * - Show on Scroll UP ONLY: smoothly hides throughout downward scroll and reappears on upward scroll
 */
export const DirectionalHeader: React.FC<DirectionalHeaderProps> = ({
  currentRoute,
  onNavigate,
  onOpenSearch,
}) => {
  const [visible, setVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const prevScrollYRef = useRef(0);
  const visibleRef = useRef(true);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    prevScrollYRef.current = window.scrollY;
    const initial = evaluateHeaderVisibility({
      scrollY: window.scrollY,
      prevScrollY: window.scrollY,
      currentVisible: true,
    });
    setVisible(initial.visible);
    setIsScrolled(initial.isScrolled);
    visibleRef.current = initial.visible;

    let rafId = 0;
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const currentY = window.scrollY;
        const next = evaluateHeaderVisibility({
          scrollY: currentY,
          prevScrollY: prevScrollYRef.current,
          currentVisible: visibleRef.current,
          threshold: 8,
        });
        prevScrollYRef.current = currentY;
        if (next.visible !== visibleRef.current) {
          visibleRef.current = next.visible;
          setVisible(next.visible);
          if (!next.visible) {
            setMoreOpen(false);
          }
        }
        setIsScrolled(next.isScrolled);
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  // Reset header to visible on route change
  useEffect(() => {
    visibleRef.current = true;
    setVisible(true);
    prevScrollYRef.current = window.scrollY;
    setIsScrolled(window.scrollY > 24);
  }, [currentRoute]);

  useEffect(() => {
    const onOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    };
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMoreOpen(false);
        setMobileOpen(false);
      }
    };
    document.addEventListener('mousedown', onOutsideClick);
    window.addEventListener('keydown', onEscape);
    return () => {
      document.removeEventListener('mousedown', onOutsideClick);
      window.removeEventListener('keydown', onEscape);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const handleLinkClick = (e: React.MouseEvent, route: AppRoute, hash?: string) => {
    e.preventDefault();
    setMoreOpen(false);
    setMobileOpen(false);
    onNavigate(route, hash);
  };

  // Transparent over full-bleed hero video only on homepage at scroll top
  const isOverDarkHero = currentRoute === '/' && !isScrolled && !mobileOpen;

  return (
    <>
      <header
        data-testid="directional-header"
        data-header-visible={visible ? 'true' : 'false'}
        data-header-scrolled={isScrolled ? 'true' : 'false'}
        style={{
          transform: visible || mobileOpen ? 'translateY(0)' : 'translateY(calc(-100% - 24px))',
        }}
        className="fixed top-[12px] left-0 right-0 z-50 flex justify-center pointer-events-none transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
      >
        <div
          data-testid="directional-header-bar"
          className={`pointer-events-auto w-[calc(100%-24px)] md:w-[calc(100%-36px)] max-w-[1440px] h-[64px] md:h-[72px] px-4 md:px-[24px] rounded-[14px] flex items-center justify-between gap-4 lg:gap-8 transition-all duration-300 ${
            isOverDarkHero
              ? 'bg-transparent border border-transparent shadow-none text-white'
              : 'bg-white/96 backdrop-blur-md border border-[#111111]/10 text-[#111111] shadow-[0_10px_30px_rgba(17,17,17,0.08)]'
          }`}
        >
          {/* Left: Original Becas Butiá Logo */}
          <a
            href="/"
            onClick={(e) => handleLinkClick(e, '/')}
            aria-label="Becas Butiá — Ir al inicio"
            className="flex items-center shrink-0 py-1 transition-opacity hover:opacity-90"
          >
            <img
              src={
                isOverDarkHero
                  ? resolveAssetUrl('/assets/brand/logo-butia-on-dark.svg')
                  : resolveAssetUrl('/assets/brand/logo-butia.svg')
              }
              alt="Becas Butiá"
              className={`h-9 md:h-10 w-auto block ${
                isOverDarkHero ? 'drop-shadow-[0_1px_8px_rgba(0,0,0,0.45)]' : ''
              }`}
            />
          </a>

          {/* Center: Navigation */}
          <nav
            aria-label="Navegación principal"
            className="hidden xl:flex items-center justify-center gap-6 type-nav"
          >
            {[
              { label: 'Inicio', route: '/' as AppRoute },
              { label: 'Conocé la beca', route: '/conoce-la-beca' as AppRoute },
              { label: 'Cómo postularte', route: '/como-postularte' as AppRoute },
              { label: 'Requisitos', route: '/requisitos' as AppRoute },
            ].map((item) => {
              const isActive = currentRoute === item.route;
              return (
                <a
                  key={item.route}
                  href={item.route}
                  onClick={(e) => handleLinkClick(e, item.route)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`whitespace-nowrap shrink-0 py-1.5 border-b-[1.5px] transition-colors ${
                    isActive
                      ? isOverDarkHero
                        ? 'border-white text-white'
                        : 'border-[#111111] text-[#111111]'
                      : `border-transparent ${
                          isOverDarkHero
                            ? 'text-white/88 hover:text-white hover:border-white/50'
                            : 'text-[#454545] hover:text-[#111111] hover:border-[#111111]/40'
                        }`
                  }`}
                >
                  {item.label}
                </a>
              );
            })}

            <a
              href="/#preguntas-frecuentes"
              onClick={(e) => handleLinkClick(e, '/', '#preguntas-frecuentes')}
              className={`whitespace-nowrap shrink-0 py-1.5 border-b-[1.5px] border-transparent transition-colors ${
                isOverDarkHero
                  ? 'text-white/88 hover:text-white hover:border-white/50'
                  : 'text-[#454545] hover:text-[#111111] hover:border-[#111111]/40'
              }`}
            >
              Preguntas frecuentes
            </a>

            {/* Dropdown: Más */}
            <div ref={dropdownRef} className="relative">
              <button
                type="button"
                onClick={() => setMoreOpen((prev) => !prev)}
                aria-expanded={moreOpen}
                aria-haspopup="menu"
                className={`inline-flex items-center gap-1 whitespace-nowrap shrink-0 py-1.5 transition-colors cursor-pointer ${
                  isOverDarkHero
                    ? 'text-white/88 hover:text-white'
                    : 'text-[#454545] hover:text-[#111111]'
                }`}
              >
                <span>Más</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${moreOpen ? 'rotate-180' : ''}`}
                  aria-hidden="true"
                />
              </button>

              {moreOpen && (
                <div
                  role="menu"
                  className="absolute right-0 top-[calc(100%+14px)] w-64 rounded-[14px] bg-white border border-[#111111]/12 shadow-[0_18px_48px_rgba(17,17,17,0.14)] p-2 text-[14px] font-medium text-[#111111]"
                >
                  <a
                    role="menuitem"
                    href="/#montos"
                    onClick={(e) => handleLinkClick(e, '/', '#montos')}
                    className="block px-3.5 py-2.5 rounded-[8px] hover:bg-[#F1F1EF] transition-colors"
                  >
                    Montos de referencia 2026
                  </a>
                  <a
                    role="menuitem"
                    href="/#acuerdo-educativo"
                    onClick={(e) => handleLinkClick(e, '/', '#acuerdo-educativo')}
                    className="block px-3.5 py-2.5 rounded-[8px] hover:bg-[#F1F1EF] transition-colors"
                  >
                    Acuerdo educativo
                  </a>
                  <a
                    role="menuitem"
                    href="/#red-institucional"
                    onClick={(e) => handleLinkClick(e, '/', '#red-institucional')}
                    className="block px-3.5 py-2.5 rounded-[8px] hover:bg-[#F1F1EF] transition-colors"
                  >
                    Red de instituciones
                  </a>
                  <a
                    role="menuitem"
                    href={OFFICIAL_URLS.postulacion}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMoreOpen(false)}
                    className="flex items-center justify-between px-3.5 py-2.5 rounded-[8px] font-medium text-[#111111] hover:bg-[#F1F1EF] transition-colors"
                  >
                    <span>Portal de becas (MEC)</span>
                    <ArrowUpRight className="w-4 h-4 text-[#009FE3]" aria-hidden="true" />
                  </a>
                  <a
                    role="menuitem"
                    href={OFFICIAL_URLS.portalButiaMec}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMoreOpen(false)}
                    className="flex items-center justify-between px-3.5 py-2.5 rounded-[8px] text-[#454545] hover:bg-[#F1F1EF] hover:text-[#111111] transition-colors"
                  >
                    <span>Portal Butiá en MEC</span>
                    <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                  </a>
                </div>
              )}
            </div>
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-2.5 shrink-0">
            <IconButton
              ariaLabel="Abrir buscador del sitio"
              onClick={onOpenSearch}
              onDark={isOverDarkHero}
            >
              <Search className="w-[18px] h-[18px]" aria-hidden="true" />
            </IconButton>

            <div className="hidden sm:block">
              <PrimaryButton
                label="Consultar mi beca"
                href={OFFICIAL_URLS.consulta}
                external
                tone={isOverDarkHero ? 'light' : 'dark'}
                size="sm"
              />
            </div>

            <div className="xl:hidden">
              <IconButton
                ariaLabel={mobileOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
                onClick={() => setMobileOpen((prev) => !prev)}
                expanded={mobileOpen}
                onDark={isOverDarkHero}
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </IconButton>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile & Tablet Full-Screen Navigation Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-white pt-24 pb-8 px-5 flex flex-col justify-between overflow-y-auto xl:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Menú móvil de navegación"
        >
          <nav aria-label="Navegación móvil" className="flex flex-col gap-1 mt-2">
            {[
              { label: 'Inicio', route: '/' as AppRoute },
              { label: 'Conocé la beca', route: '/conoce-la-beca' as AppRoute },
              { label: 'Cómo postularte', route: '/como-postularte' as AppRoute },
              { label: 'Requisitos', route: '/requisitos' as AppRoute },
              { label: 'Montos de referencia', route: '/' as AppRoute, hash: '#montos' },
              { label: 'Preguntas frecuentes', route: '/' as AppRoute, hash: '#preguntas-frecuentes' },
            ].map((item) => (
              <a
                key={item.label}
                href={item.hash ? `${item.route}${item.hash}` : item.route}
                onClick={(e) => handleLinkClick(e, item.route, item.hash)}
                className="font-display font-medium text-[28px] tracking-[-0.03em] leading-tight py-3.5 border-b border-[#D8D8D8] text-[#111111] hover:text-[#009FE3] transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="mt-8 pt-6 border-t border-[#D8D8D8] flex flex-col gap-3">
            <PrimaryButton
              label="Ingresar al portal de becas"
              href={OFFICIAL_URLS.postulacion}
              external
              tone="dark"
              className="w-full"
            />
            <PrimaryButton
              label="Consultar mi beca"
              href={OFFICIAL_URLS.consulta}
              external
              tone="cyan"
              className="w-full"
            />
            <p className="type-caption text-[#454545] mt-2">
              Atención gratuita: <strong>0800 2342</strong> (fijos) · <strong>*2342</strong> (celulares) ·{' '}
              {OFFICIAL_URLS.horarioAtencion}
            </p>
          </div>
        </div>
      )}
    </>
  );
};
