import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {Article} from '../../shared/article.model';

@Component({
  selector: 'app-stock-management-table',
  templateUrl: 'stock-management-table.component.html',
  styleUrls: ['stock-management-table.component.css']
})
export class StockManagementTableComponent {

  @Input() title = 'Management';
  @Input() columns: Array<string>;
  @Input() alias: Array<string> = null;
  @Output() showArticleSales = new EventEmitter<Article>();
  dataSource: MatTableDataSource<any>;
  selectedItem: string;

  @Input()
  set data(data: any[]) {
    this.dataSource = new MatTableDataSource<any>(data);
  }

  onShowArticleInfo(item) {
    this.selectedItem = item.code;
    this.showArticleSales.emit(item);
  }

  getAlias(index: number): string {
    return this.alias ? this.alias[index] : this.columns[index];
  }

  isSelected(item: Article): boolean {
    console.log( 'Item :' + this.selectedItem, item.code);
    return this.selectedItem === item.code;
  }

}
