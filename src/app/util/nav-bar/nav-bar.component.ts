import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  isMenuActive = false;
  userRole: string | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.userRole = this.authService.getUserRole();
  }

  toggleMenu() {
    this.isMenuActive = !this.isMenuActive;
  }

  isBuyer(): boolean {
    return this.userRole === 'BUYER';
  }

  isAdminOrSeller(): boolean {
    return this.userRole === 'ADMIN' || this.userRole === 'SELLER';
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

}
