import {Component, OnInit} from '@angular/core';
import {Tag} from '../shared/tag.model';
import {MatDialog} from '@angular/material';
import {TagService} from '../shared/tag.service';
import {TagCreateDialogComponent} from './tag-create-dialog/tag-create-dialog.component';
import {TagReadDialogComponent} from './tag-read-dialog/tag-read-dialog.component';
import {TagEditDialogComponent} from './tag-edit-dialog/tag-edit-dialog.component';
import {CancelYesDialogComponent} from '../../core/cancel-yes-dialog.component';
import {take} from 'rxjs/operators';

@Component({
  templateUrl: 'tags.component.html'
})
export class TagsComponent implements OnInit {

  public tag: Tag;
  public title: string;
  public columns: Array<string>;
  public dataSource: Tag[];

  constructor(private dialog: MatDialog, private tagService: TagService) {
    this.tag = {description: null};
    this.dataSource = null;
  }
  ngOnInit() {
    this.title = 'Tags Management';
    this.columns = ['description'];
  }

  public show(): void {
    this.tagService.readAll().subscribe(
      data => {this.dataSource = data; });
  }

  public create(): void {
    this.dialog.open(TagCreateDialogComponent)
      .afterClosed().pipe(take(1)).subscribe(
      () => {
        this.show();
      });
  }
  public read(tag: Tag): void {
    this.dialog.open(TagReadDialogComponent, {data: {obj: tag}});
  }
  public update(tag: Tag): void {
    this.dialog.open(TagEditDialogComponent,
      {data: {obj: tag}}).afterClosed().subscribe(
        () => {
          this.show();
        });
  }
  public delete(tag: Tag): void {
    this.dialog.open(CancelYesDialogComponent).afterClosed().pipe(take(1)).subscribe((shouldDelete: boolean) => {
      if (shouldDelete) {
        this.tagService.delete(tag).subscribe(() => this.show());
      }
    }, (error) => console.log(error), () => {
      this.dataSource = this.dataSource.filter(o => o.id !== tag.id);
    });
  }
}
