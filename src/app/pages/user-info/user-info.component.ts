import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';

import { User } from '@core/interfaces/user';
import { DataService } from '@/shared/services/data.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  @Input() userId: number;

  user: User;
  totalRecords = 100;
  perPage = 20;
  currentPage = 0;
  visibleDialog: boolean;

  constructor(
    private route: ActivatedRoute,
    private messageService: MessageService,
    private router: Router,
    private dataService: DataService
    ) { }

  ngOnInit() {
    this.route.data.subscribe((data: { user: User }) => {
      if (!data.user || !data) {
        this.messageService.add({ severity: 'error', summary: 'User search', detail: `There is no user with that name!` });
        this.router.navigate(['/users']);
        return;
      }

      this.user = data.user;
      this.getPosts();
    });
  }

  paginate(event) {
    if (event.page + 1 === this.currentPage) {
      return;
    }

    this.getPosts(event.page + 1);
  }

  getPosts(page?: number): void {
    this.dataService.getUserPosts(this.user.id, page).subscribe(res => {
      this.user.posts = res.result;
      this.totalRecords = res._meta.totalCount;
      this.perPage = res._meta.perPage;
      this.currentPage = res._meta.currentPage;
    });
  }
}
