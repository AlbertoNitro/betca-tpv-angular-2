import { Component, OnInit } from '@angular/core';
import {Tag} from '../../cashier-opened/advanced-search/tag.model';
import {Article} from '../../shared/article.model';
import {MatDialog, MatSnackBar} from '@angular/material';
import {TagService} from '../../cashier-opened/advanced-search/tag.service';
import {ArticleService} from '../../shared/article.service';

@Component({
  templateUrl: './tag-edit-dialog.component.html',
  styleUrls: ['../tag-create-dialog/tag-create-dialog.component.css']
})
export class TagEditDialogComponent implements OnInit {

  public tag: Tag = {id: null, description: null, articleList: []};
  public articles: Array<Article> = [];
  public submitted: boolean;
  constructor(private dialog: MatDialog, private tagService: TagService,
              private message: MatSnackBar, private articleService: ArticleService) {
  }

  ngOnInit() {
    this.articleService.readAll().subscribe((articles: Array<Article>) => {
      this.articles = articles;
    });
    this.submitted = false;
  }
  public update() {
    this.tagService.update(this.tag).subscribe( () => {
      this.dialog.closeAll();
    }, (error: any) => {
      console.error(error);
      this.message.open('Ups, something went wrong.', null, {duration: 2000});
    }, () => {
      this.message.open('Tag updated successfully.', null, {duration: 3000});
    });
  }
  public addArticleToTag(article: Article): void {
    this.tag.articleList.push(article);
    this.articles = this.articles.filter( a => a.code !== article.code);
  }
  public removeArticleFromTag(article: Article): void {
    this.articles.push(article);
    this.tag.articleList = this.tag.articleList.filter(a => a.code !== article.code);
  }
}
