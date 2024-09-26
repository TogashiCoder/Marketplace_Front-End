import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class SellerRegisterService {

  private readonly API_URL = 'http://localhost:8080/api/sellers';


  constructor(
    private http: HttpClient
  ) { }



  registerSeller(formData: FormData): Observable<any> {
    return this.http.post(`${this.API_URL}/register`, formData);
  }



}
