import { Component, inject, Input } from '@angular/core';
import { BaseFormComponent } from 'src/app/core/base/base-form/base-form.component';
import { CollaborateurService } from '../../service/collaborateur.service';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Collaborateur } from '../../models/collaborateur.model';
import { CommonModule } from '@angular/common';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-form-collaborateur',
  templateUrl: './form-collaborateur.component.html',
  styleUrls: ['./form-collaborateur.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class FormCollaborateurComponent extends BaseFormComponent {
  @Input() data: Collaborateur;
  comptes = [];
  departements = [];
  managers = [];

  private collaborateurService = inject(CollaborateurService);
  private notificaitonService = inject(NotificationService);

  buildForm(): void {
    this.formGroup = this.formBuilder.group({
      nom_collab: [this.data?.nom_collab, [Validators.required]],
      prenom_collab: [this.data?.prenom_collab, [Validators.required]],
      email_collab: [this.data?.email_collab, [Validators.email]],
      date_embauche_collab: [this.data?.date_embauche_collab, [Validators.required]],
      id_manager: [this.data?.id_manager, [Validators.required]],
      login: [this.data?.login, [Validators.required]],
      id_departement: [this.data?.id_departement, [Validators.required]],
    });
  }

  ngOnInit() {
    super.ngOnInit();
    this.getAllCompte();
    this.getAllManagers();
    this.getAllDepartement()
  }
  
  getAllDepartement() {
    this.collaborateurService.getAllDepartements().subscribe({
      next: (res: any) => (this.departements = res),
      error: (err) => this.notificaitonService.error(err),
    });
  }

  getAllCompte() {
    this.collaborateurService.getAllLogins().subscribe({
      next: (res: any) => (this.comptes = res),
      error: (err) => this.notificaitonService.error(err),
    });
  }

  getAllManagers() {
    this.collaborateurService.getAllManagers().subscribe({
      next: (res: any) => (this.managers = res),
      error: (err) => this.notificaitonService.error(err),
    });
  }

  valider() {
    this.submit = true;
    if (this.formIsInvalid()) return;
    this.spinner.show();
    const dataToSubmit = this.formGroup.value;
    super.valider(this.collaborateurService.nomModele, dataToSubmit, '/collaborateur/liste');
  }
}
