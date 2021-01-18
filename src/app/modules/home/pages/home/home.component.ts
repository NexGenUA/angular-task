import { AfterViewChecked, ChangeDetectorRef, Component } from '@angular/core';
import { Subject } from 'rxjs';

import { ProgressBarService } from '../../../../shared/services/progress-bar.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewChecked {
  isLoading$: Subject<boolean>;

  constructor(
    private progressBarService: ProgressBarService,
    private cdRef: ChangeDetectorRef,
  ) {
    this.isLoading$ = this.progressBarService.isLoading$();
  }

  ngAfterViewChecked(): void {
    this.cdRef.detectChanges();
  }
}
