import {Component} from '@angular/core';

import {MessagesService} from './messages.service';
import {Messages} from './messages.model';
import {MatDialog} from '@angular/material';
import {TokensService} from '../../core/tokens.service';
import {MessagesCreationDialogComponent} from './messages-creation-dialog.component';
import {MessagesDetailDialogComponent} from './messages-detail-dialog.component';

@Component({
  templateUrl: 'messages.component.html',
})

export class MessagesComponent {

  messages: Messages;
  title: string;
  username: string;
  mobile: number;
  columns: ['To User mobile', 'Send Date', 'Message content'];
  data: Messages[];

  constructor(private dialog: MatDialog, private messagesService: MessagesService, private tokensService: TokensService) {
    this.username = tokensService.getName();
    this.mobile = tokensService.getMobile();
    this.title = 'Old Messages sent to ' + this.username.toUpperCase();
    this.messages = {
      fromUserMobile: null,
      toUserMobile: null,
      messageContent: null,
      sentDate: null,
      readDate: null
    };

    this.messagesService.readAll(this.mobile).subscribe(
      data => this.data = data
    );
  }

  create() {
    this.dialog.open(MessagesCreationDialogComponent, {
      data: {
        update: false
      }
    });
  }

  read(messages: Messages) {
    this.dialog.open(MessagesDetailDialogComponent, {
      data: {messages}
    });
  }
}
