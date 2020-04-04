import {Component, OnInit} from '@angular/core';
import {InvoiceService} from '../shared/invoice/invoice.service';
import {Invoice} from '../shared/invoice/invoice.model';
import {InvoiceFilter} from '../shared/invoice/invoice-filters.model';


@Component({
  templateUrl: `invoices.component.html`
})
export class InvoicesComponent implements OnInit {

  constructor(private invoiceService: InvoiceService) {
    this.data = [];
    this.filter = {mobile: null, toDate: null, fromDate: null};
  }

  title = 'Invoices';
  columns = ['invoice', 'ticket', 'mobile'];
  data: Invoice[];
  filter: InvoiceFilter;
  fromCalendarDate: Date;
  toCalendarDate: Date;

  private convertDateToIsoString(date: Date): string {
    let isoDateString: string;
    let year: string;
    let month: string;
    let day: string;
    year = date.getFullYear().toString();
    day = date.getDate().toString();
    month = (date.getMonth() + 1).toString();
    isoDateString = year
      + '-' + (month.length === 1 ? '0' + month : month)
      + '-' + (day.length === 1 ? '0' + day : day);
    return isoDateString;
  }

  ngOnInit() {
    this.invoiceService.readAll().subscribe(
      data => this.data = data
    );
  }

  search() {
    this.filter.fromDate = (this.fromCalendarDate ? this.convertDateToIsoString(this.fromCalendarDate) : null);
    this.filter.toDate = (this.toCalendarDate ? this.convertDateToIsoString(this.toCalendarDate) : null);
    this.invoiceService.search(this.filter).subscribe(
      data => this.data = data
    );
  }

  resetSearch() {
    this.filter = {mobile: null, fromDate: null, toDate: null};
    this.fromCalendarDate = null;
    this.toCalendarDate = null;
    this.invoiceService.readAll().subscribe(
      data => this.data = data
    );
  }

  print(invoice: Invoice) {
    this.invoiceService.print(invoice.invoice).subscribe(
      () => {});
  }
}
