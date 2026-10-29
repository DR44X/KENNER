import React from 'react';
import { useExperienceStore, ActiveSectionId } from '../../store/useExperienceStore';
import { scrollToSection } from '../../lib/lenis';
import { MetalKPinSVG } from '../ui/BrandEmblems';
import { BRAND_DATA } from '../../data/brand';

const NAV_ITEMS: { id: ActiveSectionId; index: string; label: string; target: string }[] = [
  { id: 'presence', index: '01', label: 'PRESENCE', target: '#section-presence' },
  { id: 'built-different', index: '02', label: 'BUILT DIFFERENT', target: '#section-built-different' },
  { id: 'urban-energy', index: '03', label: 'URBAN ENERGY', target: '#section-urban-energy' },
  { id: 'spotlight', index: '04', label: 'SPOTLIGHT 3D', target: '#section-spotlight' },
  { id: 'final-statement', index: '05', label: 'STATEMENT', target: '#section-final-statement' },
];

export const Navigation: React.FC = () => {
  const activeSection = useExperienceStore((s) => s.activeSection);
  const scrollProgress = useExperienceStore((s) => s.scrollProgress);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 pointer-events-none">
      {/* Barra superior de progresso de leitura cinematográfica */}
      <div className="w-full h-[2px] bg-carbon/60 overflow-hidden">
        <div
          className="h-full bg-metalK transition-transform duration-150 origin-left"
          style={{ transform: `scaleX(${Math.max(0.02, scrollProgress)})` }}
        />
      </div>

      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12 py-4 flex items-center justify-between">
        {/* Identidade e pino metálico "K" */}
        <button
          type="button"
          onClick={() => scrollToSection(0)}
          className="k-pin-glow pointer-events-auto group flex items-center gap-3 px-3 py-2 rounded border border-concrete/20 bg-carbon/80 backdrop-blur-md text-left"
          aria-label="Kenner — Voltar ao início da experiência"
        >
          <MetalKPinSVG className="w-6 h-6 transition-transform duration-300 group-hover:scale-105" />
          <div className="flex flex-col">
            <span className="font-display text-sm tracking-[0.2em] text-mineral font-bold leading-none">
              {BRAND_DATA.meta.brandName}
            </span>
            <span className="text-[9px] tracking-[0.22em] text-concrete uppercase mt-0.5">
              RJ • EST. {BRAND_DATA.meta.foundedYear}
            </span>
          </div>
        </button>

        {/* Navegação de capítulos do Scroll Storytelling */}
        <nav
          aria-label="Capítulos da experiência Kenner"
          className="hidden lg:flex items-center gap-1 pointer-events-auto px-2 py-1.5 rounded border border-concrete/15 bg-carbon/75 backdrop-blur-md"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.target)}
                className={`k-pin-glow px-3 py-1.5 rounded text-[11px] tracking-[0.18em] uppercase transition-colors flex items-center gap-1.5 ${
                  isActive
                    ? 'text-mineral bg-metalK/15 border border-metalK/45 font-semibold'
                    : 'text-concrete hover:text-mineral border border-transparent'
                }`}
              >
                <span className={isActive ? 'text-metalK' : 'text-concrete/70'}>{item.index}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Selo conceitual / link rápido para o estúdio 3D */}
        <div className="pointer-events-auto flex items-center gap-3">
          <button
            type="button"
            onClick={() => scrollToSection('#section-spotlight')}
            className="k-pin-glow px-3.5 py-2 rounded border border-metalK/40 bg-carbon/80 backdrop-blur-md text-[11px] tracking-[0.2em] uppercase text-mineral hover:border-metalK flex items-center gap-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span>INSPECIONAR 3D</span>
          </button>
        </div>
      </div>
    </header>
  );
};
