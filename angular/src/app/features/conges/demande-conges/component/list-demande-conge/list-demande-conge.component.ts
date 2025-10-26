import { StatutConges } from './../../../statut-conges/models/statut-conges.model';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NgbModalModule, NgbPaginationModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { BaseListComponent } from 'src/app/core/base/base-list/base-list.component';
import { NgxPaginationModule } from "ngx-pagination";
import { RouterModule } from '@angular/router';
import { FormDemandeCongesComponent } from '../form-demande-conge/form-demande-conge.component';
import { DateUtilsService } from 'src/app/core/utils/date-utils.service';
import { DemandeCongesService } from '../../services/demande-conges.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { AutoriseZeroService } from 'src/app/core/services/autorise-zero.service';

@Component({
  selector: 'app-list-demande-conge',
  templateUrl: './list-demande-conge.component.html',
  styleUrls: ['./list-demande-conge.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    NgbTooltipModule,
    NgbPaginationModule,
    NgbModalModule,
    NgxPaginationModule,
    RouterModule,
    FormDemandeCongesComponent
  ]
})
export class ListDemandeCongeComponent extends BaseListComponent {
  nomModele: string = "demandeconge";
  itemSelected = {};
  isVisible = true;
  private dateUtils = inject(DateUtilsService);
  private demandeCongesService = inject(DemandeCongesService)
  private notificationService = inject(NotificationService)
  private autoriseZeroService = inject(AutoriseZeroService)

  ngOnInit() {
    super.ngOnInit()
  }

  calculateDaysDifference(dateDebut, dateFin) {
    return this.dateUtils.calculateDaysDifference(dateDebut, dateFin);
  }

  changeItem() {
    this.onChangeItem.emit();
    this.modalService.dismissAll();
  }

  modify(modal, item) {
    this.itemSelected = { ...item };
    this.modalService.open(modal)
  }

  delete(index) {
    const id = index.demande_id || index.id
    let nomModele = this.nomModele
    super.deleteSimple(nomModele, id)
  }


  validerConge(index: number) {
    const item = this.list[index];

    if (!item || !item.id) {
      console.error('Demande invalide ou ID manquant', item);
      return;
    }

    const confirmValidation = confirm(`Voulez-vous valider cette demande ?`);
    if (!confirmValidation) return;

    const loginManager = 'user050';

    this.demandeCongesService
      .validerDemandeConge(item.id, true, loginManager, this.nomModele)
      .subscribe({
        next: (res) => {
          // Mettre à jour la liste localement
          this.autoriseZeroService.triggerReloadChildData();
          this.notif.success('Demande valider avec succès');
          this.isVisible = false;
        },
        error: (err) => {
          console.error('Erreur validation', err);
        }
      });
  }

  // Même chose pour rejeter
  rejeterConge(index: number) {
    const item = this.list[index];
    if (!item) return;

    const confirmRejet = confirm(`Voulez-vous vraiment rejeter cette demande de congé ?`);
    if (!confirmRejet) return;

    // const loginManager = this.authService.getCurrentUser()?.login;
    const loginManager = "user050";

    if (!loginManager) {
      this.notificationService.error('Utilisateur non authentifié');
      return;
    }

    this.demandeCongesService.validerDemandeConge(
      item.id,
      false,
      loginManager,
      this.nomModele
    ).subscribe({
      next: (res) => {
        this.notificationService.success('Demande rejetée avec succès');
        this.autoriseZeroService.triggerReloadChildData();
      },
      error: (err) => {
        console.error(err);
        this.notificationService.error(err.error?.message || 'Erreur lors du rejet');
      }
    });
  }
  get isManager(): boolean {
    return this.userType === 'manager';
  }

}
