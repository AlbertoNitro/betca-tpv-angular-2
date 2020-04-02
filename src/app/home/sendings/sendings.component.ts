import {Component} from '@angular/core';
import {Sendings} from './sendings.model';
import {SendingsService} from './sendings.service';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {SendingsCreationDialogComponent} from './sendings-creation-dialog.component';
import {SendingsDetailDialogComponent} from './sendings-detail-dialog.component';
import {SendingsUpdateDialogComponent} from './sendings-update-dialog.component';
import {CancelYesDialogComponent} from '../../core/cancel-yes-dialog.component';

@Component({
  templateUrl: 'sendings.component.html',
})
export class SendingsComponent {

  sendings: Sendings;

  title = 'Delivery Management';
  columns = ['username', 'id', 'reference', 'creationDate', 'estado'];
  data: Sendings[];
  dialogConfig: MatDialogConfig;

  constructor(private sendingsService: SendingsService, private dialog: MatDialog) {
    this.sendings = {username: null, id: null, reference: null, creationDate: null, estado: null};
    this.data = null;
  }

  search() {
    this.sendingsService.readAll().subscribe(
      data => {
        this.data = data,
          console.log(this.data);
      },
    );
  }

  resetSearch() {
    this.sendings = {username: null, id: null, reference: null, creationDate: null, estado: null};
  }

  create() {
    this.dialog.open(SendingsCreationDialogComponent);
  }


  read(sendings: Sendings) {
    this.dialog.open(SendingsDetailDialogComponent,
      {
        width: '300px',
        data: {
          sendingsData: sendings
        }
      }
    );
  }

  update(sendings: Sendings) {
    this.dialog.open(SendingsUpdateDialogComponent,
      {
        data: {
          sendingsData: sendings
        }
      }
    ).afterClosed().subscribe(
      () => {
        this.search();
      }
    );
  }

  delete(sendings: Sendings) {
    this.dialogConfig = {
      data: {
        sendings
      }
    };
    this.dialog.open(CancelYesDialogComponent, this.dialogConfig).afterClosed().subscribe(
      result => {
        if (result) {
          this.sendingsService.delete(sendings).subscribe(response => {
            if (response) {
              this.readAll();
            }
          });
        }
      }
    );
  }

  readAll() {
    this.sendingsService.readAll().subscribe(
      result => {
        this.data = result;
      }
    );
  }

}
