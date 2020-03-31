import {Component, OnInit} from '@angular/core';
import {TicketService} from '../shared/ticket.service';
import {Ticket} from '../shared/ticket.model';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-tickets',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.css']
})
export class TrackingComponent implements OnInit {

  title = 'Ticket Tracking';
  ticket: Ticket;

  constructor(private ticketService: TicketService, private route: ActivatedRoute) {
    this.ticket = {reference: this.route.snapshot.paramMap.get('reference'), shoppingList: null};
    this.ticketService.readOne(this.ticket.reference).subscribe(
      t => {
        this.ticket = t;
      }
    );
  }

  ngOnInit() {
  }

  everyArticleIsCommitted(ticket) {
    this.ticketService.everyArticleIsCommitted(ticket);
  }

  someArticleIsNotCommited(ticket) {
    this.ticketService.someArticleIsNotCommited(ticket);
  }
}
