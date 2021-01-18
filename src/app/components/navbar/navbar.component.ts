import { ChangeDetectorRef, Component, NgZone, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnDestroy {
  userEmail: string;
  time: Date = new Date();
  subscriptions: Subscription[] = [];

  constructor(
    private authService: AuthService,
    private cd: ChangeDetectorRef,
    private zone: NgZone
  ) {
    this.userEmail = authService.getUser()?.email || '';
    zone.runOutsideAngular(() => {
      const intervalSub = interval(1000)
        .pipe(
          tap(() => {
            this.time = new Date();
            cd.detectChanges();
          })
        ).subscribe();
      this.subscriptions.push(intervalSub);
    });
  }

  logout(): void {
    this.authService.logOut();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscriber => {
      subscriber.unsubscribe();
    });
  }
}
