import React from 'react';
import { BRAND_DATA, ReferenceLine } from '../../data/brand';
import { useExperienceStore } from '../../store/useExperienceStore';
import { MetalKPinSVG } from '../ui/BrandEmblems';

export const ProductDetails: React.FC = () => {
  const selectedReferenceLineId = useExperienceStore((s) => s.selectedReferenceLineId);
  const setSelectedReferenceLineId = useExperienceStore((s) => s.setSelectedReferenceLineId);
  const activeEngineeringIndex = useExperienceStore((s) => s.activeEngineeringIndex);
  const setTransformTarget = useExperienceStore((s) => s.setTransformTarget);
  const setActiveStageSlot = useExperienceStore((s) => s.setActiveStageSlot);
  const setManualPresetLockUntil = useExperienceStore((s) => s.setManualPresetLockUntil);

  const activeLine =
    BRAND_DATA.referenceLines.find((l) => l.id === selectedReferenceLineId) ??
    BRAND_DATA.referenceLines[0];

  const activeLayer =
    BRAND_DATA.engineering.layers[activeEngineeringIndex] ?? BRAND_DATA.engineering.layers[0];

  const handleSelectLine = (line: ReferenceLine) => {
    setSelectedReferenceLineId(line.id);
    setActiveStageSlot('built-different');
    setManualPresetLockUntil(Date.now() + 2600);
    setTransformTarget({
      position: [0, -0.02, 0],
      rotation: line.cameraPreset.rotation,
      scale: 0.98,
      cameraPosition: line.cameraPreset.position,
      keyLightIntensity: 2.5,
      rimLightIntensity: 0.85,
      stageOpacity: 1,
    });
  };

  return (
    <div className="relative z-20 rounded-sm border border-concrete/20 bg-[#0E0E10] p-5 md:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-concrete/15 pb-4 mb-4">
        <div className="flex items-center gap-2.5">
          <MetalKPinSVG className="w-5 h-5" />
          <span className="text-[11px] tracking-[0.22em] uppercase text-metalK font-semibold">
            ARQUITETURA DE LINHA VERIFICADA
          </span>
        </div>
        <span className="text-[10px] tracking-[0.18em] uppercase text-concrete">
          FOCO ATIVO: {activeLayer.cameraPreset.targetLabel}
        </span>
      </div>

      {/* Seletor das 3 linhas reais de referência com padrão ARIA tablist completo e alvos >= 44px */}
      <div
        className="flex flex-wrap gap-2.5 mb-5"
        role="tablist"
        aria-label="Linhas de referência Kenner"
      >
        {BRAND_DATA.referenceLines.map((line) => {
          const isSelected = line.id === selectedReferenceLineId;
          return (
            <button
              key={line.id}
              id={`tab-line-${line.id}`}
              type="button"
              role="tab"
              aria-selected={isSelected}
              aria-controls="tabpanel-reference-line"
              onClick={() => handleSelectLine(line)}
              className={`k-pin-glow min-h-[44px] px-4 py-2 text-xs tracking-[0.16em] uppercase border rounded-sm transition-colors ${
                isSelected
                  ? 'border-metalK bg-metalK/15 text-mineral font-semibold'
                  : 'border-concrete/25 bg-carbon text-concrete hover:text-mineral'
              }`}
            >
              {line.name}
              {line.isPrimary3DReference ? ' • 3D REF' : ''}
            </button>
          );
        })}
      </div>

      <div
        id="tabpanel-reference-line"
        role="tabpanel"
        aria-labelledby={`tab-line-${activeLine.id}`}
        className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start"
      >
        <div className="md:col-span-5">
          <p className="text-[11px] tracking-[0.2em] uppercase text-metalK mb-1">
            {activeLine.yearOrEra}
          </p>
          <h3 className="font-display text-lg uppercase text-mineral tracking-tight">
            {activeLine.name}
          </h3>
          <p className="text-xs text-mineral/80 mt-1">{activeLine.positioning}</p>
        </div>

        <div className="md:col-span-7 border-t md:border-t-0 md:border-l border-concrete/15 pt-3 md:pt-0 md:pl-4">
          <p className="text-xs sm:text-sm text-mineral/90 leading-relaxed">
            {activeLine.engineeringSummary}
          </p>
          <p className="text-[11px] text-concrete mt-2 italic">
            Nota: A seleção acima ajusta o enquadramento e a luz sobre a interpretação conceitual 3D inspirada na linha Rakka.
          </p>
        </div>
      </div>
    </div>
  );
};
