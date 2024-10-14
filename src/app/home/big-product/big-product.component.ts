import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-big-product',
  templateUrl: './big-product.component.html',
  styleUrls: ['./big-product.component.css']
})
export class BigProductComponent implements OnInit, OnDestroy {

  product1!: Product; //id:69
  product2!: Product; //id:70
  private subscriptions: Subscription = new Subscription();

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  loadProducts(): void {
    this.subscriptions.add(
      this.productService.getProductById(69).subscribe(
        (product) => {
          this.product1 = product;
        },
        (error) => {
          console.error('Error loading product 1:', error);
        }
      )
    );

    this.subscriptions.add(
      this.productService.getProductById(70).subscribe(
        (product) => {
          this.product2 = product;
        },
        (error) => {
          console.error('Error loading product 2:', error);
        }
      )
    );
  }

  hasRating(product: Product): boolean {
    return product.rating !== null && product.rating !== undefined;
  }

}
