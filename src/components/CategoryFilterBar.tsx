import React from 'react';
import { FragranceCategory } from '../types';

interface CategoryFilterBarProps {
  selectedCategory: FragranceCategory;
  onSelectCategory: (category: FragranceCategory) => void;
  itemCount: number;
}

export const CategoryFilterBar: React.FC<CategoryFilterBarProps> = ({
  selectedCategory,
  onSelectCategory,
  itemCount,
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
    <section className="w-full bg-[#f3ede1] px-4 md:px-8 py-3.5 border-b border-[#c6c8bc]/40 sticky top-16 md:top-20 z-30 shadow-xs backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 overflow-x-auto no-scrollbar py-0.5">
        {/* Left Filter indicator */}
        <div className="flex items-center gap-1.5 text-[#28331a] font-work text-[11px] uppercase tracking-widest shrink-0 pr-3 border-r border-[#c6c8bc]/50 hidden md:flex">
          <span className="font-semibold">Filtrar</span>
          <span className="text-[10px] text-[#566341]">✦</span>
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
                className={`px-3.5 sm:px-4 py-1.5 rounded-full font-work text-[11px] uppercase tracking-wider transition-all shrink-0 flex items-center gap-1 cursor-pointer active:scale-95 ${
                  isActive
                    ? 'bg-[#28331a] text-[#fef9ed] font-semibold shadow-xs'
                    : 'border border-[#566341]/60 text-[#28331a] bg-[#f8f3e7]/80 hover:bg-[#ede8dc]'
                }`}
              >
                {isActive && <span className="text-[9px]">✦</span>}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right Note indicator */}
        <div className="shrink-0 pl-3 border-l border-[#c6c8bc]/50 hidden xl:flex items-center text-[#45483f] font-garamond text-sm italic">
          Curaduría por notas ({itemCount} {itemCount === 1 ? 'fragancia' : 'fragancias'})
        </div>
      </div>
    </section>
  );
};
