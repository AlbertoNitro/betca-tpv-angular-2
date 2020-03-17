import {Component, OnInit} from '@angular/core';
import {MatDialog, MatSnackBar} from '@angular/material';
import {Article} from 'src/app/home/shared/article.model';
import {ArticleService} from 'src/app/home/shared/article.service';
import {Offer} from 'src/app/home/shared/offer.model';
import {OfferService} from 'src/app/home/shared/offer.service';

@Component({
  templateUrl: './offer-creation-dialog.component.html',
  styleUrls: ['./offer-creation-dialog.component.css']
})
export class OfferCreationDialogComponent implements OnInit {

  public offer: Offer = {id: null, expirationDate: new Date(), registrationDate: new Date(), articleList: []};
  public articles: Array<Article> = [];
  public submitted: boolean;

  constructor(private dialog: MatDialog, private offerService: OfferService,
              private message: MatSnackBar, private articleService: ArticleService) {
  }

  ngOnInit() {
    // this.articleService.readAll().subscribe((articles: Array<Article>) => {
    //   this.articles = articles;
    // });
    this.articles.push({code: '1', description: 'pera', retailPrice: 5});
    this.articles.push({code: '2', description: 'tomate', retailPrice: 3});
    this.articles.push({code: '3', description: 'limón', retailPrice: 4});
    this.articles.push({code: '4', description: 'piña', retailPrice: 1});
    this.articles.push({code: '5', description: 'manzana', retailPrice: 2});
    this.submitted = false;
  }

  public create() {
    this.offerService.create(this.offer).subscribe(() => {
      this.dialog.closeAll();
    }, (error: any) => {
      console.error(error);
      this.message.open('Ups, something went wrong.', null, {duration: 2000});
    }, () => {
      this.message.open('Offer created successfully.', null, {duration: 2000});
    });
  }

  public addArticleToOffer(article: Article): void {
    this.offer.articleList.push(article);
    this.articles = this.articles.filter(a => a.code !== article.code);
  }

  public removeArticleFromOffer(article: Article): void {
    this.articles.push(article);
    this.offer.articleList = this.offer.articleList.filter(a => a.code !== article.code);
  }
}
