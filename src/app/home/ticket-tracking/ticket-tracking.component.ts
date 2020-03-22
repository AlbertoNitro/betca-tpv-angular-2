import {Component, OnInit} from '@angular/core';
import {TicketService} from '../shared/ticket.service';
import {Ticket} from '../shared/ticket.model';

@Component({
  selector: 'app-tickets',
  templateUrl: './ticket-tracking.component.html',
  styleUrls: ['./ticket-tracking.component.css']
})
export class TicketTrackingComponent implements OnInit {

  title = 'Ticket Tracking';
  columns = ['reference'];
  ticket: Ticket;

  constructor(private ticketService: TicketService) {
    this.ticket = { reference: null };
  }

  ngOnInit() {
  }

  search() {
    if (this.ticket !== null && this.ticket.reference !== null) {
      this.ticketService.readOne(this.ticket.reference).subscribe(
        t => this.ticket = t
      );
      // TO DO open status dialog
    }
  }

  resetSearch() {
    this.ticket = { reference: null};
  }
}
