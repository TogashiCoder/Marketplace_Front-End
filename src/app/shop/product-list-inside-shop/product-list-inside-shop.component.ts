import { Component, Input } from '@angular/core';
import { Product } from 'src/app/models/Product';

@Component({
  selector: 'app-product-list-inside-shop',
  templateUrl: './product-list-inside-shop.component.html',
  styleUrls: ['./product-list-inside-shop.component.css']
})
export class ProductListInsideShopComponent {
  @Input() products: Product[] = [];
  @Input() isLoading = false;
  @Input() error: string | null = null;

  sortOption: string = 'name';

  getImageUrl(product: Product): string {
    return product.imageUrls && product.imageUrls.length > 0
      ? product.imageUrls[0]
      : `/placeholder.svg?height=200&width=200&text=${product.name}`;
  }

  sortProducts(): Product[] {
    return [...this.products].sort((a, b) => {
      switch (this.sortOption) {
        case 'new':
          return (new Date(b.createdAt).getTime() || 0) - (new Date(a.createdAt).getTime() || 0);
        case 'price':
          return (a.price || 0) - (b.price || 0);
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'stock':
          return (b.stockQuantity || 0) - (a.stockQuantity || 0);
        default:
          return (a.name || '').localeCompare(b.name || '');
      }
    });
  }
}
