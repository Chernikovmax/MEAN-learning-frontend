export interface AppPost {
  title: string;
  content: string;
}

export interface Post extends AppPost {
   id: string;
}

export interface BDPost extends AppPost {
  _id: string;
}
