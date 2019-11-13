import { Component, OnInit, Input } from '@angular/core';

import { User } from '@/core/interfaces/user';

@Component({
  selector: 'app-user-actions',
  templateUrl: './user-actions.component.html',
  styleUrls: ['./user-actions.component.scss']
})
export class UserActionsComponent implements OnInit {
  buttons = [
    { label: 'View', icon: 'pi pi-user', tooltip: 'View user' },
    { label: 'Edit', icon: 'pi pi-user-edit', tooltip: 'Edit user' },
    { label: 'Delete', icon: 'pi pi-user-minus', tooltip: 'Delete user' },
  ];

  @Input() user: User;

  constructor() { }

  ngOnInit() {
  }

}
