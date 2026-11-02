import React from 'react';
import { BRAND_DATA } from '../../data/brand';
import { scrollToSection } from '../../lib/lenis';
import { MetalKPinSVG, TractorSoleSilhouetteSVG } from '../ui/BrandEmblems';
import { MagneticWrapper, StaggerText } from '../ui/MotionPrimitives';

/**
 * Seção 05 — Final Statement
 * Fechamento monumental com Stagger Text (14.1), Magnetic Cursor (14.2) e Animated Button Fill (14.8).
 */
export const FinalStatement: React.FC = () => {
  return (
    <section
      id="section-final-statement"
      aria-label="Seção 05 — Final Statement"
      className="relative z-20 min-h-[100dvh] w-full overflow-hidden flex flex-col justify-between pt-24 pb-10 md:pt-32 md:pb-16 border-t border-concrete/20 bg-carbon"
    >
      {/* Luz atmosférica e silhueta arquitetônica sutil */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden select-none" aria-hidden="true">
        <div className="absolute inset-0 ambient-key-light" />
        <div className="absolute right-[-5%] bottom-[14%] opacity-15 hidden lg:block">
          <TractorSoleSilhouetteSVG className="w-[540px] h-[220px]" />
        </div>
      </div>

      {/* Bloco Monumental Superior */}
      <div className="relative z-10 max-w-[1440px] w-full mx-auto px-5 sm:px-8 md:px-12">
        <div
          data-fs-reveal
          className="will-animate-transform inline-flex items-center gap-2 text-[11px] tracking-[0.26em] uppercase text-metalK font-semibold mb-5"
        >
          <MetalKPinSVG className="w-4 h-4" />
          <span>{BRAND_DATA.finalStatement.sectionKicker}</span>
        </div>

        <h2 className="h-hero text-mineral max-w-6xl">
          <span data-fs-reveal className="will-animate-transform block">
            <StaggerText text={BRAND_DATA.finalStatement.headlineTop} />
          </span>
          <span data-fs-reveal className="will-animate-transform block text-metalK mt-1">
            <StaggerText text={BRAND_DATA.finalStatement.headlineBottom} wordOffsetStart={3} />
          </span>
        </h2>
      </div>

      {/* Manifesto central + CTAs com Magnetic Cursor (14.2) e Animated Button Fill (14.8) */}
      <div className="relative z-10 max-w-[1440px] w-full mx-auto px-5 sm:px-8 md:px-12 my-auto py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-6">
            <p
              data-fs-reveal
              className="will-animate-transform text-base sm:text-lg md:text-xl text-mineral/90 leading-relaxed max-w-xl"
            >
              {BRAND_DATA.finalStatement.manifesto}
            </p>
          </div>

          <div
            data-fs-reveal
            className="will-animate-transform lg:col-span-6 flex flex-wrap items-center lg:justify-end gap-3"
          >
            <MagneticWrapper maxDisplacement={7}>
              <a
                href={BRAND_DATA.meta.officialWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="k-pin-glow btn-fill-sweep group min-h-[48px] inline-flex items-center gap-3.5 px-6 py-3.5 bg-mineral text-carbon font-display font-bold text-xs sm:text-sm tracking-[0.2em] uppercase rounded-sm border border-metalK/60 transition-colors"
              >
                <MetalKPinSVG className="w-5 h-5" />
                <span>{BRAND_DATA.finalStatement.ctaOfficialLabel}</span>
                <span className="w-2 h-2 rounded-full bg-accent" />
              </a>
            </MagneticWrapper>

            <MagneticWrapper maxDisplacement={5}>
              <button
                type="button"
                onClick={() => scrollToSection(0)}
                className="k-pin-glow glass-surface min-h-[48px] inline-flex items-center gap-2.5 px-6 py-3.5 rounded-sm text-xs sm:text-sm tracking-[0.18em] uppercase text-mineral hover:border-metalK"
              >
                <span>{BRAND_DATA.finalStatement.ctaReplayLabel}</span>
                <span aria-hidden="true">↑</span>
              </button>
            </MagneticWrapper>
          </div>
        </div>
      </div>

      {/* Assinatura final limpa com o pino metálico "K" como fechamento e nota de transparência conceitual */}
      <footer className="relative z-10 max-w-[1440px] w-full mx-auto px-5 sm:px-8 md:px-12 pt-8 border-t border-concrete/20">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="k-pin-glow p-2.5 rounded-sm border border-metalK/45 bg-[#0E0E10]">
              <MetalKPinSVG className="w-8 h-8" />
            </div>
            <div>
              <p className="font-display text-sm tracking-[0.22em] uppercase text-mineral font-bold">
                {BRAND_DATA.meta.brandName} • {BRAND_DATA.meta.foundedCity} ({BRAND_DATA.meta.foundedYear})
              </p>
              <p className="text-[11px] text-concrete mt-0.5">
                {BRAND_DATA.meta.parentGroup} • Fundador: {BRAND_DATA.meta.founder} • CEO: {BRAND_DATA.meta.currentCEO}
              </p>
            </div>
          </div>

          <p className="text-[11px] text-concrete/90 max-w-xl leading-relaxed md:text-right">
            {BRAND_DATA.meta.conceptualDisclaimer}
          </p>
        </div>
      </footer>
    </section>
  );
};
