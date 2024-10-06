import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from 'src/app/services/product.service';
import { CategoryService } from 'src/app/services/category.service';
import { Product } from 'src/app/models/Product';
import { Category } from 'src/app/models/Category';


@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent {

  productForm: FormGroup;
  loading = false;
  error: string | null = null;
  categories: Category[] = [];

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    public dialogRef: MatDialogRef<EditProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { productId: number }
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      stockQuantity: [0, [Validators.required, Validators.min(0)]],
      minimumOrderQuantity: [1, [Validators.required, Validators.min(1)]],
      discountPercentage: [null],
      categoryId: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadProduct();
    this.loadCategories();
  }

  loadProduct(): void {
    this.loading = true;
    this.productService.getProductById(this.data.productId).subscribe({
      next: (product: Product) => {
        this.productForm.patchValue(product);
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load product. Please try again.';
        this.loading = false;
        console.error('Error loading product:', err);
      }
    });
  }

  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (categories: Category[]) => {
        this.categories = categories;
      },
      error: (err) => {
        console.error('Error loading categories:', err);
        this.error = 'Failed to load categories. Please try again.';
      }
    });
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      this.loading = true;
      this.error = null;
      const updatedProduct = { ...this.productForm.value, id: this.data.productId };

      this.productService.updateProduct(this.data.productId, updatedProduct).subscribe({
        next: (response) => {
          this.dialogRef.close(response);
        },
        error: (err) => {
          this.error = 'Failed to update product. Please try again.';
          this.loading = false;
          console.error('Error updating product:', err);
        }
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
