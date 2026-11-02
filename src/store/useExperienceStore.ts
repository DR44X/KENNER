import { create } from 'zustand';

export type ActiveSectionId =
  | 'presence'
  | 'built-different'
  | 'urban-energy'
  | 'spotlight'
  | 'final-statement';

export type StageSlotId = 'presence' | 'built-different' | 'spotlight';

export type LoadingStageId =
  | 'init'
  | 'hero-assets'
  | 'downloading-3d'
  | 'processing-3d'
  | 'initializing-scene'
  | 'ready'
  | 'error-fallback';

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
  activeStageSlot: StageSlotId;
  scrollProgress: number;
  sectionProgress: Record<ActiveSectionId, number>;
  activeEngineeringIndex: number;
  activeSpotlightAngleIndex: number;
  selectedReferenceLineId: 'rakka' | 'kivah' | 'megah';
  pointer: { x: number; y: number };
  userOrbitOffset: { rotX: number; rotY: number };
  isDragging3D: boolean;
  isCoarsePointer: boolean;
  isModelLoaded: boolean;
  isSceneReady: boolean;
  loadingProgress: number;
  loadingStage: LoadingStageId;
  loadingStageLabel: string;
  loadingItemsLoaded: number;
  loadingItemsTotal: number;
  loadingError: string | null;
  webglSupported: boolean;
  prefersReducedMotion: boolean;
  manualPresetLockUntil: number;
  transformTarget: TransformTarget;

  setActiveSection: (section: ActiveSectionId) => void;
  setActiveStageSlot: (slot: StageSlotId) => void;
  setScrollProgress: (progress: number) => void;
  setSectionProgress: (section: ActiveSectionId, progress: number) => void;
  setActiveEngineeringIndex: (index: number) => void;
  setActiveSpotlightAngleIndex: (index: number) => void;
  setSelectedReferenceLineId: (id: 'rakka' | 'kivah' | 'megah') => void;
  setPointer: (x: number, y: number) => void;
  setUserOrbitOffset: (rotX: number, rotY: number) => void;
  resetUserOrbitOffset: () => void;
  setIsDragging3D: (isDragging: boolean) => void;
  setIsCoarsePointer: (coarse: boolean) => void;
  setIsModelLoaded: (loaded: boolean) => void;
  setIsSceneReady: (ready: boolean) => void;
  setLoadingState: (partial: {
    progress?: number;
    stage?: LoadingStageId;
    label?: string;
    itemsLoaded?: number;
    itemsTotal?: number;
    error?: string | null;
  }) => void;
  setWebglSupported: (supported: boolean) => void;
  setPrefersReducedMotion: (reduced: boolean) => void;
  setManualPresetLockUntil: (timestamp: number) => void;
  setTransformTarget: (partial: Partial<TransformTarget>) => void;
}

export const INITIAL_TRANSFORM_TARGET: TransformTarget = {
  position: [0.0, -0.02, 0.0],
  rotation: [0.26, -0.48, 0.06],
  scale: 0.92,
  cameraPosition: [0, 0.36, 2.45],
  cameraFov: 35,
  keyLightIntensity: 2.3,
  rimLightIntensity: 0.75,
  stageOpacity: 1,
};

export const useExperienceStore = create<ExperienceState>((set) => ({
  activeSection: 'presence',
  activeStageSlot: 'presence',
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
  isCoarsePointer: false,
  isModelLoaded: false,
  isSceneReady: false,
  loadingProgress: 0,
  loadingStage: 'init',
  loadingStageLabel: 'INICIALIZANDO APLICAÇÃO & TIPOGRAFIA',
  loadingItemsLoaded: 0,
  loadingItemsTotal: 4,
  loadingError: null,
  webglSupported: true,
  prefersReducedMotion: false,
  manualPresetLockUntil: 0,
  transformTarget: INITIAL_TRANSFORM_TARGET,

  setActiveSection: (activeSection) =>
    set((state) => {
      let activeStageSlot = state.activeStageSlot;
      if (
        activeSection === 'presence' ||
        activeSection === 'built-different' ||
        activeSection === 'spotlight'
      ) {
        activeStageSlot = activeSection;
      }
      return { activeSection, activeStageSlot };
    }),
  setActiveStageSlot: (activeStageSlot) => set({ activeStageSlot }),
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
  setIsCoarsePointer: (isCoarsePointer) => set({ isCoarsePointer }),
  setIsModelLoaded: (isModelLoaded) => set({ isModelLoaded }),
  setIsSceneReady: (isSceneReady) => set({ isSceneReady }),
  setLoadingState: (partial) =>
    set((state) => ({
      // Nunca permite que a barra de progresso retroceda
      loadingProgress:
        partial.progress !== undefined
          ? Math.max(state.loadingProgress, Math.min(100, partial.progress))
          : state.loadingProgress,
      loadingStage: partial.stage ?? state.loadingStage,
      loadingStageLabel: partial.label ?? state.loadingStageLabel,
      loadingItemsLoaded: partial.itemsLoaded ?? state.loadingItemsLoaded,
      loadingItemsTotal: partial.itemsTotal ?? state.loadingItemsTotal,
      loadingError: partial.error !== undefined ? partial.error : state.loadingError,
    })),
  setWebglSupported: (webglSupported) => set({ webglSupported }),
  setPrefersReducedMotion: (prefersReducedMotion) => set({ prefersReducedMotion }),
  setManualPresetLockUntil: (manualPresetLockUntil) => set({ manualPresetLockUntil }),
  setTransformTarget: (partial) =>
    set((state) => ({
      transformTarget: { ...state.transformTarget, ...partial },
    })),
}));

if (typeof window !== 'undefined') {
  (window as unknown as Record<string, unknown>).__KENNER_STORE__ = useExperienceStore;
}
