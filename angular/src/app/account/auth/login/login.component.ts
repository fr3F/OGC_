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
  ) { }

  ngOnInit() {
    // L'utilisateur ne tape que le nom court (ex: user050)
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  // Raccourci pour les champs du formulaire
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

    // Ajout automatique du domaine s'il n'existe pas
    const domain = '@sodim.corp';
    if (!username.includes('@')) {
      username += domain;
    }

    const payload = { username, password };

    this.http.post<{ success: boolean; message: string }>(`${apiUrl}/login`, payload,
      { withCredentials: true }
    )
      .subscribe({
        next: (res) => {

          if (res.success) {
            // NOUVEAU : Charger les données complètes du collaborateur
            const simpleUser = username.split('@')[0];
            this.loadCollaborateurData(simpleUser, username);
            
          } else {
            this.loading = false;
            this.error = res.message || 'Identifiants incorrects.';
          }
        },
        error: (err) => {
          this.loading = false;
          this.error = err?.error?.message || 'Erreur de connexion au serveur.';
        }
      });
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  private loadCollaborateurData(simpleUser: string, fullUsername: string) {
    this.collaborateurService.getByLogin(simpleUser).subscribe({
      next: (collab: Collaborateur & { compte?: { type: string } }) => {
        
        if (!collab || !collab.id) {
          this.loading = false;
          this.notificationService.error('Aucun collaborateur trouvé pour cet utilisateur.');
          return;
        }
        if (collab.id_manager) {
          this.loadManagerAndSaveUser(collab, fullUsername, simpleUser);
        } else {
          this.saveUserDataAndNavigate(collab, fullUsername, simpleUser, null);
        }
      },
      error: (err) => {
        this.loading = false;
        this.notificationService.error('Erreur lors du chargement des données collaborateur.');
      }
    });
  }

  private loadManagerAndSaveUser(
    collab: Collaborateur & { compte?: { type: string } }, 
    fullUsername: string,
    simpleUser: string
  ) {
    this.managerService.getById(Number(collab.id_manager)).subscribe({
      next: (manager: Manager) => {
        const loginManager = manager?.login || null;
        this.saveUserDataAndNavigate(collab, fullUsername, simpleUser, loginManager);
      },
      error: (err) => {
        this.saveUserDataAndNavigate(collab, fullUsername, simpleUser, null);
      }
    });
  }

  private saveUserDataAndNavigate(
    collab: Collaborateur & { compte?: { type: string } }, 
    fullUsername: string,
    simpleUser: string,
    loginManager: string | null
  ) {
    const userData: UserData = {
      id: collab.id!,
      username: fullUsername,
      nom: collab.nom_collab,
      prenom: collab.prenom_collab,
      email: collab.email_collab || fullUsername,
      matricule: collab.matricule_collab,
      type: collab.compte?.type,
      id_manager: collab.id_manager ? Number(collab.id_manager) : null,
      login_manager: loginManager  
    };
    
    try {
      this.userStorage.saveUserData(userData);   
      localStorage.setItem('currentUser', simpleUser);
      this.loading = false;
      this.router.navigate(['/demande-conge/ajouter']);

    } catch (error) {
      this.loading = false;
      this.notificationService.error('Erreur lors de la sauvegarde des données utilisateur.');
    }
  }
}