import { Component, OnInit } from '@angular/core';
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
  selectedCategory: string = 'All';
  categories: string[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5; // You can adjust the items per page

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    // Get category names
    this.categoryService.getAllCategoryNames().subscribe(
      (data) => {
        this.categories = data;
      },
      (error) => {
        console.log('Error fetching categories:', error);
      }
    );

    // Get products from API
    this.productService.getAllProducts().subscribe(
      (data: Product[]) => {
        console.log("Data received: ", data);
        this.products = data;
        this.filteredProducts = this.products;

        // Check if products exist before trying to access them
        if (this.products.length > 0) {
          console.log('First product name:', this.products[0]?.name); // Safely log the name of the first product
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

  // Method to filter products based on search term and category
  filterProducts() {
    this.filteredProducts = this.products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                            product.description.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesCategory = this.selectedCategory === 'All' || product.categoryName === this.selectedCategory;
      return matchesSearch && matchesCategory;
    });
    this.currentPage = 1;  // Reset to the first page whenever filters are applied
  }



  AddTocard(){
    //go bro 
  }



}
