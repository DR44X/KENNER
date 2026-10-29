import React from 'react';

/**
 * Três planos visuais na Hero (Seção 2):
 * Plano 1: Ambiente de concreto carioca + iluminação atmosférica.
 * Plano 2: Modelo masculino adulto com estética streetwear brasileira autêntica e recorte editorial.
 * (O Plano 3 é a sandália Kenner 3D em primeiro plano renderizada pelo Product3D).
 */
export const ModelBackground: React.FC = () => {
  return (
    <div
      data-hero-bg-wrapper
      className="pointer-events-none absolute inset-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Plano 1: Luz de estúdio atmosférica sutil (<= 8% opacidade, sem grid pattern) */}
      <div className="absolute inset-0 ambient-key-light" />

      {/* Fotografia editorial de fundo com parallax controlado pelo ScrollTrigger */}
      <div
        data-hero-model-layer
        className="will-animate-transform absolute inset-0 w-full h-full"
      >
        <img
          src="/assets/images/hero-model-editorial.png"
          alt="Modelo masculino brasileiro em arquitetura brutalista de concreto no Rio de Janeiro à noite"
          fetchPriority="high"
          decoding="async"
          className="w-full h-full object-cover object-[68%_center] md:object-center opacity-85 scale-[1.03]"
        />

        {/* Máscaras cinematográficas para integrar modelo, tipografia monumental e sandália 3D */}
        <div className="absolute inset-0 bg-gradient-to-r from-carbon via-carbon/55 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-carbon via-carbon/20 to-carbon/60" />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 50% 62%, rgba(10,10,11,0.15) 0%, rgba(10,10,11,0.72) 78%)',
          }}
        />
      </div>

      {/* Sombra de ancoragem física sob o produto 3D em primeiro plano */}
      <div
        data-hero-floor-shadow
        className="absolute left-1/2 top-[60%] -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[480px] md:w-[620px] h-[110px] rounded-full opacity-80"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(10,10,11,0.92) 0%, rgba(201,179,122,0.08) 48%, rgba(10,10,11,0) 76%)',
        }}
      />
    </div>
  );
};
