import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ProductViewsComponent } from './product-views/product-views.component';
import { FormsModule } from '@angular/forms';

import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { OrdersSectionComponent } from './orders-section/orders-section.component';
import { StockAnalyticsComponent } from './stock-analytics/stock-analytics.component';
import { ProductManagementComponent } from './product-management/product-management.component';
import { EditProductComponent } from './edit-product/edit-product.component';

import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    DashboardComponent,
    ProductViewsComponent,
    OrdersSectionComponent,
    StockAnalyticsComponent,
    ProductManagementComponent,
    EditProductComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    NgxChartsModule,
    MatCardModule,
    MatSelectModule,
    NgxChartsModule,
    ReactiveFormsModule,
    MatDialogModule
  ]
})
export class DashboardModule { }
