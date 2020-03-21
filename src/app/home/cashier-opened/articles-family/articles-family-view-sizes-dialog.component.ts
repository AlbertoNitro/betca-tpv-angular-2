import {Component, Inject} from '@angular/core';
import {ArticlesFamilyViewComplete} from './articles-family-view-complete.model';
import {ShoppingCartService} from '../shopping-cart/shopping-cart.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';


@Component({
  template: `
      <mat-list >
          <h3 matSubheader>Sizes with Prices avaliable for this product</h3>
          <mat-list-item *ngFor="let articleInfo of articlesFamilySizes" mat-list-item>
              <span matLine><b>#{{ articleInfo.code}}</b></span>
              <span matLine>Size: <b>{{ articleInfo.size}}</b></span>
              <span matLine>Price: <b>{{ articleInfo.retailPrice}} €</b></span>
              <span matLine>Stock: <b>{{ articleInfo.stock}} units</b></span>
              <button mat-icon-button (click)="addArticleToShoppingCart(articleInfo.code)">
                  <mat-icon>add</mat-icon>
              </button>
          </mat-list-item>
      </mat-list>
  `
})
export class ArticlesFamilyViewSizesDialogComponent {

  articlesFamilySizes: ArticlesFamilyViewComplete[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any[],
    private shoppingCartService: ShoppingCartService,
    public dialogRef: MatDialogRef<ArticlesFamilyViewSizesDialogComponent>) {
    this.articlesFamilySizes = data;
  }


}
