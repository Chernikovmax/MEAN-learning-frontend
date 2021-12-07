import {Component, OnInit} from '@angular/core';
import {PostsService} from "./services/posts.service";
import {Post} from "./types";
import {EmailScheduleValue, FormValue} from "./components/email-recipients/types";
import {EmailService} from "./services/email.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'frontend';
  posts: Post[] = [];
  emailSchedules: EmailScheduleValue[] = [];
  subscription = new Subscription();

  constructor(private postsService: PostsService, private emailService: EmailService) {
  }

  ngOnInit() {
    this.postsService.postsLoaded.subscribe((posts) => {
      this.posts = posts;
    });
    this.getEmailSchedules();
  }

  onFormSubmit(emailForm: FormValue) {
    this.subscription.add(
      this.emailService.postEmailSchedule(emailForm).subscribe(
        () => {
          this.getEmailSchedules();
        }
      )
    );
  }

  getEmailSchedules() {
    this.subscription.add(
      this.emailService.getEmailSchedules().subscribe(
        (emailSchedules) => {
          this.emailSchedules = emailSchedules;
        }
      ));
  }

  onScheduleDelete(emailSchedule: EmailScheduleValue) {
    this.emailService.deleteEmailSchedule(emailSchedule.id);
    this.emailSchedules = this.emailSchedules.filter(es => es.id !== emailSchedule.id);
  }
}
