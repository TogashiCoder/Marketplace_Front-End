import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Product } from 'src/app/models/Product';
import { Seller } from 'src/app/models/Seller';
import { ProductService } from 'src/app/services/product.service';
import { SellerService } from 'src/app/services/seller.service';
import { FavoriteService } from 'src/app/services/favorite.service';
import { AuthService } from 'src/app/services/auth.service';
import { FollowingService } from 'src/app/services/following.service';

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
  isFavorite: boolean = false;
  quantity: number = 1;
  followerCount: number = 0;
  private subscriptions: Subscription = new Subscription();

  showRegistrationPrompt: boolean = false;
  registrationPromptMessage: string = '';
  registrationPromptAction: string = '';

  constructor(
    private productService: ProductService,
    private sellerService: SellerService,
    private route: ActivatedRoute,
    private router: Router,
    private favoriteService: FavoriteService,
    private authService: AuthService,
    private followingService: FollowingService
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
        this.checkIfFollowing();
        this.getFollowerCount();
      }
    );

    this.subscriptions.add(subscription);
  }

  checkIfFavorite(): void {
    if (this.authService.isLoggedIn()) {
      const productId = this.product.id;
      const buyerId = this.authService.getId();
      if (buyerId !== null) {
        this.favoriteService.isFavorite(buyerId, productId).subscribe(isFav => {
          this.isFavorite = isFav;
        });
      }
    }
  }

  checkIfFollowing(): void {
    if (this.authService.isLoggedIn()) {
      const buyerId = this.authService.getId();
      if (buyerId !== null) {
        this.followingService.isFollowing(buyerId, this.seller.id).subscribe(
          isFollowing => {
            this.isFollowing = isFollowing;
          },
          error => {
            console.error('Error checking follow status:', error);
          }
        );
      }
    }
  }

  getFollowerCount(): void {
    this.followingService.getFollowerCountForSeller(this.seller.id).subscribe(
      count => {
        this.followerCount = count;
      },
      error => {
        console.error('Error fetching follower count:', error);
      }
    );
  }

  toggleWishlist(): void {
    if (!this.canPerformAction()) {
      this.showRegistrationPrompt = true;
      this.registrationPromptMessage = 'Please register to add this item to your wishlist.';
      this.registrationPromptAction = 'addToWishlist';
      return;
    }

    const buyerId = this.authService.getId();
    if (buyerId === null) return;

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

  addToCart(productId: number) {
    if (!this.canPerformAction()) {
      this.showRegistrationPrompt = true;
      this.registrationPromptMessage = 'Please register to add this item to your cart.';
      this.registrationPromptAction = 'addToCart';
      return;
    }

    // Logic to add to cart...
  }

  toggleFollow(): void {
    if (!this.canPerformAction()) {
      this.showRegistrationPrompt = true;
      this.registrationPromptMessage = 'Please register to follow this seller.';
      this.registrationPromptAction = 'followSeller';
      return;
    }

    const buyerId = this.authService.getId();
    if (buyerId === null) return;

    if (this.isFollowing) {
      this.followingService.unfollow(buyerId, this.seller.id).subscribe(
        () => {
          this.isFollowing = false;
          this.followerCount--;
        },
        error => {
          console.error('Error unfollowing seller:', error);
        }
      );
    } else {
      this.followingService.follow(buyerId, this.seller.id).subscribe(
        () => {
          this.isFollowing = true;
          this.followerCount++;
        },
        error => {
          console.error('Error following seller:', error);
        }
      );
    }
  }

  canPerformAction(): boolean {
    return this.authService.isLoggedIn() && this.authService.getUserRole() === 'BUYER';
  }

  onRegister(): void {
    this.showRegistrationPrompt = false;
    this.router.navigate(['/login'], {
      queryParams: {
        returnUrl: this.router.url,
        action: this.registrationPromptAction
      }
    });
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
