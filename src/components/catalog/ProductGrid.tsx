import React from 'react';
import type { DecantFormat, Fragrance } from '../../types';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  fragrances: Fragrance[];
  isWishlisted: (id: string) => boolean;
  onToggleWishlist: (fragrance: Fragrance) => void;
  onQuickView: (fragrance: Fragrance) => void;
  onAddToCart: (fragrance: Fragrance, format: DecantFormat) => void;
  /** Contenido a mostrar si no hay resultados. */
  empty?: React.ReactNode;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ fragrances, isWishlisted, empty, ...handlers }) =>
  fragrances.length === 0 ? (
    <>{empty}</>
  ) : (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
      {fragrances.map((fragrance, i) => (
        <ProductCard
          key={fragrance.id}
          fragrance={fragrance}
          isWishlisted={isWishlisted(fragrance.id)}
          eager={i < 4}
          {...handlers}
        />
      ))}
    </div>
  );

/** Estado vacío reutilizable (búsqueda sin resultados, favoritos vacíos, etc.). */
export const EmptyState: React.FC<{
  icon: string;
  title: string;
  text: string;
  action?: { label: string; onClick?: () => void; href?: string };
}> = ({ icon, title, text, action }) => {
  const cls =
    'inline-block px-5 py-2.5 bg-primary text-surface font-work text-xs uppercase tracking-wider rounded-lg font-bold hover:bg-primary-container transition-colors';
  return (
    <div className="py-14 px-6 text-center bg-surface-container-low rounded-2xl border border-outline-variant/40">
      <span className="material-symbols-outlined text-[44px] text-secondary mb-2" aria-hidden>
        {icon}
      </span>
      <p className="font-playfair text-xl text-primary font-semibold">{title}</p>
      <p className="font-garamond text-sm text-on-surface-variant mt-1 mb-5 max-w-sm mx-auto">{text}</p>
      {action &&
        (action.href ? (
          <a href={action.href} className={cls}>
            {action.label}
          </a>
        ) : (
          <button onClick={action.onClick} className={cls}>
            {action.label}
          </button>
        ))}
    </div>
  );
};
