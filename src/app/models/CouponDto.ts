export interface CouponDto {
  id?: number;
  code: string;
  discountPercentage: number;
  startDate: string;
  endDate: string;
  maxRedemptions: number;
  redeemCount?: number;
  sellerId?: number;
}
