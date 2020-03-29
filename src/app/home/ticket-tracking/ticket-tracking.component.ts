import {Component, OnInit} from '@angular/core';
import {TicketService} from '../shared/ticket.service';
import {Ticket} from '../shared/ticket.model';
import {MatDialog} from '@angular/material';
import {TicketTrackingDialogComponent} from './ticket-tracking-dialog.component';

@Component({
  selector: 'app-tickets',
  templateUrl: './ticket-tracking.component.html',
  styleUrls: ['./ticket-tracking.component.css']
})
export class TicketTrackingComponent implements OnInit {

  title = 'Ticket Tracking';
  columns = ['reference'];
  ticket: Ticket;

  constructor(private ticketService: TicketService, private dialog: MatDialog) {
    this.ticket = {reference: null};
  }

  ngOnInit() {
  }

  search() {
    if (this.ticket !== null && this.ticket.reference !== null) {
      this.ticketService.readOne(this.ticket.reference).subscribe(
        t => {
          if (t != null && t.id != null) {
            this.ticket = t;
            this.dialog.open(TicketTrackingDialogComponent,
              {
                data: {obj: this.ticket}
              });
          } else {
            this.ticket = {reference: null};
          }
        }
      );
    }
  }

  resetSearch() {
    this.ticket = {reference: null};
  }
}
