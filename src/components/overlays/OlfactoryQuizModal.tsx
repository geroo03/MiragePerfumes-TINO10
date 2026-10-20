import React, { useState } from 'react';
import { FRAGRANCES } from '../../data/fragrances';
import { useDialog } from '../../hooks/useDialog';
import type { Fragrance } from '../../types';

const byId = (id: string) => FRAGRANCES.find((f) => f.id === id) ?? FRAGRANCES[0];

interface OlfactoryQuizModalProps {
  onClose: () => void;
  onSelectFragrance: (fragrance: Fragrance) => void;
}

export const OlfactoryQuizModal: React.FC<OlfactoryQuizModalProps> = ({
  onClose,
  onSelectFragrance,
}) => {
  const [step, setStep] = useState(1);
  const [occasion, setOccasion] = useState<string>('');
  const [scentFamily, setScentFamily] = useState<string>('');
  const [intensity, setIntensity] = useState<string>('');
  const [result, setResult] = useState<Fragrance | null>(null);

  const panelRef = useDialog(onClose);

  const handleFinish = (chosenIntensity: string) => {
    setIntensity(chosenIntensity);
    // Determine best matching fragrance
    let matched = byId('lattafa-khamrah-qahwa');

    if (scentFamily === 'vainilla' || occasion === 'noche') {
      matched = byId(chosenIntensity === 'intensa' ? 'lattafa-khamrah-qahwa' : 'afnan-9pm-pour-homme');
    } else if (scentFamily === 'citrico' || occasion === 'oficina') {
      matched = byId('armaf-club-de-nuit-intense');
    } else if (scentFamily === 'miel' || occasion === 'seduccion') {
      matched = byId('jean-paul-gaultier-le-male-elixir');
    } else if (scentFamily === 'oud' || occasion === 'firma') {
      matched = byId('lattafa-oud-for-glory');
    } else if (scentFamily === 'frutal') {
      matched = byId('al-haramain-amber-oud-gold');
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
      className="fixed inset-0 z-50 bg-primary/60 backdrop-blur-sm flex items-start sm:items-center justify-center p-4 overflow-y-auto animate-fadeIn"
      onClick={onClose}
    >
      <div
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="quiz-title"
        className="bg-surface rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-primary-container/20 animate-scaleIn text-on-surface relative outline-none my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-surface-container hover:bg-surface-container-high text-primary flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Cerrar test"
        >
          ✕
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-secondary-container/50 rounded-full text-primary font-work text-[10px] uppercase tracking-widest font-bold mb-2">
            <span>✦</span>
            <span>Asesor Olfativo del Atelier</span>
            <span>✦</span>
          </div>
          <h2 id="quiz-title" className="font-playfair text-2xl sm:text-3xl font-bold text-primary">
            Descubrí tu Firma Olfativa
          </h2>
          <p className="font-garamond text-sm text-on-surface-variant italic mt-1">
            Respondé 3 simples preguntas para dar con la joya aromática perfecta para tu piel.
          </p>
        </div>

        {/* Step Indicator */}
        {step < 4 && (
          <div className="flex items-center justify-center gap-2 mb-6">
            <span
              className={`w-8 h-1.5 rounded-full ${step >= 1 ? 'bg-primary' : 'bg-outline-variant'}`}
            />
            <span
              className={`w-8 h-1.5 rounded-full ${step >= 2 ? 'bg-primary' : 'bg-outline-variant'}`}
            />
            <span
              className={`w-8 h-1.5 rounded-full ${step >= 3 ? 'bg-primary' : 'bg-outline-variant'}`}
            />
          </div>
        )}

        {/* Step 1: Occasion */}
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="font-playfair text-lg font-bold text-primary text-center">
              1. ¿Para qué ocasión buscás tu fragancia?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[
                { id: 'noche', label: 'Citas nocturnas & Romance', desc: 'Seductor, dulce, acogedor' },
                { id: 'oficina', label: 'Uso diario & Oficina', desc: 'Fresco, limpio, profesional' },
                { id: 'seduccion', label: 'Fiestas & Eventos', desc: 'Gran proyección y cumplidos' },
                { id: 'firma', label: 'Firma personal única', desc: 'Intensa, distinta, que te identifique' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => {
                    setOccasion(opt.id);
                    setStep(2);
                  }}
                  className="p-3.5 rounded-xl border border-outline-variant bg-surface-container-low hover:bg-secondary-container/40 hover:border-primary text-left transition-all cursor-pointer group"
                >
                  <span className="font-work text-xs font-bold text-primary block group-hover:text-primary">
                    {opt.label}
                  </span>
                  <span className="font-garamond text-xs text-secondary mt-0.5 block">
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
            <h3 className="font-playfair text-lg font-bold text-primary text-center">
              2. ¿Qué acordes aromáticos te llaman más la atención?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[
                { id: 'vainilla', label: 'Café, Vainilla & Canela', desc: 'Gourmand cálido y adictivo' },
                { id: 'citrico', label: 'Cítricos & Maderas ahumadas', desc: 'Limonado, viril y versátil' },
                { id: 'miel', label: 'Miel dorada, Tabaco & Haba Tonka', desc: 'Opulento y muy elegante' },
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
                  className="p-3.5 rounded-xl border border-outline-variant bg-surface-container-low hover:bg-secondary-container/40 hover:border-primary text-left transition-all cursor-pointer group"
                >
                  <span className="font-work text-xs font-bold text-primary block group-hover:text-primary">
                    {opt.label}
                  </span>
                  <span className="font-garamond text-xs text-secondary mt-0.5 block">
                    {opt.desc}
                  </span>
                </button>
              ))}
            </div>
            <button
              onClick={() => setStep(1)}
              className="text-xs text-secondary font-work uppercase tracking-wider block mx-auto pt-2"
            >
              ← Volver al paso anterior
            </button>
          </div>
        )}

        {/* Step 3: Intensity */}
        {step === 3 && (
          <div className="space-y-4">
            <h3 className="font-playfair text-lg font-bold text-primary text-center">
              3. ¿Qué presencia o estela preferís en tu piel?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleFinish('intensa')}
                className="p-4 rounded-xl border border-outline-variant bg-surface-container-low hover:bg-secondary-container/40 hover:border-primary text-left transition-all cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-primary text-surface flex items-center justify-center mb-2">
                  <span className="material-symbols-outlined text-[18px]">bolt</span>
                </div>
                <span className="font-work text-xs font-bold text-primary block">
                  Imponente / Modo Bestia
                </span>
                <span className="font-garamond text-xs text-secondary mt-1 block">
                  Que se haga notar a varios metros y dure todo el día y noche.
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleFinish('moderada')}
                className="p-4 rounded-xl border border-outline-variant bg-surface-container-low hover:bg-secondary-container/40 hover:border-primary text-left transition-all cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-secondary text-surface flex items-center justify-center mb-2">
                  <span className="material-symbols-outlined text-[18px]">spa</span>
                </div>
                <span className="font-work text-xs font-bold text-primary block">
                  Elegante &amp; Magnética
                </span>
                <span className="font-garamond text-xs text-secondary mt-1 block">
                  Crea una burbuja personal íntima y sofisticada que invita a acercarse.
                </span>
              </button>
            </div>
            <button
              onClick={() => setStep(2)}
              className="text-xs text-secondary font-work uppercase tracking-wider block mx-auto pt-2"
            >
              ← Volver al paso anterior
            </button>
          </div>
        )}

        {/* Step 4: Recommendation Result */}
        {step === 4 && result && (
          <div className="space-y-5 animate-fadeIn">
            <div className="p-4 bg-surface-container rounded-2xl border border-primary-container/20 flex gap-4 items-center">
              <img
                src={result.image}
                alt={result.name}
                className="w-20 h-24 object-cover rounded-xl bg-surface-container-high shrink-0 border border-outline-variant/40"
              />
              <div className="flex-1">
                <span className="font-work text-[9px] uppercase tracking-wider text-secondary font-semibold">
                  Tu afinidad olfativa recomendada
                </span>
                <h4 className="font-playfair text-xl font-bold text-primary">
                  {result.name}
                </h4>
                <p className="font-work text-xs text-secondary uppercase tracking-wider">
                  {result.house}
                </p>
                <p className="font-garamond text-xs text-on-surface-variant italic mt-1 line-clamp-2">
                  {result.shortNotes}
                </p>
              </div>
            </div>

            <p className="font-garamond text-sm text-on-surface-variant leading-relaxed text-center">
              {result.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <button
                onClick={() => {
                  onSelectFragrance(result);
                  onClose();
                }}
                className="flex-1 py-3 px-4 bg-primary hover:bg-primary-container text-surface rounded-xl font-work text-xs uppercase tracking-wider font-bold transition-colors cursor-pointer text-center"
              >
                Ver ficha y probar decant ➔
              </button>
              <button
                onClick={handleReset}
                className="py-3 px-4 border border-outline-variant hover:bg-surface-container-high text-primary rounded-xl font-work text-xs uppercase tracking-wider font-semibold cursor-pointer"
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
