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

@NgModule({
  declarations: [
    DashboardComponent,
    ProductViewsComponent,
    OrdersSectionComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    NgxChartsModule,
    MatCardModule,
    MatSelectModule,
    NgxChartsModule
  ]
})
export class DashboardModule { }
