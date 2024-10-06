import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/Product';
import { AuthService } from 'src/app/services/auth.service';
import { EditProductComponent } from '../edit-product/edit-product.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css']
})
export class ProductManagementComponent {

  products: Product[] = [];
  selectedProduct: Product | null = null;
  loading: boolean = true;
  error: string | null = null;
  sellerId: number | null = null;

  constructor(
    private productService: ProductService,
    private authService: AuthService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.sellerId = this.getSellerId();
    if (this.sellerId) {
      this.loadProducts();
    } else {
      this.error = 'Unable to retrieve seller ID. Please log in again.';
      this.loading = false;
    }
  }

  getSellerId(): number | null {
    return this.authService.getId();
  }

  loadProducts(): void {
    if (!this.sellerId) {
      this.error = 'Seller ID not available';
      this.loading = false;
      return;
    }

    this.loading = true;
    this.error = null;
    this.productService.getAllProductsBySellerId(this.sellerId).subscribe({
      next: (data) => {
        this.products = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load products. Please try again later.';
        this.loading = false;
        console.error('Error loading products:', err);
      }
    });
  }


  handleEdit(id: number): void {
    const dialogRef = this.dialog.open(EditProductComponent, {
      width: '6OOpx',
      data: { productId: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Update the product in the local array
        const index = this.products.findIndex(p => p.id === id);
        if (index !== -1) {
          this.products[index] = result;
        }
      }
    });
  }

  handleDelete(id: number): void {
    this.productService.deleteProduct(id).subscribe({
      next: () => {
        this.products = this.products.filter(product => product.id !== id);
      },
      error: (err) => {
        console.error('Error deleting product:', err);
        this.error = 'Failed to delete product. Please try again.';
      }
    });
  }

  openDialog(product: Product): void {
    this.selectedProduct = product;
  }

  closeDialog(): void {
    this.selectedProduct = null;
  }


}
