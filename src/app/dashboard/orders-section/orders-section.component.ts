import { Component } from '@angular/core';
import { OrderService, OrderDisplayDto, OrderSummaryResponse } from 'src/app/services/order.service';

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
  sellerId: number = 2; // Assume we're displaying orders for seller with ID 1

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadSellerOrders();
    this.loadSellerOrdersSummary();
  }

  loadSellerOrders(): void {
    this.orderService.getSellerOrders(this.sellerId).subscribe(
      (data) => {
        this.orders = data;
      },
      (error) => {
        console.error('Error fetching seller orders:', error);
      }
    );
  }

  loadSellerOrdersSummary(): void {
    this.orderService.getSellerOrdersSummary(this.sellerId).subscribe(
      (data) => {
        this.summary = data;
      },
      (error) => {
        console.error('Error fetching seller orders summary:', error);
      }
    );
  }

  handleStatusChange(orderId: string, newStatus: string): void {
    this.orderService.updateSellerOrderStatus(this.sellerId, Number(orderId), newStatus).subscribe(
      () => {
        this.loadSellerOrders(); // Reload orders after status update
        this.loadSellerOrdersSummary(); // Reload summary after status update
      },
      (error) => {
        console.error('Error updating order status:', error);
      }
    );
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
