import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {Messages} from './messages.model';
import {MessagesService} from './messages.service';

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

  constructor(@Inject(MAT_DIALOG_DATA) data: any,
              private messagesService: MessagesService) {
    this.messagesService.readById(data.id).subscribe(
      messages => {
        this.messages = messages;
        console.log('ID = ' + this.messages);
        console.log('ID = ' + this.messages.id);
        console.log('To UserName = ' + this.messages.toUsername);
      }
    );
  }
}
