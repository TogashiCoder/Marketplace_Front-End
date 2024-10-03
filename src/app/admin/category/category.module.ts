import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from './category.component';
import { CategoryCreationComponent } from './category-creation/category-creation.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SubcategoryCreationComponent } from './subcategory-creation/subcategory-creation.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    CategoryComponent,
    CategoryCreationComponent,
    SubcategoryCreationComponent
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ]
})
export class CategoryModule { }
