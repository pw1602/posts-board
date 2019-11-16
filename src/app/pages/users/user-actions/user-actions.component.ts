import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

import { User } from '@core/interfaces/user';
import { DataService } from '@shared/services/data.service';

@Component({
  selector: 'app-user-actions',
  templateUrl: './user-actions.component.html',
  styleUrls: ['./user-actions.component.scss'],
  providers: [ConfirmationService]
})
export class UserActionsComponent implements OnInit {
  @Input() user: User;
  @Output() userDelete: EventEmitter<User> = new EventEmitter();
  @Output() userChange: EventEmitter<User> = new EventEmitter();

  visibleDialog = false;

  constructor(
    private confirmationService: ConfirmationService,
    private dataService: DataService,
    private messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  delete(): void {
    this.confirmationService.confirm({
      message: `Are you sure that you want to delete user ${this.user.first_name} ${this.user.last_name}?`,
      accept: () => {
        this.dataService.deleteUser(this.user.id)
        .subscribe(res => {
          if (res._meta.code === 204) {
            this.userDelete.emit(this.user);
            this.messageService.add({
              severity: 'success',
              summary: 'Deleting User',
              detail: `User ${this.user.first_name} ${this.user.last_name} has been deleted.`
            });
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Deleting User',
              detail: `User ${this.user.first_name} ${this.user.last_name} cannot be deleted.`
            });
          }
        });
      }
    });
  }

  changeUser(user: User): void {
    this.userChange.emit(user);
  }

  view(): void {
    this.router.navigate([`/users/${this.user.first_name} ${this.user.last_name}`]);
  }
}
