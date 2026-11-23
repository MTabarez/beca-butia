import { imageAssets } from '../config/imageAssets';
import { resolveAssetUrl, type AppRoute, type SearchableItem } from '../utils/becaHelpers';

/**
 * ============================================================================
 * 1. OFFICIAL LINKS & SUPPORT CHANNELS (STABLE)
 * ============================================================================
 */
export const OFFICIAL_URLS = {
  sitioOficial: 'https://becas.edu.uy/',
  postulacion: 'https://becas.servicios.mec.gub.uy/',
  consulta: 'https://consultar.servicios.mec.gub.uy/',
  campanaMec: 'https://www.gub.uy/ministerio-educacion-cultura/comunicacion/campanas/becas-butia',
  portalButiaMec: 'https://www.gub.uy/ministerio-educacion-cultura/butia',
  guiaUsuario:
    'https://www.gub.uy/ministerio-educacion-cultura/comunicacion/publicaciones/guia-del-usuario-beca-butia',
  reglamento2026:
    'https://becas.edu.uy/sites/default/files/documentos/reglamento/Reglamento%20Becas%20Butia%CC%81%202026%20v3.pdf',
  anep: 'https://www.anep.edu.uy/',
  mec: 'https://www.gub.uy/ministerio-educacion-cultura/',
  formularioContacto: 'https://machform.ceibal.edu.uy/atencion-al-usuario/view.php?id=446536',
  email: 'mailto:butia@mec.gub.uy',
  emailLabel: 'butia@mec.gub.uy',
  telefonoFijo: '0800 2342',
  telefonoCelular: '*2342',
  horarioAtencion: 'Lunes a viernes de 08:00 a 18:00 horas',
  direccionAnep: 'Av. Libertador 1409, CP 11.100 · Montevideo, Uruguay',
} as const;

/**
 * ============================================================================
 * 2. ANNUAL CALL CONFIGURATION (EDIT ONLY THIS BLOCK FOR 2027 / 2028 / 2029)
 * ============================================================================
 */
export const ANNUAL_CALL_CONFIG = {
  targetYear: 2027,
  cycleTitle: 'Convocatoria 2027',
  applicationDatesStatus: 'Pendiente de confirmación oficial',
  applicationDatesNote:
    'Las fechas de apertura y cierre de la convocatoria 2027 se publicarán en los canales oficiales del MEC y ANEP una vez aprobada la nueva reglamentación.',
  eligibilityAgeStatus: 'Sujeto a reglamentación vigente 2027',
  eligibilityAgeNote:
    'Las comunicaciones oficiales de 2025 y 2026 contemplaron estudiantes de 11 a 21 años, mientras que guías de usuario anteriores registran otro límite etario. La franja definitiva para 2027 se confirmará al publicarse el reglamento oficial de la convocatoria.',
  amounts2027Confirmed: false,
  amountsUpdateNotice:
    'Los valores mostrados corresponden a la referencia histórica verificada de 2026 (distribuidos en 9 pagos mensuales entre abril y diciembre). Los montos vigentes para 2027 se actualizarán en esta sección una vez publicada la nueva reglamentación oficial.',
} as const;

/**
 * ============================================================================
 * 3. STABLE INSTITUTIONAL INFORMATION & 7 PARTICIPATING INSTITUTIONS
 * ============================================================================
 */
export const STABLE_INSTITUTIONAL_INFO = {
  brandName: 'Becas Butiá',
  country: 'Uruguay',
  tagline: 'Contigo caminamos los sueños',
  summary:
    'Política pública interinstitucional que combina apoyo económico y acompañamiento educativo para proteger las trayectorias en educación media pública.',
} as const;

export interface InstitutionalPartner {
  id: string;
  name: string;
  acronym: string;
  roleDescription: string;
  logoSrc: string;
  url: string;
}

/**
 * All 7 official institutions participating in Becas Butiá.
 * Authentic official DIAPO white SVG files retrieved from https://becas.edu.uy/.
 */
export const INSTITUTIONAL_PARTNERS_LOGOS: InstitutionalPartner[] = [
  {
    id: 'anep',
    name: 'Administración Nacional de Educación Pública',
    acronym: 'ANEP',
    roleDescription:
      'Acompaña las trayectorias en liceos públicos, escuelas técnicas de UTU, Áreas Pedagógicas y escuelas rurales con Ciclo Básico.',
    logoSrc: resolveAssetUrl('/assets/brand/institutional-logos/anep.svg'),
    url: 'https://www.anep.edu.uy/',
  },
  {
    id: 'mec',
    name: 'Ministerio de Educación y Cultura',
    acronym: 'MEC',
    roleDescription:
      'Coordina la política nacional de becas, gestiona el portal de postulación y consultas, y brinda atención a estudiantes y familias.',
    logoSrc: resolveAssetUrl('/assets/brand/institutional-logos/mec.svg'),
    url: 'https://www.gub.uy/ministerio-educacion-cultura/',
  },
  {
    id: 'brou',
    name: 'Banco de la República Oriental del Uruguay',
    acronym: 'BROU',
    roleDescription:
      'Articula los mecanismos de acreditación y cobro bancarizado de los apoyos económicos conforme a las condiciones de cada convocatoria.',
    logoSrc: resolveAssetUrl('/assets/brand/institutional-logos/brou.svg'),
    url: 'https://www.brou.com.uy/',
  },
  {
    id: 'bps',
    name: 'Banco de Previsión Social',
    acronym: 'BPS',
    roleDescription:
      'Aporta información y articulación con el sistema de protección social para respaldar el proceso interinstitucional.',
    logoSrc: resolveAssetUrl('/assets/brand/institutional-logos/bps.svg'),
    url: 'https://www.bps.gub.uy/',
  },
  {
    id: 'ceibal',
    name: 'Ceibal',
    acronym: 'CEIBAL',
    roleDescription:
      'Integra capacidades tecnológicas, soporte de identidad digital educativa y canales de acompañamiento a la comunidad estudiantil.',
    logoSrc: resolveAssetUrl('/assets/brand/institutional-logos/ceibal.svg'),
    url: 'https://ceibal.edu.uy/',
  },
  {
    id: 'mides-inju',
    name: 'Ministerio de Desarrollo Social e Instituto Nacional de la Juventud',
    acronym: 'MIDES · INJU',
    roleDescription:
      'MIDES aporta indicadores socioeconómicos e integración social; INJU impulsa políticas de cercanía y participación juvenil en todo el país.',
    logoSrc: resolveAssetUrl('/assets/brand/institutional-logos/mides-inju.svg'),
    url: 'https://www.gub.uy/ministerio-desarrollo-social/',
  },
];

/**
 * Individual descriptive list of all 7 participating institutions for the dedicated Institutional Network section.
 */
export const SEVEN_INSTITUTIONS_DETAIL = [
  {
    acronym: 'ANEP',
    fullName: 'Administración Nacional de Educación Pública',
    description:
      'Articula con los centros de educación media pública (Secundaria, UTU, Áreas Pedagógicas y escuelas rurales) el seguimiento de las trayectorias.',
    url: 'https://www.anep.edu.uy/',
  },
  {
    acronym: 'MEC',
    fullName: 'Ministerio de Educación y Cultura',
    description:
      'Coordina el programa a través de la Dirección Nacional de Educación, administra los portales de postulación y consulta, y atiende consultas.',
    url: 'https://www.gub.uy/ministerio-educacion-cultura/',
  },
  {
    acronym: 'BROU',
    fullName: 'Banco de la República Oriental del Uruguay',
    description:
      'Facilita los canales financieros y medios de cobro para la acreditación ordenada de los pagos mensuales de la beca.',
    url: 'https://www.brou.com.uy/',
  },
  {
    acronym: 'BPS',
    fullName: 'Banco de Previsión Social',
    description:
      'Contribuye con información del sistema de seguridad social para complementar la evaluación socioeconómica de los hogares.',
    url: 'https://www.bps.gub.uy/',
  },
  {
    acronym: 'CEIBAL',
    fullName: 'Ceibal',
    description:
      'Brinda infraestructura digital, soporte a usuarios y herramientas que fortalecen la inclusión educativa y tecnológica.',
    url: 'https://ceibal.edu.uy/',
  },
  {
    acronym: 'INJU',
    fullName: 'Instituto Nacional de la Juventud',
    description:
      'Acompaña la estrategia interinstitucional con perspectiva juvenil, territorial y de participación de adolescentes y jóvenes.',
    url: 'https://www.gub.uy/ministerio-desarrollo-social/inju',
  },
  {
    acronym: 'MIDES',
    fullName: 'Ministerio de Desarrollo Social',
    description:
      'Aporta criterios e indicadores socioeconómicos que permiten priorizar a las y los estudiantes con mayor necesidad de apoyo.',
    url: 'https://www.gub.uy/ministerio-desarrollo-social/',
  },
] as const;

/**
 * ============================================================================
 * 4. HISTORICAL & PROJECTED IMPACT STATISTICS (YEAR EXPLICITLY TAGGED)
 * ============================================================================
 */
export interface ImpactMetric {
  id: string;
  value: string;
  yearTag: string;
  label: string;
  caption: string;
  classification: 'Resultado verificado 2026' | 'Meta proyectada 2029' | 'Red vigente';
}

export const HISTORICAL_STATS: ImpactMetric[] = [
  {
    id: 'becas-2026',
    value: '20.958',
    yearTag: 'Año 2026',
    label: 'Becas otorgadas en 2026.',
    caption:
      'Cifra oficial presentada por el MEC y Presidencia en el informe de resultados de Becas Butiá 2026 (junio de 2026).',
    classification: 'Resultado verificado 2026',
  },
  {
    id: 'meta-2029',
    value: '70.000',
    yearTag: 'Proyección 2029',
    label: 'Estudiantes como meta de alcance para 2029.',
    caption:
      'Objetivo quinquenal de ampliación progresiva del programa; representa una meta proyectada y no un resultado ya alcanzado.',
    classification: 'Meta proyectada 2029',
  },
  {
    id: 'instituciones',
    value: '7 instituciones',
    yearTag: 'Articulación pública',
    label: 'Organismos públicos que articulan la implementación del programa.',
    caption:
      'ANEP, MEC, BROU, BPS, Ceibal, INJU y MIDES coordinados para proteger las trayectorias educativas.',
    classification: 'Red vigente',
  },
];

/**
 * ============================================================================
 * 5. PROGRAM PILLARS (SECTION 03) & CAROUSEL CARDS
 * ============================================================================
 */
export interface ProgramBlock {
  id: string;
  number: string;
  title: string;
  description: string;
  bgVar: string;
  imageSrc: string;
  imageAlt: string;
  route: AppRoute;
  hash: string;
}

export const PROGRAM_VISUAL_BLOCKS: ProgramBlock[] = [
  {
    id: 'apoyo-economico',
    number: '01',
    title: 'Apoyo económico',
    description:
      'Una ayuda destinada a acompañar las necesidades vinculadas a la continuidad educativa.',
    bgVar: 'var(--color-butia-cyan)',
    imageSrc: imageAssets.cardImageOne,
    imageAlt:
      'Comunidad educativa y estudiantes en actividad oficial de Becas Butiá (imagen temporal de referencia — Presidencia de la República).',
    route: '/conoce-la-beca',
    hash: '#apoyo-economico-detalle',
  },
  {
    id: 'acompanamiento-educativo',
    number: '02',
    title: 'Acompañamiento educativo',
    description:
      'Una propuesta que busca fortalecer la asistencia, la participación y el vínculo con el centro educativo.',
    bgVar: 'var(--color-butia-magenta)',
    imageSrc: imageAssets.cardImageTwo,
    imageAlt:
      'Estudiantes y docentes en actividad oficial de Becas Butiá (imagen temporal de referencia — Presidencia de la República).',
    route: '/conoce-la-beca',
    hash: '#acuerdo-detalle',
  },
  {
    id: 'proteccion-trayectorias',
    number: '03',
    title: 'Protección de las trayectorias',
    description:
      'Una política orientada a reducir los factores que pueden dificultar la continuidad de los estudios.',
    bgVar: 'var(--color-butia-yellow)',
    imageSrc: imageAssets.cardImageThree,
    imageAlt:
      'Comunidad educativa uruguaya en UTU de Vista Linda (imagen temporal de referencia — Presidencia de la República).',
    route: '/conoce-la-beca',
    hash: '#para-que-existe',
  },
  {
    id: 'red-interinstitucional',
    number: '04',
    title: 'Red pública articulada',
    description:
      'Siete organismos del Estado trabajando juntos para ampliar oportunidades en todo el país.',
    bgVar: 'var(--color-butia-navy)',
    imageSrc: imageAssets.cardImageFour,
    imageAlt:
      'Participantes del lanzamiento de Becas Butiá en UTU de Vista Linda (imagen temporal de referencia — Presidencia de la República).',
    route: '/conoce-la-beca',
    hash: '#instituciones-detalle',
  },
];

/**
 * ============================================================================
 * 6. EDUCATIONAL MODALITIES (SECTION 05 & /requisitos)
 * ============================================================================
 */
export interface EligibilityPathway {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  bgColor: string;
  imageSrc: string;
  imageAlt: string;
}

export const ELIGIBILITY_PATHWAYS: EligibilityPathway[] = [
  {
    id: 'secundaria',
    title: 'Educación Secundaria',
    subtitle: 'Liceos públicos · DGES',
    description: 'Estudiantes de liceos públicos de Educación Media Básica y Media Superior.',
    bgColor: 'var(--color-butia-cyan)',
    imageSrc: imageAssets.modalitySecundaria,
    imageAlt: 'Estudiantes de educación media pública caminando con cuadernolas de Becas Butiá — ANEP.',
  },
  {
    id: 'utu',
    title: 'Educación Técnico Profesional',
    subtitle: 'DGETP — UTU',
    description:
      'Estudiantes de escuelas técnicas, agrarias, Centros Educativos Asociados (CEA) y Centros Educativos Comunitarios (CEC) de UTU.',
    bgColor: 'var(--color-butia-magenta)',
    imageSrc: imageAssets.modalityUtu,
    imageAlt: 'Fachada de la Escuela Técnica Vista Linda de UTU con pabellón nacional — ANEP.',
  },
  {
    id: 'uruguay-estudia',
    title: 'Programa Uruguay Estudia',
    subtitle: 'Ciclo Básico y Bachillerato · PUE',
    description: 'Estudiantes que cursan Ciclo Básico o Bachillerato dentro del programa.',
    bgColor: 'var(--color-butia-yellow)',
    imageSrc: imageAssets.modalityPue,
    imageAlt: 'Estudiantes de educación media pública mostrando cuadernolas de Becas Butiá — DGES.',
  },
  {
    id: 'areas-pedagogicas',
    title: 'Áreas Pedagógicas',
    subtitle: 'Acompañamiento educativo integral',
    description: 'Estudiantes que desarrollan sus trayectorias educativas en esta modalidad.',
    bgColor: 'var(--color-butia-navy)',
    imageSrc: imageAssets.modalityAreasPedagogicas,
    imageAlt: 'Joven participante exponiendo en encuentro oficial de Becas Butiá — ANEP.',
  },
  {
    id: 'educacion-rural',
    title: 'Educación rural',
    subtitle: 'Escuelas rurales con Ciclo Básico',
    description: 'Estudiantes de escuelas rurales públicas que cuentan con Ciclo Básico.',
    bgColor: 'var(--color-neutral-100)',
    imageSrc: imageAssets.modalityRural,
    imageAlt: 'Estudiante sosteniendo cuadernola informativa de Becas Butiá — Medios Públicos.',
  },
];

/**
 * ============================================================================
 * 7. HISTORICAL REFERENCE SCHOLARSHIP AMOUNTS (2026)
 * ============================================================================
 */
export interface ScholarshipAmountTier {
  id: string;
  level: string;
  gradeLabel: string;
  annualAmount2026: number;
  surfaceColor: string;
  note: string;
}

export const SCHOLARSHIP_AMOUNTS_CONFIG = {
  referenceYear: 2026,
  installmentsCount: 9,
  installmentsPeriod: 'abril a diciembre',
  tiers: [
    {
      id: 'emb',
      level: 'Educación Media Básica',
      gradeLabel: 'Ciclo Básico',
      annualAmount2026: 13000,
      surfaceColor: 'var(--color-butia-cyan)',
      note: 'Referencia histórica 2026 para Educación Media Básica.',
    },
    {
      id: 'ems-1',
      level: 'Educación Media Superior — 1.º',
      gradeLabel: 'Primer grado de Media Superior',
      annualAmount2026: 17000,
      surfaceColor: 'var(--color-butia-magenta)',
      note: 'Referencia histórica 2026 para el primer grado de Educación Media Superior.',
    },
    {
      id: 'ems-2',
      level: 'Educación Media Superior — 2.º',
      gradeLabel: 'Segundo grado de Media Superior',
      annualAmount2026: 21000,
      surfaceColor: 'var(--color-butia-yellow)',
      note: 'Referencia histórica 2026 para el segundo grado de Educación Media Superior.',
    },
    {
      id: 'ems-3',
      level: 'Educación Media Superior — 3.º',
      gradeLabel: 'Tercer grado de Media Superior',
      annualAmount2026: 25000,
      surfaceColor: 'var(--color-butia-navy)',
      note: 'Referencia histórica 2026 para el tercer grado de Educación Media Superior.',
    },
  ] as ScholarshipAmountTier[],
};

/**
 * ============================================================================
 * 8. APPLICATION STEPS (SECTION 07 & /como-postularte)
 * ============================================================================
 */
export interface ApplicationStep {
  number: string;
  title: string;
  description: string;
  detail: string;
}

export const APPLICATION_STEPS: ApplicationStep[] = [
  {
    number: '01',
    title: 'Informate',
    description:
      'Revisá los requisitos, las modalidades educativas contempladas y las condiciones de la convocatoria vigente.',
    detail:
      'Verificá que contás con tu documento de identidad vigente, los datos de las personas integrantes de tu hogar y el contacto de una persona adulta referente.',
  },
  {
    number: '02',
    title: 'Completá tu solicitud',
    description:
      'Ingresá al sistema oficial y completá el formulario con los datos personales, familiares y educativos solicitados.',
    detail:
      'Podés guardar tus avances y retomar la carga antes del cierre del plazo. Recordá confirmar el envío definitivo cuando todas las secciones figuren completas.',
  },
  {
    number: '03',
    title: 'Consultá el resultado',
    description:
      'Una vez finalizado el proceso de selección, consultá el estado de tu solicitud a través del portal oficial.',
    detail:
      'En consultar.servicios.mec.gub.uy podrás verificar si tu solicitud fue asignada y conocer la información sobre tus pagos.',
  },
];

/**
 * Detailed steps for /como-postularte strictly grounded in the official MEC Guía del Usuario.
 */
export const USER_GUIDE_STEPS = [
  {
    number: '01',
    id: 'elegibilidad',
    title: 'Verificá tu elegibilidad',
    summary:
      'Antes de iniciar el trámite, confirmá que tu modalidad educativa y las condiciones de la convocatoria vigente correspondan a tu situación.',
    details: [
      'Revisá las cinco modalidades de educación media pública contempladas (Secundaria, UTU, Programa Uruguay Estudia, Áreas Pedagógicas y escuelas rurales con Ciclo Básico).',
      'Consultá la franja etaria y condiciones específicas publicadas en el reglamento vigente al abrirse el llamado.',
    ],
  },
  {
    number: '02',
    id: 'informacion-necesaria',
    title: 'Reuní la información necesaria',
    summary:
      'Tener los documentos y datos a mano agiliza la carga del formulario en pocos minutos.',
    details: [
      'Documento de identidad del estudiante (Cédula de Identidad uruguaya, documento extranjero o pasaporte), tal como figura en el documento.',
      'Correo electrónico activo para recibir comunicaciones y la contraseña inicial de acceso.',
      'Número de documento e información básica de las personas que integran el núcleo familiar u hogar.',
      'Datos de contacto de una persona adulta referente y datos del centro educativo público donde cursás o proyectás cursar.',
    ],
  },
  {
    number: '03',
    id: 'registro',
    title: 'Registro o ingreso con datos previos',
    summary:
      'Ingresá al sistema oficial de Becas Butiá (becas.servicios.mec.gub.uy) según sea tu primera postulación o una nueva solicitud.',
    details: [
      'Si es tu primera vez: registrate ingresando tus datos básicos exactamente como figuran en tu documento de identidad, y leé y aceptá el Acuerdo Educativo y la cláusula de consentimiento informado.',
      'Si ya te postulaste en años anteriores: la renovación no es automática. Tus datos previos pueden estar precargados, pero debés iniciar sesión, revisarlos, actualizarlos y volver a enviar la solicitud.',
      'El usuario de acceso corresponde al número de documento de identidad (sin puntos ni guiones) y la contraseña inicial se envía al correo electrónico registrado.',
    ],
  },
  {
    number: '04',
    id: 'completar-formulario',
    title: 'Completá el formulario por secciones',
    summary:
      'El formulario en línea está organizado en pestañas o categorías (datos personales, núcleo familiar, centro educativo, entre otras).',
    details: [
      'Completá cada sección con información veraz y actualizada.',
      'No es obligatorio finalizar todo en una sola sesión: el sistema te permite avanzar por etapas.',
    ],
  },
  {
    number: '05',
    id: 'guardar-y-enviar',
    title: 'Guardá tus avances y confirmá el envío',
    summary:
      'Asegurate de guardar cada apartado y realizar el envío definitivo dentro del plazo oficial de la convocatoria.',
    details: [
      'Podés hacer clic en «Guardar», salir del sistema y volver a ingresar las veces que necesites mientras el período de inscripción permanezca abierto.',
      'Cuando los recuadros de las categorías están completos y correctos, cambian a color verde y muestran el aviso «Este formulario está completo».',
      'Revisá todos los campos y confirmá el envío definitivo para que tu solicitud participe del proceso de selección.',
    ],
  },
  {
    number: '06',
    id: 'consultar-resultados',
    title: 'Consultá el resultado en el portal oficial',
    summary:
      'Finalizado el proceso de evaluación y selección, verificá el estado de tu solicitud en línea.',
    details: [
      'Ingresá a consultar.servicios.mec.gub.uy para conocer la resolución, el estado de habilitación y la información sobre cobros.',
    ],
  },
] as const;

/**
 * ============================================================================
 * 9. FAQ ITEMS (SECTION 10 — EXACT OFFICIAL QUESTIONS & ANSWERS)
 * ============================================================================
 */
export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  extraLines?: string[];
  highlightLink?: { label: string; href: string };
}

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'que-es',
    question: '¿Qué es la Beca Butiá?',
    answer:
      'Es un apoyo económico dirigido a estudiantes de educación media pública, integrado a una política que busca favorecer la continuidad y culminación de las trayectorias educativas.',
  },
  {
    id: 'quienes-pueden',
    question: '¿Quiénes pueden solicitarla?',
    answer:
      'Está dirigida a estudiantes que cumplen las condiciones de edad, modalidad educativa y demás requisitos establecidos en la convocatoria vigente.',
  },
  {
    id: 'renovacion',
    question: '¿Puedo solicitarla si ya recibí una beca anteriormente?',
    answer:
      'Sí, pero la renovación no es automática. Es necesario volver a realizar la solicitud según las condiciones de la convocatoria correspondiente.',
  },
  {
    id: 'como-postular',
    question: '¿Cómo se realiza la postulación?',
    answer:
      'A través del sistema oficial de Becas Butiá, completando el formulario de solicitud.',
    highlightLink: {
      label: 'Ingresar al portal de becas',
      href: OFFICIAL_URLS.postulacion,
    },
  },
  {
    id: 'seleccion',
    question: '¿Cómo se determina quién recibe la beca?',
    answer:
      'El proceso considera información socioeconómica y educativa, de acuerdo con los criterios oficiales de selección.',
  },
  {
    id: 'pagos',
    question: '¿Cómo se realizan los pagos?',
    answer:
      'Los pagos se realizan según la modalidad y el calendario establecidos para cada convocatoria.',
  },
  {
    id: 'consultar-estado',
    question: '¿Dónde puedo consultar el estado de mi solicitud?',
    answer: 'En el portal oficial de consulta de becas.',
    highlightLink: {
      label: 'Ir al portal de consulta oficial',
      href: OFFICIAL_URLS.consulta,
    },
  },
  {
    id: 'asistencia',
    question: '¿Dónde puedo recibir asistencia?',
    answer: 'El MEC dispone de los siguientes canales oficiales de atención:',
    extraLines: [
      'Teléfono: 0800 2342',
      'Celular: *2342',
      'Horario publicado: lunes a viernes de 08:00 a 18:00 horas.',
      'Correo electrónico: butia@mec.gub.uy',
    ],
    highlightLink: {
      label: 'Abrir formulario oficial de atención al usuario',
      href: OFFICIAL_URLS.formularioContacto,
    },
  },
];

/**
 * ============================================================================
 * 10. FOOTER NAVIGATION & DESKTOP HOVER PREVIEW (SINGLE REFERENCE IMAGE)
 * ============================================================================
 */
export interface FooterPreviewLink {
  id: string;
  label: string;
  route?: AppRoute;
  hash?: string;
  externalUrl?: string;
  previewImageSrc: string;
  previewImageAlt: string;
  previewCaption: string;
}

const FOOTER_IMG_ALT =
  'Comunidad educativa y estudiantes en actividad oficial de Becas Butiá — Presidencia de la República.';

export const FOOTER_COLUMNS: {
  programa: FooterPreviewLink[];
  informacion: FooterPreviewLink[];
  conectate: FooterPreviewLink[];
} = {
  programa: [
    {
      id: 'conoce',
      label: 'Conocé la beca',
      route: '/conoce-la-beca',
      previewImageSrc: imageAssets.footerPreview,
      previewImageAlt: 'Estudiantes sosteniendo cuadernolas oficiales de Becas Butiá — DGES.',
      previewCaption: 'Apoyo económico y acompañamiento para proteger las trayectorias educativas.',
    },
    {
      id: 'como-postularte',
      label: 'Cómo postularte',
      route: '/como-postularte',
      previewImageSrc: imageAssets.footerPreviewPostulacion,
      previewImageAlt: 'Materiales informativos y cuadernolas de las 70.000 Becas Butiá — El Popular.',
      previewCaption: 'Guía paso a paso basada en la documentación oficial del MEC.',
    },
    {
      id: 'requisitos',
      label: 'Requisitos',
      route: '/requisitos',
      previewImageSrc: imageAssets.footerPreviewRequisitos,
      previewImageAlt: 'Escuela Técnica Vista Linda de UTU con pabellón nacional — ANEP.',
      previewCaption: 'Modalidades educativas habilitadas, criterios y condiciones de renovación.',
    },
    {
      id: 'faq',
      label: 'Preguntas frecuentes',
      route: '/',
      hash: '#preguntas-frecuentes',
      previewImageSrc: imageAssets.footerPreviewFaq,
      previewImageAlt: 'Estudiantes de educación media pública en encuentro de Becas Butiá — ANEP.',
      previewCaption: 'Respuestas claras sobre postulación, pagos y canales de asistencia.',
    },
  ],
  informacion: [
    {
      id: 'postulacion',
      label: 'Portal de becas',
      externalUrl: OFFICIAL_URLS.postulacion,
      previewImageSrc: imageAssets.footerPreviewPostulacion,
      previewImageAlt: 'Cuadernolas oficiales y acceso QR del programa Becas Butiá — El Popular.',
      previewCaption: 'Accedé al sistema oficial de Becas Butiá para completar tu solicitud.',
    },
    {
      id: 'consultar',
      label: 'Consultar mi beca',
      externalUrl: OFFICIAL_URLS.consulta,
      previewImageSrc: imageAssets.footerPreviewConsulta,
      previewImageAlt: 'Señalética oficial del programa Becas Butiá y el MEC — Presidencia de la República.',
      previewCaption: 'Verificá el estado de tu solicitud y la información de pagos.',
    },
    {
      id: 'guia',
      label: 'Portal Butiá en MEC',
      externalUrl: OFFICIAL_URLS.portalButiaMec,
      previewImageSrc: imageAssets.footerPreviewGuia,
      previewImageAlt: 'Estudiante con cuadernola oficial de Becas Butiá — Medios Públicos.',
      previewCaption: 'Información institucional y documentación oficial del MEC.',
    },
    {
      id: 'contacto',
      label: 'Formulario de contacto',
      externalUrl: OFFICIAL_URLS.formularioContacto,
      previewImageSrc: imageAssets.footerPreviewContacto,
      previewImageAlt: 'Comunidad educativa reunida en la presentación de Becas Butiá — ANEP.',
      previewCaption: 'Atención al usuario: 0800 2342 · *2342 · Lunes a viernes 08:00 a 18:00.',
    },
  ],
  conectate: [
    {
      id: 'sitio-oficial',
      label: 'Sitio oficial becas.edu.uy',
      externalUrl: OFFICIAL_URLS.sitioOficial,
      previewImageSrc: imageAssets.footerPreviewSitio,
      previewImageAlt: 'Estudiantes y autoridades en el lanzamiento de Becas Butiá — MEC.',
      previewCaption: 'Portal institucional oficial de las Becas Butiá en Uruguay.',
    },
    {
      id: 'campana-mec',
      label: 'Campaña oficial (gub.uy)',
      externalUrl: OFFICIAL_URLS.campanaMec,
      previewImageSrc: imageAssets.footerPreviewCampana,
      previewImageAlt: 'Estudiantes en pasillo de centro educativo público — ANEP.',
      previewCaption: 'Comunicados oficiales y materiales de campaña del MEC.',
    },
    {
      id: 'anep-web',
      label: 'Portal ANEP',
      externalUrl: OFFICIAL_URLS.anep,
      previewImageSrc: imageAssets.footerPreviewAnep,
      previewImageAlt: 'Estudiantes y comunidad educativa junto a autoridades de ANEP — DGES.',
      previewCaption: 'Administración Nacional de Educación Pública de Uruguay.',
    },
  ],
};

/**
 * ============================================================================
 * 11. SEARCH INDEX ACROSS ALL 4 ROUTES
 * ============================================================================
 */
export const SEARCH_INDEX: SearchableItem[] = [
  {
    id: 's-conoce',
    title: 'Conocé las Becas Butiá',
    excerpt:
      'Explicación completa del programa: qué es, para qué existe, modalidades, apoyo económico, acuerdo educativo, selección e instituciones.',
    category: 'Programa',
    route: '/conoce-la-beca',
  },
  {
    id: 's-como-postularte',
    title: 'Tu solicitud, paso a paso (Guía de postulación)',
    excerpt:
      'Información necesaria, registro en el sistema oficial, guardado parcial del formulario, verificación de estado completo y envío.',
    category: 'Cómo postularte',
    route: '/como-postularte',
  },
  {
    id: 's-requisitos',
    title: 'Requisitos, modalidades y criterios de selección',
    excerpt:
      'Secundaria, UTU, Uruguay Estudia, Áreas Pedagógicas, Educación rural, condiciones de edad, acuerdo educativo y renovación.',
    category: 'Requisitos',
    route: '/requisitos',
  },
  {
    id: 's-montos',
    title: 'Montos de referencia 2026',
    excerpt:
      'Educación Media Básica $ 13.000 · Media Superior 1.º $ 17.000 · 2.º $ 21.000 · 3.º $ 25.000 anuales en 9 cuotas mensuales (abril–diciembre).',
    category: 'Apoyo económico',
    route: '/',
    hash: '#montos',
  },
  {
    id: 's-acuerdo',
    title: 'Acuerdo educativo',
    excerpt:
      'Un compromiso que acompaña tu trayectoria: asistencia regular, cumplimiento de actividades y participación en el proceso formativo.',
    category: 'Acompañamiento',
    route: '/',
    hash: '#acuerdo-educativo',
  },
  {
    id: 's-red',
    title: 'Red de 7 instituciones participantes',
    excerpt: 'ANEP, MEC, BROU, BPS, Ceibal, INJU y MIDES trabajando en conjunto en todo Uruguay.',
    category: 'Instituciones',
    route: '/',
    hash: '#red-institucional',
  },
  {
    id: 's-consulta',
    title: 'Consultar mi beca en el portal oficial',
    excerpt: 'Accedé a consultar.servicios.mec.gub.uy para conocer el estado de tu solicitud.',
    category: 'Portal oficial',
    route: '/',
    externalUrl: OFFICIAL_URLS.consulta,
  },
  ...FAQ_ITEMS.map((faq) => ({
    id: `s-faq-${faq.id}`,
    title: faq.question,
    excerpt: faq.answer,
    category: 'Preguntas frecuentes',
    route: '/' as AppRoute,
    hash: '#preguntas-frecuentes',
  })),
];
