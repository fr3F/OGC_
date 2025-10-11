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
  standalone:true,
  imports:[CommonModule,FormsModule,ReactiveFormsModule]
})

export class LoginComponent implements OnInit {

  loginForm: UntypedFormGroup;
  submitted: any = false;
  error: any = '';
  returnUrl: string;
  fieldTextType!: boolean;

  year: number = new Date().getFullYear();
  user = '';
  sessionCmd = ''; // affichera la "commande"

  constructor(
    private formBuilder: UntypedFormBuilder, 
    private router: Router,
    private route: ActivatedRoute,
    private store: Store,
    private http: HttpClient) { }

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
