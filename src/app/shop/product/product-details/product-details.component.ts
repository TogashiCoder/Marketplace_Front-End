import { Component } from '@angular/core';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {

  product = {
    "id": 2,
    "name": "Reiciendis tempora NReiciendis tempora N",
    "description": "Reiciendis tempora N Reiciendis tempora N Reiciendis tempora N Reiciendis tempora N Reiciendis tempora NReiciendis ",
    "price": 877.00,
    "stockQuantity": 143,
    "minimumOrderQuantity": 455,
    "discountPercentage": null,
    "rating": 3,
    "sellerId": 1,
    "imageUrls": [
      "https://res.cloudinary.com/dbqa47fjt/image/upload/v1727189168/nhndev/product/1_20240924154607.jpg.jpg",
      "https://res.cloudinary.com/dbqa47fjt/image/upload/v1727189170/nhndev/product/2_20240924154609.jpg.jpg",
      "https://res.cloudinary.com/dbqa47fjt/image/upload/v1727189171/nhndev/product/3_20240924154610.jpg.jpg",
      "https://res.cloudinary.com/dbqa47fjt/image/upload/v1727189172/nhndev/product/4_20240924154611.jpg.jpg"
    ],
    "videoUrls": [
      "https://res.cloudinary.com/dbqa47fjt/video/upload/v1727189174/nhndev/product/copperDemo_20240924154613.mp4.mp4",
      "https://res.cloudinary.com/dbqa47fjt/video/upload/v1727189174/nhndev/product/copperDemo_20240924154613.mp4.mp4"
    ],
    "createdAt": "2024-09-23T09:04:32.983609",
    "updatedAt": null,
    "categoryId": 2
  };

  selectedMedia = 'image0';
  isZoomed = false;

  ngOnInit(): void {
  }

  handleMediaChange(mediaId: string): void {
    this.selectedMedia = mediaId;
    this.isZoomed = false;
  }

  getMediaIndex(mediaId: string): number {
    return parseInt(mediaId.replace(/\D/g, ''), 10);
  }

}
