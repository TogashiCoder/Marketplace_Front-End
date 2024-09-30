import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-inside-shop-search',
  templateUrl: './inside-shop-search.component.html',
  styleUrls: ['./inside-shop-search.component.css']
})
export class InsideShopSearchComponent {
  @Output() search = new EventEmitter<string>();

  searchTerm: string = '';

  onSearch(): void {
    this.search.emit(this.searchTerm);
  }

  onInputChange(event: Event): void {
    this.searchTerm = (event.target as HTMLInputElement).value;
    this.onSearch();
  }
}
