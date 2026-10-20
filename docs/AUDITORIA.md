# Auditoría visual y funcional · Mirage Parfums

Fecha: octubre 2026 · Revisado en escritorio (1366 px) y celular (390 px), sección por sección.

Severidad: 🔴 bloquea la venta o engaña al cliente · 🟠 se nota y resta confianza · 🟡 detalle de calidad.

## Resumen

| Estado          | Cantidad |
| --------------- | -------- |
| Corregido       | 40       |
| Pendiente (requiere al dueño) | 5 |

Los pendientes son de **contenido**, no de código: fotos reales, precios y revisión legal.

---

## Pendientes del dueño (antes de lanzar)

| # | Sev. | Hallazgo | Qué hacer |
| - | ---- | -------- | --------- |
| P2 | 🔴 | **La foto de "Creed Aventus Millésime" muestra un Armaf Club de Nuit Intense** (otro producto, otra marca). | Reemplazar `public/img/aventus-millesime.jpg` por la foto real. |
| P3 | 🟠 | **La foto de "Bade'e Al Oud" muestra un frasco que dice "Royal Oud".** "Amber Oud Gold" muestra tres frascos genéricos. | Fotos reales de cada producto. |
| P4 | 🟠 | **Todas las fotos son de 512 px** y varias salen de capturas de un mockup web (recortadas en esta revisión). Se ven pixeladas en pantallas grandes. "Aurélia Essence d'Ambre" de "Mirage Atelier" parece un producto inventado por el generador de diseño. | Fotos propias de al menos 1200 px. Confirmar si Aurélia existe; si no, sacarla del catálogo. |
| P5 | 🟠 | Precios, longevidad y "batch codes" del catálogo son de ejemplo. | Cargar datos reales en `src/data/fragrances.ts`. |
| P6 | 🟡 | Textos legales redactados como base (Ley 24.240, Res. 424/2020, Ley 25.326). | Revisarlos con un contador o abogado. |

---

## Hallazgos por sección (corregidos)

### Global

| Sev. | Antes | Ahora |
| ---- | ----- | ----- |
| 🔴 | **No había número de WhatsApp**: los pedidos abrían WhatsApp sin destinatario. | Cargado el número de Tino (+54 9 3855 71-5010). |
| 🔴 | El **mensaje de pedido se cortaba** en el "&" de "MIRAGE PARFUMS & DECANTS": el vendedor recibía solo el título, sin productos ni total. | El mensaje se codifica completo. Hay un test que lo verifica. |
| 🔴 | La bolsa arrancaba con **2 productos de ejemplo** y favoritos con 2 perfumes. | Arrancan vacíos. |
| 🔴 | Las imágenes dependían de URLs temporales de Google AI Studio; **el logo ya estaba caído**. | Todas las imágenes están en el repo (`public/img/`). |
| 🟠 | Al recargar se perdían la bolsa y los favoritos. | Se guardan en el navegador. Precios y fotos se toman siempre del catálogo vigente. |
| 🟠 | Sin URLs: no se podía compartir un perfume, y el botón "atrás" sacaba del sitio. | Rutas con hash; cada ficha tiene link propio y botón de compartir. |
| 🟠 | Las animaciones (`animate-fadeIn`, `scaleIn`, etc.) no existían: los modales aparecían de golpe. | Definidas en `index.css`; respetan "reducir movimiento". |
| 🟠 | Zoom bloqueado en celular (`user-scalable=no`), un problema de accesibilidad. | Zoom habilitado. |
| 🟡 | 733 colores escritos a mano (`#28331a`…) aunque el tema ya tenía tokens. | Todo usa tokens (`bg-primary`, `text-secondary`…). Cambiar la paleta es editar un solo lugar. |
| 🟡 | Sin favicon, sin imagen para compartir en redes ni datos estructurados. | Favicon, Open Graph y JSON-LD de tienda. |
| 🟡 | Se cargaba la fuente completa de Material Symbols (miles de íconos). | Solo los 24 íconos que se usan. |
| 🟡 | Modales sin `role="dialog"`, sin cierre con Escape, con el fondo scrolleando por detrás. | Los cuatro modales y la bolsa tienen las tres cosas, y devuelven el foco al cerrar. |
| 🟡 | Dependencias sin uso (Gemini, Express, dotenv, motion, lucide). | Eliminadas. |

### Header y navegación

| Sev. | Antes | Ahora |
| ---- | ----- | ----- |
| 🟠 | A 1280 px el logo se superponía con "INICIO". | Logo tipográfico; la navegación ya no se pisa. |
| 🟠 | "Mi perfil" abría una cuenta falsa ("Cliente Distinguido") sin login. | Eliminado. En celular su lugar lo ocupa "Bolsa", que es lo que se busca. |
| 🟡 | Favoritos con corazón arriba y marcador abajo (íconos distintos para lo mismo). | Corazón en ambos. |
| 🟡 | "Sobre Nosotros" partido en dos líneas. | "Nosotros", en una línea. |

### Hero

| Sev. | Antes | Ahora |
| ---- | ----- | ----- |
| 🟠 | La imagen de escritorio era **una captura de una página web** ("Inicio · Colección · Sobre Nosotros…" dentro del óvalo). | Foto limpia del frasco. |

### Filtros por categoría

| Sev. | Antes | Ahora |
| ---- | ----- | ----- |
| 🟠 | La barra quedaba fija en **todo** el inicio, hasta el footer, ocupando pantalla en celular. | En el inicio no queda fija; en el catálogo sí. |
| 🟡 | En escritorio quedaba parcialmente debajo del header (offset de 80 px contra un header de 100 px). | Alineada exactamente bajo el header. |

### Tarjetas de producto

| Sev. | Antes | Ahora |
| ---- | ----- | ----- |
| 🟠 | Fotos con barras de navegación de mockup (Khamrah, Club de Nuit). | Recortadas. |
| 🟡 | En celular el botón "Elegir formato" se partía en dos líneas. | "Agregar", en una línea. |
| 🟡 | Nombres largos cortados con "…" ("Club de Nuit…", "Aurélia Essence…"). | Hasta 2 líneas. |
| 🟡 | Imagen y título clickeables sin ser botones (sin teclado ni lector de pantalla). | Son botones con su etiqueta. |

### Ficha de producto

| Sev. | Antes | Ahora |
| ---- | ----- | ----- |
| 🟠 | Mostraba un "Batch Code" inventado como si fuera dato del lote. | Reemplazado por la concentración. |
| 🟡 | En celular el botón de compra quedaba al final del scroll. | La ficha abre como hoja desde abajo, con el botón siempre visible. |

### Bolsa / checkout

| Sev. | Antes | Ahora |
| ---- | ----- | ----- |
| 🟠 | "15% OFF" de Transferencia era **verde claro sobre crema** (casi invisible) cuando no estaba seleccionada. | Contraste correcto en ambos estados. |
| 🟡 | Botones −/+ de 20 px, difíciles de tocar. | Más grandes y con etiqueta. |
| 🟡 | Había que volver a escribir el nombre y la ciudad en cada pedido. | Se recuerdan. |
| 🟡 | — | Barra de progreso hacia el envío gratis. |

### Sección decants

| Sev. | Antes | Ahora |
| ---- | ----- | ----- |
| 🟠 | "Desde $ 7.500" y "Desde $ 13.900" escritos a mano, pero el más barato del catálogo es $ 8.100 / $ 14.800 (**precio que no existía**). | Se calculan del catálogo. |

### Test olfativo

| Sev. | Antes | Ahora |
| ---- | ----- | ----- |
| 🟡 | Elegía el resultado por posición en la lista: si se reordenaba el catálogo, recomendaba otro perfume. | Elige por id. |

### Perfil / validador de lote

| Sev. | Antes | Ahora |
| ---- | ----- | ----- |
| 🔴 | El "Validador de Batch Code" **daba "Verificado – Autenticidad garantizada 100%" para cualquier texto**. Es una garantía falsa frente al cliente. | Eliminado. En "Compromisos" se invita a verificar el batch code en CheckFresh. |

### Instagram

| Sev. | Antes | Ahora |
| ---- | ----- | ----- |
| 🟠 | Una de las fotos era una laptop mostrando un mockup web. | Recortada a la foto del lacrado. |
| 🟡 | El visor decía "Lote Verificado" en fotos ilustrativas. | Quitado. |

### Footer y legales

| Sev. | Antes | Ahora |
| ---- | ----- | ----- |
| 🔴 | "Términos" y "Políticas de devolución" llevaban a una **página en blanco**. | Páginas reales. |
| 🔴 | Faltaba el **Botón de arrepentimiento**, obligatorio para tiendas online en Argentina (Res. 424/2020). | Agregado en el footer, con su página. También el link a Defensa del Consumidor. |
| 🟠 | El newsletter "suscribía" sin guardar el email en ningún lado. | Reemplazado por la lista de difusión de WhatsApp, que sí funciona sin backend. |
| 🟡 | © 2025 fijo. | Año automático. |
| 🟡 | El botón flotante de WhatsApp tapaba los últimos links. | Más espacio inferior. |

---

## Cómo se verificó

- Chequeo de tipos y build sin errores.
- 10 tests unitarios: precios, descuentos, envío gratis, consistencia del catálogo y mensaje de WhatsApp.
- 19 verificaciones de punta a punta en Chrome, también sobre el sitio publicado: bolsa vacía al inicio, agregar desde tarjeta y ficha, URL de la ficha, Escape, link directo, persistencia al recargar, mensaje completo al número de WhatsApp, búsqueda sin tildes ("cafe" encuentra "Café"), 5 páginas, 2 casos de 404 y el test olfativo. Sin errores de consola ni recursos caídos.
