import {Component, OnInit} from '@angular/core';
import {Ticket} from '../shared/ticket.model';
import {TicketService} from '../shared/ticket.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})

export class TicketsComponent implements OnInit {

  ticket: Ticket;

  title = 'Tickets management';
  columns = ['ID', 'reference'];
  data: Ticket[];

  constructor(private ticketService: TicketService) {
    this.ticket = {id: null, reference: null};
    this.data = null;
  }

  print(ticket: Ticket) {
    // TODO
  }

  update(ticket: Ticket) {
    // TODO
  }

  ngOnInit() {
    this.ticketService.readAll().subscribe(
      data => this.data = data
    );
  }

  search() {
    // TODO
  }

  resetSearch() {
    this.ticket = {reference: null};
  }
}
