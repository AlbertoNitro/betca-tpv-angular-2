import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatSnackBar} from '@angular/material';
import {Provider} from '../shared/provider.model';
import {ArticleFamily} from '../shared/articles-family-dialog.model';
import {ProviderService} from '../shared/provider.service';
import {ArticleService} from '../shared/article.service';


@Component({
  templateUrl: 'articles-family-dialog.component.html',
  styleUrls: ['articles-family-dialog.component.css']
})

export class ArticlesFamilyDialogComponent {

  newArticles: ArticleFamily = {
    description: null,
    provider: null,
    sizeType: null,
    fromSize: null,
    toSize: null,
    reference: null,
    increment: 0
  };
  providers: Provider[];
  type = [
    {id: 1, name: 'International'},
    {id: 2, name: 'Number'}
  ];
  size: [];

  constructor(@Inject(MAT_DIALOG_DATA) dataDialog: any, private providerService: ProviderService,
              private message: MatSnackBar, private dialog: MatDialog, private articleSize: ArticleService) {

    this.providerService.readAll().subscribe(
      data => this.providers = data
    );
    this.articleSize.readSizes().subscribe(
      data => this.size = data
    );

  }

  createArticleFamily() {

    if (this.isInvalid()) {
      return;
    }

    this.articleSize.createFamily(this.newArticles).subscribe(
      () => this.dialog.closeAll()
      , () => this.message.open('Error', null, {
        duration: 2000,
      })
      , () => this.message.open('Articles family created successfully!', null, {
        duration: 2000,
      })
    );


  }

  isInvalid(): boolean {
    return this.checkEmpty(this.newArticles.reference) ||
      this.checkEmpty(this.newArticles.description) ||
      this.checkEmpty(this.newArticles.provider) ||
      this.checkEmpty(this.newArticles.sizeType) ||
      this.checkEmpty(this.newArticles.fromSize) ||
      this.checkEmpty(this.newArticles.toSize);
  }

  checkEmpty(attr: string): boolean {
    return attr == null ||
      attr === '';
  }
}


