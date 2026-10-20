import { SITE, type PaymentMethod, type ShippingOptionId } from '../config/site';
import type { CartItem } from '../types';
import { formatARS } from './format';
import { cartTotals, formatLabel } from './pricing';

/** Link a WhatsApp con el texto ya codificado (incluye &, %, saltos de línea, etc.). */
export const whatsappLink = (text: string) =>
  `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(text)}`;

export interface OrderCustomer {
  name: string;
  city: string;
}

export const buildOrderMessage = (
  items: CartItem[],
  payment: PaymentMethod,
  shipping: ShippingOptionId,
  customer: OrderCustomer
) => {
  const t = cartTotals(items, payment, shipping);
  const shippingOption = SITE.shippingOptions.find((o) => o.id === shipping) ?? SITE.shippingOptions[0];
  const discountPct = Math.round(SITE.transferDiscount * 100);

  const lines = [`*NUEVO PEDIDO · ${SITE.name.toUpperCase()}*`, ''];
  if (customer.name.trim()) lines.push(`*Cliente:* ${customer.name.trim()}`);
  if (customer.city.trim()) lines.push(`*Destino:* ${customer.city.trim()}`);
  if (customer.name.trim() || customer.city.trim()) lines.push('');

  lines.push('*Detalle:*');
  items.forEach((item, i) => {
    lines.push(
      `${i + 1}. ${item.fragrance.house} ${item.fragrance.name} (${formatLabel(item.format)}) x${item.quantity} — ${formatARS(
        item.price * item.quantity
      )}`
    );
  });

  lines.push('', `*Subtotal:* ${formatARS(t.subtotal)}`);
  if (t.discount > 0) lines.push(`*Descuento transferencia (-${discountPct}%):* -${formatARS(t.discount)}`);
  lines.push(
    t.isPickup
      ? `*Entrega:* ${shippingOption.label} (a coordinar)`
      : `*Envío (${shippingOption.label}):* ${t.shippingCost === 0 ? 'Bonificado' : formatARS(t.shippingCost)}`
  );
  lines.push(`*TOTAL:* ${formatARS(t.total)} ARS`, '');
  const paymentLabel = SITE.paymentMethods.find((m) => m.id === payment)?.label ?? payment;
  lines.push(
    `*Pago:* ${paymentLabel}${t.discount > 0 ? ` (-${discountPct}% aplicado)` : ''}`,
    '',
    '_Quedo a la espera de la confirmación de stock y los datos de pago._'
  );
  return lines.join('\n');
};
