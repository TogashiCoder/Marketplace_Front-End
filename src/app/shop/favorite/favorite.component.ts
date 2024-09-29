import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FavoriteService } from 'src/app/services/favorite.service';
import { FavoriteProduct } from 'src/app/models/FavoriteProduct';
import { AuthService } from 'src/app/services/auth.service';

interface WishlistItem {
  id: number;
  name: string;
  description: string;
  price: number;
  inStock: boolean;
}

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent {

  FavoriteProducts:FavoriteProduct[] =[];


  constructor(
    private http: HttpClient,
    private favoriteService:FavoriteService,
    private authService:AuthService
  ) {}

  ngOnInit() {
    this.fetchFavoriteProducts()
  }


  fetchFavoriteProducts(){
    this.favoriteService.getFavoritesByBuyerId(this.getBuyerId()).subscribe(
      (data)=>{
        this.FavoriteProducts = data;
        console.log("=======================")
        console.log(this.FavoriteProducts)
      },
      (error)=>{
        console.log("=======================")
        console.error(error);
      }
    )

  }




  onActionClick(item: FavoriteProduct) {

  }

  contactShop(){

  }



  removeItem(productId: number) {
    console.log("Attempting to remove item from favorites...");

    const buyerId = this.authService.getId();
    console.log("Buyer ID: " + buyerId);
    console.log("Product ID: " + productId);

    if (buyerId !== null && !isNaN(buyerId)) {
        this.favoriteService.removeFavorite(buyerId, productId).subscribe(
            (response) => {
                console.log('Successfully removed favorite for product ID: ', productId);
                this.fetchFavoriteProducts();
            },
            (error) => {
                console.log('Error removing item from favorites: ' + error);
                console.error(error);
            }
        );
    } else {
        console.error('Invalid Buyer ID: ', buyerId);
    }
}




getBuyerId(): number {
  const buyerId = this.authService.getId();
  if (buyerId !== null && !isNaN(buyerId)) {
    console.log(buyerId)
      return buyerId;
  } else {
      console.error('Invalid Buyer ID, returning 0 as default');
      return 0;
  }
}



}
