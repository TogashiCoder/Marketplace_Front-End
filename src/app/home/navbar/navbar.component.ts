import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {

  showRegistrationPrompt: boolean = false;
  registrationPromptMessage: string = '';
  registrationPromptAction: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  canPerformAction(): boolean {
    return this.authService.isLoggedIn() && this.authService.getUserRole() === 'BUYER';
  }

  onFavoriteClick(): void {
    if (!this.canPerformAction()) {
      this.showRegistrationPrompt = true;
      this.registrationPromptMessage = 'Please register to view  your wishlist.';
      this.registrationPromptAction = 'addToWishlist';
    } else {
      // Logic to add favorite if the user is a buyer
      this.router.navigate(['/shop/favorite']);

    }
  }

  onBasketClick(): void {
    if (!this.canPerformAction()) {
      this.showRegistrationPrompt = true;
      this.registrationPromptMessage = 'Please register to view your shopping cart.';
      this.registrationPromptAction = 'viewCart';
    } else {
      // Logic to navigate to the shopping cart
      this.router.navigate(['/shop/Shopping-cart']);
    }
  }

  onRegister(): void {
    this.showRegistrationPrompt = false;
    this.router.navigate(['/login'], {
      queryParams: {
        returnUrl: this.router.url,
        action: this.registrationPromptAction
      }
    });
  }

  onCloseRegistrationPrompt(): void {
    this.showRegistrationPrompt = false;
  }

}
