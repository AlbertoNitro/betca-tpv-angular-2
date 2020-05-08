import { Component} from '@angular/core';
import {Tag} from '../cashier-opened/advanced-search/tag.model';
import {MatDialog} from '@angular/material';
import {TagService} from '../cashier-opened/advanced-search/tag.service';
import {TagCreateDialogComponent} from './tag-create-dialog/tag-create-dialog.component';
import {TagReadDialogComponent} from './tag-read-dialog/tag-read-dialog.component';
import {TagEditDialogComponent} from './tag-edit-dialog/tag-edit-dialog.component';

@Component({
  templateUrl: 'tags.component.html'
})
export class TagsComponent {

  tag: Tag;
  title = 'Tags management';
  columns = ['description'];
  tags: Tag[];
  constructor(private dialog: MatDialog, private tagService: TagService) {
    this.tag = {description: null};
    this.tags = null;
  }
  show() {
    this.tagService.readAll().subscribe(
      data => this.tags = data
    );
  }

  create() {
    this.dialog.open(TagCreateDialogComponent)
      .afterClosed().subscribe(
      () => {
        this.show();
      });
  }
  read(tag: Tag) {
    this.dialog.open(TagReadDialogComponent,
      {
        data: {
          obj: tag
        }
      }).afterClosed().subscribe(
      () => {
        this.show();
      }
    );
  }
  update(tag: Tag) {
    this.dialog.open(TagEditDialogComponent,
      {
        data: {
          obj: tag
        }
      }).afterClosed().subscribe(
      () => {
        this.show();
      }
    );
  }
}
