import {Component} from '@angular/core';
import {ArticleFamilyView} from './articles-family-view.model';
import {ArticlesFamilyViewService} from './articles-family-view.service';
import {ShoppingCartService} from '../shopping-cart/shopping-cart.service';
import {ArticlesFamilyViewComplete} from './articles-family-view-complete.model';

@Component({
  selector: 'app-articles-family-view',
  templateUrl: 'articles-family-view.component.html',
  styleUrls: ['articles-family-view.component.css']
})
export class ArticlesFamilyViewComponent {
  // articlesFamilyList: ArticleFamilyView[] = [];
  articlesFamilyList: ArticlesFamilyViewComplete[] = [];


  constructor(private articlesFamilyViewService: ArticlesFamilyViewService,
              private shoppingCartService: ShoppingCartService) {
    this.getRootArticlesFamily();
  }

  getRootArticlesFamily() {
    this.articlesFamilyViewService.readFamilyCompositeByDesc('root')
      .subscribe(
        data => {
          console.log('root data', data);
          this.articlesFamilyList = data;
          console.log(this.articlesFamilyList);
        }
      );
  }

  addArticleToShoppingCart(reference: string) {
    this.shoppingCartService.add(reference).subscribe(() => {
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
          console.log(data);

        }
      );
  }


}





