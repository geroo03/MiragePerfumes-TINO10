import { useEffect, useState } from 'react';

/**
 * Router mínimo basado en hash (#/catalogo/arabes?p=id).
 * GitHub Pages no reescribe rutas, así que el hash permite links compartibles
 * y el botón "atrás" del navegador sin configurar el servidor.
 */
export interface Route {
  path: string;
  segments: string[];
  params: URLSearchParams;
}

const parse = (): Route => {
  const raw = window.location.hash.replace(/^#/, '') || '/';
  const [pathPart, query = ''] = raw.split('?');
  const path = '/' + pathPart.split('/').filter(Boolean).join('/');
  return { path, segments: path.split('/').filter(Boolean), params: new URLSearchParams(query) };
};

export const useHashRoute = () => {
  const [route, setRoute] = useState(parse);
  useEffect(() => {
    const onChange = () => setRoute(parse());
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);
  return route;
};

export const navigate = (to: string, opts: { replace?: boolean } = {}) => {
  const hash = '#' + to;
  if (window.location.hash === hash) return;
  if (opts.replace) {
    window.history.replaceState(null, '', hash);
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  } else {
    window.location.hash = to;
  }
};

/** Atajos de navegación usados por header, footer y barra inferior. */
export const ROUTES = {
  home: '/',
  catalog: (category?: string) => (category && category !== 'all' ? `/catalogo/${category}` : '/catalogo'),
  decants: '/decants',
  wishlist: '/favoritos',
  about: '/nosotros',
  contact: '/contacto',
  terms: '/terminos',
  returns: '/devoluciones',
} as const;
