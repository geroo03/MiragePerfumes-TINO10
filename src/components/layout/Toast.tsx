import React from 'react';

/** Aviso breve de confirmación. role="status" para que lo anuncien los lectores de pantalla. */
export const Toast: React.FC<{ message: string | null }> = ({ message }) => (
  <div role="status" aria-live="polite" className="fixed top-20 md:top-28 inset-x-4 sm:inset-x-auto sm:right-6 z-[60] flex justify-center pointer-events-none">
    {message && (
      <div className="bg-primary text-surface px-4 py-2.5 rounded-xl shadow-xl font-work text-xs uppercase tracking-wider flex items-center gap-2 border border-secondary-container/40 animate-slideDown">
        <span className="text-secondary-container text-sm" aria-hidden>
          ✦
        </span>
        <span>{message}</span>
      </div>
    )}
  </div>
);
