import React, { useState } from 'react';
import { SITE } from '../../config/site';
import { ROUTES } from '../../hooks/useHashRoute';

interface HeaderProps {
  path: string;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  searchQuery: string;
  onSearch: (query: string) => void;
}

const NAV = [
  { label: 'Inicio', href: ROUTES.home },
  { label: 'Catálogo', href: ROUTES.catalog() },
  { label: 'Árabes', href: ROUTES.catalog('arabes') },
  { label: 'Decants', href: ROUTES.decants },
  { label: 'Diseñador', href: ROUTES.catalog('disenador') },
  { label: 'Nosotros', href: ROUTES.about },
  { label: 'Contacto', href: ROUTES.contact },
];

export const Header: React.FC<HeaderProps> = ({
  path,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  searchQuery,
  onSearch,
}) => {
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const searchInput = (className: string, placeholder: string, autoFocus = false) => (
    <input
      type="search"
      value={searchQuery}
      onChange={(e) => onSearch(e.target.value)}
      placeholder={placeholder}
      aria-label="Buscar fragancias por nombre, casa o notas"
      autoFocus={autoFocus}
      className={`bg-surface-container-low border border-outline-variant rounded-md px-3 py-1.5 font-garamond text-sm text-on-surface placeholder:italic placeholder:text-outline focus:outline-none focus:border-primary transition-all [&::-webkit-search-cancel-button]:hidden ${className}`}
    />
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-surface-container-highest/95 backdrop-blur-md border-b border-primary-container/20 shadow-[0_1px_8px_rgba(40,51,26,0.06)]">
      <div className="hidden md:flex items-center justify-center h-7 bg-primary text-surface-container-low text-[11px] font-work uppercase tracking-[0.14em] font-medium">
        ✦ Perfumes árabes y de diseñador · Efectivo o transferencia · Envíos a todo el país ✦
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 md:h-18 flex items-center justify-between gap-4">
        <a href={`#${ROUTES.home}`} className="flex flex-col shrink-0 group" aria-label={`${SITE.name}, inicio`}>
          <span className="font-playfair text-lg md:text-xl font-bold tracking-[0.15em] text-primary group-hover:text-primary-container transition-colors uppercase leading-none">
            {SITE.shortName}
          </span>
          <span className="font-work text-[9px] md:text-[10px] tracking-[0.24em] text-secondary uppercase mt-1 whitespace-nowrap">
            {SITE.tagline}
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-5 xl:gap-6" aria-label="Principal">
          {NAV.map((item) => {
            const active = item.href === '/' ? path === '/' : path === item.href;
            return (
              <a
                key={item.href}
                href={`#${item.href}`}
                aria-current={active ? 'page' : undefined}
                className={`font-work text-xs uppercase tracking-[0.14em] py-1 whitespace-nowrap transition-colors border-b ${
                  active
                    ? 'text-primary font-bold border-primary'
                    : 'text-on-surface-variant border-transparent hover:text-primary'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-1 md:gap-2">
          <div className="relative hidden sm:flex items-center">
            {searchInput('w-40 md:w-48 xl:w-56 pr-8', 'Buscar notas, casas...')}
            {searchQuery ? (
              <button
                onClick={() => onSearch('')}
                className="absolute right-2 text-outline hover:text-on-surface text-xs font-bold w-5 h-5"
                aria-label="Limpiar búsqueda"
              >
                ✕
              </button>
            ) : (
              <span className="material-symbols-outlined absolute right-2.5 text-outline text-[18px] pointer-events-none" aria-hidden>
                search
              </span>
            )}
          </div>

          <button
            onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
            aria-label="Buscar en el catálogo"
            aria-expanded={mobileSearchOpen}
            className="sm:hidden w-10 h-10 flex items-center justify-center text-primary rounded-lg active:bg-surface-container-high transition-colors"
          >
            <span className="material-symbols-outlined text-[22px]" aria-hidden>
              search
            </span>
          </button>

          <button
            onClick={onOpenWishlist}
            aria-label={`Favoritos (${wishlistCount})`}
            className="hidden lg:flex w-10 h-10 items-center justify-center text-primary relative rounded-lg hover:bg-surface-container-high transition-colors"
          >
            <span className="material-symbols-outlined text-[22px]" aria-hidden>
              favorite
            </span>
            {wishlistCount > 0 && (
              <span className="absolute top-1 right-1 min-w-[17px] h-[17px] px-1 bg-secondary text-surface font-work text-[9px] font-bold rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          <button
            onClick={onOpenCart}
            aria-label={`Bolsa de compras (${cartCount})`}
            className="w-10 h-10 flex items-center justify-center text-primary relative rounded-lg active:bg-surface-container-high hover:bg-surface-container-high transition-colors"
          >
            <span className="material-symbols-outlined text-[22px]" aria-hidden>
              shopping_bag
            </span>
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 min-w-[18px] h-[18px] px-1 bg-primary text-surface font-work text-[10px] font-bold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {mobileSearchOpen && (
        <div className="sm:hidden px-4 py-2.5 bg-surface-container border-t border-outline-variant/50 flex items-center gap-2 animate-slideDown">
          {searchInput('flex-1', 'Vainilla, café, oud, ámbar...', true)}
          <button
            onClick={() => {
              onSearch('');
              setMobileSearchOpen(false);
            }}
            className="text-xs text-primary font-work font-medium uppercase px-1 h-9"
          >
            Cerrar
          </button>
        </div>
      )}
    </header>
  );
};
