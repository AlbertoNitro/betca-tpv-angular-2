import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {Provider} from '../shared/provider.model';
import {ArticleFamily} from './articles-family-dialog.model';
import {ProviderService} from '../shared/provider.service';
import {SizeType} from './size/size-type.model';
import {Size} from './size/size.model';
import {SizeService} from './size/size.service';


@Component({
  templateUrl: 'articles-family-dialog.component.html',
  styleUrls: ['articles-family-dialog.component.css']
})

export class ArticlesFamilyDialogComponent {

  newArticles: ArticleFamily = {
    description: null,
    provider: null,
    type: null,
    fromSize: null,
    toSize: null,
    increment: 0
  };
  providers: Provider[];
  sizeInternational: Size[];
  sizeNumber: Size[];
  type: SizeType[];
  constructor(@Inject(MAT_DIALOG_DATA) dataDialog: any, private providerService: ProviderService, private sizeService: SizeService) {
    this.providerService.readAll().subscribe(
      data => this.providers = data
    );
    this.sizeService.readAllInternational().subscribe(
      data => this.sizeInternational = data
    );
    this.sizeService.readAllNumber().subscribe(
      data => this.sizeNumber = data
    );
    this.sizeService.readAll().subscribe(
      data => this.type = data
    );
  }
}

