import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  coupon: string;
}

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
  animations: [
    trigger('itemAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
      ]),
      transition(':leave', [
      ])
    ])
  ]
})
export class ShoppingCartComponent {

  products: Product[] = [
    { id: 1, name: "Eva Lightweight Granite Chair", price: 130.00, image: "/assets/placeholder.svg", quantity: 1, coupon: "" },
    { id: 2, name: "Mika Wooden Bluetooth Speaker", price: 120.50, image: "/assets/placeholder.svg", quantity: 1, coupon: "" },
  ];

  constructor() { }

  ngOnInit(): void { }

  updateQuantity(id: number, newQuantity: number): void {
    this.products = this.products.map(product =>
      product.id === id ? { ...product, quantity: Math.max(1, newQuantity) } : product
    );
  }

  removeProduct(id: number): void {
    this.products = this.products.filter(product => product.id !== id);
  }

  applyCoupon(id: number, coupon: string): void {
    this.products = this.products.map(product =>
      product.id === id ? { ...product, coupon } : product
    );
  }

  get subtotal(): number {
    return this.products.reduce((sum, product) => sum + product.price * product.quantity, 0);
  }




}
