import React from 'react';
import type { DecantFormat, Fragrance } from '../types';

/** Acciones de tienda que comparten todas las páginas con grilla de productos. */
export interface ShopActions {
  isWishlisted: (id: string) => boolean;
  onToggleWishlist: (fragrance: Fragrance) => void;
  onQuickView: (fragrance: Fragrance) => void;
  onAddToCart: (fragrance: Fragrance, format: DecantFormat) => void;
}

export const SectionHeading: React.FC<{ eyebrow: string; title: string; subtitle?: string; as?: 'h1' | 'h2' }> = ({
  eyebrow,
  title,
  subtitle,
  as: Tag = 'h2',
}) => (
  <div className="flex flex-col items-center text-center mb-6 md:mb-10">
    <span className="font-work text-[10px] md:text-xs tracking-[0.2em] uppercase text-secondary font-semibold mb-1">{eyebrow}</span>
    <div className="flex items-center justify-center gap-2 my-1 text-secondary/60" aria-hidden>
      <span className="w-10 h-px bg-outline-variant" />
      <span className="text-xs">✦</span>
      <span className="w-10 h-px bg-outline-variant" />
    </div>
    <Tag className="font-playfair text-2xl sm:text-3xl md:text-4xl text-primary uppercase tracking-wide font-semibold">{title}</Tag>
    {subtitle && <p className="font-garamond text-sm sm:text-base text-on-surface-variant italic mt-1 max-w-xl">{subtitle}</p>}
  </div>
);

export const PageBanner: React.FC<{ eyebrow: string; title: string; subtitle: string }> = ({ eyebrow, title, subtitle }) => (
  <section className="bg-surface-container px-5 md:px-8 py-8 md:py-12 border-b border-outline-variant/40 text-center">
    <div className="max-w-4xl mx-auto">
      <p className="inline-flex items-center gap-1.5 px-3 py-1 bg-surface-container-high rounded-full text-secondary font-work text-[10px] uppercase tracking-widest font-bold mb-2">
        <span aria-hidden>✦</span> {eyebrow} <span aria-hidden>✦</span>
      </p>
      <h1 className="font-playfair text-3xl sm:text-4xl md:text-5xl uppercase text-primary font-semibold mb-2">{title}</h1>
      <p className="font-garamond text-base sm:text-lg text-on-surface-variant italic max-w-xl mx-auto">{subtitle}</p>
    </div>
  </section>
);
