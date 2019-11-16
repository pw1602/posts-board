import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersComponent } from '@pages/users/users.component';
import { UserInfoComponent } from '@pages/user-info/user-info.component';
import { UserInfoResolver } from '@shared/services/user-info-resolver.service';
import { PostsComponent } from './pages/posts/posts.component';

const routes: Routes = [
  { path: 'users', pathMatch: 'full', component: UsersComponent },
  {
    path: 'user', children: [
      { path: '', pathMatch: 'full', redirectTo: '/users' },
      { path: ':name', component: UserInfoComponent, resolve: { user: UserInfoResolver } }
    ]
  },
  { path: 'posts', pathMatch: 'full', component: PostsComponent },
  { path: '**', pathMatch: 'full', redirectTo: '/posts' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
