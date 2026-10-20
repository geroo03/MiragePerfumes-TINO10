import React from 'react';
import { formatARS } from '../../lib/format';
import { INSTAGRAM_URL, SITE } from '../../config/site';
import { ROUTES } from '../../hooks/useHashRoute';
import { whatsappLink } from '../../lib/whatsapp';

const NAV = [
  { label: 'Inicio', href: ROUTES.home },
  { label: 'Catálogo completo', href: ROUTES.catalog() },
  { label: 'Colección árabe', href: ROUTES.catalog('arabes') },
  { label: 'Decants (5 ml / 10 ml)', href: ROUTES.decants },
  { label: 'Perfumería de diseñador', href: ROUTES.catalog('disenador') },
  { label: 'Sobre nosotros', href: ROUTES.about },
  { label: 'Contacto', href: ROUTES.contact },
];

const Heading: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="font-work text-xs uppercase tracking-[0.16em] text-surface font-semibold mb-4 flex items-center gap-1.5">
    <span className="text-[10px] text-sage" aria-hidden>
      ✦
    </span>
    {children}
  </h2>
);

export const Footer: React.FC = () => {
  const discountPct = Math.round(SITE.transferDiscount * 100);
  return (
    <footer className="w-full bg-primary text-surface-container-low border-t border-primary-container">
      <div className="max-w-7xl mx-auto px-5 md:px-8 pt-12 md:pt-16 pb-36 lg:pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 mb-12">
          <div className="flex flex-col">
            <p className="font-playfair text-xl md:text-2xl font-bold tracking-widest uppercase text-surface">{SITE.shortName}</p>
            <p className="font-work text-[10px] tracking-[0.2em] uppercase text-sage-muted mb-3">{SITE.tagline}</p>
            <p className="font-garamond text-sm text-sage/90 leading-relaxed italic mb-4">
              Perfumería árabe, de diseñador y de nicho. Frascos completos y decants fraccionados a mano en {SITE.city.split(',')[0]}.
            </p>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-work text-xs text-surface hover:text-sage transition-colors"
            >
              <span className="material-symbols-outlined text-[16px] text-sage" aria-hidden>
                photo_camera
              </span>
              <span className="underline underline-offset-4 decoration-secondary">@{SITE.instagramHandle}</span>
            </a>
          </div>

          <nav aria-label="Pie de página">
            <Heading>Navegación</Heading>
            <ul className="space-y-2 font-garamond text-sm text-sage">
              {NAV.map((l) => (
                <li key={l.href}>
                  <a href={`#${l.href}`} className="hover:text-surface transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <Heading>Novedades</Heading>
            <p className="font-garamond text-sm text-sage leading-relaxed mb-3">
              Enterate primero de los lotes nuevos, reposiciones y promos. Te sumamos a nuestra lista de difusión de WhatsApp.
            </p>
            <a
              href={whatsappLink('Hola Mirage, quiero sumarme a la lista de novedades.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full justify-center bg-secondary-container hover:bg-secondary-fixed text-primary transition-colors font-work text-[11px] uppercase tracking-wider py-2.5 rounded-lg font-bold"
            >
              Quiero recibir novedades
            </a>
          </div>

          <div>
            <Heading>Envíos y pagos</Heading>
            <p className="font-garamond text-sm text-sage leading-relaxed mb-3">
              Envíos asegurados a toda la Argentina. Bonificados desde {formatARS(SITE.freeShippingThreshold)}.
            </p>
            <ul className="flex flex-wrap gap-1.5">
              {[...SITE.shippingOptions.map((o) => o.label), `Transferencia (-${discountPct}%)`, 'Mercado Pago', SITE.installmentsLabel].map(
                (label) => (
                  <li
                    key={label}
                    className="px-2.5 py-1 bg-tertiary text-surface-container-high font-work text-[10px] rounded border border-secondary"
                  >
                    {label}
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-container pt-6 flex flex-col lg:flex-row items-center justify-between text-sage-muted gap-4 text-center lg:text-left">
          <p className="font-garamond text-sm">
            © {new Date().getFullYear()} {SITE.name}. {SITE.city}.
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 font-work text-xs">
            <li>
              <a href={`#${ROUTES.terms}`} className="hover:text-surface transition-colors">
                Términos y condiciones
              </a>
            </li>
            <li>
              <a href={`#${ROUTES.returns}`} className="hover:text-surface transition-colors">
                Cambios y devoluciones
              </a>
            </li>
            <li>
              <a
                href={`#${ROUTES.returns}?s=arrepentimiento`}
                className="px-2.5 py-1 rounded border border-sage-muted/60 hover:text-surface hover:border-surface transition-colors"
              >
                Botón de arrepentimiento
              </a>
            </li>
            <li>
              <a
                href="https://www.argentina.gob.ar/produccion/defensadelconsumidor/formulario"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-surface transition-colors"
              >
                Defensa del Consumidor
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
