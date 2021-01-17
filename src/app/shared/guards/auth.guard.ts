import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { MessageService } from '../services/message.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.isAuth();
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> {
    return this.isAuth();
  }

  isAuth(): Observable<boolean> {
    const isAuth = !!this.authService.getUser();
    if (!isAuth) {
      this.router.navigate(['/login'])
        .then(() => {
          this.messageService.show('ERROR', 'Login first');
        });
    }
    return of(isAuth);
  }
}
