export interface CartItem {
  id: number;
  productId: number;
  productName: string;
  productPrice: number;
  productImageUrl: string;
  quantity: number;
  minimumOrderQuantity: number;
  stockQuantity: number;
  totalPrice: number;
  appliedCouponId?: number;
  appliedCouponCode?: string;
  originalPrice?: number;
  discountedPrice?: number;
}
