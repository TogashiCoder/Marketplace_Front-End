import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { ProductViewsComponent } from './product-views/product-views.component';
import { authGuard } from '../guiard/auth.guard';
import { OrdersSectionComponent } from './orders-section/orders-section.component';

const routes: Routes = [
  { path: '', component: DashboardComponent,canActivate: [authGuard], data: { roles: ['SELLER', 'ADMIN'] },
    children:[
      { path: 'product-views', component: ProductViewsComponent,canActivate: [authGuard], data: { role: 'SELLER'}},
      { path:'order-analyse',component:OrdersSectionComponent}
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
