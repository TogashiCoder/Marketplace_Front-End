import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import { ShopComponent } from './shop.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { HttpClientModule } from '@angular/common/http';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ShopProfileComponent } from './shop-profile/shop-profile.component';
import { ShopCoverComponent } from './shop-cover/shop-cover.component';
import { ShopDetailsComponent } from './shop-details/shop-details.component';
import { ShopFollowComponent } from './shop-follow/shop-follow.component';
import { InsideShopSearchComponent } from './inside-shop-search/inside-shop-search.component';
import { ProductListInsideShopComponent } from './product-list-inside-shop/product-list-inside-shop.component';
import { ShopProfilFooterComponent } from './shop-profil-footer/shop-profil-footer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ShopFollowersComponent } from './shop-followers/shop-followers.component';
import { FormsModule } from '@angular/forms';



import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { ListShopComponent } from './list-shop/list-shop.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ScrollingModule } from '@angular/cdk/scrolling';




import { UtilModule } from 'src/app/util/util.module';



@NgModule({
  declarations: [
    ShopComponent,
    FavoriteComponent,
    ShoppingCartComponent,
    ShopProfileComponent,
    ShopCoverComponent,
    ShopDetailsComponent,
    ShopFollowComponent,
    InsideShopSearchComponent,
    ProductListInsideShopComponent,
    ShopProfilFooterComponent,
    ShopFollowersComponent,
    ListShopComponent,

  ],
  imports: [
    CommonModule,
    ShopRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    //
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatListModule,
    MatMenuModule,
    MatDialogModule,
    MatDividerModule,
    ScrollingModule,
    NgxPaginationModule,
    UtilModule





  ]
})
export class ShopModule { }
