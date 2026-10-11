import React from 'react';
import { Fragrance } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: Fragrance[];
  onRemove: (fragrance: Fragrance) => void;
  onSelect: (fragrance: Fragrance) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlist,
  onRemove,
  onSelect,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-[#28331a]/60 backdrop-blur-sm flex justify-end animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-[#fef9ed] w-full max-w-md h-full flex flex-col shadow-2xl border-l border-[#3e4a2f]/20 text-[#1d1c14] relative animate-slideLeft"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 border-b border-[#c6c8bc]/50 bg-[#f8f3e7] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[24px] text-[#28331a]">favorite</span>
            <h2 className="font-playfair text-xl font-bold text-[#28331a]">
              Lista de Deseos ({wishlist.length})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f3ede1] hover:bg-[#ede8dc] text-[#28331a] flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Cerrar favoritos"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {wishlist.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-[#76786e]">
              <div className="w-16 h-16 rounded-full bg-[#f3ede1] flex items-center justify-center text-[#566341] mb-3">
                <span className="material-symbols-outlined text-[32px]">bookmark_border</span>
              </div>
              <p className="font-playfair text-lg text-[#28331a] font-semibold mb-1">
                Aún no guardaste fragancias
              </p>
              <p className="font-garamond text-sm text-[#45483f] max-w-xs mb-4">
                Toca el icono de corazón en cualquier perfume para armar tu lista de próximas pruebas.
              </p>
              <button
                onClick={onClose}
                className="px-5 py-2 bg-[#28331a] text-[#fef9ed] font-work text-xs uppercase tracking-wider rounded-lg font-semibold cursor-pointer"
              >
                Explorar Catálogo
              </button>
            </div>
          ) : (
            wishlist.map((fragrance) => (
              <div
                key={fragrance.id}
                className="flex gap-3 p-3 bg-[#f8f3e7] rounded-xl border border-[#c6c8bc]/40 shadow-2xs items-center"
              >
                <img
                  src={fragrance.image}
                  alt={fragrance.name}
                  className="w-16 h-20 object-cover rounded-lg bg-[#f3ede1] shrink-0 border border-[#c6c8bc]/30 cursor-pointer"
                  onClick={() => {
                    onSelect(fragrance);
                    onClose();
                  }}
                />
                <div className="flex-1">
                  <span className="font-work text-[9px] uppercase tracking-wider text-[#566341] block">
                    {fragrance.house}
                  </span>
                  <h4
                    className="font-playfair text-sm font-bold text-[#28331a] line-clamp-1 cursor-pointer hover:text-[#566341]"
                    onClick={() => {
                      onSelect(fragrance);
                      onClose();
                    }}
                  >
                    {fragrance.name}
                  </h4>
                  <p className="font-garamond text-xs text-[#45483f] italic line-clamp-1">
                    {fragrance.shortNotes}
                  </p>
                  <div className="font-work text-xs font-bold text-[#28331a] mt-1">
                    Decant 5ml desde ${fragrance.decant5mlPrice.toLocaleString('es-AR')} ARS
                  </div>
                  <div className="flex items-center gap-3 mt-2">
                    <button
                      onClick={() => {
                        onSelect(fragrance);
                        onClose();
                      }}
                      className="text-xs font-work font-bold text-[#28331a] hover:underline uppercase"
                    >
                      Elegir Formato
                    </button>
                    <span className="text-[#c6c8bc]">·</span>
                    <button
                      onClick={() => onRemove(fragrance)}
                      className="text-xs font-work text-[#ba1a1a] hover:underline"
                    >
                      Quitar
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
