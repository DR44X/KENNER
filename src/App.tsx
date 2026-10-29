import React, { Suspense, lazy, useEffect, useState } from 'react';
import { Navigation } from './components/layout/Navigation';
import { HeroExperience } from './components/hero/HeroExperience';
import { BuiltDifferent } from './components/sections/BuiltDifferent';
import { Product3D } from './components/product/Product3D';
import { ScrollController } from './components/scroll/ScrollController';
import { useExperienceStore } from './components/scroll/../../store/useExperienceStore';
import { TractorSoleSilhouetteSVG } from './components/ui/BrandEmblems';

// React.lazy + Suspense nas seções abaixo da dobra conforme Seção 8
const UrbanEnergy = lazy(() =>
  import('./components/sections/UrbanEnergy').then((m) => ({ default: m.UrbanEnergy }))
);
const ProductSpotlight = lazy(() =>
  import('./components/sections/ProductSpotlight').then((m) => ({ default: m.ProductSpotlight }))
);
const FinalStatement = lazy(() =>
  import('./components/sections/FinalStatement').then((m) => ({ default: m.FinalStatement }))
);

function detectWebGLSupport(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl2') || canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

const BelowFoldResolveNotifier: React.FC<{ onMounted: () => void }> = ({ onMounted }) => {
  useEffect(() => {
    onMounted();
  }, [onMounted]);
  return null;
};

export const App: React.FC = () => {
  const setPrefersReducedMotion = useExperienceStore((s) => s.setPrefersReducedMotion);
  const setWebglSupported = useExperienceStore((s) => s.setWebglSupported);
  const [belowFoldReady, setBelowFoldReady] = useState(false);

  useEffect(() => {
    setWebglSupported(detectWebGLSupport());

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    let lastMatches = mq.matches;
    setPrefersReducedMotion(lastMatches);

    const handleChange = (e: MediaQueryListEvent) => {
      lastMatches = e.matches;
      setPrefersReducedMotion(e.matches);
    };

    mq.addEventListener('change', handleChange);

    // Garante detecção imediata mesmo sob emulação via DevTools CDP
    const syncId = window.setInterval(() => {
      const current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (current !== lastMatches) {
        lastMatches = current;
        setPrefersReducedMotion(current);
      }
    }, 300);

    return () => {
      mq.removeEventListener('change', handleChange);
      window.clearInterval(syncId);
    };
  }, [setPrefersReducedMotion, setWebglSupported]);

  return (
    <div className="relative min-h-screen bg-carbon text-mineral selection:bg-metalK selection:text-carbon">
      {/* Navegação fixa com progresso e emblema metálico "K" */}
      <Navigation />

      {/* Palco 3D persistente (ou fallback estático para sem WebGL / reduced-motion) */}
      <Product3D />

      {/* Coreografia de Scroll Storytelling sincronizada com Lenis + Zustand */}
      <ScrollController sectionsReady={belowFoldReady} />

      {/* Conteúdo narrativo em camadas */}
      <main id="main-content" className="relative">
        <HeroExperience />
        <BuiltDifferent />

        <Suspense
          fallback={
            <div className="py-24 flex flex-col items-center justify-center text-concrete">
              <TractorSoleSilhouetteSVG className="w-40 h-20 opacity-60 animate-pulse" />
              <span className="text-[11px] tracking-[0.22em] uppercase mt-2">
                PREPARANDO CAPÍTULOS EDITORIAIS...
              </span>
            </div>
          }
        >
          <UrbanEnergy />
          <ProductSpotlight />
          <FinalStatement />
          <BelowFoldResolveNotifier onMounted={() => setBelowFoldReady(true)} />
        </Suspense>
      </main>
    </div>
  );
};

export default App;
