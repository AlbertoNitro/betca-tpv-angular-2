import {Component} from '@angular/core';
import {StaffService} from './staff.service';
import {Staff} from './staff.model';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})

export class StaffComponent {
  staff: Staff;
  title = 'Staff Attendance';
  columns = ['mobile', 'year', 'month', 'day', 'workHours'];
  data: Staff[];


  constructor(private staffService: StaffService) {
    this.staff = {id: '', mobile: '', year: '', month: '', day: '', workHours: null, lastLoginTime: null};
    // this.staffService.readAll().subscribe(data => this.data = data);
    this.data = null;
  }

  search() {
    if ((this.staff.mobile === null || this.staff.mobile === '' || this.staff.mobile === 'null') &&
      (this.staff.year === null || this.staff.year === '' || this.staff.year === 'null') &&
      (this.staff.month === null || this.staff.month === '' || this.staff.month === 'null') &&
      (this.staff.day === null || this.staff.day === '' || this.staff.day === 'null')
    ) {
      this.staffService.readAll().subscribe(data => this.data = data);
    } else {
      if (this.staff.month === null || this.staff.month === '' || this.staff.month === 'null') {
        this.staffService.search(this.staff.mobile, this.staff.year, this.staff.month, this.staff.day)
          .subscribe(data => this.data = data);
      } else {
        this.staffService.search(this.staff.mobile, this.staff.year, Number(this.staff.month).toString(), this.staff.day)
          .subscribe(data => this.data = data);
      }
    }
  }

  resetSearch() {
    this.staff = {id: null, mobile: null, year: null, month: null, day: null, workHours: null, lastLoginTime: null};
  }


  create() {
    // TODO
  }

  read(user: Staff) {
    // TODO
  }

  update(user: Staff) {
    // TODO
  }

  delete(user: Staff) {
    // TODO
  }


}
