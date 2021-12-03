import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormValue} from "../components/email-recipients/types";

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  url = 'http://localhost:3000';

  constructor(private http: HttpClient) {
  }

  sendEmail(emailForm: FormValue) {
    return this.http.post<FormValue>(`${this.url}/api/email`, emailForm)
      .subscribe(() => {
      });
  }
}
