import { Component, Input, inject } from '@angular/core';
import { BaseFormComponent } from 'src/app/core/base/base-form/base-form.component';
import { FormsModule, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DemandeConges } from '../../model/demande-conges.model';
import { TypeCongeService } from '../../../type-conges/services/type_conge.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { StatutCongeService } from '../../../statut-conges/services/statut_conge.service';
import { CollaborateurService } from 'src/app/features/rh/collaborateurs/service/collaborateur.service';
import { Collaborateur } from 'src/app/features/rh/collaborateurs/models/collaborateur.model';
import { dateValidator } from 'src/app/core/utils/date-validator';
import { UserContextService } from 'src/app/core/services/user-context.service';

@Component({
  selector: 'app-form-demande-conge',
  templateUrl: './form-demande-conge.component.html',
  styleUrls: ['./form-demande-conge.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
})
export class FormDemandeCongesComponent extends BaseFormComponent {
  nomModele: string = 'demandeconge';

  @Input() data: DemandeConges = {} as DemandeConges;

  typeConges = [];
  statusConges = [];

  private typeCongesService = inject(TypeCongeService);
  private statusCongesService = inject(StatutCongeService);
  private notificationService = inject(NotificationService);
  private collaborateurService = inject(CollaborateurService);
  userContext = inject(UserContextService);

  ngOnInit(): void {
    this.buildForm();
    this.getAllTypes();
    this.getAllStatusConge();
    // this.getCollabById();
    this.userContext.loadCurrentCollaborateur();
  }

  buildForm(): void {
    const formatDate = (date: string | undefined) => {
      if (!date) return '';
      const d = new Date(date);
      const month = (d.getMonth() + 1).toString().padStart(2, '0');
      const day = d.getDate().toString().padStart(2, '0');
      return `${d.getFullYear()}-${month}-${day}`;
    };

    this.formGroup = this.formBuilder.group({
      date_debut_conge: [formatDate(this.data?.date_debut_conge), Validators.required],
      date_fin_conge: [formatDate(this.data?.date_fin_conge), Validators.required],
      motifs_conge: [this.data?.motifs_conge || '', Validators.required],
      id_type_conge: [this.data?.id_type_conge || '', Validators.required],
      id_status_conge: [null],
    }, { validators: dateValidator });
  }

  // getCollabById() {
  //   const storedUser = localStorage.getItem('currentUser');
  //   if (!storedUser) return;

  //   let username: string;
  //   try {
  //     const parsed = JSON.parse(storedUser);
  //     username = parsed.username ?? parsed;
  //   } catch {
  //     username = storedUser;
  //   }

  //   this.collaborateurService.getByLogin(username).subscribe({
      
  //     next: (collab: Collaborateur & { 
  //       compte?: { login: string; type: string }; 
  //       manager?: { id: number; nom_manager: string }; 
  //       departement?: { id: number; nom_dep: string }; 
  //       soldes?: any[];
  //     }) => {
  //       if (!collab) return;
  //       this.userName = `${collab.nom_collab} ${collab.prenom_collab}`;
  //       this.managerName = collab.manager?.nom_manager ?? 'Non défini';
  //       this.departementName = collab.departement?.nom_dep ?? 'Non défini';
  //       this.compteType = collab.compte?.type ?? 'Non défini';
  //       this.nbSoldes = collab.soldes?.length ?? 0;
  //     },
  //     error: (err) => this.notificationService.error(err),
  //   });
  // }

  valider() {
    this.submit = true;
    if (this.formGroup.invalid) return;

    const formData = this.formGroup.value;
    if (formData.id_status_conge === null) delete formData.id_status_conge;

    const flattenedData = { ...formData, id: this.data?.id };
    const payload = { data: flattenedData, nomModele: this.nomModele };
    const redirectUrl = '/demande-conge';
    super.storeAction(payload, redirectUrl);
    this.onValidate.emit();
  }

  getAllTypes(): void {
    this.typeCongesService.getAll().subscribe({
      next: (res: any) => (this.typeConges = res),
      error: (err) => this.notificationService.error(err),
    });
  }

  getAllStatusConge(): void {
    this.statusCongesService.getAll().subscribe({
      next: (res: any) => (this.statusConges = res),
      error: (err) => this.notificationService.error(err),
    });
  }

  formatDateDisplay(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return date.toLocaleDateString('fr-FR', options);
  }

  calculateDaysDifference(): number {
    const dateDebut = this.formGroup.get('date_debut_conge')?.value;
    const dateFin = this.formGroup.get('date_fin_conge')?.value;
    if (!dateDebut || !dateFin) return 0;

    const startDate = new Date(dateDebut);
    const endDate = new Date(dateFin);
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);

    const differenceMs = endDate.getTime() - startDate.getTime();
    return Math.floor(differenceMs / (1000 * 60 * 60 * 24)) + 1;
  }

  isInvalid(fieldName: string): boolean {
    const field = this.formGroup.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched || this.submit));
  }

  getErrorMessage(fieldName: string): string {
    const field = this.formGroup.get(fieldName);
    if (!field || !field.errors) return '';

    if (field.errors['required']) {
      return fieldName === 'date_debut_conge'
        ? 'Veuillez renseigner la date de début'
        : fieldName === 'date_fin_conge'
          ? 'Veuillez renseigner la date de fin'
          : 'Veuillez renseigner ce champ';
    }

    return '';
  }

}
