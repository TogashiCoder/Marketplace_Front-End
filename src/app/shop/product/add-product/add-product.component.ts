import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/Category';
import { finalize, debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Observable, of, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  productForm!: FormGroup;
  isLoading = false;
  categories: Category[] = [];
  filteredCategories$: Observable<Category[]> = of([]);
  selectedCategory: Category | null = null;
  selectedImages: File[] = [];
  selectedVideos: File[] = [];
  errorMessage = '';
  showSuccessPopup = false;

  private categoriesSubject = new BehaviorSubject<Category[]>([]);

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      price: [0, [Validators.required, Validators.min(0)]],
      minimumOrderQuantity: [1, [Validators.required, Validators.min(1)]],
      stockQuantity: [0, [Validators.required, Validators.min(0)]],
      sellerId: [this.getSellerId()],
      categorySearch: ['', [Validators.required]]
    }, { validators: this.minOrderQuantityValidator });

    this.loadCategories();
    this.setupCategorySearch();
  }

  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
        this.categoriesSubject.next(categories);
      },
      error: (error) => {
        console.error('Error loading categories:', error);
        this.errorMessage = 'Error loading categories. Please try again.';
      }
    });
  }

  setupCategorySearch(): void {
    this.filteredCategories$ = this.productForm.get('categorySearch')!.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      map(searchTerm => this.filterCategories(searchTerm))
    );
  }

  filterCategories(searchTerm: string): Category[] {
    if (!searchTerm) return [];
    searchTerm = searchTerm.toLowerCase();
    return this.categories.filter(category =>
      category.name.toLowerCase().includes(searchTerm)
    );
  }

  selectCategory(category: Category): void {
    this.selectedCategory = category;
    this.productForm.patchValue({ categorySearch: category.name });
  }

  minOrderQuantityValidator(control: AbstractControl): ValidationErrors | null {
    const minOrderQty = control.get('minimumOrderQuantity');
    const stockQty = control.get('stockQuantity');

    if (minOrderQty && stockQty && minOrderQty.value > stockQty.value && stockQty.value !== 0) {
      minOrderQty.setErrors({ ...(minOrderQty.errors || {}), exceedsStock: true });
      return { minOrderExceedsStock: true };
    }

    if (minOrderQty && minOrderQty.errors) {
      const { exceedsStock, ...errors } = minOrderQty.errors;
      if (Object.keys(errors).length === 0) {
        minOrderQty.setErrors(null);
      } else {
        minOrderQty.setErrors(errors);
      }
    }

    return null;
  }

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

  onSubmit(): void {
    if (this.productForm.invalid || this.selectedImages.length < 1 || !this.selectedCategory) {
      this.productForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const formData = new FormData();
    const productData = {
      ...this.productForm.value,
      categoryId: this.selectedCategory.id
    };
    delete productData.categorySearch; // Remove the search field from the data

    formData.append('product', JSON.stringify(productData));

    this.selectedImages.forEach((file) => {
      formData.append('images', file);
    });
    this.selectedVideos.forEach((file) => {
      formData.append('videos', file);
    });

    this.productService.createProduct(formData)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (response) => {
          console.log('Product created successfully!', response);
          this.showSuccessPopup = true;
        },
        error: (error) => {
          console.error('Error creating product:', error);
          this.errorMessage = 'An error occurred while creating the product. Please try again.';
        }
      });
  }

  onNewProduct(): void {
    this.showSuccessPopup = false;
    this.productForm.reset();
    this.selectedCategory = null;
    this.selectedImages = [];
    this.selectedVideos = [];
  }

  onShowProducts(): void {
    this.router.navigate(['/dashboard/products-management']);
  }

  get formControls() {
    return this.productForm.controls;
  }

  getSellerId(): number {
    const id: number | null = this.authService.getId();
    if (id === null) {
      throw new Error("Seller ID is not available");
    }
    return id;
  }
}
