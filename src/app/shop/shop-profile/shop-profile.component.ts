import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Seller } from 'src/app/models/Seller';
import { Product } from 'src/app/models/Product';
import { SellerService } from 'src/app/services/seller.service';
import { ProductService } from 'src/app/services/product.service';
import { RatingService } from 'src/app/services/rating.service';


@Component({
  selector: 'app-shop-profile',
  templateUrl: './shop-profile.component.html',
  styleUrls: ['./shop-profile.component.css']
})
export class ShopProfileComponent implements OnInit {
  seller!: Seller;
  allProducts: Product[] = [];
  displayedProducts: Product[] = [];

  constructor(
    private route: ActivatedRoute,
    private sellerService: SellerService,
    private productService: ProductService,
    private ratingService:RatingService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const sellerId = +params['id'];
      console.log("from SHop Profil : ",sellerId)
      this.loadSellerData(sellerId);
      this.loadSellerProducts(sellerId);
      console.log("from shop profile")
    });
  }

  private loadSellerData(sellerId: number) {
    this.sellerService.getSellerById(sellerId).subscribe(
      (seller: Seller) => {
        this.seller = seller;
      },
      error => console.error('Error fetching seller data:', error)
    );
  }

  private loadSellerProducts(sellerId: number) {
    this.productService.getAllProductsBySellerId(sellerId).subscribe(
      (products: Product[]) => {
        this.allProducts = products;
        this.displayedProducts = products;
      },
      error => console.error('Error fetching products:', error)
    );
  }

  onSearch(searchTerm: string) {
    if (!searchTerm) {
      this.displayedProducts = this.allProducts;
    } else {
      this.displayedProducts = this.allProducts.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  }





}
