import React from 'react';

/**
 * Fundo editorial da Hero com suporte ao 14.9. Hero Cursor Parallax:
 * No mobile, reduzido a 1 plano sutil para evitar sobreposição confusa com o 3D.
 * No desktop, integra fotografia editorial em WebP e deslocamento suave em profundidade.
 */
export const ModelBackground: React.FC = () => {
  return (
    <div
      data-hero-bg-wrapper
      className="pointer-events-none absolute inset-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Luz de estúdio atmosférica sutil */}
      <div className="absolute inset-0 ambient-key-light" />

      {/* Fotografia editorial de fundo em WebP real */}
      <div
        data-hero-model-layer
        className="will-animate-transform absolute inset-0 w-full h-full"
      >
        <div data-hero-parallax-bg className="w-full h-full">
          <img
            src="/assets/images/hero-model-editorial.webp"
            alt="Modelo masculino brasileiro em arquitetura brutalista de concreto no Rio de Janeiro à noite"
            width={1376}
            height={768}
            fetchPriority="high"
            decoding="async"
            className="w-full h-full object-cover object-[70%_center] md:object-center opacity-40 md:opacity-75 scale-[1.04]"
          />
        </div>

        {/* Máscaras cinematográficas para garantir contraste >= 4.5:1 em toda a tipografia */}
        <div className="absolute inset-0 bg-gradient-to-r from-carbon via-carbon/80 to-carbon/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-carbon via-carbon/45 to-carbon/75" />
      </div>
    </div>
  );
};
