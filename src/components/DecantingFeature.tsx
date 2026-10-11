import React from 'react';

interface DecantingFeatureProps {
  onExploreDecants: () => void;
}

export const DecantingFeature: React.FC<DecantingFeatureProps> = ({
  onExploreDecants,
}) => {
  return (
    <section className="w-full px-4 md:px-8 my-8 md:my-16" id="arte-decant">
      <div className="max-w-7xl mx-auto bg-[#2a3320] text-[#f6f0e4] p-6 sm:p-10 lg:p-14 rounded-2xl relative overflow-hidden shadow-xl border border-[#3e4a2f]">
        {/* Background botanical glow / watermark */}
        <div className="absolute -right-12 -top-12 w-64 h-64 rounded-full bg-[#404935]/40 blur-3xl pointer-events-none" />
        <div className="absolute -left-12 -bottom-12 w-64 h-64 rounded-full bg-[#3e4a2f]/30 blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
          {/* Left Editorial Column */}
          <div className="lg:col-span-5 flex flex-col items-start pr-0 lg:pr-4">
            <div className="flex items-center gap-1.5 mb-2 text-[#dce6ca]">
              <span className="text-xs">✦</span>
              <span className="font-work text-[10px] md:text-[11px] tracking-[0.16em] uppercase font-semibold">
                El Arte del Decanting
              </span>
              <span className="text-xs">✦</span>
            </div>

            <h2 className="font-playfair text-2xl sm:text-3xl lg:text-4xl uppercase text-[#fef9ed] tracking-tight font-semibold mb-3">
              Probá antes de comprar
            </h2>

            <p className="font-garamond text-base sm:text-lg text-[#c0caaf] leading-relaxed mb-6">
              Muestras en frascos atomizadores de vidrio reforzado de alta calidad. Sentí cómo abre, se asienta y evoluciona la fragancia en tu propia piel antes de invertir en la botella entera. Cero riesgo, pura experimentación sensorial.
            </p>

            <button
              onClick={onExploreDecants}
              className="w-full sm:w-auto px-6 py-3.5 bg-[#ffffff] hover:bg-[#fef9ed] text-[#28331a] rounded-lg font-work text-xs uppercase tracking-[0.12em] font-bold flex items-center justify-center gap-2 transition-all shadow-md active:scale-98 group cursor-pointer"
            >
              <span>Explorar Todos los Decants</span>
              <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </button>
          </div>

          {/* Right Column: Comparison Cards (5ml vs 10ml) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* 5ml Card */}
            <div className="bg-[#404935]/60 border border-[#76786e]/40 hover:border-[#dce6ca]/60 transition-colors rounded-xl p-5 sm:p-6 relative flex flex-col justify-between backdrop-blur-sm">
              <div className="absolute -top-2.5 right-4 px-2 py-0.5 bg-[#3e4a2f] border border-[#566341] text-[#fef9ed] font-work text-[9px] uppercase tracking-widest rounded font-semibold">
                El Descubrimiento
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-playfair text-lg sm:text-xl font-semibold text-[#fef9ed]">
                    Decant 5 ml
                  </span>
                  <div className="w-8 h-8 rounded-full bg-[#3e4a2f] flex items-center justify-center text-[#dce6ca]">
                    <span className="material-symbols-outlined text-[20px]">science</span>
                  </div>
                </div>

                <p className="font-work text-xs uppercase tracking-wider text-[#dce6ca] mb-3 font-medium">
                  ~70 atomizaciones
                </p>

                <ul className="space-y-1.5 font-garamond text-sm text-[#ede8dc] mb-4">
                  <li className="flex items-center gap-2">
                    <span className="text-[#dce6ca] text-xs">✦</span>
                    <span>Frasco de vidrio grueso con atomizador fino</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#dce6ca] text-xs">✦</span>
                    <span>Ideal para bolsillo, cartera o salidas</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#dce6ca] text-xs">✦</span>
                    <span>Rinde entre 2 y 3 semanas de uso diario</span>
                  </li>
                </ul>
              </div>

              <div className="pt-3 border-t border-[#76786e]/30 flex items-center justify-between">
                <span className="font-work text-[10px] uppercase tracking-wider text-[#c6c8bc]">
                  Desde
                </span>
                <span className="font-playfair text-lg text-[#dce6ca] font-bold">
                  $ 7.500 <span className="font-work font-normal text-xs text-[#ede8dc]">ARS</span>
                </span>
              </div>
            </div>

            {/* 10ml Card */}
            <div className="bg-[#404935]/60 border border-[#dce6ca]/50 hover:border-[#dce6ca] transition-colors rounded-xl p-5 sm:p-6 relative flex flex-col justify-between backdrop-blur-sm shadow-md">
              <div className="absolute -top-2.5 right-4 px-2 py-0.5 bg-[#d6e5bb] text-[#28331a] font-work text-[9px] uppercase tracking-widest rounded font-bold">
                Formato Favorito
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-playfair text-lg sm:text-xl font-semibold text-[#fef9ed]">
                    Decant 10 ml
                  </span>
                  <div className="w-8 h-8 rounded-full bg-[#3e4a2f] flex items-center justify-center text-[#dce6ca]">
                    <span className="material-symbols-outlined text-[20px]">science</span>
                  </div>
                </div>

                <p className="font-work text-xs uppercase tracking-wider text-[#dce6ca] mb-3 font-medium">
                  ~140 atomizaciones
                </p>

                <ul className="space-y-1.5 font-garamond text-sm text-[#ede8dc] mb-4">
                  <li className="flex items-center gap-2">
                    <span className="text-[#dce6ca] text-xs">✦</span>
                    <span>Atomizador a rosca hermético antiderrame</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#dce6ca] text-xs">✦</span>
                    <span>Perfecto para viajes o rotación de estación</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#dce6ca] text-xs">✦</span>
                    <span>Rinde más de 1 mes completo de aplicaciones</span>
                  </li>
                </ul>
              </div>

              <div className="pt-3 border-t border-[#76786e]/30 flex items-center justify-between">
                <span className="font-work text-[10px] uppercase tracking-wider text-[#c6c8bc]">
                  Desde
                </span>
                <span className="font-playfair text-lg text-[#dce6ca] font-bold">
                  $ 13.900 <span className="font-work font-normal text-xs text-[#ede8dc]">ARS</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
