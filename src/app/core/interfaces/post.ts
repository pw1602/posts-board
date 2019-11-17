import { Comment } from '@core/interfaces/comment';
import { User } from './user';

export interface Post {
  id: number;
  user_id: number;
  title: string;
  body: string;
  comments: Comment[];
  user?: User;
}
