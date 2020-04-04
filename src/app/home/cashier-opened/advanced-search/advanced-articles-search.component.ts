import {Component} from '@angular/core';
import {Article} from '../../shared/article.model';
import {AdvancedArticlesSearchService} from './advanced-articles-search.service';
import {ArticleSearch} from './article-advanced-search.model';
import {Provider} from '../../shared/provider.model';
import {ShoppingCartService} from '../shopping-cart/shopping-cart.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-advanced-articles-search',
  templateUrl: 'advanced-articles-search.component.html'
})
export class AdvancedArticlesSearchComponent {

  title = 'Articles';
  data: Article[];
  columns = ['code', 'description', 'reference', 'stock', 'retailPrice', 'discontinued'];

  articleSearch: ArticleSearch = {};
  discontinued: boolean;

  constructor(private advancedArticlesSearchService: AdvancedArticlesSearchService, private shoppingCartService: ShoppingCartService,
              private message: MatSnackBar) {
    // this.user = {mobile: null, username: null};
    this.data = null;
    this.discontinued = null;
  }

  search() {
    this.advancedArticlesSearchService.readAll().subscribe(
      data => this.data = data
    );
    // this.data = this.advancedArticlesSearchService.readAll();
  }

  advancedSearch() {
    this.advancedArticlesSearchService.advancedArticleSearch(this.articleSearch).subscribe(
      articles => {
        this.data = articles;
      }
    );
  }

  resetSearch() {
    this.articleSearch = {
      description: null,
      reference: null,
      stock: null,
      retailPrice: null,
      discontinued: null
    };
    this.advancedArticlesSearchService.readAll().subscribe(
      data => this.data = data
    );
  }

  getProvider(provider: Provider) {
    this.articleSearch.provider = provider.id;
  }

  addToChart(article: Article) {
    this.shoppingCartService.add(article.code).subscribe(() => {
      this.message.open('Article added correctly to Shopping Cart', null, {
        duration: 1500,
      });
    });
  }

}
