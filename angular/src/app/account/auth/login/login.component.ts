import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const apiUrl = environment.apiUrl;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  submitted = false;
  error = '';
  fieldTextType = false;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    // ✅ L'utilisateur ne tape que le nom court (ex: user050)
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  // Raccourci pour les champs du formulaire
  get f() {
    return this.loginForm.controls;
  }

  // ✅ Soumission du formulaire
  onSubmit() {
    this.submitted = true;
    this.error = '';

    if (this.loginForm.invalid) return;

    this.loading = true;

    let username = this.f['username'].value.trim();
    const password = this.f['password'].value;

    // ✅ Ajout automatique du domaine s’il n’existe pas
    const domain = '@sodim.corp';
    if (!username.includes('@')) {
      username += domain;
    }

    const payload = { username, password };

    console.log('[DEBUG] Tentative de connexion :', payload);

    this.http.post<{ success: boolean; message: string }>(`${apiUrl}/login`, payload,
        { withCredentials: true } 
    )
      .subscribe({
        next: (res) => {
          this.loading = false;
          console.log('[DEBUG] Réponse du serveur :', res);

          if (res.success) {
            const simpleUser = username.split('@')[0];
            localStorage.setItem('currentUser', simpleUser);
            this.router.navigate(['/collaborateur']);
          } else {
            this.error = res.message || 'Identifiants incorrects.';
          }
        },
        error: (err) => {
          this.loading = false;
          console.error('[ERREUR SERVEUR]', err);
          this.error = err?.error?.message || 'Erreur de connexion au serveur.';
        }
      });
  }

  //Afficher / masquer le mot de passe
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
}
