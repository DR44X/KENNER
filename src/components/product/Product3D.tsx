import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  ContactShadows,
  Environment,
  PerspectiveCamera,
  Preload,
  useGLTF,
} from '@react-three/drei';
import {
  DefaultLoadingManager,
  DirectionalLight,
  Group,
  MathUtils,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera as ThreePerspectiveCamera,
  PointLight,
} from 'three';
import { useExperienceStore, StageSlotId } from '../../store/useExperienceStore';
import { Preloader } from '../ui/Preloader';
import { TractorSoleSilhouetteSVG, MetalKPinSVG } from '../ui/BrandEmblems';

// Intercepta o preset HDRI do Drei para carregar instantaneamente o HDRI local de estúdio
DefaultLoadingManager.setURLModifier((url) => {
  if (url.includes('potsdamer_platz_1k.hdr')) {
    return '/assets/hdri/potsdamer_platz_1k.hdr';
  }
  return url;
});

// Pré-carregamento com decoder Draco local (/assets/draco/gltf/)
useGLTF.preload('/assets/models/kenner-rakka.glb', '/assets/draco/gltf/');

function clamp(val: number, min: number, max: number) {
  return Math.max(min, Math.min(max, val));
}

const KennerRakkaMesh: React.FC = () => {
  const { scene } = useGLTF('/assets/models/kenner-rakka.glb', '/assets/draco/gltf/');
  const groupRef = useRef<Group>(null);
  const kHighlightLightRef = useRef<PointLight>(null);
  const setIsModelLoaded = useExperienceStore((s) => s.setIsModelLoaded);

  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((child) => {
      if ((child as Mesh).isMesh) {
        const mesh = child as Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        if (mesh.material) {
          const mat = mesh.material as MeshStandardMaterial;
          if (mat.name === 'Kenner_Metal_K_Pin') {
            mat.metalness = 0.94;
            mat.roughness = 0.18;
            mat.envMapIntensity = 2.4;
          } else {
            mat.envMapIntensity = 1.35;
          }
          mat.needsUpdate = true;
        }
      }
    });
    return clone;
  }, [scene]);

  useEffect(() => {
    setIsModelLoaded(true);
  }, [setIsModelLoaded]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const store = useExperienceStore.getState();
    const {
      transformTarget,
      pointer,
      userOrbitOffset,
      prefersReducedMotion,
      isCoarsePointer,
    } = store;

    // Inércia suave calibrada para resposta imediata ao toque no mobile e fluidez no desktop
    const smoothFactor = prefersReducedMotion
      ? 1 - Math.exp(-delta * 12)
      : 1 - Math.exp(-delta * (isCoarsePointer ? 8.5 : 6.5));
    const t = state.clock.getElapsedTime();

    // Flutuação sutil e controlada (desativada em reduced-motion)
    const floatY = prefersReducedMotion ? 0 : Math.sin(t * 1.35) * 0.015;
    const floatRotZ = prefersReducedMotion ? 0 : Math.cos(t * 1.05) * 0.01;

    // No touch (isCoarsePointer), usa exclusivamente o gesto de arraste com inércia (sem mousemove fantasma)
    const pointerX = isCoarsePointer || prefersReducedMotion ? 0 : pointer.x;
    const pointerY = isCoarsePointer || prefersReducedMotion ? 0 : pointer.y;

    const cursorRotY = clamp(pointerX * 0.2 + userOrbitOffset.rotY, -0.85, 0.85);
    const cursorRotX = clamp(-pointerY * 0.12 + userOrbitOffset.rotX, -0.45, 0.45);

    const targetPosX = transformTarget.position[0] + pointerX * 0.03;
    const targetPosY = transformTarget.position[1] + floatY + pointerY * 0.02;
    const targetPosZ = transformTarget.position[2];

    const targetRotX = transformTarget.rotation[0] + cursorRotX;
    const targetRotY = transformTarget.rotation[1] + cursorRotY;
    const targetRotZ = transformTarget.rotation[2] + floatRotZ;

    groupRef.current.position.x = MathUtils.lerp(
      groupRef.current.position.x,
      targetPosX,
      smoothFactor
    );
    groupRef.current.position.y = MathUtils.lerp(
      groupRef.current.position.y,
      targetPosY,
      smoothFactor
    );
    groupRef.current.position.z = MathUtils.lerp(
      groupRef.current.position.z,
      targetPosZ,
      smoothFactor
    );

    groupRef.current.rotation.x = MathUtils.lerp(
      groupRef.current.rotation.x,
      targetRotX,
      smoothFactor
    );
    groupRef.current.rotation.y = MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotY,
      smoothFactor
    );
    groupRef.current.rotation.z = MathUtils.lerp(
      groupRef.current.rotation.z,
      targetRotZ,
      smoothFactor
    );

    // Escala responsiva em função da largura do palco/viewport para nunca cortar nas bordas
    const viewportW = typeof window !== 'undefined' ? window.innerWidth : state.size.width;
    const widthScaleFactor = clamp(viewportW / 860, 0.78, 1.0);
    const aspectFactor = clamp((state.size.width / Math.max(1, state.size.height)) / 1.3, 0.88, 1.05);
    const effectiveTargetScale = transformTarget.scale * widthScaleFactor * aspectFactor;

    const currentScale = groupRef.current.scale.x;
    const nextScale = MathUtils.lerp(currentScale, effectiveTargetScale, smoothFactor);
    groupRef.current.scale.setScalar(nextScale);

    // Sincroniza posição e FOV da câmera suavemente dentro do loop useFrame
    const isMobileViewport = viewportW < 768;
    const targetFov = isMobileViewport ? 39 : transformTarget.cameraFov;
    const cam = state.camera as ThreePerspectiveCamera;
    if (Math.abs(cam.fov - targetFov) > 0.05) {
      cam.fov = MathUtils.lerp(cam.fov, targetFov, smoothFactor);
      cam.updateProjectionMatrix();
    }

    // No mobile, afasta sutilmente o Z da câmera para manter o produto inteiro visível e centralizado
    const mobileZOffset = isMobileViewport ? 0.05 : 0;

    state.camera.position.x = MathUtils.lerp(
      state.camera.position.x,
      transformTarget.cameraPosition[0],
      smoothFactor
    );
    state.camera.position.y = MathUtils.lerp(
      state.camera.position.y,
      transformTarget.cameraPosition[1],
      smoothFactor
    );
    state.camera.position.z = MathUtils.lerp(
      state.camera.position.z,
      transformTarget.cameraPosition[2] + mobileZOffset,
      smoothFactor
    );
    state.camera.lookAt(0, -0.02, 0);

    if (kHighlightLightRef.current && !prefersReducedMotion) {
      kHighlightLightRef.current.position.x = 0.25 + Math.sin(t * 1.4) * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.02, 0]} rotation={[0.26, -0.48, 0.06]} scale={0.85}>
      <primitive object={clonedScene} />
      {/* Ponto de luz dedicado ao pino metálico "K" dourado no cabedal */}
      <pointLight
        ref={kHighlightLightRef}
        position={[0.25, 0.32, 0.35]}
        intensity={0.95}
        distance={1.6}
        color="#C9B37A"
      />
    </group>
  );
};

const StudioRig: React.FC = () => {
  const keyLightRef = useRef<DirectionalLight>(null);
  const rimLightRef = useRef<DirectionalLight>(null);

  useFrame((_, delta) => {
    const { transformTarget } = useExperienceStore.getState();
    const smooth = 1 - Math.exp(-delta * 5);
    if (keyLightRef.current) {
      keyLightRef.current.intensity = MathUtils.lerp(
        keyLightRef.current.intensity,
        transformTarget.keyLightIntensity,
        smooth
      );
    }
    if (rimLightRef.current) {
      rimLightRef.current.intensity = MathUtils.lerp(
        rimLightRef.current.intensity,
        transformTarget.rimLightIntensity,
        smooth
      );
    }
  });

  return (
    <>
      <PerspectiveCamera makeDefault fov={35} position={[0, 0.36, 2.45]} />
      <directionalLight
        ref={keyLightRef}
        position={[3, 5, 2]}
        intensity={2.3}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight
        ref={rimLightRef}
        position={[-4, 1, -2]}
        intensity={0.75}
        color="#C9B37A"
      />
      <ambientLight intensity={0.35} color="#F5F3EF" />
      <Environment preset="city" />
      <ContactShadows position={[0, -0.38, 0]} opacity={0.55} blur={2.2} far={2} />
    </>
  );
};

/**
 * Representação estática contida dentro do slot da seção (nunca position: fixed sobre o site inteiro)
 */
const StaticProductFallback: React.FC = () => {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-4 select-none">
      <div className="relative max-w-lg w-full rounded-sm border border-metalK/30 bg-carbon/95 p-4 sm:p-6 overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-concrete/20 pb-2.5 mb-4">
          <div className="flex items-center gap-2">
            <MetalKPinSVG className="w-4 h-4" />
            <span className="text-[10px] tracking-[0.2em] uppercase text-metalK font-semibold">
              KENNER RAKKA • INTERPRETAÇÃO CONCEITUAL
            </span>
          </div>
          <span className="text-[9px] tracking-[0.18em] uppercase text-concrete">
            FALLBACK ESTÁTICO
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
          <div className="relative aspect-[16/10] overflow-hidden rounded-sm border border-concrete/20 bg-carbon">
            <img
              src="/assets/images/eng-vulcanized.webp"
              alt="Solado megatratorado em borracha vulcanizada da sandália Kenner"
              width={1280}
              height={800}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col items-center justify-center">
            <TractorSoleSilhouetteSVG className="w-full h-20" />
            <p className="mt-2 text-[11px] text-concrete leading-relaxed text-center">
              Solado vulcanizado megatratorado, amortecedor Re.Amp e pino metálico &ldquo;K&rdquo;.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Slot de Palco 3D com escopo de seção (elimina sobreposição global position:fixed sobre textos)
 */
export const Product3DStage: React.FC<{
  slotId: StageSlotId;
  className?: string;
  interactiveHint?: string;
}> = ({ slotId, className = '', interactiveHint }) => {
  const slotRef = useRef<HTMLDivElement>(null);
  const activeStageSlot = useExperienceStore((s) => s.activeStageSlot);
  const setActiveStageSlot = useExperienceStore((s) => s.setActiveStageSlot);
  const prefersReducedMotion = useExperienceStore((s) => s.prefersReducedMotion);

  useEffect(() => {
    const el = slotRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.25) {
            setActiveStageSlot(slotId);
          }
        }
      },
      { threshold: [0.25, 0.55] }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [slotId, setActiveStageSlot]);

  const isCurrentSlot = activeStageSlot === slotId;

  return (
    <div
      ref={slotRef}
      data-stage-slot={slotId}
      className={`relative w-full overflow-hidden select-none ${className}`}
    >
      {/* Silhueta arquitetônica discreta exibida apenas quando o Canvas 3D está ancorado em outra seção */}
      {!isCurrentSlot && (
        <div
          aria-hidden="true"
          className="absolute inset-0 flex flex-col items-center justify-center p-6 opacity-45 pointer-events-none"
        >
          <TractorSoleSilhouetteSVG className="w-44 sm:w-56 h-24" />
        </div>
      )}

      {prefersReducedMotion && isCurrentSlot && (
        <div className="pointer-events-none absolute top-2.5 left-3 z-20 px-2.5 py-1 rounded-sm bg-carbon/90 border border-metalK/35 text-[9px] tracking-[0.18em] uppercase text-metalK">
          MODO MOVIMENTO REDUZIDO ATIVO
        </div>
      )}

      {interactiveHint && (
        <div className="pointer-events-none absolute bottom-2.5 right-3 z-20 px-2.5 py-1 rounded-sm bg-carbon/90 border border-concrete/20 text-[9px] tracking-[0.18em] uppercase text-concrete">
          {interactiveHint}
        </div>
      )}
    </div>
  );
};

export const Product3D: React.FC = () => {
  const isModelLoaded = useExperienceStore((s) => s.isModelLoaded);
  const webglSupported = useExperienceStore((s) => s.webglSupported);
  const activeStageSlot = useExperienceStore((s) => s.activeStageSlot);
  const setPointer = useExperienceStore((s) => s.setPointer);
  const setUserOrbitOffset = useExperienceStore((s) => s.setUserOrbitOffset);
  const setIsDragging3D = useExperienceStore((s) => s.setIsDragging3D);
  const setIsCoarsePointer = useExperienceStore((s) => s.setIsCoarsePointer);

  const [hostElement] = useState<HTMLDivElement | null>(() => {
    if (typeof document === 'undefined') return null;
    const el = document.createElement('div');
    el.className = 'w-full h-full relative';
    return el;
  });

  const dragStartRef = useRef<{ x: number; y: number; rotX: number; rotY: number } | null>(null);

  // Move o host persistente do Canvas para o slot da seção ativa sem desmontar o contexto WebGL
  useEffect(() => {
    if (!hostElement) return;
    const attachToSlot = () => {
      const targetSlot = document.querySelector<HTMLElement>(
        `[data-stage-slot="${activeStageSlot}"]`
      );
      if (targetSlot && hostElement.parentElement !== targetSlot) {
        targetSlot.appendChild(hostElement);
        window.dispatchEvent(new Event('resize'));
      }
    };

    attachToSlot();
    const rafId = window.requestAnimationFrame(attachToSlot);
    return () => window.cancelAnimationFrame(rafId);
  }, [activeStageSlot, hostElement]);

  // Detecta pointer: coarse (touch) vs mouse e configura ouvintes apropriados
  useEffect(() => {
    const coarseMq = window.matchMedia('(pointer: coarse)');
    setIsCoarsePointer(coarseMq.matches);

    const handleCoarseChange = (e: MediaQueryListEvent) => {
      setIsCoarsePointer(e.matches);
      if (e.matches) {
        setPointer(0, 0);
      }
    };
    coarseMq.addEventListener('change', handleCoarseChange);

    const handleMouseMove = (e: MouseEvent) => {
      if (useExperienceStore.getState().isCoarsePointer) return;
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      setPointer(nx, ny);

      if (dragStartRef.current) {
        const dx = (e.clientX - dragStartRef.current.x) / Math.max(320, window.innerWidth);
        const dy = (e.clientY - dragStartRef.current.y) / Math.max(480, window.innerHeight);
        setUserOrbitOffset(
          clamp(dragStartRef.current.rotX + dy * 1.6, -0.42, 0.42),
          clamp(dragStartRef.current.rotY + dx * 2.5, -0.8, 0.8)
        );
      }
    };

    const handleMouseUp = () => {
      if (dragStartRef.current) {
        dragStartRef.current = null;
        setIsDragging3D(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    return () => {
      coarseMq.removeEventListener('change', handleCoarseChange);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [setPointer, setUserOrbitOffset, setIsDragging3D, setIsCoarsePointer]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const { userOrbitOffset } = useExperienceStore.getState();
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      rotX: userOrbitOffset.rotX,
      rotY: userOrbitOffset.rotY,
    };
    setIsDragging3D(true);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length !== 1) return;
    const touch = e.touches[0];
    const { userOrbitOffset } = useExperienceStore.getState();
    dragStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      rotX: userOrbitOffset.rotX,
      rotY: userOrbitOffset.rotY,
    };
    setIsDragging3D(true);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length !== 1 || !dragStartRef.current) return;
    const touch = e.touches[0];
    const dx = (touch.clientX - dragStartRef.current.x) / Math.max(300, window.innerWidth);
    const dy = (touch.clientY - dragStartRef.current.y) / Math.max(480, window.innerHeight);
    setUserOrbitOffset(
      clamp(dragStartRef.current.rotX + dy * 1.45, -0.42, 0.42),
      clamp(dragStartRef.current.rotY + dx * 2.35, -0.8, 0.8)
    );
  };

  const handleTouchEnd = () => {
    dragStartRef.current = null;
    setIsDragging3D(false);
  };

  if (!hostElement) return null;

  const content = !webglSupported ? (
    <StaticProductFallback />
  ) : (
    <div
      className="relative w-full h-full pointer-events-auto cursor-grab active:cursor-grabbing touch-pan-y"
      onPointerDown={handlePointerDown}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      role="region"
      aria-label="Visualização 3D interativa da sandália Kenner (referência linha Rakka)"
    >
      <Preloader visible={!isModelLoaded} />

      <Canvas
        shadows
        dpr={[1, 1.75]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        <Suspense fallback={null}>
          <StudioRig />
          <KennerRakkaMesh />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );

  return createPortal(content, hostElement);
};
