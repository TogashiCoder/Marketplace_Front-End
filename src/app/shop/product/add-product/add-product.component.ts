import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/Category';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements  OnInit{

  productForm!: FormGroup;
  isLoading = false;
  categories: Category[] = [];
  selectedImages: File[] = [];
  selectedVideos: File[] = [];
  errorMessage = '';
  showSuccessMessage = false;



  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService
  ) {}


  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      price: [0, [Validators.required, Validators.min(0)]],
      minimumOrderQuantity: [1, [Validators.required, Validators.min(1)]],
      stockQuantity: [0, [Validators.required, Validators.min(0)]],
      sellerId: [this.getSellerId()],
      categoryId: [0, [Validators.required]]
    });

    this.loadCategories();
  }


  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (error) => {
        console.error('Error loading categories:', error);
        this.errorMessage = 'Error loading categories. Please try again.';
      }
    });
  }

  // Method to handle file selection
  onFileChange(event: Event, type: 'images' | 'videos'): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const files = Array.from(input.files);
      if (type === 'images') {
        this.selectedImages = files;
      } else if (type === 'videos') {
        this.selectedVideos = files;
      }
    }
  }

  // Method to handle form submission
  onSubmit(): void {
    if (this.productForm.invalid || this.selectedImages.length < 1) {
      this.productForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    // Prepare FormData for file and form submission
    const formData = new FormData();
    const productData = JSON.stringify(this.productForm.value);
    formData.append('product', productData);

    // Append images and videos to FormData
    this.selectedImages.forEach((file) => {
      formData.append('images', file);
    });
    this.selectedVideos.forEach((file) => {
      formData.append('videos', file);
    });

    // Call ProductService to create a new product
    this.productService.createProduct(formData)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (response) => {
          console.log('Product created successfully!', response);
          this.showSuccessMessage = true;
          this.productForm.reset();
          this.selectedImages = [];
          this.selectedVideos = [];
          setTimeout(() => (this.showSuccessMessage = false), 5000);
        },
        error: (error) => {
          console.error('Error creating product:', error);
          this.errorMessage = 'An error occurred while creating the product. Please try again.';
        }
      });
  }

  get formControls() {
    return this.productForm.controls;
  }


  getSellerId():number{
    return 1;
  }




}
