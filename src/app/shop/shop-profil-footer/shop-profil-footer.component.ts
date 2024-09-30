import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Seller } from 'src/app/models/Seller';
import { RatingService } from 'src/app/services/rating.service';
import { FollowingService } from 'src/app/services/following.service';

@Component({
  selector: 'app-shop-profil-footer',
  templateUrl: './shop-profil-footer.component.html',
  styleUrls: ['./shop-profil-footer.component.css']
})
export class ShopProfilFooterComponent implements OnChanges {
  public rating: number = 0;
  public followerCount: number = 0;

  @Input() seller!: Seller;

  constructor(
    private ratingService: RatingService,
    private followingService: FollowingService 
  ) {}

  // This method will trigger when the @Input() seller changes
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['seller'] && this.seller?.id) {
      console.log("from footer");
      console.log(this.seller);

      // Fetch the rating when seller data is available
      this.getRating();
      // Fetch the follower count when seller data is available
      this.getFollowerCount();
    } else {
      console.error("Seller is undefined");
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

  // fetch follower count
  private getFollowerCount(): void {
    if (this.seller?.id) {
      this.followingService.getFollowerCountForSeller(this.seller.id).subscribe(
        (count: number) => {
          this.followerCount = count;
        },
        error => {
          console.error('Error fetching follower count:', error);
        }
      );
    }
  }
}
