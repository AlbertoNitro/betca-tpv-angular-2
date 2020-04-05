import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatSnackBar} from '@angular/material';
import {MessagesService} from './messages.service';
import {Messages} from './messages.model';
import {TokensService} from '../../core/tokens.service';
import {FormControl, Validators} from '@angular/forms';

@Component({
  styleUrls: ['messages-creation-dialog.component.css'],
  templateUrl: `messages-creation-dialog.component.html`
})
export class MessagesCreationDialogComponent {

  messages: Messages = {
    id: null,
    toUserMobile: null,
    fromUserMobile: null,
    messageContent: null,
    sentDate: null,
    readDate: null
  };

  toUserMobileFormControl = new FormControl('', [Validators.required]);
  messageContentFormControl = new FormControl('', [Validators.required]);

  constructor(@Inject(MAT_DIALOG_DATA) data: any,
              private dialog: MatDialog,
              private message: MatSnackBar,
              private messagesService: MessagesService,
              private tokensService: TokensService) {
  }


  getErrorMessageToUserMobile() {
    return this.toUserMobileFormControl.hasError('required') ? 'You must enter a value' : '';
  }

  getErrorMessageMessageContent() {
    return this.messageContentFormControl.hasError('required') ? 'You must enter a value' : '';
  }

  createMessages() {
    this.messages.fromUserMobile = this.tokensService.getMobile().toString();
    this.messagesService.createMessage(this.messages).subscribe(
      () => this.dialog.closeAll()
      , error => this.errorControl(error.error)
      , () => this.message.open('Message sent successfully', null, {
        duration: 2000,
      })
    );
  }

  invalidMessages(): boolean {
    return this.toUserMobileFormControl.hasError('required') ||
      this.messageContentFormControl.hasError('required');
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
