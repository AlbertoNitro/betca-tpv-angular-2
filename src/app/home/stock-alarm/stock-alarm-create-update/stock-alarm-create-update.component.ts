import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material';
import {ArticleService} from '../../shared/article.service';
import {StockAlarmService} from '../stock-alarm.service';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Article} from '../../shared/article.model';
import {Provider} from '../../shared/provider.model';
import {StockAlarm} from '../stock-alarm.model';


@Component({
  selector: 'app-stock-alarm-create-dialog',
  templateUrl: './stock-alarm-create-update.component.html',
  styleUrls: ['./stock-alarm-create-update.component.css']
})
export class StockAlarmCreateUpdateComponent implements OnInit {

  articles: Article[];
  stockAlarm: StockAlarm;
  stockAlarmFrom: FormGroup;
  dialogMode: string;


  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog, private fb: FormBuilder,
              public stockAlarmService: StockAlarmService, public articleService: ArticleService) {
    this.stockAlarm = data.stockAlarm;
    this.dialogMode = data.dialogMode;
  }
  ngOnInit() {
    this.stockAlarmFrom = this.fb.group({
      description: [this.stockAlarm.description, [Validators.required]],
      provider: [this.stockAlarm.provider, [Validators.min(0)]],
      warning: [this.stockAlarm.warning, [Validators.min(0)]],
      critical: [this.stockAlarm.critical],
      stockAlarmArticle: this.fb.array([
        this.fb.group({
          articleId: [null, [Validators.required]],
          warning: [null, [Validators.required, Validators.min(0)]],
          critical: [null, [Validators.required, Validators.min(0)]]
        })
      ])
      });
  }

  createOrUpdate() {
    this.data.dialogMode === 'create'
      ? this.create()
      : this.update();
  }

  create() {
    console.log(this.stockAlarmFrom.value);
    this.stockAlarmService.create(this.stockAlarmFrom.value).subscribe(
      result => {
        console.log(result);
      }
    );
  }

  update() {
    this.stockAlarmService.update(this.stockAlarmFrom.value).subscribe(
      result => {
        console.log(result);
      }
    );
  }

  get stockAlarmArticles() {
    return this.stockAlarmFrom.get('stockAlarmArticle') as FormArray;
  }

  addStockAlarmArticle() {
    this.stockAlarmArticles.push(
      this.fb.group({
      articleId: [''],
      warning: [''],
      critical: ['']
    }));
  }

  removeStockAlarmArticle(stockAlarmArticle: number) {
    this.stockAlarmArticles.removeAt(stockAlarmArticle);
  }

  getProvider(provider: Provider) {
     this.stockAlarmFrom.controls.provider.setValue(provider.id);
     this.getArticlesByProvider();
  }

  getArticlesByProvider() {
    this.articleService.readAll().subscribe(
      result => {
        this.articles = result.filter(value => value.provider ===  this.stockAlarmFrom.controls.provider.value);
      });
  }
}
