import React, { useState } from 'react';

interface FooterProps {
  onNavigate: (tab: string, category?: any) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim().includes('@')) {
      setSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="w-full bg-[#28331a] text-[#f8f3e7] border-t border-[#3e4a2f]">
      <div className="max-w-7xl mx-auto px-5 md:px-8 pt-12 md:pt-16 pb-20 md:pb-12">
        {/* 4-column layout on Desktop, stacked on Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 mb-12">
          {/* Column 1: Brand Essence */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[#dce6ca] text-xs">✦</span>
              <h4 className="font-playfair text-xl md:text-2xl font-bold tracking-widest uppercase text-[#fef9ed]">
                Mirage
              </h4>
              <span className="text-[#dce6ca] text-xs">✦</span>
            </div>
            <p className="font-work text-[10px] tracking-[0.2em] uppercase text-[#c0caaf] mb-3">
              Parfums &amp; Decants
            </p>
            <p className="font-garamond text-sm text-[#dce6ca]/90 leading-relaxed italic mb-4">
              Atelier de perfumería nicho y de autor. Curaduría artesanal de frascos completos y decants macerados traídos a Buenos Aires.
            </p>
            <div className="flex items-center gap-2 font-work text-xs text-[#fef9ed]">
              <span className="material-symbols-outlined text-[16px] text-[#dce6ca]">photo_camera</span>
              <a
                href="https://instagram.com/its.miragee_"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#dce6ca] transition-colors underline underline-offset-4 decoration-[#566341]"
              >
                @its.miragee_
              </a>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4 className="font-work text-xs uppercase tracking-[0.16em] text-[#fef9ed] font-semibold mb-4 flex items-center gap-1.5">
              <span className="text-[10px] text-[#dce6ca]">✦</span> Navegación
            </h4>
            <ul className="space-y-2 font-garamond text-sm text-[#dce6ca]">
              <li>
                <button
                  onClick={() => onNavigate('atelier')}
                  className="hover:text-[#fef9ed] transition-colors text-left cursor-pointer"
                >
                  Inicio
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('catalogo', 'all')}
                  className="hover:text-[#fef9ed] transition-colors text-left cursor-pointer"
                >
                  Catálogo Completo
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('catalogo', 'arabes')}
                  className="hover:text-[#fef9ed] transition-colors text-left cursor-pointer"
                >
                  Colección Árabe &amp; Attars
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('catalogo', 'decants')}
                  className="hover:text-[#fef9ed] transition-colors text-left cursor-pointer"
                >
                  Muestras &amp; Decants (5ml / 10ml)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('catalogo', 'disenador')}
                  className="hover:text-[#fef9ed] transition-colors text-left cursor-pointer"
                >
                  Perfumistas de Diseñador
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('sobre-nosotros')}
                  className="hover:text-[#fef9ed] transition-colors text-left cursor-pointer"
                >
                  El Manifiesto Mirage
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: La Gazeta Olfativa */}
          <div>
            <h4 className="font-work text-xs uppercase tracking-[0.16em] text-[#fef9ed] font-semibold mb-4 flex items-center gap-1.5">
              <span className="text-[10px] text-[#dce6ca]">✦</span> La Gazeta Olfativa
            </h4>
            <p className="font-garamond text-sm text-[#dce6ca] leading-relaxed mb-3">
              Recibí novedades sobre lanzamientos de lotes exclusivos, maceraciones y guías de acordes aromáticos.
            </p>
            {subscribed ? (
              <div className="p-3 bg-[#3e4a2f] rounded-lg border border-[#566341] text-[#fef9ed] text-xs font-work flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-[#d6e5bb]">check_circle</span>
                <span>¡Gracias por sumarte a la gazeta del atelier!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Ingresá tu correo electrónico"
                  required
                  className="bg-[#2a3320] border border-[#566341] text-[#fef9ed] px-3 py-2 rounded-lg font-garamond text-sm placeholder:italic placeholder:text-[#c0caaf]/70 focus:outline-none focus:border-[#dce6ca]"
                />
                <button
                  type="submit"
                  className="bg-[#d6e5bb] hover:bg-[#d9e8c3] text-[#28331a] transition-colors font-work text-[11px] uppercase tracking-wider py-2 rounded-lg font-bold cursor-pointer"
                >
                  Suscribirme
                </button>
              </form>
            )}
          </div>

          {/* Column 4: Envíos & Métodos */}
          <div>
            <h4 className="font-work text-xs uppercase tracking-[0.16em] text-[#fef9ed] font-semibold mb-4 flex items-center gap-1.5">
              <span className="text-[10px] text-[#dce6ca]">✦</span> Envíos &amp; Métodos
            </h4>
            <p className="font-garamond text-sm text-[#dce6ca] leading-relaxed mb-3">
              Envíos asegurados a toda la República Argentina. Empaque amortiguado grado farmacéutico.
            </p>
            <div className="flex flex-wrap gap-1.5">
              <span className="px-2.5 py-1 bg-[#2a3320] text-[#ede8dc] font-work text-[10px] rounded border border-[#566341]">
                Andreani Express
              </span>
              <span className="px-2.5 py-1 bg-[#2a3320] text-[#ede8dc] font-work text-[10px] rounded border border-[#566341]">
                Correo Argentino
              </span>
              <span className="px-2.5 py-1 bg-[#3e4a2f] text-[#d6e5bb] font-work text-[10px] font-bold rounded border border-[#d6e5bb]/40">
                Transferencia (-15%)
              </span>
              <span className="px-2.5 py-1 bg-[#2a3320] text-[#ede8dc] font-work text-[10px] rounded border border-[#566341]">
                Mercado Pago
              </span>
              <span className="px-2.5 py-1 bg-[#2a3320] text-[#ede8dc] font-work text-[10px] rounded border border-[#566341]">
                3 y 6 Cuotas
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#3e4a2f] pt-6 flex flex-col md:flex-row items-center justify-between text-[#c0caaf] gap-3 text-center md:text-left">
          <p className="font-garamond text-sm">
            © 2025 Mirage Parfums &amp; Decants. Buenos Aires, Argentina. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-4 font-work text-xs">
            <button
              onClick={() => onNavigate('terminos')}
              className="hover:text-[#fef9ed] transition-colors cursor-pointer"
            >
              Términos &amp; Condiciones
            </button>
            <span className="text-[#566341]">✦</span>
            <button
              onClick={() => onNavigate('politicas')}
              className="hover:text-[#fef9ed] transition-colors cursor-pointer"
            >
              Políticas de Devolución
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
