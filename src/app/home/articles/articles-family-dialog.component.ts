import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';
import {Provider} from '../shared/provider.model';
import {ArticleFamily} from '../shared/articleFamily.model';
import {ArticleService} from '../shared/article.service';


@Component({
  templateUrl: 'articles-family-dialog.component.html'
})

export class ArticlesFamilyDialogComponent {

  newArticles: ArticleFamily = {
    description: null,
    provider: null,
    size: 0,
    fromSize: null,
    toSize: null,
    increment: 0
  };
  sizeInternationals = [
    { id: 1, name: 'XXS' },
    { id: 2, name: 'XS' },
    { id: 3, name: 'S' },
    { id: 4, name: 'M' },
    { id: 5, name: 'L' },
    { id: 6, name: 'XL' },
    { id: 7, name: 'XXL' },
    { id: 8, name: 'XXXL' },
    { id: 9, name: 'Special' }
  ];
  sizeNumbers  = [
    { id: 1, name: '0' },
    { id: 2, name: '10' },
    { id: 3, name: '20' },
    { id: 4, name: '30' },
    { id: 5, name: '40' },
    { id: 6, name: '50' },
    { id: 7, name: '60' },
    { id: 8, name: '70' },
    { id: 9, name: '80' }
  ];
  typeSize = [
    { id: 1, name: 'International' },
    { id: 2, name: 'Number' },
  ];
  constructor(@Inject(MAT_DIALOG_DATA) data: any, private dialog: MatDialog,
              private dialogRef: MatDialogRef<ArticlesFamilyDialogComponent>,
              private message: MatSnackBar, private articleService: ArticleService) {
  }

  getProvider(provider: Provider) {
    this.newArticles.provider = provider.id;
  }
}

