import { Product } from "./Product";

export interface FavoriteProduct {
  id: number;
  buyerId: number;
  product: Product;
  favoritedAt: string;
}
