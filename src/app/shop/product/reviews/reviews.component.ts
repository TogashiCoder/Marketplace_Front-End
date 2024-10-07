import { Component, Input, OnInit } from '@angular/core';
import { ReviewDto } from 'src/app/models/ReviewDto';
import { AuthService } from 'src/app/services/auth.service';
import { RatingService } from 'src/app/services/rating.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent {

  @Input() productId!: number;
  reviews: ReviewDto[] = [];
  averageRating: number = 0;

  constructor(private ratingService: RatingService) {}

  ngOnInit() {
    this.loadReviews();
  }

  private loadReviews() {
    this.ratingService.getReviewsForProduct(this.productId).subscribe({
      next: (reviews) => {
        this.reviews = reviews;
        this.calculateAverageRating();
      },
      error: (error) => {
        console.error('Error loading reviews:', error);
      }
    });
  }

  private calculateAverageRating() {
    if (this.reviews.length === 0) {
      this.averageRating = 0;
      return;
    }

    const sum = this.reviews.reduce((acc, review) => acc + review.value, 0);
    this.averageRating = sum / this.reviews.length;
  }



}
