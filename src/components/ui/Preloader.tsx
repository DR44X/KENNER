import React from 'react';
import { TractorSoleSilhouetteSVG, MetalKPinSVG } from './BrandEmblems';

interface PreloaderProps {
  visible: boolean;
  label?: string;
}

/**
 * Placeholder de pré-carregamento 3D usando a silhueta do solado tratorado (Seção 8).
 * Renderizado de forma não-bloqueante dentro do palco 3D para garantir LCP < 2.5s
 * e nunca exibir uma tela preta vazia.
 */
export const Preloader: React.FC<PreloaderProps> = ({
  visible,
  label = 'CARREGANDO GEOMETRIA 3D • REF. RAKKA (75K TRIS)',
}) => {
  if (!visible) return null;

  return (
    <div
      className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center transition-opacity duration-500"
      role="status"
      aria-live="polite"
    >
      <div className="relative flex flex-col items-center px-6 py-5 rounded border border-metalK/25 bg-carbon/85 backdrop-blur-sm">
        <div className="flex items-center gap-2 mb-3">
          <MetalKPinSVG className="w-4 h-4" />
          <span className="text-[10px] tracking-[0.28em] uppercase text-metalK font-medium">
            KENNER 3D ENGINE
          </span>
        </div>

        <TractorSoleSilhouetteSVG className="w-56 h-24 animate-pulse" />

        <div className="mt-3 flex items-center gap-2.5">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
          <span className="text-[11px] tracking-[0.18em] uppercase text-concrete">
            {label}
          </span>
        </div>
      </div>
    </div>
  );
};
