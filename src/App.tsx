import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { BottomNav } from './components/layout/BottomNav';
import { FloatingWhatsApp } from './components/layout/FloatingWhatsApp';
import { Footer } from './components/layout/Footer';
import { Header } from './components/layout/Header';
import { Toast } from './components/layout/Toast';
import { CartDrawer } from './components/overlays/CartDrawer';
import { OlfactoryQuizModal } from './components/overlays/OlfactoryQuizModal';
import { ProductModal } from './components/overlays/ProductModal';
import { WishlistDrawer } from './components/overlays/WishlistDrawer';
import { SITE } from './config/site';
import { FRAGRANCES } from './data/fragrances';
import { navigate, ROUTES, useHashRoute } from './hooks/useHashRoute';
import { useCart, useWishlist } from './hooks/useStore';
import { formatLabel } from './lib/pricing';
import { AboutPage } from './pages/AboutPage';
import { CatalogPage } from './pages/CatalogPage';
import { ContactPage } from './pages/ContactPage';
import { HomePage } from './pages/HomePage';
import { NotFoundPage, ReturnsPage, TermsPage } from './pages/LegalPage';
import type { ShopActions } from './pages/shared';
import { WishlistPage } from './pages/WishlistPage';
import type { DecantFormat, Fragrance, FragranceCategory } from './types';

const CATEGORIES: FragranceCategory[] = ['all', 'arabes', 'decants', 'disenador', 'masculinos', 'femeninos', 'unisex'];
const isCategory = (s: string | undefined): s is FragranceCategory => !!s && (CATEGORIES as string[]).includes(s);

export default function App() {
  const route = useHashRoute();
  const cart = useCart();
  const wishlist = useWishlist();

  const [searchQuery, setSearchQuery] = useState('');
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [quizOpen, setQuizOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<number>(undefined);
  /** true si la ficha se abrió desde la app (cerrar = volver atrás); false si llegó por link directo. */
  const productOpenedInApp = useRef(false);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 2600);
  }, []);

  // Ficha de producto: vive en la URL (?p=id) para poder compartirla.
  const productId = route.params.get('p');
  const product = useMemo(() => FRAGRANCES.find((f) => f.id === productId) ?? null, [productId]);

  const openProduct = useCallback(
    (f: Fragrance) => {
      productOpenedInApp.current = true;
      navigate(`${route.path}?p=${f.id}`);
    },
    [route.path]
  );

  const closeProduct = useCallback(() => {
    if (productOpenedInApp.current) {
      productOpenedInApp.current = false;
      window.history.back();
    } else {
      navigate(route.path, { replace: true });
    }
  }, [route.path]);

  // Al cambiar de página: volver arriba y actualizar el título de la pestaña.
  const [section, sub] = route.segments;
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [route.path]);

  const pageTitle = useMemo(() => {
    if (product) return `${product.name} · ${product.house}`;
    const titles: Record<string, string> = {
      catalogo: 'Catálogo',
      decants: 'Decants',
      favoritos: 'Favoritos',
      nosotros: 'Sobre nosotros',
      contacto: 'Contacto',
      terminos: 'Términos y condiciones',
      devoluciones: 'Cambios y devoluciones',
    };
    return section ? titles[section] : '';
  }, [section, product]);

  useEffect(() => {
    document.title = pageTitle ? `${pageTitle} | ${SITE.name}` : `${SITE.name} | Perfumería árabe, de nicho y decants`;
  }, [pageTitle]);

  const handleSearch = (q: string) => {
    setSearchQuery(q);
    if (q.trim() && section !== 'catalogo' && section !== 'decants') navigate(ROUTES.catalog());
  };

  const shop: ShopActions = {
    isWishlisted: wishlist.has,
    onToggleWishlist: (f) => showToast(wishlist.toggle(f) ? 'Guardado en favoritos ✦' : 'Quitado de favoritos'),
    onQuickView: openProduct,
    onAddToCart: (f: Fragrance, format: DecantFormat) => {
      cart.add(f, format);
      showToast(`Sumado a la bolsa: ${f.name} (${formatLabel(format)})`);
    },
  };

  let page: React.ReactNode;
  switch (section) {
    case undefined:
      page = <HomePage shop={shop} onOpenQuiz={() => setQuizOpen(true)} />;
      break;
    case 'catalogo':
      page =
        sub === undefined || isCategory(sub) ? (
          <CatalogPage
            shop={shop}
            category={sub ?? 'all'}
            decantsMode={false}
            searchQuery={searchQuery}
            onClearSearch={() => setSearchQuery('')}
          />
        ) : (
          <NotFoundPage />
        );
      break;
    case 'decants':
      page = (
        <CatalogPage shop={shop} category="decants" decantsMode searchQuery={searchQuery} onClearSearch={() => setSearchQuery('')} />
      );
      break;
    case 'favoritos':
      page = <WishlistPage shop={shop} items={wishlist.items} />;
      break;
    case 'nosotros':
      page = <AboutPage />;
      break;
    case 'contacto':
      page = <ContactPage />;
      break;
    case 'terminos':
      page = <TermsPage />;
      break;
    case 'devoluciones':
      page = <ReturnsPage section={route.params.get('s')} />;
      break;
    default:
      page = <NotFoundPage />;
  }

  const cartCount = cart.items.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <div className="min-h-screen bg-surface font-garamond text-on-surface flex flex-col antialiased">
      <a
        href="#contenido"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById('contenido')?.focus();
        }}
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[70] focus:px-4 focus:py-2 focus:bg-primary focus:text-surface focus:rounded-lg font-work text-xs"
      >
        Saltar al contenido
      </a>

      <Toast message={toast} />

      <Header
        path={route.path}
        cartCount={cartCount}
        wishlistCount={wishlist.items.length}
        onOpenCart={() => setCartOpen(true)}
        onOpenWishlist={() => setWishlistOpen(true)}
        searchQuery={searchQuery}
        onSearch={handleSearch}
      />

      <main id="contenido" tabIndex={-1} className="flex-1 w-full pt-16 md:pt-[100px] pb-16 lg:pb-0 outline-none">
        {page}
      </main>

      <Footer />
      <FloatingWhatsApp />
      <BottomNav path={route.path} wishlistCount={wishlist.items.length} cartCount={cartCount} onOpenCart={() => setCartOpen(true)} />

      {product && (
        <ProductModal
          key={product.id}
          fragrance={product}
          onClose={closeProduct}
          onAddToCart={shop.onAddToCart}
          isWishlisted={wishlist.has(product.id)}
          onToggleWishlist={shop.onToggleWishlist}
        />
      )}

      {cartOpen && (
        <CartDrawer
          onClose={() => setCartOpen(false)}
          items={cart.items}
          onUpdateQuantity={cart.setQuantity}
          onRemoveItem={(id) => {
            cart.remove(id);
            showToast('Producto quitado de la bolsa');
          }}
        />
      )}

      {wishlistOpen && (
        <WishlistDrawer
          onClose={() => setWishlistOpen(false)}
          wishlist={wishlist.items}
          onRemove={shop.onToggleWishlist}
          onSelect={(f) => {
            setWishlistOpen(false);
            openProduct(f);
          }}
        />
      )}

      {quizOpen && (
        <OlfactoryQuizModal
          onClose={() => setQuizOpen(false)}
          onSelectFragrance={(f) => {
            setQuizOpen(false);
            openProduct(f);
          }}
        />
      )}
    </div>
  );
}
