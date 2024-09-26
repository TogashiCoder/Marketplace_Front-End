import { Component, OnInit } from '@angular/core';

// Define the Product interface
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  rating: number;
  category: string;
  image: string;
}

@Component({
  selector: 'app-list-shop',
  templateUrl: './list-shop.component.html',
  styleUrls: ['./list-shop.component.css']
})
export class ListShopComponent implements OnInit {

  // Array of products
  products: Product[] = [
    {
      id: 1,
      name: 'Premium Running Shoes',
      description: 'High-performance running shoes with advanced cushioning technology.',
      price: 129.99,
      rating: 4.5,
      category: 'Running',
      image: 'assets/running-shoes.jpg'
    },
    {
      id: 2,
      name: 'Professional Training Kit',
      description: 'Complete training kit for serious athletes, including resistance bands and weights.',
      price: 89.99,
      rating: 4.8,
      category: 'Training',
      image: 'assets/training-kit.jpg'
    },
    {
      id: 3,
      name: 'Lifestyle Sports Jacket',
      description: 'Stylish and comfortable sports jacket for everyday wear.',
      price: 79.99,
      rating: 4.2,
      category: 'Lifestyle',
      image: 'assets/sports-jacket.jpg'
    },
    {
      id: 4,
      name: 'Ultra-light Hiking Backpack',
      description: 'Durable and lightweight backpack perfect for hiking and outdoor adventures.',
      price: 149.99,
      rating: 4.7,
      category: 'Outdoor',
      image: 'assets/hiking-backpack.jpg'
    }
  ];

  // Filtered products array
  filteredProducts: Product[] = [];

  // Search term and selected category for filtering
  searchTerm: string = '';
  selectedCategory: string = 'All';
  categories: string[] = ['All', 'Running', 'Training', 'Lifestyle', 'Outdoor'];

  // Pagination variables
  currentPage: number = 1;
  itemsPerPage: number = 2;  // You can adjust the items per page

  // OnInit lifecycle hook
  ngOnInit() {
    this.filteredProducts = this.products;
  }

  // Method to filter products based on search term and category
  filterProducts() {
    this.filteredProducts = this.products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                            product.description.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesCategory = this.selectedCategory === 'All' || product.category === this.selectedCategory;
      return matchesSearch && matchesCategory;
    });
    this.currentPage = 1;  // Reset to the first page whenever filters are applied
  }
}
