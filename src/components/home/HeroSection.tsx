import React from 'react';
import { SITE } from '../../config/site';

const HERO_IMG = `${import.meta.env.BASE_URL}img/bade-al-oud.jpg`;

interface HeroSectionProps {
  onExploreCatalog: () => void;
  onExploreDecants: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreCatalog,
  onExploreDecants,
}) => {
  return (
    <section className="relative w-full bg-surface-container-low border-b border-outline-variant/30 overflow-hidden">
      {/* Decorative subtle background halo on large screens */}
      <div className="hidden lg:flex absolute -right-24 -top-24 w-96 h-96 rounded-full border border-primary/5 pointer-events-none items-center justify-center">
        <div className="w-80 h-80 rounded-full border border-dashed border-primary/10" />
      </div>

      <div className="max-w-7xl mx-auto px-5 md:px-8 py-8 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column / Mobile Center Header */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Apothecary Established Badge */}
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-surface-container border border-outline-variant/50 rounded-full mb-3 shadow-xs">
              <span className="text-secondary text-[10px]">✦</span>
              <span className="font-work text-[10px] md:text-[11px] tracking-[0.16em] uppercase text-secondary font-semibold">
                EST. {SITE.foundedYear} · PERFUMERÍA ÁRABE &amp; DE DISEÑADOR
              </span>
              <span className="text-secondary text-[10px]">✦</span>
            </div>

            {/* Editorial Brand Ornament on Mobile */}
            <div className="flex lg:hidden items-center justify-center gap-2 mb-2 text-secondary opacity-75">
              <span className="w-6 h-[1px] bg-secondary" />
              <span className="text-[11px]">✦</span>
              <span className="w-6 h-[1px] bg-secondary" />
            </div>

            {/* Main Headline */}
            <h1 className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-[54px] lg:leading-[62px] text-primary uppercase tracking-wide font-semibold mb-3">
              Encontrá tu firma <br className="hidden sm:inline" />
              <span className="italic font-garamond font-normal text-secondary lowercase">
                olfativa
              </span>{' '}
              única
            </h1>

            <p className="font-garamond text-base sm:text-lg md:text-xl text-on-surface-variant max-w-xl mb-6 leading-relaxed">
              Perfumes originales árabes y de diseñador, en frasco completo o en decants para probar antes de comprar. Enviamos a todo el territorio argentino con embalaje seguro grado farmacéutico.
            </p>

            {/* Mobile Oval showcase shown in center on small screens */}
            <div className="flex lg:hidden flex-col items-center my-2 mb-6">
              <div className="relative w-52 h-68 p-1.5 bg-surface-container-high rounded-[50%/60%] shadow-md flex items-center justify-center">
                <div className="w-full h-full rounded-[50%/60%] overflow-hidden relative bg-surface-container-low shadow-inner">
                  <img
                    src={HERO_IMG}
                    alt="Frasco de Aurélia Essence d\'Ambre sobre lino crema"
                    fetchPriority="high"
                    className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-surface/20 pointer-events-none" />
                </div>
                {/* Filigree accent marks */}
                <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 text-secondary text-[12px] bg-surface-container-low px-1 font-serif">
                  ✦
                </span>
                <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 text-secondary text-[12px] bg-surface-container-low px-1 font-serif">
                  ✦
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 w-full sm:w-auto mb-6">
              <button
                onClick={onExploreCatalog}
                className="w-full sm:w-auto px-6 py-3 bg-primary hover:bg-primary-container text-surface rounded-lg font-work text-xs uppercase tracking-[0.12em] font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm active:scale-98 group"
              >
                <span>Ver Catálogo Completo</span>
                <span className="material-symbols-outlined text-[18px] group-hover:translate-x-0.5 transition-transform">
                  arrow_forward
                </span>
              </button>

              <button
                onClick={onExploreDecants}
                className="w-full sm:w-auto px-6 py-3 border border-primary text-primary hover:bg-primary hover:text-surface rounded-lg font-work text-xs uppercase tracking-[0.12em] font-semibold flex items-center justify-center gap-2 transition-colors active:scale-98"
              >
                <span>Conocer el Arte del Decant</span>
              </button>
            </div>

            {/* Apothecary Seal Perks Strip */}
            <div className="w-full pt-4 border-t border-outline-variant/50 grid grid-cols-1 sm:grid-cols-3 gap-2 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-1.5 text-on-surface-variant">
                <span className="text-secondary text-[11px]">✦</span>
                <span className="font-work text-[10px] sm:text-[11px] tracking-wider uppercase font-medium">
                  Frascos 100% Sellados
                </span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-1.5 text-on-surface-variant">
                <span className="text-secondary text-[11px]">✦</span>
                <span className="font-work text-[10px] sm:text-[11px] tracking-wider uppercase font-medium">
                  Vidrio de Alta Densidad
                </span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-1.5 text-on-surface-variant">
                <span className="text-secondary text-[11px]">✦</span>
                <span className="font-work text-[10px] sm:text-[11px] tracking-wider uppercase font-medium">
                  Guía Olfativa Personal
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Desktop Oval Cameo Flacon Presentation */}
          <div className="hidden lg:flex lg:col-span-5 justify-center items-center relative py-6">
            {/* Botanical compass background halo */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-80 h-[430px] rounded-[180px] border border-outline-variant/50 rotate-6" />
              <div className="w-80 h-[430px] rounded-[180px] border border-secondary/20 -rotate-3" />
            </div>

            {/* The Oval Cameo Container with compass marks */}
            <div className="relative w-76 h-[430px] rounded-[170px] p-2.5 bg-surface-container shadow-md border-2 border-primary/20 flex items-center justify-center">
              {/* Compass Stars */}
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-primary font-serif text-sm bg-surface-container px-1 z-20">
                ✦
              </span>
              <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 text-primary font-serif text-sm bg-surface-container px-1 z-20">
                ✦
              </span>
              <span className="absolute top-1/2 -left-3 -translate-y-1/2 text-primary font-serif text-sm bg-surface-container py-1 z-20">
                ✦
              </span>
              <span className="absolute top-1/2 -right-3 -translate-y-1/2 text-primary font-serif text-sm bg-surface-container py-1 z-20">
                ✦
              </span>

              <div className="w-full h-full rounded-[160px] overflow-hidden relative group">
                <img
                  src={HERO_IMG}
                  alt="Frasco de Aurélia Essence d\'Ambre sobre lino crema"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent flex flex-col justify-end p-6 text-center text-surface-container-low">
                  <span className="font-work text-[10px] uppercase tracking-[0.2em] text-surface-container-high">
                    Colección árabe
                  </span>
                  <p className="font-playfair text-lg italic">Oud, ámbar y especias</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
