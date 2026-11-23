import test from 'node:test';
import assert from 'node:assert/strict';
import { computePinnedProgress, evaluateHeaderVisibility } from './scrollProgress';
import { computeNearestSnapIndex, computeUnifiedHeroCollage } from './parallaxTimeline';

test('computePinnedProgress normalizes sticky scroll distance accurately', () => {
  assert.equal(computePinnedProgress(0, 4000, 1000), 0);
  assert.equal(computePinnedProgress(-1500, 4000, 1000), 0.5);
  assert.equal(computePinnedProgress(-3000, 4000, 1000), 1);
  assert.equal(computePinnedProgress(250, 4000, 1000), 0);
  assert.equal(computePinnedProgress(-4200, 4000, 1000), 1);
});

test('computeUnifiedHeroCollage contracts hero deeply from 100vw into central collage video', () => {
  const stageA = computeUnifiedHeroCollage(0);
  assert.equal(stageA.videoWidthPercent, 100);
  assert.equal(stageA.videoHeightVh, 100);
  assert.equal(stageA.videoRadiusPx, 0);
  assert.equal(stageA.heroHeadingOpacity, 1);

  const stageBMid = computeUnifiedHeroCollage(0.17);
  assert.ok(stageBMid.videoWidthPercent < 75 && stageBMid.videoWidthPercent > 65);
  assert.ok(stageBMid.videoRadiusPx > 10 && stageBMid.videoRadiusPx < 15);

  const stageC = computeUnifiedHeroCollage(0.36);
  assert.equal(stageC.videoWidthPercent, 42);
  assert.equal(stageC.videoHeightVh, 46);
  assert.equal(stageC.videoRadiusPx, 24);
  assert.equal(stageC.phraseOpacity, 1);
  assert.equal(stageC.upperLeftPhotoOpacity, 1);
});

test('computeUnifiedHeroCollage moves central video, floating photos, phrase and statement independently', () => {
  const c = computeUnifiedHeroCollage(0.36);
  const d = computeUnifiedHeroCollage(0.58);
  const e = computeUnifiedHeroCollage(0.96);

  const videoDelta = Math.abs(d.videoTranslateYVh - c.videoTranslateYVh);
  const phraseDelta = Math.abs(d.phraseYVh - c.phraseYVh);
  const ulDelta = Math.abs(d.upperLeftPhotoYVh - c.upperLeftPhotoYVh);
  const urDelta = Math.abs(d.upperRightPhotoYVh - c.upperRightPhotoYVh);

  // Central video exits upward faster than oversized phrase, and portraits have distinct velocities
  assert.ok(videoDelta > phraseDelta * 3);
  assert.notEqual(Math.round(ulDelta), Math.round(urDelta));

  // By end of timeline, oversized phrase has exited above viewport while statement is settled at center
  assert.ok(e.phraseYVh < -90);
  assert.equal(e.statementOpacity, 1);
  assert.equal(e.statementYVh, 0);
});

test('computeNearestSnapIndex projects inertial velocity cleanly within bounds', () => {
  assert.equal(computeNearestSnapIndex(0, 0, 420, 5), 0);
  assert.equal(computeNearestSnapIndex(180, 900, 420, 5), 1);
  assert.equal(computeNearestSnapIndex(1400, 2000, 420, 5), 4);
  assert.equal(computeNearestSnapIndex(50, -1500, 420, 5), 0);
});

test('evaluateHeaderVisibility hides on downward scroll, shows on upward scroll, and avoids threshold flicker', () => {
  assert.deepEqual(
    evaluateHeaderVisibility({ scrollY: 0, prevScrollY: 0, currentVisible: true }),
    { visible: true, isScrolled: false }
  );

  assert.deepEqual(
    evaluateHeaderVisibility({ scrollY: 420, prevScrollY: 360, currentVisible: true }),
    { visible: false, isScrolled: true }
  );

  assert.deepEqual(
    evaluateHeaderVisibility({ scrollY: 360, prevScrollY: 420, currentVisible: false }),
    { visible: true, isScrolled: true }
  );

  assert.deepEqual(
    evaluateHeaderVisibility({ scrollY: 424, prevScrollY: 420, currentVisible: true, threshold: 8 }),
    { visible: true, isScrolled: true }
  );
});
