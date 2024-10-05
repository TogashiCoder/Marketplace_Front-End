import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderConfirmationDto } from '../models/OrderConfirmationDto';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderConfirmationService {

  private apiUrl = environment.apiUrl + '/api/ordersConfirmation';

  constructor(private http: HttpClient) { }

  getOrderConfirmation(orderId: number): Observable<OrderConfirmationDto> {
    const url = `${this.apiUrl}/${orderId}/confirmation`;
    return this.http.get<OrderConfirmationDto>(url);
  }
}
