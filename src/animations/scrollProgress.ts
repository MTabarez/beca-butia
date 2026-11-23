/**
 * Pure scroll progress utilities for pinned scroll choreography.
 * No DOM dependencies — fully unit testable.
 */

export function clamp01(value: number): number {
  if (Number.isNaN(value)) return 0;
  if (value <= 0) return 0;
  if (value >= 1) return 1;
  return value;
}

export function lerp(start: number, end: number, t: number): number {
  const clamped = clamp01(t);
  return start + (end - start) * clamped;
}

export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  if (inMax === inMin) return outMin;
  const normalized = clamp01((value - inMin) / (inMax - inMin));
  return lerp(outMin, outMax, normalized);
}

export function easeOutCubic(t: number): number {
  const x = clamp01(t);
  return 1 - Math.pow(1 - x, 3);
}

export function easeInOutCubic(t: number): number {
  const x = clamp01(t);
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

/**
 * Computes normalized progress [0, 1] through a sticky/pinned scroll stage.
 * - Progress is 0 when the top of the wrapper sits at viewport top (sectionTop === 0).
 * - Progress is 1 when the bottom of the wrapper reaches the bottom of the viewport
 *   (sectionTop === -(sectionHeight - viewportHeight)).
 */
export function computePinnedProgress(
  sectionTop: number,
  sectionHeight: number,
  viewportHeight: number
): number {
  const scrollableDistance = sectionHeight - viewportHeight;
  if (scrollableDistance <= 0) return 0;
  return clamp01(-sectionTop / scrollableDistance);
}

export interface HeaderDirectionInput {
  scrollY: number;
  prevScrollY: number;
  currentVisible: boolean;
  threshold?: number;
}

export interface HeaderDirectionState {
  visible: boolean;
  isScrolled: boolean;
}

/**
 * Direction-sensitive header visibility state machine (Section 09):
 * - Visible & transparent at initial page top (scrollY <= 24).
 * - Hidden throughout downward scrolling past threshold.
 * - Reappears smoothly on upward scrolling regardless of current section.
 */
export function evaluateHeaderVisibility({
  scrollY,
  prevScrollY,
  currentVisible,
  threshold = 8,
}: HeaderDirectionInput): HeaderDirectionState {
  const safeScrollY = Math.max(0, scrollY);
  const isScrolled = safeScrollY > 24;

  if (safeScrollY <= 24) {
    return { visible: true, isScrolled: false };
  }

  const delta = safeScrollY - prevScrollY;

  if (delta > threshold && safeScrollY > 72) {
    return { visible: false, isScrolled: true };
  }

  if (delta < -threshold) {
    return { visible: true, isScrolled: true };
  }

  return { visible: currentVisible, isScrolled };
}
