import React from 'react';

export const FloatingWhatsApp: React.FC = () => {
  return (
    <aside className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40">
      <a
        href="https://wa.me/?text=Hola%20Mirage%2C%20quisiera%20hacer%20una%20consulta%20sobre%20un%20perfume"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contacto por WhatsApp"
        className="w-12 h-12 sm:w-auto sm:px-4 sm:py-2.5 bg-[#3e4a2f] hover:bg-[#28331a] text-[#fef9ed] rounded-full flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(40,51,26,0.3)] active:scale-95 transition-all duration-200 group"
      >
        <span className="material-symbols-outlined text-[24px]">forum</span>
        <span className="font-work text-xs uppercase tracking-wider font-semibold hidden md:inline">
          Asesoría Online
        </span>
      </a>
    </aside>
  );
};
