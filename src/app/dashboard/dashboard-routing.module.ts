import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { ProductViewsComponent } from './product-views/product-views.component';
import { authGuard } from '../guiard/auth.guard';
import { OrdersSectionComponent } from './orders-section/orders-section.component';
import { StockAnalyticsComponent } from './stock-analytics/stock-analytics.component';
import { ProductManagementComponent } from './product-management/product-management.component';
import { AddProductComponent } from '../shop/product/add-product/add-product.component';

const routes: Routes = [
  { path: '', component: DashboardComponent,canActivate: [authGuard], data: { roles: ['SELLER', 'ADMIN'] },
  children:[
    { path: 'product-views', component: ProductViewsComponent,canActivate: [authGuard], data: { role: 'SELLER'}},
    { path:'order-analyse',component:OrdersSectionComponent,canActivate: [authGuard], data: { role: 'SELLER'}},
    { path:'stock-analytics',component:StockAnalyticsComponent},
    { path:'products-management', component:ProductManagementComponent},
    { path:'new-product',component:AddProductComponent}

  ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
