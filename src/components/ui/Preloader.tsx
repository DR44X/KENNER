import React, { useEffect, useRef, useState } from 'react';
import { TractorSoleSilhouetteSVG, MetalKPinSVG } from './BrandEmblems';
import { useExperienceStore, LoadingStageId } from '../../store/useExperienceStore';

interface PreloaderProps {
  visible?: boolean;
}

const STAGE_CHECKLIST: { id: LoadingStageId; label: string; minProgress: number }[] = [
  { id: 'init', label: '01. TIPOGRAFIA & APLICAÇÃO', minProgress: 10 },
  { id: 'hero-assets', label: '02. FOTOGRAFIA EDITORIAL HERO', minProgress: 25 },
  { id: 'downloading-3d', label: '03. DOWNLOAD GLB DRACO & HDRI', minProgress: 70 },
  { id: 'processing-3d', label: '04. PROCESSAMENTO DE MALHA PBR', minProgress: 85 },
  { id: 'initializing-scene', label: '05. COMPILAÇÃO WEBGL & CENA 3D', minProgress: 100 },
];

/**
 * 14.10. Real Loading Progress — Sincronizado com recursos reais (Fontes, Imagem Hero,
 * DefaultLoadingManager do Three.js, Descompressão Draco e Compilação do 1º Frame WebGL).
 */
export const Preloader: React.FC<PreloaderProps> = () => {
  const loadingProgress = useExperienceStore((s) => s.loadingProgress);
  const loadingStage = useExperienceStore((s) => s.loadingStage);
  const loadingStageLabel = useExperienceStore((s) => s.loadingStageLabel);
  const loadingItemsLoaded = useExperienceStore((s) => s.loadingItemsLoaded);
  const loadingItemsTotal = useExperienceStore((s) => s.loadingItemsTotal);
  const loadingError = useExperienceStore((s) => s.loadingError);
  const isSceneReady = useExperienceStore((s) => s.isSceneReady);

  const [displayProgress, setDisplayProgress] = useState(0);
  const [dismissed, setDismissed] = useState(false);
  const currentValRef = useRef(0);

  // Interpolação contínua via rAF para movimento fluido e monotônico (nunca retrocede)
  useEffect(() => {
    let rafId: number | null = null;

    const step = () => {
      const target = loadingProgress;
      const diff = target - currentValRef.current;

      if (Math.abs(diff) > 0.25) {
        // Passo proporcional à distância real medida, sem inventar progresso
        const next = currentValRef.current + Math.max(0.4, diff * 0.22);
        currentValRef.current = Math.min(target, Math.max(currentValRef.current, next));
        setDisplayProgress(Math.round(currentValRef.current));
        rafId = window.requestAnimationFrame(step);
      } else {
        currentValRef.current = Math.max(currentValRef.current, target);
        setDisplayProgress(Math.round(currentValRef.current));
      }
    };

    rafId = window.requestAnimationFrame(step);
    return () => {
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [loadingProgress]);

  // Só dispensa o loader quando a cena está efetivamente pronta (100% real) ou em fallback de erro
  useEffect(() => {
    if ((isSceneReady && displayProgress >= 100) || loadingStage === 'error-fallback') {
      const timer = window.setTimeout(() => {
        setDismissed(true);
      }, 320);
      return () => window.clearTimeout(timer);
    }
  }, [isSceneReady, displayProgress, loadingStage]);

  if (dismissed) return null;

  const isFinishing = (isSceneReady && displayProgress >= 100) || loadingStage === 'error-fallback';

  return (
    <div
      className={`pointer-events-none absolute inset-0 z-30 flex flex-col items-center justify-center p-4 transition-opacity duration-500 ${
        isFinishing ? 'opacity-0' : 'opacity-100'
      }`}
      role="status"
      aria-live="polite"
      aria-busy={!isSceneReady}
    >
      <div className="glass-surface w-full max-w-md rounded-sm p-5 sm:p-6 flex flex-col">
        {/* Cabeçalho do Loader */}
        <div className="flex items-center justify-between gap-2 pb-3 mb-4 border-b border-mineral/10">
          <div className="flex items-center gap-2">
            <MetalKPinSVG className="w-4 h-4" />
            <span className="text-[10px] tracking-[0.26em] uppercase text-metalK font-semibold">
              KENNER 3D ENGINE • TELEMETRIA REAL
            </span>
          </div>
          <span className="font-display text-sm sm:text-base font-bold text-mineral tabular-nums">
            {loadingStage === 'error-fallback' ? 'CONTINGÊNCIA' : `${displayProgress}%`}
          </span>
        </div>

        {/* Silhueta técnica do solado tratorado */}
        <div className="relative flex items-center justify-center py-2">
          <TractorSoleSilhouetteSVG className="w-48 sm:w-56 h-20 opacity-90" />
        </div>

        {/* Barra de progresso sincronizada via transform: scaleX */}
        <div className="w-full h-1.5 bg-carbon/90 border border-concrete/25 rounded-full overflow-hidden mt-3">
          <div
            className="h-full bg-metalK origin-left transition-transform duration-150"
            style={{
              transform: `scaleX(${Math.max(0.02, displayProgress / 100)})`,
            }}
          />
        </div>

        {/* Estado verificável atual e contagem real de buffers do DefaultLoadingManager */}
        <div className="mt-3 flex items-center justify-between gap-2 text-[10px] tracking-[0.18em] uppercase">
          <span className="text-mineral/90 truncate">{loadingStageLabel}</span>
          <span className="text-concrete shrink-0 tabular-nums">
            {loadingItemsLoaded}/{loadingItemsTotal} RECURSOS
          </span>
        </div>

        {/* Etapas verificáveis */}
        <div className="mt-3 pt-2.5 border-t border-mineral/10 grid grid-cols-1 gap-1">
          {STAGE_CHECKLIST.map((st) => {
            const done = displayProgress >= st.minProgress;
            return (
              <div
                key={st.id}
                className="flex items-center justify-between text-[9px] tracking-[0.16em] uppercase"
              >
                <span className={done ? 'text-mineral/90' : 'text-concrete/60'}>{st.label}</span>
                <span className={done ? 'text-metalK font-semibold' : 'text-concrete/50'}>
                  {done ? 'OK' : 'AGUARDANDO'}
                </span>
              </div>
            );
          })}
        </div>

        {loadingError && (
          <p className="mt-2.5 text-[10px] text-accent tracking-[0.14em] uppercase">
            {loadingError}
          </p>
        )}
      </div>
    </div>
  );
};
