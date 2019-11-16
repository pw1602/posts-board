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
  visibleDialog = false;
  currentPage = 0;

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

  getUsers(page?: number): void {
    this.loading = true;
    this.dataService.getAllUsers(page).subscribe(data => {
      this.users = data.result;
      this.totalRecords = data._meta.totalCount;
      this.perPage = data._meta.perPage;
      this.currentPage = data._meta.currentPage;
      this.loading = false;
    });
  }

  deleteUser(user: User): void {
    const found = this.users.findIndex(val => val.id === user.id);
    if (found) {
      this.users.splice(found, 1);
    }
  }
}
