import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenKey = 'token';
  private currentUserSubject = new BehaviorSubject<string | null>(this.getUsernameFromToken());
  public currentUser$ = this.currentUserSubject.asObservable();


  constructor() { }

  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
    this.currentUserSubject.next(this.getUsernameFromToken());
  }
  getToken(): string | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem(this.tokenKey);
    }
    return null;
  }
 
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
  getUsernameFromToken(): string | null {
    const token = this.getToken();
    if (!token) return null;
    try {
      const payload = token.split('.')[1];
      return payload ? JSON.parse(atob(payload)).sub : null;
    } catch {
      return null;
    }
  }
}
