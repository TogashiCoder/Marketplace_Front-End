export interface OrderItemDto {
  productName: string;
  quantity: number;
  price: number;
  discountedPrice?: number;
  totalPrice: number;
}

export interface OrderConfirmationDto {
  id: number;
  orderNumber: string;
  orderDate: string;
  orderStatus: string;
  totalAmount: number;
  estimatedDeliveryDate: string;
  orderItems: OrderItemDto[];
  buyerName: string;
  carrierName: string;
  trackingNumber?: string;
  paymentType: string;
  paymentDetails: string;
  paypalPaymentId?: string; 
  shippingStreet: string;
  shippingCity: string;
  shippingState: string;
  shippingZipCode: string;
  shippingCountry: string;
}
