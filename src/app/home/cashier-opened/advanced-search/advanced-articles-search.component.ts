import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Article} from '../../shared/article.model';
import {AdvancedArticlesSearchService} from './advanced-articles-search.service';
import {ArticleSearch} from './article-advanced-search.model';
import {Provider} from '../../shared/provider.model';
import {ShoppingCartService} from '../shopping-cart/shopping-cart.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Tag} from './tag.model';
import {TagService} from './tag.service';

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
  tagDescription: string;
  tag: Tag;

  tags: Tag[];

  constructor(private advancedArticlesSearchService: AdvancedArticlesSearchService, private shoppingCartService: ShoppingCartService,
              private tagService: TagService, private message: MatSnackBar) {
    // this.user = {mobile: null, username: null};
    this.data = null;
    this.discontinued = null;
    this.tagService.readAll().subscribe(
      data => this.tags = data
    );
    this.tag = null;
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

  searchByTag() {
    if (this.tagDescription == null) {
      this.advancedArticlesSearchService.readAll().subscribe(
        data => this.data = data
      );
    } else {
      this.tagService.readOne(this.tagDescription).subscribe(
        data => {
          this.tag = data;
          this.data = data.articles;
          console.log(this.tag);
        }
      );
    }
  }

}
