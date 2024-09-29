import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FavoriteDto } from '../models/Favorite';
import { FavoriteProduct } from '../models/FavoriteProduct';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  private readonly API_URL = 'http://localhost:8080/api/favorites';

  constructor(private http: HttpClient) { }





  addFavorite(buyerId: number, productId: number): Observable<FavoriteDto> {
    return this.http.post<FavoriteDto>(`${this.API_URL}/make/${buyerId}/${productId}`, {});
  }


  removeFavorite(buyerId: number, productId: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${buyerId}/${productId}`);
}



  getFavoritesByBuyerId(buyerId: number): Observable<FavoriteProduct[]> {
    return this.http.get<FavoriteProduct[]>(`${this.API_URL}/buyer/${buyerId}`);
  }


  isFavorite(buyerId: number, productId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.API_URL}/check/${buyerId}/${productId}`);
  }


}
