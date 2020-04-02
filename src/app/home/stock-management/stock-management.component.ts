import {Component, OnInit} from '@angular/core';
import {Article} from '../shared/article.model';
import {StockService} from './stock.service';
import {StockManagementSearchModel} from './StockManagementSearch.model';

@Component({
  templateUrl: 'stock-management.component.html',
  styleUrls: ['stock-management.component.css'],

})
export class StockManagementComponent implements OnInit {
  title: string;
  columns = ['code', 'description', 'soldUnits', 'stock'];
  alias = ['code', 'description', 'num of sold items', 'stock'];
  data: Article[];
  stockManagementSearch: StockManagementSearchModel;

  constructor(private stockService: StockService) {
    this.data = null;
    this.initDefaultSearch();
  }

  ngOnInit(): void {
    this.title = 'Stock Management';
  }

  search(): void {
    this.stockService.getAll(this.stockManagementSearch).subscribe(
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
