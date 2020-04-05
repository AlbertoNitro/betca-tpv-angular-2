import {Component, Inject} from '@angular/core';
import {Article} from '../shared/article.model';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';
import {ArticlesFamilyService} from '../shared/article-family.service';
import { ArticlesFamily } from '../shared/articles-family.model';

@Component({
  templateUrl: 'articles-family-detail-dialog.component.html'
})

export class ArticlesFamilyDetailDialogComponent {
  articleFamily: ArticlesFamily = {
    id: null,
    description: null,
    reference: null,
    familyType: null,
    article: null,
    articlesFamilyList: null,
    isTypeArticle : false
  };
  color = 'warn';

  constructor(@Inject(MAT_DIALOG_DATA) data: any, private dialog: MatDialog,
              private dialogRef: MatDialogRef<ArticlesFamilyDetailDialogComponent>,
              private message: MatSnackBar, private articlesFamilyService: ArticlesFamilyService) {
    this.articlesFamilyService.searchById(data.id).subscribe(
      articleFamily => {
          this.articleFamily = articleFamily;
          if(articleFamily.familyType == "ARTICLE"){
            this.articleFamily.isTypeArticle = true;
          }else{
            this.articleFamily.isTypeArticle = false;
          }
          return this.articleFamily;
        }
    );
  }
}
