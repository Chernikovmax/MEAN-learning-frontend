import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ReplaySubject} from "rxjs";
import {AppPost, Post} from "../types";

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  postTitle = '';
  postContent = ''

  url = 'http://localhost:3000';
  postsLoaded = new ReplaySubject<Post[]>(1);
  posts: Post[] = [];
  editablePost: Post | null = null;

  constructor(private http: HttpClient) {
    this.getPosts();
  }

  getPosts() {
    return this.http.get<{ message: string; posts: Post[] }>(`${this.url}/api/posts`)
      .subscribe((resp) => {
          this.posts = resp.posts;
          this.postsLoaded.next(this.posts);
        }
      );
  }

  addPost(post: AppPost) {
    return this.http.post<{ message: string; id: number }>(`${this.url}/api/posts`, post)
      .subscribe(({id}) => {
        (post as Post).id = id;
        this.posts.push(post as Post);
        this.sendPosts();
      });
  }

  sendPosts() {
    this.postsLoaded.next(this.posts);
  }

  deletePost(postId: number) {
    return this.http.delete<{ message: string }>(`${this.url}/api/posts`, {body: {postId}})
      .subscribe(() => {
        this.posts = this.posts.filter(p => p.id !== postId);
        this.sendPosts();
      });
  }

  editPost() {
    const data = {title: this.postTitle, content: this.postContent, id: this.editablePost?.id};
    return this.http.patch<{ message: string }>(`${this.url}/api/posts`, data)
      .subscribe(() => {
        Object.assign(this.editablePost, data);
        this.editModeOff();
      });
  }

  editModeOn(post: Post) {
    this.postTitle = post.title;
    this.postContent = post.content;
    this.editablePost = post;
  }

  editModeOff() {
    this.postTitle = '';
    this.postContent = '';
    this.editablePost = null;
  }
}
