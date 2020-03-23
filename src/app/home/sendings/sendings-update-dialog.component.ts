import {Component, Inject} from '@angular/core';
import {Sendings} from './sendings.model';
import {MAT_DIALOG_DATA, MatDialog, MatSnackBar} from '@angular/material';
import {SendingsService} from './sendings.service';


@Component({
  templateUrl: 'sendings-update-dialog.component.html',
  styleUrls: ['sendings-update.component.css']
})

export class SendingsUpdateDialogComponent {
  sendings: Sendings = {username: null, id: null, reference: null, creationDate: null, estado: null};

  constructor(@Inject(MAT_DIALOG_DATA) data: any, private sendingsService: SendingsService,
              private dialog: MatDialog, private message: MatSnackBar) {
    this.sendings = data.sendingsData;
  }

  updateSendings() {
    this.sendingsService.update(this.sendings).subscribe(
      () => this.dialog.closeAll()
      , () => this.message.open('Something wrong', null, {
        duration: 2000,
      })
      , () => this.message.open('Sendings updated successfully!', null, {
        duration: 2000,
      })
    );
  }

}
