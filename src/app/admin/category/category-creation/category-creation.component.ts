import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-category-creation',
  templateUrl: './category-creation.component.html',
  styleUrls: ['./category-creation.component.css']
})
export class CategoryCreationComponent {
  categoryForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      description: ['', [Validators.maxLength(500)]]
    });
  }

  onSubmit() {
    if (this.categoryForm.valid) {
      this.isLoading = true;
      const categoryData = {
        ...this.categoryForm.value,
        subCategoryIds: []
      };

      this.categoryService.createCategory(categoryData).subscribe({
        next: (response) => {
          console.log('Category created successfully', response);
          this.categoryForm.reset();
          this.showSuccessPopup();
        },
        error: (error) => {
          console.error('Error creating category', error);
          this.showErrorPopup(error);
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    }
  }

  private showSuccessPopup() {
    const snackBarRef = this.snackBar.open('Category created successfully!', 'Close', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });

    snackBarRef.onAction().subscribe(() => {
      this.navigateToDashboard();
    });

    snackBarRef.afterDismissed().subscribe((dismissedByAction) => {
      if (!dismissedByAction) {
        this.navigateToDashboard();
      }
    });
  }

  private showErrorPopup(error: any) {
    this.snackBar.open('Error creating category: ' + error.message, 'Close', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

  // choose whatever u want
  private navigateToDashboard() {
    this.router.navigate(['/shop']);
  }
}
