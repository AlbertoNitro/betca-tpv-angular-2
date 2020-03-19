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
  notEnoughCash: boolean;

  constructor(private dialog: MatDialog, private dialogRef: MatDialogRef<CashMovementsDialogComponent>,
              private cashMovementsService: CashMovementsService) {
    cashMovementsService.readState().subscribe((cashierState) => {
      this.cashCashier = cashierState.totalCash;
    });
  }

  invalid() {
    this.notEnoughCash = (this.cashMovements.cashMovement > this.cashCashier) && this.operation === this.WITHDRAWL;
    return (!this.cashMovements.cashMovement && this.cashMovements.cashMovement !== 0) || !this.cashMovements.comment
      || (!this.operation) || this.notEnoughCash;
  }

  move() {
    if (this.operation === this.DEPOSIT) {
      this.cashMovementsService.deposit(this.cashMovements).subscribe(
        () => this.dialogRef.close()
      );
    }
    if (this.operation === this.WITHDRAWL) {
      this.cashMovementsService.withdrawal(this.cashMovements).subscribe(
        () => this.dialogRef.close()
      );
    }
  }

  calculate(): number {
    if (this.operation === this.WITHDRAWL) {
      return this.cashCashier - this.cashMovements.cashMovement;
    }
    if (this.operation === this.WITHDRAWL) {
      return this.cashCashier + this.cashMovements.cashMovement;
    }
    return this.cashCashier;
  }

}
