import React from 'react';
import { BRAND_DATA } from '../../data/brand';
import { useExperienceStore } from '../../store/useExperienceStore';
import { MetalKPinSVG } from '../ui/BrandEmblems';

export const ProductDetails: React.FC = () => {
  const selectedReferenceLineId = useExperienceStore((s) => s.selectedReferenceLineId);
  const setSelectedReferenceLineId = useExperienceStore((s) => s.setSelectedReferenceLineId);
  const activeEngineeringIndex = useExperienceStore((s) => s.activeEngineeringIndex);

  const activeLine =
    BRAND_DATA.referenceLines.find((l) => l.id === selectedReferenceLineId) ??
    BRAND_DATA.referenceLines[0];

  const activeLayer =
    BRAND_DATA.engineering.layers[activeEngineeringIndex] ?? BRAND_DATA.engineering.layers[0];

  return (
    <div className="relative z-20 rounded border border-concrete/20 bg-carbon/85 backdrop-blur-md p-5 md:p-6">
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

      {/* Seletor das 3 linhas reais de referência da Seção 0: Rakka, Kivah, Megah */}
      <div className="flex flex-wrap gap-2 mb-4" role="tablist" aria-label="Linhas de referência Kenner">
        {BRAND_DATA.referenceLines.map((line) => {
          const isSelected = line.id === selectedReferenceLineId;
          return (
            <button
              key={line.id}
              type="button"
              role="tab"
              aria-selected={isSelected}
              onClick={() => setSelectedReferenceLineId(line.id)}
              className={`k-pin-glow px-3.5 py-1.5 text-xs tracking-[0.16em] uppercase border transition-colors ${
                isSelected
                  ? 'border-metalK bg-metalK/15 text-mineral font-semibold'
                  : 'border-concrete/25 bg-carbon/60 text-concrete hover:text-mineral'
              }`}
            >
              {line.name}
              {line.isPrimary3DReference ? ' • 3D REF' : ''}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
        <div className="md:col-span-5">
          <p className="text-[11px] tracking-[0.2em] uppercase text-metalK mb-1">
            {activeLine.yearOrEra}
          </p>
          <h3 className="font-display text-lg uppercase text-mineral tracking-tight">
            {activeLine.name}
          </h3>
          <p className="text-xs text-concrete mt-1">{activeLine.positioning}</p>
        </div>

        <div className="md:col-span-7 border-t md:border-t-0 md:border-l border-concrete/15 pt-3 md:pt-0 md:pl-4">
          <p className="text-xs text-mineral/90 leading-relaxed">{activeLine.engineeringSummary}</p>
          <p className="text-[11px] text-concrete/80 mt-2 italic">
            Nota: Geometria 3D em cena representa interpretação conceitual inspirada na linha Rakka.
          </p>
        </div>
      </div>
    </div>
  );
};
