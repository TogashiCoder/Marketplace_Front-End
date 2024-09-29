import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuyerRoutingModule } from './buyer-routing.module';
import { BuyerComponent } from './buyer.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    BuyerComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    BuyerRoutingModule,
    ReactiveFormsModule
  ]
})
export class BuyerModule { }
