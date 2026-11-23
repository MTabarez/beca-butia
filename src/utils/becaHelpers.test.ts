import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildAppUrl,
  calculateMonthlyInstallment,
  clampCarouselIndex,
  formatUyuCurrency,
  getAppBasePath,
  normalizeAppRoute,
  normalizeSpanishText,
  resolveAssetUrl,
  searchSiteContent,
  verifyOfficialImageAssets,
  type SearchableItem,
} from './becaHelpers';
import { imageAssets } from '../config/imageAssets';

test('multi-source official photography policy holds across every imageAssets slot', () => {
  assert.equal(verifyOfficialImageAssets(imageAssets, 10), true);
  assert.notEqual(imageAssets.hero, imageAssets.modalityUtu);
  assert.notEqual(imageAssets.modalitySecundaria, imageAssets.modalityRural);
  assert.notEqual(imageAssets.applicationSteps, imageAssets.educationalAgreement);
});

test('normalizeAppRoute maps all 4 official pages cleanly at root and GitHub Pages subpaths', () => {
  assert.equal(normalizeAppRoute('/'), '/');
  assert.equal(normalizeAppRoute('/conoce-la-beca'), '/conoce-la-beca');
  assert.equal(normalizeAppRoute('/como-postularte'), '/como-postularte');
  assert.equal(normalizeAppRoute('/requisitos'), '/requisitos');
  assert.equal(normalizeAppRoute('/ruta-inexistente'), '/');

  // GitHub Pages project subpath (/becas-butia/)
  assert.equal(normalizeAppRoute('/becas-butia', '/becas-butia/'), '/');
  assert.equal(normalizeAppRoute('/becas-butia/', '/becas-butia/'), '/');
  assert.equal(normalizeAppRoute('/becas-butia/conoce-la-beca', '/becas-butia/'), '/conoce-la-beca');
  assert.equal(normalizeAppRoute('/becas-butia/como-postularte', '/becas-butia/'), '/como-postularte');
  assert.equal(normalizeAppRoute('/becas-butia/requisitos', '/becas-butia/'), '/requisitos');
});

test('base-path helpers resolve asset URLs and SPA history URLs for GitHub Pages subpaths', () => {
  assert.equal(getAppBasePath('/'), '/');
  assert.equal(getAppBasePath('/becas-butia'), '/becas-butia/');
  assert.equal(getAppBasePath('becas-butia/'), '/becas-butia/');

  assert.equal(
    resolveAssetUrl('/assets/brand/logo-butia.svg', '/'),
    '/assets/brand/logo-butia.svg'
  );
  assert.equal(
    resolveAssetUrl('/assets/brand/logo-butia.svg', '/becas-butia/'),
    '/becas-butia/assets/brand/logo-butia.svg'
  );
  assert.equal(
    resolveAssetUrl('https://becas.edu.uy/logo.svg', '/becas-butia/'),
    'https://becas.edu.uy/logo.svg'
  );

  assert.equal(buildAppUrl('/', undefined, '/becas-butia/'), '/becas-butia/');
  assert.equal(buildAppUrl('/requisitos', undefined, '/becas-butia/'), '/becas-butia/requisitos');
  assert.equal(
    buildAppUrl('/conoce-la-beca', '#acuerdo', '/becas-butia/'),
    '/becas-butia/conoce-la-beca#acuerdo'
  );
});

test('calculateMonthlyInstallment divides annual 2026 reference amounts across 9 monthly payments', () => {
  assert.equal(calculateMonthlyInstallment(13000, 9), 1444);
  assert.equal(calculateMonthlyInstallment(17000, 9), 1889);
  assert.equal(calculateMonthlyInstallment(21000, 9), 2333);
  assert.equal(calculateMonthlyInstallment(25000, 9), 2778);
  assert.equal(calculateMonthlyInstallment(0, 9), 0);
});

test('formatUyuCurrency formats Uruguayan pesos with dot thousands separators', () => {
  assert.equal(formatUyuCurrency(13000), '$ 13.000');
  assert.equal(formatUyuCurrency(25000), '$ 25.000');
  assert.equal(formatUyuCurrency(1444), '$ 1.444');
});

test('normalizeSpanishText strips accents and lowercases cleanly', () => {
  assert.equal(
    normalizeSpanishText('Becas Butiá — Educación Pública'),
    'becas butia — educacion publica'
  );
});

test('searchSiteContent matches diacritic-insensitive queries across all routes', () => {
  const sample: SearchableItem[] = [
    {
      id: '1',
      title: 'Requisitos de postulación',
      excerpt: 'Modalidades de educación media pública y criterios de selección.',
      category: 'Requisitos',
      route: '/requisitos',
    },
    {
      id: '2',
      title: 'Tu solicitud, paso a paso',
      excerpt: 'Cómo guardar avances y enviar el formulario en el portal oficial.',
      category: 'Postulación',
      route: '/como-postularte',
    },
  ];

  const results = searchSiteContent('guardar formulario', sample);
  assert.equal(results.length, 1);
  assert.equal(results[0].route, '/como-postularte');
});

test('clampCarouselIndex safely bounds slide indices', () => {
  assert.equal(clampCarouselIndex(-2, 4), 0);
  assert.equal(clampCarouselIndex(2, 4), 2);
  assert.equal(clampCarouselIndex(9, 4), 3);
  assert.equal(clampCarouselIndex(0, 0), 0);
});
