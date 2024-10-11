import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { ProductViewsComponent } from './product-views/product-views.component';
import { authGuard } from '../guiard/auth.guard';
import { OrdersSectionComponent } from './orders-section/orders-section.component';
import { StockAnalyticsComponent } from './stock-analytics/stock-analytics.component';
import { ProductManagementComponent } from './product-management/product-management.component';
import { AddProductComponent } from '../shop/product/add-product/add-product.component';
import { SubcategoryCreationComponent } from '../admin/category/subcategory-creation/subcategory-creation.component';
import { CouponCreattionComponent } from '../seller/coupon-creattion/coupon-creattion.component';
import { CouponDetailsComponent } from '../seller/coupon-details/coupon-details.component';

const routes: Routes = [
  { path: '', component: DashboardComponent,canActivate: [authGuard], data: { roles: ['SELLER', 'ADMIN'] },
  children:[
    { path: 'product-views', component: ProductViewsComponent,canActivate: [authGuard], data: { role: 'SELLER'}},
    { path:'order-analyse',component:OrdersSectionComponent,canActivate: [authGuard], data: { role: 'SELLER'}},
    { path:'stock-analytics',component:StockAnalyticsComponent,canActivate: [authGuard], data: { role: 'SELLER'}},
    { path:'products-management', component:ProductManagementComponent,canActivate: [authGuard], data: { role: 'SELLER'}},
    { path:'new-product',component:AddProductComponent,canActivate: [authGuard], data: { role: 'SELLER'}},
    { path:'category/createCategory',component:SubcategoryCreationComponent,canActivate: [authGuard], data: { role: 'ADMIN'}},
    { path:'seller/coupon-creation',component:CouponCreattionComponent,canActivate: [authGuard], data: { role: 'SELLER'}},
    { path:'seller/rating-details',component:CouponDetailsComponent ,canActivate: [authGuard], data: { role: 'SELLER'}},
  ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
