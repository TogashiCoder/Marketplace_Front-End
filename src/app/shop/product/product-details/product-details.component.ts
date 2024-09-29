import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/app/models/Product';
import { Seller } from 'src/app/models/Seller';
import { ProductService } from 'src/app/services/product.service';
import { SellerService } from 'src/app/services/seller.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  product!: Product;
  seller!: Seller;
  selectedMediaIndex: number = 0;
  isZoomed: boolean = false;
  isFollowing: boolean = false;
  private subscriptions: Subscription = new Subscription();

  constructor(
    private http: HttpClient,
    private sellerService: SellerService,
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.fetchProductAndSellerInfo();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  fetchProductAndSellerInfo(): void {
    const productIdStr = this.route.snapshot.paramMap.get('id');
    const productId = productIdStr !== null ? Number(productIdStr) : null;

    if (productId === null || isNaN(productId)) {
      console.error('Invalid or missing product ID provided in the route');
      return;
    }

    const subscription = this.productService.getProductById(productId).pipe(
      catchError(error => {
        console.error('Error fetching product info:', error);
        throw error;
      }),
      switchMap(product => {
        this.product = product;
        return this.sellerService.getSellerById(product.sellerId).pipe(
          catchError(error => {
            console.error('Error fetching seller info:', error);
            throw error;
          })
        );
      })
    ).subscribe(
      (seller: Seller) => {
        this.seller = seller;
      }
    );

    this.subscriptions.add(subscription);
  }

  handleMediaChange(index: number): void {
    this.selectedMediaIndex = index;
    this.isZoomed = false;
  }

  toggleZoom(): void {
    this.isZoomed = !this.isZoomed;
    document.body.style.overflow = this.isZoomed ? 'hidden' : 'auto';
  }

  isVideo(index: number): boolean {
    return index >= this.product.imageUrls.length;
  }

  getAllMedia(): string[] {
    return [...this.product.imageUrls, ...this.product.videoUrls];
  }

  toggleFollow(): void {
    this.isFollowing = !this.isFollowing;
    // Here you would typically call a service to update the follow status on the server
  }
}
