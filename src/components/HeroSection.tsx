import React from 'react';

interface HeroSectionProps {
  onExploreCatalog: () => void;
  onExploreDecants: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreCatalog,
  onExploreDecants,
}) => {
  return (
    <section className="relative w-full bg-[#f8f3e7] border-b border-[#c6c8bc]/30 overflow-hidden">
      {/* Decorative subtle background halo on large screens */}
      <div className="hidden lg:flex absolute -right-24 -top-24 w-96 h-96 rounded-full border border-[#28331a]/5 pointer-events-none items-center justify-center">
        <div className="w-80 h-80 rounded-full border border-dashed border-[#28331a]/10" />
      </div>

      <div className="max-w-7xl mx-auto px-5 md:px-8 py-8 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column / Mobile Center Header */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Apothecary Established Badge */}
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-[#f3ede1] border border-[#c6c8bc]/50 rounded-full mb-3 shadow-xs">
              <span className="text-[#566341] text-[10px]">✦</span>
              <span className="font-work text-[10px] md:text-[11px] tracking-[0.16em] uppercase text-[#566341] font-semibold">
                EST. 2024 · PERFUMERÍA DE AUTOR &amp; NICHO
              </span>
              <span className="text-[#566341] text-[10px]">✦</span>
            </div>

            {/* Editorial Brand Ornament on Mobile */}
            <div className="flex lg:hidden items-center justify-center gap-2 mb-2 text-[#566341] opacity-75">
              <span className="w-6 h-[1px] bg-[#566341]" />
              <span className="text-[11px]">✦</span>
              <span className="w-6 h-[1px] bg-[#566341]" />
            </div>

            {/* Main Headline */}
            <h1 className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-[54px] lg:leading-[62px] text-[#28331a] uppercase tracking-wide font-semibold mb-3">
              Encontrá tu firma <br className="hidden sm:inline" />
              <span className="italic font-garamond font-normal text-[#566341] lowercase">
                olfativa
              </span>{' '}
              única
            </h1>

            <p className="font-garamond text-base sm:text-lg md:text-xl text-[#45483f] max-w-xl mb-6 leading-relaxed">
              Originales importados, joyas árabes de nicho y decants artesanales macerados con extrema delicadeza. Enviamos a todo el territorio argentino con embalaje seguro grado farmacéutico.
            </p>

            {/* Mobile Oval showcase shown in center on small screens */}
            <div className="flex lg:hidden flex-col items-center my-2 mb-6">
              <div className="relative w-52 h-68 p-1.5 bg-[#ede8dc] rounded-[50%/60%] shadow-md flex items-center justify-center">
                <div className="w-full h-full rounded-[50%/60%] overflow-hidden relative bg-[#f8f3e7] shadow-inner">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFwo6yOtlmyFN84m6XOfqq6IV9aq4N_l24E40f-tev4HQk58dkUEeMmD6ak4pvYDcqO7gWbZ9MnVzhFsAZFCGxTmEUH77WjbsTk4zZBasYB-WHiA0SyTb7xpIFVwPQ8sNZvl7TMOv_A9BXL2YQvlV65lLLvTycSVeR6OXoLkRz7rQeYp-FgpCHm53v7tTVH-g_Cs4R_fnkA2uuh5JhAR8EEljR-j5U9JV9Xtqsg4SXMHmk67CRtyIJ"
                    alt="Frasco de perfume nicho artesanal Aurélia Essence d'Ambre"
                    className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#28331a]/30 via-transparent to-[#fef9ed]/20 pointer-events-none" />
                </div>
                {/* Filigree accent marks */}
                <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 text-[#566341] text-[12px] bg-[#f8f3e7] px-1 font-serif">
                  ✦
                </span>
                <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 text-[#566341] text-[12px] bg-[#f8f3e7] px-1 font-serif">
                  ✦
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 w-full sm:w-auto mb-6">
              <button
                onClick={onExploreCatalog}
                className="w-full sm:w-auto px-6 py-3 bg-[#28331a] hover:bg-[#3e4a2f] text-[#fef9ed] rounded-lg font-work text-xs uppercase tracking-[0.12em] font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm active:scale-98 group"
              >
                <span>Ver Catálogo Completo</span>
                <span className="material-symbols-outlined text-[18px] group-hover:translate-x-0.5 transition-transform">
                  arrow_forward
                </span>
              </button>

              <button
                onClick={onExploreDecants}
                className="w-full sm:w-auto px-6 py-3 border border-[#28331a] text-[#28331a] hover:bg-[#28331a] hover:text-[#fef9ed] rounded-lg font-work text-xs uppercase tracking-[0.12em] font-semibold flex items-center justify-center gap-2 transition-colors active:scale-98"
              >
                <span>Conocer el Arte del Decant</span>
              </button>
            </div>

            {/* Apothecary Seal Perks Strip */}
            <div className="w-full pt-4 border-t border-[#c6c8bc]/50 grid grid-cols-1 sm:grid-cols-3 gap-2 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-1.5 text-[#45483f]">
                <span className="text-[#566341] text-[11px]">✦</span>
                <span className="font-work text-[10px] sm:text-[11px] tracking-wider uppercase font-medium">
                  Frascos 100% Sellados
                </span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-1.5 text-[#45483f]">
                <span className="text-[#566341] text-[11px]">✦</span>
                <span className="font-work text-[10px] sm:text-[11px] tracking-wider uppercase font-medium">
                  Vidrio de Alta Densidad
                </span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-1.5 text-[#45483f]">
                <span className="text-[#566341] text-[11px]">✦</span>
                <span className="font-work text-[10px] sm:text-[11px] tracking-wider uppercase font-medium">
                  Guía Olfativa Personal
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Desktop Oval Cameo Flacon Presentation */}
          <div className="hidden lg:flex lg:col-span-5 justify-center items-center relative py-6">
            {/* Botanical compass background halo */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-80 h-[430px] rounded-[180px] border border-[#c6c8bc]/50 rotate-6" />
              <div className="w-80 h-[430px] rounded-[180px] border border-[#566341]/20 -rotate-3" />
            </div>

            {/* The Oval Cameo Container with compass marks */}
            <div className="relative w-76 h-[430px] rounded-[170px] p-2.5 bg-[#f3ede1] shadow-md border-2 border-[#28331a]/20 flex items-center justify-center">
              {/* Compass Stars */}
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[#28331a] font-serif text-sm bg-[#f3ede1] px-1 z-20">
                ✦
              </span>
              <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 text-[#28331a] font-serif text-sm bg-[#f3ede1] px-1 z-20">
                ✦
              </span>
              <span className="absolute top-1/2 -left-3 -translate-y-1/2 text-[#28331a] font-serif text-sm bg-[#f3ede1] py-1 z-20">
                ✦
              </span>
              <span className="absolute top-1/2 -right-3 -translate-y-1/2 text-[#28331a] font-serif text-sm bg-[#f3ede1] py-1 z-20">
                ✦
              </span>

              <div className="w-full h-full rounded-[160px] overflow-hidden relative group">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDY_so0qLHEoE4SlFzDTRlMgGbcrT3xkES22SXuwXpKgb0MVJn3lUaSktI3CXimyC6ZdnGWybfqM94YB5WTfgrgRo56P6ms6uy2I_PtnY7ZKQY-rhvOL5IBT2WQYVnGgiPFnlAdlb1tjdg7LTP9out6olnRLMdvwQEAuPy-42NjwacrOQA7KFh0kVFMATsD-rjyytm0kqkttAqJ0RaVuaSuysP_7pGzE2JVYktuf-kw_dRlCHuinCST"
                  alt="Editorial still life photograph of an artisanal amber perfume glass bottle resting on natural wrinkled warm cream linen"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#28331a]/70 via-transparent to-transparent flex flex-col justify-end p-6 text-center text-[#f8f3e7]">
                  <span className="font-work text-[10px] uppercase tracking-[0.2em] text-[#ede8dc]">
                    Extrait de Parfum
                  </span>
                  <p className="font-playfair text-lg italic">Maceración Lenta</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
