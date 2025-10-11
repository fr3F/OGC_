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
<<<<<<< HEAD
  standalone:true,
  imports:[CommonModule,FormsModule,ReactiveFormsModule]
=======
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
>>>>>>> f8f63fd5c27d1a013ab4a169be58fee0b0fae682
})

export class LoginComponent implements OnInit {

  loginForm: UntypedFormGroup;
  submitted: any = false;
  error: any = '';
  returnUrl: string;
  fieldTextType!: boolean;

  year: number = new Date().getFullYear();
  user = '';
<<<<<<< HEAD
  sessionCmd = ''; // affichera la "commande"

  constructor(
    private formBuilder: UntypedFormBuilder, 
=======

  constructor(
    private formBuilder: UntypedFormBuilder,
>>>>>>> f8f63fd5c27d1a013ab4a169be58fee0b0fae682
    private router: Router,
    private route: ActivatedRoute,
    private store: Store,
    private http: HttpClient) { }

<<<<<<< HEAD
ngOnInit() {
  if (localStorage.getItem('currentUser')) {
    this.router.navigate(['/sodim']);
  }

  // Récupérer username depuis le backend
  this.http.get<{ username: string }>(`${apiUrl}/username`).subscribe({
    next: (res) => {
      const user = res.username || 'defaultUser';
      const expectedEmail = `${user}@sodim.corp`;
      this.loginForm = this.formBuilder.group({
        email: [expectedEmail, [Validators.required, Validators.email]],
        password: ['', [Validators.required]]
      });
    },
    error: () => {
      const expectedEmail = `defaultUser@sodim.corp`;
      this.loginForm = this.formBuilder.group({
        email: [expectedEmail, [Validators.required, Validators.email]],
        password: ['', [Validators.required]]
      });
    }
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
=======
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
>>>>>>> f8f63fd5c27d1a013ab4a169be58fee0b0fae682

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  // login.component.ts (extrait)
  onSubmit() {
    this.submitted = true;
    this.error = '';

    if (!this.loginForm.valid) {
<<<<<<< HEAD
      return; 
    }

    const payload = {
      username: this.f['email'].value, 
=======
      return;
    }

    const payload = {
      username: this.f['email'].value,
>>>>>>> f8f63fd5c27d1a013ab4a169be58fee0b0fae682
      password: this.f['password'].value
    };

    this.http.post<{ success: boolean, message: string }>(`${apiUrl}/login`, payload)
      .subscribe({
        next: (res) => {
          if (res.success) {
<<<<<<< HEAD
            localStorage.setItem('currentUser', payload.username); 
=======
            localStorage.setItem('currentUser', payload.username);
>>>>>>> f8f63fd5c27d1a013ab4a169be58fee0b0fae682
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
