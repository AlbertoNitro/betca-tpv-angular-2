import {Component} from '@angular/core';
import {Provider} from '../shared/provider.model';
import {ProviderCreationDialogComponent} from './provider-creation-dialog.component';
import {MatDialog} from '@angular/material';
import {ProviderService} from '../shared/provider.service';
import {ProviderSearch} from './provider-search.model';
import {ProviderDetailDialogComponent} from './provider-detail-dialog.component';
import {ProviderEditionDialogComponent} from './provider-edition-dialog.component';

@Component({
  templateUrl: 'providers.component.html'
})
export class ProvidersComponent {

  provider: Provider;
  providerSearch: ProviderSearch;

  title = 'Providers management';
  columns = ['company', 'nif', 'phone'];
  providers: Provider[];

  constructor(private dialog: MatDialog, private providerService: ProviderService) {
    this.provider = {company: null, nif: null, phone: null};
    this.providerSearch = {company: null, nif: null, phone: null};
    this.providers = null;
  }

  search() {
    if ((this.providerSearch.company == null) && (this.providerSearch.nif == null) && (this.providerSearch.phone == null)) {
      this.providerService.readAll().subscribe(
        data => this.providers = data
      );
    } else {
      this.providerService.search(this.providerSearch).subscribe(
        data => this.providers = data
      );
    }
  }

  resetSearch() {
    this.providerSearch = {company: null, nif: null, phone: null};
    this.search();
  }

  create() {
    this.dialog.open(ProviderCreationDialogComponent)
      .afterClosed().subscribe(
      () => {
        this.search();
      }
    );
  }

  read(provider: Provider) {
    this.dialog.open(ProviderDetailDialogComponent,
      {
        data: {
          obj: provider
        }
      }
    ).afterClosed().subscribe(
      () => {
        this.search();
      }
    );
  }

  update(provider: Provider) {
    this.dialog.open(ProviderEditionDialogComponent,
      {
        data: {
          obj: provider
        }
      }
    ).afterClosed().subscribe(
      () => {
        this.search();
      }
    );
  }
}
