import React from 'react';
import { FragranceCategory } from '../../types';

interface CategoryFilterBarProps {
  selectedCategory: FragranceCategory;
  onSelectCategory: (category: FragranceCategory) => void;
  itemCount: number;
  /** En el catálogo queda fija bajo el header; en el inicio no. */
  sticky?: boolean;
}

export const CategoryFilterBar: React.FC<CategoryFilterBarProps> = ({
  selectedCategory,
  onSelectCategory,
  itemCount,
  sticky = false,
}) => {
  const categories: { id: FragranceCategory; label: string }[] = [
    { id: 'all', label: 'Todos' },
    { id: 'arabes', label: 'Árabes & Orientales' },
    { id: 'decants', label: 'Decants (5ml & 10ml)' },
    { id: 'disenador', label: 'Diseñador' },
    { id: 'masculinos', label: 'Masculinos' },
    { id: 'femeninos', label: 'Femeninos' },
    { id: 'unisex', label: 'Unisex' },
  ];

  return (
    <section
      aria-label="Filtrar por categoría"
      className={`w-full bg-surface-container/95 px-4 md:px-8 py-3.5 border-b border-outline-variant/40 shadow-xs backdrop-blur-md ${
        sticky ? 'sticky top-16 md:top-[100px] z-20' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 overflow-x-auto no-scrollbar py-0.5">
        {/* Left Filter indicator */}
        <div className="hidden md:flex items-center gap-1.5 text-primary font-work text-[11px] uppercase tracking-widest shrink-0 pr-3 border-r border-outline-variant/50">
          <span className="font-semibold">Filtrar</span>
          <span className="text-[10px] text-secondary">✦</span>
        </div>

        {/* Buttons List */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-start md:justify-center flex-nowrap shrink-0">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                type="button"
                aria-pressed={isActive}
                className={`px-3.5 sm:px-4 py-1.5 rounded-full font-work text-[11px] uppercase tracking-wider transition-all shrink-0 flex items-center gap-1 cursor-pointer active:scale-95 ${
                  isActive
                    ? 'bg-primary text-surface font-semibold shadow-xs'
                    : 'border border-secondary/60 text-primary bg-surface-container-low/80 hover:bg-surface-container-high'
                }`}
              >
                {isActive && <span className="text-[9px]" aria-hidden>✦</span>}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right Note indicator */}
        <div className="shrink-0 pl-3 border-l border-outline-variant/50 hidden xl:flex items-center text-on-surface-variant font-garamond text-sm italic">
          Curaduría por notas ({itemCount} {itemCount === 1 ? 'fragancia' : 'fragancias'})
        </div>
      </div>
    </section>
  );
};
