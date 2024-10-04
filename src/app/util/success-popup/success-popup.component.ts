import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-success-popup',
  templateUrl: './success-popup.component.html',
  styleUrls: ['./success-popup.component.css']
})
export class SuccessPopupComponent {
  @Input() show: boolean = false;
  @Input() message: string = '';
  @Output() newProduct = new EventEmitter<void>();
  @Output() showProducts = new EventEmitter<void>();

  onNewProduct() {
    this.newProduct.emit();
  }

  onShowProducts() {
    this.showProducts.emit();
  }
}
