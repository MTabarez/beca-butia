import { clamp01, easeInOutCubic, easeOutCubic, lerp, mapRange } from './scrollProgress';

/**
 * UNIFIED CONTINUOUS HERO -> CONTRACTING CENTRAL VIDEO -> FLOATING COLLAGE -> STATEMENT
 *
 * One continuous scroll-driven progression [0, 1] with zero component swaps:
 * - Stage A (p = 0.00): Full-screen 100vw x 100svh hero media, 0px radius, full headline.
 * - Stage B (p = 0.00 -> 0.34): Same media element progressively contracts from 100vw x 100svh
 *   down to the central editorial video frame (~42vw x ~42svh, 24px radius), receding from all edges.
 * - Stage C (p = 0.24 -> 0.56): Floating portrait photographs join around the contracted hero video
 *   while meaningful oversized institutional typography ("Conocé el programa") is integrated behind.
 * - Stage D (p = 0.44 -> 0.80): True independent multi-speed parallax:
 *     - Central hero video exits fastest upward (-115vh)
 *     - Floating portrait images travel at distinct independent velocities and clear before typography
 *     - Oversized institutional phrase moves slowest, stays exposed clearly, then exits top edge
 * - Stage E (p = 0.72 -> 0.96): Large centered Editorial Statement enters from below while
 *   the oversized typography leaves the top of the viewport.
 */
export interface UnifiedHeroCollageState {
  // Continuous hero-to-central-video media box
  videoWidthPercent: number;
  videoHeightVh: number;
  videoTopVh: number;
  videoRadiusPx: number;
  videoTranslateYVh: number;
  videoShadowOpacity: number;
  heroOverlayOpacity: number;
  heroHeadingOpacity: number;
  heroHeadingTranslateYPx: number;
  scrollHintOpacity: number;
  videoCtaOpacity: number;

  // Integrated oversized institutional phrase ("Conocé el programa")
  phraseOpacity: number;
  phraseYVh: number;

  // Three independently moving floating portrait photographs
  upperLeftPhotoYVh: number;
  upperLeftPhotoOpacity: number;
  upperRightPhotoYVh: number;
  upperRightPhotoOpacity: number;
  lowerLeftPhotoYVh: number;
  lowerLeftPhotoOpacity: number;

  // Centered Editorial Statement entering from below
  statementYVh: number;
  statementOpacity: number;
}

export function computeUnifiedHeroCollage(rawProgress: number): UnifiedHeroCollageState {
  const p = clamp01(rawProgress);

  // Stage A -> B: Deep contraction of the SAME video surface (p: 0.00 -> 0.34)
  const shrinkT = easeInOutCubic(mapRange(p, 0, 0.34, 0, 1));
  const videoWidthPercent = lerp(100, 42, shrinkT);
  const videoHeightVh = lerp(100, 46, shrinkT);
  const videoTopVh = lerp(0, 27, shrinkT);
  const videoRadiusPx = lerp(0, 24, shrinkT);
  const videoShadowOpacity = mapRange(p, 0.14, 0.34, 0, 1);

  // Hero headline, scrim, and scroll hint gracefully clear during first half of contraction
  const heroOverlayOpacity = lerp(0.54, 0, mapRange(p, 0.04, 0.24, 0, 1));
  const heroHeadingOpacity = mapRange(p, 0.02, 0.18, 1, 0);
  const heroHeadingTranslateYPx = lerp(0, -36, mapRange(p, 0, 0.22, 0, 1));
  const scrollHintOpacity = mapRange(p, 0, 0.12, 1, 0);

  // Video action pill appears gently once contracted into the collage
  const videoCtaOpacity = mapRange(p, 0.28, 0.38, 0, 1);

  // Stage D: Central hero video accelerates upward fastest (exits viewport first: p: 0.42 -> 0.74)
  const videoExitT = mapRange(p, 0.42, 0.74, 0, 1);
  const videoTranslateYVh = lerp(0, -118, videoExitT);

  // Integrated oversized institutional phrase ("Conocé el programa"):
  // Fades in behind the contracting video during Stage C, drifts slowly while exposed,
  // then physically rises out past the top edge (p: 0.66 -> 0.90)
  const phraseOpacity = mapRange(p, 0.22, 0.36, 0, 1);
  const phraseGentleDrift = mapRange(p, 0.24, 0.66, 8, -6);
  const phrasePhysicalExit = mapRange(p, 0.66, 0.90, 0, -108);
  const phraseYVh = phraseGentleDrift + phrasePhysicalExit;

  // Floating Portrait A (Upper Left): joins as hero contracts, travels medium-fast upward & clears before phrase exits
  const upperLeftPhotoOpacity = mapRange(p, 0.20, 0.34, 0, 1);
  const upperLeftPhotoYVh = lerp(42, -124, mapRange(p, 0.20, 0.76, 0, 1));

  // Floating Portrait B (Upper Right): joins slightly later, travels faster than upper-left
  const upperRightPhotoOpacity = mapRange(p, 0.24, 0.38, 0, 1);
  const upperRightPhotoYVh = lerp(52, -142, mapRange(p, 0.22, 0.72, 0, 1));

  // Floating Portrait C (Lower Left): enters lower flank, stays visible as video exits, clears before statement settles
  const lowerLeftPhotoOpacity = mapRange(p, 0.28, 0.42, 0, 1);
  const lowerLeftPhotoYVh = lerp(48, -138, mapRange(p, 0.26, 0.84, 0, 1));

  // Stage E: Centered Editorial Statement rises smoothly from below overlapping phrase exit (p: 0.72 -> 0.96)
  const statementT = easeOutCubic(mapRange(p, 0.72, 0.96, 0, 1));
  const statementYVh = lerp(62, 0, statementT);
  const statementOpacity = mapRange(p, 0.72, 0.88, 0, 1);

  return {
    videoWidthPercent,
    videoHeightVh,
    videoTopVh,
    videoRadiusPx,
    videoTranslateYVh,
    videoShadowOpacity,
    heroOverlayOpacity,
    heroHeadingOpacity,
    heroHeadingTranslateYPx,
    scrollHintOpacity,
    videoCtaOpacity,
    phraseOpacity,
    phraseYVh,
    upperLeftPhotoYVh,
    upperLeftPhotoOpacity,
    upperRightPhotoYVh,
    upperRightPhotoOpacity,
    lowerLeftPhotoYVh,
    lowerLeftPhotoOpacity,
    statementYVh,
    statementOpacity,
  };
}

/**
 * Pure inertial snap target calculation for fluid horizontal carousels.
 */
export function computeNearestSnapIndex(
  scrollLeft: number,
  velocityPxPerSec: number,
  cardStepPx: number,
  itemCount: number
): number {
  if (itemCount <= 1 || cardStepPx <= 0) return 0;
  // Project forward ~160ms of inertia for natural physical glide
  const projected = scrollLeft + velocityPxPerSec * 0.16;
  const rawIndex = Math.round(projected / cardStepPx);
  return Math.max(0, Math.min(itemCount - 1, rawIndex));
}
