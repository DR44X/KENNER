import React from 'react';
import { BRAND_DATA } from '../../data/brand';
import { scrollToSection } from '../../lib/lenis';
import { MetalKPinSVG } from '../ui/BrandEmblems';

/**
 * Seção 05 — Final Statement
 * Composição de impacto visual retomando modelo, produto 3D e identidade Kenner.
 * Assinatura limpa com o pino metálico "K" como fechamento (sem rodapé corporativo genérico).
 */
export const FinalStatement: React.FC = () => {
  return (
    <section
      id="section-final-statement"
      aria-label="Seção 05 — Final Statement"
      className="relative z-20 min-h-screen w-full overflow-hidden flex flex-col justify-between pt-28 pb-12 md:pt-36 md:pb-16 border-t border-concrete/20"
    >
      {/* Retomada fotográfica sutil do universo editorial em segundo plano */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden select-none" aria-hidden="true">
        <img
          src="/assets/images/hero-model-editorial.png"
          alt=""
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover object-right opacity-30 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-carbon via-carbon/75 to-carbon" />
        <div className="absolute inset-0 ambient-key-light" />
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
            {BRAND_DATA.finalStatement.headlineTop}
          </span>
          <span data-fs-reveal className="will-animate-transform block text-metalK mt-1">
            {BRAND_DATA.finalStatement.headlineBottom}
          </span>
        </h2>
      </div>

      {/* Manifesto central + CTAs */}
      <div className="relative z-10 max-w-[1440px] w-full mx-auto px-5 sm:px-8 md:px-12 my-auto py-16">
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
            className="will-animate-transform lg:col-span-6 flex flex-wrap items-center lg:justify-end gap-4"
          >
            <a
              href={BRAND_DATA.meta.officialWebsite}
              target="_blank"
              rel="noopener noreferrer"
              className="k-pin-glow group inline-flex items-center gap-3.5 px-7 py-4 bg-mineral text-carbon font-display font-bold text-xs sm:text-sm tracking-[0.2em] uppercase rounded-sm border border-metalK/60 transition-all hover:bg-metalK hover:text-carbon"
            >
              <MetalKPinSVG className="w-5 h-5" />
              <span>{BRAND_DATA.finalStatement.ctaOfficialLabel}</span>
              <span className="w-2 h-2 rounded-full bg-accent" />
            </a>

            <button
              type="button"
              onClick={() => scrollToSection(0)}
              className="k-pin-glow inline-flex items-center gap-2.5 px-6 py-4 rounded-sm border border-concrete/35 bg-carbon/85 text-xs sm:text-sm tracking-[0.18em] uppercase text-mineral hover:border-metalK"
            >
              <span>{BRAND_DATA.finalStatement.ctaReplayLabel}</span>
              <span aria-hidden="true">↑</span>
            </button>
          </div>
        </div>
      </div>

      {/* Assinatura final limpa com o pino metálico "K" como fechamento e nota de transparência conceitual */}
      <footer className="relative z-10 max-w-[1440px] w-full mx-auto px-5 sm:px-8 md:px-12 pt-8 border-t border-concrete/20">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="k-pin-glow p-2.5 rounded-sm border border-metalK/45 bg-carbon/90">
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

          <p className="text-[11px] text-concrete/85 max-w-xl leading-relaxed md:text-right">
            {BRAND_DATA.meta.conceptualDisclaimer}
          </p>
        </div>
      </footer>
    </section>
  );
};
