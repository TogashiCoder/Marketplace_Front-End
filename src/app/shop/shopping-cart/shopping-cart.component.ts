import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { CartItem } from 'src/app/models/CartItem';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { AuthService } from 'src/app/services/auth.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
  animations: [
    trigger('itemAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate('300ms', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('300ms', style({ opacity: 0, transform: 'translateY(-20px)' }))
      ])
    ])
  ]
})
export class ShoppingCartComponent implements OnInit {
  cartItems: CartItem[] = [];
  cartId: number | null = null;
  buyerId: number | null = null;
  isLoading: boolean = false;

  constructor(
    private shoppingCartService: ShoppingCartService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.initializeCart();
  }

  initializeCart(): void {
    this.isLoading = true;
    this.buyerId = this.authService.getId();
    if (this.buyerId) {
      this.shoppingCartService.getCartIdByBuyerId(this.buyerId).pipe(
        switchMap(cartId => {
          this.cartId = cartId;
          return this.shoppingCartService.getCartItems(cartId);
        })
      ).subscribe(
        (items: CartItem[]) => {
          this.cartItems = items;
          this.isLoading = false;
        },
        error => {
          console.error('Error initializing cart:', error);
          this.isLoading = false;
        }
      );
    } else {
      console.error('User is not authenticated or buyerId is not available');
      this.isLoading = false;
    }
  }

  loadCartItems(): void {
    if (this.cartId) {
      this.isLoading = true;
      this.shoppingCartService.getCartItems(this.cartId).subscribe(
        (items: CartItem[]) => {
          this.cartItems = items;
          this.isLoading = false;
        },
        error => {
          console.error('Error fetching cart items:', error);
          this.isLoading = false;
        }
      );
    }
  }

  updateQuantity(itemId: number, newQuantity: number): void
  {
    console.log("invoke updateQuantity")
    if (this.cartId) {

      const item = this.cartItems.find(i => i.id === itemId);
      if (item) {
        const oldQuantity = item.quantity;
        item.quantity = newQuantity;
        item.totalPrice = item.productPrice * newQuantity;

        this.shoppingCartService.updateItemQuantity(this.cartId, itemId, newQuantity).subscribe(
          () => {
            console.log('Quantity updated successfully');
          },
          error => {
            console.error('Error updating quantity:', error);
            item.quantity = oldQuantity;
            item.totalPrice = item.productPrice * oldQuantity;
          }
        );
      }
    }
  }

  removeProduct(itemId: number): void {
    if (this.cartId) {
      this.isLoading = true;
      this.shoppingCartService.removeItemFromCart(this.cartId, itemId).subscribe(
        () => {
          this.cartItems = this.cartItems.filter(item => item.id !== itemId);
          this.isLoading = false;
        },
        error => {
          console.error('Error removing item:', error);
          this.isLoading = false;
        }
      );
    }
  }

  // applyCoupon(itemId: number, coupon: string): void {
  //   // Placeholder for future coupon implementation
  //   console.log(`Coupon ${coupon} applied to item ${itemId}`);
  // }

  get subtotal(): number {
    return this.cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
  }

  checkoutCart(): void {
    if (this.cartId && this.buyerId) {
      this.isLoading = true;
      this.shoppingCartService.checkoutCart(this.cartId, this.buyerId).subscribe(
        (response) => {
          console.log('Checkout successful');
          if (response && response.approvalUrl) {
            window.location.href = response.approvalUrl;
          } else {
            this.loadCartItems();
          }
          this.isLoading = false;
        },
        error => {
          console.error('Error during checkout:', error);
          this.isLoading = false;
        }
      );
    }
  }
}
