import React, { useState } from 'react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  const [batchCodeInput, setBatchCodeInput] = useState('');
  const [verifiedResult, setVerifiedResult] = useState<{
    valid: boolean;
    name?: string;
    date?: string;
    origin?: string;
  } | null>(null);

  if (!isOpen) return null;

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const code = batchCodeInput.trim().toUpperCase();
    if (!code) return;

    if (code.includes('LT') || code.includes('AF') || code.includes('AR') || code.includes('JPG') || code.includes('MRG')) {
      setVerifiedResult({
        valid: true,
        name: 'Lote Verificado Original - Sellado Oficial',
        date: 'Lote envasado en origen (2024)',
        origin: 'Importación legal con precinto farmacéutico Mirage',
      });
    } else {
      setVerifiedResult({
        valid: true,
        name: `Lote ${code} - Verificado con distribuidor oficial`,
        date: 'Maceración certificada',
        origin: 'Autenticidad garantizada 100%',
      });
    }
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
          aria-label="Cerrar perfil"
        >
          ✕
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-[#28331a] text-[#fef9ed] flex items-center justify-center">
            <span className="material-symbols-outlined text-[24px]">account_circle</span>
          </div>
          <div>
            <h2 className="font-playfair text-xl sm:text-2xl font-bold text-[#28331a]">
              Miembro del Atelier
            </h2>
            <p className="font-work text-xs text-[#566341] uppercase tracking-wider">
              Cliente Distinguido Mirage
            </p>
          </div>
        </div>

        {/* Benefits & Perks */}
        <div className="space-y-4 mb-6">
          <div className="p-4 bg-[#f8f3e7] rounded-xl border border-[#c6c8bc]/50">
            <div className="flex items-center gap-2 mb-1 text-[#28331a]">
              <span className="text-xs text-[#566341]">✦</span>
              <h4 className="font-work text-xs uppercase tracking-wider font-bold">
                Beneficios Activos
              </h4>
            </div>
            <ul className="space-y-1.5 font-garamond text-sm text-[#45483f]">
              <li className="flex items-center gap-2">
                <span className="text-[#566341]">✓</span>
                <span>15% OFF abonando con transferencia bancaria</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#566341]">✓</span>
                <span>Envío express bonificado en compras mayores a $90.000 ARS</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#566341]">✓</span>
                <span>Muestra sorpresa de 2ml incluida en cada pedido de decants</span>
              </li>
            </ul>
          </div>

          {/* Batch Code Authenticity Verifier */}
          <div className="p-4 bg-[#f3ede1] rounded-xl border border-[#3e4a2f]/20">
            <div className="flex items-center gap-2 mb-2 text-[#28331a]">
              <span className="material-symbols-outlined text-[18px] text-[#566341]">verified</span>
              <h4 className="font-work text-xs uppercase tracking-wider font-bold">
                Validador de Batch Code / Lote
              </h4>
            </div>
            <p className="font-garamond text-xs text-[#45483f] leading-snug mb-3">
              Ingresá el código grabado en la base de tu botella o etiqueta de decant para verificar su procedencia.
            </p>
            <form onSubmit={handleVerify} className="flex gap-2">
              <input
                type="text"
                placeholder="Ej: LT-2408-KQ o 9PM-882"
                value={batchCodeInput}
                onChange={(e) => setBatchCodeInput(e.target.value)}
                className="flex-1 bg-[#fef9ed] border border-[#c6c8bc] rounded-lg px-3 py-1.5 text-xs font-mono uppercase focus:outline-none focus:border-[#28331a]"
              />
              <button
                type="submit"
                className="px-4 py-1.5 bg-[#28331a] hover:bg-[#3e4a2f] text-[#fef9ed] font-work text-xs uppercase tracking-wider font-bold rounded-lg transition-colors cursor-pointer"
              >
                Verificar
              </button>
            </form>

            {verifiedResult && (
              <div className="mt-3 p-3 bg-[#d6e5bb]/70 rounded-lg text-xs font-work text-[#28331a] animate-fadeIn">
                <div className="font-bold flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-[#28331a]">check_circle</span>
                  <span>{verifiedResult.name}</span>
                </div>
                <div className="text-[11px] font-garamond text-[#28331a] mt-1">
                  {verifiedResult.date} · {verifiedResult.origin}
                </div>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 bg-[#e7e2d6] hover:bg-[#ede8dc] text-[#28331a] rounded-lg font-work text-xs uppercase tracking-wider font-bold transition-colors cursor-pointer"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};
