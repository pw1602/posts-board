import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

import { DataService } from '@/shared/services/data.service';
import { Post } from '@/core/interfaces/post';
import { User } from '@core/interfaces/user';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {
  @Input() visible: boolean;
  @Input() userId: number;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter();
  @Output() addedPost: EventEmitter<boolean> = new EventEmitter();

  users: User[];

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private messageService: MessageService
  ) { }

  postForm = this.formBuilder.group({
    title: ['', Validators.compose([Validators.required])],
    body: ['', Validators.compose([Validators.required])],
    user: ['', Validators.compose([Validators.required])]
  });

  ngOnInit() {
  }

  changeVisible(): void {
    this.visible = false;
    this.visibleChange.emit(this.visible);
    this.postForm.reset();
  }

  get f() {
    return this.postForm.controls;
  }

  submit(): void {
    if (this.postForm.invalid) {
      return;
    }

    const postData = this.postForm.value;
    postData.user_id = this.userId || postData.user.id;
    this.createPost(postData);
  }

  private createPost(post: Post): void {
    this.dataService.createPost(post)
    .subscribe(res => {
      if (res._meta.code === 200) {
        this.addedPost.emit(true);
        this.postForm.reset();
        this.messageService.add({
          severity: 'success',
          summary: 'Add Post',
          detail: 'Post has been added.'
        });
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Add Post',
          detail: `Post cannot be added: ${res.result.map(v => v.message).join(', ')}`
        });
      }
    });
  }

  getUsers(): void {
    if (this.userId) {
      return;
    }

    this.dataService.getAllUsers().subscribe(res => this.users = res.result);
  }

  getUser(): void {
    this.dataService.getUserById(this.userId).subscribe(res => {
      this.users = [res];
      this.f.user.setValue(res);
    });
  }
}
