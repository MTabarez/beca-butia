/**
 * CENTRALIZED IMAGE & MEDIA ASSET CONFIGURATION — BECAS BUTIÁ
 *
 * PHOTOGRAPHY POLICY:
 * - Zero AI-generated photography.
 * - Every photographic slot across the site uses authentic Uruguayan documentary
 *   and institutional photographs retrieved from official and public-media sources:
 *   ANEP, DGES, Ministerio de Educación y Cultura (MEC), Presidencia de la República,
 *   Medios Públicos y El Popular.
 *
 * To replace any slot in the future, update ONLY the corresponding key below.
 */

import { resolveAssetUrl } from '../utils/becaHelpers';

export const OFFICIAL_PHOTOS = {
  // ANEP — Estudiantes y comunidad educativa en lanzamiento Becas Butiá (nov 2025 / ene 2026)
  anepStudentsAudience: resolveAssetUrl('/assets/images/official/anep-dsc0513.jpg'),
  anepStudentsMural: resolveAssetUrl('/assets/images/official/anep-dsc0762.jpg'),
  anepUtuFacade: resolveAssetUrl('/assets/images/official/anep-dsc0373.jpg'),
  anepFullAuditorium: resolveAssetUrl('/assets/images/official/anep-dsc0491.jpg'),
  anepCorridorStudents: resolveAssetUrl('/assets/images/official/anep-260122-3.jpg'),
  anepYouthSpeaker: resolveAssetUrl('/assets/images/official/anep-5.png'),

  // DGES — Estudiantes con cuadernolas Becas Butiá y acto oficial
  dgesTwoStudents: resolveAssetUrl('/assets/images/official/dges-lanzamiento-14.jpg'),
  dgesThreeStudents: resolveAssetUrl('/assets/images/official/dges-lanzamiento-15.jpg'),
  dgesStudentPortrait: resolveAssetUrl('/assets/images/official/dges-whatsapp-135119.jpg'),
  dgesCommunityGroup: resolveAssetUrl('/assets/images/official/dges-lanzamiento-01.jpg'),

  // MEC, Presidencia, Medios Públicos y El Popular
  mecGroupLaunch: resolveAssetUrl('/assets/images/official/mec-jpf2875b.jpg'),
  presidenciaMecSignage: resolveAssetUrl('/assets/images/official/presidencia-frb6273.jpg'),
  mediosPublicosNotebook: resolveAssetUrl('/assets/images/official/mediospublicos-fgr02.jpg'),
  elPopularDeskNotebooks: resolveAssetUrl('/assets/images/official/elpopular-butia.jpg'),
  presidenciaVistaLindaArchive: resolveAssetUrl('/assets/images/butia-reference-placeholder.jpg'),
} as const;

export const imageAssets = {
  temporaryReference: OFFICIAL_PHOTOS.presidenciaVistaLindaArchive,

  // Homepage — Hero & Unified Collage
  hero: OFFICIAL_PHOTOS.anepStudentsAudience,
  heroFloatingInset: OFFICIAL_PHOTOS.dgesStudentPortrait,
  editorialIntro: OFFICIAL_PHOTOS.anepStudentsMural,
  programPrimary: OFFICIAL_PHOTOS.anepStudentsMural,
  programInset: OFFICIAL_PHOTOS.dgesTwoStudents,
  impactWide: OFFICIAL_PHOTOS.anepFullAuditorium,

  // Feature carousel / program pillars (reserved slots)
  cardImageOne: OFFICIAL_PHOTOS.elPopularDeskNotebooks,
  cardImageTwo: OFFICIAL_PHOTOS.dgesTwoStudents,
  cardImageThree: OFFICIAL_PHOTOS.anepStudentsMural,
  cardImageFour: OFFICIAL_PHOTOS.mecGroupLaunch,

  // Educational modalities (5 distinct authentic photographs)
  modalitySecundaria: OFFICIAL_PHOTOS.anepCorridorStudents,
  modalityUtu: OFFICIAL_PHOTOS.anepUtuFacade,
  modalityPue: OFFICIAL_PHOTOS.dgesThreeStudents,
  modalityAreasPedagogicas: OFFICIAL_PHOTOS.anepYouthSpeaker,
  modalityRural: OFFICIAL_PHOTOS.mediosPublicosNotebook,

  // Application steps, Educational agreement & Closing CTA
  applicationSteps: OFFICIAL_PHOTOS.elPopularDeskNotebooks,
  educationalAgreement: OFFICIAL_PHOTOS.presidenciaMecSignage,
  ctaBackground: OFFICIAL_PHOTOS.anepStudentsMural,
  ctaInset: OFFICIAL_PHOTOS.dgesCommunityGroup,

  // Internal pages (/conoce-la-beca, /como-postularte, /requisitos)
  detailHero: OFFICIAL_PHOTOS.mecGroupLaunch,
  detailEditorialOne: OFFICIAL_PHOTOS.dgesTwoStudents,
  detailEditorialTwo: OFFICIAL_PHOTOS.presidenciaMecSignage,
  detailEditorialInset: OFFICIAL_PHOTOS.mediosPublicosNotebook,
  guideHero: OFFICIAL_PHOTOS.elPopularDeskNotebooks,
  requirementsHero: OFFICIAL_PHOTOS.anepUtuFacade,

  // Footer interactive desktop hover previews
  footerPreview: OFFICIAL_PHOTOS.dgesTwoStudents,
  footerPreviewPostulacion: OFFICIAL_PHOTOS.elPopularDeskNotebooks,
  footerPreviewRequisitos: OFFICIAL_PHOTOS.anepUtuFacade,
  footerPreviewFaq: OFFICIAL_PHOTOS.anepStudentsAudience,
  footerPreviewConsulta: OFFICIAL_PHOTOS.presidenciaMecSignage,
  footerPreviewGuia: OFFICIAL_PHOTOS.mediosPublicosNotebook,
  footerPreviewContacto: OFFICIAL_PHOTOS.anepFullAuditorium,
  footerPreviewSitio: OFFICIAL_PHOTOS.mecGroupLaunch,
  footerPreviewCampana: OFFICIAL_PHOTOS.anepCorridorStudents,
  footerPreviewAnep: OFFICIAL_PHOTOS.dgesCommunityGroup,
} as const;

export type ImageAssetKey = keyof typeof imageAssets;

/**
 * Video component slot kept prepared for future official institutional MP4 replacement.
 * Do not invent a synthetic video file; keep `heroVideoSrc` as null until an authorized
 * institutional video asset is placed in `/public/assets/video/`.
 */
export const videoAssets = {
  heroVideoSrc: null as string | null,
  heroPoster: imageAssets.hero,
  plannedFilename: '/assets/video/hero-becas-butia.mp4',
} as const;

export const IMAGE_CREDIT_REFERENCE = {
  title: 'Estudiantes y comunidad educativa en actividades oficiales de Becas Butiá',
  institution: 'ANEP · DGES · MEC · Presidencia de la República · Medios Públicos · El Popular',
  date: '2025 – 2026',
  galleryUrl:
    'https://www.gub.uy/presidencia/comunicacion/fotos/presidente-orsi-lanzamiento-becas-butia',
  sourceFileUrl:
    'https://anep.edu.uy/sites/default/files/images/2025/noticias/noviembre/251121/beca/DSC_0513.jpg',
} as const;

export interface OfficialPhotoSource {
  priority: string;
  institution: string;
  title: string;
  url: string;
  date: string;
  credits: string;
  notes: string;
}

export const OFFICIAL_PHOTO_SOURCES: OfficialPhotoSource[] = [
  {
    priority: 'Fuente oficial 1',
    institution: 'ANEP',
    title: 'Cobertura fotográfica del lanzamiento de Becas Butiá y estudiantes en centros públicos',
    url: 'https://www.anep.edu.uy/',
    date: 'Noviembre 2025 – Enero 2026',
    credits: 'Comunicación Institucional ANEP',
    notes: 'Fotografías de estudiantes en auditorio, pasillos educativos, fachada de UTU Vista Linda y participación estudiantil.',
  },
  {
    priority: 'Fuente oficial 2',
    institution: 'DGES — Dirección General de Educación Secundaria',
    title: 'Galería del lanzamiento de Becas Butiá (estudiantes y comunidad educativa)',
    url: 'https://www.dges.edu.uy/',
    date: '21/11/2025',
    credits: 'Comunicación Institucional DGES',
    notes: 'Retratos de estudiantes con cuadernolas oficiales de Becas Butiá y registro del encuentro comunitario.',
  },
  {
    priority: 'Fuente oficial 3',
    institution: 'Ministerio de Educación y Cultura (MEC)',
    title: 'Noticias y campaña oficial Becas Butiá',
    url: 'https://www.gub.uy/ministerio-educacion-cultura/comunicacion/campanas/becas-butia',
    date: '2025 – 2026',
    credits: 'Ministerio de Educación y Cultura — Dirección Nacional de Educación',
    notes: 'Registro grupal institucional junto a estudiantes y piezas de campaña oficial.',
  },
  {
    priority: 'Fuente oficial 4',
    institution: 'Presidencia de la República',
    title: 'Presentación de resultados 2026 y lanzamiento de Becas Butiá',
    url: 'https://www.gub.uy/presidencia/comunicacion/publicaciones/orsi-presentacion-del-informe-resultados-becas-butia-2026',
    date: 'Noviembre 2025 – Junio 2026',
    credits: 'Fotografía institucional / Presidencia de la República',
    notes: 'Registro fotográfico del informe de resultados 2026 y del acto de lanzamiento en UTU Vista Linda.',
  },
  {
    priority: 'Fuente pública 5',
    institution: 'Medios Públicos',
    title: 'Cobertura periodística de Becas Butiá en educación media pública',
    url: 'https://mediospublicos.uy/',
    date: 'Noviembre 2025',
    credits: 'Medios Públicos Uruguay',
    notes: 'Fotografía documental de estudiante con material impreso oficial de las 70.000 Becas Butiá.',
  },
  {
    priority: 'Fuente pública 6',
    institution: 'El Popular',
    title: 'Cobertura informativa sobre el programa Becas Butiá 2026',
    url: 'https://elpopular.uy/',
    date: 'Febrero 2026',
    credits: 'Archivo fotográfico El Popular',
    notes: 'Detalle fotográfico de cuadernolas, códigos QR y señalética institucional 70 mil Becas Butiá.',
  },
];
