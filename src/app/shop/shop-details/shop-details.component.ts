import { Component } from '@angular/core';

@Component({
  selector: 'app-shop-details',
  templateUrl: './shop-details.component.html',
  styleUrls: ['./shop-details.component.css']
})
export class ShopDetailsComponent {

  isFollowing = false;

  toggleFollow() {
    this.isFollowing = !this.isFollowing;
  }

}
