import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ReplaySubject} from "rxjs";
import {AppPost, BDPost, Post} from "../types";
import {map} from "rxjs/operators";

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
    return this.http.get<{ message: string; data: BDPost[] }>(`${this.url}/api/posts`)
      .pipe(
        map(response => {
          return response.data.map((post) => ({title: post.title, content: post.content, id: post._id})) as Post[];
        })
      )
      .subscribe((posts: Post[]) => {
          this.posts = posts;
          this.postsLoaded.next(this.posts);
        }
      );
  }

  addPost(post: AppPost) {
    return this.http.post<{ message: string; id: string }>(`${this.url}/api/posts`, post)
      .subscribe(({id}) => {
        (post as Post).id = id;
        this.posts.push(post as Post);
        this.sendPosts();
      });
  }

  sendPosts() {
    this.postsLoaded.next(this.posts);
  }

  deletePost(postId: string) {
    return this.http.delete<{ message: string }>(`${this.url}/api/posts/${postId}`)
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
