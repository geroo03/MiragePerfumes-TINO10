import React, { useEffect } from 'react';
import { INSTAGRAM_URL, SITE } from '../config/site';
import { formatARS } from '../lib/format';
import { whatsappLink } from '../lib/whatsapp';
import { SectionHeading } from './shared';

/*
 * Textos base para una tienda online en Argentina (Ley 24.240 de Defensa del Consumidor,
 * Res. 424/2020 "botón de arrepentimiento"). Revisarlos con un asesor antes de publicar.
 */

const Block: React.FC<{ id?: string; title: string; children: React.ReactNode }> = ({ id, title, children }) => (
  <section id={id} className="scroll-mt-32">
    <h2 className="font-playfair text-xl sm:text-2xl text-primary font-bold mb-2">{title}</h2>
    <div className="space-y-3 font-garamond text-base sm:text-lg text-on-surface-variant leading-relaxed">{children}</div>
  </section>
);

const Shell: React.FC<{ eyebrow: string; title: string; children: React.ReactNode }> = ({ eyebrow, title, children }) => (
  <div className="max-w-3xl mx-auto px-5 md:px-8 py-10 md:py-16">
    <SectionHeading as="h1" eyebrow={eyebrow} title={title} />
    <div className="space-y-8 bg-surface-container-low p-6 sm:p-10 rounded-2xl border border-primary-container/15">{children}</div>
  </div>
);

export const TermsPage: React.FC = () => {
  return (
    <Shell eyebrow="Información legal" title="Términos y condiciones">
      <Block title="1. Quiénes somos">
        <p>
          Este sitio pertenece a {SITE.name}, con base en {SITE.city}. Podés contactarnos por WhatsApp, por Instagram (
          <a className="underline" href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
            @{SITE.instagramHandle}
          </a>
          ){SITE.email ? ` o por email a ${SITE.email}` : ''}.
        </p>
      </Block>
      <Block title="2. Cómo se realiza una compra">
        <p>
          Armás tu bolsa en el sitio y la enviás por WhatsApp. El pedido queda confirmado recién cuando te respondemos
          confirmando stock, precio final y datos de pago. Hasta ese momento no se realiza ningún cobro.
        </p>
      </Block>
      <Block title="3. Precios y medios de pago">
        <p>
          Los precios están expresados en pesos argentinos y pueden modificarse sin previo aviso; se respeta siempre el
          precio vigente al momento de confirmar tu pedido. Aceptamos efectivo (en entregas en mano y retiros en
          {' '}{SITE.city.split(',')[0]}) y transferencia bancaria o desde billeteras virtuales.
        </p>
      </Block>
      <Block title="4. Productos y decants">
        <p>
          Comercializamos perfumes originales árabes y de diseñador. Los decants son fracciones del perfume original que envasamos nosotros en
          atomizadores de vidrio; no son productos envasados por la marca. Las marcas y nombres comerciales pertenecen a sus
          respectivos titulares. Las imágenes son ilustrativas.
        </p>
      </Block>
      <Block title="5. Envíos">
        <p>
          Enviamos a todo el país con {SITE.shippingOptions.map((o) => o.label).join(' y ')}. Los plazos dependen del
          correo elegido y del destino; te compartimos el código de seguimiento al despachar. Las compras desde {formatARS(SITE.freeShippingThreshold)} tienen envío bonificado.
        </p>
      </Block>
      <Block title="6. Privacidad">
        <p>
          Usamos los datos que nos envías (nombre, localidad, dirección y teléfono) solo para gestionar tu pedido y el
          envío. No los vendemos ni los cedemos a terceros. Este sitio guarda tu bolsa y tus favoritos únicamente en tu
          navegador. Podés pedir el acceso, la rectificación o la eliminación de tus datos en cualquier momento (Ley 25.326).
        </p>
      </Block>
    </Shell>
  );
};

export const ReturnsPage: React.FC<{ section?: string | null }> = ({ section }) => {
  useEffect(() => {
    if (section) document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
  }, [section]);

  return (
    <Shell eyebrow="Información legal" title="Cambios y devoluciones">
      <Block title="Derecho de arrepentimiento">
        <p>
          Tenés 10 días corridos desde que recibís el producto para arrepentirte de la compra, sin necesidad de explicar el
          motivo (art. 34, Ley 24.240). El producto tiene que estar sin uso, en las mismas condiciones en que lo recibiste y
          con su precinto o sello intacto. Los costos de devolución corren por nuestra cuenta.
        </p>
      </Block>

      <Block id="arrepentimiento" title="Botón de arrepentimiento">
        <p>
          Para revocar tu compra escribinos con tu nombre y el detalle del pedido. Dentro de las 24 horas te enviamos un
          código de identificación del trámite y te indicamos cómo devolver el producto.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 pt-1">
          <a
            href={whatsappLink('Hola Mirage, quiero arrepentirme de mi compra (botón de arrepentimiento). Mi nombre es: ')}
            target="_blank"
            rel="noopener noreferrer"
            className="text-center px-5 py-3 bg-primary hover:bg-primary-container text-surface font-work text-xs uppercase tracking-wider rounded-lg font-bold transition-colors"
          >
            Solicitar arrepentimiento por WhatsApp
          </a>
          {SITE.email && (
            <a
              href={`mailto:${SITE.email}?subject=${encodeURIComponent('Botón de arrepentimiento')}`}
              className="text-center px-5 py-3 border border-primary text-primary font-work text-xs uppercase tracking-wider rounded-lg font-bold"
            >
              Solicitar por email
            </a>
          )}
        </div>
      </Block>

      <Block title="Productos con fallas">
        <p>
          Si tu frasco o atomizador llega dañado o no funciona, avisanos dentro de las 48 horas de recibido con una foto y
          lo cambiamos sin costo.
        </p>
      </Block>

      <Block title="Defensa del consumidor">
        <p>
          Ante cualquier reclamo podés contactarnos primero a nosotros. También podés acudir a la{' '}
          <a
            className="underline"
            href="https://www.argentina.gob.ar/produccion/defensadelconsumidor/formulario"
            target="_blank"
            rel="noopener noreferrer"
          >
            Dirección Nacional de Defensa del Consumidor
          </a>
          .
        </p>
      </Block>
    </Shell>
  );
};

export const NotFoundPage: React.FC = () => (
  <div className="max-w-xl mx-auto px-5 py-20 text-center">
    <p className="font-work text-xs uppercase tracking-[0.2em] text-secondary font-semibold mb-2">Error 404</p>
    <h1 className="font-playfair text-3xl text-primary font-bold mb-3">Esta página no existe</h1>
    <p className="font-garamond text-lg text-on-surface-variant mb-6">Puede que el link esté mal escrito o que la fragancia ya no esté disponible.</p>
    <a href="#/" className="px-6 py-3 bg-primary text-surface font-work text-xs uppercase tracking-wider rounded-lg font-bold">
      Volver al inicio
    </a>
  </div>
);
