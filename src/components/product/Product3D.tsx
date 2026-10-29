import React, { Suspense, useEffect, useMemo, useRef } from 'react';
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
  PointLight,
} from 'three';
import { useExperienceStore } from '../../store/useExperienceStore';
import { Preloader } from '../ui/Preloader';
import { TractorSoleSilhouetteSVG, MetalKPinSVG } from '../ui/BrandEmblems';

// Intercepta o preset HDRI do Drei para carregar instantaneamente o HDRI local de estúdio
DefaultLoadingManager.setURLModifier((url) => {
  if (url.includes('potsdamer_platz_1k.hdr')) {
    return '/assets/hdri/potsdamer_platz_1k.hdr';
  }
  return url;
});

// Pré-carregamento no topo do módulo conforme Seção 7 e Seção 8
useGLTF.preload('/assets/models/kenner-rakka.glb', '/assets/draco/');

function clamp(val: number, min: number, max: number) {
  return Math.max(min, Math.min(max, val));
}

const KennerRakkaMesh: React.FC = () => {
  // Carregamento obrigatório do GLB otimizado (~75k triângulos, 2,66 MB) com decoder Draco
  const { scene } = useGLTF('/assets/models/kenner-rakka.glb', '/assets/draco/');
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
          mat.envMapIntensity = 1.45;
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
    const { transformTarget, pointer, userOrbitOffset, prefersReducedMotion } = store;

    const smoothFactor = 1 - Math.exp(-delta * 6.5);
    const t = state.clock.getElapsedTime();

    // Flutuação sutil e controlada (desativada em reduced-motion)
    const floatY = prefersReducedMotion ? 0 : Math.sin(t * 1.35) * 0.018;
    const floatRotZ = prefersReducedMotion ? 0 : Math.cos(t * 1.05) * 0.012;

    // Resposta elegante e limitada ao cursor + toque/drag
    const cursorRotY = clamp(pointer.x * 0.22 + userOrbitOffset.rotY, -0.65, 0.65);
    const cursorRotX = clamp(-pointer.y * 0.14 + userOrbitOffset.rotX, -0.38, 0.38);

    const targetPosX = transformTarget.position[0] + pointer.x * 0.04;
    const targetPosY = transformTarget.position[1] + floatY + pointer.y * 0.025;
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

    const currentScale = groupRef.current.scale.x;
    const nextScale = MathUtils.lerp(currentScale, transformTarget.scale, smoothFactor);
    groupRef.current.scale.setScalar(nextScale);

    // Sincroniza a câmera suavemente dentro do loop useFrame
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
      transformTarget.cameraPosition[2],
      smoothFactor
    );
    state.camera.lookAt(0, -0.02, 0);

    if (kHighlightLightRef.current) {
      kHighlightLightRef.current.position.x = 0.25 + Math.sin(t * 1.4) * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={[-0.04, -0.02, 0]} rotation={[0.26, -0.52, 0.08]} scale={0.92}>
      <primitive object={clonedScene} />
      {/* Ponto de luz sutil dedicado ao detalhe metálico "K" no cabedal */}
      <pointLight
        ref={kHighlightLightRef}
        position={[0.25, 0.32, 0.35]}
        intensity={0.85}
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
      <PerspectiveCamera makeDefault fov={35} position={[0, 0.4, 2.6]} />
      <directionalLight
        ref={keyLightRef}
        position={[3, 5, 2]}
        intensity={2.2}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight
        ref={rimLightRef}
        position={[-4, 1, -2]}
        intensity={0.6}
        color="#C9B37A"
      />
      <ambientLight intensity={0.35} color="#F5F3EF" />
      <Environment preset="city" />
      <ContactShadows position={[0, -0.4, 0]} opacity={0.5} blur={2.4} far={2} />
    </>
  );
};

/**
 * Representação estática de alta precisão para fallback sem WebGL ou prefers-reduced-motion: reduce (Seção 8)
 */
const StaticProductFallback: React.FC<{ reason: 'reduced-motion' | 'no-webgl' }> = ({ reason }) => {
  const setPrefersReducedMotion = useExperienceStore((s) => s.setPrefersReducedMotion);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center px-6 select-none">
      <div className="relative max-w-xl w-full rounded border border-metalK/25 bg-carbon/90 p-6 md:p-8 overflow-hidden pointer-events-auto">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-concrete/20 pb-3 mb-5">
          <div className="flex items-center gap-2">
            <MetalKPinSVG className="w-5 h-5" />
            <span className="text-[11px] tracking-[0.22em] uppercase text-metalK font-semibold">
              KENNER RAKKA • INTERPRETAÇÃO CONCEITUAL
            </span>
          </div>
          <span className="text-[10px] tracking-[0.18em] uppercase text-concrete">
            {reason === 'reduced-motion' ? 'MODO MOVIMENTO REDUZIDO' : 'FALLBACK ESTÁTICO (SEM WEBGL)'}
          </span>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          <div className="relative aspect-[16/10] overflow-hidden rounded border border-concrete/20 bg-carbon">
            <img
              src="/assets/images/eng-vulcanized.png"
              alt="Solado megatratorado em borracha vulcanizada da sandália Kenner"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-carbon via-transparent to-transparent" />
            <span className="absolute bottom-2 left-2.5 text-[10px] tracking-[0.18em] uppercase text-mineral/90">
              SOLADO VULCANIZADO &amp; RE.AMP
            </span>
          </div>

          <div className="flex flex-col items-center justify-center p-3">
            <TractorSoleSilhouetteSVG className="w-full h-28" />
            <p className="mt-3 text-xs text-concrete leading-relaxed text-center">
              Tiras robustas com forro em neoprene, palmilha High-Confy em polímero com memória e pino metálico &ldquo;K&rdquo;.
            </p>
            {reason === 'reduced-motion' && (
              <button
                type="button"
                onClick={() => setPrefersReducedMotion(false)}
                className="k-pin-glow mt-4 px-3.5 py-2 rounded-sm border border-metalK/50 bg-carbon text-[10px] tracking-[0.2em] uppercase text-mineral hover:border-metalK transition-colors"
              >
                ATIVAR CENA 3D INTERATIVA
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const Product3D: React.FC = () => {
  const isModelLoaded = useExperienceStore((s) => s.isModelLoaded);
  const webglSupported = useExperienceStore((s) => s.webglSupported);
  const prefersReducedMotion = useExperienceStore((s) => s.prefersReducedMotion);
  const stageOpacity = useExperienceStore((s) => s.transformTarget.stageOpacity);
  const activeSection = useExperienceStore((s) => s.activeSection);
  const setPointer = useExperienceStore((s) => s.setPointer);
  const setUserOrbitOffset = useExperienceStore((s) => s.setUserOrbitOffset);
  const setIsDragging3D = useExperienceStore((s) => s.setIsDragging3D);

  const dragStartRef = useRef<{ x: number; y: number; rotX: number; rotY: number } | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      setPointer(nx, ny);

      if (dragStartRef.current) {
        const dx = (e.clientX - dragStartRef.current.x) / window.innerWidth;
        const dy = (e.clientY - dragStartRef.current.y) / window.innerHeight;
        setUserOrbitOffset(
          clamp(dragStartRef.current.rotX + dy * 1.6, -0.35, 0.35),
          clamp(dragStartRef.current.rotY + dx * 2.4, -0.65, 0.65)
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
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [setPointer, setUserOrbitOffset, setIsDragging3D]);

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

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length !== 1) return;
    const touch = e.touches[0];
    const nx = (touch.clientX / window.innerWidth) * 2 - 1;
    const ny = (touch.clientY / window.innerHeight) * 2 - 1;
    setPointer(nx, ny);

    if (dragStartRef.current) {
      const dx = (touch.clientX - dragStartRef.current.x) / window.innerWidth;
      const dy = (touch.clientY - dragStartRef.current.y) / window.innerHeight;
      setUserOrbitOffset(
        clamp(dragStartRef.current.rotX + dy * 1.4, -0.35, 0.35),
        clamp(dragStartRef.current.rotY + dx * 2.1, -0.65, 0.65)
      );
    }
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
  };

  const handleTouchEnd = () => {
    dragStartRef.current = null;
    setIsDragging3D(false);
  };

  const isInteractiveSpotlight = activeSection === 'spotlight';

  if (prefersReducedMotion) {
    return (
      <div className="fixed inset-0 z-10 pointer-events-none flex items-center justify-center">
        <StaticProductFallback reason="reduced-motion" />
      </div>
    );
  }

  if (!webglSupported) {
    return (
      <div className="fixed inset-0 z-10 pointer-events-none flex items-center justify-center">
        <StaticProductFallback reason="no-webgl" />
      </div>
    );
  }

  return (
    <div
      className={`fixed inset-0 z-10 transition-opacity duration-500 ${
        isInteractiveSpotlight ? 'pointer-events-auto cursor-grab active:cursor-grabbing' : 'pointer-events-none'
      }`}
      style={{ opacity: stageOpacity }}
      onPointerDown={isInteractiveSpotlight ? handlePointerDown : undefined}
      onTouchStart={isInteractiveSpotlight ? handleTouchStart : undefined}
      onTouchMove={isInteractiveSpotlight ? handleTouchMove : undefined}
      onTouchEnd={isInteractiveSpotlight ? handleTouchEnd : undefined}
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
};
