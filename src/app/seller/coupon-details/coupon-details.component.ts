import { Component } from '@angular/core';
import { SellerRatingsService } from 'src/app/services/seller-ratings.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-coupon-details',
  templateUrl: './coupon-details.component.html',
  styleUrls: ['./coupon-details.component.css']
})
export class CouponDetailsComponent {

  sellerData: any;

  constructor(
    private sellerRatingsService: SellerRatingsService,
    private authService:AuthService
  ) { }

  ngOnInit() {

    const id = this.getSellerId();
    if(id){

      this.sellerRatingsService.getSellerRatings(id).subscribe(
        data => {
          this.sellerData = data;
        },
        error => {
          console.error('Error fetching seller ratings:', error);
        }
      );
    }
  }



  getSellerId():number | null{
    return this.authService.getId();
  }


}
