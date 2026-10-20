import React from 'react';
import { INSTAGRAM_URL, SITE } from '../config/site';
import { formatARS } from '../lib/format';
import { whatsappLink } from '../lib/whatsapp';
import { SectionHeading } from './shared';

const Card: React.FC<{ icon: string; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
  <div className="p-6 bg-surface-container-low rounded-2xl border border-primary-container/15 shadow-sm space-y-4">
    <div className="w-12 h-12 rounded-full bg-secondary-container text-primary flex items-center justify-center">
      <span className="material-symbols-outlined text-[26px]" aria-hidden>
        {icon}
      </span>
    </div>
    <h2 className="font-playfair text-xl font-bold text-primary">{title}</h2>
    {children}
  </div>
);

const buttonCls =
  'inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-container text-surface font-work text-xs uppercase tracking-wider rounded-lg font-bold transition-colors';

export const ContactPage: React.FC = () => (
  <div className="max-w-4xl mx-auto px-5 md:px-8 py-10 md:py-16">
    <SectionHeading as="h1" eyebrow="Canales oficiales" title="Contacto & asesoramiento" />

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card icon="forum" title="WhatsApp directo">
        <p className="font-garamond text-base text-on-surface-variant">
          Atención personalizada · {SITE.attentionHours}. Te ayudamos a elegir tu fragancia o a armar tu selección de
          decants.
        </p>
        <a href={whatsappLink('Hola Mirage, quisiera asesoramiento.')} target="_blank" rel="noopener noreferrer" className={buttonCls}>
          Abrir conversación
        </a>
      </Card>

      <Card icon="photo_camera" title="Instagram">
        <p className="font-garamond text-base text-on-surface-variant">
          Reseñas, novedades de lotes y tips de fijación. También respondemos mensajes directos.
        </p>
        <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className={buttonCls}>
          @{SITE.instagramHandle}
        </a>
      </Card>

      <Card icon="local_shipping" title="Envíos">
        <p className="font-garamond text-base text-on-surface-variant">
          Despachamos desde {SITE.city} a todo el país con {SITE.shippingOptions.map((o) => o.label).join(' y ')}, con
          código de seguimiento. Bonificados desde {formatARS(SITE.freeShippingThreshold)}.
        </p>
      </Card>

      {SITE.email ? (
        <Card icon="mail" title="Email">
          <p className="font-garamond text-base text-on-surface-variant">Para consultas comerciales o mayoristas.</p>
          <a href={`mailto:${SITE.email}`} className={buttonCls}>
            {SITE.email}
          </a>
        </Card>
      ) : (
        <Card icon="schedule" title="Horarios">
          <p className="font-garamond text-base text-on-surface-variant">
            {SITE.attentionHours}. Los pedidos que entran fuera de horario se confirman al día hábil siguiente.
          </p>
        </Card>
      )}
    </div>
  </div>
);
