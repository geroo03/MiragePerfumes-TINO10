import React, { useState } from 'react';
import { INSTAGRAM_PHOTOS } from '../data/fragrances';

export const InstagramFeed: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<typeof INSTAGRAM_PHOTOS[0] | null>(null);

  return (
    <section className="w-full px-4 md:px-8 py-8 md:py-16 bg-[#f8f3e7] border-t border-[#c6c8bc]/30">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="flex items-center gap-1.5 text-[#566341] mb-1.5">
            <span className="material-symbols-outlined text-[18px]">photo_camera</span>
            <span className="font-work text-[10px] md:text-[11px] tracking-[0.2em] uppercase font-semibold">
              Comunidad Mirage
            </span>
          </div>

          <a
            href="https://instagram.com/its.miragee_"
            target="_blank"
            rel="noopener noreferrer"
            className="font-playfair text-2xl sm:text-3xl md:text-4xl text-[#28331a] uppercase tracking-wide hover:text-[#566341] transition-colors font-semibold"
          >
            Seguinos en @its.miragee_
          </a>

          <p className="font-garamond text-sm sm:text-base text-[#45483f] italic mt-1 max-w-md">
            Reseñas sensoriales sinceras, unboxings de lotes recién llegados y tips de fijación diarios para sacarle el máximo partido a cada gota.
          </p>
        </div>

        {/* 6-Image Grid (3 cols on mobile, 6 cols on desktop) */}
        <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 mb-8">
          {INSTAGRAM_PHOTOS.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className="group aspect-square rounded-xl overflow-hidden relative cursor-pointer bg-[#ede8dc] shadow-2xs hover:shadow-md transition-all duration-300"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-[#28331a]/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-[#fef9ed] p-2 text-center">
                <span className="material-symbols-outlined text-[22px] mb-1">
                  favorite
                </span>
                <span className="font-work text-[8px] uppercase tracking-wider hidden sm:inline">
                  Ver nota
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Instagram Follow CTA Button */}
        <div className="w-full flex justify-center">
          <a
            href="https://instagram.com/its.miragee_"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 py-2.5 px-6 bg-[#f3ede1] hover:bg-[#ede8dc] border border-[#28331a]/20 rounded-full font-work text-xs uppercase tracking-wider text-[#28331a] transition-all shadow-xs font-semibold active:scale-95"
          >
            <span className="text-[#566341] text-xs">✦</span>
            <span>Sumate a @its.miragee_</span>
            <span className="text-[#566341] text-xs">✦</span>
          </a>
        </div>
      </div>

      {/* Modal preview when clicking on an Instagram post */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-[#28331a]/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="bg-[#fef9ed] rounded-2xl max-w-md w-full overflow-hidden shadow-2xl border border-[#3e4a2f]/20 animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-square w-full bg-[#f3ede1]">
              <img
                src={selectedPhoto.src}
                alt={selectedPhoto.alt}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#28331a]/80 text-[#fef9ed] flex items-center justify-center hover:bg-[#28331a]"
                aria-label="Cerrar"
              >
                ✕
              </button>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-work text-xs font-bold uppercase tracking-wider text-[#28331a]">
                  @its.miragee_
                </span>
                <span className="text-[10px] text-[#566341]">✦ Lote Verificado</span>
              </div>
              <p className="font-garamond text-base text-[#45483f] leading-relaxed mb-4">
                {selectedPhoto.caption}
              </p>
              <div className="flex items-center justify-between pt-3 border-t border-[#c6c8bc]/40">
                <span className="font-work text-[11px] text-[#76786e]">
                  Comunidad Mirage · Buenos Aires
                </span>
                <a
                  href="https://instagram.com/its.miragee_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-work text-xs text-[#28331a] font-bold uppercase tracking-wider hover:underline"
                >
                  Abrir en Instagram ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
