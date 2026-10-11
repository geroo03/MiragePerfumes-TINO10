export type FragranceCategory = 
  | 'all' 
  | 'arabes' 
  | 'decants' 
  | 'disenador' 
  | 'masculinos' 
  | 'femeninos' 
  | 'unisex';

export type DecantFormat = '5ml' | '10ml' | 'full';

export interface OlfactoryPyramid {
  salida: string[];  // Top notes
  corazon: string[]; // Heart notes
  fondo: string[];   // Base notes
}

export interface Fragrance {
  id: string;
  name: string;
  house: string;
  badge?: 'Best Seller' | 'Tendencia' | 'Más Reseñado' | 'Exclusivo' | 'Novedad';
  category: FragranceCategory[];
  gender: 'Masculino' | 'Femenino' | 'Unisex';
  shortNotes: string;
  description: string;
  image: string;
  imageAlt?: string;
  fullBottlePrice: number;
  decant5mlPrice: number;
  decant10mlPrice: number;
  batchCode: string;
  concentration: 'Extrait de Parfum' | 'Eau de Parfum' | 'Parfum' | 'Eau de Toilette';
  origin: string;
  pyramid: OlfactoryPyramid;
  longevity: string; // e.g. "10-12 hrs"
  sillage: 'Moderada' | 'Pesada' | 'Enorme' | 'Íntima';
  occasion: string;
  season: string[];
}

export interface CartItem {
  id: string; // unique cart item id
  fragranceId: string;
  fragrance: Fragrance;
  format: DecantFormat;
  price: number;
  quantity: number;
}
