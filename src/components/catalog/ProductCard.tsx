import React, { useState } from 'react';
import { formatARS, formatARSCompact } from '../../lib/format';
import { priceFor } from '../../lib/pricing';
import type { DecantFormat, Fragrance } from '../../types';

interface ProductCardProps {
  fragrance: Fragrance;
  isWishlisted: boolean;
  onToggleWishlist: (fragrance: Fragrance) => void;
  onQuickView: (fragrance: Fragrance) => void;
  onAddToCart: (fragrance: Fragrance, format: DecantFormat) => void;
  /** La primera fila se carga sin lazy para no demorar lo que se ve primero. */
  eager?: boolean;
}

const BADGE_STYLES: Record<NonNullable<Fragrance['badge']>, string> = {
  'Best Seller': 'bg-secondary-container text-primary',
  Tendencia: 'bg-secondary-fixed text-on-secondary-fixed',
  'Más Reseñado': 'bg-primary-container text-surface',
  Exclusivo: 'bg-primary text-surface',
  Novedad: 'bg-secondary-fixed-dim text-on-secondary-fixed',
};

const QUICK_FORMATS: { format: DecantFormat; label: string }[] = [
  { format: '5ml', label: '5 ml' },
  { format: '10ml', label: '10 ml' },
  { format: 'full', label: 'Frasco' },
];

export const ProductCard: React.FC<ProductCardProps> = ({
  fragrance,
  isWishlisted,
  onToggleWishlist,
  onQuickView,
  onAddToCart,
  eager = false,
}) => {
  const [quickFormatOpen, setQuickFormatOpen] = useState(false);
  const open = () => onQuickView(fragrance);

  return (
    <article className="flex flex-col bg-surface-container-low rounded-xl overflow-hidden border border-primary-container/15 hover:border-primary shadow-xs hover:shadow-md transition-all duration-300 group">
      <div className="relative w-full aspect-square sm:aspect-[4/5] bg-surface-container overflow-hidden">
        {fragrance.badge && (
          <span
            className={`absolute top-2.5 left-2.5 z-10 px-2 py-0.5 rounded-sm font-work text-[9px] uppercase tracking-wider font-bold shadow-xs ${
              BADGE_STYLES[fragrance.badge]
            }`}
          >
            {fragrance.badge}
          </span>
        )}

        <button
          onClick={() => onToggleWishlist(fragrance)}
          aria-label={isWishlisted ? `Quitar ${fragrance.name} de favoritos` : `Guardar ${fragrance.name} en favoritos`}
          aria-pressed={isWishlisted}
          className={`absolute top-2 right-2 z-10 w-9 h-9 rounded-full backdrop-blur-md flex items-center justify-center transition-transform active:scale-90 ${
            isWishlisted ? 'bg-primary text-surface' : 'bg-surface/85 text-primary hover:bg-primary hover:text-surface'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]" aria-hidden>
            {isWishlisted ? 'favorite' : 'favorite_border'}
          </span>
        </button>

        <button type="button" onClick={open} className="block w-full h-full" aria-label={`Ver ficha de ${fragrance.name}`}>
          <img
            src={fragrance.image}
            alt={fragrance.imageAlt || fragrance.name}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            loading={eager ? 'eager' : 'lazy'}
            decoding="async"
          />
          <span className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:flex items-center justify-center pointer-events-none">
            <span className="px-3 py-1 bg-surface/90 text-primary font-work text-[10px] uppercase tracking-wider font-semibold rounded-full shadow-xs">
              Ver notas olfativas
            </span>
          </span>
        </button>
      </div>

      <div className="p-3 sm:p-4 flex flex-col flex-1 justify-between gap-3">
        <button type="button" className="text-left" onClick={open}>
          <span className="font-work text-[10px] sm:text-[11px] uppercase tracking-[0.14em] text-secondary font-semibold block mb-0.5">
            {fragrance.house}
          </span>
          <h3 className="font-playfair text-[15px] sm:text-lg text-primary font-semibold leading-snug line-clamp-2 group-hover:text-secondary transition-colors">
            {fragrance.name}
          </h3>
          <p className="font-garamond text-xs sm:text-sm text-on-surface-variant italic mt-0.5 line-clamp-1">
            {fragrance.shortNotes}
          </p>
        </button>

        <div className="pt-2 border-t border-outline-variant/40 flex flex-col">
          <div className="flex flex-col mb-2.5">
            <span className="font-work text-[10px] text-secondary">Botella completa</span>
            <p className="font-work text-sm sm:text-base font-bold text-primary">
              {formatARS(fragrance.fullBottlePrice)} <span className="font-normal text-[10px] text-on-surface-variant">ARS</span>
            </p>
            <span className="font-work text-[10px] text-on-surface-variant mt-0.5">
              Decant 5 ml desde <strong className="text-primary">{formatARS(fragrance.decant5mlPrice)}</strong>
            </span>
          </div>

          {quickFormatOpen ? (
            <div className="flex flex-col gap-1.5 p-2 bg-surface-container rounded-lg border border-outline-variant/60 animate-fadeIn">
              <span className="font-work text-[9px] uppercase tracking-widest text-secondary font-semibold text-center">
                Elegí tu presentación
              </span>
              <div className="grid grid-cols-3 gap-1">
                {QUICK_FORMATS.map(({ format, label }) => (
                  <button
                    key={format}
                    onClick={() => {
                      onAddToCart(fragrance, format);
                      setQuickFormatOpen(false);
                    }}
                    aria-label={`Agregar ${label} de ${fragrance.name} a la bolsa`}
                    className="py-1.5 px-0.5 bg-surface-container-low hover:bg-primary hover:text-surface text-primary rounded text-[10px] font-work font-bold border border-outline-variant transition-colors text-center"
                  >
                    <span className="block whitespace-nowrap">{label}</span>
                    <span className="block text-[9px] font-normal opacity-90">
                      {formatARSCompact(priceFor(fragrance, format))}
                    </span>
                  </button>
                ))}
              </div>
              <button
                onClick={() => setQuickFormatOpen(false)}
                className="text-[10px] text-outline hover:text-on-surface font-work uppercase text-center py-0.5"
              >
                Cancelar
              </button>
            </div>
          ) : (
            <button
              onClick={() => setQuickFormatOpen(true)}
              className="w-full py-2 px-2 bg-surface-container-highest hover:bg-primary hover:text-surface text-primary border border-primary/30 rounded-lg font-work text-[11px] uppercase tracking-wider font-semibold transition-all duration-200 flex items-center justify-center gap-1 whitespace-nowrap active:scale-98"
            >
              <span className="material-symbols-outlined text-[16px]" aria-hidden>
                add
              </span>
              Agregar
            </button>
          )}
        </div>
      </div>
    </article>
  );
};
