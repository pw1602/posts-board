import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap, take, catchError, map } from 'rxjs/operators';

import { DataService } from '@shared/services/data.service';
import { User } from '@core/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserInfoResolver implements Resolve<User> {
  constructor(
    private dataService: DataService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> | Observable<never> {
    const name = route.paramMap.get('name').split(' ');

    return this.dataService.getUserByName(name[0], name[1]).pipe(
      catchError(err => {
        return EMPTY;
      }),
      map((value: any, index) => value.result[index]),
      take(1),
      mergeMap(user => {
        if (user) {
          user.posts = [];
          return of(user);
        } else {
          return EMPTY;
        }
      })
    );
  }
}
