import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CouponDto {
  id?: number;
  code: string;
  discountPercentage: number;
  startDate: string;  
  endDate: string;
  maxRedemptions: number;
  productId?: number;
  sellerId?: number;
  buyerId?: number;
}

@Injectable({
  providedIn: 'root'
})
export class CouponmanagerService {

  private baseUrl = 'http://localhost:8080/api/coupons';

  constructor(private http: HttpClient) {}

  // Create a coupon for a specific seller
  createCoupon(sellerId: number, couponDto: CouponDto): Observable<CouponDto> {
    return this.http.post<CouponDto>(`${this.baseUrl}/seller/${sellerId}`, couponDto);
  }

  // Update an existing coupon
  updateCoupon(id: number, couponDto: CouponDto): Observable<CouponDto> {
    return this.http.put<CouponDto>(`${this.baseUrl}/${id}`, couponDto);
  }

  // Get all coupons for a seller
  getAllCouponsBySeller(sellerId: number): Observable<CouponDto[]> {
    return this.http.get<CouponDto[]>(`${this.baseUrl}/seller/${sellerId}`);
  }

  // Apply coupon to product
  applyCouponToProduct(couponId: number, productId: number, buyerId: number): Observable<CouponDto> {
    return this.http.post<CouponDto>(
      `${this.baseUrl}/${couponId}/apply/${productId}/buyer/${buyerId}`,
      {}
    );
  }

  // Remove coupon from product
  removeCouponFromProduct(productId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/product/${productId}`);
  }

  // Delete coupon by ID
  deleteCoupon(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // Delete coupon by code
  deleteCouponByCode(code: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/code/${code}`);
  }

  // Get coupon by ID
  getCouponById(id: number): Observable<CouponDto> {
    return this.http.get<CouponDto>(`${this.baseUrl}/${id}`);
  }

  // Get coupon by code
  getCouponByCode(code: string): Observable<CouponDto> {
    return this.http.get<CouponDto>(`${this.baseUrl}/code/${code}`);
  }

  // Remove coupon from cart item
  removeCouponFromCartItem(cartItemId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/cartItem/${cartItemId}`);
  }

}
