export type AppRoute = '/' | '/conoce-la-beca' | '/como-postularte' | '/requisitos';

export interface SearchableItem {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  route: AppRoute;
  hash?: string;
  externalUrl?: string;
}

export const DEFAULT_MONTHLY_INSTALLMENTS = 9;

/**
 * Calculates the approximate monthly installment value from an annual historical reference amount.
 */
export function calculateMonthlyInstallment(
  annualAmountUyu: number,
  installments: number = DEFAULT_MONTHLY_INSTALLMENTS
): number {
  if (annualAmountUyu <= 0 || installments <= 0) {
    return 0;
  }
  return Math.round(annualAmountUyu / installments);
}

/**
 * Formats Uruguayan pesos using Uruguayan dot thousands separator ($ 13.000).
 */
export function formatUyuCurrency(amount: number): string {
  const rounded = Math.round(amount);
  const formatted = rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `$ ${formatted}`;
}

/**
 * Normalizes Spanish strings by stripping diacritics and lowercasing for accurate search matching.
 */
export function normalizeSpanishText(input: string): string {
  return input
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

/**
 * Filters site search entries across title, excerpt, and category using diacritic-insensitive matching.
 */
export function searchSiteContent(query: string, items: SearchableItem[]): SearchableItem[] {
  const normalizedQuery = normalizeSpanishText(query);
  if (!normalizedQuery) {
    return items.slice(0, 6);
  }

  const terms = normalizedQuery.split(/\s+/).filter(Boolean);

  return items.filter((item) => {
    const haystack = normalizeSpanishText(`${item.title} ${item.excerpt} ${item.category}`);
    return terms.every((term) => haystack.includes(term));
  });
}

/**
 * Safely clamps a carousel slide index within [0, total - 1].
 */
export function clampCarouselIndex(index: number, total: number): number {
  if (total <= 0) return 0;
  if (index < 0) return 0;
  if (index >= total) return total - 1;
  return index;
}

/**
 * Normalizes Vite BASE_URL / subpath into a clean leading+trailing slash prefix
 * (e.g. "/" for root domains or "/becas-butia/" for GitHub Pages project sites).
 */
export function getAppBasePath(explicitBase?: string): string {
  const raw =
    explicitBase ??
    ((import.meta as { env?: { BASE_URL?: string } }).env?.BASE_URL ?? '/');
  if (!raw || raw === '/' || raw === './') return '/';
  const trimmed = raw.replace(/^\/+|\/+$/g, '');
  return trimmed ? `/${trimmed}/` : '/';
}

/**
 * Prefixes root-relative public asset paths ("/assets/...") with the configured app base path
 * so images, logos, and favicons load cleanly both at "/" and at "/<repo>/" on GitHub Pages.
 */
export function resolveAssetUrl(assetPath: string, explicitBase?: string): string {
  if (!assetPath) return assetPath;
  if (/^(https?:)?\/\//i.test(assetPath) || assetPath.startsWith('data:')) {
    return assetPath;
  }
  const base = getAppBasePath(explicitBase);
  const cleanAsset = assetPath.replace(/^\/+/, '');
  return `${base}${cleanAsset}`;
}

/**
 * Builds a browser URL (including configured base path and optional hash) for history navigation.
 */
export function buildAppUrl(
  route: AppRoute,
  hash?: string,
  explicitBase?: string
): string {
  const base = getAppBasePath(explicitBase);
  const normalizedHash = hash ? (hash.startsWith('#') ? hash : `#${hash}`) : '';
  if (route === '/') {
    return `${base}${normalizedHash}`;
  }
  const cleanRoute = route.replace(/^\/+/, '');
  return `${base}${cleanRoute}${normalizedHash}`;
}

/**
 * Normalizes pathname into one of the 4 supported Becas Butiá application routes,
 * stripping any configured deployment base path (e.g. "/becas-butia/").
 */
export function normalizeAppRoute(pathname: string, explicitBase?: string): AppRoute {
  const base = getAppBasePath(explicitBase);
  let relativePath = pathname || '/';

  if (base !== '/') {
    const baseWithoutTrailingSlash = base.slice(0, -1);
    if (relativePath === baseWithoutTrailingSlash || relativePath === base) {
      relativePath = '/';
    } else if (relativePath.startsWith(base)) {
      relativePath = `/${relativePath.slice(base.length)}`;
    }
  }

  if (relativePath.startsWith('/conoce-la-beca')) return '/conoce-la-beca';
  if (relativePath.startsWith('/como-postularte')) return '/como-postularte';
  if (relativePath.startsWith('/requisitos')) return '/requisitos';
  return '/';
}

/**
 * Verifies that every entry in the centralized image asset map points to a valid local
 * institutional image file and that the site showcases diverse multi-source photography.
 */
export function verifyOfficialImageAssets(
  assets: Record<string, string>,
  minUniqueSources: number = 8
): boolean {
  const values = Object.values(assets);
  if (values.length === 0) return false;
  const allValidPaths = values.every(
    (path) => path.includes('/assets/images/') && /\.(jpg|jpeg|png|webp)$/i.test(path)
  );
  if (!allValidPaths) return false;
  const unique = new Set(values);
  return unique.size >= minUniqueSources;
}
