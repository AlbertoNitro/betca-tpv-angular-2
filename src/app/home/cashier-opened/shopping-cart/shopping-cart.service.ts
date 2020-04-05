import {Injectable} from '@angular/core';
import {BehaviorSubject, concat, EMPTY, iif, merge, Observable, Subject} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

import {HttpService} from '../../../core/http.service';
import {ArticleService} from '../../shared/article.service';
import {Article} from '../../shared/article.model';
import {Shopping} from './shopping.model';
import {TicketCreation} from './ticket-creation.model';

import {AppEndpoints} from '../../../app-endpoints';
import {ArticleQuickCreationDialogComponent} from './article-quick-creation-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {VoucherService} from '../../shared/voucher.service';
import {InvoiceService} from '../../shared/invoice/invoice.service';
import {BudgetCreation} from './budget/budget-creation.model';
import {Budget} from './budget/budget.model';
import {CustomerDiscountService} from '../../customer-discount/customer-discount.service';
import {CustomerDiscount} from '../../customer-discount/customer-discount.model';
import {GiftTicketCreation} from './gift-ticket-creation.model';
import {GiftTicketService} from '../../shared/gift-ticket.service';

@Injectable()
export class ShoppingCartService {

  static ARTICLE_VARIOUS = '1';
  static SHOPPING_CART_NUM = 4;
  static ARTICLE_CUSTOMER_POINTS = '0';
  static EACH_TEN_POINTS_ONE_UNIT_DISCOUNT_IN_TOTAL = 10;

  private indexShoppingCart = 0;
  private shoppingCart: Array<Shopping>;
  private totalShoppingCart = 0;
  private shoppingCartList: Array<Array<Shopping>> = [];
  private shoppingCartSubject: Subject<Shopping[]> = new BehaviorSubject(undefined); // refresh auto
  private lastArticle: Article;
  private mobileList: object = {0: '', 1: '', 2: '', 3: ''};

  constructor(private dialog: MatDialog,
              private articleService: ArticleService,
              private httpService: HttpService,
              private voucherService: VoucherService,
              private invoiceService: InvoiceService,
              private giftTicketService: GiftTicketService,
              private customerDiscountService: CustomerDiscountService) {
    for (let i = 0; i < ShoppingCartService.SHOPPING_CART_NUM; i++) {
      this.shoppingCartList.push([]);
    }
    this.shoppingCart = this.shoppingCartList[this.indexShoppingCart];
  }

  static isArticleVarious(code: string): boolean {
    return code === ShoppingCartService.ARTICLE_VARIOUS;
  }

  static isArticleCustomerPoints(code: string): boolean {
    return code === ShoppingCartService.ARTICLE_CUSTOMER_POINTS;
  }

  static isArticleVariousOrCustomerPoints(code: string): boolean {
    return this.isArticleVarious(code) || this.isArticleCustomerPoints(code);
  }

  shoppingCartObservable(): Observable<Shopping[]> {
    return this.shoppingCartSubject.asObservable();
  }

  getIndexShoppingCart(): number {
    return this.indexShoppingCart + 1;
  }

  getTotalShoppingCart() {
    return this.totalShoppingCart;
  }

  getLastArticle(): Article {
    return this.lastArticle;
  }

  synchronizeCartTotal(): void {
    let total = 0;
    for (const shopping of this.shoppingCart) {
      total = total + shopping.total;
    }
    this.totalShoppingCart = Math.round(total * 100) / 100;
  }

  getTotalCommitted(): number {
    let total = 0;
    for (const shopping of this.shoppingCart) {
      if (shopping.committed) {
        total += shopping.total;
      }
    }
    return Math.round(total * 100) / 100;
  }

  unCommitArticlesExist(): boolean {
    for (const shopping of this.shoppingCart) {
      if (!shopping.committed && shopping.amount > 0) {
        return true;
      }
    }
    return false;
  }

  delete(shopping: Shopping): void {
    const index = this.shoppingCart.indexOf(shopping);
    if (index > -1) {
      this.shoppingCart.splice(index, 1);
    }
    this.synchronizeAll();
  }

  add(codeValue: string): Observable<any> {
    let price: number = Number(codeValue.replace(',', '.'));
    if (!Number.isNaN(price) && codeValue.length <= 5) {
      codeValue = ShoppingCartService.ARTICLE_VARIOUS;
    } else {
      price = undefined;
    }
    return this.articleService.readOne(codeValue).pipe(
      map(
        (article: Article) => {
          this.addArticle(article, price);
        }), catchError(() => {
        const dialogRef = this.dialog.open(ArticleQuickCreationDialogComponent);
        dialogRef.componentInstance.article = {code: codeValue, description: undefined, retailPrice: undefined};
        dialogRef.afterClosed().subscribe(
          newArticle => {
            if (newArticle) {
              this.addArticle(newArticle);
            }
          }
        );
        return EMPTY;
      })
    );
  }

  exchange(): void {
    this.shoppingCartList[this.indexShoppingCart++] = this.shoppingCart;
    this.indexShoppingCart %= ShoppingCartService.SHOPPING_CART_NUM;
    this.shoppingCart = this.shoppingCartList[this.indexShoppingCart];
    this.synchronizeAll();
  }

  checkOut(ticketCreation: TicketCreation, voucher: number, requestedInvoice: boolean,
           requestedGiftTicket: boolean, giftTicketCreation: GiftTicketCreation): Observable<any> {
    ticketCreation.shoppingCart = this.shoppingCart;
    const ticket = this.httpService.pdf().post(AppEndpoints.TICKETS, ticketCreation).pipe(
      map(() => this.reset())
    );
    const userMobile = this.getCurrentUserMobile();
    const updatePoints = iif(() => userMobile !== '', this.httpService.put(AppEndpoints.CUSTOMER_POINTS + '/' + userMobile, new Object(0)));
    let receipts = iif(() => voucher > 0, this.voucherService.createAndPrint(Math.abs(this.totalShoppingCart - ticketCreation.voucher)));
    receipts = iif(() => requestedInvoice, merge(receipts, this.invoiceService.create()), receipts);
    receipts = iif(() => requestedGiftTicket, merge(receipts, this.giftTicketService.createAndPrint(giftTicketCreation)), receipts);
    return concat(updatePoints, ticket, receipts);
  }

  isEmpty(): boolean {
    return (!this.shoppingCart || this.shoppingCart.length === 0);
  }

  getDiscountByMobile(mobile: string): Observable<CustomerDiscount> {
    return this.httpService.get(AppEndpoints.CUSTOMER_DISCOUNTS + '/' + mobile);
  }


  applyCustomerDiscount(customerDiscount: CustomerDiscount) {
    const {discount} = customerDiscount;

    for (const shopping of this.shoppingCart) {
      shopping.discount = discount;
      shopping.updateTotal();
    }
    this.synchronizeAll();


  }


  createBudget(budgetCreation: BudgetCreation): Observable<any> {
    const budget = this.httpService.pdf().post(AppEndpoints.BUDGETS, budgetCreation).pipe(
      map(() => this.reset())
    );
    return budget;
  }

  getBudgetById(id: string): Observable<Budget> {
    return this.httpService.get(AppEndpoints.BUDGETS + '/' + id);
  }

  addBudgetList(listArticle: Array<Shopping>) {
    for (const element of listArticle) {
      const shoppingElement = new Shopping(element.code, element.description, element.retailPrice);
      shoppingElement.setDiscount(element.discount);
      shoppingElement.setTotal(element.total);
      shoppingElement.setAmount(element.amount);
      shoppingElement.setCommited(element.committed);
      this.shoppingCart.push(shoppingElement);
      this.synchronizeAll();
    }
  }

  getShoppingCart() {
    return this.shoppingCart;
  }

  checkMobileAlreadyUsed(mobile: string) {
    return Boolean(Object.keys(this.mobileList).find(item => this.mobileList[item] === mobile));
  }

  calculateDiscountByCustomerPoints(customerPoints: number) {
    return -(customerPoints / ShoppingCartService.EACH_TEN_POINTS_ONE_UNIT_DISCOUNT_IN_TOTAL);
  }

  fetchCustomerPoints(mobile: string): Observable<any> {
    return this.httpService.get(AppEndpoints.CUSTOMER_POINTS + '/' + mobile);
  }

  applyCustomerPoints(customerPoints: number, mobile: string) {
    const mobileAlreadyUsed = this.checkMobileAlreadyUsed(mobile);

    const retailPrice = this.calculateDiscountByCustomerPoints(customerPoints);

    this.storeMobile(mobile);

    if (mobileAlreadyUsed) {
      this.shoppingCart = this.shoppingCart.filter(s => s.code !== ShoppingCartService.ARTICLE_CUSTOMER_POINTS);
      this.storeMobile('');
      this.synchronizeAll();
      return;
    }
    this.shoppingCart = this.shoppingCart.filter(s => s.code !== ShoppingCartService.ARTICLE_CUSTOMER_POINTS);
    const shopping = new Shopping(ShoppingCartService.ARTICLE_CUSTOMER_POINTS, 'Customer points (' + customerPoints + ')', retailPrice);
    this.shoppingCart.push(shopping);
    this.synchronizeAll();
  }

  private storeMobile(mobile: string) {
    this.mobileList[this.indexShoppingCart] = mobile;
  }

  private getCurrentUserMobile() {
    return this.mobileList[this.indexShoppingCart];
  }

  private addArticle(article: Article, price?: number) {
    const shopping = new Shopping(article.code, article.description, article.retailPrice);
    if (article.stock < 1) {
      shopping.committed = false;
    }
    this.shoppingCart.push(shopping);
    this.lastArticle = article;
    if (price) {
      shopping.total = price;
      shopping.updateDiscount();
    }
    this.synchronizeAll();
  }

  private reset() {
    this.shoppingCart = [];
    this.storeMobile('');
    this.synchronizeAll();
  }

  private synchronizeAll() {
    this.shoppingCartSubject.next(this.shoppingCart);
    this.synchronizeCartTotal();
  }

}
