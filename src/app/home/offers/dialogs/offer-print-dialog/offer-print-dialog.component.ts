import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material';
import {Offer} from 'src/app/home/shared/offer.model';
import {OfferService} from 'src/app/home/shared/offer.service';

@Component({
  selector: 'app-offer-print-dialog',
  templateUrl: './offer-print-dialog.component.html',
  styles: []
})
export class OfferPrintDialogComponent {

  public offer: Offer;

  constructor(private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, private offerService: OfferService) {
    this.offer = this.data.offer_object;
  }

  printOffer() {
    this.offerService.print(this.offer).subscribe(() => {
      },
      () => this.dialog.closeAll(),
      () => this.dialog.closeAll());
  }
}
