import React from 'react';
import { BRAND_DATA } from '../../data/brand';
import { useExperienceStore } from '../../store/useExperienceStore';
import { EngineeringLayerEmblemSVG, MetalKPinSVG } from '../ui/BrandEmblems';
import { ProductDetails } from '../product/ProductDetails';

/**
 * Seção 02 — Built Different
 * Composição assimétrica (closes fotográficos macro + texto sobreposto + interação 3D).
 * Proibido layout de 3 cards SaaS lado a lado (Anti-Padrão #4).
 */
export const BuiltDifferent: React.FC = () => {
  const activeEngineeringIndex = useExperienceStore((s) => s.activeEngineeringIndex);
  const setActiveEngineeringIndex = useExperienceStore((s) => s.setActiveEngineeringIndex);
  const setTransformTarget = useExperienceStore((s) => s.setTransformTarget);

  const handleSelectLayer = (index: number) => {
    setActiveEngineeringIndex(index);
    const layer = BRAND_DATA.engineering.layers[index];
    if (layer) {
      setTransformTarget({
        position: layer.cameraPreset.position,
        rotation: layer.cameraPreset.rotation,
        scale: 1.0,
      });
    }
  };

  return (
    <section
      id="section-built-different"
      aria-label="Seção 02 — Built Different"
      className="relative z-20 py-28 md:py-40 overflow-hidden"
    >
      <div className="ambient-rim-light pointer-events-none absolute inset-0" />

      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12">
        {/* Cabeçalho editorial assimétrico */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-20 md:mb-28">
          <div className="lg:col-span-8">
            <div
              data-bd-reveal
              className="will-animate-transform inline-flex items-center gap-2 text-[11px] tracking-[0.26em] uppercase text-metalK font-semibold mb-4"
            >
              <MetalKPinSVG className="w-4 h-4" />
              <span>{BRAND_DATA.engineering.sectionKicker}</span>
            </div>
            <h2
              data-bd-reveal
              className="will-animate-transform h-section text-mineral"
            >
              {BRAND_DATA.engineering.sectionHeadline}
            </h2>
          </div>

          <div className="lg:col-span-4 lg:pb-2">
            <p
              data-bd-reveal
              className="will-animate-transform text-sm sm:text-base text-concrete leading-relaxed border-l border-metalK/40 pl-4"
            >
              {BRAND_DATA.engineering.sectionLead}
            </p>
          </div>
        </div>

        {/* Bloco Assimétrico 01: Close fotográfico macro do solado vulcanizado + texto sobreposto */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-24">
          <div className="lg:col-span-7 relative">
            <div
              data-bd-mask-photo
              className="will-animate-transform relative aspect-[16/10] overflow-hidden rounded-sm border border-concrete/20 bg-carbon"
            >
              <img
                src="/assets/images/eng-vulcanized.png"
                alt="Close macro do solado de borracha vulcanizada tratorada sobre concreto e asfalto molhado"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover scale-105 transition-transform duration-700 hover:scale-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-carbon via-carbon/30 to-transparent" />

              {/* Tipografia sobreposta ao close fotográfico */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <span className="text-[10px] tracking-[0.24em] uppercase text-metalK font-semibold block mb-1">
                    PROCESSO QUÍMICO DE VULCANIZAÇÃO
                  </span>
                  <h3 className="h-sub text-mineral">
                    BORRACHA TRATORADA &amp; CANALETAS ANGULADAS
                  </h3>
                </div>
                <span className="text-[11px] tracking-[0.2em] uppercase text-mineral/80 bg-carbon/85 px-3 py-1.5 border border-metalK/30 shrink-0">
                  REF. LINHA RAKKA
                </span>
              </div>
            </div>

            {/* Segundo close fotográfico deslocado assimetricamente: Nylon + Neoprene + Hydro-Off */}
            <div
              data-bd-mask-photo
              className="will-animate-transform mt-8 lg:mt-12 lg:ml-16 relative aspect-[16/9] overflow-hidden rounded-sm border border-concrete/20 bg-carbon"
            >
              <img
                src="/assets/images/eng-neoprene-hydro.png"
                alt="Detalhe macro da tira de nylon de alta tenacidade forrada em neoprene com repelência Hydro-Off e pino metálico"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-carbon/90 via-carbon/35 to-transparent" />
              <div className="absolute inset-y-0 left-0 p-6 sm:p-8 flex flex-col justify-end max-w-md">
                <span className="text-[10px] tracking-[0.24em] uppercase text-metalK font-semibold mb-1">
                  CABEDAL TÉCNICO + HYDRO-OFF
                </span>
                <h3 className="font-display text-xl sm:text-2xl uppercase text-mineral font-bold leading-tight">
                  FORRO EM NEOPRENE &amp; PINO METÁLICO &ldquo;K&rdquo;
                </h3>
                <p className="text-xs sm:text-sm text-concrete mt-2 leading-relaxed">
                  Nylon/poliéster de alta tenacidade (ou ripstop acolchoado na Rakka Puffy) que elimina o atrito e evita bolhas no uso urbano contínuo.
                </p>
              </div>
            </div>
          </div>

          {/* Coluna direita (lg:col-span-5): Sequência vertical assimétrica de engenharia que controla o enquadramento 3D */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="rounded-sm border border-metalK/30 bg-carbon/80 backdrop-blur-md p-5">
              <p className="text-[11px] tracking-[0.22em] uppercase text-metalK font-semibold">
                INSPEÇÃO INTERATIVA 3D POR CAMADA
              </p>
              <p className="text-xs text-concrete mt-1">
                Selecione uma especificação verificada abaixo para reorientar a sandália 3D ao vivo na cena.
              </p>
            </div>

            {BRAND_DATA.engineering.layers.map((layer, index) => {
              const isActive = activeEngineeringIndex === index;
              return (
                <article
                  key={layer.id}
                  data-bd-step
                  onClick={() => handleSelectLayer(index)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleSelectLayer(index);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-pressed={isActive}
                  className={`k-pin-glow will-animate-transform cursor-pointer text-left rounded-sm border p-5 sm:p-6 transition-all backdrop-blur-md ${
                    isActive
                      ? 'border-metalK bg-carbon/90'
                      : 'border-concrete/20 bg-carbon/65 hover:border-concrete/45'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="text-[10px] tracking-[0.24em] uppercase text-metalK font-semibold block">
                        {layer.code}
                      </span>
                      <h3 className="font-display text-lg sm:text-xl uppercase text-mineral font-bold mt-1">
                        {layer.title}
                      </h3>
                      <p className="text-xs text-metalK/90 mt-0.5">{layer.subtitle}</p>
                    </div>
                    <EngineeringLayerEmblemSVG
                      layerId={layer.id}
                      className="w-9 h-9 shrink-0"
                    />
                  </div>

                  <p className="text-xs sm:text-sm text-mineral/85 leading-relaxed mt-3">
                    {layer.description}
                  </p>

                  <div className="mt-3 pt-3 border-t border-concrete/15 flex items-center justify-between text-[10px] tracking-[0.18em] uppercase">
                    <span className="text-concrete">{layer.technicalParallel}</span>
                    <span className={isActive ? 'text-accent font-semibold' : 'text-metalK'}>
                      {isActive ? '● ÂNGULO 3D ATIVO' : 'FOCAR NO 3D →'}
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Comparativo técnico das linhas de referência reais (Rakka, Kivah, Megah) */}
        <ProductDetails />
      </div>
    </section>
  );
};
