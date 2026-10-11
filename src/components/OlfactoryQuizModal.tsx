import React, { useState } from 'react';
import { FRAGRANCES } from '../data/fragrances';
import { Fragrance } from '../types';

interface OlfactoryQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectFragrance: (fragrance: Fragrance) => void;
}

export const OlfactoryQuizModal: React.FC<OlfactoryQuizModalProps> = ({
  isOpen,
  onClose,
  onSelectFragrance,
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState(1);
  const [occasion, setOccasion] = useState<string>('');
  const [scentFamily, setScentFamily] = useState<string>('');
  const [intensity, setIntensity] = useState<string>('');
  const [result, setResult] = useState<Fragrance | null>(null);

  const handleFinish = (chosenIntensity: string) => {
    setIntensity(chosenIntensity);
    // Determine best matching fragrance
    let matched: Fragrance = FRAGRANCES[0]; // default Khamrah Qahwa

    if (scentFamily === 'vainilla' || occasion === 'noche') {
      matched = chosenIntensity === 'intensa' ? FRAGRANCES[0] : FRAGRANCES[1]; // Khamrah or 9 PM
    } else if (scentFamily === 'citrico' || occasion === 'oficina') {
      matched = FRAGRANCES[2]; // Club de Nuit Intense
    } else if (scentFamily === 'miel' || occasion === 'seduccion') {
      matched = FRAGRANCES[3]; // Le Male Elixir
    } else if (scentFamily === 'ambar' || occasion === 'firma') {
      matched = FRAGRANCES[4]; // Aurélia Essence d'Ambre
    } else if (scentFamily === 'oud') {
      matched = FRAGRANCES[5]; // Bade'e Al Oud
    } else if (scentFamily === 'frutal') {
      matched = FRAGRANCES[6]; // Amber Oud Gold
    }

    setResult(matched);
    setStep(4);
  };

  const handleReset = () => {
    setStep(1);
    setOccasion('');
    setScentFamily('');
    setIntensity('');
    setResult(null);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#28331a]/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-[#fef9ed] rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#3e4a2f]/20 animate-scaleIn text-[#1d1c14] relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#f3ede1] hover:bg-[#ede8dc] text-[#28331a] flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Cerrar test"
        >
          ✕
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#d6e5bb]/50 rounded-full text-[#28331a] font-work text-[10px] uppercase tracking-widest font-bold mb-2">
            <span>✦</span>
            <span>Asesor Olfativo del Atelier</span>
            <span>✦</span>
          </div>
          <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-[#28331a]">
            Descubrí tu Firma Olfativa
          </h2>
          <p className="font-garamond text-sm text-[#45483f] italic mt-1">
            Respondé 3 simples preguntas para dar con la joya aromática perfecta para tu piel.
          </p>
        </div>

        {/* Step Indicator */}
        {step < 4 && (
          <div className="flex items-center justify-center gap-2 mb-6">
            <span
              className={`w-8 h-1.5 rounded-full ${step >= 1 ? 'bg-[#28331a]' : 'bg-[#c6c8bc]'}`}
            />
            <span
              className={`w-8 h-1.5 rounded-full ${step >= 2 ? 'bg-[#28331a]' : 'bg-[#c6c8bc]'}`}
            />
            <span
              className={`w-8 h-1.5 rounded-full ${step >= 3 ? 'bg-[#28331a]' : 'bg-[#c6c8bc]'}`}
            />
          </div>
        )}

        {/* Step 1: Occasion */}
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="font-playfair text-lg font-bold text-[#28331a] text-center">
              1. ¿Para qué ocasión principal buscas tu fragancia?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[
                { id: 'noche', label: 'Citas nocturnas & Romance', desc: 'Seductor, dulce, acogedor' },
                { id: 'oficina', label: 'Uso diario & Oficina', desc: 'Fresco, limpio, profesional' },
                { id: 'seduccion', label: 'Fiestas & Eventos', desc: 'Gran proyección y cumplidos' },
                { id: 'firma', label: 'Firma personal única', desc: 'Autor, nicho, diferenciador' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => {
                    setOccasion(opt.id);
                    setStep(2);
                  }}
                  className="p-3.5 rounded-xl border border-[#c6c8bc] bg-[#f8f3e7] hover:bg-[#d6e5bb]/40 hover:border-[#28331a] text-left transition-all cursor-pointer group"
                >
                  <span className="font-work text-xs font-bold text-[#28331a] block group-hover:text-[#28331a]">
                    {opt.label}
                  </span>
                  <span className="font-garamond text-xs text-[#566341] mt-0.5 block">
                    {opt.desc}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Scent Family */}
        {step === 2 && (
          <div className="space-y-4">
            <h3 className="font-playfair text-lg font-bold text-[#28331a] text-center">
              2. ¿Qué acordes aromáticos te llaman más la atención?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[
                { id: 'vainilla', label: 'Café, Vainilla & Canela', desc: 'Gourmand cálido y adictivo' },
                { id: 'citrico', label: 'Cítricos & Maderas ahumadas', desc: 'Limonado, viril y versátil' },
                { id: 'miel', label: 'Miel dorada, Tabaco & Haba Tonka', desc: 'Opulento y muy elegante' },
                { id: 'ambar', label: 'Ámbar blanco & Higo mediterráneo', desc: 'Artesanal, botánico y sutil' },
                { id: 'oud', label: 'Oud misterioso & Azafrán', desc: 'Fuerza oriental exótica' },
                { id: 'frutal', label: 'Melón dulce, Piña & Ámbar', desc: 'Explosión frutal chispeante' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => {
                    setScentFamily(opt.id);
                    setStep(3);
                  }}
                  className="p-3.5 rounded-xl border border-[#c6c8bc] bg-[#f8f3e7] hover:bg-[#d6e5bb]/40 hover:border-[#28331a] text-left transition-all cursor-pointer group"
                >
                  <span className="font-work text-xs font-bold text-[#28331a] block group-hover:text-[#28331a]">
                    {opt.label}
                  </span>
                  <span className="font-garamond text-xs text-[#566341] mt-0.5 block">
                    {opt.desc}
                  </span>
                </button>
              ))}
            </div>
            <button
              onClick={() => setStep(1)}
              className="text-xs text-[#566341] font-work uppercase tracking-wider block mx-auto pt-2"
            >
              ← Volver al paso anterior
            </button>
          </div>
        )}

        {/* Step 3: Intensity */}
        {step === 3 && (
          <div className="space-y-4">
            <h3 className="font-playfair text-lg font-bold text-[#28331a] text-center">
              3. ¿Qué presencia o estela preferís en tu piel?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleFinish('intensa')}
                className="p-4 rounded-xl border border-[#c6c8bc] bg-[#f8f3e7] hover:bg-[#d6e5bb]/40 hover:border-[#28331a] text-left transition-all cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-[#28331a] text-[#fef9ed] flex items-center justify-center mb-2">
                  <span className="material-symbols-outlined text-[18px]">bolt</span>
                </div>
                <span className="font-work text-xs font-bold text-[#28331a] block">
                  Imponente / Modo Bestia
                </span>
                <span className="font-garamond text-xs text-[#566341] mt-1 block">
                  Que se haga notar a varios metros y dure todo el día y noche.
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleFinish('moderada')}
                className="p-4 rounded-xl border border-[#c6c8bc] bg-[#f8f3e7] hover:bg-[#d6e5bb]/40 hover:border-[#28331a] text-left transition-all cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-[#566341] text-[#fef9ed] flex items-center justify-center mb-2">
                  <span className="material-symbols-outlined text-[18px]">spa</span>
                </div>
                <span className="font-work text-xs font-bold text-[#28331a] block">
                  Elegante &amp; Magnética
                </span>
                <span className="font-garamond text-xs text-[#566341] mt-1 block">
                  Crea una burbuja personal íntima y sofisticada que invita a acercarse.
                </span>
              </button>
            </div>
            <button
              onClick={() => setStep(2)}
              className="text-xs text-[#566341] font-work uppercase tracking-wider block mx-auto pt-2"
            >
              ← Volver al paso anterior
            </button>
          </div>
        )}

        {/* Step 4: Recommendation Result */}
        {step === 4 && result && (
          <div className="space-y-5 animate-fadeIn">
            <div className="p-4 bg-[#f3ede1] rounded-2xl border border-[#3e4a2f]/20 flex gap-4 items-center">
              <img
                src={result.image}
                alt={result.name}
                className="w-20 h-24 object-cover rounded-xl bg-[#ede8dc] shrink-0 border border-[#c6c8bc]/40"
              />
              <div className="flex-1">
                <span className="font-work text-[9px] uppercase tracking-wider text-[#566341] font-semibold">
                  Tu afinidad olfativa recomendada
                </span>
                <h4 className="font-playfair text-xl font-bold text-[#28331a]">
                  {result.name}
                </h4>
                <p className="font-work text-xs text-[#566341] uppercase tracking-wider">
                  {result.house}
                </p>
                <p className="font-garamond text-xs text-[#45483f] italic mt-1 line-clamp-2">
                  {result.shortNotes}
                </p>
              </div>
            </div>

            <p className="font-garamond text-sm text-[#45483f] leading-relaxed text-center">
              {result.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <button
                onClick={() => {
                  onSelectFragrance(result);
                  onClose();
                }}
                className="flex-1 py-3 px-4 bg-[#28331a] hover:bg-[#3e4a2f] text-[#fef9ed] rounded-xl font-work text-xs uppercase tracking-wider font-bold transition-colors cursor-pointer text-center"
              >
                Ver ficha y probar decant ➔
              </button>
              <button
                onClick={handleReset}
                className="py-3 px-4 border border-[#c6c8bc] hover:bg-[#ede8dc] text-[#28331a] rounded-xl font-work text-xs uppercase tracking-wider font-semibold cursor-pointer"
              >
                Reiniciar test
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
