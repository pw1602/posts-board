import { Component, OnInit } from '@angular/core';

import { Post } from '@/core/interfaces/post';
import { DataService } from '@/shared/services/data.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  posts: Post[];
  totalRecords = 100;
  perPage = 20;
  currentPage = 0;
  commentsPage = 1;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.getPosts();
  }

  getComments(event: boolean, post: Post): void {
    if (event) {
        this.dataService.getPostComments(post.id, this.commentsPage).subscribe(res => post.comments = res.result);
    }
  }

  paginate(event) {
    if (event.page + 1 === this.currentPage) {
      return;
    }

    this.getPosts(event.page + 1);
  }

  getPosts(page?: number): void {
    this.dataService.getAllPosts(page).subscribe(res => {
      this.posts = res.result;
      this.totalRecords = res._meta.totalCount;
      this.perPage = res._meta.perPage;
      this.currentPage = res._meta.currentPage;
    });
  }

  changeCommentsPage(event: number, post: Post): void {
    this.commentsPage = event;
    this.getComments(true, post);
  }
}
