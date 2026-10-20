const ars = new Intl.NumberFormat('es-AR', { maximumFractionDigits: 0 });

/** 84500 → "$ 84.500" (con espacio no separable, para que no se corte de línea) */
export const formatARS = (value: number) => `$\u00a0${ars.format(Math.round(value))}`;

/** 9200 → "$9,2k" (para botones compactos) */
export const formatARSCompact = (value: number) =>
  value >= 100000
    ? `$${Math.round(value / 1000)}k`
    : `$${(value / 1000).toLocaleString('es-AR', { maximumFractionDigits: 1 })}k`;
