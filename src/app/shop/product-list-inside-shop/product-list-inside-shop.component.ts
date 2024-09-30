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

  getImageUrl(product: Product): string {
    return product.imageUrls && product.imageUrls.length > 0
      ? product.imageUrls[0]
      : `/placeholder.svg?height=200&width=200&text=${product.name}`;
  }
}
