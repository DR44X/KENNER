import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    {
      name: 'optimize-three-drei-bundle',
      enforce: 'pre',
      resolveId(source) {
        if (source === '@monogrid/gainmap-js') {
          return '\0virtual:gainmap-stub';
        }
        if (source === '@react-three/drei') {
          return '\0virtual:drei-slim';
        }
        return null;
      },
      load(id) {
        if (id === '\0virtual:gainmap-stub') {
          return 'export class HDRJPGLoader {} export class GainMapLoader {}';
        }
        if (id === '\0virtual:drei-slim') {
          return `
            import { GLTFLoader } from 'three-stdlib';
            import { useLoader } from '@react-three/fiber';
            export { Environment } from '@react-three/drei/core/Environment.js';
            export { ContactShadows } from '@react-three/drei/core/ContactShadows.js';
            export { PerspectiveCamera } from '@react-three/drei/core/PerspectiveCamera.js';
            export { Preload } from '@react-three/drei/core/Preload.js';

            function extensions(_useDraco = true, _useMeshopt = false, extendLoader) {
              return (loader) => {
                if (extendLoader) extendLoader(loader);
              };
            }
            export const useGLTF = (path, useDraco, useMeshopt, extendLoader) =>
              useLoader(GLTFLoader, path, extensions(useDraco, useMeshopt, extendLoader));
            useGLTF.preload = (path, useDraco, useMeshopt, extendLoader) =>
              useLoader.preload(GLTFLoader, path, extensions(useDraco, useMeshopt, extendLoader));
            useGLTF.clear = (path) => useLoader.clear(GLTFLoader, path);
            useGLTF.setDecoderPath = () => {};
          `;
        }
        return null;
      },
      transform(code, id) {
        if (id.includes('three-stdlib/index.js')) {
          return {
            code: `
              export { GLTFLoader } from './loaders/GLTFLoader.js';
              export { RGBELoader } from './loaders/RGBELoader.js';
              export { HorizontalBlurShader } from './shaders/HorizontalBlurShader.js';
              export { VerticalBlurShader } from './shaders/VerticalBlurShader.js';
              export class EXRLoader {}
              export class GroundProjectedEnv {}
            `,
            map: null,
          };
        }
        if (id.includes('react-three-fiber.esm.js')) {
          return {
            code: code.replace(
              'extend(THREE)',
              `extend({
                Group: THREE.Group,
                Mesh: THREE.Mesh,
                DirectionalLight: THREE.DirectionalLight,
                PointLight: THREE.PointLight,
                AmbientLight: THREE.AmbientLight,
                PerspectiveCamera: THREE.PerspectiveCamera,
                OrthographicCamera: THREE.OrthographicCamera,
                PlaneGeometry: THREE.PlaneGeometry,
                ShaderMaterial: THREE.ShaderMaterial,
                MeshBasicMaterial: THREE.MeshBasicMaterial,
                MeshStandardMaterial: THREE.MeshStandardMaterial,
                Object3D: THREE.Object3D,
                Scene: THREE.Scene,
                Color: THREE.Color
              })`
            ),
            map: null,
          };
        }
        if (id.includes('@react-three/drei')) {
          if (id.includes('Environment.js')) {
            return {
              code: code
                .replace(
                  /\/\*#__PURE__\*\/React\.createElement\(EnvironmentPortal,\s*props\)/g,
                  'null'
                )
                .replace(
                  /\/\*#__PURE__\*\/React\.createElement\(EnvironmentGround,\s*props\)/g,
                  'null'
                )
                .replace(
                  'export { Environment, EnvironmentCube, EnvironmentMap, EnvironmentPortal };',
                  'export { Environment };'
                ),
              map: null,
            };
          }
          if (id.includes('useEnvironment.js')) {
            return {
              code: code
                .replace('CubeTextureLoader,', '')
                .replace(/CubeTextureLoader/g, 'RGBELoader'),
              map: null,
            };
          }
        }
        if (id.includes('GLTFLoader')) {
          const unusedSymbols = [
            'MeshPhysicalMaterial',
            'SpotLight',
            'InstancedMesh',
            'SkinnedMesh',
            'LineSegments',
            'LineLoop',
            'Line',
            'Points',
            'Skeleton',
            'AnimationClip',
            'Bone',
            'VectorKeyframeTrack',
            'NumberKeyframeTrack',
            'QuaternionKeyframeTrack',
            'Interpolant',
            'PropertyBinding',
            'PointsMaterial',
            'LineBasicMaterial',
          ];
          const lines = code.split('\n');
          for (const sym of unusedSymbols) {
            lines[0] = lines[0]
              .replace(new RegExp(`\\b${sym}\\s*,\\s*`, 'g'), '')
              .replace(new RegExp(`,\\s*\\b${sym}\\b`, 'g'), '');
          }
          const stubs = unusedSymbols
            .map((sym) => {
              if (sym === 'MeshPhysicalMaterial') return `const ${sym} = MeshStandardMaterial;`;
              if (sym === 'PropertyBinding') return `const ${sym} = { sanitizeNodeName: (s) => s };`;
              return `const ${sym} = Object3D;`;
            })
            .join(' ');
          lines.splice(1, 0, stubs);
          let next = lines.join('\n');
          next = next.replace(
            /this\.register\(function\(parser\)\s*\{\s*return new (?:GLTFMaterials\w+|GLTFTextureBasisUExtension|GLTFTextureAVIFExtension|GLTFLightsExtension|GLTFMeshgpuInstancing)\(parser\);\s*\}\);/g,
            ''
          );
          return { code: next, map: null };
        }
        return null;
      },
    },
    react(),
  ],
  build: {
    target: 'es2020',
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      treeshake: {
        moduleSideEffects: (id) => {
          if (
            id.includes('three/build') ||
            id.includes('three-stdlib') ||
            id.includes('@react-three/drei')
          ) {
            return false;
          }
          return true;
        },
      },
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('three/build')) {
              return 'three-engine';
            }
            if (id.includes('gsap') || id.includes('lenis')) {
              return 'motion';
            }
          }
          return undefined;
        },
      },
    },
  },
});
