import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopComponent } from './shop.component';
import { FavoriteComponent} from './favorite/favorite.component'
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component'
import { ShopProfileComponent } from './shop-profile/shop-profile.component';
import { ShopFollowersComponent } from './shop-followers/shop-followers.component';
import { ListShopComponent } from './list-shop/list-shop.component';
const routes: Routes = [
  { path: '', component: ShopComponent },
  { path: 'favorite', component: FavoriteComponent},
  { path: 'Shopping-cart',component:ShoppingCartComponent},
  { path: 'my-shop',component:ShopProfileComponent},
  { path: 'product', loadChildren: () => import('./product/product.module').then(m => m.ProductModule) },
  { path: 'Shop-Followers',component:ShopFollowersComponent},
  { path: 'Shop-List',component:ListShopComponent},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
