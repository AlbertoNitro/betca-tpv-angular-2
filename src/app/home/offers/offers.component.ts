import {Component, OnInit} from '@angular/core';
import {MAT_DATE_LOCALE, MatDialog} from '@angular/material';
import {take} from 'rxjs/operators';
import {CancelYesDialogComponent} from 'src/app/core/cancel-yes-dialog.component';
import {Offer} from '../shared/offer.model';
import {OfferService} from '../shared/offer.service';
import {OfferCreationDialogComponent} from './dialogs/offer-creation-dialog/offer-creation-dialog.component';
import {OfferPrintDialogComponent} from './dialogs/offer-print-dialog/offer-print-dialog.component';

@Component({
  templateUrl: './offers.component.html',
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'fr-FR'},
  ],
})
export class OffersComponent implements OnInit {

  public offer: Offer;
  public title: string;
  public columns: Array<string>;
  public dataSource: Array<Offer>;

  constructor(private offerService: OfferService, private dialog: MatDialog) {
    this.offer = {expirationDate: new Date(), registrationDate: new Date()};
    this.dataSource = null;
  }

  ngOnInit() {
    this.title = 'Offers Management';
    this.columns = ['id', 'description', 'registrationDate', 'expirationDate', 'discount'];
  }

  public search(reset?: boolean): void {
    const registrationDate = reset ? null : this.offer.registrationDate;
    const expirationDate = reset ? null : this.offer.expirationDate;

    this.offerService.search(registrationDate, expirationDate).pipe(take(1)).subscribe((offers: Array<Offer>) => {
      this.dataSource = offers;
    }, error => {
      // TO DELETE (TEST)
      if (!this.dataSource) {
        const data = [];
        data.push({
          id: '1', expirationDate: '16/03/2021', articleList: [],
          description: 'TEST!!!', discount: 25, registrationDate: '16/03/2020'
        });
        this.dataSource = data;
      }
    });
  }

  public create(): void {
    this.dialog.open(OfferCreationDialogComponent).afterClosed().pipe(take(1)).subscribe(() => this.search(false));
  }

  public print(offerToPrint: Offer): void {
    this.dialog.open(OfferPrintDialogComponent, {data: {offer_object: offerToPrint}});
  }

  public delete(offerToDelete: Offer): void {
    this.dialog.open(CancelYesDialogComponent).afterClosed().pipe(take(1)).subscribe((shouldDelete: boolean) => {
      if (shouldDelete) {
        this.offerService.delete(offerToDelete).subscribe(() => this.search(false));
      }
    }, (error) => console.log(error), () => {
      this.dataSource = this.dataSource.filter(o => o.id !== offerToDelete.id);
    });
  }
}
