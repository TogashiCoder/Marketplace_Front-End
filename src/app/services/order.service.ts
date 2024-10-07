import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface OrderDisplayDto {
  id: string;
  customer: string;
  date: string;
  total: number;
  status: string;
}

export interface OrderSummaryResponse {
  totalOrders: number;
  totalRevenue: number;
}


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl = 'http://localhost:8080/api/orders';

  constructor(private http: HttpClient) {}

  getOrdersSummary(): Observable<OrderSummaryResponse> {
    return this.http.get<OrderSummaryResponse>(`${this.apiUrl}/summary`);
  }

  getAllOrders(): Observable<OrderDisplayDto[]> {
    return this.http.get<OrderDisplayDto[]>(this.apiUrl);
  }

  getSellerOrdersSummary(sellerId: number): Observable<OrderSummaryResponse> {
    return this.http.get<OrderSummaryResponse>(`${this.apiUrl}/seller/${sellerId}/summary`);
  }

  getSellerOrders(sellerId: number): Observable<OrderDisplayDto[]> {
    return this.http.get<OrderDisplayDto[]>(`${this.apiUrl}/seller/${sellerId}`);
  }

  updateSellerOrderStatus(sellerId: number, orderId: number, status: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/seller/${sellerId}/order/${orderId}/status/${status}`, null);
  }


    // Check if a buyer has purchased a product
    hasBuyerPurchasedProduct(buyerId: number, productId: number): Observable<boolean> {
      return this.http.get<boolean>(`${this.apiUrl}/buyer/${buyerId}/product/${productId}/purchased`);
    }



}
