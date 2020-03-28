import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {Quarter} from './quarter.model';
import {FormControl, Validators} from '@angular/forms';
import {VAT} from './vat.model';

@Component({
  selector: 'app-vat-management',
  styleUrls: ['vat-management.component.css'],
  templateUrl: 'vat-management.component.html'
})
export class VatManagementComponent {
  selectedValue: string;
  displayedColumns: string[] = ['type', 'taxableAmount', 'totalAmount'];
  dataSource: VAT[] = [
    {type: 'General', taxableAmount: 21, totalAmount: 500},
    {type: 'Reduced', taxableAmount: 10, totalAmount: 300},
    {type: 'Super-Reduced', taxableAmount: 4, totalAmount: 100},
  ];
  quarterControl = new FormControl('', Validators.required);
  quarters: Quarter[] = [
    Quarter.Q1,
    Quarter.Q2,
    Quarter.Q3,
    Quarter.Q4
  ];

  constructor(private router: Router) {
  }
}
