import {Component} from '@angular/core';
import {ArticlesFamilyViewService} from './articles-family-view.service';
import {ShoppingCartService} from '../shopping-cart/shopping-cart.service';
import {ArticlesFamilyViewComplete} from './articles-family-view-complete.model';
import {MatDialog, MatSnackBar} from '@angular/material';
import {ArticlesFamilyViewSizesDialogComponent} from './articles-family-view-sizes-dialog.component';

@Component({
  selector: 'app-articles-family-view',
  templateUrl: 'articles-family-view.component.html',
  styleUrls: ['articles-family-view.component.css']
})
export class ArticlesFamilyViewComponent {
  articlesFamilyList: ArticlesFamilyViewComplete[] = [];
  articlesFamilyListSizes: ArticlesFamilyViewComplete[] = [];

  constructor(private articlesFamilyViewService: ArticlesFamilyViewService,
              private dialog: MatDialog,
              private shoppingCartService: ShoppingCartService,
              private message: MatSnackBar) {
    this.getRootArticlesFamily();
  }

  getRootArticlesFamily() {
    this.articlesFamilyViewService.readFamilyCompositeByDesc('root')
      .subscribe(data => {
        this.articlesFamilyList = data;
      });
  }

  addArticleToShoppingCart(reference: string) {
    this.shoppingCartService.add(reference).subscribe(() => {
      this.message.open('✅ Article added to shopping cart', null, {
        duration: 2000,
      });
    });
  }

  selectFamilyTypeArticlesFamily(articleSelected: ArticlesFamilyViewComplete) {
    if (articleSelected.familyType === 'ARTICLES') {
      this.handleFamilyViewArticles(articleSelected.description);
    } else if (articleSelected.familyType === 'ARTICLE') {
      this.addArticleToShoppingCart(articleSelected.code);
    } else if (articleSelected.familyType === 'SIZES') {
      this.handleFamilyViewSizes(articleSelected.description);
    }
  }

  handleFamilyViewArticles(description) {
    this.articlesFamilyViewService.readFamilyCompositeByDesc(description)
      .subscribe(
        data => {
          this.articlesFamilyList = data;
        }
      );
  }

  handleFamilyViewSizes(description) {
    this.articlesFamilyViewService.readFamilyCompositeByDesc(description)
      .subscribe(
        data => {
          this.articlesFamilyListSizes = data.filter(x => x.size !== null && x.stock !== null);
          this.articlesFamilyListSizes.length === 0 ?
            this.message.open('⚠ Ups, There is no stock for that item.', null, {
              duration: 2000,
            }) :
            this.dialog.open(ArticlesFamilyViewSizesDialogComponent, {data: this.articlesFamilyListSizes});
        }
      );
  }
}





