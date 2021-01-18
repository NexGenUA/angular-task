import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ProgressBarService } from '../services/progress-bar.service';

@Injectable()
export class ProgressBarInterceptor implements HttpInterceptor {

  constructor(
    private progressBarService: ProgressBarService
  ) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.progressBarService.isLoading$().next(true);
    return next.handle(request).pipe(
      catchError(
        (err: HttpErrorResponse) => this.handleError(err)
      )
    ).pipe(
      map(event => {
        if (event instanceof HttpResponse) {
          this.progressBarService.isLoading$().next(false);
        }
        return event;
      })
    );
  }

  handleError(err: HttpErrorResponse): Observable<never> {
    this.progressBarService.isLoading$().next(false);
    return throwError(err);
  }
}
