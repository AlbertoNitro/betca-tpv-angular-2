import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {Quarter} from '../shared/quarter.enum';
import {FormControl, Validators} from '@angular/forms';
import {VatManagementService} from '../shared/vat-management.service';
import {QuarterVatModel} from '../shared/quarter-vat.model';
import {log} from 'util';
import {TaxModel} from '../shared/tax.model';

@Component({
  selector: 'app-vat-management',
  styleUrls: ['vat-management.component.css'],
  templateUrl: 'vat-management.component.html'
})
export class VatManagementComponent {
  selectedValue: Quarter;
  displayedColumns: string[] = ['tax', 'percentageApplied', 'taxableAmount', 'vat'];
  data: QuarterVatModel;
  dataSource: TaxModel[];
  quarterControl = new FormControl('', Validators.required);
  quarters: Quarter[] = [
    Quarter.Q1,
    Quarter.Q2,
    Quarter.Q3,
    Quarter.Q4
  ];

  constructor(private router: Router, private vatManagementService: VatManagementService) {
  }

  public getVatData(): void {
    if (this.selectedValue !== undefined) {
      this.vatManagementService.read(this.selectedValue).subscribe(data => {
        this.data = data;
        this.dataSource = this.data.taxes;
        console.log(this.data);
      });
    }
  }
}
