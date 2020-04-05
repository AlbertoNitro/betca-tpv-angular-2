import {Component, OnInit} from '@angular/core';
import {Ticket} from '../shared/ticket.model';
import {TicketService} from '../shared/ticket.service';
import { TicketSearch } from './ticket-search.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})

export class TicketsComponent implements OnInit {

  ticket: Ticket;

  title = 'Tickets management';
  columns = ['id', 'reference'];
  data: Ticket[];

  ticketSearch: TicketSearch = {};

  articleIdToSearchBy: string;
  orderIdToSearchBy: string;
  tagToeSearchBy: string;

  constructor(private router: Router, private ticketService: TicketService) {
    this.ticket = {id: null, reference: null};
    this.data = null;
  }

  print(ticket: Ticket) {
    this.ticket.id = ticket.id;
    this.ticketService.getPdf(this.ticket.id).subscribe(
      () => {}
    );
  }

  update(ticket: Ticket) {
    this.ticketService.changeMessage(ticket.id);
    this.router.navigate(['home', 'cashier-opened']);
  }

  ngOnInit() {
    this.ticketService.readAll().subscribe(
      data => this.data = data
    );
  }

  search(id: string) {
    this.ticketService.getTicket(id).subscribe(
      data => {
        this.data = [];
        if (data.shoppingList != null) {
          this.data[0] = data;
        }
      }
    );
  }

  advancedSearch() {
    this.ticketService.advancedSearch(this.ticketSearch).subscribe(
      tickets => {
        this.data = tickets;
      }
    );
  }

  searchNotCommittedByArticle() {
    this.ticketService.getNotCommittedTicketsByArticleId(this.articleIdToSearchBy).subscribe(
      tickets => {
        this.data = tickets;
      }
    );
  }

  searchNotCommittedByOrder() {
    this.ticketService.getNotCommittedTicketsByOrderId(this.orderIdToSearchBy).subscribe(
      tickets => {
        this.data = tickets;
      }
    );
  }

  searchNotCommittedByTag() {
    this.ticketService.getNotCommittedTicketsByTag(this.tagToeSearchBy).subscribe(
      tickets => {
        this.data = tickets;
      }
    );
  }

  resetSearch() {
    this.ticket = {reference: null};
    this.ticketSearch = {
      mobile: null,
      date: null,
      amount: null
    };
    this.articleIdToSearchBy = null;
    this.orderIdToSearchBy = null;
    this.tagToeSearchBy = null;
    this.ticketService.readAll().subscribe(
      data => this.data = data
    );
  }
}
