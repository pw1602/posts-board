import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-navigation',
  templateUrl: './main-navigation.component.html',
  styleUrls: ['./main-navigation.component.scss']
})
export class MainNavigationComponent implements OnInit {
  links = [
    { src: '/posts', name: 'Posts' },
    { src: '/users', name: 'Users' }
  ];

  constructor() { }

  ngOnInit() {
  }

}
