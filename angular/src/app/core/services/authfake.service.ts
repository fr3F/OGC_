import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User } from 'src/app/store/Authentication/auth.models';
import { environment } from 'src/environments/environment';

const apiUrl = environment.apiUrl;

@Injectable({ providedIn: 'root' })
export class AuthfakeauthenticationService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(private http: HttpClient) {
      const stored = localStorage.getItem('currentUser');
      let user: User | null = null;

      if (stored) {
        try {
          // Essaye de parser JSON
          const parsed = JSON.parse(stored);
          if (typeof parsed === 'string') {
            // Ancien format simple string
            user = { email: parsed, username: parsed.split('@')[0], token: 'fake-jwt-token' };
            localStorage.setItem('currentUser', JSON.stringify(user));
          } else if (parsed && parsed.username && parsed.email) {
            user = parsed;
          } else {
            // Format inattendu → reset
            console.warn('Format localStorage invalide, reset.');
            localStorage.removeItem('currentUser');
          }
        } catch (e) {
          // Si parse JSON échoue (ex: string brute), on convertit en objet
          console.warn('Erreur parsing localStorage currentUser, reset.', e);
          user = { email: stored, username: stored.split('@')[0], token: 'fake-jwt-token' };
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
      }

      this.currentUserSubject = new BehaviorSubject<User | null>(user);
      this.currentUser = this.currentUserSubject.asObservable();
    }


    public get currentUserValue(): User | null {
      return this.currentUserSubject.value;
    }

  /**
   * Login via backend session (récupère username automatiquement)
   */
 login(): Observable<User> {
    return this.http.get<{ username: string }>(`${apiUrl}/username`).pipe(
      map(res => {
        if (!res.username) {
          throw new Error('Utilisateur non trouvé');
        }

        const email = `${res.username}@sodim.corp`;
        const user: User = {
          username: res.username,
          email,
          token: 'fake-jwt-token'
        };

        // Stockage local
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);

        return user;
      }),
      catchError(err => {
        // Gestion correcte de l'erreur avec throwError
        const message = err?.error?.message || err?.message || 'Erreur de session';
        return throwError(() => new Error(message));
      })
    );
  }


  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
