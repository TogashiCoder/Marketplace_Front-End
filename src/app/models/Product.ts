export interface Product {
  id?: number;
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  minimumOrderQuantity: number;
  sellerId: number;
  imageUrls?: string[];
  videoUrls?: string[];
  createdAt?: Date;
  updatedAt?: Date;
  categoryId: number;
  rating?: number;
  discountPercentage?: number;
}



