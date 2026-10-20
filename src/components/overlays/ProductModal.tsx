import React, { useState } from 'react';
import { FORMAT_DETAILS } from '../../data/fragrances';
import { useDialog } from '../../hooks/useDialog';
import { formatARS } from '../../lib/format';
import { formatLabel, priceFor } from '../../lib/pricing';
import type { DecantFormat, Fragrance } from '../../types';

interface ProductModalProps {
  fragrance: Fragrance;
  onClose: () => void;
  onAddToCart: (fragrance: Fragrance, format: DecantFormat) => void;
  isWishlisted: boolean;
  onToggleWishlist: (fragrance: Fragrance) => void;
}

const FORMATS: { format: DecantFormat; title: string; subtitle: string }[] = [
  { format: '5ml', title: 'Decant 5 ml', subtitle: 'Muestra de bolsillo' },
  { format: '10ml', title: 'Decant 10 ml', subtitle: 'Formato favorito' },
  { format: 'full', title: 'Botella sellada', subtitle: 'Frasco completo' },
];

const SPECS = (f: Fragrance) => [
  { label: 'Longevidad', value: f.longevity },
  { label: 'Estela', value: f.sillage },
  { label: 'Concentración', value: f.concentration },
  { label: 'Origen', value: f.origin },
];

const PYRAMID = (f: Fragrance) => [
  { label: 'Salida', hint: '0–30 min', notes: f.pyramid.salida },
  { label: 'Corazón', hint: '2–4 h', notes: f.pyramid.corazon },
  { label: 'Fondo', hint: '4–12 h+', notes: f.pyramid.fondo },
];

export const ProductModal: React.FC<ProductModalProps> = ({
  fragrance,
  onClose,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
}) => {
  const [selectedFormat, setSelectedFormat] = useState<DecantFormat>('5ml');
  const [added, setAdded] = useState(false);
  const [copied, setCopied] = useState(false);
  const panelRef = useDialog(onClose);

  const details = FORMAT_DETAILS[selectedFormat];

  const handleAdd = () => {
    if (added) return;
    onAddToCart(fragrance, selectedFormat);
    setAdded(true);
    setTimeout(onClose, 700);
  };

  const handleShare = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: `${fragrance.house} ${fragrance.name}`, url });
      } else {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      /* el usuario canceló */
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-primary/60 backdrop-blur-sm flex items-end sm:items-center justify-center sm:p-5 animate-fadeIn"
      onClick={onClose}
    >
      <div
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-title"
        className="bg-surface rounded-t-2xl sm:rounded-2xl max-w-2xl w-full max-h-[94dvh] sm:max-h-[92vh] flex flex-col shadow-2xl border border-primary-container/20 animate-scaleIn text-on-surface outline-none"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative p-5 sm:p-6 pb-4 border-b border-outline-variant/40 flex items-start justify-between gap-3 bg-surface-container-low rounded-t-2xl">
          <div className="min-w-0">
            <p className="font-work text-xs uppercase tracking-[0.16em] text-secondary font-semibold mb-1">
              {fragrance.house} <span aria-hidden>✦</span>{' '}
              <span className="text-on-surface-variant font-normal tracking-wider">{fragrance.concentration}</span>
            </p>
            <h2 id="product-title" className="font-playfair text-2xl sm:text-3xl font-bold text-primary leading-tight">
              {fragrance.name}
            </h2>
            <p className="font-garamond text-base text-secondary italic mt-0.5">{fragrance.shortNotes}</p>
          </div>
          <div className="flex gap-2 shrink-0">
            <button
              onClick={handleShare}
              className="w-9 h-9 rounded-full bg-surface-container hover:bg-surface-container-high text-primary flex items-center justify-center transition-colors"
              aria-label={copied ? 'Link copiado' : 'Compartir este perfume'}
              title={copied ? '¡Link copiado!' : 'Compartir'}
            >
              <span className="material-symbols-outlined text-[18px]" aria-hidden>
                {copied ? 'check' : 'share'}
              </span>
            </button>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-surface-container hover:bg-surface-container-high text-primary flex items-center justify-center transition-colors"
              aria-label="Cerrar ficha"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="p-5 sm:p-6 space-y-6 overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
            <div className="sm:col-span-5 relative aspect-square rounded-xl overflow-hidden bg-surface-container border border-outline-variant/50">
              <img src={fragrance.image} alt={fragrance.imageAlt || fragrance.name} className="w-full h-full object-cover" />
              <button
                onClick={() => onToggleWishlist(fragrance)}
                aria-pressed={isWishlisted}
                aria-label={isWishlisted ? 'Quitar de favoritos' : 'Guardar en favoritos'}
                className={`absolute top-2.5 right-2.5 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-colors ${
                  isWishlisted ? 'bg-primary text-surface' : 'bg-surface/80 text-primary'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]" aria-hidden>
                  {isWishlisted ? 'favorite' : 'favorite_border'}
                </span>
              </button>
            </div>

            <div className="sm:col-span-7 flex flex-col space-y-3">
              <p className="font-garamond text-base text-on-surface-variant leading-relaxed">{fragrance.description}</p>
              <dl className="grid grid-cols-2 gap-2 text-xs font-work">
                {SPECS(fragrance).map((s) => (
                  <div key={s.label} className="p-2 bg-surface-container rounded-lg border border-outline-variant/40">
                    <dt className="text-secondary text-[10px] uppercase tracking-wider">{s.label}</dt>
                    <dd className="font-semibold text-primary">{s.value}</dd>
                  </div>
                ))}
              </dl>
              <p className="font-garamond text-sm text-on-surface-variant italic">
                <span className="font-work not-italic text-[10px] uppercase tracking-wider text-secondary mr-1">Ideal para</span>
                {fragrance.occasion}
              </p>
            </div>
          </div>

          <section className="bg-surface-container-low p-4 sm:p-5 rounded-xl border border-primary-container/15">
            <h3 className="font-work text-xs uppercase tracking-[0.16em] text-primary font-bold mb-3">
              <span className="text-secondary" aria-hidden>
                ✦{' '}
              </span>
              Pirámide olfativa
            </h3>
            <dl className="space-y-2.5 font-garamond text-sm">
              {PYRAMID(fragrance).map((row) => (
                <div key={row.label} className="flex items-baseline gap-2">
                  <dt className="w-28 shrink-0 font-work text-[10px] uppercase tracking-wider text-secondary font-semibold">
                    {row.label} <span className="font-normal normal-case text-outline">({row.hint})</span>
                  </dt>
                  <dd className="text-on-surface">{row.notes.join(' · ')}</dd>
                </div>
              ))}
            </dl>
          </section>

          <fieldset>
            <div className="flex items-center justify-between mb-3">
              <legend className="font-work text-xs uppercase tracking-wider text-primary font-bold">Elegí tu formato</legend>
              <span className="font-work text-[11px] text-secondary">{details.sprays}</span>
            </div>
            <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
              {FORMATS.map(({ format, title, subtitle }) => {
                const active = selectedFormat === format;
                return (
                  <button
                    key={format}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setSelectedFormat(format)}
                    className={`p-2.5 sm:p-3 rounded-xl border text-left transition-all ${
                      active
                        ? 'border-primary bg-secondary-container/50 ring-1 ring-primary'
                        : 'border-outline-variant bg-surface-container-low hover:bg-surface-container-high'
                    }`}
                  >
                    <span className="block font-work text-[11px] sm:text-xs font-bold text-primary">{title}</span>
                    <span className="block font-garamond text-xs text-secondary mt-0.5">{subtitle}</span>
                    <span className="block font-work text-sm font-bold text-primary mt-2">{formatARS(priceFor(fragrance, format))}</span>
                  </button>
                );
              })}
            </div>
            <p className="font-garamond text-xs text-on-surface-variant italic mt-2">{details.duration}</p>
          </fieldset>
        </div>

        <div className="p-4 sm:p-6 bg-surface-container-low border-t border-outline-variant/50 flex items-center justify-between gap-4 pb-safe sm:rounded-b-2xl">
          <div>
            <span className="font-work text-[10px] uppercase tracking-wider text-secondary block">{formatLabel(selectedFormat)}</span>
            <p className="font-work text-xl sm:text-2xl font-bold text-primary">
              {formatARS(priceFor(fragrance, selectedFormat))} <span className="text-xs font-normal text-on-surface-variant">ARS</span>
            </p>
          </div>
          <button
            onClick={handleAdd}
            className={`px-5 sm:px-8 py-3.5 rounded-xl font-work text-xs uppercase tracking-wider font-bold flex items-center gap-2 transition-all shadow-md active:scale-98 ${
              added ? 'bg-secondary text-surface' : 'bg-primary hover:bg-primary-container text-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]" aria-hidden>
              {added ? 'check' : 'shopping_bag'}
            </span>
            {added ? '¡Agregado!' : 'Agregar a la bolsa'}
          </button>
        </div>
      </div>
    </div>
  );
};
