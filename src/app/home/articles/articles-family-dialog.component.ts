import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatSnackBar} from '@angular/material';
import {Provider} from '../shared/provider.model';
import {ArticleFamily} from './articles-family-dialog.model';
import {ProviderService} from '../shared/provider.service';
import {SizeType} from './size/size-type.model';
import {Size} from './size/size.model';
import {SizeService} from './size/size.service';
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
  sizeInternational: Size[];
  sizeNumber: Size[];
  type: SizeType[];

  constructor(@Inject(MAT_DIALOG_DATA) dataDialog: any, private providerService: ProviderService, private sizeService: SizeService,
              private message: MatSnackBar, private dialog: MatDialog, private articleSize: ArticleService) {
    this.sizeService.readAll().subscribe(
      data => this.type = data
    );
    this.providerService.readAll().subscribe(
      data => this.providers = data
    );
    this.sizeService.findById('1').subscribe(
      data => this.sizeInternational = data
    );
    this.sizeService.findById('2').subscribe(
      data => this.sizeNumber = data
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


