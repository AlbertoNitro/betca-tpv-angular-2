import {Component} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {Messages} from './messages.model';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})

export class MessagesComponent {

  title = 'Old Messages';
  columns: Array<string>;
  dataSource: MatTableDataSource<Messages>;

  constructor() {
    // TODO Create Messages Services, then make a call once the user clicks on messages component
    this.columns = ['Username', 'Message content'];
    this.dataSource = new MatTableDataSource<Messages>(null);
  }
}
