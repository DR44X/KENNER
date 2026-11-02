import React from 'react';
import { BRAND_DATA } from '../../data/brand';
import { useExperienceStore } from '../../store/useExperienceStore';
import { MetalKPinSVG } from '../ui/BrandEmblems';
import { Product3DStage } from '../product/Product3D';

/**
 * Seção 04 — Product Spotlight
 * Estúdio virtual com altura de referência 100dvh (nunca estoura em 320x640 ou 390x844),
 * palco central 3D desobstruído e controles flutuantes com efeito Liquid Glass (.glass-surface).
 */
export const ProductSpotlight: React.FC = () => {
  const activeSpotlightAngleIndex = useExperienceStore((s) => s.activeSpotlightAngleIndex);
  const setActiveSpotlightAngleIndex = useExperienceStore((s) => s.setActiveSpotlightAngleIndex);
  const setActiveStageSlot = useExperienceStore((s) => s.setActiveStageSlot);
  const setManualPresetLockUntil = useExperienceStore((s) => s.setManualPresetLockUntil);
  const setTransformTarget = useExperienceStore((s) => s.setTransformTarget);
  const resetUserOrbitOffset = useExperienceStore((s) => s.resetUserOrbitOffset);
  const userOrbitOffset = useExperienceStore((s) => s.userOrbitOffset);

  const showDebugHud =
    (import.meta as unknown as { env?: Record<string, string> }).env?.VITE_SHOW_3D_DEBUG ===
    'true';

  const activeAngle =
    BRAND_DATA.spotlight.angles[activeSpotlightAngleIndex] ?? BRAND_DATA.spotlight.angles[0];

  const handleSelectAngle = (index: number) => {
    setActiveSpotlightAngleIndex(index);
    setActiveStageSlot('spotlight');
    setManualPresetLockUntil(Date.now() + 2600);
    const angle = BRAND_DATA.spotlight.angles[index];
    if (angle) {
      setTransformTarget({
        position: [0, -0.02, 0],
        rotation: angle.rotation,
        scale: 1.04,
        cameraPosition: [0, 0.24, angle.cameraZ],
        keyLightIntensity: 2.65,
        rimLightIntensity: 0.92,
        stageOpacity: 1,
      });
    }
  };

  const hasCustomOrbit =
    Math.abs(userOrbitOffset.rotX) > 0.01 || Math.abs(userOrbitOffset.rotY) > 0.01;

  return (
    <section
      id="section-spotlight"
      aria-label="Seção 04 — Product Spotlight"
      className="relative z-20 h-[100dvh] max-h-[100dvh] w-full overflow-hidden flex flex-col justify-between pt-[74px] pb-3 sm:pt-20 sm:pb-5 md:pt-24 md:pb-8 border-t border-concrete/15 bg-carbon"
    >
      {/* Cabeçalho compacto do Estúdio Virtual */}
      <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-8 md:px-12 shrink-0 flex flex-wrap items-center justify-between gap-2">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] tracking-[0.24em] uppercase text-metalK font-semibold mb-1">
            <MetalKPinSVG className="w-4 h-4" />
            <span>{BRAND_DATA.spotlight.sectionKicker}</span>
          </div>
          <h2 className="font-display text-lg sm:text-2xl md:text-3xl font-bold uppercase text-mineral leading-tight">
            {BRAND_DATA.spotlight.sectionHeadline}
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="glass-surface hidden sm:flex px-3 py-2 rounded-sm text-[10px] tracking-[0.18em] uppercase text-mineral/85 items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-metalK animate-pulse" />
            <span>ARRASTE PARA ROTACIONAR EM 3D</span>
          </div>

          {hasCustomOrbit && (
            <button
              type="button"
              onClick={resetUserOrbitOffset}
              className="k-pin-glow glass-surface min-h-[44px] px-3.5 py-2 rounded-sm text-[10px] tracking-[0.18em] uppercase text-mineral hover:border-accent"
            >
              RESETAR EIXO
            </button>
          )}
        </div>
      </div>

      {/* Palco central livre (>= 50% da altura da viewport) para inspeção da sandália 3D sem sobreposição */}
      <div className="relative flex-1 min-h-[200px] w-full max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12 my-2 flex items-center justify-center">
        {showDebugHud && (
          <div className="hidden xl:flex flex-col gap-2 text-[10px] tracking-[0.22em] uppercase text-concrete/80 border-l border-metalK/35 pl-3 mr-4">
            <span>KEY LIGHT: 3, 5, 2 (2.6 INT)</span>
            <span>RIM LIGHT: #C9B37A (-4, 1, -2)</span>
            <span>GEOMETRIA: 75.476 TRIÂNGULOS</span>
          </div>
        )}

        <Product3DStage
          slotId="spotlight"
          className="w-full h-full rounded-sm border border-concrete/15 bg-carbon/40"
          interactiveHint="ARRASTE O DEDO OU CURSOR PARA GIRAR"
        />
      </div>

      {/* Console inferior: Carrossel horizontal em mobile e Grid em desktop com controles Liquid Glass */}
      <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-8 md:px-12 shrink-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-2.5 md:gap-4 items-end">
          {/* Seletor de 4 ângulos de câmera (min-h-[48px], gap-2.5 >= 8px) */}
          <div
            className="lg:col-span-8 flex md:grid md:grid-cols-4 overflow-x-auto snap-x snap-mandatory gap-2.5 no-scrollbar pb-1"
            role="group"
            aria-label="Seletores de ângulo de câmera 3D"
          >
            {BRAND_DATA.spotlight.angles.map((angle, idx) => {
              const isSelected = activeSpotlightAngleIndex === idx;
              return (
                <button
                  key={angle.id}
                  type="button"
                  onClick={() => handleSelectAngle(idx)}
                  aria-pressed={isSelected}
                  className={`k-pin-glow glass-surface min-h-[48px] min-w-[148px] sm:min-w-[165px] md:min-w-0 shrink-0 snap-start text-left px-3.5 py-2.5 sm:p-3.5 rounded-sm transition-all ${
                    isSelected
                      ? 'border-metalK bg-metalK/15 text-mineral'
                      : 'text-concrete hover:text-mineral'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <span className="text-[10px] tracking-[0.18em] uppercase text-metalK font-semibold">
                      {angle.label}
                    </span>
                    {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-accent" />}
                  </div>
                  <p className="font-display text-[11px] sm:text-xs uppercase text-mineral tracking-wide truncate">
                    {angle.tag}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Leitura técnica compacta do ângulo selecionado + nota discreta no rodapé da seção */}
          <div className="lg:col-span-4 rounded-sm border border-metalK/30 bg-[#0E0E10] px-3.5 py-2.5 sm:p-4">
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="text-[10px] tracking-[0.2em] uppercase text-metalK font-semibold">
                {activeAngle.label} • {activeAngle.tag}
              </span>
              <span className="text-[9px] tracking-[0.16em] uppercase text-concrete shrink-0">
                REF. RAKKA
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-mineral/85 leading-snug line-clamp-2 md:line-clamp-none">
              {activeAngle.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
