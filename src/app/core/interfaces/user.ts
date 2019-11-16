import { Post } from '@core/interfaces/post';

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  phone: string;
  address: string;
  dob: string;
  posts: Post[];
}
