import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {StockAlarm, StockAlarmArticleSearch} from './stock-alarm.model';
import {StockAlarmService} from './stock-alarm.service';
import {StockAlarmCreateUpdateComponent} from './stock-alarm-create-update/stock-alarm-create-update.component';
import {StockAlarmDetailDialogComponent} from './stock-alarm-detail-dialog/stock-alarm-detail-dialog.component';
import {CancelYesDialogComponent} from '../../core/cancel-yes-dialog.component';

@Component({
  selector: 'app-stock-alarm',
  templateUrl: './stock-alarm.component.html',
  styleUrls: ['./stock-alarm.component.css']
})

export class StockAlarmComponent implements OnInit {

  title = 'Stock Alarm Management';
  columns = ['id', 'description', 'provider', 'warning', 'critical'];
  data: StockAlarm[];
  articleTitle = 'Articles info';
  articleColumns = ['code', 'description', 'stock', 'warning', 'critical'];
  articleData: StockAlarmArticleSearch[];
  searchArticleState = 'warning';

  constructor(private dialog: MatDialog, private stockAlarmService: StockAlarmService) {
  }

  ngOnInit() {
    this.readAll();
  }

  create() {
    this.dialog.open(StockAlarmCreateUpdateComponent, {
      width: '60%',
      height: '90%',
      data: {
        dialogMode: 'create',
        stockAlarm: {}
      }
    }).afterClosed().subscribe(result => {
      if (result) {
        this.readAll();
      }
    });
  }

  update(stockAlarm: StockAlarm) {
    this.dialog.open(StockAlarmCreateUpdateComponent, {
      width: '60%',
      height: '90%',
      data: {
        dialogMode: 'update',
        stockAlarm
      }
    }).afterClosed().subscribe(result => {
      if (result) {
        this.readAll();
      }
    });
  }

  delete(stockAlarm: StockAlarm) {
    this.dialog.open(CancelYesDialogComponent, {
      data: {
        stockAlarm
      }
    }).afterClosed().subscribe(
      result => {
        if (result) {
          this.stockAlarmService.delete(stockAlarm).subscribe(response => {
            if (response) {
              this.readAll();
            }
          });
        }
      }
    );
  }

  read(stockAlarm: StockAlarm) {
    this.dialog.open(StockAlarmDetailDialogComponent, {
      width: '60%',
      height: '90%',
      data: {
        stockAlarm
      }
    }).afterClosed().subscribe(result => {
      if (result) {
        this.readAll();
      }
    });
  }

  readAll() {
    this.stockAlarmService.readAll().subscribe(result => {
      this.data = result;
    });
  }

  searchArticle() {
    this.stockAlarmService.searchArticle(this.searchArticleState).subscribe(result => {
      this.articleData = result;
    });
  }

  resetSearch() {
    this.articleData = null;
  }
}
