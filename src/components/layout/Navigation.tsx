import React, { useState } from 'react';
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const activeItem = NAV_ITEMS.find((item) => item.id === activeSection) ?? NAV_ITEMS[0];

  const handleNavigate = (target: string) => {
    setMobileMenuOpen(false);
    scrollToSection(target);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-surface">
      {/* Barra superior de progresso de leitura cinematográfica */}
      <div className="w-full h-[2px] bg-carbon/60 overflow-hidden">
        <div
          className="h-full bg-metalK transition-transform duration-150 origin-left"
          style={{ transform: `scaleX(${Math.max(0.02, scrollProgress)})` }}
        />
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12 py-2.5 flex items-center justify-between gap-2">
        {/* Identidade e pino metálico "K" (>= 44x44px) */}
        <button
          type="button"
          onClick={() => handleNavigate('#section-presence')}
          className="k-pin-glow glass-surface min-h-[44px] min-w-[44px] group flex items-center gap-2.5 px-3 py-2 rounded-sm text-left"
          aria-label="Kenner — Voltar ao início da experiência"
        >
          <MetalKPinSVG className="w-6 h-6 shrink-0 transition-transform duration-200 group-hover:scale-105" />
          <div className="flex flex-col">
            <span className="font-display text-xs sm:text-sm tracking-[0.2em] text-mineral font-bold leading-none">
              {BRAND_DATA.meta.brandName}
            </span>
            <span className="text-[9px] tracking-[0.2em] text-concrete uppercase mt-0.5">
              RJ • EST. {BRAND_DATA.meta.foundedYear}
            </span>
          </div>
        </button>

        {/* Navegação de capítulos Desktop (alvos >= 44px e gap >= 8px) */}
        <nav
          aria-label="Capítulos da experiência Kenner"
          className="hidden lg:flex items-center gap-2 px-2 py-1 rounded-sm glass-surface"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavigate(item.target)}
                className={`k-pin-glow min-h-[44px] px-3.5 py-2 rounded-sm text-[11px] tracking-[0.18em] uppercase transition-colors flex items-center gap-1.5 ${
                  isActive
                    ? 'text-mineral bg-metalK/15 border border-metalK/55 font-semibold'
                    : 'text-concrete hover:text-mineral border border-transparent'
                }`}
              >
                <span className={isActive ? 'text-metalK' : 'text-concrete/70'}>{item.index}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Controles à direita: Menu de capítulos Mobile/Tablet + Link rápido Estúdio 3D */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-chapter-nav"
            aria-label="Alternar menu de capítulos"
            className="k-pin-glow glass-surface lg:hidden min-h-[44px] min-w-[44px] px-3 py-2 rounded-sm text-[10px] tracking-[0.18em] uppercase text-mineral flex items-center gap-2"
          >
            <span className="text-metalK font-semibold">{activeItem.index}</span>
            <span className="hidden xs:inline sm:inline truncate max-w-[110px]">
              {activeItem.label}
            </span>
            <span aria-hidden="true" className="text-metalK text-xs leading-none">
              {mobileMenuOpen ? '✕' : '☰'}
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleNavigate('#section-spotlight')}
            className="k-pin-glow glass-surface min-h-[44px] px-3 sm:px-3.5 py-2 rounded-sm text-[10px] sm:text-[11px] tracking-[0.18em] uppercase text-mineral hover:border-metalK flex items-center gap-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
            <span>3D STUDIO</span>
          </button>
        </div>
      </div>

      {/* Gaveta de navegação Mobile/Tablet (< 1024px) com alvos >= 48px e espaçamento >= 8px */}
      {mobileMenuOpen && (
        <nav
          id="mobile-chapter-nav"
          aria-label="Capítulos da experiência Kenner (Mobile)"
          className="lg:hidden glass-surface border-t border-mineral/10 px-4 py-3"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-[1440px] mx-auto">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavigate(item.target)}
                  className={`k-pin-glow min-h-[48px] px-4 py-2.5 rounded-sm text-left text-xs tracking-[0.18em] uppercase flex items-center justify-between border ${
                    isActive
                      ? 'border-metalK bg-metalK/15 text-mineral font-semibold'
                      : 'border-concrete/20 bg-carbon/80 text-concrete hover:text-mineral'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <span className="text-metalK font-semibold">{item.index}</span>
                    <span>{item.label}</span>
                  </span>
                  <span aria-hidden="true" className="text-metalK">
                    →
                  </span>
                </button>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
};
