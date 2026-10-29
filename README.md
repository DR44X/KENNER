# KENNER — Digital Experience (Conceito de Marca & Engenharia 3D)

Experiência digital conceitual imersiva para a **Kenner**, marca brasileira de sandálias fundada em 1988 no Rio de Janeiro por Peter Simon, integrante do **Grupo S2** (ao lado de Redley e Cantão).

> **Nota de Transparência Conceitual:** Este é um projeto conceitual/não-oficial de direção de arte, engenharia front-end e visualização 3D. A geometria tridimensional (`kenner-rakka.glb`, ~75k triângulos, 2,66 MB) é tratada como uma **interpretação conceitual inspirada na arquitetura da linha Rakka** — nunca como reprodução industrial exata ou comunicação institucional oficial. Todos os fatos históricos e especificações de materiais estão centralizados em [`src/data/brand.ts`](./src/data/brand.ts) a partir dos dados verificados da marca.

---

## 1. Contexto de Marca & Engenharia Real (`src/data/brand.ts`)

- **Herança:** Fundada em 1988 no Rio de Janeiro por Peter Simon; começou vendendo em lojas Redley e Cantão na Zona Sul carioca; patrocinou seu primeiro atleta em 1990 (o surfista Pedro Muller). Reposicionou-se nos anos 2000 e hoje é liderada pelo CEO Thomas Simon, com colaborações no rap, no funk e no futebol e expansão internacional em curso.
- **Engenharia Real Destacada:**
  - **Solado de borracha vulcanizada:** Processo químico semelhante ao da fabricação de pneus, com desenhos tratorados em canaletas anguladas.
  - **Amortecedor Re.Amp (Linha Rakka):** Peça amortecedora vazada no calcanhar para absorção mecânica de impacto.
  - **Palmilha em polímero com memória (High-Confy):** Fórmula proprietária tipo EVA (em versões lixadas para uso urbano e com película impermeável para uso aquático).
  - **Cabedal em nylon/poliéster de alta tenacidade forrado em neoprene:** Ou tecidos ripstop acolchoados (Rakka Puffy), com acabamento impermeável **Hydro-Off** em linhas dedicadas.
  - **Identificador metálico "K":** Pino metálico/banhado aplicado no cabedal e utilizado como assinatura visual recorrente na interface.
- **Linhas de Referência:** **Rakka** (protagonista visual 3D), **Kivah** (criada em 2001, clássico urbano versátil) e **Megah** (solado supertratorado inspirado em rodas de trator).

---

## 2. Arquitetura & Stack Técnica

- **React 18 + TypeScript + Vite**
- **Three.js + `@react-three/fiber` + `@react-three/drei` + `@react-three/postprocessing`**
- **GSAP + ScrollTrigger** (registrado uma única vez em [`src/lib/gsap.ts`](./src/lib/gsap.ts))
- **Lenis** (smooth scroll sincronizado via `lenis.on('scroll', ScrollTrigger.update)` em [`src/lib/lenis.ts`](./src/lib/lenis.ts))
- **Zustand** (estado reativo compartilhado entre o ScrollTrigger e o loop `useFrame` do R3F em [`src/store/useExperienceStore.ts`](./src/store/useExperienceStore.ts))
- **Tailwind CSS** (tokens de design em [`tailwind.config.ts`](./tailwind.config.ts) e [`src/styles/tokens.css`](./src/styles/tokens.css))

### Estrutura de Pastas

```text
src/
  components/
    hero/HeroExperience.tsx
    hero/ModelBackground.tsx
    product/Product3D.tsx
    product/ProductDetails.tsx
    scroll/ScrollController.tsx
    sections/BuiltDifferent.tsx
    sections/UrbanEnergy.tsx
    sections/ProductSpotlight.tsx
    sections/FinalStatement.tsx
    layout/Navigation.tsx
    ui/BrandEmblems.tsx
    ui/Preloader.tsx
  data/brand.ts
  lib/gsap.ts
  lib/lenis.ts
  store/useExperienceStore.ts
  assets/models/kenner-rakka.glb
  assets/draco/
  styles/tokens.css
```

---

## 3. Como Executar

```bash
npm install
npm run dev
npm run build
```
