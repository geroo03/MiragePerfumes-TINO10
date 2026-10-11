import React, { useState, useMemo } from 'react';
import { FRAGRANCES } from './data/fragrances';
import { Fragrance, FragranceCategory, CartItem, DecantFormat } from './types';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { CategoryFilterBar } from './components/CategoryFilterBar';
import { ProductCard } from './components/ProductCard';
import { DecantingFeature } from './components/DecantingFeature';
import { ConsultationCard } from './components/ConsultationCard';
import { InstagramFeed } from './components/InstagramFeed';
import { Footer } from './components/Footer';
import { BottomNav } from './components/BottomNav';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { OlfactoryQuizModal } from './components/OlfactoryQuizModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { ProfileModal } from './components/ProfileModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('atelier');
  const [selectedCategory, setSelectedCategory] = useState<FragranceCategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Initialized with 2 items to match the count "2" in the design screenshots
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'initial-1',
      fragranceId: FRAGRANCES[0].id,
      fragrance: FRAGRANCES[0],
      format: '5ml',
      price: FRAGRANCES[0].decant5mlPrice,
      quantity: 1,
    },
    {
      id: 'initial-2',
      fragranceId: FRAGRANCES[1].id,
      fragrance: FRAGRANCES[1],
      format: '5ml',
      price: FRAGRANCES[1].decant5mlPrice,
      quantity: 1,
    },
  ]);

  const [wishlist, setWishlist] = useState<Fragrance[]>([FRAGRANCES[0], FRAGRANCES[3]]);
  const [selectedProduct, setSelectedProduct] = useState<Fragrance | null>(null);

  // Modals & Drawers state
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [quizOpen, setQuizOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Filtered fragrances based on category & search
  const filteredFragrances = useMemo(() => {
    return FRAGRANCES.filter((frag) => {
      const matchesCategory =
        selectedCategory === 'all' || frag.category.includes(selectedCategory);

      const query = searchQuery.trim().toLowerCase();
      if (!query) return matchesCategory;

      const matchesSearch =
        frag.name.toLowerCase().includes(query) ||
        frag.house.toLowerCase().includes(query) ||
        frag.shortNotes.toLowerCase().includes(query) ||
        frag.description.toLowerCase().includes(query) ||
        frag.pyramid.salida.some((n) => n.toLowerCase().includes(query)) ||
        frag.pyramid.corazon.some((n) => n.toLowerCase().includes(query)) ||
        frag.pyramid.fondo.some((n) => n.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Wishlist toggle handler
  const handleToggleWishlist = (fragrance: Fragrance) => {
    const exists = wishlist.some((item) => item.id === fragrance.id);
    if (exists) {
      setWishlist(wishlist.filter((item) => item.id !== fragrance.id));
      showToast(`Removido de favoritos`);
    } else {
      setWishlist([...wishlist, fragrance]);
      showToast(`Guardado en tus favoritos ✦`);
    }
  };

  // Add to cart handler
  const handleAddToCart = (fragrance: Fragrance, format: DecantFormat) => {
    let unitPrice = fragrance.decant5mlPrice;
    if (format === '10ml') unitPrice = fragrance.decant10mlPrice;
    if (format === 'full') unitPrice = fragrance.fullBottlePrice;

    const existingIndex = cartItems.findIndex(
      (item) => item.fragranceId === fragrance.id && item.format === format
    );

    if (existingIndex > -1) {
      setCartItems(
        cartItems.map((item, i) =>
          i === existingIndex ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      const newItem: CartItem = {
        id: `${fragrance.id}-${format}-${Date.now()}`,
        fragranceId: fragrance.id,
        fragrance,
        format,
        price: unitPrice,
        quantity: 1,
      };
      setCartItems([...cartItems, newItem]);
    }

    const formatName = format === 'full' ? 'Botella Completa' : `Decant ${format}`;
    showToast(`Sumado a la bolsa: ${fragrance.name} (${formatName})`);
  };

  const handleUpdateCartQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(cartItemId);
      return;
    }
    setCartItems(
      cartItems.map((item) => (item.id === cartItemId ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveCartItem = (cartItemId: string) => {
    setCartItems(cartItems.filter((item) => item.id !== cartItemId));
    showToast('Producto eliminado de la bolsa');
  };

  // Category selection handler with tab routing
  const handleSelectCategory = (cat: FragranceCategory) => {
    setSelectedCategory(cat);
    if (activeTab !== 'atelier' && activeTab !== 'catalogo') {
      setActiveTab('catalogo');
    }
  };

  return (
    <div className="min-h-screen bg-[#fef9ed] font-garamond text-[#1d1c14] flex flex-col antialiased selection:bg-[#d6e5bb] selection:text-[#28331a]">
      {/* Toast Alert Feedback */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-[#28331a] text-[#fef9ed] px-4 py-2.5 rounded-xl shadow-xl font-work text-xs uppercase tracking-wider flex items-center gap-2 border border-[#d6e5bb]/40 animate-slideDown">
          <span className="text-[#d6e5bb] text-sm">✦</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Primary Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedCategory={selectedCategory}
        setSelectedCategory={handleSelectCategory}
        cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
        wishlistCount={wishlist.length}
        onOpenCart={() => setCartOpen(true)}
        onOpenWishlist={() => setWishlistOpen(true)}
        onOpenQuiz={() => setQuizOpen(true)}
        onOpenProfile={() => setProfileOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full pt-16 md:pt-26 pb-20 lg:pb-0">
        {/* VIEW 1: ATELIER (The hero storefront from the prompt) */}
        {activeTab === 'atelier' && (
          <div className="flex flex-col w-full">
            {/* 1. Hero Section */}
            <HeroSection
              onExploreCatalog={() => {
                setActiveTab('catalogo');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onExploreDecants={() => {
                setSelectedCategory('decants');
                const decantEl = document.getElementById('arte-decant');
                if (decantEl) {
                  decantEl.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            />

            {/* 2. Section Divider */}
            <div className="w-full py-4 flex items-center justify-center gap-3 text-[#566341] opacity-60">
              <div className="w-16 h-[1px] bg-[#566341]" />
              <span className="text-xs">✦</span>
              <div className="w-16 h-[1px] bg-[#566341]" />
            </div>

            {/* 3. Sticky Categories Bar */}
            <CategoryFilterBar
              selectedCategory={selectedCategory}
              onSelectCategory={handleSelectCategory}
              itemCount={filteredFragrances.length}
            />

            {/* 4. "LOS MÁS PEDIDOS" Grid Section */}
            <section className="w-full px-4 md:px-8 pt-8 md:pt-14 pb-8" id="catalogo-seccion">
              <div className="max-w-7xl mx-auto">
                <div className="flex flex-col items-center text-center mb-6 md:mb-10">
                  <span className="font-work text-[10px] md:text-xs tracking-[0.2em] uppercase text-[#566341] font-semibold mb-1">
                    Destacados del Atelier
                  </span>
                  <div className="flex items-center justify-center gap-2 my-1 text-[#566341]/60">
                    <span className="w-10 h-px bg-[#c6c8bc]" />
                    <span className="text-xs">✦</span>
                    <span className="w-10 h-px bg-[#c6c8bc]" />
                  </div>
                  <h2 className="font-playfair text-2xl sm:text-3xl md:text-4xl text-[#28331a] uppercase tracking-wide font-semibold">
                    Los Más Pedidos
                  </h2>
                  <p className="font-garamond text-sm sm:text-base text-[#45483f] italic mt-1">
                    Selección curada de los aromas favoritos de nuestra comunidad porteña y federal.
                  </p>
                </div>

                {/* 2 columns on mobile, 4 columns on desktop */}
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
                  {filteredFragrances.slice(0, 8).map((fragrance) => (
                    <ProductCard
                      key={fragrance.id}
                      fragrance={fragrance}
                      isWishlisted={wishlist.some((w) => w.id === fragrance.id)}
                      onToggleWishlist={handleToggleWishlist}
                      onQuickView={(frag) => setSelectedProduct(frag)}
                      onAddToCart={handleAddToCart}
                    />
                  ))}
                </div>

                {filteredFragrances.length === 0 && (
                  <div className="py-12 text-center text-[#76786e]">
                    <p className="font-playfair text-lg text-[#28331a]">
                      No encontramos fragancias con los filtros seleccionados
                    </p>
                    <button
                      onClick={() => {
                        setSelectedCategory('all');
                        setSearchQuery('');
                      }}
                      className="mt-3 px-4 py-2 bg-[#28331a] text-[#fef9ed] font-work text-xs uppercase rounded-lg"
                    >
                      Restablecer filtros
                    </button>
                  </div>
                )}
              </div>
            </section>

            {/* 5. "PROBÁ ANTES DE COMPRAR" Dark Decanting Feature */}
            <DecantingFeature
              onExploreDecants={() => {
                setSelectedCategory('decants');
                setActiveTab('catalogo');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* 6. "¿NO SABÉS CUÁL ELEGIR?" + Asesoría + Compromisos */}
            <ConsultationCard onOpenQuiz={() => setQuizOpen(true)} />

            {/* 7. Instagram Feed Preview */}
            <InstagramFeed />
          </div>
        )}

        {/* VIEW 2: FULL CATALOG (CATÁLOGO / DECANTS) */}
        {(activeTab === 'catalogo' || activeTab === 'decants') && (
          <div className="flex flex-col w-full">
            {/* Header Banner */}
            <section className="bg-[#f3ede1] px-5 md:px-8 py-8 md:py-12 border-b border-[#c6c8bc]/40 text-center">
              <div className="max-w-4xl mx-auto">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#ede8dc] rounded-full text-[#566341] font-work text-[10px] uppercase tracking-widest font-bold mb-2">
                  <span>✦</span>
                  <span>Colección Completa del Atelier</span>
                  <span>✦</span>
                </div>
                <h1 className="font-playfair text-3xl sm:text-4xl md:text-5xl uppercase text-[#28331a] font-semibold mb-2">
                  {activeTab === 'decants' ? 'Muestras & Decants Oficiales' : 'Catálogo de Fragancias'}
                </h1>
                <p className="font-garamond text-base sm:text-lg text-[#45483f] italic max-w-xl mx-auto">
                  {activeTab === 'decants'
                    ? 'Fraccionados en frascos de vidrio reforzado de 5ml (~70 atomizaciones) y 10ml (~140 atomizaciones).'
                    : 'Joyas árabes, perfumería nicho de autor y lanzamientos exclusivos de diseñador.'}
                </p>
              </div>
            </section>

            {/* Category Filter */}
            <CategoryFilterBar
              selectedCategory={selectedCategory}
              onSelectCategory={handleSelectCategory}
              itemCount={filteredFragrances.length}
            />

            {/* Products Grid */}
            <section className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-14 w-full">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
                {filteredFragrances.map((fragrance) => (
                  <ProductCard
                    key={fragrance.id}
                    fragrance={fragrance}
                    isWishlisted={wishlist.some((w) => w.id === fragrance.id)}
                    onToggleWishlist={handleToggleWishlist}
                    onQuickView={(frag) => setSelectedProduct(frag)}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>

              {filteredFragrances.length === 0 && (
                <div className="py-16 text-center text-[#76786e]">
                  <span className="material-symbols-outlined text-[40px] text-[#566341] mb-2">
                    search_off
                  </span>
                  <p className="font-playfair text-xl text-[#28331a] font-semibold">
                    No encontramos fragancias con la búsqueda "{searchQuery}"
                  </p>
                  <p className="font-garamond text-sm text-[#45483f] mt-1 mb-4">
                    Intentá buscar por familias: "vainilla", "café", "limón", "maderas" o "oud".
                  </p>
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setSearchQuery('');
                    }}
                    className="px-5 py-2.5 bg-[#28331a] text-[#fef9ed] font-work text-xs uppercase tracking-wider rounded-lg font-bold cursor-pointer"
                  >
                    Ver Todo el Catálogo
                  </button>
                </div>
              )}
            </section>
          </div>
        )}

        {/* VIEW 3: DESEOS / FAVORITOS */}
        {activeTab === 'deseos' && (
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
            <div className="text-center mb-8">
              <h1 className="font-playfair text-3xl sm:text-4xl uppercase text-[#28331a] font-semibold mb-2">
                Tus Deseos Guardados
              </h1>
              <p className="font-garamond text-base text-[#45483f] italic">
                {wishlist.length} {wishlist.length === 1 ? 'fragancia seleccionada' : 'fragancias seleccionadas'} para tu próxima cata.
              </p>
            </div>

            {wishlist.length === 0 ? (
              <div className="text-center py-16 bg-[#f8f3e7] rounded-2xl border border-[#c6c8bc]/40 p-8">
                <span className="material-symbols-outlined text-[48px] text-[#566341] mb-2">
                  favorite_border
                </span>
                <p className="font-playfair text-xl text-[#28331a] font-semibold">
                  Aún no agregaste favoritos
                </p>
                <p className="font-garamond text-sm text-[#45483f] mt-1 mb-4">
                  Hacé clic en el corazón de cualquier perfume para guardarlo en tu lista.
                </p>
                <button
                  onClick={() => setActiveTab('atelier')}
                  className="px-6 py-2.5 bg-[#28331a] text-[#fef9ed] font-work text-xs uppercase tracking-wider rounded-lg font-bold cursor-pointer"
                >
                  Ir al Atelier
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
                {wishlist.map((fragrance) => (
                  <ProductCard
                    key={fragrance.id}
                    fragrance={fragrance}
                    isWishlisted={true}
                    onToggleWishlist={handleToggleWishlist}
                    onQuickView={(frag) => setSelectedProduct(frag)}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* VIEW 4: SOBRE NOSOTROS (El Manifiesto) */}
        {activeTab === 'sobre-nosotros' && (
          <div className="max-w-4xl mx-auto px-5 md:px-8 py-10 md:py-16">
            <div className="text-center mb-10">
              <span className="font-work text-xs uppercase tracking-[0.2em] text-[#566341] font-semibold">
                ✦ Manifiesto del Atelier ✦
              </span>
              <h1 className="font-playfair text-3xl sm:text-5xl uppercase text-[#28331a] font-bold mt-2 mb-4">
                El Arte Olfativo en Buenos Aires
              </h1>
              <div className="w-16 h-px bg-[#566341] mx-auto mb-6" />
            </div>

            <div className="space-y-6 text-[#1d1c14] font-garamond text-lg sm:text-xl leading-relaxed bg-[#f8f3e7] p-6 sm:p-10 rounded-2xl border border-[#3e4a2f]/15 shadow-sm">
              <p>
                <strong className="font-playfair text-2xl text-[#28331a] block mb-1">
                  Nuestra Vocación
                </strong>
                Mirage nació en Buenos Aires bajo una premisa inquebrantable: acercar las composiciones más suntuosas y exclusivas del mundo árabe y la perfumería nicho europea sin barreras artificiales ni misterios innecesarios.
              </p>

              <p>
                Creemos que el perfume no es un accesorio descartable, sino una segunda piel invisible y una memoria sensorial indeleble. Por eso seleccionamos cada lote directamente de distribuidores oficiales en Dubai, París y Grasse, asegurando que cada gota conserve su integridad química y su riqueza aromática.
              </p>

              <div className="p-5 bg-[#f3ede1] rounded-xl border border-[#c6c8bc]/60 my-6">
                <h3 className="font-playfair text-xl text-[#28331a] font-bold mb-2">
                  La Filosofía del Decant Artesanal
                </h3>
                <p className="text-base text-[#45483f]">
                  Comprar un frasco a ciegas suele ser costoso e incierto. A través del decanting fraccionamos en frascos atomizadores de vidrio borosilicato reforzado para que puedas experimentar la apertura, la fijación y el secado de una fragancia durante días enteros en tu propia piel. Cero riesgo, pura libertad de experimentación.
                </p>
              </div>

              <p>
                Cada envío se acondiciona a mano con embalaje amortiguado y precinto de lacre para que el viaje desde nuestro atelier hasta cualquier rincón del país sea una experiencia ritual de apertura.
              </p>
            </div>
          </div>
        )}

        {/* VIEW 5: CONTACTO */}
        {activeTab === 'contacto' && (
          <div className="max-w-4xl mx-auto px-5 md:px-8 py-10 md:py-16">
            <div className="text-center mb-10">
              <span className="font-work text-xs uppercase tracking-[0.2em] text-[#566341] font-semibold">
                ✦ Canales Oficiales ✦
              </span>
              <h1 className="font-playfair text-3xl sm:text-5xl uppercase text-[#28331a] font-bold mt-2 mb-4">
                Contacto &amp; Asesoramiento
              </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-[#f8f3e7] rounded-2xl border border-[#3e4a2f]/15 shadow-sm space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#d6e5bb] text-[#28331a] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[26px]">forum</span>
                </div>
                <h3 className="font-playfair text-xl font-bold text-[#28331a]">
                  WhatsApp Directo
                </h3>
                <p className="font-garamond text-sm text-[#45483f]">
                  Atención humana y personalizada de lunes a sábado de 10:00 a 20:00 hs. Te ayudamos a armar tu selección de decants.
                </p>
                <a
                  href="https://wa.me/?text=Hola%20Mirage%2C%20quisiera%20asesoramiento"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#28331a] text-[#fef9ed] font-work text-xs uppercase tracking-wider rounded-lg font-bold"
                >
                  Abrir Conversación
                </a>
              </div>

              <div className="p-6 bg-[#f8f3e7] rounded-2xl border border-[#3e4a2f]/15 shadow-sm space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#d6e5bb] text-[#28331a] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[26px]">location_on</span>
                </div>
                <h3 className="font-playfair text-xl font-bold text-[#28331a]">
                  Showroom &amp; Despachos
                </h3>
                <p className="font-garamond text-sm text-[#45483f]">
                  Buenos Aires, Argentina.<br />
                  Envíos a todo el país vía Andreani y Correo Argentino con código de seguimiento en tiempo real.
                </p>
                <div className="font-work text-xs text-[#566341] font-semibold pt-2">
                  Instagram: @its.miragee_
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 6: PERFIL */}
        {activeTab === 'perfil' && (
          <div className="max-w-2xl mx-auto px-5 py-10">
            <div className="p-6 bg-[#f8f3e7] rounded-2xl border border-[#3e4a2f]/20 shadow-sm text-center">
              <div className="w-16 h-16 rounded-full bg-[#28331a] text-[#fef9ed] flex items-center justify-center mx-auto mb-3">
                <span className="material-symbols-outlined text-[32px]">person</span>
              </div>
              <h2 className="font-playfair text-2xl font-bold text-[#28331a]">
                Tu Cuenta en Mirage
              </h2>
              <p className="font-garamond text-sm text-[#45483f] italic mb-6">
                Accedé a tus beneficios exclusivos, historial de catas y verificación de autenticidad.
              </p>
              <button
                onClick={() => setProfileOpen(true)}
                className="px-6 py-2.5 bg-[#28331a] text-[#fef9ed] font-work text-xs uppercase tracking-wider rounded-lg font-bold"
              >
                Abrir Validador de Lote &amp; Beneficios
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={(tab) => setActiveTab(tab)} />

      {/* Floating WhatsApp Action Button */}
      <FloatingWhatsApp />

      {/* Mobile Fixed Bottom Navigation */}
      <BottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        wishlistCount={wishlist.length}
      />

      {/* Product Quick View / Olfactory Pyramid Modal */}
      {selectedProduct && (
        <ProductModal
          key={selectedProduct.id}
          fragrance={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
          isWishlisted={selectedProduct ? wishlist.some((w) => w.id === selectedProduct.id) : false}
          onToggleWishlist={handleToggleWishlist}
        />
      )}

      {/* Shopping Bag Drawer */}
      {cartOpen && (
        <CartDrawer
          isOpen={cartOpen}
          onClose={() => setCartOpen(false)}
          items={cartItems}
          onUpdateQuantity={handleUpdateCartQuantity}
          onRemoveItem={handleRemoveCartItem}
          onClearCart={() => setCartItems([])}
        />
      )}

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
        wishlist={wishlist}
        onRemove={handleToggleWishlist}
        onSelect={(frag) => setSelectedProduct(frag)}
      />

      {/* Interactive Olfactory Quiz Modal */}
      {quizOpen && (
        <OlfactoryQuizModal
          isOpen={quizOpen}
          onClose={() => setQuizOpen(false)}
          onSelectFragrance={(frag) => setSelectedProduct(frag)}
        />
      )}

      {/* Profile & Batch Verification Modal */}
      {profileOpen && <ProfileModal isOpen={profileOpen} onClose={() => setProfileOpen(false)} />}
    </div>
  );
}
