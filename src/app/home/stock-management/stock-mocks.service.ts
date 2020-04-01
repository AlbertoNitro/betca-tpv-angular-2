import {Injectable} from '@angular/core';
import {Observable, from} from 'rxjs';
import {Article} from '../shared/article.model';

@Injectable({
  providedIn: 'root'
})
export class StockMocksService {
  articles: Article[] = [
    {code: '8400000000017', description: 'Laptop Hp', soldUnits: 102, stock: 10},
    {code: '8400000000016', description: 'Black Jeans', soldUnits: 41, stock: -9},
    {code: '8400000000014', description: 'Apples', soldUnits: 2, stock: 23}
  ];

  constructor() {
  }

  getAll(): Observable<any> {
    return from(this.articles);
  }
}
