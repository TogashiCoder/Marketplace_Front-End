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
      level: ['level1', Validators.required],  // Default to Main Category
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      description: ['', [Validators.maxLength(500)]],
      parentCategoryId: ['']  // Parent category or subcategory based on level
    });
  }

  ngOnInit() {
    // Load all categories on initialization
    this.loadAllCategories();
  }

  // Fetch all categories (root, subcategories, etc.)
  loadAllCategories() {
    this.categoryService.getAllCategories().subscribe({
      next: (categories) => {
        this.allCategories = categories;
        // Default filtering to root categories (for Main Category level)
        this.filteredCategories = this.allCategories.filter(c => !c.parentCategoryId);
      },
      error: (error) => {
        console.error('Error loading categories', error);
      }
    });
  }

  // Handle level change (Main Category, Subcategory, Sub-subcategory, Additional Subcategory)
  onLevelChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value;

    // Logic for filtering categories based on selected level
    if (selectedValue === 'level1') {
      this.filteredCategories = this.allCategories.filter(c => !c.parentCategoryId);  // Root categories
    } else if (selectedValue === 'level2') {
      this.filteredCategories = this.allCategories.filter(c => c.parentCategoryId && !c.subCategoryIds?.length);  // Categories without subcategories
    } else if (selectedValue === 'level3') {
      this.filteredCategories = this.allCategories.filter(c => c.subCategoryIds?.length);  // Categories with subcategories
    } else if (selectedValue === 'level4') {
      // Additional logic for further subcategories
      this.filteredCategories = this.allCategories.filter(c => c.parentCategoryId && c.subCategoryIds?.length); // Example filter
    }
  }

  onSubmit() {
    if (this.categoryForm.valid) {
      this.isLoading = true;

      const level = this.categoryForm.value.level;
      let categoryData: Category = {
        name: this.categoryForm.value.name,
        description: this.categoryForm.value.description,
        subCategoryIds: []
      };

      // Assign parent category or subcategory based on the selected level
      if (level !== 'level1') {
        categoryData.parentCategoryId = this.categoryForm.value.parentCategoryId;
      }

      this.categoryService.createCategory(categoryData).subscribe({
        next: (response) => {
          this.snackBar.open('Category created successfully', 'Close', { duration: 3000 });
          this.categoryForm.reset();
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
