import { Comments } from './comments.model';
import { UserDto } from './user.model';

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface DetailsPost {
  post: Post;
  comments: Comments[];
  user: UserDto;
}
