import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Product } from 'src/app/models/Product';
import { Category } from 'src/app/models/Category';
import { ProductService } from 'src/app/services/product.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-list-shop',
  templateUrl: './list-shop.component.html',
  styleUrls: ['./list-shop.component.css']
})
export class ListShopComponent implements OnInit {
  category!: Category;
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchTerm: string = '';
  categoryControl = new FormControl('All');
  filteredCategories: Observable<string[]>;
  categories: string[] = ['All'];
  currentPage: number = 1;
  itemsPerPage: number = 5;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService
  ) {
    this.filteredCategories = this.categoryControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterCategories(value || ''))
    );
  }

  ngOnInit() {
    this.loadCategories();
    this.loadProducts();
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

  loadProducts() {
    this.productService.getAllProducts().subscribe(
      (data: Product[]) => {
        console.log("Data received: ", data);
        this.products = data;
        this.filteredProducts = this.products;
        if (this.products.length > 0) {
          console.log('First product name:', this.products[0]?.name);
        } else {
          console.log("No products found.");
        }
      },
      (error) => {
        console.log("Error in fetching products data from API");
        console.error(error);
      }
    );
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

  AddTocard() {
  }
}
