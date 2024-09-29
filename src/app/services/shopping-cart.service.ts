import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  private readonly API_URL = 'http://localhost:8080';


  constructor() { }
}
