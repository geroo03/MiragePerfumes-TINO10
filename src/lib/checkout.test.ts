import { describe, expect, it } from 'vitest';
import { SITE } from '../config/site';
import { FRAGRANCES } from '../data/fragrances';
import type { CartItem, DecantFormat } from '../types';
import { formatARS, formatARSCompact } from './format';
import { cartTotals, minPrice, priceFor } from './pricing';
import { buildOrderMessage, whatsappLink } from './whatsapp';

const line = (index: number, format: DecantFormat, quantity: number): CartItem => {
  const fragrance = FRAGRANCES[index];
  return { id: `${fragrance.id}-${format}`, fragranceId: fragrance.id, fragrance, format, price: priceFor(fragrance, format), quantity };
};

describe('formato de precios', () => {
  it('usa separador de miles argentino', () => {
    expect(formatARS(84500)).toBe('$\u00a084.500');
    expect(formatARS(1234567.6)).toBe('$\u00a01.234.568');
  });
  it('compacta precios para botones chicos', () => {
    expect(formatARSCompact(9200)).toBe('$9,2k');
    expect(formatARSCompact(420000)).toBe('$420k');
  });
});

describe('totales del carrito', () => {
  it('aplica descuento por transferencia y cobra envío bajo el mínimo', () => {
    const items = [line(0, '5ml', 2)]; // 2 x 9.200
    const t = cartTotals(items, 'transferencia', 'andreani');
    expect(t.subtotal).toBe(18400);
    expect(t.discount).toBe(Math.round(18400 * SITE.transferDiscount));
    expect(t.shippingCost).toBe(4500);
    expect(t.total).toBe(18400 - t.discount + 4500);
    expect(t.missingForFreeShipping).toBe(SITE.freeShippingThreshold - 18400);
  });

  it('no descuenta con Mercado Pago', () => {
    const t = cartTotals([line(0, '5ml', 1)], 'mercadopago', 'correo');
    expect(t.discount).toBe(0);
    expect(t.shippingCost).toBe(3800);
  });

  it('bonifica el envío desde el mínimo', () => {
    const t = cartTotals([line(0, 'full', 2)], 'mercadopago', 'andreani'); // 169.000
    expect(t.freeShipping).toBe(true);
    expect(t.shippingCost).toBe(0);
    expect(t.missingForFreeShipping).toBe(0);
  });

  it('carrito vacío no cobra envío', () => {
    expect(cartTotals([], 'transferencia', 'andreani').total).toBe(0);
  });
});

describe('catálogo', () => {
  it('los ids son únicos y todos los precios son positivos', () => {
    expect(new Set(FRAGRANCES.map((f) => f.id)).size).toBe(FRAGRANCES.length);
    for (const f of FRAGRANCES) {
      expect(f.decant5mlPrice).toBeGreaterThan(0);
      expect(f.decant10mlPrice).toBeGreaterThan(f.decant5mlPrice);
      expect(f.fullBottlePrice).toBeGreaterThan(f.decant10mlPrice);
    }
  });
  it('calcula el "desde" del catálogo real', () => {
    expect(minPrice(FRAGRANCES, '5ml')).toBe(Math.min(...FRAGRANCES.map((f) => f.decant5mlPrice)));
  });
});

describe('pedido por WhatsApp', () => {
  const items = [line(0, '5ml', 1), line(1, '10ml', 2)];
  const msg = buildOrderMessage(items, 'transferencia', 'andreani', { name: 'Ana & Co', city: 'Córdoba' });

  it('incluye cliente, productos y total', () => {
    expect(msg).toContain('Ana & Co');
    expect(msg).toContain('Córdoba');
    expect(msg).toContain('Khamrah Qahwa (Decant 5 ml) x1');
    expect(msg).toContain('9 PM Pour Homme (Decant 10 ml) x2');
    expect(msg).toContain(formatARS(cartTotals(items, 'transferencia', 'andreani').total));
  });

  it('el link conserva el mensaje completo (no se corta en & ni %)', () => {
    const url = new URL(whatsappLink(msg));
    expect(url.searchParams.get('text')).toBe(msg);
  });
});
