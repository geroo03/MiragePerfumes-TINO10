import React from 'react';
import { SITE } from '../../config/site';
import { whatsappLink } from '../../lib/whatsapp';

interface ConsultationCardProps {
  onOpenQuiz: () => void;
}

export const ConsultationCard: React.FC<ConsultationCardProps> = ({ onOpenQuiz }) => {
  return (
    <section className="w-full px-4 md:px-8 py-6 md:py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {/* Left Card: Asesoramiento Olfativo WhatsApp & Quiz */}
        <div className="bg-surface-container rounded-2xl p-6 sm:p-8 lg:p-10 border-2 border-primary/15 flex flex-col justify-center gap-4 shadow-xs">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-secondary-container text-primary flex items-center justify-center shrink-0 shadow-xs">
                <span className="material-symbols-outlined text-[26px]">chat</span>
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-secondary">
                  <span className="text-[10px]">✦</span>
                  <span className="font-work text-[10px] md:text-[11px] tracking-[0.16em] uppercase font-semibold">
                    Asesoramiento Olfativo
                  </span>
                  <span className="text-[10px]">✦</span>
                </div>
                <h3 className="font-playfair text-2xl sm:text-3xl text-primary uppercase font-semibold leading-tight">
                  ¿No sabés cuál elegir?
                </h3>
              </div>
            </div>

            <p className="font-garamond text-base sm:text-lg text-on-surface-variant leading-relaxed mb-6">
              El universo de los perfumes árabes y de diseñador puede ser abrumador con tantas notas de oud, ámbar y especias. Contanos qué fragancias usás hoy, para qué ocasión lo buscás o qué clima preferís y te orientamos mano a mano con recomendaciones precisas según tu perfil olfativo.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <a
              href={whatsappLink('Hola Mirage, quisiera asesoramiento olfativo personalizado.')}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 px-5 bg-primary hover:bg-primary-container text-surface rounded-lg font-work text-xs uppercase tracking-[0.1em] font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm active:scale-98"
            >
              <span className="material-symbols-outlined text-[20px]">chat</span>
              <span>Te asesoramos por WhatsApp</span>
            </a>

            <button
              onClick={onOpenQuiz}
              type="button"
              className="py-3 px-5 border border-primary hover:bg-primary hover:text-surface text-primary rounded-lg font-work text-xs uppercase tracking-[0.1em] font-semibold flex items-center justify-center gap-1.5 transition-colors active:scale-98 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">psychology_alt</span>
              <span>Hacer Test Olfativo</span>
            </button>
          </div>
        </div>

        {/* Right Card: Compromisos Mirage */}
        <div className="bg-surface-container-low rounded-2xl p-6 sm:p-8 lg:p-10 border border-primary/15 flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex items-center gap-2 mb-2 text-secondary">
              <span className="text-[10px]">✦</span>
              <span className="font-work text-[10px] md:text-[11px] tracking-[0.16em] uppercase font-semibold">
                Garantía del Atelier
              </span>
              <span className="text-[10px]">✦</span>
            </div>

            <h3 className="font-playfair text-2xl sm:text-3xl text-primary uppercase font-semibold mb-6">
              Nuestros Compromisos
            </h3>

            <div className="space-y-4">
              {/* Feature 1 */}
              <div className="flex items-start gap-3.5 p-3 rounded-xl bg-surface-container/80 border border-outline-variant/30">
                <div className="w-10 h-10 rounded-full bg-secondary-container text-primary flex items-center justify-center shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[20px]">verified</span>
                </div>
                <div>
                  <h4 className="font-playfair text-base sm:text-lg font-bold text-primary">
                    100% Originales Verificables
                  </h4>
                  <p className="font-garamond text-sm text-on-surface-variant leading-snug">
                    Pedinos el batch code de tu frasco y verificalo vos mismo en CheckFresh. Jamás comercializamos imitaciones ni frascos adulterados.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex items-start gap-3.5 p-3 rounded-xl bg-surface-container/80 border border-outline-variant/30">
                <div className="w-10 h-10 rounded-full bg-secondary-container text-primary flex items-center justify-center shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[20px]">local_shipping</span>
                </div>
                <div>
                  <h4 className="font-playfair text-base sm:text-lg font-bold text-primary">
                    Envíos a Todo el País
                  </h4>
                  <p className="font-garamond text-sm text-on-surface-variant leading-snug">
                    Despacho seguro vía Andreani express y Correo Argentino. Cada decant viaja asegurado con burbuja multicapa.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex items-start gap-3.5 p-3 rounded-xl bg-surface-container/80 border border-outline-variant/30">
                <div className="w-10 h-10 rounded-full bg-secondary-container text-primary flex items-center justify-center shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[20px]">payments</span>
                </div>
                <div>
                  <h4 className="font-playfair text-base sm:text-lg font-bold text-primary">
                    Pagás como te quede cómodo
                  </h4>
                  <p className="font-garamond text-sm text-on-surface-variant leading-snug">
                    Aboná en <strong>efectivo</strong> al retirar en {SITE.city.split(',')[0]} o por <strong>transferencia</strong>, también para envíos a todo el país.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-outline-variant/40 flex items-center justify-between text-outline">
            <span className="font-work text-[10px] uppercase tracking-widest">
              Atelier Mirage · {SITE.city.split(',')[0]}
            </span>
            <span className="font-serif text-xs text-secondary">✦ ✦ ✦</span>
          </div>
        </div>
      </div>
    </section>
  );
};
