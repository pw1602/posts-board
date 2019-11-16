import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

import { DataService } from '@/shared/services/data.service';
import { User } from '@/core/interfaces/user';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  @Input() visible: boolean;
  @Input() user: User;
  @Input() submitClose: boolean;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter();
  @Output() addedUser: EventEmitter<User> = new EventEmitter();
  @Output() userChange: EventEmitter<User> = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private messageService: MessageService
  ) { }

  userForm = this.formBuilder.group({
    first_name: ['', Validators.compose([Validators.required])],
    last_name: ['', Validators.compose([Validators.required])],
    email: ['', Validators.compose([Validators.required, Validators.email])],
    phone: ['', Validators.compose([Validators.required, Validators.minLength(9)])],
    address: ['', Validators.compose([Validators.required])]
  });

  ngOnInit() {
    this.fillForm();
  }

  changeVisible(): void {
    this.visible = false;
    this.visibleChange.emit(this.visible);
    this.userForm.reset();
  }

  get f() {
    return this.userForm.controls;
  }

  submit(): void {
    if (this.userForm.invalid) {
      return;
    }

    const userData = this.userForm.value;
    userData.gender = Math.random() ? 'male' : 'female';
    userData.dob = this.randomDate(new Date(1950, 1, 1), new Date(2005, 12, 31));

    if (!this.user) {
      this.createUser(userData);
    } else {
      userData.id = this.user.id;
      this.updateUser(userData);
    }
  }

  getHeader(): string {
    return this.user ? 'Edit User' : 'Add User';
  }

  private randomDate(start, end): string {
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return `${date.getFullYear()}.${date.getMonth()}.${date.getDay()}`;
  }

  private fillForm(): void {
    if (!this.user) { return; }

    this.userForm.patchValue({
      first_name: this.user.first_name,
      last_name: this.user.last_name,
      email: this.user.email,
      phone: this.user.phone,
      dob: this.user.dob,
      gender: this.user.gender,
      address: this.user.address
    });
  }

  private createUser(user: User): void {
    this.dataService.createUser(user)
    .subscribe(res => {
      if (res._meta.code === 200) {
        this.addedUser.emit(this.user);
        this.userForm.reset();
        this.messageService.add({
          severity: 'success',
          summary: 'Add User',
          detail: `User ${user.first_name} ${user.last_name} has been added.`
        });

        if (this.submitClose) {
          this.changeVisible();
        }
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Add User',
          detail: `User ${user.first_name} ${user.last_name} cannot be added: ${res.result.map(v => v.message).join(', ')}`
        });
      }
    });
  }

  private updateUser(user: User): void {
    this.dataService.updateUser(user.id, user)
    .subscribe(res => {
      if (res._meta.code === 200) {
        this.userChange.emit(user);
        this.userForm.reset();
        this.messageService.add({
          severity: 'success',
          summary: 'Modify User',
          detail: `User ${user.first_name} ${user.last_name} has been modified.`
        });

        if (this.submitClose) {
          this.changeVisible();
        }
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Modify User',
          detail: `User ${user.first_name} ${user.last_name} cannot be added: ${res.result.map(v => v.message).join(', ')}`
        });
      }
    });
  }
}
