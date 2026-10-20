import React, { useMemo } from 'react';
import { CategoryFilterBar } from '../components/catalog/CategoryFilterBar';
import { EmptyState, ProductGrid } from '../components/catalog/ProductGrid';
import { FRAGRANCES } from '../data/fragrances';
import { navigate, ROUTES } from '../hooks/useHashRoute';
import type { Fragrance, FragranceCategory } from '../types';
import { PageBanner, type ShopActions } from './shared';

const normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');

/** Busca en nombre, casa, notas y descripción, sin importar tildes ni mayúsculas. */
const matches = (f: Fragrance, query: string) => {
  const q = normalize(query.trim());
  if (!q) return true;
  const haystack = normalize(
    [f.name, f.house, f.shortNotes, f.description, ...f.pyramid.salida, ...f.pyramid.corazon, ...f.pyramid.fondo].join(' ')
  );
  return q.split(/\s+/).every((word) => haystack.includes(word));
};

interface CatalogPageProps {
  shop: ShopActions;
  category: FragranceCategory;
  decantsMode: boolean;
  searchQuery: string;
  onClearSearch: () => void;
}

export const CatalogPage: React.FC<CatalogPageProps> = ({ shop, category, decantsMode, searchQuery, onClearSearch }) => {
  const results = useMemo(
    () => FRAGRANCES.filter((f) => (category === 'all' || f.category.includes(category)) && matches(f, searchQuery)),
    [category, searchQuery]
  );

  return (
    <div className="flex flex-col w-full">
      <PageBanner
        eyebrow="Colección del atelier"
        title={decantsMode ? 'Muestras & decants' : 'Catálogo de fragancias'}
        subtitle={
          decantsMode
            ? 'Fraccionados en frascos de vidrio de 5 ml (~70 atomizaciones) y 10 ml (~140 atomizaciones).'
            : 'Joyas árabes y lanzamientos de las grandes casas de diseñador.'
        }
      />

      <CategoryFilterBar
        sticky
        selectedCategory={category}
        onSelectCategory={(c) => navigate(ROUTES.catalog(c), { replace: true })}
        itemCount={results.length}
      />

      <section className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-14 w-full" aria-label="Resultados">
        {searchQuery.trim() && results.length > 0 && (
          <p className="font-garamond text-sm text-on-surface-variant italic mb-4" role="status">
            {results.length} {results.length === 1 ? 'resultado' : 'resultados'} para “{searchQuery.trim()}”{' '}
            <button onClick={onClearSearch} className="not-italic font-work text-xs text-primary underline ml-1">
              Limpiar
            </button>
          </p>
        )}
        <ProductGrid
          fragrances={results}
          {...shop}
          empty={
            <EmptyState
              icon="search_off"
              title={searchQuery.trim() ? `Sin resultados para “${searchQuery.trim()}”` : 'No hay fragancias en esta categoría'}
              text='Probá buscar por familias: "vainilla", "café", "limón", "maderas" u "oud".'
              action={{
                label: 'Ver todo el catálogo',
                onClick: () => {
                  onClearSearch();
                  navigate(ROUTES.catalog(), { replace: true });
                },
              }}
            />
          }
        />
      </section>
    </div>
  );
};
