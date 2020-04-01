import {Component} from '@angular/core';
import {Article} from '../shared/article.model';
import {StockMocksService} from './stock-mocks.service';

@Component({
  templateUrl: 'stock-management.component.html',
  styleUrls: ['stock-management.component.css'],

})
export class StockManagementComponent {
  articles: Article[];
  stockManagementSearch: {
    initDate: Date;
    endDate: Date;
    minimumStock: number;
  };

  constructor(private stockService: StockMocksService) {
    this.initDefaultSearch();
  }

  search(): void {
  }

  initDefaultSearch(): void {
    this.stockManagementSearch = {
      initDate: null,
      endDate: null,
      minimumStock: null
    };
  }
}
