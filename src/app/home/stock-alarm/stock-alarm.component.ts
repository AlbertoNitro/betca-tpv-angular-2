import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {StockAlarm} from './stock-alarm.model';
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
  dialogConfig: MatDialogConfig;

  constructor(private dialog: MatDialog, private alarmService: StockAlarmService) {
  }

  ngOnInit() {
    this.readAll();
  }

  create() {
    this.dialogConfig = {
      width: '60%',
      height: '90%',
      data: {
        dialogMode: 'create',
        alarm: {}
      }
    };
    this.dialog.open(StockAlarmCreateUpdateComponent, this.dialogConfig).afterClosed().subscribe(result => {
      if (result) {
        this.readAll();
      }
    });
  }

  update(alarm: StockAlarm) {
    this.dialogConfig = {
      width: '60%',
      height: '90%',
      data: {
        dialogMode: 'update',
        alarm
      }
    };
    this.dialog.open(StockAlarmCreateUpdateComponent, this.dialogConfig).afterClosed().subscribe(result => {
      if (result) {
        this.readAll();
      }
    });
  }

  delete(alarm: StockAlarm) {
    this.dialogConfig = {
      data: {
        alarm
      }
    };
    this.dialog.open(CancelYesDialogComponent, this.dialogConfig).afterClosed().subscribe(
      result => {
        if (result) {
          this.alarmService.delete(alarm).subscribe(response => {
            if (response) {
              this.readAll();
            }
          });
        }
      }
    );
  }

  read(alarm: StockAlarm) {
    this.dialogConfig = {
      width: '60%',
      height: '90%',
      data: {
        alarm
      }
    };
    this.dialog.open(StockAlarmDetailDialogComponent, this.dialogConfig).afterClosed().subscribe(result => {
      if (result) {
        this.readAll();
      }
    });
  }

  readAll() {
    this.alarmService.readAll().subscribe(result => {
      this.data = result;
    });
  }

  searchData(alarm: any) {
    if (alarm instanceof Array) {
      this.data = alarm;
    } else {
      this.data = [];
      this.data.push(alarm);
    }
  }
}
