import { useCallback, useEffect, useMemo, useState } from 'react';
import { FRAGRANCES } from '../data/fragrances';
import { priceFor } from '../lib/pricing';
import { storage } from '../lib/storage';
import type { CartItem, DecantFormat, Fragrance } from '../types';

const CART_KEY = 'mirage:cart:v1';
const WISHLIST_KEY = 'mirage:wishlist:v1';

/** Lo que se guarda en el navegador: solo ids, para que precios y fotos salgan siempre del catálogo vigente. */
interface StoredLine {
  fragranceId: string;
  format: DecantFormat;
  quantity: number;
}

const byId = new Map(FRAGRANCES.map((f) => [f.id, f]));

const hydrate = (lines: StoredLine[]): CartItem[] =>
  lines.flatMap((l) => {
    const fragrance = byId.get(l.fragranceId);
    if (!fragrance || !(l.quantity > 0)) return [];
    return [
      {
        id: `${l.fragranceId}-${l.format}`,
        fragranceId: l.fragranceId,
        fragrance,
        format: l.format,
        price: priceFor(fragrance, l.format),
        quantity: Math.min(99, Math.floor(l.quantity)),
      },
    ];
  });

export const useCart = () => {
  const [lines, setLines] = useState<StoredLine[]>(() => storage.get(CART_KEY, []));
  useEffect(() => storage.set(CART_KEY, lines), [lines]);

  const items = useMemo(() => hydrate(lines), [lines]);

  const add = useCallback((fragrance: Fragrance, format: DecantFormat) => {
    setLines((prev) => {
      const exists = prev.some((l) => l.fragranceId === fragrance.id && l.format === format);
      return exists
        ? prev.map((l) =>
            l.fragranceId === fragrance.id && l.format === format ? { ...l, quantity: l.quantity + 1 } : l
          )
        : [...prev, { fragranceId: fragrance.id, format, quantity: 1 }];
    });
  }, []);

  const setQuantity = useCallback((itemId: string, quantity: number) => {
    setLines((prev) =>
      prev
        .map((l) => (`${l.fragranceId}-${l.format}` === itemId ? { ...l, quantity } : l))
        .filter((l) => l.quantity > 0)
    );
  }, []);

  const remove = useCallback((itemId: string) => setQuantity(itemId, 0), [setQuantity]);
  const clear = useCallback(() => setLines([]), []);

  return { items, add, setQuantity, remove, clear };
};

export const useWishlist = () => {
  const [ids, setIds] = useState<string[]>(() => storage.get(WISHLIST_KEY, []));
  useEffect(() => storage.set(WISHLIST_KEY, ids), [ids]);

  const items = useMemo(() => ids.flatMap((id) => byId.get(id) ?? []), [ids]);
  const has = useCallback((id: string) => ids.includes(id), [ids]);

  /** Devuelve true si quedó agregado. */
  const toggle = useCallback(
    (fragrance: Fragrance) => {
      const adding = !ids.includes(fragrance.id);
      setIds((prev) => (adding ? [...prev, fragrance.id] : prev.filter((id) => id !== fragrance.id)));
      return adding;
    },
    [ids]
  );

  return { items, has, toggle };
};
