import React from 'react';
import { SITE } from '../config/site';
import { ROUTES } from '../hooks/useHashRoute';
import { SectionHeading } from './shared';

export const AboutPage: React.FC = () => (
  <div className="max-w-4xl mx-auto px-5 md:px-8 py-10 md:py-16">
    <SectionHeading as="h1" eyebrow="Manifiesto del atelier" title="El arte olfativo en Santiago del Estero" />

    <div className="space-y-6 text-on-surface font-garamond text-lg sm:text-xl leading-relaxed bg-surface-container-low p-6 sm:p-10 rounded-2xl border border-primary-container/15 shadow-sm">
      <section>
        <h2 className="font-playfair text-2xl text-primary font-bold mb-1">Nuestra vocación</h2>
        <p>
          {SITE.shortName} nació en Santiago del Estero con una premisa simple: acercar las composiciones más interesantes de la
          perfumería árabe y de diseñador, sin barreras ni misterios innecesarios.
        </p>
      </section>

      <p>
        Creemos que el perfume no es un accesorio descartable sino una segunda piel y una memoria sensorial. Por eso
        trabajamos solo con frascos originales y cuidamos cada lote para que conserve su integridad y su riqueza aromática.
      </p>

      <section className="p-5 bg-surface-container rounded-xl border border-outline-variant/60">
        <h2 className="font-playfair text-xl text-primary font-bold mb-2">La filosofía del decant</h2>
        <p className="text-base text-on-surface-variant">
          Comprar un frasco a ciegas suele ser caro e incierto. Con el decant fraccionamos el perfume original en
          atomizadores de vidrio para que puedas vivir la salida, la fijación y el secado de una fragancia durante días en
          tu propia piel. Cero riesgo, pura libertad para experimentar.
        </p>
      </section>

      <p>
        Cada envío se arma a mano, con embalaje amortiguado, para que llegue impecable a cualquier punto del país.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <a
          href={`#${ROUTES.catalog()}`}
          className="flex-1 text-center px-6 py-3 bg-primary hover:bg-primary-container text-surface rounded-lg font-work text-xs uppercase tracking-[0.12em] font-semibold transition-colors"
        >
          Ver el catálogo
        </a>
        <a
          href={`#${ROUTES.contact}`}
          className="flex-1 text-center px-6 py-3 border border-primary text-primary hover:bg-primary hover:text-surface rounded-lg font-work text-xs uppercase tracking-[0.12em] font-semibold transition-colors"
        >
          Hablar con nosotros
        </a>
      </div>
    </div>
  </div>
);
