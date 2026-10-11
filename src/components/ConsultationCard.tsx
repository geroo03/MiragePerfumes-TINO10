import React from 'react';

interface ConsultationCardProps {
  onOpenQuiz: () => void;
}

export const ConsultationCard: React.FC<ConsultationCardProps> = ({ onOpenQuiz }) => {
  return (
    <section className="w-full px-4 md:px-8 py-6 md:py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {/* Left Card: Asesoramiento Olfativo WhatsApp & Quiz */}
        <div className="bg-[#f3ede1] rounded-2xl p-6 sm:p-8 lg:p-10 border-2 border-[#28331a]/15 flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-[#d6e5bb] text-[#28331a] flex items-center justify-center shrink-0 shadow-xs">
                <span className="material-symbols-outlined text-[26px]">chat</span>
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-[#566341]">
                  <span className="text-[10px]">✦</span>
                  <span className="font-work text-[10px] md:text-[11px] tracking-[0.16em] uppercase font-semibold">
                    Asesoramiento Olfativo
                  </span>
                  <span className="text-[10px]">✦</span>
                </div>
                <h3 className="font-playfair text-2xl sm:text-3xl text-[#28331a] uppercase font-semibold leading-tight">
                  ¿No sabés cuál elegir?
                </h3>
              </div>
            </div>

            <p className="font-garamond text-base sm:text-lg text-[#45483f] leading-relaxed mb-6">
              El universo de los perfumes árabes y de autor puede ser abrumador con tantas notas de oud, ámbar y especias. Contanos qué fragancias usás hoy, para qué ocasión lo buscás o qué clima preferís y te orientamos mano a mano con recomendaciones precisas según tu perfil olfativo.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <a
              href="https://wa.me/?text=Hola%20Mirage%2C%20quisiera%20asesoramiento%20olfativo%20personalizado"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 px-5 bg-[#28331a] hover:bg-[#3e4a2f] text-[#fef9ed] rounded-lg font-work text-xs uppercase tracking-[0.1em] font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm active:scale-98"
            >
              <span className="material-symbols-outlined text-[20px]">chat</span>
              <span>Te asesoramos por WhatsApp</span>
            </a>

            <button
              onClick={onOpenQuiz}
              type="button"
              className="py-3 px-5 border border-[#28331a] hover:bg-[#28331a] hover:text-[#fef9ed] text-[#28331a] rounded-lg font-work text-xs uppercase tracking-[0.1em] font-semibold flex items-center justify-center gap-1.5 transition-colors active:scale-98 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">psychology_alt</span>
              <span>Hacer Test Olfativo</span>
            </button>
          </div>
        </div>

        {/* Right Card: Compromisos Mirage */}
        <div className="bg-[#f8f3e7] rounded-2xl p-6 sm:p-8 lg:p-10 border border-[#28331a]/15 flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex items-center gap-2 mb-2 text-[#566341]">
              <span className="text-[10px]">✦</span>
              <span className="font-work text-[10px] md:text-[11px] tracking-[0.16em] uppercase font-semibold">
                Garantía del Atelier
              </span>
              <span className="text-[10px]">✦</span>
            </div>

            <h3 className="font-playfair text-2xl sm:text-3xl text-[#28331a] uppercase font-semibold mb-6">
              Nuestros Compromisos
            </h3>

            <div className="space-y-4">
              {/* Feature 1 */}
              <div className="flex items-start gap-3.5 p-3 rounded-xl bg-[#f3ede1]/80 border border-[#c6c8bc]/30">
                <div className="w-10 h-10 rounded-full bg-[#d6e5bb] text-[#28331a] flex items-center justify-center shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[20px]">verified</span>
                </div>
                <div>
                  <h4 className="font-playfair text-base sm:text-lg font-bold text-[#28331a]">
                    100% Originales Verificables
                  </h4>
                  <p className="font-garamond text-sm text-[#45483f] leading-snug">
                    Lotes frescos con números de batch verificables. Jamás comercializamos imitaciones ni frascos adulterados.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex items-start gap-3.5 p-3 rounded-xl bg-[#f3ede1]/80 border border-[#c6c8bc]/30">
                <div className="w-10 h-10 rounded-full bg-[#d6e5bb] text-[#28331a] flex items-center justify-center shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[20px]">local_shipping</span>
                </div>
                <div>
                  <h4 className="font-playfair text-base sm:text-lg font-bold text-[#28331a]">
                    Envíos a Todo el País
                  </h4>
                  <p className="font-garamond text-sm text-[#45483f] leading-snug">
                    Despacho seguro vía Andreani express y Correo Argentino. Cada decant viaja asegurado con burbuja multicapa.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex items-start gap-3.5 p-3 rounded-xl bg-[#f3ede1]/80 border border-[#c6c8bc]/30">
                <div className="w-10 h-10 rounded-full bg-[#d6e5bb] text-[#28331a] flex items-center justify-center shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[20px]">credit_card</span>
                </div>
                <div>
                  <h4 className="font-playfair text-base sm:text-lg font-bold text-[#28331a]">
                    Financiación &amp; Descuento
                  </h4>
                  <p className="font-garamond text-sm text-[#45483f] leading-snug">
                    Aboná en cuotas fijas con Mercado Pago o disfrutá de un <strong>15% OFF directo</strong> abonando vía transferencia bancaria.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-[#c6c8bc]/40 flex items-center justify-between text-[#76786e]">
            <span className="font-work text-[10px] uppercase tracking-widest">
              Atelier Mirage · Buenos Aires
            </span>
            <span className="font-serif text-xs text-[#566341]">✦ ✦ ✦</span>
          </div>
        </div>
      </div>
    </section>
  );
};
