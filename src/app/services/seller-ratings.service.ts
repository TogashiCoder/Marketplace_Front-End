import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SellerRatingsService {

  private apiUrl = 'http://localhost:8080/api/display/rating';

  constructor(private http: HttpClient) { }

  getSellerRatings(sellerId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${sellerId}/ratings`);
  }

}
