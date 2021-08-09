import {Component, OnInit} from '@angular/core';
import {PostsService} from "./services/posts.service";
import {Post} from "./types";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'frontend';
  posts: Post[] = [];

  constructor(private postsService: PostsService) {
  }

  ngOnInit() {
    this.postsService.postsLoaded.subscribe((posts) => {
      this.posts = posts;
    });
  }
}
