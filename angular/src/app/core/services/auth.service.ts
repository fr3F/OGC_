import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { User } from 'src/app/store/Authentication/auth.models';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private userJson = localStorage.getItem('currentUser');
  private user = this.userJson ? JSON.parse(this.userJson) : null;
  currentUser = signal<User | null>(this.user);

<<<<<<< HEAD
  constructor(private http: HttpClient) {}
=======
  constructor(private http: HttpClient) { }
>>>>>>> f8f63fd5c27d1a013ab4a169be58fee0b0fae682

  get currentUserValue(): User | null {
    return this.currentUser();
  }

  login(email: string, motDePasse: string) {
    return this.http.post<User>(`${environment.apiUrl}/auth/login`, { email, motDePasse })
      .pipe(
        map(user => {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUser.set(user);
          return user;
        })
      );
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUser.set(null);
  }
}
