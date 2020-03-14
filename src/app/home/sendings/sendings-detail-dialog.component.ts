import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';
import {Sendings} from './sendings.model';
import {SendingsService} from './sendings.service';

@Component({
  templateUrl: 'sendings-detail-dialog.component.html'
})

export class SendingsDetailDialogComponent {

  sendings: Sendings = {username: null, id: null, reference: null, creationDate: null, estado: null};

  constructor(private dialog: MatDialog, private dialogRef: MatDialogRef<SendingsDetailDialogComponent>,
              private message: MatSnackBar, private sendingsService: SendingsService, @Inject(MAT_DIALOG_DATA) public sendingsData: any) {
    this.sendings = this.sendingsData.sendingsData;
  }
}
