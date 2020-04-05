import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {Messages} from './messages.model';

@Component({
  styleUrls: ['messages-detail-dialog.component.css'],
  templateUrl: `messages-detail-dialog.component.html`
})
export class MessagesDetailDialogComponent {

  messages: Messages = {
    id: null,
    fromUsername: null,
    toUsername: null,
    messageContent: null,
    sentDate: null,
    readDate: null
  };

  constructor(@Inject(MAT_DIALOG_DATA) data: any) {
    this.messages = data;
  }
}
