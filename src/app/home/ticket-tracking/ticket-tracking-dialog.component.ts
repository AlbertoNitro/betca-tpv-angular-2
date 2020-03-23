import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {Ticket} from '../shared/ticket.model';

@Component({
  templateUrl: 'ticket-tracking-dialog.component.html',
  styleUrls: ['ticket-tracking-dialog.component.css']
})

export class TicketTrackingDialogComponent {

  ticket: Ticket = {id: null, reference: null};

  constructor(@Inject(MAT_DIALOG_DATA) data: any) {
    this.ticket = data.obj;
  }
}
