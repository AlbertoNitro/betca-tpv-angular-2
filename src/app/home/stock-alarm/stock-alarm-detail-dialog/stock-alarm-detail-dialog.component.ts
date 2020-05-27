import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {StockAlarmArticle, StockAlarm} from '../stock-alarm.model';

@Component({
  selector: 'app-stock-alarm-update-dialog',
  templateUrl: './stock-alarm-detail-dialog.component.html',
  styleUrls: ['./stock-alarm-detail-dialog.component.css']
})

export class StockAlarmDetailDialogComponent implements OnInit {

  stockAlarm: StockAlarm = {id: null, description: null, provider: null, warning: null, critical: null, stockAlarmArticle: null};
  title = 'Stock Alarm Article Detail';
  columns = ['articleId', 'warning', 'critical'];
  dataSource: StockAlarmArticle[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    data.stockAlarm.stockAlarmArticle.map(value => {
      value.articleId = value.article.code;
    });
    this.dataSource = data.stockAlarm.stockAlarmArticle;
  }

  ngOnInit() {
    this.stockAlarm = this.data.stockAlarm;
  }
}
