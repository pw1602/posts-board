import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

import { DataService } from '@/shared/services/data.service';
import { Comment } from '@core/interfaces/comment';
import { Post } from '@/core/interfaces/post';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss']
})
export class AddCommentComponent implements OnInit {
  @Input() visible: boolean;
  @Input() post: Post;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter();
  @Output() addedComment: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private messageService: MessageService
  ) { }

  commentForm = this.formBuilder.group({
    name: ['', Validators.compose([Validators.required])],
    email: ['', Validators.compose([Validators.required, Validators.email])],
    body: ['', Validators.compose([Validators.required])]
  });

  ngOnInit() {
  }

  changeVisible(): void {
    this.visible = false;
    this.visibleChange.emit(this.visible);
    this.commentForm.reset();
  }

  get f() {
    return this.commentForm.controls;
  }

  submit(): void {
    if (this.commentForm.invalid) {
      return;
    }

    const commentData = this.commentForm.value;
    commentData.post_id = this.post.id;
    this.createPost(commentData);
  }

  getCreator(post: Post): string {
    return post.user ? `${post.user.first_name} ${post.user.last_name} (${post.user.email})` : 'Anonymous';
  }

  private createPost(comment: Comment): void {
    this.dataService.createComment(comment)
    .subscribe(res => {
      if (res._meta.code === 200) {
        this.addedComment.emit(true);
        this.commentForm.reset();
        this.messageService.add({
          severity: 'success',
          summary: 'Add Comment',
          detail: 'Comment has been added.'
        });
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Add Comment',
          detail: `Comment cannot be added: ${res.result.map(v => v.message).join(', ')}`
        });
      }
    });
  }
}
