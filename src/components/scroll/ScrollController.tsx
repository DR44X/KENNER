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
 * ScrollController — Coreografia de Scroll Storytelling (Seção 4, 5 e 7)
 * Uma timeline GSAP por seção com scrub controlado (0.75 a 0.95) e pin:true em Product Spotlight.
 * Atualiza exclusivamente o store Zustand consumido dentro do useFrame do R3F.
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

    const ctx = gsap.context(() => {
      const store = useExperienceStore.getState;

      // Progresso global da página para a barra de leitura superior
      ScrollTrigger.create({
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          store().setScrollProgress(self.progress);
        },
      });

      // =====================================================================
      // SEÇÃO 01 — PRESENCE (Hero) — scrub: 0.75
      // A câmera se aproxima lentamente da sandália 3D enquanto o fundo perde intensidade
      // =====================================================================
      const presenceEl = document.querySelector('#section-presence');
      if (presenceEl) {
        const tlPresence = gsap.timeline({
          scrollTrigger: {
            trigger: presenceEl,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.75,
            onEnter: () => store().setActiveSection('presence'),
            onEnterBack: () => store().setActiveSection('presence'),
            onUpdate: (self) => {
              const p = self.progress;
              store().setSectionProgress('presence', p);
              store().setTransformTarget({
                position: lerpTuple3(INITIAL_TRANSFORM_TARGET.position, [0.0, 0.02, 0.22], p),
                rotation: lerpTuple3(INITIAL_TRANSFORM_TARGET.rotation, [0.16, -0.95, 0.04], p),
                scale: lerp(0.92, 1.08, p),
                cameraPosition: lerpTuple3([0, 0.4, 2.6], [0, 0.25, 2.15], p),
                keyLightIntensity: lerp(2.2, 2.55, p),
                rimLightIntensity: lerp(0.6, 0.85, p),
                stageOpacity: 1,
              });
            },
          },
        });

        tlPresence
          .to(
            '[data-hero-model-layer]',
            {
              opacity: 0.22,
              scale: 1.1,
              yPercent: 14,
              ease: 'none',
            },
            0
          )
          .to(
            '[data-hero-title-back]',
            {
              xPercent: -8,
              opacity: 0.25,
              ease: 'none',
            },
            0
          )
          .to(
            '[data-hero-title-front]',
            {
              xPercent: 6,
              yPercent: -15,
              opacity: 0.2,
              ease: 'none',
            },
            0
          )
          .to(
            '[data-hero-cta-block]',
            {
              yPercent: 20,
              opacity: 0,
              ease: 'none',
            },
            0
          );
      }

      // =====================================================================
      // SEÇÃO 02 — BUILT DIFFERENT — scrub: 0.85
      // Inspeciona as camadas reais de engenharia (Vulcanizado, Re.Amp, Neoprene, Polímero, Pino K)
      // =====================================================================
      const bdEl = document.querySelector('#section-built-different');
      if (bdEl) {
        const layers = BRAND_DATA.engineering.layers;

        const tlBuiltDifferent = gsap.timeline({
          scrollTrigger: {
            trigger: bdEl,
            start: 'top 75%',
            end: 'bottom 25%',
            scrub: 0.85,
            onEnter: () => store().setActiveSection('built-different'),
            onEnterBack: () => store().setActiveSection('built-different'),
            onUpdate: (self) => {
              const p = self.progress;
              store().setSectionProgress('built-different', p);

              const rawIdx = p * (layers.length - 1);
              const idxA = Math.min(layers.length - 1, Math.floor(rawIdx));
              const idxB = Math.min(layers.length - 1, idxA + 1);
              const localT = rawIdx - idxA;

              store().setActiveEngineeringIndex(Math.round(rawIdx));

              const presetA = layers[idxA].cameraPreset;
              const presetB = layers[idxB].cameraPreset;

              store().setTransformTarget({
                position: lerpTuple3([-0.22, -0.04, 0.08], [-0.18, 0.02, 0.12], p),
                rotation: lerpTuple3(presetA.rotation, presetB.rotation, localT),
                scale: 1.0,
                cameraPosition: lerpTuple3(presetA.position, presetB.position, localT),
                keyLightIntensity: 2.4,
                rimLightIntensity: 0.78,
                stageOpacity: 0.92,
              });
            },
          },
        });

        tlBuiltDifferent
          .fromTo(
            '[data-bd-reveal]',
            { y: 36, opacity: 0.15 },
            { y: 0, opacity: 1, stagger: 0.08, ease: 'power2.out' },
            0
          )
          .fromTo(
            '[data-bd-mask-photo]',
            { clipPath: 'inset(12% 6% 12% 6%)', scale: 0.96 },
            { clipPath: 'inset(0% 0% 0% 0%)', scale: 1, stagger: 0.15, ease: 'power2.out' },
            0.05
          );
      }

      // =====================================================================
      // SEÇÃO 03 — URBAN ENERGY — scrub: 0.9
      // Narrativa editorial "Kenner de cria", concreto, baile e herança carioca
      // =====================================================================
      const ueEl = document.querySelector('#section-urban-energy');
      if (ueEl) {
        const tlUrbanEnergy = gsap.timeline({
          scrollTrigger: {
            trigger: ueEl,
            start: 'top 70%',
            end: 'bottom 25%',
            scrub: 0.9,
            onEnter: () => store().setActiveSection('urban-energy'),
            onEnterBack: () => store().setActiveSection('urban-energy'),
            onUpdate: (self) => {
              const p = self.progress;
              store().setSectionProgress('urban-energy', p);
              store().setTransformTarget({
                position: lerpTuple3([0.0, 0.05, -0.15], [0.0, -0.02, 0.1], p),
                rotation: lerpTuple3([0.35, -1.2, 0.1], [0.15, 0.45, -0.05], p),
                scale: 1.05,
                cameraPosition: [0, 0.35, 2.75],
                keyLightIntensity: 1.6,
                rimLightIntensity: 0.85,
                stageOpacity: 0.28,
              });
            },
          },
        });

        tlUrbanEnergy
          .fromTo(
            '[data-ue-reveal]',
            { y: 40, opacity: 0.15 },
            { y: 0, opacity: 1, stagger: 0.08, ease: 'power2.out' },
            0
          )
          .fromTo(
            '[data-ue-frame]',
            { y: 48, clipPath: 'inset(10% 4% 10% 4%)' },
            { y: 0, clipPath: 'inset(0% 0% 0% 0%)', stagger: 0.12, ease: 'none' },
            0.05
          )
          .fromTo(
            '[data-ue-parallax-type]',
            { xPercent: -6 },
            { xPercent: 4, ease: 'none' },
            0
          );
      }

      // =====================================================================
      // SEÇÃO 04 — PRODUCT SPOTLIGHT — pin: true, scrub: 0.85
      // Estúdio virtual dedicado inteiramente à exploração escultural da sandália 3D
      // =====================================================================
      const spotlightEl = document.querySelector('#section-spotlight');
      if (spotlightEl) {
        const angles = BRAND_DATA.spotlight.angles;

        gsap.timeline({
          scrollTrigger: {
            trigger: spotlightEl,
            start: 'top top',
            end: '+=160%',
            pin: true,
            scrub: 0.85,
            onEnter: () => store().setActiveSection('spotlight'),
            onEnterBack: () => store().setActiveSection('spotlight'),
            onUpdate: (self) => {
              const p = self.progress;
              store().setSectionProgress('spotlight', p);

              const scaled = p * (angles.length - 1);
              const idxA = Math.min(angles.length - 1, Math.floor(scaled));
              const idxB = Math.min(angles.length - 1, idxA + 1);
              const localT = scaled - idxA;

              store().setActiveSpotlightAngleIndex(Math.round(scaled));

              const rot = lerpTuple3(angles[idxA].rotation, angles[idxB].rotation, localT);
              const camZ = lerp(angles[idxA].cameraZ, angles[idxB].cameraZ, localT);

              store().setTransformTarget({
                position: [0, -0.02, 0.18],
                rotation: rot,
                scale: 1.12,
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
      // SEÇÃO 05 — FINAL STATEMENT — scrub: 0.8
      // Fechamento monumental ("O SEU CAMINHO. A SUA MARCA.") + assinatura "K"
      // =====================================================================
      const fsEl = document.querySelector('#section-final-statement');
      if (fsEl) {
        const tlFinal = gsap.timeline({
          scrollTrigger: {
            trigger: fsEl,
            start: 'top 75%',
            end: 'bottom bottom',
            scrub: 0.8,
            onEnter: () => store().setActiveSection('final-statement'),
            onEnterBack: () => store().setActiveSection('final-statement'),
            onUpdate: (self) => {
              const p = self.progress;
              store().setSectionProgress('final-statement', p);
              store().setTransformTarget({
                position: lerpTuple3([0, -0.02, 0.35], [0.22, -0.06, 0.22], p),
                rotation: lerpTuple3([0.24, -0.78, 0.06], [0.28, -0.44, 0.08], p),
                scale: lerp(1.38, 1.18, p),
                cameraPosition: [0, 0.35, 2.45],
                keyLightIntensity: 2.3,
                rimLightIntensity: 0.75,
                stageOpacity: 0.85,
              });
            },
          },
        });

        tlFinal.fromTo(
          '[data-fs-reveal]',
          { y: 36, opacity: 0.2 },
          { y: 0, opacity: 1, stagger: 0.1, ease: 'power2.out' },
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
