import React from 'react';

interface EmblemProps {
  className?: string;
}

/**
 * Pino metálico "K" — Identificador visual recorrente da Kenner (Seção 0)
 * Desenhado em SVG customizado com chanfro metálico (#C9B37A).
 */
export const MetalKPinSVG: React.FC<EmblemProps> = ({ className = 'w-6 h-6' }) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="kennerPinGold" x1="6" y1="4" x2="42" y2="44" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#EADAB1" />
        <stop offset="45%" stopColor="#C9B37A" />
        <stop offset="85%" stopColor="#8E7947" />
        <stop offset="100%" stopColor="#C9B37A" />
      </linearGradient>
    </defs>
    {/* Moldura octogonal chanfrada do pino */}
    <path
      d="M10 3H38L45 10V38L38 45H10L3 38V10L10 3Z"
      stroke="url(#kennerPinGold)"
      strokeWidth="1.5"
      strokeOpacity="0.55"
      fill="#0A0A0B"
    />
    {/* Geometria escultural do pino K */}
    <path
      d="M13 10H20.5V22.8L32.8 10H41L27.2 24L41.5 38H33L20.5 25.4V38H13V10Z"
      fill="url(#kennerPinGold)"
    />
    {/* Linha interna de bisel técnico */}
    <path
      d="M15.2 12V36M26.2 24L37.5 12M26.2 24L38 36"
      stroke="#0A0A0B"
      strokeWidth="0.9"
      strokeOpacity="0.45"
    />
  </svg>
);

/**
 * Silhueta técnica do solado megatratorado Kenner (Ref. Rakka)
 * Usada como placeholder de pré-carregamento 3D (Seção 8) e selo de engenharia.
 */
export const TractorSoleSilhouetteSVG: React.FC<EmblemProps & { progress?: number }> = ({
  className = 'w-48 h-24',
}) => (
  <svg
    viewBox="0 0 360 150"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="soleOutlineGrad" x1="0" y1="0" x2="360" y2="150" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#C9B37A" stopOpacity="0.85" />
        <stop offset="50%" stopColor="#F5F3EF" stopOpacity="0.45" />
        <stop offset="100%" stopColor="#C9B37A" stopOpacity="0.9" />
      </linearGradient>
    </defs>

    {/* Contorno externo da planta / perfil do solado tratorado */}
    <path
      d="M32 88C24 84 20 74 26 64C35 50 64 46 105 49C148 52 195 50 245 42C282 36 318 42 332 58C342 70 338 86 324 94L312 96L306 106H286L280 96H260L254 106H234L228 96H208L202 106H182L176 96H156L150 106H130L124 96H104L98 106H74L68 96H48L42 102L32 88Z"
      stroke="url(#soleOutlineGrad)"
      strokeWidth="1.75"
      fill="#0A0A0B"
      fillOpacity="0.65"
    />

    {/* Cavidade amortecedora vazada Re.Amp no calcanhar */}
    <path
      d="M52 78H106L114 86H46L52 78Z"
      stroke="#FF3B2F"
      strokeWidth="1.5"
      fill="#FF3B2F"
      fillOpacity="0.14"
    />

    {/* Tira robusta em neoprene + pino K */}
    <path
      d="M142 50C162 18 214 14 252 42L224 56C198 36 172 38 158 54L142 50Z"
      stroke="#C9B37A"
      strokeWidth="1.5"
      fill="#C9B37A"
      fillOpacity="0.1"
    />

    {/* Canaletas anguladas de tração */}
    <g stroke="#8A8A85" strokeWidth="1.2" strokeOpacity="0.6">
      <line x1="70" y1="64" x2="82" y2="74" />
      <line x1="94" y1="64" x2="106" y2="74" />
      <line x1="140" y1="66" x2="152" y2="84" />
      <line x1="168" y1="66" x2="180" y2="84" />
      <line x1="196" y1="66" x2="208" y2="84" />
      <line x1="224" y1="64" x2="236" y2="82" />
      <line x1="252" y1="62" x2="264" y2="80" />
      <line x1="280" y1="60" x2="292" y2="78" />
    </g>

    {/* Ponto focal do pino metálico K */}
    <circle cx="204" cy="34" r="4" fill="#C9B37A" />
  </svg>
);

/**
 * Emblemas técnicos customizados em SVG para cada camada da seção Built Different (Anti-Padrão #7)
 */
export const EngineeringLayerEmblemSVG: React.FC<{ layerId: string; className?: string }> = ({
  layerId,
  className = 'w-10 h-10',
}) => {
  switch (layerId) {
    case 'vulcanized-sole':
      return (
        <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
          <path
            d="M4 30L12 22L20 30L28 22L36 30L44 22"
            stroke="#C9B37A"
            strokeWidth="2"
          />
          <path
            d="M4 38H12L15 43H23L26 38H34L37 43H44"
            stroke="#F5F3EF"
            strokeWidth="1.75"
          />
          <rect x="6" y="8" width="36" height="8" stroke="#8A8A85" strokeWidth="1.25" />
        </svg>
      );
    case 'reamp-heel':
      return (
        <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
          <rect x="5" y="14" width="38" height="22" stroke="#F5F3EF" strokeWidth="1.75" />
          <polygon
            points="13,20 35,20 31,30 17,30"
            stroke="#FF3B2F"
            strokeWidth="1.75"
            fill="#FF3B2F"
            fillOpacity="0.15"
          />
          <path d="M24 5V12M24 38V44" stroke="#C9B37A" strokeWidth="1.5" />
        </svg>
      );
    case 'neoprene-hydro':
      return (
        <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
          <path
            d="M6 28C14 22 34 22 42 28M6 35C14 29 34 29 42 35"
            stroke="#F5F3EF"
            strokeWidth="1.75"
          />
          <path
            d="M16 16C16 12 20 8 20 8C20 8 24 12 24 16C24 18.2 22.2 20 20 20C17.8 20 16 18.2 16 16Z"
            stroke="#C9B37A"
            strokeWidth="1.6"
          />
          <circle cx="31" cy="14" r="2.5" stroke="#C9B37A" strokeWidth="1.5" />
        </svg>
      );
    case 'memory-polymer':
      return (
        <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
          <path
            d="M4 26C12 18 20 34 28 26C34 20 40 24 44 22"
            stroke="#C9B37A"
            strokeWidth="2"
          />
          <path d="M6 36H42" stroke="#F5F3EF" strokeWidth="1.75" />
          <path d="M14 12V20M24 10V18M34 12V20" stroke="#8A8A85" strokeWidth="1.4" />
        </svg>
      );
    default:
      return <MetalKPinSVG className={className} />;
  }
};
