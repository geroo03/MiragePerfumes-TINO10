import React, { useState } from 'react';
import { SITE, type PaymentMethod, type ShippingOptionId } from '../../config/site';
import { useDialog } from '../../hooks/useDialog';
import { formatARS } from '../../lib/format';
import { cartTotals, formatLabel } from '../../lib/pricing';
import { storage } from '../../lib/storage';
import { buildOrderMessage, whatsappLink } from '../../lib/whatsapp';
import type { CartItem } from '../../types';

interface CartDrawerProps {
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
}

const CUSTOMER_KEY = 'mirage:customer:v1';

const OptionButton: React.FC<{
  active: boolean;
  onClick: () => void;
  title: string;
  hint: string;
  highlight?: boolean;
}> = ({ active, onClick, title, hint, highlight }) => (
  <button
    type="button"
    aria-pressed={active}
    onClick={onClick}
    className={`p-2.5 rounded-lg border text-left transition-all ${
      active ? 'bg-primary text-surface border-primary' : 'bg-surface text-primary border-outline-variant hover:border-primary'
    }`}
  >
    <span className="block font-bold">{title}</span>
    <span
      className={`block text-[10px] ${
        highlight ? (active ? 'text-secondary-container font-semibold' : 'text-secondary font-semibold') : 'opacity-90'
      }`}
    >
      {hint}
    </span>
  </button>
);

export const CartDrawer: React.FC<CartDrawerProps> = ({ onClose, items, onUpdateQuantity, onRemoveItem }) => {
  const panelRef = useDialog(onClose);
  const [payment, setPayment] = useState<PaymentMethod>('transferencia');
  const [shipping, setShipping] = useState<ShippingOptionId>(SITE.shippingOptions[0].id);
  const [customer, setCustomer] = useState(() => storage.get(CUSTOMER_KEY, { name: '', city: '' }));
  const [orderSent, setOrderSent] = useState(false);

  const t = cartTotals(items, payment, shipping);
  const discountPct = Math.round(SITE.transferDiscount * 100);

  const updateCustomer = (field: 'name' | 'city', value: string) => {
    const next = { ...customer, [field]: value };
    setCustomer(next);
    storage.set(CUSTOMER_KEY, next);
  };

  const handleCheckout = () => {
    window.open(whatsappLink(buildOrderMessage(items, payment, shipping, customer)), '_blank', 'noopener');
    setOrderSent(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-primary/60 backdrop-blur-sm flex justify-end animate-fadeIn" onClick={onClose}>
      <div
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        className="bg-surface w-full max-w-md h-full flex flex-col shadow-2xl border-l border-primary-container/20 text-on-surface relative animate-slideLeft outline-none"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 border-b border-outline-variant/50 bg-surface-container-low flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[24px] text-primary" aria-hidden>
              shopping_bag
            </span>
            <h2 id="cart-title" className="font-playfair text-xl font-bold text-primary">
              Tu bolsa ({t.itemCount})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-surface-container hover:bg-surface-container-high text-primary flex items-center justify-center transition-colors"
            aria-label="Cerrar bolsa"
          >
            ✕
          </button>
        </div>

        {items.length > 0 && (
          <div className="px-5 py-2.5 bg-secondary-container/60 border-b border-secondary/30 text-xs font-work text-primary">
            <p className="flex items-center gap-2">
              <span aria-hidden>✦</span>
              {t.freeShipping ? (
                <strong>¡Tenés envío bonificado a todo el país!</strong>
              ) : (
                <span>
                  Sumá {formatARS(t.missingForFreeShipping)} más para tener <strong>envío gratis</strong>.
                </span>
              )}
            </p>
            <div className="mt-1.5 h-1 rounded-full bg-surface/70 overflow-hidden" aria-hidden>
              <div
                className="h-full bg-secondary transition-all"
                style={{ width: `${Math.min(100, (t.subtotal / SITE.freeShippingThreshold) * 100)}%` }}
              />
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6">
              <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center text-secondary mb-3">
                <span className="material-symbols-outlined text-[32px]" aria-hidden>
                  science
                </span>
              </div>
              <p className="font-playfair text-lg text-primary font-semibold mb-1">Tu bolsa está vacía</p>
              <p className="font-garamond text-sm text-on-surface-variant max-w-xs mb-4">
                Explorá las joyas árabes y los decants para encontrar tu aroma ideal.
              </p>
              <a
                href="#/catalogo"
                onClick={onClose}
                className="px-5 py-2.5 bg-primary text-surface font-work text-xs uppercase tracking-wider rounded-lg font-semibold"
              >
                Ver catálogo
              </a>
            </div>
          ) : (
            <>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item.id} className="flex gap-3 p-3 bg-surface-container-low rounded-xl border border-outline-variant/40">
                    <img
                      src={item.fragrance.image}
                      alt=""
                      className="w-16 h-20 object-cover rounded-lg bg-surface-container shrink-0 border border-outline-variant/30"
                    />
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <span className="font-work text-[9px] uppercase tracking-wider text-secondary block">{item.fragrance.house}</span>
                          <h3 className="font-playfair text-sm font-bold text-primary line-clamp-1">{item.fragrance.name}</h3>
                          <span className="inline-block px-2 py-0.5 mt-1 bg-surface-container-high text-primary rounded text-[10px] font-work font-medium">
                            {formatLabel(item.format)}
                          </span>
                        </div>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="w-7 h-7 shrink-0 rounded-full text-outline hover:text-error hover:bg-surface-container text-xs"
                          aria-label={`Quitar ${item.fragrance.name} de la bolsa`}
                        >
                          ✕
                        </button>
                      </div>
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center border border-outline-variant rounded-md bg-surface">
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-7 text-sm text-primary hover:bg-surface-container-high"
                            aria-label="Restar una unidad"
                          >
                            −
                          </button>
                          <span className="w-6 text-center text-xs font-work font-bold text-primary" aria-live="polite">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, Math.min(99, item.quantity + 1))}
                            className="w-8 h-7 text-sm text-primary hover:bg-surface-container-high"
                            aria-label="Sumar una unidad"
                          >
                            +
                          </button>
                        </div>
                        <span className="font-work text-sm font-bold text-primary">{formatARS(item.price * item.quantity)}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <fieldset className="p-3 bg-surface-container rounded-xl border border-outline-variant/60">
                <legend className="sr-only">Método de pago</legend>
                <p className="font-work text-xs uppercase tracking-wider text-primary font-bold mb-2" aria-hidden>
                  Método de pago
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs font-work">
                  <OptionButton
                    active={payment === 'transferencia'}
                    onClick={() => setPayment('transferencia')}
                    title="Transferencia"
                    hint={`${discountPct}% OFF`}
                    highlight
                  />
                  <OptionButton
                    active={payment === 'mercadopago'}
                    onClick={() => setPayment('mercadopago')}
                    title="Mercado Pago"
                    hint={SITE.installmentsLabel}
                  />
                </div>
              </fieldset>

              <fieldset className="p-3 bg-surface-container rounded-xl border border-outline-variant/60">
                <legend className="sr-only">Envío</legend>
                <div className="flex items-center justify-between mb-2" aria-hidden>
                  <p className="font-work text-xs uppercase tracking-wider text-primary font-bold">Envío</p>
                  {t.freeShipping && <span className="text-[10px] text-secondary font-work font-bold uppercase">¡Bonificado!</span>}
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs font-work">
                  {SITE.shippingOptions.map((o) => (
                    <OptionButton
                      key={o.id}
                      active={shipping === o.id}
                      onClick={() => setShipping(o.id)}
                      title={o.label}
                      hint={t.freeShipping ? 'Gratis' : formatARS(o.cost)}
                    />
                  ))}
                </div>
              </fieldset>

              <div className="space-y-2">
                <label className="block">
                  <span className="font-work text-[10px] uppercase tracking-wider text-secondary">Tu nombre</span>
                  <input
                    type="text"
                    autoComplete="name"
                    placeholder="Para el remito"
                    value={customer.name}
                    onChange={(e) => updateCustomer('name', e.target.value)}
                    className="mt-0.5 w-full bg-surface-container-low border border-outline-variant rounded-lg px-3 py-2 text-sm font-garamond placeholder:italic focus:outline-none focus:border-primary"
                  />
                </label>
                <label className="block">
                  <span className="font-work text-[10px] uppercase tracking-wider text-secondary">Ciudad / provincia</span>
                  <input
                    type="text"
                    autoComplete="address-level2"
                    placeholder="Ej: CABA, Córdoba, Rosario"
                    value={customer.city}
                    onChange={(e) => updateCustomer('city', e.target.value)}
                    className="mt-0.5 w-full bg-surface-container-low border border-outline-variant rounded-lg px-3 py-2 text-sm font-garamond placeholder:italic focus:outline-none focus:border-primary"
                  />
                </label>
              </div>
            </>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-5 border-t border-outline-variant/60 bg-surface-container-low space-y-3 pb-safe">
            <dl className="space-y-1 text-xs font-work">
              <div className="flex justify-between text-on-surface-variant">
                <dt>Subtotal</dt>
                <dd>{formatARS(t.subtotal)}</dd>
              </div>
              {t.discount > 0 && (
                <div className="flex justify-between text-secondary font-bold">
                  <dt>Descuento transferencia (-{discountPct}%)</dt>
                  <dd>-{formatARS(t.discount)}</dd>
                </div>
              )}
              <div className="flex justify-between text-on-surface-variant">
                <dt>Envío</dt>
                <dd>{t.shippingCost === 0 ? '¡Gratis!' : formatARS(t.shippingCost)}</dd>
              </div>
              <div className="flex justify-between text-base font-bold text-primary pt-2 border-t border-outline-variant/40">
                <dt>Total</dt>
                <dd>{formatARS(t.total)} ARS</dd>
              </div>
            </dl>

            <button
              onClick={handleCheckout}
              className="w-full py-3.5 bg-primary hover:bg-primary-container text-surface rounded-xl font-work text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 shadow-md transition-all active:scale-98"
            >
              <span className="material-symbols-outlined text-[20px]" aria-hidden>
                chat
              </span>
              Confirmar pedido por WhatsApp
            </button>
            <p className="text-center font-garamond text-xs text-on-surface-variant italic" role="status">
              {orderSent
                ? 'Se abrió WhatsApp con tu pedido. Envialo y te confirmamos stock y datos de pago.'
                : 'Te confirmamos stock y datos de pago por WhatsApp antes de cobrar.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
