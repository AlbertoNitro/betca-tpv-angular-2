import {Component, OnInit} from '@angular/core';
import {Article} from '../shared/article.model';
import {StockService} from './stock.service';
import {StockManagementSearchModel} from './StockManagementSearch.model';
import {ArticleSalesModel} from './article-sales.model';
import {SalesPerYearModel} from './sales-per-year.model';
import {MatTableDataSource} from '@angular/material';

@Component({
  templateUrl: 'stock-management.component.html',
  styleUrls: ['stock-management.component.css'],

})


export class StockManagementComponent implements OnInit {
  title: string;
  columns = ['code', 'description', 'soldUnits', 'stock'];
  columnsArticleTable = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
  alias = ['code', 'description', 'num of sold items', 'stock'];
  data: Article[];
  dataArticle: SalesPerYearModel[];
  dataArticleTable: MatTableDataSource<any>;
  stockManagementSearch: StockManagementSearchModel;

  constructor(private stockService: StockService) {
    this.data = null;
    this.initDefaultSearch();
  }

  ngOnInit(): void {
    this.title = 'Stock Management';
    this.dataArticle = new Array();
    this.initDataArticleSales();
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

  getDataArticle(item: Article) {
    this.initDataArticleSales();
    this.stockService.getArticleSalesData(item.code).subscribe(
      data => this.setDataTable(data)
    );
  }

  setDataTable(articlesSales: ArticleSalesModel[]) {
    const currentYear = (new Date()).getFullYear();
    articlesSales.forEach((articleSalesModel) => {
      const index = articleSalesModel.year === currentYear ? 1 : 0;
      const month = this.columnsArticleTable[articleSalesModel.month - 1];
      this.dataArticle[index][month] = articleSalesModel.amount;
    });
    this.dataArticleTable = new MatTableDataSource<any>(this.dataArticle);
  }

  initDataArticleSales() {
    this.dataArticle[0] = new SalesPerYearModel();
    this.dataArticle[1] = new SalesPerYearModel();
    this.dataArticle[0].year = ((new Date()).getFullYear() - 1).toString();
    this.dataArticle[1].year = ((new Date()).getFullYear()).toString();
    const currentMonth = (new Date()).getMonth();
    for (let i = currentMonth; i < 12; i++) {
      this.dataArticle[1][this.columnsArticleTable[i]] = '-';
    }
  }
}
