import { Component, OnInit, HostListener } from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { ProductStockDto } from 'src/app/models/ProductStockDto';
import { AuthService } from 'src/app/services/auth.service';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { StockAnalyticService } from 'src/app/services/stock-analytic.service';

interface ChartData {
  name: string;
  value: number;
}

@Component({
  selector: 'app-stock-analytics',
  templateUrl: './stock-analytics.component.html',
  styleUrls: ['./stock-analytics.component.css']
})
export class StockAnalyticsComponent implements OnInit {
  data: ProductStockDto[] = [];
  chartData: ChartData[] = [];
  isLoading = false;
  error: string | null = null;

  // Chart options
  view: [number, number] = [700, 400];
  showLegend = true;
  showLabels = true;
  gradient = true;

  colorScheme: Color = {
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#2C7A7B', '#2D3748', '#E0F2F1', '#EDF2F7', '#F7FAFC']
  };

  constructor(
    private stockService: StockAnalyticService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadData();
    this.onResize();
  }

  loadData() {
    const sellerId = this.getSellerId();
    if (sellerId !== null) {
      this.isLoading = true;
      this.error = null;
      this.stockService.getProductStockBySellerId(sellerId)
        .pipe(
          catchError(err => {
            this.error = 'Failed to load stock data. Please try again later.';
            console.error('Error loading stock data:', err);
            return of([]);
          }),
          finalize(() => this.isLoading = false)
        )
        .subscribe(
          (data: ProductStockDto[]) => {
            this.data = data;
            this.prepareChartData();
          }
        );
    } else {
      this.error = 'Unable to retrieve seller ID. Please log in and try again.';
    }
  }

  prepareChartData() {
    const totalStock = this.data.reduce((sum, product) => sum + product.stockQuantity, 0);

    this.chartData = this.data.map(product => ({
      name: `${product.name} (${(product.stockQuantity / totalStock * 100).toFixed(1)}%)`,
      value: product.stockQuantity
    }));
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    const width = window.innerWidth;
    if (width <= 400) {
      this.view = [300, 300];
    } else if (width <= 768) {
      this.view = [400, 400];
    } else {
      this.view = [700, 400];
    }
  }

  getSellerId(): number | null {
    return this.authService.getId();
  }
}
