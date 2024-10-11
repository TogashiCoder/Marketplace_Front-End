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
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { ProductViewService } from 'src/app/services/product-view.service';

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
  viewCount: number = 0;
  dailyViewCount: number = 0;
  weeklyViewCount: number = 0;
  monthlyViewCount: number = 0;
  private subscriptions: Subscription = new Subscription();

  showRegistrationPrompt: boolean = false;
  registrationPromptMessage: string = '';
  registrationPromptAction: string = '';
  isItemInCart: boolean = false;
  cartId: number = 0;

  constructor(
    private productService: ProductService,
    private sellerService: SellerService,
    private route: ActivatedRoute,
    private router: Router,
    private favoriteService: FavoriteService,
    private authService: AuthService,
    private followingService: FollowingService,
    private shoppingCartService: ShoppingCartService,
    private productViewService: ProductViewService
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
        this.quantity = product.minimumOrderQuantity;
        // Add view and load view statistics
        this.addProductView(product.id);
        this.loadViewStatistics(product.id);
        // Continue with existing logic
        this.checkIfFavorite();
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
        this.checkIfProductInCart();
      },
      error => {
        console.error('Error in product details fetch:', error);
      }
    );

    this.subscriptions.add(subscription);
  }

  private addProductView(productId: number): void {
    const viewSubscription = this.productViewService.addView(productId).subscribe(
      () => {
        console.log('Product view recorded successfully');
        // Refresh view count after adding a new view
        this.loadViewStatistics(productId);
      },
      error => {
        console.error('Error recording product view:', error);
      }
    );
    this.subscriptions.add(viewSubscription);
  }

  private loadViewStatistics(productId: number): void {
    // Load total views
    const totalViewsSub = this.productViewService.getDailyViews(productId,new Date).subscribe(
      count => {
        this.viewCount = count;
      },
      error => {
        console.error('Error loading total view count:', error);
      }
    );
    this.subscriptions.add(totalViewsSub);

    // Load daily views
    const today = new Date();
    const dailyViewsSub = this.productViewService.getDailyViews(productId, today).subscribe(
      count => {
        this.dailyViewCount = count;
      },
      error => {
        console.error('Error loading daily view count:', error);
      }
    );
    this.subscriptions.add(dailyViewsSub);

    // Load weekly views
    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - weekStart.getDay()); // Start of current week
    const weeklyViewsSub = this.productViewService.getWeeklyViews(productId, weekStart).subscribe(
      count => {
        this.weeklyViewCount = count;
      },
      error => {
        console.error('Error loading weekly view count:', error);
      }
    );
    this.subscriptions.add(weeklyViewsSub);

    // Load monthly views
    const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    const monthlyViewsSub = this.productViewService.getMonthlyViews(productId, monthStart).subscribe(
      count => {
        this.monthlyViewCount = count;
      },
      error => {
        console.error('Error loading monthly view count:', error);
      }
    );
    this.subscriptions.add(monthlyViewsSub);
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

  checkIfProductInCart(): void {
    if (this.authService.isLoggedIn()) {
      const buyerId = this.authService.getId();
      if (buyerId !== null) {
        this.shoppingCartService.getCartIdByBuyerId(buyerId).subscribe(
          (cartId) => {
            this.cartId = cartId;
            if (cartId !== null) {
              this.shoppingCartService.hasProductInCart(cartId, this.product.id).subscribe(
                (isInCart) => {
                  this.isItemInCart = isInCart;
                },
                (error) => {
                  console.error('Error checking if product is in cart:', error);
                }
              );
            }
          },
          (error) => {
            console.error('Error getting cart ID:', error);
          }
        );
      }
    }
  }

  addToCart(productId: number) {
    if (!this.canPerformAction()) {
      this.showRegistrationPrompt = true;
      this.registrationPromptMessage = 'Please register to add this item to your cart.';
      this.registrationPromptAction = 'addToCart';
      return;
    }

    const buyerId = this.authService.getId();
    if (buyerId === null) {
      return;
    }

    this.shoppingCartService.getCartIdByBuyerId(buyerId).pipe(
      switchMap(cartId => {
        if (cartId === null) {
          return this.shoppingCartService.getOrCreateCart(buyerId);
        } else {
          return Promise.resolve({ id: cartId });
        }
      }),
      switchMap(cart => this.shoppingCartService.addItemToCart(cart.id, productId, this.quantity))
    ).subscribe(
      () => {
        console.log('Item added to cart successfully');
        this.isItemInCart = true;
      },
      error => {
        console.error('Error adding item to cart:', error);
      }
    );
  }

  goToShoppingCart() {
    this.router.navigate(['/shop/Shopping-cart']);
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
