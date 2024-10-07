import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddProductComponent } from './add-product/add-product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { FormsModule } from '@angular/forms';
import { UtilModule } from 'src/app/util/util.module';
import { ProductRatingComponent } from './product-rating/product-rating.component';
import { ReviewsComponent } from './reviews/reviews.component';




@NgModule({
  declarations: [
    ProductComponent,
    AddProductComponent,
    ProductDetailsComponent,
    ProductRatingComponent,
    ReviewsComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    UtilModule
  ]
})
export class ProductModule { }
