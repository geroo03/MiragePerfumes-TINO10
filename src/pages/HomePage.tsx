import React from 'react';
import { CategoryFilterBar } from '../components/catalog/CategoryFilterBar';
import { ProductGrid } from '../components/catalog/ProductGrid';
import { ConsultationCard } from '../components/home/ConsultationCard';
import { DecantingFeature } from '../components/home/DecantingFeature';
import { HeroSection } from '../components/home/HeroSection';
import { InstagramFeed } from '../components/home/InstagramFeed';
import { FRAGRANCES } from '../data/fragrances';
import { navigate, ROUTES } from '../hooks/useHashRoute';
import { SectionHeading, type ShopActions } from './shared';

const FEATURED = FRAGRANCES.slice(0, 8);

export const HomePage: React.FC<{ shop: ShopActions; onOpenQuiz: () => void }> = ({ shop, onOpenQuiz }) => (
  <div className="flex flex-col w-full">
    <HeroSection
      onExploreCatalog={() => navigate(ROUTES.catalog())}
      onExploreDecants={() => document.getElementById('arte-decant')?.scrollIntoView({ behavior: 'smooth' })}
    />

    {/* En el inicio las categorías funcionan como accesos directos al catálogo. */}
    <div className="pt-6">
      <CategoryFilterBar selectedCategory="all" onSelectCategory={(c) => navigate(ROUTES.catalog(c))} itemCount={FRAGRANCES.length} />
    </div>

    <section className="w-full px-4 md:px-8 pt-8 md:pt-14 pb-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="Destacados del atelier"
          title="Los más pedidos"
          subtitle="Selección curada de los aromas favoritos de nuestra comunidad santiagueña y de todo el país."
        />
        <ProductGrid fragrances={FEATURED} {...shop} />
        <div className="flex justify-center mt-8">
          <a
            href={`#${ROUTES.catalog()}`}
            className="px-6 py-3 border border-primary text-primary hover:bg-primary hover:text-surface rounded-lg font-work text-xs uppercase tracking-[0.12em] font-semibold transition-colors"
          >
            Ver catálogo completo
          </a>
        </div>
      </div>
    </section>

    <DecantingFeature onExploreDecants={() => navigate(ROUTES.decants)} />
    <ConsultationCard onOpenQuiz={onOpenQuiz} />
    <InstagramFeed />
  </div>
);
