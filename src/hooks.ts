import { useEffect, useRef, useState } from 'react';

const openingAnimationKey = 'portfolio-opening-animation-v4-played';
export const openingAnimationDuration = 3600;
export const openingRevealStart = 2900;

function getPrefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function useAnchorScroll() {
  useEffect(() => {
    let timeout = 0;

    const scrollToHash = (behavior: ScrollBehavior = 'auto') => {
      const hash = window.location.hash.slice(1);
      if (!hash) return;

      const target = document.getElementById(decodeURIComponent(hash));
      if (!target) return;

      const header = document.querySelector<HTMLElement>('.site-header');
      const headerOffset = header ? Math.ceil(header.getBoundingClientRect().bottom + 18) : 112;
      const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;

      window.scrollTo({
        top: Math.max(0, top),
        behavior,
      });
    };

    const scheduleScroll = (behavior: ScrollBehavior = 'auto') => {
      window.clearTimeout(timeout);
      timeout = window.setTimeout(() => scrollToHash(behavior), 80);
    };

    scheduleScroll();

    const onHashChange = () => scheduleScroll('smooth');
    window.addEventListener('hashchange', onHashChange);

    return () => {
      window.clearTimeout(timeout);
      window.removeEventListener('hashchange', onHashChange);
    };
  }, []);
}

export function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(getPrefersReducedMotion);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setPrefersReducedMotion(query.matches);
    update();
    query.addEventListener('change', update);

    return () => query.removeEventListener('change', update);
  }, []);

  return prefersReducedMotion;
}

export function useOpeningAnimation(prefersReducedMotion: boolean) {
  const hasOpened = useRef(false);
  const returnFocus = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(() => {
    if (prefersReducedMotion || typeof window === 'undefined') return false;

    try {
      return window.sessionStorage.getItem(openingAnimationKey) !== 'true';
    } catch {
      return true;
    }
  });

  useEffect(() => {
    if (!isVisible) {
      if (hasOpened.current) {
        const target = returnFocus.current?.isConnected
          ? returnFocus.current
          : document.getElementById('main');
        target?.focus({ preventScroll: true });
        hasOpened.current = false;
      }
      return;
    }

    if (prefersReducedMotion) {
      setIsVisible(false);
      return;
    }

    document.body.dataset.introPlaying = 'true';
    hasOpened.current = true;

    try {
      window.sessionStorage.setItem(openingAnimationKey, 'true');
    } catch {
      // Storage can be unavailable in restricted browser modes; the animation still works.
    }

    // Start the hero when the two opening panels begin to part.
    const revealTimeout = window.setTimeout(() => {
      document.body.dataset.introRevealing = 'true';
    }, openingRevealStart);
    const timeout = window.setTimeout(() => setIsVisible(false), openingAnimationDuration);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsVisible(false);
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.clearTimeout(revealTimeout);
      window.clearTimeout(timeout);
      window.removeEventListener('keydown', onKeyDown);
      delete document.body.dataset.introPlaying;
      delete document.body.dataset.introRevealing;
    };
  }, [isVisible, prefersReducedMotion]);

  return {
    isVisible: isVisible && !prefersReducedMotion,
    dismiss: () => setIsVisible(false),
    replay: () => {
      if (prefersReducedMotion) return;
      returnFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      setIsVisible(true);
    },
  };
}

export function useReveal<T extends HTMLElement>(prefersReducedMotion: boolean) {
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(prefersReducedMotion);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.18, rootMargin: '0px 0px -8% 0px' },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  return { ref, isVisible };
}

export function useScrollVariables(prefersReducedMotion: boolean) {
  useEffect(() => {
    if (prefersReducedMotion) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      document.documentElement.style.setProperty('--scroll-shift', `${window.scrollY * 0.04}px`);
      document.documentElement.style.setProperty('--hero-parallax', `${window.scrollY * -0.018}px`);
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [prefersReducedMotion]);
}

export function usePointerParallax(prefersReducedMotion: boolean) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (prefersReducedMotion) return;

    let frame = 0;
    const next = { x: 0, y: 0 };

    const update = () => {
      frame = 0;
      setPosition({ x: next.x, y: next.y });
    };

    const onPointerMove = (event: PointerEvent) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 18;
      const y = (event.clientY / window.innerHeight - 0.5) * 14;
      next.x = Number.isFinite(x) ? x : 0;
      next.y = Number.isFinite(y) ? y : 0;
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [prefersReducedMotion]);

  return position;
}

export function useJavascriptAnimations(prefersReducedMotion: boolean) {
  useEffect(() => {
    if (prefersReducedMotion) return;

    const root = document.documentElement;
    let frame = 0;
    const startedAt = window.performance.now();

    root.dataset.jsMotion = 'true';

    const animate = () => {
      const elapsed = (window.performance.now() - startedAt) / 1000;
      const maxScroll = Math.max(1, root.scrollHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, window.scrollY / maxScroll));

      root.style.setProperty('--scroll-progress', progress.toFixed(4));
      root.style.setProperty('--network-dash', `${elapsed * -42}px`);
      root.style.setProperty('--float-y', `${Math.sin(elapsed * 0.9) * 8}px`);

      frame = window.requestAnimationFrame(animate);
    };

    const getTiltTarget = (target: EventTarget | null) => {
      if (!(target instanceof Element)) return null;
      return target.closest('.js-tilt') as HTMLElement | null;
    };

    const resetTilt = (target: HTMLElement) => {
      target.classList.remove('is-tilting');
      target.style.setProperty('--tilt-x', '0deg');
      target.style.setProperty('--tilt-y', '0deg');
      target.style.setProperty('--glow-x', '50%');
      target.style.setProperty('--glow-y', '50%');
    };

    const onPointerMove = (event: PointerEvent) => {
      const target = getTiltTarget(event.target);
      if (!target) return;

      const rect = target.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      const rotateX = (0.5 - y) * 7;
      const rotateY = (x - 0.5) * 7;

      target.classList.add('is-tilting');
      target.style.setProperty('--tilt-x', `${rotateX.toFixed(2)}deg`);
      target.style.setProperty('--tilt-y', `${rotateY.toFixed(2)}deg`);
      target.style.setProperty('--glow-x', `${(x * 100).toFixed(1)}%`);
      target.style.setProperty('--glow-y', `${(y * 100).toFixed(1)}%`);
    };

    const onPointerOut = (event: PointerEvent) => {
      const target = getTiltTarget(event.target);
      if (!target) return;

      const related = event.relatedTarget instanceof Element ? event.relatedTarget : null;
      if (related && target.contains(related)) return;
      resetTilt(target);
    };

    frame = window.requestAnimationFrame(animate);
    document.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('pointerout', onPointerOut, { passive: true });

    return () => {
      delete root.dataset.jsMotion;
      window.cancelAnimationFrame(frame);
      document.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerout', onPointerOut);
    };
  }, [prefersReducedMotion]);
}
