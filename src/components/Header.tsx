import React, { useState } from 'react';
import { FragranceCategory } from '../types';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedCategory: FragranceCategory;
  setSelectedCategory: (cat: FragranceCategory) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenQuiz: () => void;
  onOpenProfile: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  setSelectedCategory,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenProfile,
  searchQuery,
  setSearchQuery,
}) => {
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const handleNavClick = (tab: string, category?: FragranceCategory) => {
    setActiveTab(tab);
    if (category) {
      setSelectedCategory(category);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#e7e2d6]/95 backdrop-blur-md border-b border-[#3e4a2f]/20 shadow-[0_1px_8px_rgba(40,51,26,0.06)]">
      {/* Top Banner strip on desktop */}
      <div className="hidden md:block bg-[#28331a] text-[#f8f3e7] text-[11px] font-work uppercase tracking-[0.14em] py-1 text-center font-medium">
        <span>✦ 3 o 6 cuotas fijas · 15% OFF por transferencia bancaria · Envíos asegurados a todo el país ✦</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 md:h-18 flex items-center justify-between gap-4">
        {/* Brand Zone */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleNavClick('atelier', 'all')}
            className="flex items-center gap-2 group text-left focus:outline-none"
            aria-label="Mirage Parfums Inicio"
          >
            {/* Elegant Logo Image */}
            <img
              src="https://lh3.googleusercontent.com/aida/AEtjO1VKKjNq0qBh2BadKAYgTnU5boe56SD7oSDKxzCiTxGxY4mxI3szVQ3VGrB4FKtOb8Hel8Gog15ww6DDtom2Mmez53F1b9YYKopHioh7aPOdxs2HjtFfBdYR46lGziINDz2jj2zrg2Ah6Yjr8MI1qyy6pUzNC0WsUbE3uQKp65qHzHukvvK7VRIop96olDziZoOXB337W_1qevxNpjeR2Qvq3yPfxLR4avm46G2xKNnqPkMuJAUwb8OY7is"
              alt="Mirage Parfums Logo"
              className="h-8 md:h-9 w-auto object-contain"
              onError={(e) => {
                // Fallback if blocked
                e.currentTarget.style.display = 'none';
              }}
            />
            <div className="flex flex-col">
              <span className="font-playfair text-lg md:text-xl font-bold tracking-[0.15em] text-[#28331a] group-hover:text-[#3e4a2f] transition-colors uppercase leading-none">
                Mirage
              </span>
              <span className="font-work text-[9px] md:text-[10px] tracking-[0.24em] text-[#566341] uppercase mt-0.5">
                Parfums &amp; Decants
              </span>
            </div>
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6">
          <button
            onClick={() => handleNavClick('atelier', 'all')}
            className={`font-work text-xs uppercase tracking-[0.14em] py-1 transition-colors ${
              activeTab === 'atelier'
                ? 'text-[#28331a] font-bold border-b border-[#28331a]'
                : 'text-[#45483f] hover:text-[#28331a]'
            }`}
          >
            Inicio
          </button>
          <button
            onClick={() => handleNavClick('catalogo', 'all')}
            className={`font-work text-xs uppercase tracking-[0.14em] py-1 transition-colors ${
              activeTab === 'catalogo'
                ? 'text-[#28331a] font-bold border-b border-[#28331a]'
                : 'text-[#45483f] hover:text-[#28331a]'
            }`}
          >
            Catálogo
          </button>
          <button
            onClick={() => handleNavClick('catalogo', 'arabes')}
            className="font-work text-xs uppercase tracking-[0.14em] text-[#45483f] hover:text-[#28331a] transition-colors py-1"
          >
            Árabes
          </button>
          <button
            onClick={() => handleNavClick('catalogo', 'decants')}
            className="font-work text-xs uppercase tracking-[0.14em] text-[#45483f] hover:text-[#28331a] transition-colors py-1"
          >
            Decants
          </button>
          <button
            onClick={() => handleNavClick('catalogo', 'disenador')}
            className="font-work text-xs uppercase tracking-[0.14em] text-[#45483f] hover:text-[#28331a] transition-colors py-1"
          >
            Diseñador
          </button>
          <button
            onClick={() => handleNavClick('sobre-nosotros')}
            className={`font-work text-xs uppercase tracking-[0.14em] py-1 transition-colors ${
              activeTab === 'sobre-nosotros'
                ? 'text-[#28331a] font-bold border-b border-[#28331a]'
                : 'text-[#45483f] hover:text-[#28331a]'
            }`}
          >
            Sobre Nosotros
          </button>
          <button
            onClick={() => handleNavClick('contacto')}
            className={`font-work text-xs uppercase tracking-[0.14em] py-1 transition-colors ${
              activeTab === 'contacto'
                ? 'text-[#28331a] font-bold border-b border-[#28331a]'
                : 'text-[#45483f] hover:text-[#28331a]'
            }`}
          >
            Contacto
          </button>
        </nav>

        {/* Right Actions Zone */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Desktop Search Bar */}
          <div className="relative hidden sm:flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (activeTab !== 'catalogo' && e.target.value.trim() !== '') {
                  setActiveTab('catalogo');
                }
              }}
              placeholder="Buscar notas, casas..."
              className="w-36 md:w-52 bg-[#f8f3e7] border border-[#c6c8bc] rounded-md px-3 py-1.5 font-garamond text-sm text-[#1d1c14] placeholder:italic placeholder:text-[#76786e] focus:outline-none focus:border-[#28331a] transition-all"
            />
            <span className="material-symbols-outlined absolute right-2.5 text-[#76786e] text-[18px] pointer-events-none">
              search
            </span>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-8 text-[#76786e] hover:text-[#1d1c14] text-xs font-bold"
                aria-label="Limpiar búsqueda"
              >
                ✕
              </button>
            )}
          </div>

          {/* Mobile search toggle */}
          <button
            onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
            aria-label="Buscar en catálogo"
            className="sm:hidden w-10 h-10 flex items-center justify-center text-[#28331a] rounded-lg active:bg-[#ede8dc] transition-colors"
          >
            <span className="material-symbols-outlined text-[22px]">search</span>
          </button>

          {/* Wishlist Button */}
          <button
            onClick={onOpenWishlist}
            aria-label="Lista de deseos"
            className="w-10 h-10 flex items-center justify-center text-[#28331a] relative rounded-lg active:bg-[#ede8dc] hover:text-[#3e4a2f] transition-colors"
          >
            <span className="material-symbols-outlined text-[22px]">favorite</span>
            {wishlistCount > 0 && (
              <span className="absolute top-1.5 right-1.5 min-w-[17px] h-[17px] px-1 bg-[#566341] text-[#fef9ed] font-work text-[9px] font-bold rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Shopping Cart Button */}
          <button
            onClick={onOpenCart}
            aria-label="Bolsa de compras"
            className="w-10 h-10 flex items-center justify-center text-[#28331a] relative rounded-lg active:bg-[#ede8dc] hover:text-[#3e4a2f] transition-colors"
          >
            <span className="material-symbols-outlined text-[22px]">shopping_bag</span>
            {cartCount > 0 && (
              <span className="absolute top-1.5 right-1.5 min-w-[18px] h-[18px] px-1 bg-[#28331a] text-[#fef9ed] font-work text-[10px] font-bold rounded-full flex items-center justify-center shadow-xs">
                {cartCount}
              </span>
            )}
          </button>

          {/* Profile / Account Trigger */}
          <button
            onClick={onOpenProfile}
            aria-label="Mi perfil"
            className="w-8 h-8 rounded-full bg-[#28331a] text-[#fef9ed] flex items-center justify-center hover:bg-[#3e4a2f] active:scale-95 transition-all ml-1 shadow-xs"
          >
            <span className="material-symbols-outlined text-[18px]">person</span>
          </button>
        </div>
      </div>

      {/* Mobile Search Bar Expandable Drawer */}
      {mobileSearchOpen && (
        <div className="sm:hidden px-4 py-2.5 bg-[#f3ede1] border-t border-[#c6c8bc]/50 flex items-center gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (activeTab !== 'catalogo' && e.target.value.trim() !== '') {
                setActiveTab('catalogo');
              }
            }}
            placeholder="Buscar por notas (vainilla, café, oud, ámbar)..."
            className="flex-1 bg-[#fef9ed] border border-[#c6c8bc] rounded-md px-3 py-1.5 font-garamond text-sm text-[#1d1c14] placeholder:italic focus:outline-none focus:border-[#28331a]"
            autoFocus
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="px-2 text-xs text-[#76786e] font-work"
            >
              Borrar
            </button>
          )}
          <button
            onClick={() => setMobileSearchOpen(false)}
            className="text-xs text-[#28331a] font-work font-medium uppercase px-1"
          >
            Cerrar
          </button>
        </div>
      )}
    </header>
  );
};
