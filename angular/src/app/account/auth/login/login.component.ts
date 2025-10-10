import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { login } from 'src/app/store/Authentication/authentication.actions';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
const apiUrl = environment.apiUrl;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})

export class LoginComponent implements OnInit {

  loginForm: UntypedFormGroup;
  submitted: any = false;
  error: any = '';
  returnUrl: string;
  fieldTextType!: boolean;

  year: number = new Date().getFullYear();
  user = '';

  constructor(
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store,
    private http: HttpClient) { }

  ngOnInit() {
    this.initForm()
    this.http.get<{ username: string }>(`${environment.apiUrl}/username`).subscribe({
      next: (res) => {
        if (res.username) {
          this.user = res.username;
          this.loginForm.get('email')?.setValue(`${this.user}@sodim.corp`);
          console.log('[DEBUG] Username affiché:', this.user);
        }
      },
      error: (err) => console.error('Erreur récupération username', err)
    });
  }


  // Création du formulaire
  private initForm() {
    const expectedEmail = `${this.user}@sodim.corp`;
    this.loginForm = this.formBuilder.group({
      email: [expectedEmail, [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  // login.component.ts (extrait)
  onSubmit() {
    this.submitted = true;
    this.error = '';

    if (!this.loginForm.valid) {
      return;
    }

    const payload = {
      username: this.f['email'].value,
      password: this.f['password'].value
    };

    this.http.post<{ success: boolean, message: string }>(`${apiUrl}/login`, payload)
      .subscribe({
        next: (res) => {
          if (res.success) {
            localStorage.setItem('currentUser', payload.username);
            this.router.navigate(['/collaborateur']);
          } else {
            this.error = res.message;
          }
        },
        error: (err) => {
          this.error = err?.error?.message || 'Erreur serveur';
        }
      });
  }


  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
}
