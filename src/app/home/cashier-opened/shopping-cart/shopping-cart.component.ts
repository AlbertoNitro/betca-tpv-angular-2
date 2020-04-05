import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {MatDialog, MatSnackBar, MatTableDataSource} from '@angular/material';

import {ShoppingCartService} from './shopping-cart.service';
import {Shopping} from './shopping.model';
import {CheckOutDialogComponent} from './check-out-dialog.component';
import {BudgetDialogComponent} from './budget/budget-dialog.component';
import {CustomerDiscountService} from '../../customer-discount/customer-discount.service';
import {TicketService} from "../../shared/ticket.service";
import {Ticket} from "../../shared/ticket.model";
import {ShoppingState} from "../../shared/shopping.model";
import {FormControl, Validators} from "@angular/forms";
import {ShoppingUpdate} from "../../shared/shoppingUpdate.model";
import {TicketUpdateModel} from "../../shared/ticketUpdate.model";

@Component({
  selector: 'app-shopping-cart',
  styleUrls: ['shopping-cart.component.css'],
  templateUrl: 'shopping-cart.component.html'
})
export class ShoppingCartComponent implements OnInit, OnDestroy {

  displayedColumns = ['id', 'description', 'retailPrice', 'amount', 'discount', 'total', 'actions'];
  dataSource: MatTableDataSource<Shopping>;
  dataSourceUpdate: Shopping[] = [];
  ticketId: string;
  ticketTable: boolean;
  ticket: Ticket;
  states: ShoppingState[] = [
    ShoppingState.NOT_COMMITTED,
    ShoppingState.REQUIRE_PROVIDER,
    ShoppingState.IN_STOCK,
    ShoppingState.COMMITTED
  ];
  shoppingStateControl = new FormControl('', Validators.required);
  shopping: Shopping;
  ticketUpdate: TicketUpdateModel;
  shoppingUpdate: ShoppingUpdate;
  shoppingUpdates: ShoppingUpdate[] = [];

  private subscriptionDataSource: Subscription;
  @ViewChild('code', {static: true}) private elementRef: ElementRef;
  @ViewChild('budget', {static: true}) private budgetRef: ElementRef;

  constructor(private dialog: MatDialog, private shoppingCartService: ShoppingCartService,
              private snackBar: MatSnackBar, private customerDiscountService: CustomerDiscountService, private ticketService: TicketService) {
    this.subscriptionDataSource = this.shoppingCartService.shoppingCartObservable().subscribe(
      data => {
        this.dataSource = new MatTableDataSource<Shopping>(data);
      }
    );

  }

  ngOnInit() {
    this.elementRef.nativeElement.focus();
    this.ticketTable = false;
    this.ticketService.currentMessage.subscribe(message => this.ticketId = message);
    if (this.ticketId !== '') {
      this.ticketTable = true;
      this.ticketService.getTicket(this.ticketId).subscribe(
        t => {
          // this.ticket.shoppingList = t.shoppingList;
          t.shoppingList.forEach(
            item => {
              this.shopping = new Shopping(item.code, item.description, item.retailPrice, item.shoppingState);
              this.shopping.setAmount(item.amount);
              this.dataSourceUpdate.push(this.shopping);
            }
          );
        }
      );
      console.log(this.dataSourceUpdate);
    }
  }

  updateTicket(dataSource: MatTableDataSource<Shopping>) {
    this.dataSource.data.forEach(
      item => {
        this.shoppingUpdate.amount = item.amount;
        this.shoppingUpdate.shoppinState = item.shoppingState;
        this.shoppingUpdate.articleId = item.code;
        this.shoppingUpdates.push(this.shoppingUpdate);
      }
    );
    this.ticketUpdate.shoppingPatchDtoList = this.shoppingUpdates;
    this.ticketService.update(this.ticketId, this.ticketUpdate).subscribe(data => console.log(data));
  }

  totalShoppingCart(): number {
    return this.shoppingCartService.getTotalShoppingCart();
  }

  indexShoppingCart(): number {
    return this.shoppingCartService.getIndexShoppingCart() === 0 ? undefined : this.shoppingCartService.getIndexShoppingCart();
  }

  priceLabel(shopping: Shopping) {
    if (this.isArticleVarious(shopping.code)) {
      return Math.round(shopping.total / shopping.amount * 100) / 100;
    } else {
      return shopping.retailPrice;
    }
  }

  incrementAmount(shopping: Shopping) {
    if (this.isArticleCustomerPoints(shopping.code)) {
      return;
    }
    shopping.amount++;
    if (shopping.amount === 0) {
      shopping.amount++;
    }
    shopping.updateTotal();
    this.shoppingCartService.synchronizeCartTotal();
  }

  decreaseAmount(shopping: Shopping) {
    if (this.isArticleCustomerPoints(shopping.code)) {
      return;
    }
    shopping.amount--;
    if (shopping.amount === 0) {
      shopping.amount--;
      shopping.committed = true;
    }
    shopping.updateTotal();
    this.shoppingCartService.synchronizeCartTotal();
  }

  discountLabel(shopping: Shopping): string {
    return this.isArticleVarious(shopping.code) ? '' : '' + shopping.discount;
  }

  isArticleCustomerPoints(code: string) {
    return ShoppingCartService.isArticleCustomerPoints(code);
  }

  isArticleVarious(code: string) {
    return ShoppingCartService.isArticleVarious(code);
  }

  hasToBeDisabled(code: string) {
    return ShoppingCartService.isArticleVariousOrCustomerPoints(code);
  }

  updateDiscount(shopping: Shopping, event: any): void {
    if (!this.isArticleVarious(shopping.code)) {
      shopping.discount = Number(event.target.value);
      if (shopping.discount < 0) {
        shopping.discount = 0;
      }
      if (shopping.discount > 100) {
        shopping.discount = 100;
      }
      shopping.updateTotal();
      this.shoppingCartService.synchronizeCartTotal();
    }
  }

  updateTotal(shopping: Shopping, event: any): void {
    shopping.total = Number(event.target.value);
    if (shopping.total > (shopping.retailPrice * shopping.amount)) {
      shopping.total = shopping.retailPrice * shopping.amount;
    }
    if (shopping.total < 0) {
      shopping.total = 0;
    }
    shopping.updateDiscount();
    this.shoppingCartService.synchronizeCartTotal();
  }

  exchange() {
    this.shoppingCartService.exchange();
  }

  changeCommitted(shopping: Shopping) {
    shopping.committed = !shopping.committed;
  }

  delete(shopping: Shopping) {
    this.shoppingCartService.delete(shopping);
  }

  add(codeValue: string) {
    this.shoppingCartService.add(codeValue).subscribe();
  }

  stockLabel(): string {
    return (this.shoppingCartService.getLastArticle()) ? 'Stock of ' + this.shoppingCartService.getLastArticle().description : 'Stock';
  }

  stockValue(): number {
    return (this.shoppingCartService.getLastArticle()) ? this.shoppingCartService.getLastArticle().stock : null;
  }

  isEmpty(): boolean {
    return this.shoppingCartService.isEmpty();
  }

  checkOut() {
    this.dialog.open(CheckOutDialogComponent).afterClosed().subscribe(
      () => this.ngOnInit()
    );
  }

  disabledBudgetButton(value): boolean {
    return !this.shoppingCartService.isEmpty() || value === '';
  }

  createBudget() {
    this.dialog.open(BudgetDialogComponent).afterClosed().subscribe(
      () => {
        this.dialog.closeAll();
      }
      , () => this.dialog.closeAll()
    );
  }

  findBudgetById(id) {
    this.shoppingCartService.getBudgetById(id)
      .subscribe(
        res => {
          this.shoppingCartService.addBudgetList(res.shoppingCart);
          this.budgetRef.nativeElement.value = '';
          const now = new Date();
          const creationDate = new Date(res.creationDate);
          if (((now.getTime() - creationDate.getTime()) / 1000 / 60 / 60 / 24) > 15) {
            const warning = {warning: 'The budget is expired', message: 'Budget expired', path: ''};
            this.snackBar.open(warning.warning + ': ' + warning.message, 'Info', {duration: 2000});
          }
        }
      );
  }

  addDiscount(mobile) {
    this.customerDiscountService.readOne(mobile).subscribe(
      (discountDto) => {
        this.shoppingCartService.applyCustomerDiscount(discountDto);
      }
      , () => {
        this.snackBar.open('Ups, something went wrong', null, {duration: 2000});
      }
    );
  }

  addOffer(offer) {
    // TODO add offer
  }

  useCustomerPoints(mobile: string) {
    this.shoppingCartService.fetchCustomerPoints(mobile).subscribe((points) => {
      if (!points || points <= 0) {
        this.snackBar.open('This client doesnt have points', null, {duration: 3000});
      } else {
        this.shoppingCartService.applyCustomerPoints(points, mobile);
      }
    }, error => {
      this.snackBar.open('Theres no points associate to this mobile', null, {duration: 3000});
    });
  }

  ngOnDestroy(): void {
    this.subscriptionDataSource.unsubscribe();
  }


}
