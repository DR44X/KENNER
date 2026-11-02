import React from 'react';
import { BRAND_DATA } from '../../data/brand';
import { MetalKPinSVG } from '../ui/BrandEmblems';

/**
 * Seção 03 — Urban Energy
 * Grade editorial escalonada com 3 fotografias inéditas em proporções nativas (4:5, 16:10, 3:4),
 * formato WebP real e linha do tempo verificada da herança carioca (1988–Presente).
 */
export const UrbanEnergy: React.FC = () => {
  const [frame1, frame2, frame3] = BRAND_DATA.urbanEnergy.editorialFrames;

  return (
    <section
      id="section-urban-energy"
      aria-label="Seção 03 — Urban Energy"
      className="relative z-20 py-20 md:py-40 overflow-hidden border-t border-concrete/15 bg-carbon"
    >
      <div className="ambient-key-light pointer-events-none absolute inset-0" />

      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12">
        {/* Abertura tipográfica em diagonal editorial */}
        <div className="relative mb-16 md:mb-28">
          <div
            data-ue-reveal
            className="will-animate-transform inline-flex items-center gap-2 text-[11px] tracking-[0.26em] uppercase text-metalK font-semibold mb-4"
          >
            <MetalKPinSVG className="w-4 h-4" />
            <span>{BRAND_DATA.urbanEnergy.sectionKicker}</span>
          </div>

          <h2
            data-ue-reveal
            className="will-animate-transform h-section text-mineral max-w-5xl"
          >
            {BRAND_DATA.urbanEnergy.sectionHeadline}
          </h2>

          <div className="mt-6 md:mt-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <p
              data-ue-reveal
              className="will-animate-transform md:col-span-6 md:col-start-3 text-base sm:text-lg text-mineral/90 leading-relaxed"
            >
              {BRAND_DATA.urbanEnergy.sectionLead}
            </p>
            <p
              data-ue-reveal
              className="will-animate-transform md:col-span-4 text-xs sm:text-sm text-mineral/80 leading-relaxed border-l border-metalK/45 pl-4"
            >
              {BRAND_DATA.urbanEnergy.culturalContextNote}
            </p>
          </div>
        </div>

        {/* Mosaico Editorial Escalonado (3 fotografias exclusivas em proporções nativas 4:5, 16:10, 3:4) */}
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Frame 01 — Proporção vertical 4:5 à esquerda */}
          <figure
            data-ue-frame
            className="will-animate-transform lg:col-span-5 relative group"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm border border-concrete/25 bg-carbon">
              <img
                src={frame1.image}
                alt={frame1.imageAlt}
                width={frame1.width}
                height={frame1.height}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-carbon via-carbon/20 to-transparent" />
              <div className="absolute top-4 left-4 px-2.5 py-1 bg-carbon/90 border border-metalK/35 text-[10px] tracking-[0.22em] text-metalK uppercase">
                FRAME {frame1.index} // RIO DE JANEIRO
              </div>
            </div>
            <figcaption className="mt-4 pr-2">
              <h3 className="font-display text-lg uppercase text-mineral font-bold tracking-tight">
                {frame1.captionTitle}
              </h3>
              <p className="text-xs sm:text-sm text-mineral/80 mt-1.5 leading-relaxed">
                {frame1.captionBody}
              </p>
            </figcaption>
          </figure>

          {/* Frame 02 — Proporção horizontal ampla 16:10 deslocada à direita superior */}
          <div className="lg:col-span-7 flex flex-col gap-10 lg:pl-8">
            <figure data-ue-frame className="will-animate-transform relative group">
              <div className="relative aspect-[16/10] overflow-hidden rounded-sm border border-concrete/25 bg-carbon">
                <img
                  src={frame2.image}
                  alt={frame2.imageAlt}
                  width={frame2.width}
                  height={frame2.height}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-carbon via-transparent to-transparent" />
                <div className="absolute top-4 right-4 px-2.5 py-1 bg-carbon/90 border border-metalK/35 text-[10px] tracking-[0.22em] text-metalK uppercase">
                  FRAME {frame2.index} // CULTURA URBANA
                </div>
              </div>
              <figcaption className="mt-4 max-w-xl">
                <h3 className="font-display text-lg uppercase text-mineral font-bold tracking-tight">
                  {frame2.captionTitle}
                </h3>
                <p className="text-xs sm:text-sm text-mineral/80 mt-1.5 leading-relaxed">
                  {frame2.captionBody}
                </p>
              </figcaption>
            </figure>

            {/* Tipografia display atravessando o espaço negativo entre os frames */}
            <div
              data-ue-parallax-type
              className="will-animate-transform py-4 border-y border-metalK/25 flex flex-wrap items-center justify-between gap-3 select-none"
            >
              <span className="h-editorial text-mineral tracking-tight">
                KENNER DE CRIA
              </span>
              <span className="text-[10px] sm:text-[11px] tracking-[0.22em] uppercase text-metalK font-semibold">
                AUTOESTIMA • PERTENCIMENTO • ASCENSÃO
              </span>
            </div>

            {/* Frame 03 — Proporção retrato 3:4 deslocada */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-end">
              <figure
                data-ue-frame
                className="will-animate-transform sm:col-span-7 relative group"
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-sm border border-concrete/25 bg-carbon">
                  <img
                    src={frame3.image}
                    alt={frame3.imageAlt}
                    width={frame3.width}
                    height={frame3.height}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-carbon via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 px-2.5 py-1 bg-carbon/90 border border-metalK/35 text-[10px] tracking-[0.22em] text-metalK uppercase">
                    FRAME {frame3.index} // PRESENÇA
                  </div>
                </div>
              </figure>

              <div className="sm:col-span-5 pb-2">
                <span className="text-[10px] tracking-[0.24em] uppercase text-accent font-semibold block mb-2">
                  EXPRESSÃO CULTURAL REAL
                </span>
                <h3 className="font-display text-xl uppercase text-mineral font-bold leading-snug">
                  {frame3.captionTitle}
                </h3>
                <p className="text-xs sm:text-sm text-mineral/80 mt-2 leading-relaxed">
                  {frame3.captionBody}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Linha do tempo verificada (Seção 0): 1988 -> 1990 -> Anos 2000 -> Presente */}
        <div className="mt-20 md:mt-32 pt-10 border-t border-concrete/20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-[10px] tracking-[0.26em] uppercase text-metalK font-semibold block mb-1">
                CRONOLOGIA VERIFICADA • GRUPO S2
              </span>
              <h3 className="h-sub text-mineral">
                DA ZONA SUL CARIOCA AO FENÔMENO NACIONAL
              </h3>
            </div>
            <span className="text-xs text-mineral/80">
              Fundador: {BRAND_DATA.meta.founder} • CEO Atual: {BRAND_DATA.meta.currentCEO}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-concrete/20 border border-concrete/20">
            {BRAND_DATA.heritageTimeline.map((item) => (
              <div
                key={item.year}
                data-ue-timeline-item
                className="will-animate-transform bg-[#0C0C0E] p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="font-display text-2xl text-metalK font-bold">
                      {item.year}
                    </span>
                    <span className="text-[9px] tracking-[0.2em] uppercase text-concrete border border-concrete/25 px-2 py-0.5">
                      {item.location}
                    </span>
                  </div>
                  <h4 className="font-display text-base uppercase text-mineral font-semibold mb-2">
                    {item.headline}
                  </h4>
                </div>
                <p className="text-xs text-mineral/80 leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
