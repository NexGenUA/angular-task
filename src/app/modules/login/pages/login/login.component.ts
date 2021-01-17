import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatePatterns } from '../../../../shared/validatePatterns';
import { AuthEntity } from '../../../../shared/models/auth.model';
import { AuthService } from '../../../../shared/services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MessageService } from '../../../../shared/services/message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {
  form: FormGroup;
  hide = true;
  subscriptions: Subscription[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.form = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(ValidatePatterns.email),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(5)
      ])
    });
  }

  login(): void {
    const credentials: AuthEntity = this.form.value;
    const loginSub: Subscription = this.authService.login(credentials)
      .subscribe({
        next: res => {
          this.messageService.show('SUCCESS', `Welcome on board '${res.email}'!`);
          this.router.navigate(['/home'])
            .then(() => {
              this.form.reset();
            });
        },
        error: error => {
          this.messageService.show('ERROR', error.message);
        }
      });
    this.subscriptions.push(loginSub);
  }

  getEmailErrorMsg(): string {
    const email = this.form.get('email');
    if (email?.hasError('required')) {
      return 'You must enter an email';
    }

    return email?.hasError('pattern') ? 'Example: admin@admin.com' : '';
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscriber => {
      subscriber.unsubscribe();
    });
  }
}
