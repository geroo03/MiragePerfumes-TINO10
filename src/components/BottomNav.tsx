import React from 'react';

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  wishlistCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  setActiveTab,
  wishlistCount,
}) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-[#f8f3e7]/95 backdrop-blur-xl border-t border-[#c6c8bc]/50 shadow-[0_-2px_12px_rgba(40,51,26,0.06)] pb-safe">
      <div className="flex justify-around items-center h-16 px-1">
        {/* 1. Atelier */}
        <button
          onClick={() => setActiveTab('atelier')}
          className={`flex flex-col items-center justify-center min-w-[56px] h-12 gap-0.5 transition-colors cursor-pointer ${
            activeTab === 'atelier'
              ? 'text-[#28331a] font-bold'
              : 'text-[#45483f] hover:text-[#28331a]'
          }`}
        >
          <span className="material-symbols-outlined text-[22px]">
            {activeTab === 'atelier' ? 'home_app_logo' : 'local_pharmacy'}
          </span>
          <span className="font-work text-[10px] tracking-wider uppercase">
            Atelier
          </span>
        </button>

        {/* 2. Catálogo */}
        <button
          onClick={() => setActiveTab('catalogo')}
          className={`flex flex-col items-center justify-center min-w-[56px] h-12 gap-0.5 transition-colors cursor-pointer ${
            activeTab === 'catalogo'
              ? 'text-[#28331a] font-bold'
              : 'text-[#45483f] hover:text-[#28331a]'
          }`}
        >
          <span className="material-symbols-outlined text-[22px]">spa</span>
          <span className="font-work text-[10px] tracking-wider uppercase">
            Catálogo
          </span>
        </button>

        {/* 3. Decants */}
        <button
          onClick={() => setActiveTab('decants')}
          className={`flex flex-col items-center justify-center min-w-[56px] h-12 gap-0.5 transition-colors cursor-pointer ${
            activeTab === 'decants'
              ? 'text-[#28331a] font-bold'
              : 'text-[#45483f] hover:text-[#28331a]'
          }`}
        >
          <span className="material-symbols-outlined text-[22px]">science</span>
          <span className="font-work text-[10px] tracking-wider uppercase">
            Decants
          </span>
        </button>

        {/* 4. Deseos */}
        <button
          onClick={() => setActiveTab('deseos')}
          className={`flex flex-col items-center justify-center min-w-[56px] h-12 gap-0.5 transition-colors relative cursor-pointer ${
            activeTab === 'deseos'
              ? 'text-[#28331a] font-bold'
              : 'text-[#45483f] hover:text-[#28331a]'
          }`}
        >
          <span className="material-symbols-outlined text-[22px]">bookmark</span>
          <span className="font-work text-[10px] tracking-wider uppercase">
            Deseos
          </span>
          {wishlistCount > 0 && (
            <span className="absolute top-1 right-2 w-4 h-4 rounded-full bg-[#566341] text-[#fef9ed] font-work text-[9px] font-bold flex items-center justify-center">
              {wishlistCount}
            </span>
          )}
        </button>

        {/* 5. Perfil */}
        <button
          onClick={() => setActiveTab('perfil')}
          className={`flex flex-col items-center justify-center min-w-[56px] h-12 gap-0.5 transition-colors cursor-pointer ${
            activeTab === 'perfil'
              ? 'text-[#28331a] font-bold'
              : 'text-[#45483f] hover:text-[#28331a]'
          }`}
        >
          <span className="material-symbols-outlined text-[22px]">account_circle</span>
          <span className="font-work text-[10px] tracking-wider uppercase">
            Perfil
          </span>
        </button>
      </div>
    </nav>
  );
};
