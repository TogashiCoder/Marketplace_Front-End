import { Component, OnInit } from '@angular/core';
import { Product } from '../models/Product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit{

  products:Product[]= [];

  constructor(
    private productService:ProductService,
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


  // getProductByCategory(){
  //   return this.productService.getProductsByCategorynumber16(16)
  // }



}
