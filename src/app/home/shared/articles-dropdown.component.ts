import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Article} from './article.model';
import {ArticleService} from './article.service';

@Component({
  selector: 'app-articles-dropdown',
  templateUrl: './articles-dropdown.component.html'
})
export class ArticlesDropdownComponent {
  @Input() articleIn = '';
  @Output() articleOut = new EventEmitter<any>();
  articles: Article[];

  constructor(private articleService: ArticleService) {
    this.articleService.readAll().subscribe(
      data => this.articles = data
    );
  }

  onSelect(article) {
    this.articleOut.emit(article);
  }
}
