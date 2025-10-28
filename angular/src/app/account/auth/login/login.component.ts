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

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private userStorage: UserStorageService,
    private collaborateurService: CollaborateurService,
    private notificationService: NotificationService,
    private managerService: ManagersService
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

  onSubmit() {
    this.submitted = true;
    this.error = '';

    if (this.loginForm.invalid) return;

    this.loading = true;

    let username = this.f['username'].value.trim();
    const password = this.f['password'].value;

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
        console.log('[DEBUG] Réponse du serveur :', res);

        if (!res.success) {
          this.error = res.message || 'Identifiants incorrects.';
          return;
        }

        // Login réussi : récupérer les infos du collaborateur
        this.collaborateurService.getByLogin(username).subscribe({
          next: (collab: Collaborateur & { compte?: { type: string } }) => {
            if (!collab) {
              this.notificationService.error('Aucun collaborateur trouvé.');
              return;
            }

            if (collab.id_manager) {
              this.managerService.getById(Number(collab.id_manager)).subscribe({
                next: (manager: Manager) => {
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

                  this.userStorage.saveUserData(userData);
                  this.router.navigate(['/demande-conge/ajouter']);
                },
                error: (err) => {
                  console.error('[ERREUR getManager]', err);
                  this.notificationService.error('Erreur lors du chargement du manager.');
                }
              });
            } else {
              // Pas de manager
              const userData: UserData = {
                id: collab.id!,
                username,
                nom: collab.nom_collab,
                prenom: collab.prenom_collab,
                email: collab.email_collab || `${username}@sodim.corp`,
                matricule: collab.matricule_collab,
                type: collab.compte?.type,
                id_manager: null,
                login_manager: null
              };
              this.userStorage.saveUserData(userData);
              this.router.navigate(['/demande-conge/ajouter']);
            }
          },
          error: (err) => {
            console.error('[ERREUR getByLogin]', err);
            this.notificationService.error('Erreur lors du chargement des données collaborateur.');
          }
        });
      },
      error: (err) => {
        this.loading = false;
        console.error('[ERREUR SERVEUR]', err);
        this.error = err?.error?.message || 'Erreur de connexion au serveur.';
      }
    });
  }
}
