import {Component, Inject, OnInit} from '@angular/core';
import {Tag} from '../../shared/tag.model';
import {Article} from '../../shared/article.model';
import {MAT_DIALOG_DATA, MatDialog, MatSnackBar} from '@angular/material';
import {TagService} from '../../shared/tag.service';
import {ArticleService} from '../../shared/article.service';

@Component({
  templateUrl: './tag-edit-dialog.component.html',
  styleUrls: ['../tag-create-dialog/tag-create-dialog.component.css']
})
export class TagEditDialogComponent implements OnInit {

  public tag: Tag = {id: null, description: null, articleList: []};
  public tag2: Tag = {id: null, description: null, articleList: []};
  public articles: Array<Article> = [];
  public submitted: boolean;
  description: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog, private tagService: TagService,
              private message: MatSnackBar, private articleService: ArticleService) {
    this.tagService.readOne(data.obj.description).subscribe((tag: Tag) => {
      this.tag = tag;
      this.description = this.tag.description;
    });
  }

  ngOnInit() {
    this.tag2.id = this.data.obj.id;
    this.tag2.description = this.data.obj.description;
    this.tag2.articleList = this.data.obj.articles;
    console.log(this.tag2.articleList);
    this.articleService.readAll().subscribe((articles: Array<Article>) => {
      this.articles = articles;
    });
    this.submitted = false;
  }
  public update() {
    this.tagService.update(this.tag.description, this.tag2).subscribe( () => {
      this.dialog.closeAll();
    }, (error: any) => {
      console.error(error);
      this.message.open('Ups, something went wrong.', null, {duration: 2000});
    }, () => {
      this.message.open('Tag updated successfully.', null, {duration: 3000});
    });
  }
  public addArticleToTag(article: Article): void {
    this.tag2.articleList.push(article);
    this.articles = this.articles.filter( a => a.code !== article.code);
  }
  public removeArticleFromTag(article: Article): void {
    this.articles.push(article);
    this.tag2.articleList = this.tag2.articleList.filter(a => a.code !== article.code);
  }
}
