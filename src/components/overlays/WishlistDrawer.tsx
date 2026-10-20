import React from 'react';
import { useDialog } from '../../hooks/useDialog';
import { formatARS } from '../../lib/format';
import type { Fragrance } from '../../types';

interface WishlistDrawerProps {
  onClose: () => void;
  wishlist: Fragrance[];
  onRemove: (fragrance: Fragrance) => void;
  onSelect: (fragrance: Fragrance) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  onClose,
  wishlist,
  onRemove,
  onSelect,
}) => {
  const panelRef = useDialog(onClose);

  return (
    <div
      className="fixed inset-0 z-50 bg-primary/60 backdrop-blur-sm flex justify-end animate-fadeIn"
      onClick={onClose}
    >
      <div
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label="Favoritos"
        className="bg-surface w-full max-w-md h-full flex flex-col shadow-2xl border-l border-primary-container/20 text-on-surface relative animate-slideLeft outline-none"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 border-b border-outline-variant/50 bg-surface-container-low flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[24px] text-primary">favorite</span>
            <h2 className="font-playfair text-xl font-bold text-primary">
              Favoritos ({wishlist.length})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container hover:bg-surface-container-high text-primary flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Cerrar favoritos"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {wishlist.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-outline">
              <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center text-secondary mb-3">
                <span className="material-symbols-outlined text-[32px]">bookmark_border</span>
              </div>
              <p className="font-playfair text-lg text-primary font-semibold mb-1">
                Aún no guardaste fragancias
              </p>
              <p className="font-garamond text-sm text-on-surface-variant max-w-xs mb-4">
                Tocá el corazón en cualquier perfume para armar tu lista de próximas pruebas.
              </p>
              <button
                onClick={onClose}
                className="px-5 py-2 bg-primary text-surface font-work text-xs uppercase tracking-wider rounded-lg font-semibold cursor-pointer"
              >
                Explorar Catálogo
              </button>
            </div>
          ) : (
            wishlist.map((fragrance) => (
              <div
                key={fragrance.id}
                className="flex gap-3 p-3 bg-surface-container-low rounded-xl border border-outline-variant/40 shadow-2xs items-center"
              >
                <img
                  src={fragrance.image}
                  alt=""
                  className="w-16 h-20 object-cover rounded-lg bg-surface-container shrink-0 border border-outline-variant/30"
                />
                <div className="flex-1">
                  <span className="font-work text-[9px] uppercase tracking-wider text-secondary block">
                    {fragrance.house}
                  </span>
                  <h3 className="font-playfair text-sm font-bold text-primary line-clamp-1">{fragrance.name}</h3>
                  <p className="font-garamond text-xs text-on-surface-variant italic line-clamp-1">
                    {fragrance.shortNotes}
                  </p>
                  <div className="font-work text-xs font-bold text-primary mt-1">
                    Decant 5 ml desde {formatARS(fragrance.decant5mlPrice)}
                  </div>
                  <div className="flex items-center gap-3 mt-2">
                    <button
                      onClick={() => onSelect(fragrance)}
                      className="text-xs font-work font-bold text-primary hover:underline uppercase"
                    >
                      Ver y agregar
                    </button>
                    <span className="text-outline-variant">·</span>
                    <button
                      onClick={() => onRemove(fragrance)}
                      className="text-xs font-work text-error hover:underline"
                      aria-label={`Quitar ${fragrance.name} de favoritos`}
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
