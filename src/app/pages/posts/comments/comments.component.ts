import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Comment } from '@core/interfaces/comment';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  @Input() comments: Comment[];
  @Input() page: number;
  @Output() expanded: EventEmitter<boolean> = new EventEmitter();
  @Output() pageChange: EventEmitter<number> = new EventEmitter();

  totalRecords = 100;
  perPage = 20;

  constructor() { }

  ngOnInit() {
  }

  toggle(event: any): void {
    this.expanded.emit(!event.collapsed);
  }

  paginate(event) {
    if (event.page + 1 === this.page) {
      return;
    }

    this.pageChange.emit(event.page + 1);
  }
}
