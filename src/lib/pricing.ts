import { SITE, type PaymentMethod, type ShippingOptionId } from '../config/site';
import type { CartItem, DecantFormat, Fragrance } from '../types';

export const priceFor = (fragrance: Fragrance, format: DecantFormat) => {
  switch (format) {
    case '5ml':
      return fragrance.decant5mlPrice;
    case '10ml':
      return fragrance.decant10mlPrice;
    case 'full':
      return fragrance.fullBottlePrice;
  }
};

export const formatLabel = (format: DecantFormat) =>
  format === 'full' ? 'Botella completa' : `Decant ${format.replace('ml', ' ml')}`;

/** Precio más bajo del catálogo para un formato ("Desde $ ..."). */
export const minPrice = (fragrances: Fragrance[], format: DecantFormat) =>
  Math.min(...fragrances.map((f) => priceFor(f, format)));

export interface CartTotals {
  itemCount: number;
  subtotal: number;
  discount: number;
  shippingCost: number;
  freeShipping: boolean;
  /** Cuánto falta para el envío gratis (0 si ya aplica). */
  missingForFreeShipping: number;
  total: number;
}

export const cartTotals = (
  items: CartItem[],
  payment: PaymentMethod,
  shipping: ShippingOptionId
): CartTotals => {
  const itemCount = items.reduce((acc, i) => acc + i.quantity, 0);
  const subtotal = items.reduce((acc, i) => acc + i.price * i.quantity, 0);
  const discount = payment === 'transferencia' ? Math.round(subtotal * SITE.transferDiscount) : 0;
  const freeShipping = subtotal >= SITE.freeShippingThreshold;
  const option = SITE.shippingOptions.find((o) => o.id === shipping) ?? SITE.shippingOptions[0];
  const shippingCost = freeShipping || items.length === 0 ? 0 : option.cost;
  return {
    itemCount,
    subtotal,
    discount,
    shippingCost,
    freeShipping,
    missingForFreeShipping: Math.max(0, SITE.freeShippingThreshold - subtotal),
    total: Math.max(0, subtotal - discount + shippingCost),
  };
};
