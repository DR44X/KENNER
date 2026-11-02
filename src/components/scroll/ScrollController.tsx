import React, { useEffect } from 'react';
import { gsap, ScrollTrigger } from '../../lib/gsap';
import { initLenis } from '../../lib/lenis';
import {
  useExperienceStore,
  INITIAL_TRANSFORM_TARGET,
} from '../../store/useExperienceStore';
import { BRAND_DATA } from '../../data/brand';

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function lerpTuple3(
  a: readonly [number, number, number],
  b: readonly [number, number, number],
  t: number
): [number, number, number] {
  return [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];
}

/**
 * ScrollController — Coreografia de Scroll Storytelling responsiva
 * Recalcula start/end em função de window.innerHeight real, usa scrub curto no mobile (0.35–0.5)
 * e respeita bloqueio temporário de presets acionados manualmente pelo usuário.
 */
export const ScrollController: React.FC<{ sectionsReady?: boolean }> = ({
  sectionsReady = true,
}) => {
  const prefersReducedMotion = useExperienceStore((s) => s.prefersReducedMotion);

  useEffect(() => {
    const destroyLenis = initLenis(prefersReducedMotion);
    return () => {
      destroyLenis();
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion || !sectionsReady) {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      return;
    }

    const isMobile = window.innerWidth < 768;
    const scrubHero = isMobile ? 0.35 : 0.75;
    const scrubSection = isMobile ? 0.45 : 0.85;
    const scrubSpotlight = isMobile ? 0.4 : 0.85;

    const ctx = gsap.context(() => {
      const store = useExperienceStore.getState;

      // Progresso global da página para a barra de leitura superior
      ScrollTrigger.create({
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          store().setScrollProgress(self.progress);
        },
      });

      // =====================================================================
      // SEÇÃO 01 — PRESENCE (Hero)
      // =====================================================================
      const presenceEl = document.querySelector('#section-presence');
      if (presenceEl) {
        const tlPresence = gsap.timeline({
          scrollTrigger: {
            trigger: presenceEl,
            start: 'top top',
            end: () => `+=${Math.round(window.innerHeight * (window.innerWidth < 768 ? 0.85 : 1.0))}`,
            scrub: scrubHero,
            invalidateOnRefresh: true,
            onEnter: () => store().setActiveSection('presence'),
            onEnterBack: () => store().setActiveSection('presence'),
            onUpdate: (self) => {
              const p = self.progress;
              store().setSectionProgress('presence', p);
              if (Date.now() < store().manualPresetLockUntil) return;

              store().setTransformTarget({
                position: [0.0, -0.02, 0.0],
                rotation: lerpTuple3(INITIAL_TRANSFORM_TARGET.rotation, [0.18, -0.88, 0.04], p),
                scale: lerp(0.92, 1.04, p),
                cameraPosition: lerpTuple3([0, 0.36, 2.45], [0, 0.26, 2.18], p),
                keyLightIntensity: lerp(2.3, 2.55, p),
                rimLightIntensity: lerp(0.75, 0.88, p),
                stageOpacity: 1,
              });
            },
          },
        });

        // No mobile, deslocamento de parallax sutil (<= 10% do viewport) e máximo 2 planos
        tlPresence
          .to(
            '[data-hero-model-layer]',
            {
              opacity: isMobile ? 0.25 : 0.22,
              scale: isMobile ? 1.04 : 1.08,
              yPercent: isMobile ? 8 : 12,
              ease: 'power2.out',
            },
            0
          )
          .to(
            '[data-hero-title-back]',
            {
              xPercent: isMobile ? -3 : -6,
              opacity: isMobile ? 0.65 : 0.35,
              ease: 'power2.out',
            },
            0
          );
      }

      // =====================================================================
      // SEÇÃO 02 — BUILT DIFFERENT
      // =====================================================================
      const bdEl = document.querySelector('#section-built-different');
      if (bdEl) {
        const layers = BRAND_DATA.engineering.layers;

        const tlBuiltDifferent = gsap.timeline({
          scrollTrigger: {
            trigger: bdEl,
            start: () => `top ${Math.round(window.innerHeight * 0.78)}px`,
            end: () => `bottom ${Math.round(window.innerHeight * 0.25)}px`,
            scrub: scrubSection,
            invalidateOnRefresh: true,
            onEnter: () => store().setActiveSection('built-different'),
            onEnterBack: () => store().setActiveSection('built-different'),
            onUpdate: (self) => {
              const p = self.progress;
              store().setSectionProgress('built-different', p);

              // Se o usuário clicou manualmente em uma camada ou linha, preserva o enquadramento escolhido
              if (Date.now() < store().manualPresetLockUntil) return;

              const rawIdx = p * (layers.length - 1);
              const idxA = Math.min(layers.length - 1, Math.floor(rawIdx));
              const idxB = Math.min(layers.length - 1, idxA + 1);
              const localT = rawIdx - idxA;

              store().setActiveEngineeringIndex(Math.round(rawIdx));

              const presetA = layers[idxA].cameraPreset;
              const presetB = layers[idxB].cameraPreset;

              store().setTransformTarget({
                position: [0, -0.02, 0],
                rotation: lerpTuple3(presetA.rotation, presetB.rotation, localT),
                scale: 0.96,
                cameraPosition: lerpTuple3(presetA.position, presetB.position, localT),
                keyLightIntensity: 2.45,
                rimLightIntensity: 0.82,
                stageOpacity: 1,
              });
            },
          },
        });

        tlBuiltDifferent.fromTo(
          '[data-bd-reveal]',
          { y: isMobile ? 20 : 32, opacity: 0.25 },
          { y: 0, opacity: 1, stagger: 0.06, ease: 'power2.out' },
          0
        );
      }

      // =====================================================================
      // SEÇÃO 03 — URBAN ENERGY
      // =====================================================================
      const ueEl = document.querySelector('#section-urban-energy');
      if (ueEl) {
        const tlUrbanEnergy = gsap.timeline({
          scrollTrigger: {
            trigger: ueEl,
            start: () => `top ${Math.round(window.innerHeight * 0.78)}px`,
            end: () => `bottom ${Math.round(window.innerHeight * 0.25)}px`,
            scrub: scrubSection,
            invalidateOnRefresh: true,
            onEnter: () => store().setActiveSection('urban-energy'),
            onEnterBack: () => store().setActiveSection('urban-energy'),
            onUpdate: (self) => {
              store().setSectionProgress('urban-energy', self.progress);
            },
          },
        });

        tlUrbanEnergy
          .fromTo(
            '[data-ue-reveal]',
            { y: isMobile ? 20 : 34, opacity: 0.25 },
            { y: 0, opacity: 1, stagger: 0.06, ease: 'power2.out' },
            0
          )
          .fromTo(
            '[data-ue-frame]',
            { y: isMobile ? 22 : 40 },
            { y: 0, stagger: 0.1, ease: 'power2.out' },
            0.04
          )
          .fromTo(
            '[data-ue-parallax-type]',
            { xPercent: isMobile ? -3 : -6 },
            { xPercent: isMobile ? 3 : 4, ease: 'power2.out' },
            0
          );
      }

      // =====================================================================
      // SEÇÃO 04 — PRODUCT SPOTLIGHT — pin: true com distância recalibrada para mobile
      // =====================================================================
      const spotlightEl = document.querySelector('#section-spotlight');
      if (spotlightEl) {
        const angles = BRAND_DATA.spotlight.angles;

        gsap.timeline({
          scrollTrigger: {
            trigger: spotlightEl,
            start: 'top top',
            end: () => `+=${Math.round(window.innerHeight * (window.innerWidth < 768 ? 1.05 : 1.5))}`,
            pin: true,
            scrub: scrubSpotlight,
            invalidateOnRefresh: true,
            onEnter: () => store().setActiveSection('spotlight'),
            onEnterBack: () => store().setActiveSection('spotlight'),
            onUpdate: (self) => {
              const p = self.progress;
              store().setSectionProgress('spotlight', p);

              // Preserva o ângulo clicado manualmente pelo usuário durante a janela de bloqueio
              if (Date.now() < store().manualPresetLockUntil) return;

              const scaled = p * (angles.length - 1);
              const idxA = Math.min(angles.length - 1, Math.floor(scaled));
              const idxB = Math.min(angles.length - 1, idxA + 1);
              const localT = scaled - idxA;

              store().setActiveSpotlightAngleIndex(Math.round(scaled));

              const rot = lerpTuple3(angles[idxA].rotation, angles[idxB].rotation, localT);
              const camZ = lerp(angles[idxA].cameraZ, angles[idxB].cameraZ, localT);

              store().setTransformTarget({
                position: [0, -0.02, 0],
                rotation: rot,
                scale: 1.04,
                cameraPosition: [0, 0.24, camZ],
                keyLightIntensity: 2.65,
                rimLightIntensity: 0.92,
                stageOpacity: 1,
              });
            },
          },
        });
      }

      // =====================================================================
      // SEÇÃO 05 — FINAL STATEMENT
      // =====================================================================
      const fsEl = document.querySelector('#section-final-statement');
      if (fsEl) {
        const tlFinal = gsap.timeline({
          scrollTrigger: {
            trigger: fsEl,
            start: () => `top ${Math.round(window.innerHeight * 0.8)}px`,
            end: 'bottom bottom',
            scrub: scrubSection,
            invalidateOnRefresh: true,
            onEnter: () => store().setActiveSection('final-statement'),
            onEnterBack: () => store().setActiveSection('final-statement'),
            onUpdate: (self) => {
              store().setSectionProgress('final-statement', self.progress);
            },
          },
        });

        tlFinal.fromTo(
          '[data-fs-reveal]',
          { y: isMobile ? 18 : 32, opacity: 0.25 },
          { y: 0, opacity: 1, stagger: 0.08, ease: 'power2.out' },
          0
        );
      }

      ScrollTrigger.refresh();
    });

    return () => {
      ctx.revert();
    };
  }, [prefersReducedMotion, sectionsReady]);

  return null;
};
