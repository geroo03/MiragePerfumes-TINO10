import React from 'react';
import { whatsappLink } from '../../lib/whatsapp';

export const FloatingWhatsApp: React.FC = () => (
  <a
    href={whatsappLink('Hola Mirage, quisiera hacer una consulta sobre un perfume.')}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Consultar por WhatsApp"
    className="fixed bottom-20 lg:bottom-6 right-4 lg:right-6 z-30 w-12 h-12 lg:w-auto lg:px-4 lg:py-2.5 bg-primary-container hover:bg-primary text-surface rounded-full flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(40,51,26,0.3)] active:scale-95 transition-all"
  >
    <span className="material-symbols-outlined text-[24px]" aria-hidden>
      forum
    </span>
    <span className="font-work text-xs uppercase tracking-wider font-semibold hidden lg:inline">Asesoría online</span>
  </a>
);
