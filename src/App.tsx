import React, { useCallback, useEffect, useState } from 'react';
import { DirectionalHeader } from './components/DirectionalHeader';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { HomePage } from './pages/HomePage';
import { ConoceLaBecaPage } from './pages/ConoceLaBecaPage';
import { ComoPostulartePage } from './pages/ComoPostulartePage';
import { RequisitosPage } from './pages/RequisitosPage';
import { buildAppUrl, normalizeAppRoute, type AppRoute } from './utils/becaHelpers';

const PAGE_TITLES: Record<AppRoute, string> = {
  '/': 'Bienvenida | Becas Butiá',
  '/conoce-la-beca': 'Acerca de la beca | Becas',
  '/como-postularte': 'Cómo postularte | Becas',
  '/requisitos': 'Requisitos | Becas',
};

export function App() {
  const [route, setRoute] = useState<AppRoute>(() => normalizeAppRoute(window.location.pathname));
  const [searchOpen, setSearchOpen] = useState(false);

  const scrollToHash = useCallback((hash?: string) => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const targetId = hash.replace(/^#/, '');
    window.requestAnimationFrame(() => {
      const target = document.getElementById(targetId);
      if (target) {
        const yOffset = -96;
        const y = target.getBoundingClientRect().top + window.scrollY + yOffset;
        window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
      }
    });
  }, []);

  const navigate = useCallback(
    (nextRoute: AppRoute, hash?: string) => {
      const nextUrl = buildAppUrl(nextRoute, hash);
      const currentUrl = `${window.location.pathname}${window.location.hash}`;
      if (currentUrl !== nextUrl) {
        window.history.pushState({ route: nextRoute }, '', nextUrl);
      }
      setRoute(nextRoute);
      window.setTimeout(() => scrollToHash(hash), route !== nextRoute ? 80 : 10);
    },
    [route, scrollToHash]
  );

  useEffect(() => {
    const onPopState = () => {
      const next = normalizeAppRoute(window.location.pathname);
      setRoute(next);
      window.setTimeout(() => scrollToHash(window.location.hash || undefined), 60);
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, [scrollToHash]);

  useEffect(() => {
    document.title = PAGE_TITLES[route];
  }, [route]);

  const renderPage = () => {
    switch (route) {
      case '/conoce-la-beca':
        return <ConoceLaBecaPage onNavigate={navigate} />;
      case '/como-postularte':
        return <ComoPostulartePage onNavigate={navigate} />;
      case '/requisitos':
        return <RequisitosPage onNavigate={navigate} />;
      case '/':
      default:
        return <HomePage onNavigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-page)] text-[#111111]">
      <a
        href="#contenido-principal"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[80] focus:px-4 focus:py-2 focus:rounded-full focus:bg-[#111111] focus:text-white focus:text-sm"
      >
        Saltar al contenido principal
      </a>

      <DirectionalHeader
        currentRoute={route}
        onNavigate={navigate}
        onOpenSearch={() => setSearchOpen(true)}
      />

      <div className="flex-1">{renderPage()}</div>

      <Footer onNavigate={navigate} />

      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onNavigate={navigate}
      />
    </div>
  );
}

export default App;
