import {Component, Inject} from '@angular/core';
import {Tag} from '../../cashier-opened/advanced-search/tag.model';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material';
import {TagService} from '../../cashier-opened/advanced-search/tag.service';


@Component({
  selector: 'app-tag-read-dialog',
  templateUrl: './tag-read-dialog.component.html',
  styles: []
})
export class TagReadDialogComponent  {
  public tag: Tag;

  constructor(private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, private tagService: TagService) {
    this.tag = this.data.tag_object;
  }

  showTag() {
    this.tagService.print(this.tag).subscribe(() => {
      },
      () => this.dialog.closeAll(),
      () => this.dialog.closeAll());
  }


}
