export interface AppPost {
  title: string;
  content: string;
}

export interface EditPostData {
  title: string;
  content: string;
}

export interface Post extends AppPost {
   id: number;
}
