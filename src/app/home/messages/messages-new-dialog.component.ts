import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
// TODO import {MessagesService} from './messages.service';
import {Messages} from './messages.model';

@Component({
  styleUrls: ['messages-new-dialog.component.css'],
  templateUrl: `messages-new-dialog.component.html`
})
export class MessagesNewDialogComponent {

  messages: Messages;

  constructor(@Inject(MAT_DIALOG_DATA) data: any) {
    this.messages = null;
    // TODO call messagesService
  }
}
