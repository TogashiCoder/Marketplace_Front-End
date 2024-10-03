import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category.component';
import { CategoryCreationComponent } from './category-creation/category-creation.component';
import { authGuard } from 'src/app/guiard/auth.guard';
import { SubcategoryCreationComponent } from './subcategory-creation/subcategory-creation.component';

const routes: Routes = [
  { path: '', component: CategoryComponent },
  { path:'newcategory', component:CategoryCreationComponent,canActivate:[authGuard],data: {role:'ADMIN'},},
  { path:'newSubCategory',component:SubcategoryCreationComponent,canActivate:[authGuard],data: {role:'ADMIN'},}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
