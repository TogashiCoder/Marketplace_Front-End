import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { format, isBefore, isAfter, startOfDay,parse } from 'date-fns';
import { CouponmanagerService,CouponDto } from 'src/app/services/couponmanager.service';
import { AuthService } from 'src/app/services/auth.service';

interface Coupon {
  code: string;
  discountPercentage: number;
  startDate: Date;
  endDate: Date;
  maxRedemptions: number;
}

@Component({
  selector: 'app-coupon-creattion',
  templateUrl: './coupon-creattion.component.html',
  styleUrls: ['./coupon-creattion.component.css']
})
export class CouponCreattionComponent {

  coupon: CouponDto = {
    code: "",
    discountPercentage: 0,
    startDate: format(new Date(), 'yyyy-MM-dd'),
    endDate: format(new Date(), 'yyyy-MM-dd'),
    maxRedemptions: 1
  };

  validationErrors: {
    code?: string;
    discountPercentage?: string;
    startDate?: string;
    endDate?: string;
    maxRedemptions?: string;
  } = {};

  message: string = '';
  messageType: 'success' | 'error' = 'success';
  sellerId: number = 2;  // This should ideally come from AuthService

  constructor(
    private couponService: CouponmanagerService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.initializeDates();
    this.loadSellerCoupons();
  }

  initializeDates() {
    const today = startOfDay(new Date());
    this.coupon.startDate = format(today, 'yyyy-MM-dd');
    this.coupon.endDate = format(today, 'yyyy-MM-dd');
  }

  getMinDate(): string {
    return format(new Date(), 'yyyy-MM-dd');
  }

  getMinEndDate(): string {
    return this.coupon.startDate;
  }

  validateField(field: keyof Coupon): void {
    this.validationErrors[field] = undefined;

    switch (field) {
      case 'code':
        if (this.coupon.code && this.coupon.code.trim().length < 3) {
          this.validationErrors.code = 'Coupon code must be at least 3 characters long';
        }
        break;
      case 'discountPercentage':
        if (this.coupon.discountPercentage <= 0 || this.coupon.discountPercentage > 100) {
          this.validationErrors.discountPercentage = 'Discount must be between 0 and 100';
        }
        break;
      case 'startDate':
        const startDate = parse(this.coupon.startDate, 'yyyy-MM-dd', new Date());
        const today = startOfDay(new Date());
        if (isBefore(startDate, today)) {
          this.validationErrors.startDate = 'Start date cannot be in the past';
        }
        this.validateEndDate();
        break;
      case 'endDate':
        this.validateEndDate();
        break;
      case 'maxRedemptions':
        if (this.coupon.maxRedemptions < 1) {
          this.validationErrors.maxRedemptions = 'Maximum redemptions must be at least 1';
        }
        break;
    }
  }

  validateEndDate(): void {
    const startDate = parse(this.coupon.startDate, 'yyyy-MM-dd', new Date());
    const endDate = parse(this.coupon.endDate, 'yyyy-MM-dd', new Date());
    if (!isAfter(endDate, startDate)) {
      this.validationErrors.endDate = 'End date must be after start date';
    } else {
      this.validationErrors.endDate = undefined;
    }
  }

  isFormValid(): boolean {
    return Object.values(this.validationErrors).every(error => error === undefined);
  }

  onStartDateChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.value) {
      this.coupon.startDate = input.value;
      this.validateField('startDate');
    }
  }

  onEndDateChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.value) {
      this.coupon.endDate = input.value;
      this.validateField('endDate');
    }
  }

  createCoupon() {
    if (this.isFormValid()) {
      this.couponService.createCoupon(this.sellerId, this.coupon).subscribe({
        next: (createdCoupon) => {
          this.showMessage('Coupon created successfully!', 'success');
          this.loadSellerCoupons();
          this.resetForm();
        },
        error: (error) => {
          this.showMessage('Error creating coupon: ' + error.message, 'error');
        }
      });
    }
  }

  resetForm() {
    this.coupon = {
      code: "",
      discountPercentage: 0,
      startDate: format(new Date(), 'yyyy-MM-dd'),
      endDate: format(new Date(), 'yyyy-MM-dd'),
      maxRedemptions: 1
    };
    this.validationErrors = {};
  }

  loadSellerCoupons() {
    this.couponService.getAllCouponsBySeller(this.sellerId).subscribe({
      next: (coupons) => {
        console.log('Loaded coupons:', coupons);
        // You might want to store these coupons in a component property
        // this.sellerCoupons = coupons;
      },
      error: (error) => {
        this.showMessage('Error loading coupons: ' + error.message, 'error');
      }
    });
  }

  showMessage(msg: string, type: 'success' | 'error') {
    this.message = msg;
    this.messageType = type;
    setTimeout(() => {
      this.message = '';
    }, 3000);
  }

  formatDate(dateString: string): string {
    const date = parse(dateString, 'yyyy-MM-dd', new Date());
    return format(date, "MMM d, yyyy");
  }

}
