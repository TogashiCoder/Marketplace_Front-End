import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class BuyerRegisterService {

  private readonly API_URL = 'http://localhost:8080/api/buyers';


  constructor(
    private http: HttpClient
  ) { }


  registerSeller(formData: FormData): Observable<any> {
    return this.http.post(`${this.API_URL}/register`, formData);
  }
  }

///ORIGIN
