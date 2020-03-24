import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatSnackBar} from '@angular/material';
import {Provider} from '../shared/provider.model';
import {ProviderService} from '../shared/provider.service';

@Component({
  templateUrl: 'provider-edition-dialog.component.html',
  styleUrls: ['provider-dialog.component.css']
})

export class ProviderEditionDialogComponent {

  provider: Provider = {id: null, company: null, phone: null, active: true, address: null, email: null, nif: null, note: null};

  constructor(@Inject(MAT_DIALOG_DATA) data: any,
              private providerService: ProviderService,
              private dialog: MatDialog,
              private message: MatSnackBar) {
    this.provider = data.obj;
  }

  updateProvider() {
    if (this.isInvalid()) {
      return;
    }
    this.providerService.update(this.provider).subscribe(
      () => this.dialog.closeAll()
      , () => this.message.open('Oops, something bad happened. The company name already exists.', null, {
        duration: 2000,
      })
      , () => this.message.open('Provider updated successfully!', null, {
        duration: 2000,
      })
    );
  }

  isInvalid(): boolean {
    return this.checkEmpty(this.provider.company) ||
      this.checkEmpty(this.provider.nif) ||
      this.checkEmpty(this.provider.phone);
  }

  checkEmpty(attr: string): boolean {
    return attr == null ||
      attr === '';
  }
}
