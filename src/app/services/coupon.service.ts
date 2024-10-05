import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CouponService {
  private apiUrl = 'http://localhost:8080/api/coupons';

  constructor(private http: HttpClient) { }

  validateCoupon(couponCode: string, productId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/validate/${couponCode}/product/${productId}`);
  }

  applyCouponToProduct(couponId: number, productId: number, buyerId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${couponId}/apply/product/${productId}/buyer/${buyerId}`, {});
  }

  getCouponByCode(code: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/code/${code}`);
  }

  removeCouponFromProduct(couponId: number, productId: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${couponId}/product/${productId}/remove`, {});
  }
}
