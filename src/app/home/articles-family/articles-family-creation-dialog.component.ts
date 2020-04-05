import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';
import {Article} from '../shared/article.model';
import {ArticleService} from '../shared/article.service';
import {ArticlesFamilyService} from '../shared/article-family.service';
import { ArticlesFamily, ArticlesFamilyCreation} from '../shared/articles-family.model';

@Component({
  styleUrls: ['articles-family-creation-dialog.component.css'],
  templateUrl: 'articles-family-creation-dialog.component.html'
})

  

export class ArticlesFamilyCreationDialogComponent {

  newArticlesFamily: ArticlesFamily = {
    id: null,
    description: null,
    reference: null,
    familyType: "ARTICLE",
    article: null,
    articlesFamilyList: null,
    articleId: null,
    articlesFamilyListId: null
  };

  articlesFamily: ArticlesFamilyCreation = {
    id: null,
    description: null,
    reference: null,
    familyType: null,
    article: null,
    articlesFamilyListId: null
  };

  articles: Article[];
  articlesFamilyList: ArticlesFamily[];
  


  editMode: boolean;

  constructor(@Inject(MAT_DIALOG_DATA) data: any, private dialog: MatDialog,
              private message: MatSnackBar, private articleFamilyService: ArticlesFamilyService,
              private articleService :ArticleService) {
    this.editMode = data.isEdit;
    if (data.isEdit) {
      this.articleFamilyService.searchById(data.id).subscribe(
        articlesFamily => {
            this.newArticlesFamily = articlesFamily
            if(articlesFamily.article != null){
              this.newArticlesFamily.articleId = articlesFamily.article.code
            }
            if(articlesFamily.articlesFamilyList != null){
              this.newArticlesFamily.articlesFamilyListId = [];
              for(let i=0; i < articlesFamily.articlesFamilyList.length; i++){
                this.newArticlesFamily.articlesFamilyListId.push(articlesFamily.articlesFamilyList[i].id);
              }
            }    
          }
      );
    }
    this.articleService.readAll().subscribe(
      data => this.articles = data
    );
    this.articleFamilyService.readAll().subscribe(
      data => this.articlesFamilyList = data
    );
  }

  convertToArticlesFamilyCreation(articleFamily : ArticlesFamily){
    this.articlesFamily.id = articleFamily.id;
    this.articlesFamily.description = articleFamily.description;
    this.articlesFamily.familyType = articleFamily.familyType;
    this.articlesFamily.reference = articleFamily.reference;
    this.articlesFamily.article = articleFamily.articleId;
    this.articlesFamily.articlesFamilyListId = articleFamily.articlesFamilyListId;
  }

  createArticle() {
    this.convertToArticlesFamilyCreation(this.newArticlesFamily);
    this.articleFamilyService.create(this.articlesFamily).subscribe(
      () => {
        this.dialog.closeAll();
      }
      , () => this.message.open('Ups, something bad happened.', null, {
        duration: 2000,
      })
      , () => this.message.open('Article created successfully', null, {
        duration: 2000,
      })
    );
  }

  updateArticle() {
    this.convertToArticlesFamilyCreation(this.newArticlesFamily);
    this.articleFamilyService.update(this.newArticlesFamily.id, this.articlesFamily).subscribe(
      (data) => {
        this.newArticlesFamily = data;
        this.dialog.closeAll();
      }
      , () => this.message.open('Ups, something bad happened.', null, {
        duration: 2000,
      })
      , () => this.message.open('Article updated successfully', null, {
        duration: 2000,
      })
    );
  }

}
