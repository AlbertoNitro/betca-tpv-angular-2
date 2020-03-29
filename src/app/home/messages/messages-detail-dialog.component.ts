import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {MessagesService} from './messages.service';
import {Messages} from './messages.model';

@Component({
  styleUrls: ['messages-detail-dialog.component.css'],
  templateUrl: `messages-detail-dialog.component.html`
})
export class MessagesDetailDialogComponent {

  messages: Messages;

  constructor(@Inject(MAT_DIALOG_DATA) data: any,
              private messagesServices: MessagesService) {
    this.messagesServices.read(data.id).subscribe(
      messages => {
        this.messages = messages;
      }
    );
  }
}
