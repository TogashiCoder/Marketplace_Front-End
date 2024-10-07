import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RatingService } from 'src/app/services/rating.service';
import { OrderService } from 'src/app/services/order.service';
import { AuthService } from 'src/app/services/auth.service';
import { Rating } from 'src/app/models/Rating';
import { trigger, state, style, transition, animate } from '@angular/animations';


@Component({
  selector: 'app-product-rating',
  templateUrl: './product-rating.component.html',
  styleUrls: ['./product-rating.component.css'],
  animations: [
    trigger('starAnimation', [
      state('filled', style({
        color: 'gold',
        transform: 'scale(1.2)'
      })),
      state('unfilled', style({
        color: '#ddd',
        transform: 'scale(1)'
      })),
      transition('unfilled <=> filled', animate('0.2s ease-in-out'))
    ])
  ]
})
export class ProductRatingComponent {


  @Input() productId!: number;
  @Input() sellerId!: number;

  ratingForm: FormGroup;
  canRate: boolean = false;
  message: string = '';
  error: string = '';
  stars: string[] = ['unfilled', 'unfilled', 'unfilled', 'unfilled', 'unfilled'];
  hoverState: number = -1;

  constructor(
    private fb: FormBuilder,
    private ratingService: RatingService,
    private authService: AuthService,
    private orderService:OrderService
  ) {
    this.ratingForm = this.fb.group({
      value: [0, [Validators.required, Validators.min(1), Validators.max(5)]],
      comment: ['', Validators.required]
    });
  }

  ngOnInit() {
    const buyerId = this.authService.getId();
    if (buyerId) {
      this.orderService.hasBuyerPurchasedProduct(buyerId, this.productId).subscribe(
        hasPurchased => {
          if (hasPurchased) {
            this.ratingService.canRateProduct(this.productId, buyerId).subscribe(
              canRateProduct => this.canRate = canRateProduct,
              error => console.error('Error checking if can rate:', error)
            );
          }
        },
        error => console.error('Error checking purchase:', error)
      );
    }
  }

  hoverRating(index: number) {
    this.hoverState = index;
    for (let i = 0; i < this.stars.length; i++) {
      if (i <= index || i <= this.ratingForm.get('value')?.value - 1) {
        this.stars[i] = 'filled';
      } else {
        this.stars[i] = 'unfilled';
      }
    }
  }

  setRating(index: number) {
    const rating = index + 1;
    this.ratingForm.patchValue({ value: rating });
    this.hoverRating(index);
  }

  submitRating() {
    if (this.ratingForm.valid) {
      const buyerId = this.authService.getId();
      if (!buyerId) {
        this.error = 'You must be logged in to submit a rating.';
        return;
      }

      const newRating: Rating = {
        value: this.ratingForm.get('value')?.value,
        comment: this.ratingForm.get('comment')?.value,
        productId: this.productId,
        sellerId: this.sellerId,
        buyerId: buyerId
      };

      this.ratingService.createRating(newRating).subscribe(
        response => {
          this.message = 'Your rating has been submitted successfully!';
          this.canRate = false;
          this.ratingForm.reset();
          this.stars = this.stars.map(() => 'unfilled');
        },
        error => {
          this.error = 'There was an error submitting your rating. Please try again.';
          console.error('Error submitting rating:', error);
        }
      );
    }
  }

}
