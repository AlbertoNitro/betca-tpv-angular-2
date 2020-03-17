import {Component} from '@angular/core';
import {ArticleFamilyView} from './articles-family-view.model';
import {ArticlesFamilyViewService} from './articles-family-view.service';
import {ShoppingCartService} from '../shopping-cart/shopping-cart.service';

@Component({
  selector: 'app-articles-family-view',
  templateUrl: 'articles-family-view.component.html',
  styleUrls: ['articles-family-view.component.css']
})
export class ArticlesFamilyViewComponent {
  articlesFamilyList: ArticleFamilyView[] = [];

  constructor(private articlesFamilyViewService: ArticlesFamilyViewService,
              private shoppingCartService: ShoppingCartService) {
    this.getRootArticlesFamily();
  }

  getRootArticlesFamily() {
    this.articlesFamilyViewService.readArticlesFamilyList('root')
      .subscribe(
        data => {
          this.articlesFamilyList = data;
        }
      );
  }

  addArticleToShoppingCart(reference: string) {
    console.log('enters shoppingcart');
    this.shoppingCartService.add(reference).subscribe((data) => {
       console.log(data);
      }
    );
  }

  selectFamilyTypeArticlesFamily(articleSelected: ArticleFamilyView) {
    if (articleSelected.familyType === 'ARTICLES') {
      this.articlesFamilyViewService.readArticlesFamilyList(articleSelected.reference)
        .subscribe(
          data => {
            this.articlesFamilyList = data;
          }
        );
    } else if (articleSelected.familyType === 'ARTICLE') {
      this.addArticleToShoppingCart(articleSelected.reference);
    } else if (articleSelected.familyType === 'SIZES') {

    }
  }


}





