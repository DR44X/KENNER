import React from 'react';
import { BRAND_DATA } from '../../data/brand';
import { useExperienceStore } from '../../store/useExperienceStore';
import { EngineeringLayerEmblemSVG, MetalKPinSVG } from '../ui/BrandEmblems';
import { ProductDetails } from '../product/ProductDetails';
import { Product3DStage } from '../product/Product3D';
import { MaskRevealContainer, StaggerText } from '../ui/MotionPrimitives';

/**
 * Seção 02 — Built Different
 * Composição editorial assimétrica com visor 3D dedicado e desobstruído,
 * Image Mask Reveal (14.4) + Product Card Hover (14.7) nos closes macro e Stagger Text (14.1).
 */
export const BuiltDifferent: React.FC = () => {
  const activeEngineeringIndex = useExperienceStore((s) => s.activeEngineeringIndex);
  const setActiveEngineeringIndex = useExperienceStore((s) => s.setActiveEngineeringIndex);
  const setActiveStageSlot = useExperienceStore((s) => s.setActiveStageSlot);
  const setManualPresetLockUntil = useExperienceStore((s) => s.setManualPresetLockUntil);
  const setTransformTarget = useExperienceStore((s) => s.setTransformTarget);

  const activeLayer =
    BRAND_DATA.engineering.layers[activeEngineeringIndex] ?? BRAND_DATA.engineering.layers[0];

  const handleSelectLayer = (index: number) => {
    setActiveEngineeringIndex(index);
    setActiveStageSlot('built-different');
    setManualPresetLockUntil(Date.now() + 2600);
    const layer = BRAND_DATA.engineering.layers[index];
    if (layer) {
      setTransformTarget({
        position: [0, -0.02, 0],
        rotation: layer.cameraPreset.rotation,
        scale: 0.98,
        cameraPosition: layer.cameraPreset.position,
        keyLightIntensity: 2.5,
        rimLightIntensity: 0.85,
        stageOpacity: 1,
      });
    }
  };

  return (
    <section
      id="section-built-different"
      aria-label="Seção 02 — Built Different"
      className="relative z-20 py-20 md:py-36 overflow-hidden border-t border-concrete/15"
    >
      <div className="ambient-rim-light pointer-events-none absolute inset-0" />

      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12">
        {/* Cabeçalho editorial assimétrico */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-end mb-14 md:mb-24">
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
              <StaggerText text={BRAND_DATA.engineering.sectionHeadline} />
            </h2>
          </div>

          <div className="lg:col-span-4 lg:pb-2">
            <p
              data-bd-reveal
              className="will-animate-transform text-sm sm:text-base text-mineral/85 leading-relaxed border-l border-metalK/45 pl-4"
            >
              {BRAND_DATA.engineering.sectionLead}
            </p>
          </div>
        </div>

        {/* Grid Principal: Visor 3D + Macro Fotos à esquerda (lg:col-span-7) e Controles de Camada à direita (lg:col-span-5) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-20">
          <div className="lg:col-span-7 flex flex-col gap-8">
            {/* Visor de Engenharia 3D dedicado (100% visível e nunca oculto atrás de fotos) */}
            <div className="rounded-sm border border-metalK/35 bg-[#0E0E10] p-4 sm:p-5">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-concrete/15">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent" />
                  <span className="text-[10px] sm:text-[11px] tracking-[0.22em] uppercase text-metalK font-semibold">
                    VISOR DE ENGENHARIA 3D • {activeLayer.code}
                  </span>
                </div>
                <span className="text-[10px] tracking-[0.18em] uppercase text-concrete">
                  FOCO: {activeLayer.cameraPreset.targetLabel}
                </span>
              </div>

              <Product3DStage
                slotId="built-different"
                className="h-[240px] sm:h-[300px] md:h-[340px] w-full rounded-sm bg-carbon border border-concrete/15"
                interactiveHint="TOQUE NAS CAMADAS OU ARRASTE O 3D"
              />
            </div>

            {/* Close fotográfico macro 01: Image Mask Reveal (14.4) + Product Card Hover (14.7) */}
            <MaskRevealContainer className="relative aspect-[16/10] overflow-hidden rounded-sm border border-concrete/20 bg-carbon">
              <img
                src="/assets/images/eng-vulcanized.webp"
                alt="Close macro do solado de borracha vulcanizada tratorada sobre concreto e asfalto molhado"
                width={1280}
                height={800}
                loading="lazy"
                decoding="async"
                className="product-card-media w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-carbon via-carbon/35 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                <div>
                  <span className="text-[10px] tracking-[0.24em] uppercase text-metalK font-semibold block mb-1">
                    PROCESSO QUÍMICO DE VULCANIZAÇÃO
                  </span>
                  <h3 className="h-sub text-mineral">
                    BORRACHA TRATORADA &amp; CANALETAS ANGULADAS
                  </h3>
                </div>
                <span className="text-[10px] tracking-[0.2em] uppercase text-mineral bg-carbon/90 px-3 py-1.5 border border-metalK/35 shrink-0 self-start sm:self-auto">
                  REF. LINHA RAKKA
                </span>
              </div>
            </MaskRevealContainer>

            {/* Close fotográfico macro 02: Cabedal em Neoprene + Hydro-Off */}
            <MaskRevealContainer className="lg:ml-10 relative aspect-[16/9] overflow-hidden rounded-sm border border-concrete/20 bg-carbon">
              <img
                src="/assets/images/eng-neoprene-hydro.webp"
                alt="Detalhe macro da tira de nylon de alta tenacidade forrada em neoprene com repelência Hydro-Off"
                width={1280}
                height={720}
                loading="lazy"
                decoding="async"
                className="product-card-media w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-carbon/95 via-carbon/55 to-transparent" />
              <div className="absolute inset-y-0 left-0 p-5 sm:p-7 flex flex-col justify-end max-w-md">
                <span className="text-[10px] tracking-[0.24em] uppercase text-metalK font-semibold mb-1">
                  CABEDAL TÉCNICO + HYDRO-OFF
                </span>
                <h3 className="font-display text-lg sm:text-2xl uppercase text-mineral font-bold leading-tight">
                  FORRO EM NEOPRENE &amp; PINO METÁLICO &ldquo;K&rdquo;
                </h3>
                <p className="text-xs sm:text-sm text-mineral/85 mt-2 leading-relaxed">
                  Nylon/poliéster de alta tenacidade que elimina o atrito e evita bolhas no uso urbano contínuo.
                </p>
              </div>
            </MaskRevealContainer>
          </div>

          {/* Coluna direita (lg:col-span-5): Botões nativos de inspeção 3D por camada (gap-3 >= 8px, min-h-[48px]) */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            <div className="rounded-sm border border-metalK/30 bg-[#0E0E10] p-4 sm:p-5">
              <p className="text-[11px] tracking-[0.22em] uppercase text-metalK font-semibold">
                INSPEÇÃO INTERATIVA 3D POR CAMADA
              </p>
              <p className="text-xs text-mineral/80 mt-1">
                Selecione uma especificação verificada abaixo para reenquadrar a câmera 3D na peça correspondente.
              </p>
            </div>

            {BRAND_DATA.engineering.layers.map((layer, index) => {
              const isActive = activeEngineeringIndex === index;
              return (
                <button
                  key={layer.id}
                  type="button"
                  data-bd-step
                  onClick={() => handleSelectLayer(index)}
                  aria-pressed={isActive}
                  className={`k-pin-glow group min-h-[48px] w-full text-left rounded-sm border p-4 sm:p-5 transition-all ${
                    isActive
                      ? 'border-metalK bg-[#141418]'
                      : 'border-concrete/20 bg-[#0C0C0E] hover:border-metalK/55 hover:bg-[#111114]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="text-[10px] tracking-[0.24em] uppercase text-metalK font-semibold block">
                        {layer.code}
                      </span>
                      <h3 className="font-display text-base sm:text-lg uppercase text-mineral font-bold mt-1">
                        {layer.title}
                      </h3>
                      <p className="text-xs text-metalK/90 mt-0.5">{layer.subtitle}</p>
                    </div>
                    <EngineeringLayerEmblemSVG
                      layerId={layer.id}
                      className="w-8 h-8 shrink-0 transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  <p className="text-xs sm:text-sm text-mineral/85 leading-relaxed mt-3">
                    {layer.description}
                  </p>

                  <div className="mt-3 pt-2.5 border-t border-concrete/15 flex items-center justify-between gap-2 text-[10px] tracking-[0.18em] uppercase">
                    <span className="text-concrete">{layer.technicalParallel}</span>
                    <span className={isActive ? 'text-accent font-semibold' : 'text-metalK'}>
                      {isActive ? '● ÂNGULO 3D ATIVO' : 'FOCAR NO 3D →'}
                    </span>
                  </div>
                </button>
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
