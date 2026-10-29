import React from 'react';
import { BRAND_DATA } from '../../data/brand';
import { useExperienceStore } from '../../store/useExperienceStore';
import { MetalKPinSVG } from '../ui/BrandEmblems';

/**
 * Seção 04 — Product Spotlight
 * Estúdio virtual escuro com pin:true no ScrollTrigger, modelo 3D em escala ampliada,
 * controle de ângulos de câmera e exploração por cursor/toque.
 */
export const ProductSpotlight: React.FC = () => {
  const activeSpotlightAngleIndex = useExperienceStore((s) => s.activeSpotlightAngleIndex);
  const setActiveSpotlightAngleIndex = useExperienceStore((s) => s.setActiveSpotlightAngleIndex);
  const setTransformTarget = useExperienceStore((s) => s.setTransformTarget);
  const resetUserOrbitOffset = useExperienceStore((s) => s.resetUserOrbitOffset);
  const userOrbitOffset = useExperienceStore((s) => s.userOrbitOffset);

  const activeAngle =
    BRAND_DATA.spotlight.angles[activeSpotlightAngleIndex] ?? BRAND_DATA.spotlight.angles[0];

  const handleSelectAngle = (index: number) => {
    setActiveSpotlightAngleIndex(index);
    const angle = BRAND_DATA.spotlight.angles[index];
    if (angle) {
      setTransformTarget({
        position: [0, -0.02, 0.25],
        rotation: angle.rotation,
        scale: 1.12,
        cameraPosition: [0, 0.25, angle.cameraZ],
        keyLightIntensity: 2.6,
        rimLightIntensity: 0.9,
      });
    }
  };

  const hasCustomOrbit =
    Math.abs(userOrbitOffset.rotX) > 0.01 || Math.abs(userOrbitOffset.rotY) > 0.01;

  return (
    <section
      id="section-spotlight"
      aria-label="Seção 04 — Product Spotlight"
      className="relative z-20 min-h-screen w-full overflow-hidden flex flex-col justify-between pt-24 pb-10 md:pt-28 md:pb-12 border-t border-concrete/15 pointer-events-none"
    >
      {/* Cabeçalho superior do Estúdio Virtual */}
      <div className="max-w-[1440px] w-full mx-auto px-5 sm:px-8 md:px-12 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.26em] uppercase text-metalK font-semibold mb-3">
            <MetalKPinSVG className="w-4 h-4" />
            <span>{BRAND_DATA.spotlight.sectionKicker}</span>
          </div>
          <h2 className="h-editorial text-mineral">
            {BRAND_DATA.spotlight.sectionHeadline}
          </h2>
        </div>

        <div className="pointer-events-auto flex flex-wrap items-center gap-3">
          <div className="px-3.5 py-2 rounded-sm border border-metalK/30 bg-carbon/85 backdrop-blur-md text-[10px] tracking-[0.2em] uppercase text-concrete flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-metalK animate-pulse" />
            <span>ARRASTE OU ROLE PARA ROTACIONAR EM 3D</span>
          </div>

          {hasCustomOrbit && (
            <button
              type="button"
              onClick={resetUserOrbitOffset}
              className="k-pin-glow px-3 py-2 rounded-sm border border-accent/60 bg-carbon/90 text-[10px] tracking-[0.2em] uppercase text-mineral hover:border-accent"
            >
              RESETAR EIXO
            </button>
          )}
        </div>
      </div>

      {/* Palco central livre para inspeção da sandália 3D em escala ampliada */}
      <div className="my-auto py-8 md:py-12 flex items-center justify-between max-w-[1440px] w-full mx-auto px-5 sm:px-8 md:px-12">
        <div className="hidden xl:flex flex-col gap-2 text-[10px] tracking-[0.22em] uppercase text-concrete/80 border-l border-metalK/35 pl-3">
          <span>KEY LIGHT: 3, 5, 2 (2.6 INT)</span>
          <span>RIM LIGHT: #C9B37A (-4, 1, -2)</span>
          <span>GEOMETRIA: 75.476 TRIÂNGULOS</span>
        </div>

        <div className="hidden xl:flex flex-col items-end gap-2 text-[10px] tracking-[0.22em] uppercase text-concrete/80 border-r border-metalK/35 pr-3 text-right">
          <span>INTERPRETAÇÃO CONCEITUAL</span>
          <span>LINHA DE REFERÊNCIA: RAKKA</span>
          <span>AMORTECIMENTO: RE.AMP + HIGH-CONFY</span>
        </div>
      </div>

      {/* Console inferior de controle de enquadramentos de estúdio */}
      <div className="max-w-[1440px] w-full mx-auto px-5 sm:px-8 md:px-12 pointer-events-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
          {/* Seletor de 4 ângulos de câmera */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
            {BRAND_DATA.spotlight.angles.map((angle, idx) => {
              const isSelected = activeSpotlightAngleIndex === idx;
              return (
                <button
                  key={angle.id}
                  type="button"
                  onClick={() => handleSelectAngle(idx)}
                  className={`k-pin-glow text-left p-4 rounded-sm border transition-all backdrop-blur-md ${
                    isSelected
                      ? 'border-metalK bg-carbon/95 text-mineral'
                      : 'border-concrete/20 bg-carbon/75 text-concrete hover:text-mineral hover:border-concrete/45'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[10px] tracking-[0.2em] uppercase text-metalK font-semibold">
                      {angle.label}
                    </span>
                    {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-accent" />}
                  </div>
                  <p className="font-display text-xs uppercase text-mineral tracking-wide">
                    {angle.tag}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Leitura técnica do ângulo selecionado */}
          <div className="lg:col-span-4 rounded-sm border border-metalK/35 bg-carbon/90 backdrop-blur-md p-5">
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="text-[10px] tracking-[0.22em] uppercase text-metalK font-semibold">
                {activeAngle.label}
              </span>
              <span className="text-[10px] tracking-[0.18em] uppercase text-concrete">
                FOV 35MM • STUDIO
              </span>
            </div>
            <h3 className="font-display text-base uppercase text-mineral font-bold">
              {activeAngle.tag}
            </h3>
            <p className="text-xs text-mineral/85 leading-relaxed mt-1.5">
              {activeAngle.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
