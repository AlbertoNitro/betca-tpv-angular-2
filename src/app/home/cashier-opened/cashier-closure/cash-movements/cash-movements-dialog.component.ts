import {Component} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import {CashierMovements} from './cash-movements.model';
import {CashMovementsService} from './cash-movements.service';


@Component({
  templateUrl: 'cash-movements-dialog.component.html',
  styleUrls: ['cash-movements-dialog.component.css']
})
export class CashMovementsDialogComponent {

  cashMovements: CashierMovements = {cashMovement: null, comment: undefined};
  operation: string;
  cashCashier: number;
  DEPOSIT = 'DEPOSIT';
  WITHDRAWL = 'WITHDRAWL';

  constructor(private dialog: MatDialog, private dialogRef: MatDialogRef<CashMovementsDialogComponent>,
              private cashMovementsService: CashMovementsService) {
    cashMovementsService.readState().subscribe((cashierState) => {
      this.cashCashier = cashierState.totalCash;
    });
  }

  invalid() {
    return (!this.cashMovements.cashMovement && this.cashMovements.cashMovement !== 0) || !this.cashMovements.comment
      || (!this.operation);
  }

  move() {
    if (this.operation === this.DEPOSIT) {
      this.cashMovementsService.deposit(this.cashMovements).subscribe();
      console.log(this.cashMovements.cashMovement);
    }
    if (this.operation === this.WITHDRAWL) {
      console.log('In construction!!!');
    }
  }

}
