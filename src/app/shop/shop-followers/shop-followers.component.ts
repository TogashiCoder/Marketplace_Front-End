import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Follower {
  id: number;
  name: string;
  avatar: string;
  status: string;
  totalPurchases: number;
  lastPurchaseAmount: number;
  joinDate: string;
}

@Component({
  selector: 'app-shop-followers',
  templateUrl: './shop-followers.component.html',
  styleUrls: ['./shop-followers.component.css']
})
export class ShopFollowersComponent {

  followers: Follower[] = [
    { id: 1, name: "John Doe", avatar: "/assets/placeholder.svg", status: "Last purchase: 2 days ago", totalPurchases: 8, lastPurchaseAmount: 120, joinDate: "Jan 15, 2023" },
    { id: 2, name: "Jane Smith", avatar: "/assets/placeholder.svg", status: "Follower since: Jan 2023", totalPurchases: 15, lastPurchaseAmount: 89, joinDate: "Jan 3, 2023" },
    { id: 3, name: "Alex Johnson", avatar: "/assets/placeholder.svg", status: "Total purchases: 15", totalPurchases: 15, lastPurchaseAmount: 210, joinDate: "Mar 22, 2023" },
    { id: 4, name: "Emily Brown", avatar: "/assets/placeholder.svg", status: "New follower", totalPurchases: 1, lastPurchaseAmount: 45, joinDate: "Jun 10, 2023" },
    { id: 5, name: "Michael Lee", avatar: "/assets/placeholder.svg", status: "Frequent buyer", totalPurchases: 25, lastPurchaseAmount: 180, joinDate: "Nov 5, 2022" },
  ];

  searchTerm: string = '';
  sortBy: string = 'name';
  showNotifyAllDialog: boolean = false;
  notificationMessage: string = '';
  showSortDropdown: boolean = false;
  showActionsDropdown: { [key: number]: boolean } = {};

  ngOnInit() {
    // You can add any initialization logic here
  }

  get filteredFollowers() {
    return this.followers
      .filter(follower => follower.name.toLowerCase().includes(this.searchTerm.toLowerCase()))
      .sort((a, b) => {
        if (this.sortBy === "name") return a.name.localeCompare(b.name);
        if (this.sortBy === "purchases") return b.totalPurchases - a.totalPurchases;
        if (this.sortBy === "recent") return new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime();
        return 0;
      });
  }

  openNotifyAllDialog() {
    this.showNotifyAllDialog = true;
  }

  closeNotifyAllDialog() {
    this.showNotifyAllDialog = false;
    this.notificationMessage = '';
  }

  sendNotification() {
    // Implement your notification logic here
    console.log('Sending notification:', this.notificationMessage);
    this.closeNotifyAllDialog();
  }

  toggleSortDropdown() {
    this.showSortDropdown = !this.showSortDropdown;
  }

  closeSortDropdown() {
    this.showSortDropdown = false;
  }

  setSortBy(sort: string) {
    this.sortBy = sort;
    this.closeSortDropdown();
  }

  toggleActionsDropdown(followerId: number) {
    this.showActionsDropdown[followerId] = !this.showActionsDropdown[followerId];
  }

  closeActionsDropdown(followerId: number) {
    this.showActionsDropdown[followerId] = false;
  }

  viewProfile(followerId: number) {
    console.log('Viewing profile of follower:', followerId);
    this.closeActionsDropdown(followerId);
  }

  sendOffer(followerId: number) {
    console.log('Sending offer to follower:', followerId);
    this.closeActionsDropdown(followerId);
  }

  removeFollower(followerId: number) {
    console.log('Removing follower:', followerId);
    this.closeActionsDropdown(followerId);
  }
}


