import {Component, OnInit} from '@angular/core';
import {PostsService} from "../../services/posts.service";

@Component({
  selector: 'app-post-creation',
  templateUrl: './post-creation.component.html',
  styleUrls: ['./post-creation.component.scss']
})
export class PostCreationComponent implements OnInit {

  constructor(private postsService: PostsService) {
  }

  get isEditMode(): boolean {
    return !!this.postsService.editablePost;
  }

  get title(): string {
    return this.postsService.postTitle;
  }

  set title(text: string) {
    this.postsService.postTitle = text;
  }

  get content(): string {
    return this.postsService.postContent;
  }

  set content(text: string) {
    this.postsService.postContent = text;
  }

  ngOnInit(): void {
  }

  handlePost() {
    if (this.postsService.editablePost) {
      this.postsService.editPost();
    } else {
      this.postsService.addPost({title: this.title, content: this.content});
    }
    this.title = '';
    this.content = '';
  }
}
