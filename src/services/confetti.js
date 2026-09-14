import confetti from 'canvas-confetti';
import { playPartyPop } from './soundEffects';

/**
 * Big grand birthday explosion
 */
export function fireGrandConfetti() {
  playPartyPop();

  const count = 200;
  const defaults = {
    origin: { y: 0.7 },
    zIndex: 99999
  };

  function fire(particleRatio, opts) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio)
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
    colors: ['#f59e0b', '#ef4444', '#3b82f6', '#10b981', '#ec4899']
  });

  fire(0.2, {
    spread: 60,
    colors: ['#fbbf24', '#f87171', '#60a5fa', '#34d399', '#f472b6']
  });

  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 45
  });
}

/**
 * Gentle side cannon bursts
 */
export function fireSideCannons() {
  playPartyPop();
  const end = Date.now() + 1000;

  const colors = ['#f59e0b', '#38bdf8', '#ec4899', '#10b981'];

  (function frame() {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: colors,
      zIndex: 99999
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: colors,
      zIndex: 99999
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}

/**
 * Heart celebration burst for closing section
 */
export function fireHeartConfetti() {
  playPartyPop();
  confetti({
    particleCount: 40,
    spread: 80,
    origin: { y: 0.6 },
    shapes: ['star'],
    colors: ['#ec4899', '#f43f5e', '#fb7185', '#fda4af', '#f59e0b'],
    zIndex: 99999
  });
}
