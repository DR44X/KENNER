import { create } from 'zustand';

export type ActiveSectionId =
  | 'presence'
  | 'built-different'
  | 'urban-energy'
  | 'spotlight'
  | 'final-statement';

export interface TransformTarget {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  cameraPosition: [number, number, number];
  cameraFov: number;
  keyLightIntensity: number;
  rimLightIntensity: number;
  stageOpacity: number;
}

interface ExperienceState {
  activeSection: ActiveSectionId;
  scrollProgress: number;
  sectionProgress: Record<ActiveSectionId, number>;
  activeEngineeringIndex: number;
  activeSpotlightAngleIndex: number;
  selectedReferenceLineId: 'rakka' | 'kivah' | 'megah';
  pointer: { x: number; y: number };
  userOrbitOffset: { rotX: number; rotY: number };
  isDragging3D: boolean;
  isModelLoaded: boolean;
  webglSupported: boolean;
  prefersReducedMotion: boolean;
  transformTarget: TransformTarget;

  setActiveSection: (section: ActiveSectionId) => void;
  setScrollProgress: (progress: number) => void;
  setSectionProgress: (section: ActiveSectionId, progress: number) => void;
  setActiveEngineeringIndex: (index: number) => void;
  setActiveSpotlightAngleIndex: (index: number) => void;
  setSelectedReferenceLineId: (id: 'rakka' | 'kivah' | 'megah') => void;
  setPointer: (x: number, y: number) => void;
  setUserOrbitOffset: (rotX: number, rotY: number) => void;
  resetUserOrbitOffset: () => void;
  setIsDragging3D: (isDragging: boolean) => void;
  setIsModelLoaded: (loaded: boolean) => void;
  setWebglSupported: (supported: boolean) => void;
  setPrefersReducedMotion: (reduced: boolean) => void;
  setTransformTarget: (partial: Partial<TransformTarget>) => void;
}

export const INITIAL_TRANSFORM_TARGET: TransformTarget = {
  position: [-0.04, -0.02, 0.0],
  rotation: [0.28, -0.46, 0.08],
  scale: 0.92,
  cameraPosition: [0, 0.4, 2.6],
  cameraFov: 35,
  keyLightIntensity: 2.2,
  rimLightIntensity: 0.6,
  stageOpacity: 1,
};

export const useExperienceStore = create<ExperienceState>((set) => ({
  activeSection: 'presence',
  scrollProgress: 0,
  sectionProgress: {
    presence: 0,
    'built-different': 0,
    'urban-energy': 0,
    spotlight: 0,
    'final-statement': 0,
  },
  activeEngineeringIndex: 0,
  activeSpotlightAngleIndex: 0,
  selectedReferenceLineId: 'rakka',
  pointer: { x: 0, y: 0 },
  userOrbitOffset: { rotX: 0, rotY: 0 },
  isDragging3D: false,
  isModelLoaded: false,
  webglSupported: true,
  prefersReducedMotion: false,
  transformTarget: INITIAL_TRANSFORM_TARGET,

  setActiveSection: (activeSection) => set({ activeSection }),
  setScrollProgress: (scrollProgress) => set({ scrollProgress }),
  setSectionProgress: (section, progress) =>
    set((state) => ({
      sectionProgress: { ...state.sectionProgress, [section]: progress },
    })),
  setActiveEngineeringIndex: (activeEngineeringIndex) => set({ activeEngineeringIndex }),
  setActiveSpotlightAngleIndex: (activeSpotlightAngleIndex) =>
    set({ activeSpotlightAngleIndex, userOrbitOffset: { rotX: 0, rotY: 0 } }),
  setSelectedReferenceLineId: (selectedReferenceLineId) => set({ selectedReferenceLineId }),
  setPointer: (x, y) => set({ pointer: { x, y } }),
  setUserOrbitOffset: (rotX, rotY) => set({ userOrbitOffset: { rotX, rotY } }),
  resetUserOrbitOffset: () => set({ userOrbitOffset: { rotX: 0, rotY: 0 } }),
  setIsDragging3D: (isDragging3D) => set({ isDragging3D }),
  setIsModelLoaded: (isModelLoaded) => set({ isModelLoaded }),
  setWebglSupported: (webglSupported) => set({ webglSupported }),
  setPrefersReducedMotion: (prefersReducedMotion) => set({ prefersReducedMotion }),
  setTransformTarget: (partial) =>
    set((state) => ({
      transformTarget: { ...state.transformTarget, ...partial },
    })),
}));

if (typeof window !== 'undefined') {
  (window as unknown as Record<string, unknown>).__KENNER_STORE__ = useExperienceStore;
}

