import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {

  products:Product[]= [];

  constructor(
    private productService:ProductService,
    private router:Router,
  ){}


  ngOnInit(): void {
     this.productService.getProductsByCategory(16).subscribe(
      (reciveData)=>{
        this.products = reciveData;
      },
      (error)=>{
        console.error(error);
      }
     )
  }



  navigateToProduct(productId: number) {
    this.router.navigate(['/shop/product/details/', productId]);
  }


}
