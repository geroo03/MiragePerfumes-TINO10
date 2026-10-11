import React, { useState } from 'react';
import { Fragrance, DecantFormat } from '../types';
import { FORMAT_DETAILS } from '../data/fragrances';

interface ProductModalProps {
  fragrance: Fragrance | null;
  onClose: () => void;
  onAddToCart: (fragrance: Fragrance, format: DecantFormat) => void;
  isWishlisted: boolean;
  onToggleWishlist: (fragrance: Fragrance) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  fragrance,
  onClose,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
}) => {
  if (!fragrance) return null;

  const [selectedFormat, setSelectedFormat] = useState<DecantFormat>('5ml');
  const [addedAnimation, setAddedAnimation] = useState(false);

  const getPrice = (fmt: DecantFormat) => {
    switch (fmt) {
      case '5ml':
        return fragrance.decant5mlPrice;
      case '10ml':
        return fragrance.decant10mlPrice;
      case 'full':
        return fragrance.fullBottlePrice;
    }
  };

  const currentPrice = getPrice(selectedFormat);
  const details = FORMAT_DETAILS[selectedFormat];

  const handleAdd = () => {
    onAddToCart(fragrance, selectedFormat);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      onClose();
    }, 800);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#28331a]/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-[#fef9ed] rounded-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-[#3e4a2f]/20 my-auto animate-scaleIn text-[#1d1c14]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="relative p-5 sm:p-6 pb-4 border-b border-[#c6c8bc]/40 flex items-start justify-between bg-[#f8f3e7]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-work text-xs uppercase tracking-[0.16em] text-[#566341] font-semibold">
                {fragrance.house}
              </span>
              <span className="text-[#566341] text-xs">✦</span>
              <span className="font-work text-xs uppercase tracking-wider text-[#45483f]">
                {fragrance.concentration}
              </span>
            </div>
            <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-[#28331a] leading-tight">
              {fragrance.name}
            </h2>
            <p className="font-garamond text-base text-[#566341] italic mt-0.5">
              {fragrance.shortNotes}
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#f3ede1] hover:bg-[#ede8dc] text-[#28331a] flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Cerrar modal"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-6">
          {/* Top section: image + quick specs */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
            <div className="sm:col-span-5 relative aspect-square rounded-xl overflow-hidden bg-[#f3ede1] border border-[#c6c8bc]/50 shadow-inner">
              <img
                src={fragrance.image}
                alt={fragrance.imageAlt || fragrance.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => onToggleWishlist(fragrance)}
                className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-colors ${
                  isWishlisted
                    ? 'bg-[#28331a] text-[#fef9ed]'
                    : 'bg-[#fef9ed]/80 text-[#28331a]'
                }`}
                aria-label="Favorito"
              >
                <span className="material-symbols-outlined text-[18px]">
                  {isWishlisted ? 'favorite' : 'favorite_border'}
                </span>
              </button>
            </div>

            <div className="sm:col-span-7 flex flex-col justify-between h-full space-y-3">
              <p className="font-garamond text-base text-[#45483f] leading-relaxed">
                {fragrance.description}
              </p>

              {/* Technical specs strip */}
              <div className="grid grid-cols-2 gap-2 text-xs font-work">
                <div className="p-2 bg-[#f3ede1] rounded-lg border border-[#c6c8bc]/40">
                  <span className="text-[#566341] block text-[10px] uppercase tracking-wider">
                    Longevidad
                  </span>
                  <span className="font-semibold text-[#28331a]">{fragrance.longevity}</span>
                </div>
                <div className="p-2 bg-[#f3ede1] rounded-lg border border-[#c6c8bc]/40">
                  <span className="text-[#566341] block text-[10px] uppercase tracking-wider">
                    Estela / Proyección
                  </span>
                  <span className="font-semibold text-[#28331a]">{fragrance.sillage}</span>
                </div>
                <div className="p-2 bg-[#f3ede1] rounded-lg border border-[#c6c8bc]/40">
                  <span className="text-[#566341] block text-[10px] uppercase tracking-wider">
                    Batch Code
                  </span>
                  <span className="font-semibold text-[#28331a] font-mono">{fragrance.batchCode}</span>
                </div>
                <div className="p-2 bg-[#f3ede1] rounded-lg border border-[#c6c8bc]/40">
                  <span className="text-[#566341] block text-[10px] uppercase tracking-wider">
                    Origen
                  </span>
                  <span className="font-semibold text-[#28331a]">{fragrance.origin}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Olfactory Pyramid Stepped Display */}
          <div className="bg-[#f8f3e7] p-4 sm:p-5 rounded-xl border border-[#3e4a2f]/15">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs text-[#566341]">✦</span>
              <h3 className="font-work text-xs uppercase tracking-[0.16em] text-[#28331a] font-bold">
                Pirámide Olfativa (Evolución en piel)
              </h3>
            </div>

            <div className="space-y-2.5 font-garamond text-sm">
              <div className="flex items-baseline gap-2">
                <span className="w-24 shrink-0 font-work text-[10px] uppercase tracking-wider text-[#566341] font-semibold">
                  Salida (0-30m):
                </span>
                <span className="text-[#1d1c14]">
                  {fragrance.pyramid.salida.join(' · ')}
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="w-24 shrink-0 font-work text-[10px] uppercase tracking-wider text-[#566341] font-semibold">
                  Corazón (2-4h):
                </span>
                <span className="text-[#1d1c14]">
                  {fragrance.pyramid.corazon.join(' · ')}
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="w-24 shrink-0 font-work text-[10px] uppercase tracking-wider text-[#566341] font-semibold">
                  Fondo (4-12h+):
                </span>
                <span className="text-[#1d1c14] font-medium">
                  {fragrance.pyramid.fondo.join(' · ')}
                </span>
              </div>
            </div>
          </div>

          {/* Format Selector */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="font-work text-xs uppercase tracking-wider text-[#28331a] font-bold">
                Seleccioná tu formato
              </span>
              <span className="font-work text-[11px] text-[#566341]">
                {details.sprays}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              {/* 5ml */}
              <button
                type="button"
                onClick={() => setSelectedFormat('5ml')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  selectedFormat === '5ml'
                    ? 'border-[#28331a] bg-[#d6e5bb]/50 ring-1 ring-[#28331a]'
                    : 'border-[#c6c8bc] bg-[#f8f3e7] hover:bg-[#ede8dc]'
                }`}
              >
                <div className="font-work text-xs font-bold text-[#28331a]">Decant 5 ml</div>
                <div className="font-garamond text-xs text-[#566341] mt-0.5">Muestra de bolsillo</div>
                <div className="font-work text-sm font-bold text-[#28331a] mt-2">
                  ${fragrance.decant5mlPrice.toLocaleString('es-AR')}{' '}
                  <span className="text-[9px] font-normal">ARS</span>
                </div>
              </button>

              {/* 10ml */}
              <button
                type="button"
                onClick={() => setSelectedFormat('10ml')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  selectedFormat === '10ml'
                    ? 'border-[#28331a] bg-[#d6e5bb]/50 ring-1 ring-[#28331a]'
                    : 'border-[#c6c8bc] bg-[#f8f3e7] hover:bg-[#ede8dc]'
                }`}
              >
                <div className="font-work text-xs font-bold text-[#28331a]">Decant 10 ml</div>
                <div className="font-garamond text-xs text-[#566341] mt-0.5">Formato favorito</div>
                <div className="font-work text-sm font-bold text-[#28331a] mt-2">
                  ${fragrance.decant10mlPrice.toLocaleString('es-AR')}{' '}
                  <span className="text-[9px] font-normal">ARS</span>
                </div>
              </button>

              {/* Full bottle */}
              <button
                type="button"
                onClick={() => setSelectedFormat('full')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  selectedFormat === 'full'
                    ? 'border-[#28331a] bg-[#d6e5bb]/50 ring-1 ring-[#28331a]'
                    : 'border-[#c6c8bc] bg-[#f8f3e7] hover:bg-[#ede8dc]'
                }`}
              >
                <div className="font-work text-xs font-bold text-[#28331a]">Botella Sellada</div>
                <div className="font-garamond text-xs text-[#566341] mt-0.5">Frasco completo</div>
                <div className="font-work text-sm font-bold text-[#28331a] mt-2">
                  ${fragrance.fullBottlePrice.toLocaleString('es-AR')}{' '}
                  <span className="text-[9px] font-normal">ARS</span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Modal Footer / Add to Cart CTA */}
        <div className="p-5 sm:p-6 bg-[#f8f3e7] border-t border-[#c6c8bc]/50 flex items-center justify-between gap-4">
          <div>
            <span className="font-work text-[10px] uppercase tracking-wider text-[#566341] block">
              Total seleccionado ({selectedFormat})
            </span>
            <div className="font-work text-xl sm:text-2xl font-bold text-[#28331a]">
              $ {currentPrice.toLocaleString('es-AR')}{' '}
              <span className="text-xs font-normal text-[#45483f]">ARS</span>
            </div>
          </div>

          <button
            onClick={handleAdd}
            className={`px-6 sm:px-8 py-3.5 rounded-xl font-work text-xs uppercase tracking-wider font-bold flex items-center gap-2 transition-all shadow-md active:scale-98 cursor-pointer ${
              addedAnimation
                ? 'bg-[#566341] text-[#fef9ed]'
                : 'bg-[#28331a] hover:bg-[#3e4a2f] text-[#fef9ed]'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">
              {addedAnimation ? 'check' : 'shopping_bag'}
            </span>
            <span>
              {addedAnimation ? '¡Agregado a la bolsa!' : 'Agregar a la Bolsa'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
