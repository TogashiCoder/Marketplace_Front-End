import { Component, OnInit,HostListener } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [
    trigger('sidebarState', [
      state('open', style({
        transform: 'translateX(0%)'
      })),
      state('closed', style({
        transform: 'translateX(-100%)'
      })),
      transition('open <=> closed', [
        animate('300ms ease-in-out')
      ])
    ])
  ]

})
export class DashboardComponent {
  sidebarClosed = true;
  profileDropdownActive = false;
  isMobile = false;
  role:String = "";


  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  constructor(
    private authService:AuthService
  ) {
    this.checkScreenSize();
  }

  ngOnInit(): void {
    this.role =  this.authService.getUserRole();
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth <= 768;
    if (!this.isMobile) {
      this.sidebarClosed = false;
    }
  }

  toggleSidebar(): void {
    this.sidebarClosed = !this.sidebarClosed;
  }

  closeSidebar(): void {
    this.sidebarClosed = true;
  }

  toggleProfileDropdown(): void {
    this.profileDropdownActive = !this.profileDropdownActive;
  }


}
