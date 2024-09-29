
export interface Product{
  id: number;
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  minimumOrderQuantity: number;
  discountPercentage: number | null | undefined;
  rating: number | null | undefined;
  sellerId: number;
  imageUrls: string[];
  videoUrls: string[];
  createdAt: string;
  updatedAt: string | null;
  categoryId: number;
  categoryName: string;
}


