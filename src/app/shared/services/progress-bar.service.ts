import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgressBarService {
  private readonly isLoading: Subject<boolean> = new Subject();

  constructor() {
    this.isLoading.next(false);
  }

  isLoading$(): Subject<boolean> {
    return this.isLoading;
  }
}
