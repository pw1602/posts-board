import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersComponent } from '@pages/users/users.component';
import { UserInfoComponent } from '@pages/user-info/user-info.component';
import { UserInfoResolver } from '@shared/services/user-info-resolver.service';

const routes: Routes = [
  {
    path: 'users', children: [
      { path: '', pathMatch: 'full', component: UsersComponent },
      { path: ':name', component: UserInfoComponent, resolve: { user: UserInfoResolver } }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
