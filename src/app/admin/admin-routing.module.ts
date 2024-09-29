import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { RegisterComponent } from './register/register.component';
import { authGuard } from '../guiard/auth.guard';

const routes: Routes = [
  { path: '', component: AdminComponent },
  { path: 'register', component:RegisterComponent,canActivate:[authGuard],data: {role:'ADMIN'},},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
