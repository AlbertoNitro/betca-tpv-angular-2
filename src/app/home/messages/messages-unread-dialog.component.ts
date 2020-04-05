import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatSnackBar} from '@angular/material';
import {Messages} from './messages.model';
import {MessagesService} from './messages.service';

@Component({
  styleUrls: ['messages-unread-dialog.component.css'],
  templateUrl: `messages-unread-dialog.component.html`
})
export class MessagesUnreadDialogComponent {

  messages: Messages = {
    id: null,
    fromUsername: null,
    toUsername: null,
    messageContent: null,
    sentDate: null,
    readDate: null
  };

  constructor(@Inject(MAT_DIALOG_DATA) data: any,
              private dialog: MatDialog,
              private message: MatSnackBar,
              private messagesService: MessagesService) {
    this.messagesService.readById(data.id).subscribe(
      messages => {
        this.messages = messages;
      }
    );
  }

  markAsRead() {
    this.messagesService.markMessageAsRead(this.messages.id, new Date()).subscribe(
      () => this.dialog.closeAll()
      , error => this.errorControl(error.error)
      , () => this.message.open('Message mark as read successfully', null, {
        duration: 2000,
      })
    );
  }

  errorControl(error: string) {
    let messageError;
    if (error) {
      messageError = 'Ups, something bad happened';
    }
    this.message.open(messageError, null, {
      duration: 2000,
    });
  }
}
