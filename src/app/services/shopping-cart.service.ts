import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CartItem } from '../models/CartItem';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private readonly API_URL = 'http://localhost:8080/api/cart';

  constructor(private http: HttpClient) { }

  getOrCreateCart(buyerId: number): Observable<any> {
    return this.http.get(`${this.API_URL}/buyer/${buyerId}`);
  }

  // addItemToCart(cartId: number, productId: number, quantity: number): Observable<any> {
  //   return this.http.post(`${this.API_URL}/${cartId}/add-item/${productId}/${quantity}`, {});
  // }

  addItemToCart(cartId: number, productId: number, quantity: number): Observable<boolean> {
    return this.http.post<boolean>(`${this.API_URL}/${cartId}/add-item/${productId}/${quantity}`, {});
}


  removeItemFromCart(cartId: number, itemId: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/${cartId}/remove-item/${itemId}`);
  }

  updateItemQuantity(cartId: number, itemId: number, quantity: number): Observable<any> {
    return this.http.put(`${this.API_URL}/${cartId}/update-item/${itemId}/${quantity}`, {});
  }

  calculateCartTotal(cartId: number): Observable<number> {
    return this.http.get<number>(`${this.API_URL}/${cartId}/total`);
  }

  //getCartItems
  getCartItems(cartId: number): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${this.API_URL}/${cartId}/items`);
  }

  clearCart(cartId: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/${cartId}/clear`);
  }

  checkoutCart(cartId: number, buyerId: number): Observable<any> {
    return this.http.post(`${this.API_URL}/${cartId}/checkout/${buyerId}`, {});
  }

// Get cart ID by buyer ID
getCartIdByBuyerId(buyerId: number): Observable<number> {
  return this.http.get<number>(`${this.API_URL}/buyer/${buyerId}/cart-id`);
}

  // Check if product exists in the cart
  hasProductInCart(cartId: number, productId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.API_URL}/${cartId}/contains-product/${productId}`);
  }

}
