import Lenis from 'lenis';
import { gsap, ScrollTrigger } from './gsap';

let lenisInstance: Lenis | null = null;

export function initLenis(prefersReducedMotion: boolean): () => void {
  if (prefersReducedMotion) {
    if (lenisInstance) {
      lenisInstance.destroy();
      lenisInstance = null;
    }
    return () => {};
  }

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const lenis = new Lenis({
    duration: isMobile ? 0.85 : 1.15,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 0.95,
    touchMultiplier: 1.25,
  });

  lenisInstance = lenis;

  // Sincronizado com ScrollTrigger.update via lenis.on('scroll', ScrollTrigger.update)
  lenis.on('scroll', ScrollTrigger.update);

  const updateTicker = (time: number) => {
    lenis.raf(time * 1000);
  };

  gsap.ticker.add(updateTicker);
  gsap.ticker.lagSmoothing(0);

  return () => {
    gsap.ticker.remove(updateTicker);
    lenis.destroy();
    lenisInstance = null;
  };
}

export function getLenis(): Lenis | null {
  return lenisInstance;
}

export function scrollToSection(target: string | number | HTMLElement) {
  let resolved: string | number | HTMLElement = target;
  if (typeof target === 'string') {
    const el = document.querySelector<HTMLElement>(target);
    if (el) {
      resolved = el.parentElement?.classList.contains('pin-spacer') ? el.parentElement : el;
    }
  } else if (target instanceof HTMLElement) {
    resolved = target.parentElement?.classList.contains('pin-spacer') ? target.parentElement : target;
  }

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  if (lenisInstance) {
    lenisInstance.scrollTo(resolved, {
      duration: isMobile ? 0.85 : 1.2,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
    });
  } else {
    if (typeof resolved === 'number') {
      window.scrollTo({ top: resolved, behavior: 'smooth' });
    } else if (typeof resolved === 'string') {
      const el = document.querySelector(resolved);
      el?.scrollIntoView({ behavior: 'smooth' });
    } else {
      resolved.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
