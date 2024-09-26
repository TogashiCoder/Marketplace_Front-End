import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

import { authGuard } from 'src/app/guiard/auth.guard';

const routes: Routes = [
  { path: '', component: ProductComponent },
  { path:'add', component:AddProductComponent ,canActivate: [authGuard], data: { role: 'SELLER' },},
  { path:'details',component:ProductDetailsComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
