import React, { useEffect, useRef, useState } from 'react';
import { useExperienceStore } from '../../store/useExperienceStore';
import { MetalKPinSVG } from './BrandEmblems';

/**
 * 14.1. Stagger Text Reveal
 * Entrada progressiva por palavras acionada na primeira entrada da seção via IntersectionObserver.
 * Mantém leitura limpa para leitores de tela via aria-label no container e aria-hidden nas palavras.
 */
export const StaggerText: React.FC<{
  text: string;
  className?: string;
  wordOffsetStart?: number;
}> = ({ text, className = '', wordOffsetStart = 0 }) => {
  const containerRef = useRef<HTMLSpanElement>(null);
  const prefersReducedMotion = useExperienceStore((s) => s.prefersReducedMotion);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) {
      setRevealed(true);
      return;
    }
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setRevealed(true);
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  const words = text.split(' ');

  return (
    <span
      ref={containerRef}
      aria-label={text}
      data-stagger-active={revealed ? 'true' : 'false'}
      className={`inline-block ${className}`}
    >
      {words.map((word, idx) => (
        <span
          key={`${word}-${idx}`}
          aria-hidden="true"
          className="inline-block overflow-hidden align-bottom mr-[0.26em] last:mr-0 pb-[0.04em]"
        >
          <span
            className="stagger-word"
            style={{ '--word-idx': wordOffsetStart + idx } as React.CSSProperties}
          >
            {word}
          </span>
        </span>
      ))}
    </span>
  );
};

/**
 * 14.2. Magnetic Cursor
 * Resposta magnética suave para CTAs selecionados no desktop, com retorno interpolado via rAF.
 * Automaticamente desativado em dispositivos touch (isCoarsePointer) e prefers-reduced-motion.
 */
export const MagneticWrapper: React.FC<{
  children: React.ReactNode;
  maxDisplacement?: number;
  className?: string;
}> = ({ children, maxDisplacement = 8, className = 'inline-block' }) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  const isCoarsePointer = useExperienceStore((s) => s.isCoarsePointer);
  const prefersReducedMotion = useExperienceStore((s) => s.prefersReducedMotion);

  const animate = () => {
    const el = wrapRef.current;
    if (!el) return;

    currentRef.current.x += (targetRef.current.x - currentRef.current.x) * 0.22;
    currentRef.current.y += (targetRef.current.y - currentRef.current.y) * 0.22;

    const dx = Math.abs(targetRef.current.x - currentRef.current.x);
    const dy = Math.abs(targetRef.current.y - currentRef.current.y);

    el.style.transform = `translate3d(${currentRef.current.x.toFixed(2)}px, ${currentRef.current.y.toFixed(2)}px, 0)`;

    if (dx > 0.08 || dy > 0.08 || targetRef.current.x !== 0 || targetRef.current.y !== 0) {
      rafRef.current = window.requestAnimationFrame(animate);
    } else {
      el.style.transform = 'translate3d(0px, 0px, 0)';
      rafRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isCoarsePointer || prefersReducedMotion || e.pointerType === 'touch') return;
    const el = wrapRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const relX = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const relY = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);

    targetRef.current.x = Math.max(-1, Math.min(1, relX)) * maxDisplacement;
    targetRef.current.y = Math.max(-1, Math.min(1, relY)) * maxDisplacement;

    if (rafRef.current === null) {
      rafRef.current = window.requestAnimationFrame(animate);
    }
  };

  const handlePointerLeave = () => {
    targetRef.current.x = 0;
    targetRef.current.y = 0;
    if (rafRef.current === null) {
      rafRef.current = window.requestAnimationFrame(animate);
    }
  };

  return (
    <div
      ref={wrapRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={className}
    >
      {children}
    </div>
  );
};

/**
 * 14.3. Infinite Horizontal Ticker
 * Faixa contínua sem emendas com as linhas e tecnologias da Kenner.
 * Pausa automaticamente quando fora da viewport e oculta a cópia duplicada de leitores de tela.
 */
const TICKER_ITEMS = [
  { name: 'RAKKA', tag: 'SOLADO MEGATRATRADO & RE.AMP' },
  { name: 'KIVAH', tag: 'CLÁSSICO URBANO DESDE 2001' },
  { name: 'MEGAH', tag: 'ARQUITETURA EXTREMA VULCANIZADA' },
  { name: 'AIKON', tag: 'DESIGN INDUSTRIAL CONTEMPORÂNEO' },
  { name: 'NK6', tag: 'TRAÇÃO DE ALTA ADERÊNCIA' },
  { name: 'NK7', tag: 'ENGENHARIA DE IMPACTO' },
  { name: 'HIGH-CONFY', tag: 'POLÍMERO COM MEMÓRIA ELÁSTICA' },
  { name: 'HYDRO-OFF', tag: 'CABEDAL EM NEOPRENE REPELENTE' },
];

export const InfiniteLineTicker: React.FC = () => {
  const tickerRef = useRef<HTMLDivElement>(null);
  const [inViewport, setInViewport] = useState(true);

  useEffect(() => {
    const el = tickerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          setInViewport(entry.isIntersecting);
        }
      },
      { threshold: 0.01 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const renderTrack = (isDuplicate: boolean) => (
    <div
      aria-hidden={isDuplicate ? 'true' : undefined}
      className="flex items-center shrink-0"
    >
      {TICKER_ITEMS.map((item, idx) => (
        <div
          key={`${item.name}-${idx}`}
          className="flex items-center gap-4 px-6 sm:px-8 py-3.5 border-r border-concrete/15"
        >
          <MetalKPinSVG className="w-4 h-4 shrink-0 opacity-85" />
          <span className="font-display text-lg sm:text-xl md:text-2xl font-bold tracking-[0.08em] uppercase text-mineral">
            {item.name}
          </span>
          <span className="text-[10px] tracking-[0.22em] uppercase text-metalK font-medium">
            {item.tag}
          </span>
        </div>
      ))}
    </div>
  );

  return (
    <div
      ref={tickerRef}
      aria-label="Linhas e tecnologias de produto Kenner"
      className="relative z-20 w-full overflow-hidden border-y border-concrete/20 bg-[#0D0D0F] select-none"
    >
      <div
        className="kenner-ticker-track"
        style={{ animationPlayState: inViewport ? 'running' : 'paused' }}
      >
        {renderTrack(false)}
        {renderTrack(true)}
      </div>
    </div>
  );
};

/**
 * 14.4. Image Mask Reveal
 * Revela fotografias editoriais por meio de máscara clip-path animada na primeira entrada na viewport.
 */
export const MaskRevealContainer: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useExperienceStore((s) => s.prefersReducedMotion);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) {
      setRevealed(true);
      return;
    }
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setRevealed(true);
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0.05, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  return (
    <div ref={ref} className={`product-card-group ${className}`}>
      <div
        data-revealed={revealed ? 'true' : 'false'}
        className="image-mask-curtain w-full h-full"
      >
        {children}
      </div>
    </div>
  );
};

/**
 * 14.5. Animated Number Counter
 * Contador numérico progressivo acionado uma única vez quando o elemento entra na viewport.
 * Exibe apenas datas e marcos historicamente verificados da Kenner.
 */
export const AnimatedCounter: React.FC<{
  targetValue: number;
  prefix?: string;
  suffix?: string;
  durationMs?: number;
  className?: string;
}> = ({ targetValue, prefix = '', suffix = '', durationMs = 1350, className = '' }) => {
  const spanRef = useRef<HTMLSpanElement>(null);
  const prefersReducedMotion = useExperienceStore((s) => s.prefersReducedMotion);
  const startValue = Math.max(0, targetValue > 1000 ? targetValue - 68 : 0);
  const [currentValue, setCurrentValue] = useState<number>(
    prefersReducedMotion ? targetValue : startValue
  );
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    if (prefersReducedMotion) {
      setCurrentValue(targetValue);
      return;
    }
    const el = spanRef.current;
    if (!el) return;

    let rafId: number | null = null;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !hasAnimatedRef.current) {
            hasAnimatedRef.current = true;
            observer.disconnect();

            const startTime = performance.now();
            const tick = (now: number) => {
              const elapsed = now - startTime;
              const progress = Math.min(1, elapsed / durationMs);
              // easeOutQuart
              const eased = 1 - Math.pow(1 - progress, 4);
              const nextVal = Math.round(startValue + (targetValue - startValue) * eased);
              setCurrentValue(nextVal);

              if (progress < 1) {
                rafId = window.requestAnimationFrame(tick);
              } else {
                setCurrentValue(targetValue);
              }
            };

            rafId = window.requestAnimationFrame(tick);
            break;
          }
        }
      },
      { threshold: 0.05, rootMargin: '0px 0px 40px 0px' }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [targetValue, startValue, durationMs, prefersReducedMotion]);

  return (
    <span ref={spanRef} className={className} aria-label={`${prefix}${targetValue}${suffix}`}>
      {prefix}
      {currentValue}
      {suffix}
    </span>
  );
};

