import React, { useState } from 'react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  if (!isOpen) return null;

  const [paymentMethod, setPaymentMethod] = useState<'transferencia' | 'mercadopago'>('transferencia');
  const [shippingMethod, setShippingMethod] = useState<'andreani' | 'correo'>('andreani');
  const [customerName, setCustomerName] = useState('');
  const [customerCity, setCustomerCity] = useState('');
  const [orderSent, setOrderSent] = useState(false);

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const transferDiscount = paymentMethod === 'transferencia' ? subtotal * 0.15 : 0;
  const isFreeShipping = subtotal >= 90000;
  const shippingCost = isFreeShipping ? 0 : shippingMethod === 'andreani' ? 4500 : 3800;
  const total = Math.max(0, subtotal - transferDiscount + shippingCost);

  const handleCheckoutWhatsApp = () => {
    let message = `*NUEVO PEDIDO - MIRAGE PARFUMS & DECANTS*%0A%0A`;
    if (customerName) message += `*Cliente:* ${encodeURIComponent(customerName)}%0A`;
    if (customerCity) message += `*Destino:* ${encodeURIComponent(customerCity)}%0A%0A`;
    message += `*Detalle de fragancias:*%0A`;

    items.forEach((item, index) => {
      const formatLabel = item.format === 'full' ? 'Botella Completa' : `Decant ${item.format}`;
      message += `${index + 1}. ${encodeURIComponent(item.fragrance.name)} (${formatLabel}) x${item.quantity} - $${(
        item.price * item.quantity
      ).toLocaleString('es-AR')} ARS%0A`;
    });

    message += `%0A*Subtotal:* $${subtotal.toLocaleString('es-AR')} ARS`;
    if (transferDiscount > 0) {
      message += `%0A*Descuento Transferencia (-15%):* -$${Math.round(transferDiscount).toLocaleString('es-AR')} ARS`;
    }
    message += `%0A*Envío (${shippingMethod === 'andreani' ? 'Andreani' : 'Correo Arg'}):* ${
      shippingCost === 0 ? 'GRATIS' : `$${shippingCost.toLocaleString('es-AR')} ARS`
    }`;
    message += `%0A*TOTAL A PAGAR:* $${Math.round(total).toLocaleString('es-AR')} ARS%0A`;
    message += `%0A*Forma de pago elegida:* ${
      paymentMethod === 'transferencia' ? 'Transferencia Bancaria (-15% aplicado)' : 'Mercado Pago / Cuotas'
    }%0A%0A_Aguardamos confirmación de stock y datos para transferencia._`;

    setOrderSent(true);
    window.open(`https://wa.me/?text=${message}`, '_blank');
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#28331a]/60 backdrop-blur-sm flex justify-end animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-[#fef9ed] w-full max-w-md h-full flex flex-col shadow-2xl border-l border-[#3e4a2f]/20 text-[#1d1c14] relative animate-slideLeft"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#c6c8bc]/50 bg-[#f8f3e7] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[24px] text-[#28331a]">shopping_bag</span>
            <h2 className="font-playfair text-xl font-bold text-[#28331a]">
              Bolsa del Atelier ({items.reduce((sum, i) => sum + i.quantity, 0)})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f3ede1] hover:bg-[#ede8dc] text-[#28331a] flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Cerrar bolsa"
          >
            ✕
          </button>
        </div>

        {/* Promo Notification */}
        <div className="px-5 py-2.5 bg-[#d6e5bb]/60 border-b border-[#566341]/30 flex items-center gap-2 text-xs font-work text-[#28331a]">
          <span className="text-sm">✦</span>
          <span>
            {isFreeShipping ? (
              <strong>¡Genial! Tenés envío express 100% bonificado.</strong>
            ) : (
              <span>
                Sumá ${(90000 - subtotal).toLocaleString('es-AR')} más para <strong>envío gratis</strong> a todo el país.
              </span>
            )}
          </span>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-[#76786e]">
              <div className="w-16 h-16 rounded-full bg-[#f3ede1] flex items-center justify-center text-[#566341] mb-3">
                <span className="material-symbols-outlined text-[32px]">science</span>
              </div>
              <p className="font-playfair text-lg text-[#28331a] font-semibold mb-1">
                Tu bolsa está vacía
              </p>
              <p className="font-garamond text-sm text-[#45483f] max-w-xs mb-4">
                Explorá nuestras joyas árabes y decants artesanales para descubrir tu aroma ideal.
              </p>
              <button
                onClick={onClose}
                className="px-5 py-2 bg-[#28331a] text-[#fef9ed] font-work text-xs uppercase tracking-wider rounded-lg font-semibold cursor-pointer"
              >
                Ver Catálogo
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex gap-3 p-3 bg-[#f8f3e7] rounded-xl border border-[#c6c8bc]/40 shadow-2xs"
              >
                <img
                  src={item.fragrance.image}
                  alt={item.fragrance.name}
                  className="w-16 h-20 object-cover rounded-lg bg-[#f3ede1] shrink-0 border border-[#c6c8bc]/30"
                />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="font-work text-[9px] uppercase tracking-wider text-[#566341] block">
                          {item.fragrance.house}
                        </span>
                        <h4 className="font-playfair text-sm font-bold text-[#28331a] line-clamp-1">
                          {item.fragrance.name}
                        </h4>
                      </div>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-[#76786e] hover:text-[#ba1a1a] p-0.5 text-xs"
                        aria-label="Eliminar producto"
                      >
                        ✕
                      </button>
                    </div>

                    <span className="inline-block px-2 py-0.5 mt-1 bg-[#ede8dc] text-[#28331a] rounded text-[10px] font-work font-medium">
                      {item.format === 'full' ? 'Botella completa' : `Decant ${item.format}`}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    {/* Quantity Stepper */}
                    <div className="flex items-center border border-[#c6c8bc] rounded-md bg-[#fef9ed]">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="px-2 py-0.5 text-xs text-[#28331a] hover:bg-[#ede8dc] cursor-pointer"
                      >
                        -
                      </button>
                      <span className="px-2 text-xs font-work font-bold text-[#28331a]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-0.5 text-xs text-[#28331a] hover:bg-[#ede8dc] cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    <div className="font-work text-sm font-bold text-[#28331a]">
                      ${(item.price * item.quantity).toLocaleString('es-AR')}{' '}
                      <span className="text-[9px] font-normal">ARS</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}

          {items.length > 0 && (
            <div className="pt-2 space-y-4">
              {/* Payment selector */}
              <div className="p-3 bg-[#f3ede1] rounded-xl border border-[#c6c8bc]/60">
                <span className="font-work text-xs uppercase tracking-wider text-[#28331a] font-bold block mb-2">
                  Método de Pago
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs font-work">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('transferencia')}
                    className={`p-2 rounded-lg border text-left cursor-pointer transition-all ${
                      paymentMethod === 'transferencia'
                        ? 'bg-[#28331a] text-[#fef9ed] border-[#28331a]'
                        : 'bg-[#fef9ed] text-[#28331a] border-[#c6c8bc]'
                    }`}
                  >
                    <div className="font-bold">Transferencia</div>
                    <div className="text-[10px] opacity-90 text-[#d6e5bb] font-semibold">
                      15% OFF Directo
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('mercadopago')}
                    className={`p-2 rounded-lg border text-left cursor-pointer transition-all ${
                      paymentMethod === 'mercadopago'
                        ? 'bg-[#28331a] text-[#fef9ed] border-[#28331a]'
                        : 'bg-[#fef9ed] text-[#28331a] border-[#c6c8bc]'
                    }`}
                  >
                    <div className="font-bold">Mercado Pago</div>
                    <div className="text-[10px] opacity-90">3 y 6 Cuotas</div>
                  </button>
                </div>
              </div>

              {/* Shipping method */}
              <div className="p-3 bg-[#f3ede1] rounded-xl border border-[#c6c8bc]/60">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-work text-xs uppercase tracking-wider text-[#28331a] font-bold">
                    Empresa de Envío
                  </span>
                  {isFreeShipping && (
                    <span className="text-[10px] text-[#566341] font-work font-bold uppercase">
                      ¡Bonificado!
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs font-work">
                  <button
                    type="button"
                    onClick={() => setShippingMethod('andreani')}
                    className={`p-2 rounded-lg border text-left cursor-pointer transition-all ${
                      shippingMethod === 'andreani'
                        ? 'bg-[#28331a] text-[#fef9ed] border-[#28331a]'
                        : 'bg-[#fef9ed] text-[#28331a] border-[#c6c8bc]'
                    }`}
                  >
                    <div className="font-bold">Andreani Express</div>
                    <div className="text-[10px] opacity-90">
                      {isFreeShipping ? 'Gratis' : '$4.500 ARS'}
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setShippingMethod('correo')}
                    className={`p-2 rounded-lg border text-left cursor-pointer transition-all ${
                      shippingMethod === 'correo'
                        ? 'bg-[#28331a] text-[#fef9ed] border-[#28331a]'
                        : 'bg-[#fef9ed] text-[#28331a] border-[#c6c8bc]'
                    }`}
                  >
                    <div className="font-bold">Correo Argentino</div>
                    <div className="text-[10px] opacity-90">
                      {isFreeShipping ? 'Gratis' : '$3.800 ARS'}
                    </div>
                  </button>
                </div>
              </div>

              {/* Optional customer name & city */}
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Tu nombre (opcional para el remito)"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-[#f8f3e7] border border-[#c6c8bc] rounded-lg px-3 py-1.5 text-xs font-garamond placeholder:italic focus:outline-none focus:border-[#28331a]"
                />
                <input
                  type="text"
                  placeholder="Ciudad / Provincia (ej. CABA, Córdoba, Rosario)"
                  value={customerCity}
                  onChange={(e) => setCustomerCity(e.target.value)}
                  className="w-full bg-[#f8f3e7] border border-[#c6c8bc] rounded-lg px-3 py-1.5 text-xs font-garamond placeholder:italic focus:outline-none focus:border-[#28331a]"
                />
              </div>
            </div>
          )}
        </div>

        {/* Drawer Footer / Calculation & Checkout */}
        {items.length > 0 && (
          <div className="p-5 border-t border-[#c6c8bc]/60 bg-[#f8f3e7] space-y-3">
            <div className="space-y-1 text-xs font-work">
              <div className="flex justify-between text-[#45483f]">
                <span>Subtotal</span>
                <span>$ {subtotal.toLocaleString('es-AR')} ARS</span>
              </div>
              {transferDiscount > 0 && (
                <div className="flex justify-between text-[#566341] font-bold">
                  <span>Descuento Transferencia (-15%)</span>
                  <span>-$ {Math.round(transferDiscount).toLocaleString('es-AR')} ARS</span>
                </div>
              )}
              <div className="flex justify-between text-[#45483f]">
                <span>Envío ({shippingMethod === 'andreani' ? 'Andreani' : 'Correo Arg'})</span>
                <span>{shippingCost === 0 ? '¡GRATIS!' : `$ ${shippingCost.toLocaleString('es-AR')} ARS`}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-[#28331a] pt-2 border-t border-[#c6c8bc]/40">
                <span>Total a Pagar</span>
                <span>$ {Math.round(total).toLocaleString('es-AR')} ARS</span>
              </div>
            </div>

            <button
              onClick={handleCheckoutWhatsApp}
              className="w-full py-3.5 bg-[#28331a] hover:bg-[#3e4a2f] text-[#fef9ed] rounded-xl font-work text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 shadow-md transition-all active:scale-98 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">chat</span>
              <span>Encargar vía WhatsApp</span>
            </button>

            {orderSent && (
              <p className="text-center font-garamond text-xs text-[#566341] italic">
                ¡Mensaje generado! Se abrió WhatsApp para confirmar con el asesor del atelier.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
