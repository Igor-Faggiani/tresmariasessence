export type CategoryId = "body-splash" | "velas" | "wax-melts" | "kits";

export interface Category {
  id: CategoryId;
  name: string;
  description: string;
  image: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: CategoryId;
  description: string;
  /** null = preço sob consulta */
  price: number | null;
  images: string[];
  availableScents: string[];
  availableModels: string[];
  volume?: string;
  weight?: string;
  featured: boolean;
  /** menor = mais relevante */
  relevance: number;
}

export interface CartItem {
  key: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  scent?: string | undefined;
  model?: string | undefined;
  quantity: number;
}
