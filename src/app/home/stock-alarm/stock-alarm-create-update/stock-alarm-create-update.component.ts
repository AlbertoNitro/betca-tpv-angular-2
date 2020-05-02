import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material';
import {ArticleService} from '../../shared/article.service';
import {StockAlarmService} from '../stock-alarm.service';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Article} from '../../shared/article.model';
import {Provider} from '../../shared/provider.model';
import {StockAlarmArticle, StockAlarm, StockAlarmCreate} from '../stock-alarm.model';


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
      description: [''],
      provider: [''],
      warning: [''],
      critical: [''],
      stockAlarmArticle: this.fb.array([
        this.fb.group({
          articleId: [''],
          warning: [''],
          critical: ['']
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

  // addArticle() {
  //   console.log(this.stockAlarmArticle);
  //   this.articleService.readOne(this.stockAlarmArticle.articleId).subscribe(
  //     result => {
  //       const repeat = this.dataSource.some(item => {
  //         if (item.articleId === result.code) {
  //           return true;
  //         }
  //       });
  //       if (repeat) {
  //         console.log('exist');
  //       } else {
  //         this.stockAlarmCreate.stockAlarmArticle.push(this.stockAlarmArticle);
  //         this.dataSource.push(this.stockAlarmArticle);
  //         this.dataSource = [...this.stockAlarmCreate.stockAlarmArticle];
  //         console.log(this.dataSource);
  //       }
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );
  // }

  // deleteStockAlarmArticle(stockAlarmArticle: StockAlarmArticle) {
  //   console.log(stockAlarmArticle);
  //   const indexArticle = this.dataSource.indexOf(stockAlarmArticle);
  //   console.log(indexArticle);
  //   this.dataSource = this.dataSource.slice(indexArticle, 1);
  //   console.log(this.dataSource);
  //   this.dataSource = [...this.stockAlarmCreate.stockAlarmArticle];
  //   console.log(this.dataSource);
  // }
  //
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
