import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {EmailScheduleBDValue, EmailScheduleValue, FormValue} from "../components/email-recipients/types";
import {emailSchedulePath} from './constants';
import {map} from "rxjs/operators";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  url = 'http://localhost:3000';

  constructor(private http: HttpClient) {
  }

  postEmailSchedule(emailForm: FormValue) {
    return this.http.post<FormValue>(this.url + emailSchedulePath, emailForm);
  }

  getEmailSchedules(): Observable<EmailScheduleValue[]> {
    return this.http.get<{ emailSchedules: EmailScheduleBDValue[] }>(this.url + emailSchedulePath)
      .pipe(map(({emailSchedules}) => {
        return emailSchedules.map(es => ({
          id: es._id,
          recipients: es.recipients,
          theme: es.theme,
          content: es.content,
        }));
      }));
  }

  editEmailSchedule(emailSchedule: FormValue) {
    return this.http.patch<FormValue>(this.url + emailSchedulePath, emailSchedule)
      .subscribe(() => {
      });
  }

  deleteEmailSchedule(id: string) {
    return this.http.delete<FormValue>(this.url + emailSchedulePath + `/${id}`)
      .subscribe(() => {
      });
  }
}
