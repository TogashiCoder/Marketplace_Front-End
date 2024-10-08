import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  { path:'login',component:LoginComponent},
  { path: ''    , loadChildren: () => import('./home/home.module').then(m => m.HomeModule) , pathMatch: 'full'},
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'shop', loadChildren: () => import('./shop/shop.module').then(m => m.ShopModule) },
  { path: 'buyer', loadChildren: () => import('./buyer/buyer.module').then(m => m.BuyerModule) },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: 'seller', loadChildren: () => import('./seller/seller.module').then(m => m.SellerModule) },
  { path: 'util', loadChildren: () => import('./util/util.module').then(m => m.UtilModule) },
  { path:'test',component:TestComponent},
  { path: 'reset-password', loadChildren: () => import('./reset-password/reset-password.module').then(m => m.ResetPasswordModule) },
  { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
