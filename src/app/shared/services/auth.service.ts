import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { AuthEntity } from '../models/auth.model';
import { map, switchMap, tap } from 'rxjs/operators';
import { User } from '../models/user.model';
import { LocalStorageService } from './local-storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly credentials: AuthEntity = {
    email: 'admin@admin.com',
    password: 'admin'
  };

  private auth$: BehaviorSubject<User | null>;

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
  ) {
    const entity: User | null = this.localStorageService.getUser();
    this.auth$ = new BehaviorSubject<User | null>(entity);
  }

  login(entity: AuthEntity): Observable<User> | never {
    const { email, password } = this.credentials;
    const isValid = entity.email === email && entity.password === password;
    const user: User = { email };

    return of(isValid).pipe(
      map(res => res ? user : res),
      tap(res => {
        if (res) {
          this.localStorageService.saveUser(res);
          this.auth$.next(res);
        }
      }),
      switchMap(res => {
        if (res) {
          return of(res);
        }
        return throwError({ message: 'Email or password is wrong' });
      })
    );
  }

  logOut(): void {
    this.localStorageService.removeUser();
    this.auth$.next(null);
    this.router.navigate(['/login']);
  }

  getUser(): User | null {
    return this.auth$.getValue();
  }
}
