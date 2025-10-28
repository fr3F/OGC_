import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserStorageService, UserData } from 'src/app/core/services/UserStorageService';
import { CollaborateurService } from 'src/app/features/rh/collaborateurs/service/collaborateur.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Collaborateur } from 'src/app/features/rh/collaborateurs/models/collaborateur.model';
import { ManagersService } from 'src/app/features/rh/managers/services/managers.service';
import { Manager } from 'src/app/features/rh/managers/models/manager.model';

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
  manager
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private userStorage: UserStorageService,
    private collaborateurService: CollaborateurService,
    private notificationService: NotificationService,
    private managerService : ManagersService
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  // Soumission du formulaire
  onSubmit() {
    this.submitted = true;
    this.error = '';

    if (this.loginForm.invalid) return;
    this.loading = true;

    let username = this.f['username'].value.trim();
    const password = this.f['password'].value;

    // Ajout du domaine automatiquement
    const domain = '@sodim.corp';
    if (!username.includes('@')) {
      username += domain;
    }

    const payload = { username, password };
    this.http.post<{ success: boolean; message: string }>(
      `${apiUrl}/login`,
      payload,
      { withCredentials: true }
    ).subscribe({
      next: (res) => {
        this.loading = false;

        if (res.success) {
          const simpleUser = username.split('@')[0];
          localStorage.setItem('currentUser', simpleUser);

          this.loadUserData(simpleUser);
        } else {
          this.error = res.message || 'Identifiants incorrects.';
        }
      },
      error: (err) => {
        this.loading = false;
        this.error = err?.error?.message || 'Erreur de connexion au serveur.';
      }
    });
  }

  // Charger les vraies données utilisateur depuis la BD
  private loadUserData(username: string) {
    this.collaborateurService.getByLogin(username).subscribe({
      next: (collab: Collaborateur & { compte?: { type: string } }) => {

        if (!collab) {
          this.notificationService.error('Aucun collaborateur trouvé.');
          return;
        }

        // Si le collaborateur a un manager, charger ses données
        if (collab.id_manager) {
          this.managerService.getById(Number(collab.id_manager)).subscribe({
            next: (manager:Manager) => {             
              const userData: UserData = {
                id: collab.id!,
                username,
                nom: collab.nom_collab,
                prenom: collab.prenom_collab,
                email: collab.email_collab || `${username}@sodim.corp`,
                matricule: collab.matricule_collab,
                type: collab.compte?.type,
                id_manager: Number(collab.id_manager),
                login_manager: manager?.login || null  
              };

              // Enregistrer dans UserStorageService
              this.userStorage.saveUserData(userData);

              // Redirection après chargement complet
              this.router.navigate(['/demande-conge/ajouter']);
            }

          });
        }
      },
      error: (err) => {
        console.error('[ERREUR getByLogin]', err);
        this.notificationService.error('Erreur lors du chargement des données collaborateur.');
      }
    });
  }


  // Afficher / masquer mot de passe
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
}
