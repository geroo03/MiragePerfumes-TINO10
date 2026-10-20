# Mirage Parfums & Decants

Tienda online de perfumería árabe y de diseñador, con decants de 5 y 10 ml. Santiago del Estero, envíos a todo el país.
Sitio estático (React + Vite + Tailwind 4) publicado en GitHub Pages. Los pedidos se cierran por WhatsApp.

**Sitio:** https://geroo03.github.io/MiragePerfumes-TINO10/

## Cómo funciona la compra

1. El cliente arma la bolsa (se guarda en su navegador, aunque cierre la página).
2. Elige pago (efectivo o transferencia) y entrega (retiro en Santiago del Estero, Andreani o Correo Argentino).
3. "Confirmar pedido por WhatsApp" abre un chat con el detalle completo y el total.
4. El vendedor confirma stock y coordina el pago y la entrega.

No hay backend ni base de datos: no hay nada que mantener ni pagar aparte del dominio, si se usa uno.

## Antes de lanzar (checklist)

- [x] **Número de WhatsApp** cargado en `src/config/site.ts` → `whatsappNumber`.
- [ ] **Fotos reales** de cada producto en `public/img/` (ver [docs/AUDITORIA.md](docs/AUDITORIA.md): hoy hay fotos que no corresponden al producto).
- [ ] **Catálogo completo**, con precios y stock reales, en `src/data/fragrances.ts`. Hoy hay 6 perfumes de ejemplo (5 árabes y 1 de diseñador).
- [ ] Revisar los textos legales (`src/pages/LegalPage.tsx`) con un asesor.
- [ ] Opcional: `email` en `src/config/site.ts` (aparece en Contacto y en el botón de arrepentimiento).
- [ ] Opcional: dominio propio (GitHub → Settings → Pages → Custom domain) y actualizar las URLs de `index.html`.

## Cambios frecuentes

| Quiero cambiar…                         | Archivo                     |
| --------------------------------------- | --------------------------- |
| WhatsApp, Instagram, horarios, email    | `src/config/site.ts`        |
| Medios de pago, descuento (hoy 0), envío gratis, costos | `src/config/site.ts` |
| Productos, precios, notas, fotos        | `src/data/fragrances.ts`    |
| Fotos                                   | `public/img/`               |
| Colores de la marca                     | `src/index.css` (`@theme`)  |
| Textos legales                          | `src/pages/LegalPage.tsx`   |

Para sumar un producto: copiá un bloque de `FRAGRANCES`, cambiale el `id` (único, sin espacios) y subí su foto a `public/img/`.

## Estructura

```
src/
  config/site.ts        datos del negocio (un solo lugar)
  data/fragrances.ts    catálogo, fotos de Instagram y formatos
  lib/                  lógica pura: precios, totales, mensaje de WhatsApp, formato ARS (+ tests)
  hooks/                router por hash, carrito/favoritos persistentes, comportamiento de modales
  pages/                Inicio, Catálogo, Favoritos, Nosotros, Contacto, Legales, 404
  components/
    layout/             Header, Footer, barra inferior, botón de WhatsApp, avisos
    home/               secciones del inicio
    catalog/            tarjetas, grilla y filtros
    overlays/           ficha de producto, bolsa, favoritos, test olfativo
```

Rutas (compartibles): `#/`, `#/catalogo`, `#/catalogo/arabes`, `#/decants`, `#/favoritos`, `#/nosotros`, `#/contacto`, `#/terminos`, `#/devoluciones`. Una ficha se comparte con `?p=<id>`, por ejemplo `#/catalogo?p=lattafa-khamrah-qahwa`.

## Desarrollo

```bash
npm ci
npm run dev      # http://localhost:3000
npm test         # tests de precios, totales y mensaje de pedido
npm run lint     # chequeo de tipos
npm run build
```

Cada push a `main` corre chequeo de tipos, tests y build, y publica en GitHub Pages (`.github/workflows/deploy.yml`). Si algo falla, no se publica.
