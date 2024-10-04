import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/Category';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-subcategory-creation',
  templateUrl: './subcategory-creation.component.html',
  styleUrls: ['./subcategory-creation.component.css']
})
export class SubcategoryCreationComponent implements OnInit {

  categoryForm: FormGroup;
  allCategories: Category[] = [];
  filteredCategories: Category[] = [];
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.categoryForm = this.fb.group({
      level: ['level1', Validators.required],
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      description: ['', [Validators.maxLength(500)]],
      parentCategoryId: ['']
    });
  }

  ngOnInit() {
    this.loadAllCategories();
  }

  loadAllCategories() {
    this.categoryService.getAllCategories().subscribe({
      next: (categories) => {
        this.allCategories = categories;
        this.filterCategoriesByLevel();
      },
      error: (error) => {
        console.error('Error loading categories', error);
      }
    });
  }

  onLevelChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value;
    this.categoryForm.patchValue({ level: selectedValue });
    this.filterCategoriesByLevel();
  }

  filterCategoriesByLevel() {
    const selectedLevel = this.categoryForm.get('level')?.value;
    switch (selectedLevel) {
      case 'level1':
        this.filteredCategories = []; // No parent for main categories
        break;
      case 'level2':
        this.filteredCategories = this.allCategories.filter(c => !c.parentCategoryId);
        break;
      case 'level3':
        this.filteredCategories = this.allCategories.filter(c => c.parentCategoryId && !c.parentCategoryId.toString().includes('.'));
        break;
      case 'level4':
        this.filteredCategories = this.allCategories.filter(c => c.parentCategoryId && c.parentCategoryId.toString().includes('.') && c.parentCategoryId.toString().split('.').length === 2);
        break;
    }
  }

  onSubmit() {
    if (this.categoryForm.valid) {
      this.isLoading = true;

      const formData = this.categoryForm.value;
      let categoryData: Category = {
        name: formData.name,
        description: formData.description,
        subCategoryIds: []
      };

      if (formData.level !== 'level1') {
        categoryData.parentCategoryId = formData.parentCategoryId;
      }

      this.categoryService.createCategory(categoryData).subscribe({
        next: (response) => {
          this.snackBar.open('Category created successfully', 'Close', { duration: 3000 });
          this.categoryForm.reset({ level: 'level1' });
          this.router.navigate(['/categories']);
        },
        error: (error) => {
          console.error('Error creating category', error);
          this.snackBar.open('Failed to create category', 'Close', { duration: 3000 });
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    }
  }
}
