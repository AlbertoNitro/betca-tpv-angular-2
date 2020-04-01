import {Component, Input} from '@angular/core';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-stock-management-table',
  templateUrl: 'stock-management-table.component.html'
})
export class StockManagementTableComponent {

  @Input() title = 'Management';
  @Input() columns: Array<string>;
  @Input() alias: Array<string> = null;
  dataSource: MatTableDataSource<any>;

  @Input()
  set data(data: any[]) {
    this.dataSource = new MatTableDataSource<any>(data);
  }

  onShowInfo(item) {

  }

  getAlias(index: number): string {
    return this.alias ? this.alias[index] : this.columns[index];
  }

}
