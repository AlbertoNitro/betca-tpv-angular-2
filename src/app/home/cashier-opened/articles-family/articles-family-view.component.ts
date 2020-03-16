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
    console.log('constructor');

    this.articlesFamilyViewService.readArticlesFamilyList('root')
      .subscribe(
        data => {

          this.articlesFamilyList = data;
        }
      );
    // this.articlesFamilyList = this.articlesFamilyViewService.readFamilyComposite('ROOT');
    console.log(this.articlesFamilyList);
  }

  selectFamilyTypeArticlesFamily(articleSelected: ArticleFamilyView) {
    console.log('getting more ');
    if (articleSelected.familyType === 'ARTICLES') {
      this.articlesFamilyViewService.readArticlesFamilyList(articleSelected.reference)
        .subscribe(
          data => {

            this.articlesFamilyList = data;
          }
        );
    } else if (articleSelected.familyType === 'ARTICLE') {

    } else if (articleSelected.familyType === 'SIZES') {

    }
  }


}





