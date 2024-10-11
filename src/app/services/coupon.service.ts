import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CouponDto } from '../models/CouponDto';

@Injectable({
  providedIn: 'root'
})
export class CouponService {
  private apiUrl = 'http://localhost:8080/api/coupons';

  constructor(private http: HttpClient) { }

  createCoupon(couponDto: CouponDto, sellerId: number): Observable<CouponDto> {
    return this.http.post<CouponDto>(`${this.apiUrl}/seller/${sellerId}`, couponDto);
  }

  updateCoupon(id: number, couponDto: CouponDto): Observable<CouponDto> {
    return this.http.put<CouponDto>(`${this.apiUrl}/${id}`, couponDto);
  }

  getAllCouponsBySeller(sellerId: number): Observable<CouponDto[]> {
    return this.http.get<CouponDto[]>(`${this.apiUrl}/seller/${sellerId}`);
  }

  applyCouponToProduct(couponId: number, productId: number, buyerId: number): Observable<CouponDto> {
    return this.http.post<CouponDto>(`${this.apiUrl}/${couponId}/apply/${productId}/buyer/${buyerId}`, {});
  }

  removeCouponFromProduct(productId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/product/${productId}`);
  }

  deleteCoupon(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  deleteCouponByCode(code: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/code/${code}`);
  }

  getCouponById(id: number): Observable<CouponDto> {
    return this.http.get<CouponDto>(`${this.apiUrl}/${id}`);
  }

  getCouponByCode(code: string): Observable<CouponDto> {
    return this.http.get<CouponDto>(`${this.apiUrl}/code/${code}`);
  }

  removeCouponFromCartItem(cartItemId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/cartItem/${cartItemId}`);
  }
}
