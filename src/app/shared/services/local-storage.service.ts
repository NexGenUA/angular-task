import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  saveUser(user: User): void {
    const jsonUser = JSON.stringify(user);
    localStorage.setItem('user', jsonUser);
  }

  getUser(): User | null {
    const jsonUser = localStorage.getItem('user');
    if (jsonUser) {
      return JSON.parse(jsonUser);
    }
    return null;
  }

  removeUser(): void {
    localStorage.removeItem('user');
  }
}
