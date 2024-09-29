import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/app/models/Product';
import { Seller } from 'src/app/models/Seller';
import { ProductService } from 'src/app/services/product.service';
import { SellerService } from 'src/app/services/seller.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { FavoriteService } from 'src/app/services/favorite.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {

  showRegistrationPrompt: boolean = false;
  registrationPromptMessage: string = '';
  registrationPromptAction: string = '';


  product!: Product;
  seller!: Seller;
  selectedMediaIndex: number = 0;
  isZoomed: boolean = false;
  isFollowing: boolean = false;
  isFavorite: boolean = false;
  quantity: number = 1;  // Default quantity to 1 or the minimumOrderQuantity
  private subscriptions: Subscription = new Subscription();

  constructor(
    private http: HttpClient,
    private sellerService: SellerService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private favoriteService: FavoriteService,
    private authService: AuthService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.fetchProductAndSellerInfo();
    this.checkIfFavorite();
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
        this.quantity = product.minimumOrderQuantity;
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

  checkIfFavorite(): void {
    const productId = this.product.id;
    const buyerId = this.getBuyerId();

    this.favoriteService.isFavorite(buyerId, productId).subscribe(isFav => {
      this.isFavorite = isFav;
    });
  }

  // toggleWishlist(): void {
  //   const buyerId = this.getBuyerId();
  //   const productId = this.product.id;

  //   if (this.isFavorite) {
  //     this.favoriteService.removeFavorite(buyerId, productId).subscribe(() => {
  //       this.isFavorite = false;
  //     });
  //   } else {
  //     this.favoriteService.addFavorite(buyerId, productId).subscribe(() => {
  //       this.isFavorite = true;
  //     });
  //   }
  // }

  toggleFollow(): void {
    if (!this.canPerformAction()) {
      this.showRegistrationPrompt = true;
      this.registrationPromptMessage = 'Please register to follow this seller.';
      this.registrationPromptAction = 'followSeller';
      return;
    }

    this.isFollowing = !this.isFollowing;
    // Logic to follow/unfollow seller...
  }

  toggleWishlist(): void {
    if (!this.canPerformAction()) {
      this.showRegistrationPrompt = true;
      this.registrationPromptMessage = 'Please register to add this item to your wishlist.';
      this.registrationPromptAction = 'addToWishlist';
      return;
    }

    const buyerId = this.getBuyerId();
    const productId = this.product.id;

    if (this.isFavorite) {
      this.favoriteService.removeFavorite(buyerId, productId).subscribe(() => {
        this.isFavorite = false;
      });
    } else {
      this.favoriteService.addFavorite(buyerId, productId).subscribe(() => {
        this.isFavorite = true;
      });
    }
  }



  canPerformAction(): boolean {
    return this.authService.isLoggedIn() && this.authService.getUserRole() === 'BUYER';
  }

  onRegister(): void {
    this.router.navigate(['/login'], {
      queryParams: {
        returnUrl: this.router.url,
        action: this.registrationPromptAction
      }
    });
    this.showRegistrationPrompt = false;
  }

  onCloseRegistrationPrompt(): void {
    this.showRegistrationPrompt = false;
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

  // toggleFollow(): void {
  //   this.isFollowing = !this.isFollowing;
  // }

  addToCart(productId: number) {
    if (!this.canPerformAction()) {
      this.showRegistrationPrompt = true;
      this.registrationPromptMessage = 'Please register to add this item to your cart.';
      this.registrationPromptAction = 'addToCart';
      return;
    }

    // Logic to add to cart...
  }

  getBuyerId(): number {
    const buyerId = this.authService.getId();
    if (buyerId !== null && !isNaN(buyerId)) {
      console.log(buyerId);
      return buyerId;
    } else {
      console.error('Invalid Buyer ID, returning 0 as default');
      return 0;
    }
  }

  // Quantity adjustment methods
  increaseQuantity(): void {
    if (this.quantity < this.product.stockQuantity) {
      this.quantity++;
    }
  }

  decreaseQuantity(): void {
    if (this.quantity > this.product.minimumOrderQuantity) {
      this.quantity--;
    }
  }







}
