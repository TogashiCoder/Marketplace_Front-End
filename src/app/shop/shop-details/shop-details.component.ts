import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Seller } from 'src/app/models/Seller';
import { RatingService } from 'src/app/services/rating.service';
import { FollowingService } from 'src/app/services/following.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-shop-details',
  templateUrl: './shop-details.component.html',
  styleUrls: ['./shop-details.component.css']
})
export class ShopDetailsComponent implements OnInit, OnChanges {
  public rating: number = 0;
  public reviewCount: number = 0;
  public isFollowing = false;

  @Input() seller!: Seller;

  constructor(
    private ratingService: RatingService,
    private authService: AuthService,
    private followingService: FollowingService
  ) {}

  ngOnInit(): void {
    // Component initialization
    this.checkFollowStatus();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['seller'] && this.seller?.id) {
      console.log("Seller ID exists:", this.seller.id);
      this.getRating();
      this.getReviewCount();
      this.checkFollowStatus();
    } else {
      console.error("Seller is undefined or doesn't have an ID");
    }
  }

  toggleFollow() {
    if (!this.seller?.id) {
      console.error("Cannot toggle follow: Seller ID is missing");
      return;
    }

    const buyerId = this.getBuyerId();
    if (buyerId === 0) {
      console.error("Cannot toggle follow: Buyer ID is invalid");
      return;
    }

    if (this.isFollowing) {
      this.followingService.unfollow(buyerId, this.seller.id).subscribe(
        () => {
          this.isFollowing = false;
          console.log("Successfully unfollowed the seller");
        },
        error => {
          console.error("Error unfollowing the seller:", error);
        }
      );
    } else {
      this.followingService.follow(buyerId, this.seller.id).subscribe(
        () => {
          this.isFollowing = true;
          console.log("Successfully followed the seller");
        },
        error => {
          console.error("Error following the seller:", error);
        }
      );
    }
  }

  private checkFollowStatus(): void {
    if (this.seller?.id) {
      const buyerId = this.getBuyerId();
      if (buyerId !== 0) {
        this.followingService.isFollowing(buyerId, this.seller.id).subscribe(
          (isFollowing: boolean) => {
            this.isFollowing = isFollowing;
          },
          error => {
            console.error('Error checking follow status:', error);
          }
        );
      }
    }
  }

  get shopName(): string {
    return this.seller?.username || 'Shop Name';
  }

  get ownerName(): string {
    return `${this.seller?.firstname} ${this.seller?.lastname}` || 'Shop Owner';
  }

  get ProfilImage(): string {
    return this.seller?.profileImage || 'assets/shopProfil.svg';
  }

  private getReviewCount(): void {
    if (this.seller?.id) {
      this.ratingService.getNumberOfRatingsForSeller(this.seller.id).subscribe(
        (data: number) => {
          this.reviewCount = data;
        },
        error => {
          console.error('Error fetching review count:', error);
        }
      );
    }
  }

  private getRating(): void {
    if (this.seller?.id) {
      this.ratingService.getAverageRatingForSellerProducts(this.seller.id).subscribe(
        (data: number) => {
          this.rating = data;
        },
        error => {
          console.error('Error fetching rating:', error);
        }
      );
    }
  }

  getBuyerId(): number {
    const id = this.authService.getId();
    return id !== null ? id : 0;
  }
}
