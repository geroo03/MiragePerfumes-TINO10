import React from 'react';
import { EmptyState, ProductGrid } from '../components/catalog/ProductGrid';
import { ROUTES } from '../hooks/useHashRoute';
import type { Fragrance } from '../types';
import { SectionHeading, type ShopActions } from './shared';

export const WishlistPage: React.FC<{ shop: ShopActions; items: Fragrance[] }> = ({ shop, items }) => (
  <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
    <SectionHeading
      as="h1"
      eyebrow="Tu selección"
      title="Favoritos"
      subtitle={`${items.length} ${items.length === 1 ? 'fragancia guardada' : 'fragancias guardadas'} para tu próxima prueba.`}
    />
    <ProductGrid
      fragrances={items}
      {...shop}
      empty={
        <EmptyState
          icon="favorite_border"
          title="Todavía no guardaste favoritos"
          text="Tocá el corazón de cualquier perfume para guardarlo acá. Se mantienen aunque cierres la página."
          action={{ label: 'Explorar el catálogo', href: `#${ROUTES.catalog()}` }}
        />
      }
    />
  </div>
);
