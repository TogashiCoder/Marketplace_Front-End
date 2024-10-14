import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router'; 
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Product } from 'src/app/models/Product';
import { Category } from 'src/app/models/Category';
import { ProductService } from 'src/app/services/product.service';
import { CategoryService } from 'src/app/services/category.service';


@Component({
  selector: 'app-list-by-category',
  templateUrl: './list-by-category.component.html',
  styleUrls: ['./list-by-category.component.css']
})
export class ListByCategoryComponent {



  category!: Category;
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchTerm: string = '';
  categoryControl = new FormControl('All');
  filteredCategories: Observable<string[]>;
  categories: string[] = ['All'];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  categoryId!: number; // <-- Category ID from URL

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private route: ActivatedRoute  // <-- ActivatedRoute for categoryId
  ) {
    this.filteredCategories = this.categoryControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterCategories(value || ''))
    );
  }

  ngOnInit() {
    this.loadCategories();

    // Capture the categoryId from the route
    this.route.params.subscribe(params => {
      this.categoryId = +params['categoryId'];  // <-- Get the categoryId from URL
      this.loadProducts(this.categoryId);  // <-- Load products by categoryId
    });
  }

  loadCategories() {
    this.categoryService.getAllCategoryNames().subscribe(
      (data) => {
        this.categories = ['All', ...data];
      },
      (error) => {
        console.log('Error fetching categories:', error);
      }
    );
  }

  // Load products based on the categoryId
  loadProducts(categoryId: number) {
    if (categoryId && categoryId !== 0) {
      // Fetch products by categoryId
      this.productService.getAllProductsByCategory(categoryId).subscribe(
        (data: Product[]) => {
          this.products = data;
          this.filteredProducts = this.products;
        },
        (error) => {
          console.log("Error in fetching products by category:", error);
        }
      );
    } else {
      // Fetch all products if categoryId is 0 or not specified
      this.productService.getAllProducts().subscribe(
        (data: Product[]) => {
          this.products = data;
          this.filteredProducts = this.products;
        },
        (error) => {
          console.log("Error in fetching all products:", error);
        }
      );
    }
  }

  private _filterCategories(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.categories.filter(category => category.toLowerCase().includes(filterValue));
  }

  filterProducts() {
    const selectedCategory = this.categoryControl.value;
    this.filteredProducts = this.products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                            product.description.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.categoryName === selectedCategory;
      return matchesSearch && matchesCategory;
    });
    this.currentPage = 1;
  }

  onCategorySelected(event: any) {
    this.filterProducts();
  }






}
