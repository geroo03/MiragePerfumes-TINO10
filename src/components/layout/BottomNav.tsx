import React from 'react';
import { ROUTES } from '../../hooks/useHashRoute';

interface BottomNavProps {
  path: string;
  wishlistCount: number;
  cartCount: number;
  onOpenCart: () => void;
}

const itemClass = (active: boolean) =>
  `relative flex flex-col items-center justify-center min-w-[60px] h-12 gap-0.5 transition-colors ${
    active ? 'text-primary font-bold' : 'text-on-surface-variant'
  }`;

const Badge: React.FC<{ count: number }> = ({ count }) =>
  count > 0 ? (
    <span className="absolute top-0 right-2.5 min-w-4 h-4 px-1 rounded-full bg-secondary text-surface font-work text-[9px] font-bold flex items-center justify-center">
      {count}
    </span>
  ) : null;

/** Navegación fija inferior para celulares (en escritorio se usa el header). */
export const BottomNav: React.FC<BottomNavProps> = ({ path, wishlistCount, cartCount, onOpenCart }) => {
  const links = [
    { href: ROUTES.home, label: 'Inicio', icon: 'home', active: path === '/' },
    { href: ROUTES.catalog(), label: 'Catálogo', icon: 'spa', active: path.startsWith('/catalogo') },
    { href: ROUTES.decants, label: 'Decants', icon: 'science', active: path === ROUTES.decants },
    { href: ROUTES.wishlist, label: 'Favoritos', icon: 'favorite', active: path === ROUTES.wishlist, count: wishlistCount },
  ];

  return (
    <nav
      aria-label="Navegación inferior"
      className="fixed bottom-0 left-0 right-0 z-30 lg:hidden bg-surface-container-low/95 backdrop-blur-xl border-t border-outline-variant/50 shadow-[0_-2px_12px_rgba(40,51,26,0.06)] pb-safe"
    >
      <div className="flex justify-around items-center h-16 px-1">
        {links.map((l) => (
          <a key={l.href} href={`#${l.href}`} aria-current={l.active ? 'page' : undefined} className={itemClass(l.active)}>
            <span className="material-symbols-outlined text-[22px]" aria-hidden>
              {l.icon}
            </span>
            <span className="font-work text-[10px] tracking-wider uppercase">{l.label}</span>
            {l.count !== undefined && <Badge count={l.count} />}
          </a>
        ))}
        <button onClick={onOpenCart} className={itemClass(false)} aria-label={`Bolsa de compras (${cartCount})`}>
          <span className="material-symbols-outlined text-[22px]" aria-hidden>
            shopping_bag
          </span>
          <span className="font-work text-[10px] tracking-wider uppercase">Bolsa</span>
          <Badge count={cartCount} />
        </button>
      </div>
    </nav>
  );
};
