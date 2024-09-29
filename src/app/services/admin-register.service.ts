import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AdminRegisterService {
  private readonly API_URL = 'http://localhost:8080/api/admins';


  constructor(
    private http: HttpClient
  ) { }


  registerAdmin(formData: FormData): Observable<any> {
    return this.http.post(`${this.API_URL}/register`, formData);
  }

}
