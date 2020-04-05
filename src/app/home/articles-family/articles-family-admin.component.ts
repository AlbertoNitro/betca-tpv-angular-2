import {Component} from '@angular/core';
import {ArticlesFamily} from '../shared/articles-family.model';
import {MatDialog, MatSnackBar} from '@angular/material';
import {ArticlesFamilyService} from '../shared/article-family.service';
import {CancelYesDialogComponent} from '../../core/cancel-yes-dialog.component';

@Component({
  templateUrl: 'articles-family-admin.component.html'
})

export class ArticlesFamilyAdminComponent {
  articleFamily: ArticlesFamily;
  title = 'Article Family Management';
  columns = ['id', 'reference', 'description', 'familyType'];
  data: ArticlesFamily[];
  isEdit: boolean;

  constructor(private message: MatSnackBar,private dialog: MatDialog, private articleFamilyService: ArticlesFamilyService) {
    this.articleFamily = { id: null, description: null, reference: null, familyType: null};
  }

  search() {
    if (this.articleFamily.reference == null && this.articleFamily.familyType == null) {
      this.articleFamilyService.readAll().subscribe(
        data => this.data = data
      );
    } else {
      this.articleFamilyService.search(this.articleFamily.reference, this.articleFamily.familyType).subscribe(
        data => this.data = data
      );
    }
  }

  resetSearch() {
    this.articleFamily = {description: null, reference: null, id: null, familyType: null};
  }

  delete(articleFamily: ArticlesFamily){
    this.dialog.open(CancelYesDialogComponent).afterClosed().subscribe(
      result => {
        if (result) {
          this.articleFamilyService.delete(articleFamily.id).subscribe(
            () => this.search()
            , () => this.message.open('Ups, something bad happened.', null, {
              duration: 2000,
            })
            , () => this.message.open('Articles Family deleted successfully', null, {
              duration: 2000,
            })
          );
        }
      }
    );
  }

}
