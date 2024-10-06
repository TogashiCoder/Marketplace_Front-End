import { Injectable } from '@angular/core';
import { ProductStockDto } from '../models/ProductStockDto';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockAnalyticService {
  private apiUrl = 'http://localhost:8080/api/product-stock';

  constructor(private http: HttpClient) { }

  getProductStockBySellerId(sellerId: number): Observable<ProductStockDto[]> {
    return this.http.get<ProductStockDto[]>(`${this.apiUrl}/seller/${sellerId}`);
  }
}
