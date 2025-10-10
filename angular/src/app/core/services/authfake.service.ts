import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User } from 'src/app/store/Authentication/auth.models';
import { environment } from 'src/environments/environment';

const apiUrl = environment.apiUrl;

@Injectable({ providedIn: 'root' })
export class AuthfakeauthenticationService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<User | null>(
      storedUser ? JSON.parse(storedUser) : null
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  /**
   * Login via backend session (récupère username automatiquement)
   */
  login() {
    return this.http.get<{ username: string }>(`${apiUrl}/username`).pipe(
      map(res => {
        if (!res.username) {
          throw new Error('Utilisateur non trouvé');
        }

        const email = `${res.username}@sodim.corp`;
        const user: User = {
          email,
          username: res.username,
          token: 'fake-jwt-token' // optionnel si tu n’as pas de JWT réel
        };

        // Stockage local
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);

        return user;
      }),
      catchError(err => {
        return throwError(() => new Error(err.message || 'Erreur de session'));
      })
    );
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
