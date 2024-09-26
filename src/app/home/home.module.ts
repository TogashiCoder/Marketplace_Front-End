import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { BasketComponent } from './basket/basket.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductListComponent } from './product-list/product-list.component';
import { NewsletterSubscriptionComponent } from './newsletter-subscription/newsletter-subscription.component';
import { PromoBannerComponent } from './promo-banner/promo-banner.component';
import { IonicModule } from '@ionic/angular';



//dependencies
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { BannerComponent } from './banner/banner.component';
import { PopupNewsletterComponent } from './popup-newsletter/popup-newsletter.component';
import { CeoComponent } from './ceo/ceo.component';
import { BlogComponent } from './blog/blog.component';
import { CategoryUnderBannerComponent } from './category-under-banner/category-under-banner.component';
import { SidebarCategoryComponent } from './sidebar-category/sidebar-category.component';
import { ContainerComponent } from './container/container.component';
import { BigProductComponent } from './big-product/big-product.component';


// import my module
import {UtilModule} from 'src/app/util/util.module'

@NgModule({
  declarations: [
    HomeComponent,
    FavoritesComponent,
    FooterComponent,
    HeaderComponent,
    BasketComponent,
    ProductCardComponent,
    ProductListComponent,
    NewsletterSubscriptionComponent,
    PromoBannerComponent,
    NavbarComponent,
    BannerComponent,
    PopupNewsletterComponent,
    CeoComponent,
    BlogComponent,
    CategoryUnderBannerComponent,
    SidebarCategoryComponent,
    ContainerComponent,
    BigProductComponent,

  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    IonicModule,
    //My Modules
    UtilModule,

  ]
})
export class HomeModule { }
