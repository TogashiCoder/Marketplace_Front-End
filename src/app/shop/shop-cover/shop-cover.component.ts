import { Component ,Input} from '@angular/core';
import { Seller } from 'src/app/models/Seller';

@Component({
  selector: 'app-shop-cover',
  templateUrl: './shop-cover.component.html',
  styleUrls: ['./shop-cover.component.css']
})
export class ShopCoverComponent {

  @Input() seller: Seller | null = null;

  get coverImageUrl(): string {
    return this.seller?.shopCoverImage || 'assets/shopCover.svg';
  }

}
