import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../../types";
import {PostsService} from "../../services/posts.service";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  @Input() posts: Post[] = [];

  constructor(private postsService: PostsService) {
  }

  ngOnInit(): void {
  }

  editPost(post: Post) {
    this.postsService.editModeOn(post);
  }

  deletePost(id: string) {
    this.postsService.deletePost(id);
  }

  trackByHandler(idx: number, item: Post) {
    return item.id;
  }
}
