import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuyerComponent } from './buyer.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', component: BuyerComponent },
  { path:'register',component:RegisterComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuyerRoutingModule { }
