import { Component, OnInit } from '@angular/core';
import { ProductViewService, ProductViewStats } from 'src/app/services/product-view.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-product-views',
  templateUrl: './product-views.component.html',
  styleUrls: ['./product-views.component.css']
})
export class ProductViewsComponent implements OnInit {
  timeFrame: 'daily' | 'weekly' | 'monthly' = 'daily';
  totalViews: number = 0;
  chartData: any[] = [];
  colorScheme: any = {
    domain: ['#319795']
  };

  private sellerId: number | null = null;

  constructor(
    private productViewService: ProductViewService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.getSellerId();
    this.updateChartData();
  }

  updateChartData() {
    const currentDate = new Date().toISOString().split('T')[0];
    if (this.sellerId) {
      this.productViewService.getProductViewStatsForSeller(this.sellerId, currentDate).subscribe(
        (stats: ProductViewStats) => {
          let viewData: Array<{ name: string; value: number }>;
          switch (this.timeFrame) {
            case 'daily':
              viewData = stats.daily;
              break;
            case 'weekly':
              viewData = stats.weekly;
              break;
            case 'monthly':
              viewData = stats.monthly;
              break;
            default:
              viewData = stats.daily;
          }

          this.chartData = [{
            name: 'Views',
            series: viewData
          }];

          this.totalViews = viewData.reduce((sum, item) => sum + item.value, 0);
        },
        (error: any) => {
          console.error('Error fetching product view stats:', error);
        }
      );
    } else {
      console.error('Seller ID is null');
    }
  }

  getSellerId() {
    const id = this.authService.getId();
    if (id !== null) {
      this.sellerId = id;
    } else {
      console.error('Seller ID is null');
    }
  }
}
