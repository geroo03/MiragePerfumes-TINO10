import React, { useState } from 'react';
import { INSTAGRAM_URL, SITE } from '../../config/site';
import { INSTAGRAM_PHOTOS } from '../../data/fragrances';
import { useDialog } from '../../hooks/useDialog';

type Photo = (typeof INSTAGRAM_PHOTOS)[number];

export const InstagramFeed: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  return (
    <section className="w-full px-4 md:px-8 py-8 md:py-16 bg-surface-container-low border-t border-outline-variant/30">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="flex items-center gap-1.5 text-secondary mb-1.5">
            <span className="material-symbols-outlined text-[18px]">photo_camera</span>
            <span className="font-work text-[10px] md:text-[11px] tracking-[0.2em] uppercase font-semibold">
              Comunidad Mirage
            </span>
          </div>

          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-playfair text-2xl sm:text-3xl md:text-4xl text-primary uppercase tracking-wide hover:text-secondary transition-colors font-semibold"
          >
            Seguinos en @{SITE.instagramHandle}
          </a>

          <p className="font-garamond text-sm sm:text-base text-on-surface-variant italic mt-1 max-w-md">
            Reseñas sensoriales sinceras, unboxings de lotes recién llegados y tips de fijación diarios para sacarle el máximo partido a cada gota.
          </p>
        </div>

        {/* 6-Image Grid (3 cols on mobile, 6 cols on desktop) */}
        <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 mb-8">
          {INSTAGRAM_PHOTOS.map((photo) => (
            <button
              type="button"
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              aria-label={`Ver: ${photo.alt}`}
              className="group aspect-square rounded-xl overflow-hidden relative cursor-pointer bg-surface-container-high shadow-2xs hover:shadow-md transition-all duration-300"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-surface p-2 text-center">
                <span className="material-symbols-outlined text-[22px] mb-1" aria-hidden>
                  zoom_in
                </span>
                <span className="font-work text-[8px] uppercase tracking-wider hidden sm:inline">
                  Ver nota
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Instagram Follow CTA Button */}
        <div className="w-full flex justify-center">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 py-2.5 px-6 bg-surface-container hover:bg-surface-container-high border border-primary/20 rounded-full font-work text-xs uppercase tracking-wider text-primary transition-all shadow-xs font-semibold active:scale-95"
          >
            <span className="text-secondary text-xs">✦</span>
            <span>Sumate a @{SITE.instagramHandle}</span>
            <span className="text-secondary text-xs">✦</span>
          </a>
        </div>
      </div>

      {selectedPhoto && <PhotoLightbox photo={selectedPhoto} onClose={() => setSelectedPhoto(null)} />}
    </section>
  );
};

const PhotoLightbox: React.FC<{ photo: Photo; onClose: () => void }> = ({ photo, onClose }) => {
  const panelRef = useDialog(onClose);
  return (
    <div className="fixed inset-0 z-50 bg-primary/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn" onClick={onClose}>
      <div
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={photo.alt}
        className="bg-surface rounded-2xl max-w-md w-full overflow-hidden shadow-2xl border border-primary-container/20 animate-scaleIn outline-none"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-square w-full bg-surface-container">
          <img src={photo.src} alt={photo.alt} className="w-full h-full object-cover" />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-primary/80 text-surface flex items-center justify-center hover:bg-primary"
            aria-label="Cerrar"
          >
            ✕
          </button>
        </div>
        <div className="p-5">
          <p className="font-work text-xs font-bold uppercase tracking-wider text-primary mb-2">@{SITE.instagramHandle}</p>
          <p className="font-garamond text-base text-on-surface-variant leading-relaxed mb-4">{photo.caption}</p>
          <div className="flex justify-end pt-3 border-t border-outline-variant/40">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-work text-xs text-primary font-bold uppercase tracking-wider hover:underline"
            >
              Ver más en Instagram ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
