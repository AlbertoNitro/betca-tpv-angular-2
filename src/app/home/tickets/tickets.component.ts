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
  columns = ['id', 'reference'];
  data: Ticket[];

  constructor(private ticketService: TicketService) {
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
    // TODO
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

  resetSearch() {
    this.ticket = {reference: null};
    this.ticketService.readAll().subscribe(
      data => this.data = data
    );
  }
}
