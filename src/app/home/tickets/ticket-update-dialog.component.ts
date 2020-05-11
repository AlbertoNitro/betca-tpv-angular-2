import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {TicketService} from '../shared/ticket.service';
import {ShoppingState} from '../shared/shopping.model';
import {VoucherPrintDialogComponent} from '../cashier-opened/shopping-cart/vouchers/voucher-print-dialog.component';
import {Voucher} from '../shared/voucher.model';
import {VoucherService} from '../shared/voucher.service';
import {CheckOutDialogComponent} from '../cashier-opened/shopping-cart/check-out-dialog.component';
import {ShoppingUpdate} from '../shared/shoppingUpdate.model';
import {TicketUpdateModel} from '../shared/ticketUpdate.model';
import {ShoppingCartService} from '../cashier-opened/shopping-cart/shopping-cart.service';

export interface ShoppingListDialog {
  code: string;
  description: string;
  retailPrice: number;
  amount: number;
  discount: number;
  total: number;
  shoppingState: ShoppingState;
}

@Component({
  selector: 'app-ticket-update-dialog',
  templateUrl: './ticket-update-dialog.component.html',
  styleUrls: ['./ticket-update-dialog.component.css']
})

export class TicketUpdateDialogComponent implements OnInit {
  displayedColumns: string[] = ['description', 'retailPrice', 'amount', 'discount', 'total', 'shoppingState'];
  dataSource: ShoppingListDialog[];
  shoppingListDialogs: ShoppingListDialog[] = [];
  states: ShoppingState[] = [
    ShoppingState.NOT_COMMITTED,
    ShoppingState.REQUIRE_PROVIDER,
    ShoppingState.IN_STOCK,
    ShoppingState.COMMITTED
  ];
  return: boolean;
  returnPrice: number;
  formerTotal: number;
  commitArticle: boolean;
  shoppingUpdates: ShoppingUpdate[] = [];
  ticketUpdate: TicketUpdateModel = {
    shoppingPatchDtoList: []
  };
  ticketId: string;
  updatedTotal: number;
  disableSelect: boolean;

  constructor(@Inject(MAT_DIALOG_DATA) data: any, private ticketService: TicketService,
              private dialog: MatDialog, private voucherService: VoucherService, private shoppingCartService: ShoppingCartService) {
    this.returnPrice = 0;
    this.updatedTotal = 0;
    this.ticketId = data.id;
    this.ticketService.getTicket(this.ticketId).subscribe(
      data => {
        data.shoppingList.forEach(
          item => {
            this.shoppingListDialogs.push(
              {code: item.code, description: item.description, retailPrice: item.retailPrice, amount: item.amount,
                discount: item.discount, total: item.total, shoppingState: item.shoppingState},
            );
          }
        );
        this.dataSource = this.shoppingListDialogs;
        // this.dataSource.forEach(
        //   item => {
        //     this.disableSelect = item.shoppingState === ShoppingState.COMMITTED;
        //   }
        // );
      }
    );
  }

  ngOnInit() {
  }

  decreaseAmount(shoppingListDialog: ShoppingListDialog) {
    if (shoppingListDialog.amount !== 0) {
      shoppingListDialog.amount--;
      this.formerTotal = shoppingListDialog.total;
      shoppingListDialog.total = Math.round((shoppingListDialog.retailPrice * shoppingListDialog.amount * (1 - shoppingListDialog.discount / 100) * 100) / 100);
      this.returnPrice += this.formerTotal - shoppingListDialog.total;
      this.return = true;
    }
  }

  updateTicket() {
    this.shoppingListDialogs.forEach(
      item => {
        this.shoppingUpdates.push({articleId: item.code, amount: item.amount, shoppingState: item.shoppingState});
      }
    );
    this.ticketUpdate.shoppingPatchDtoList = this.shoppingUpdates;
    this.ticketService.update(this.ticketId, this.ticketUpdate).subscribe(
      data => {
        if (this.commitArticle === true) {
          this.checkoutArticle(data);
        }
        if (this.return === true) {
          this.createVoucher();
        }
      }
    );
  }

  createVoucher() {
    const voucher = new Voucher();
    voucher.value = this.returnPrice;
    this.voucherService.create(voucher).subscribe(
      data => this.printVoucher(data)
    );
  }

  printVoucher(voucher: Voucher) {
    this.dialog.open(VoucherPrintDialogComponent, {
      data: {
        voucher_object: voucher
      }
    });
  }

  getArticleState(element: ShoppingListDialog) {
    if (element.shoppingState === ShoppingState.COMMITTED) {
      this.commitArticle = true;
      this.updatedTotal += element.total;
      this.shoppingCartService.updateTicketDialogTotal(this.updatedTotal);
    }
  }

  checkoutArticle(data) {
    this.shoppingCartService.updateTicketDialogShopping(data.shoppingList);
    this.dialog.open(CheckOutDialogComponent).afterClosed().subscribe();
  }
}
