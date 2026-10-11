import React, { useState } from 'react';
import { Fragrance } from '../types';

interface ProductCardProps {
  fragrance: Fragrance;
  isWishlisted: boolean;
  onToggleWishlist: (fragrance: Fragrance) => void;
  onQuickView: (fragrance: Fragrance) => void;
  onAddToCart: (fragrance: Fragrance, format: '5ml' | '10ml' | 'full') => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  fragrance,
  isWishlisted,
  onToggleWishlist,
  onQuickView,
  onAddToCart,
}) => {
  const [quickFormatOpen, setQuickFormatOpen] = useState(false);

  const formatBadgeBg = (badge?: string) => {
    switch (badge) {
      case 'Best Seller':
        return 'bg-[#d6e5bb] text-[#28331a]';
      case 'Tendencia':
        return 'bg-[#d9e8c3] text-[#141f08]';
      case 'Más Reseñado':
        return 'bg-[#3e4a2f] text-[#fef9ed]';
      case 'Exclusivo':
        return 'bg-[#28331a] text-[#fef9ed]';
      case 'Novedad':
        return 'bg-[#bdcca3] text-[#161e0d]';
      default:
        return 'bg-[#d6e5bb] text-[#28331a]';
    }
  };

  return (
    <article className="flex flex-col bg-[#f8f3e7] rounded-xl overflow-hidden border border-[#3e4a2f]/15 hover:border-[#28331a] shadow-xs hover:shadow-md transition-all duration-300 group">
      {/* Product Image Box */}
      <div className="relative w-full aspect-square sm:aspect-[4/5] bg-[#f3ede1] overflow-hidden flex items-center justify-center">
        {/* Badge */}
        {fragrance.badge && (
          <div className="absolute top-2.5 left-2.5 z-10">
            <span
              className={`px-2 py-0.5 rounded-sm font-work text-[9px] uppercase tracking-wider font-bold shadow-xs ${formatBadgeBg(
                fragrance.badge
              )}`}
            >
              {fragrance.badge}
            </span>
          </div>
        )}

        {/* Favorite Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(fragrance);
          }}
          aria-label={isWishlisted ? 'Quitar de favoritos' : 'Añadir a favoritos'}
          className={`absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full backdrop-blur-md flex items-center justify-center transition-transform active:scale-90 ${
            isWishlisted
              ? 'bg-[#28331a] text-[#fef9ed]'
              : 'bg-[#fef9ed]/85 text-[#28331a] hover:bg-[#28331a] hover:text-[#fef9ed]'
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">
            {isWishlisted ? 'favorite' : 'favorite_border'}
          </span>
        </button>

        {/* Image */}
        <img
          src={fragrance.image}
          alt={fragrance.imageAlt || fragrance.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 cursor-pointer"
          onClick={() => onQuickView(fragrance)}
          loading="lazy"
        />

        {/* Quick view prompt hover */}
        <div
          onClick={() => onQuickView(fragrance)}
          className="absolute inset-0 bg-[#28331a]/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer pointer-events-none"
        >
          <span className="px-3 py-1 bg-[#fef9ed]/90 text-[#28331a] font-work text-[10px] uppercase tracking-wider font-semibold rounded-full shadow-xs">
            Ver notas olfativas
          </span>
        </div>
      </div>

      {/* Card Info Details */}
      <div className="p-3.5 sm:p-4 flex flex-col flex-1 justify-between gap-3 bg-[#f8f3e7]">
        <div className="cursor-pointer" onClick={() => onQuickView(fragrance)}>
          <span className="font-work text-[10px] sm:text-[11px] uppercase tracking-[0.14em] text-[#566341] font-semibold block mb-0.5">
            {fragrance.house}
          </span>
          <h3 className="font-playfair text-base sm:text-lg text-[#28331a] font-semibold leading-snug line-clamp-1 group-hover:text-[#566341] transition-colors">
            {fragrance.name}
          </h3>
          <p className="font-garamond text-xs sm:text-sm text-[#45483f] italic mt-0.5 line-clamp-1">
            {fragrance.shortNotes}
          </p>
        </div>

        {/* Price & Decant Sizing */}
        <div className="pt-2 border-t border-[#c6c8bc]/40 flex flex-col">
          <div className="flex flex-col mb-2.5">
            <span className="font-work text-[10px] text-[#566341]">Botella completa</span>
            <div className="font-work text-sm sm:text-base font-bold text-[#28331a] tracking-normal">
              $ {fragrance.fullBottlePrice.toLocaleString('es-AR')}{' '}
              <span className="font-normal text-[10px] text-[#45483f]">ARS</span>
            </div>
            <span className="font-work text-[10px] text-[#45483f] mt-0.5">
              Decant 5ml desde ${' '}
              <strong className="text-[#28331a] font-bold">
                {fragrance.decant5mlPrice.toLocaleString('es-AR')}
              </strong>{' '}
              ARS
            </span>
          </div>

          {/* Quick Format Dropdown/Selector */}
          {quickFormatOpen ? (
            <div className="flex flex-col gap-1.5 p-2 bg-[#f3ede1] rounded-lg border border-[#c6c8bc]/60 animate-fadeIn">
              <span className="font-work text-[9px] uppercase tracking-widest text-[#566341] font-semibold text-center">
                Elegí tu presentación:
              </span>
              <div className="grid grid-cols-3 gap-1">
                <button
                  onClick={() => {
                    onAddToCart(fragrance, '5ml');
                    setQuickFormatOpen(false);
                  }}
                  className="py-1.5 px-1 bg-[#f8f3e7] hover:bg-[#28331a] hover:text-[#fef9ed] text-[#28331a] rounded text-[10px] font-work font-bold border border-[#c6c8bc] transition-colors text-center"
                >
                  <div>5 ml</div>
                  <div className="text-[8px] font-normal opacity-90">${(fragrance.decant5mlPrice / 1000).toFixed(1)}k</div>
                </button>
                <button
                  onClick={() => {
                    onAddToCart(fragrance, '10ml');
                    setQuickFormatOpen(false);
                  }}
                  className="py-1.5 px-1 bg-[#f8f3e7] hover:bg-[#28331a] hover:text-[#fef9ed] text-[#28331a] rounded text-[10px] font-work font-bold border border-[#c6c8bc] transition-colors text-center"
                >
                  <div>10 ml</div>
                  <div className="text-[8px] font-normal opacity-90">${(fragrance.decant10mlPrice / 1000).toFixed(1)}k</div>
                </button>
                <button
                  onClick={() => {
                    onAddToCart(fragrance, 'full');
                    setQuickFormatOpen(false);
                  }}
                  className="py-1.5 px-1 bg-[#f8f3e7] hover:bg-[#28331a] hover:text-[#fef9ed] text-[#28331a] rounded text-[10px] font-work font-bold border border-[#c6c8bc] transition-colors text-center"
                >
                  <div>Frasco</div>
                  <div className="text-[8px] font-normal opacity-90">${(fragrance.fullBottlePrice / 1000).toFixed(0)}k</div>
                </button>
              </div>
              <button
                onClick={() => setQuickFormatOpen(false)}
                className="text-[9px] text-[#76786e] hover:text-[#1d1c14] font-work uppercase text-center mt-0.5"
              >
                Cancelar
              </button>
            </div>
          ) : (
            <button
              onClick={() => setQuickFormatOpen(true)}
              className="w-full py-2 px-3 bg-[#e7e2d6] hover:bg-[#28331a] hover:text-[#fef9ed] text-[#28331a] border border-[#28331a]/30 rounded-lg font-work text-[11px] uppercase tracking-wider font-semibold transition-all duration-200 flex items-center justify-center gap-1 active:scale-98 shadow-2xs"
            >
              <span className="material-symbols-outlined text-[16px]">add</span>
              <span>Elegir Formato</span>
            </button>
          )}
        </div>
      </div>
    </article>
  );
};
