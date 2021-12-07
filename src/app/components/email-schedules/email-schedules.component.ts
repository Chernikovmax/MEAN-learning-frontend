import {Component, EventEmitter, Input, Output} from '@angular/core';
import {EmailScheduleValue} from "../email-recipients/types";

@Component({
  selector: 'email-schedules',
  templateUrl: './email-schedules.component.html',
  styleUrls: ['./email-schedules.component.scss']
})
export class EmailSchedulesComponent {
  @Input() schedules: EmailScheduleValue[] = [];
  @Output() scheduleDelete = new EventEmitter<EmailScheduleValue>();

  constructor() {
  }

  deleteSchedule(schedule: EmailScheduleValue) {
    this.scheduleDelete.emit(schedule);
  }
}
