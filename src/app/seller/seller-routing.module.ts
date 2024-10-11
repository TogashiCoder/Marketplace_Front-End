import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SellerComponent } from './seller.component';
import { RegisterComponent } from './register/register.component';
import { CouponCreattionComponent } from './coupon-creattion/coupon-creattion.component';
import { authGuard } from '../guiard/auth.guard';
import { CouponDetailsComponent } from './coupon-details/coupon-details.component';

const routes: Routes = [
  { path: '', component: SellerComponent },
  { path:'register',component:RegisterComponent},
  { path:'coupon-creation',component:CouponCreattionComponent ,canActivate:[authGuard],data: {role:'SELLER'},},
  { path:'rating-details',component:CouponDetailsComponent ,canActivate:[authGuard],data: {role:'SELLER'},}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellerRoutingModule { }
