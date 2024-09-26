import { User } from "./User";
import { Product } from "./Product";

export interface Seller extends User {
  shopName: string;
  shopCategory: string;
  shopCoverImage?: string;
  products: Product[];
}
