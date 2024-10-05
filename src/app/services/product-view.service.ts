import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ProductViewDTO {
  id: number;
  productId: number;
  viewDate: Date;
}

export interface ProductViewStats {
  daily: Array<{ name: string; value: number }>;
  weekly: Array<{ name: string; value: number }>;
  monthly: Array<{ name: string; value: number }>;
}

@Injectable({
  providedIn: 'root'
})
export class ProductViewService {

  private apiUrl = "http://localhost:8080/api/productsV";

  constructor(private http: HttpClient) {}

  addView(productId: number): Observable<ProductViewDTO> {
    return this.http.post<ProductViewDTO>(`${this.apiUrl}/${productId}/view`, {});
  }

  getTotalViews(productId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/${productId}/views/total`);
  }

  getDailyViews(productId: number, date: Date): Observable<number> {
    const formattedDate = this.formatDate(date);
    return this.http.get<number>(`${this.apiUrl}/${productId}/views/daily?date=${formattedDate}`);
  }

  getWeeklyViews(productId: number, weekStart: Date): Observable<number> {
    const formattedDate = this.formatDate(weekStart);
    return this.http.get<number>(`${this.apiUrl}/${productId}/views/weekly?weekStart=${formattedDate}`);
  }

  getMonthlyViews(productId: number, monthStart: Date): Observable<number> {
    const formattedDate = this.formatDate(monthStart);
    return this.http.get<number>(`${this.apiUrl}/${productId}/views/monthly?monthStart=${formattedDate}`);
  }


  getProductViewStatsForSeller(sellerId: number, date: string): Observable<ProductViewStats> {
    return this.http.get<ProductViewStats>(`${this.apiUrl}/stats/${sellerId}/${date}`);
  }

  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }
}
