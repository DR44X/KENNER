import React, { useEffect, useRef } from 'react';
import { BRAND_DATA } from '../../data/brand';
import { ModelBackground } from './ModelBackground';
import { scrollToSection } from '../../lib/lenis';
import { MetalKPinSVG } from '../ui/BrandEmblems';
import { Product3DStage } from '../product/Product3D';
import { MagneticWrapper, StaggerText } from '../ui/MotionPrimitives';
import { useExperienceStore } from '../../store/useExperienceStore';

export const HeroExperience: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const fgParallaxRef = useRef<HTMLDivElement>(null);

  // 14.9. Hero Cursor Parallax — interpolado via rAF sem listeners de mouse duplicados e desativado no mobile
  useEffect(() => {
    let rafId: number | null = null;
    let curX = 0;
    let curY = 0;

    const tick = () => {
      const st = useExperienceStore.getState();
      if (
        st.activeSection === 'presence' &&
        !st.isCoarsePointer &&
        !st.prefersReducedMotion &&
        window.innerWidth >= 1024
      ) {
        curX += (st.pointer.x - curX) * 0.08;
        curY += (st.pointer.y - curY) * 0.08;

        const bgEl = sectionRef.current?.querySelector<HTMLElement>('[data-hero-parallax-bg]');
        if (bgEl) {
          bgEl.style.transform = `translate3d(${(-curX * 11).toFixed(2)}px, ${(-curY * 7).toFixed(2)}px, 0)`;
        }
        if (fgParallaxRef.current) {
          fgParallaxRef.current.style.transform = `translate3d(${(curX * 4.5).toFixed(2)}px, ${(curY * 3).toFixed(2)}px, 0)`;
        }
      } else {
        const bgEl = sectionRef.current?.querySelector<HTMLElement>('[data-hero-parallax-bg]');
        if (bgEl && bgEl.style.transform) bgEl.style.transform = '';
        if (fgParallaxRef.current && fgParallaxRef.current.style.transform) {
          fgParallaxRef.current.style.transform = '';
        }
      }
      rafId = window.requestAnimationFrame(tick);
    };

    rafId = window.requestAnimationFrame(tick);
    return () => {
      if (rafId !== null) window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="section-presence"
      aria-label="Seção 01 — Presence"
      className="relative min-h-[100dvh] w-full overflow-hidden flex flex-col justify-between pt-20 pb-6 md:pt-28 md:pb-10"
    >
      {/* Plano de fundo editorial com proteção de contraste e parallax de cursor */}
      <ModelBackground />

      {/* Conteúdo principal com hierarquia vertical própria no mobile (Título -> 3D -> Texto -> CTA) e 2 colunas no desktop */}
      <div className="relative z-20 max-w-[1440px] w-full mx-auto px-5 sm:px-8 md:px-12 my-auto py-4 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          {/* Coluna Esquerda (Desktop) / Topo (Mobile): Kicker + Headline Monumental com Stagger Text Reveal */}
          <div ref={fgParallaxRef} className="lg:col-span-6 flex flex-col items-start">
            <div
              data-hero-kicker
              className="will-animate-transform inline-flex items-center gap-2.5 px-3 py-1.5 rounded-sm border border-metalK/40 bg-carbon/90 mb-4"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-metalK" />
              <span className="text-[10px] sm:text-[11px] tracking-[0.24em] uppercase text-metalK font-semibold">
                {BRAND_DATA.hero.kicker}
              </span>
            </div>

            <h1 className="h-hero text-mineral select-none">
              <span
                data-hero-title-back
                className="will-animate-transform block tracking-[-0.03em] text-mineral"
              >
                <StaggerText text={BRAND_DATA.hero.headlineTop} />
              </span>
            </h1>

            <p
              data-hero-title-front
              className="will-animate-transform h-editorial text-metalK mt-2"
            >
              <StaggerText text={BRAND_DATA.hero.headlineBottom} wordOffsetStart={1} />
            </p>

            {/* Em Desktop (>= 1024px), o texto de apoio e o CTA ficam abaixo do título na coluna esquerda */}
            <div
              data-hero-cta-block
              className="hidden lg:flex flex-col items-start gap-6 mt-6 max-w-xl"
            >
              <p className="text-base text-mineral/90 leading-relaxed">
                {BRAND_DATA.hero.lead}
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <MagneticWrapper maxDisplacement={7}>
                  <button
                    type="button"
                    onClick={() => scrollToSection('#section-built-different')}
                    className="k-pin-glow btn-fill-sweep group relative min-h-[48px] inline-flex items-center gap-3.5 px-6 py-3.5 bg-mineral text-carbon font-display font-bold text-xs sm:text-sm tracking-[0.2em] uppercase rounded-sm border border-metalK/60 transition-colors"
                  >
                    <MetalKPinSVG className="w-5 h-5 transition-transform duration-200 group-hover:rotate-6" />
                    <span>{BRAND_DATA.hero.ctaPrimary}</span>
                    <span className="w-2 h-2 rounded-full bg-accent" />
                  </button>
                </MagneticWrapper>
              </div>
            </div>
          </div>

          {/* Palco 3D Dedicado: No mobile entra entre o Título e o Texto de apoio; no desktop ocupa a coluna direita */}
          <div className="lg:col-span-6 w-full">
            <Product3DStage
              slotId="presence"
              className="h-[240px] sm:h-[310px] lg:h-[440px] w-full rounded-sm border border-concrete/20 bg-carbon/50"
              interactiveHint="ARRASTE PARA GIRAR 3D"
            />
          </div>

          {/* Em Mobile/Tablet (< 1024px), o texto de apoio e o CTA vêm depois da cena 3D (ordem vertical limpa) */}
          <div className="lg:hidden flex flex-col items-start gap-4">
            <p className="text-sm sm:text-base text-mineral/90 leading-relaxed">
              {BRAND_DATA.hero.lead}
            </p>

            <button
              type="button"
              onClick={() => scrollToSection('#section-built-different')}
              className="k-pin-glow btn-fill-sweep group relative min-h-[48px] w-full sm:w-auto justify-center inline-flex items-center gap-3 px-6 py-3.5 bg-mineral text-carbon font-display font-bold text-xs sm:text-sm tracking-[0.2em] uppercase rounded-sm border border-metalK/60 transition-colors"
            >
              <MetalKPinSVG className="w-5 h-5" />
              <span>{BRAND_DATA.hero.ctaPrimary}</span>
              <span className="w-2 h-2 rounded-full bg-accent" />
            </button>
          </div>
        </div>
      </div>

      {/* Rodapé discreto da seção: badge técnico movido para a base (nunca competindo com o 3D) + botão de rolagem (>= 44px) */}
      <div className="relative z-20 max-w-[1440px] w-full mx-auto px-5 sm:px-8 md:px-12 pt-3 border-t border-concrete/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[10px] sm:text-[11px] tracking-[0.18em] uppercase text-concrete">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="text-metalK font-semibold">{BRAND_DATA.hero.modelReferenceTag}</span>
          <span className="hidden md:inline">•</span>
          <span>FUNDAÇÃO: {BRAND_DATA.meta.foundedYear} ({BRAND_DATA.meta.founder})</span>
        </div>

        <button
          type="button"
          onClick={() => scrollToSection('#section-built-different')}
          className="k-pin-glow min-h-[44px] self-start sm:self-auto inline-flex items-center gap-2.5 text-mineral hover:text-metalK transition-colors px-3 py-2 rounded-sm border border-concrete/20 bg-carbon/80"
        >
          <span>{BRAND_DATA.hero.scrollPrompt}</span>
          <span className="inline-block w-1.5 h-4 border border-metalK/60 rounded-full relative overflow-hidden">
            <span className="absolute top-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent animate-bounce" />
          </span>
        </button>
      </div>
    </section>
  );
};
