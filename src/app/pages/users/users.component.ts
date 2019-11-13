import { Component, OnInit } from '@angular/core';

import { DataService } from '@shared/services/data.service';
import { User } from '@/core/interfaces/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  columns: string[] = [ 'First Name', 'Last Name', 'Email', 'Actions'];
  users: User[];
  loading: boolean;
  totalRecords = 100;
  perPage = 20;

  private currentPage = 0;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.loading = true;
    this.getUsers();
  }

  paginate(event) {
    if (event.page + 1 === this.currentPage) {
      return;
    }

    this.getUsers(event.page + 1);
  }

  private getUsers(page?: number): void {
    this.loading = true;
    this.dataService.getAllUsers(page).subscribe((data: any) => {
      this.users = data.result;
      this.totalRecords = data._meta.totalCount;
      this.perPage = data._meta.perPage;
      this.currentPage = data._meta.currentPage;
      this.loading = false;
    });
  }
}
