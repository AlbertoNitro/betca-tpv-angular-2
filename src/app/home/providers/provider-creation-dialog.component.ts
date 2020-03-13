import {Component} from '@angular/core';
import {MatDialog, MatSnackBar} from '@angular/material';
import {Provider} from '../shared/provider.model';
import {ProviderService} from '../shared/provider.service';

@Component({
  templateUrl: 'provider-creation-dialog.component.html',
  styleUrls: ['provider-dialog.component.css']
})

export class ProviderCreationDialogComponent {

  newProvider: Provider = {id: null, company: null, phone: null, active: true, address: null, email: null, nif: null, note: null};

  constructor(private providerService: ProviderService,
              private dialog: MatDialog,
              private message: MatSnackBar) {
  }

  createProvider() {
    this.providerService.create(this.newProvider).subscribe(
      () => this.dialog.closeAll()
      , () => this.message.open('Oops, something bad happened. The company name already exists.', null, {
        duration: 2000,
      })
      , () => this.message.open('Provider created successfully!', null, {
        duration: 2000,
      })
    );
  }
}
