import {Component, OnInit} from '@angular/core';
import {Article} from '../shared/article.model';
import {StockMocksService} from './stock-mocks.service';

@Component({
  templateUrl: 'stock-management.component.html',
  styleUrls: ['stock-management.component.css'],

})
export class StockManagementComponent implements OnInit {
  title: string;
  columns = ['code', 'description', 'soldUnits', 'stock'];
  alias = ['code', 'description', 'num of sold items', 'stock'];
  data: Article[];
  stockManagementSearch: {
    initDate: Date;
    endDate: Date;
    minimumStock: number;
  };

  constructor(private stockService: StockMocksService) {
    this.data = null;
    this.initDefaultSearch();
  }

  ngOnInit(): void {
    this.title = 'Stock Management';
  }

  search(): void {
    this.stockService.getAll().subscribe(
      data => this.data = data
    );
  }

  initDefaultSearch(): void {
    this.stockManagementSearch = {
      initDate: null,
      endDate: null,
      minimumStock: null
    };
  }
}
