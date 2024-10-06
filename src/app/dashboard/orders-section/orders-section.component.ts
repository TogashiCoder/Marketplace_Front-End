import { Component } from '@angular/core';
import { OrderService, OrderDisplayDto, OrderSummaryResponse } from 'src/app/services/order.service';
import { AuthService } from 'src/app/services/auth.service';

interface Order {
  id: string;
  customer: string;
  date: string;
  total: number;
  status: string;
}

@Component({
  selector: 'app-orders-section',
  templateUrl: './orders-section.component.html',
  styleUrls: ['./orders-section.component.css']
})
export class OrdersSectionComponent {
  orders: OrderDisplayDto[] = [];
  summary: OrderSummaryResponse = { totalOrders: 0, totalRevenue: 0 };
  statusOptions: string[] = ['Pending', 'Processing', 'Shipped', 'Completed'];
  sellerId: number | null = null;

  constructor(
    private orderService: OrderService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.sellerId = this.authService.getId();


    if (this.sellerId) {
      this.loadSellerOrders();
      this.loadSellerOrdersSummary();
    } else {
      console.error('Seller ID is not available.');
    }
  }

  loadSellerOrders(): void {
    if (this.sellerId) {
      this.orderService.getSellerOrders(this.sellerId).subscribe(
        (data) => {
          this.orders = data;
        },
        (error) => {
          console.error('Error fetching seller orders:', error);
        }
      );
    }
  }

  loadSellerOrdersSummary(): void {
    if (this.sellerId) {
      this.orderService.getSellerOrdersSummary(this.sellerId).subscribe(
        (data) => {
          this.summary = data;
        },
        (error) => {
          console.error('Error fetching seller orders summary:', error);
        }
      );
    }
  }

  handleStatusChange(orderId: string, newStatus: string): void {
    if (this.sellerId) {
      this.orderService.updateSellerOrderStatus(this.sellerId, Number(orderId), newStatus).subscribe(
        () => {
          this.loadSellerOrders();
          this.loadSellerOrdersSummary();
        },
        (error) => {
          console.error('Error updating order status:', error);
        }
      );
    }
  }

  getBadgeVariant(status: string): string {
    switch (status) {
      case 'Completed':
        return 'default';
      case 'Processing':
        return 'secondary';
      case 'Shipped':
        return 'outline';
      case 'Pending':
        return 'destructive';
      default:
        return 'default';
    }
  }
}
