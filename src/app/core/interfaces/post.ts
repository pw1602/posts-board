import { Comment } from '@core/interfaces/comment';

export interface Post {
  id: number;
  user_id: number;
  title: string;
  body: string;
  comments: Comment[];
}
