/**
 * Datos del negocio. Todo lo que el dueño puede querer cambiar vive acá:
 * no hace falta tocar componentes para actualizar teléfono, envíos o descuentos.
 */
export const SITE = {
  name: 'Mirage Parfums & Decants',
  shortName: 'Mirage',
  tagline: 'Parfums & Decants',
  city: 'Santiago del Estero, Argentina',
  foundedYear: 2024,

  /**
   * Número de WhatsApp que recibe los pedidos, en formato internacional sin "+",
   * espacios ni guiones. Ej: Argentina celular CABA → 5491112345678.
   * Si queda vacío, WhatsApp le pide al cliente elegir un contacto (no sirve en producción).
   */
  whatsappNumber: '5493855715010',

  instagramHandle: 'its.miragee_',
  /** Opcional: si se completa, aparece en Contacto y en el botón de arrepentimiento. */
  email: '',

  attentionHours: 'Lunes a sábado de 10:00 a 20:00 hs',

  /**
   * Descuento por pago con transferencia (0.15 = 15%). En 0 no se muestra en ningún lado.
   */
  transferDiscount: 0,
  /** Compras desde este subtotal (ARS) tienen envío bonificado. */
  freeShippingThreshold: 90000,

  paymentMethods: [
    { id: 'efectivo', label: 'Efectivo', hint: 'Al retirar o en la entrega' },
    { id: 'transferencia', label: 'Transferencia', hint: 'Bancaria o billetera virtual' },
  ],

  shippingOptions: [
    { id: 'retiro', label: 'Retiro en Santiago del Estero', shortLabel: 'Retiro', cost: 0 },
    { id: 'andreani', label: 'Andreani Express', shortLabel: 'Andreani', cost: 4500 },
    { id: 'correo', label: 'Correo Argentino', shortLabel: 'Correo Arg.', cost: 3800 },
  ],
} as const;

export type ShippingOptionId = (typeof SITE.shippingOptions)[number]['id'];
export type PaymentMethod = (typeof SITE.paymentMethods)[number]['id'];

export const INSTAGRAM_URL = `https://instagram.com/${SITE.instagramHandle}`;
