import {Component} from '@angular/core';
import {ArticleFamilyView} from './articles-family-view.model';
import {ArticlesFamilyViewService} from './articles-family-view.service';

@Component({
  selector: 'app-articles-family-view',
  templateUrl: 'articles-family-view.component.html',
  styleUrls: ['articles-family-view.component.css']
})
export class ArticlesFamilyViewComponent {
  articlesFamilyList: ArticleFamilyView[] = [];

  constructor(private articlesFamilyViewService: ArticlesFamilyViewService) {
    this.getRootArticlesFamily();
  }

  getRootArticlesFamily() {
    this.articlesFamilyViewService.readArticlesFamilyList('root')
      .subscribe(
        data => {
          console.log('data is here');
          console.log(data);
          this.articlesFamilyList = data;
        }
      );
  }


  selectFamilyTypeArticlesFamily(articleSelected: ArticleFamilyView) {
    console.log('getting more ');
    if (articleSelected.familyType === 'ARTICLES') {
      this.articlesFamilyViewService.readArticlesFamilyList(articleSelected.reference)
        .subscribe(
          data => {
            console.log('ARTICLES are here');
            console.log(data);
            this.articlesFamilyList = data;
          }
        );
    } else if (articleSelected.familyType === 'ARTICLE') {

    } else if (articleSelected.familyType === 'SIZES') {

    }
  }


}





