import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


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

  wishlistItems: WishlistItem[] = [
    {
      id: 1,
      name: 'Wireless Headphones',
      description: 'Noise-cancelling over-ear headphones with Bluetooth connectivity.',
      price: 99.99,
      inStock: true
    },
    {
      id: 2,
      name: 'Smartphone Stand',
      description: 'Adjustable phone holder suitable for all smartphone sizes.',
      price: 14.99,
      inStock: true
    },
    {
      id: 3,
      name: 'Gaming Mouse',
      description: 'Ergonomic gaming mouse with customizable RGB lighting.',
      price: 49.99,
      inStock: false
    },
    {
      id: 4,
      name: 'Mechanical Keyboard',
      description: 'Compact mechanical keyboard with tactile switches.',
      price: 89.99,
      inStock: true
    },
    {
      id: 5,
      name: 'External Hard Drive',
      description: '1TB external hard drive with USB 3.0 support.',
      price: 59.99,
      inStock: false
    }
  ];

  constructor(private http: HttpClient) {}

  ngOnInit() {
   // this.fetchWishlistItems();
  }

  // fetchWishlistItems() {
  //   this.http.get<WishlistItem[]>('http://localhost:3000/wishlist')
  //     .subscribe(
  //       (data) => {
  //         this.wishlistItems = data;
  //       },
  //       (error) => {
  //         console.error('Error fetching wishlist items:', error);
  //       }
  //     );
  // }

  onActionClick(item: WishlistItem) {
    if (item.inStock) {
      console.log('Adding to cart:', item);
      // Implement your add to cart logic here
    } else {
      console.log('Contacting about:', item);
      // Implement your contact us logic here
    }
  }

  removeItem(id: number) {
    // Replace this URL with your actual API endpoint
    this.http.delete(`http://localhost:3000/wishlist/${id}`)
      .subscribe(
        () => {
          this.wishlistItems = this.wishlistItems.filter(item => item.id !== id);
        },
        (error) => {
          console.error('Error removing item:', error);
        }
      );
  }


}
