import React from 'react';
import { BRAND_DATA } from '../../data/brand';
import { ModelBackground } from './ModelBackground';
import { scrollToSection } from '../../lib/lenis';
import { MetalKPinSVG } from '../ui/BrandEmblems';

export const HeroExperience: React.FC = () => {
  return (
    <section
      id="section-presence"
      aria-label="Seção 01 — Presence"
      className="relative min-h-screen w-full overflow-hidden flex flex-col justify-between pt-24 pb-10 md:pt-28 md:pb-12"
    >
      {/* Planos 1 e 2: Ambiente + Modelo Editorial */}
      <ModelBackground />

      {/* Camada tipográfica monumental traseira (atravessa a composição atrás do produto 3D) */}
      <div className="relative z-[5] max-w-[1440px] w-full mx-auto px-5 sm:px-8 md:px-12 pointer-events-none">
        <div
          data-hero-kicker
          className="will-animate-transform inline-flex items-center gap-2.5 px-3 py-1.5 rounded border border-metalK/35 bg-carbon/75 backdrop-blur-sm mb-4"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-metalK" />
          <span className="text-[10px] sm:text-[11px] tracking-[0.26em] uppercase text-metalK font-medium">
            {BRAND_DATA.hero.kicker}
          </span>
        </div>

        <h1 className="h-hero text-mineral select-none">
          <span
            data-hero-title-back
            className="will-animate-transform block tracking-[-0.03em] text-mineral/95"
          >
            {BRAND_DATA.hero.headlineTop}
          </span>
        </h1>
      </div>

      {/* Espaço central onde a sandália Kenner 3D (Plano 3, z-10) reina em escala monumental */}
      <div className="relative z-[15] my-auto py-16 md:py-24 pointer-events-none">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12 flex justify-end">
          <div
            data-hero-badge
            className="will-animate-transform hidden md:flex flex-col items-end text-right border-r-2 border-metalK/60 pr-4 py-1"
          >
            <span className="text-[10px] tracking-[0.24em] uppercase text-metalK font-semibold">
              {BRAND_DATA.hero.modelReferenceTag}
            </span>
            <span className="text-xs text-concrete mt-1 max-w-[260px]">
              Tiras em neoprene • Solado vulcanizado megatratorado • Amortecedor Re.Amp
            </span>
          </div>
        </div>
      </div>

      {/* Plano frontal (z-20): Segunda parte do headline sobreposta + copy conceitual + CTA minimalista */}
      <div className="relative z-20 max-w-[1440px] w-full mx-auto px-5 sm:px-8 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-end">
          <div className="lg:col-span-8 pointer-events-none">
            <p
              data-hero-title-front
              className="will-animate-transform h-editorial text-mineral drop-shadow-sm"
            >
              {BRAND_DATA.hero.headlineBottom}
            </p>
          </div>

          <div
            data-hero-cta-block
            className="will-animate-transform lg:col-span-4 flex flex-col items-start lg:items-end justify-end gap-5"
          >
            <p className="text-sm sm:text-base text-mineral/85 leading-relaxed max-w-md lg:text-right">
              {BRAND_DATA.hero.lead}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => scrollToSection('#section-built-different')}
                className="k-pin-glow group relative inline-flex items-center gap-3.5 px-6 py-3.5 bg-mineral text-carbon font-display font-bold text-xs sm:text-sm tracking-[0.2em] uppercase rounded-sm border border-metalK/50 transition-all hover:bg-metalK hover:text-carbon"
              >
                <MetalKPinSVG className="w-5 h-5 transition-transform duration-300 group-hover:rotate-6" />
                <span>{BRAND_DATA.hero.ctaPrimary}</span>
                <span className="w-2 h-2 rounded-full bg-accent" />
              </button>
            </div>
          </div>
        </div>

        {/* Rodapé da primeira dobra: linha de herança + indicador de rolagem */}
        <div className="mt-8 pt-4 border-t border-concrete/20 flex flex-wrap items-center justify-between gap-4 text-[11px] tracking-[0.2em] uppercase text-concrete">
          <div className="flex items-center gap-4">
            <span>FUNDAÇÃO: {BRAND_DATA.meta.foundedYear} • {BRAND_DATA.meta.founder}</span>
            <span className="hidden sm:inline text-metalK">•</span>
            <span className="hidden sm:inline">{BRAND_DATA.meta.parentGroup}</span>
          </div>

          <button
            type="button"
            onClick={() => scrollToSection('#section-built-different')}
            className="k-pin-glow inline-flex items-center gap-2.5 text-mineral/90 hover:text-metalK transition-colors py-1 px-2 rounded"
          >
            <span>{BRAND_DATA.hero.scrollPrompt}</span>
            <span className="inline-block w-1.5 h-4 border border-metalK/60 rounded-full relative overflow-hidden">
              <span className="absolute top-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent animate-bounce" />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};
