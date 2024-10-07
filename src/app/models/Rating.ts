export interface Rating {
  id?: number;
  value: number;
  comment:string
  productId: number;
  sellerId: number;
  buyerId: number;
  createdAt?: string;
}
