import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellerRoutingModule } from './seller-routing.module';
import { SellerComponent } from './seller.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CouponCreattionComponent } from './coupon-creattion/coupon-creattion.component';


import { FormsModule } from '@angular/forms';
import { CouponDetailsComponent } from './coupon-details/coupon-details.component';

@NgModule({
  declarations: [
    SellerComponent,
    RegisterComponent,
    CouponCreattionComponent,
    CouponDetailsComponent
  ],
  imports: [
    CommonModule,
    SellerRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SellerModule { }
