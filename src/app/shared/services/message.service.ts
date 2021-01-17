import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private snackBar: MatSnackBar) { }

  show(type: string, message: string): void {
    this.snackBar.open(type, message, {
      duration: 5000
    });
  }
}
