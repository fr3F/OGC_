import { StatutConges } from './../../../statut-conges/models/statut-conges.model';
import { CommonModule } from '@angular/common';
import { Component, inject, Injector } from '@angular/core';
import { NgbModalModule, NgbPaginationModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { BaseListComponent } from 'src/app/core/base/base-list/base-list.component';
import { NgxPaginationModule } from "ngx-pagination";
import { RouterModule } from '@angular/router';
import { FormDemandeCongesComponent } from '../form-demande-conge/form-demande-conge.component';
import { DateUtilsService } from 'src/app/core/utils/date-utils.service';
import { DemandeCongesService } from '../../services/demande-conges.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { AutoriseZeroService } from 'src/app/core/services/autorise-zero.service';
import { ManagersService } from 'src/app/features/rh/managers/services/managers.service';
import { UserStorageService } from 'src/app/core/services/UserStorageService';


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
  manager 
  private dateUtils = inject(DateUtilsService);
  private demandeCongesService = inject(DemandeCongesService)
  private notificationService = inject(NotificationService)
  private autoriseZeroService = inject(AutoriseZeroService)
  private managersService = inject(ManagersService)
  private userStorage =  inject(UserStorageService)
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
    console.log("id", id);   

    let nomModele = this.nomModele
    super.deleteSimple(nomModele, id)
  }


  validerConge(index: number) {
    const item = this.list[index];
    if (!item || !item.id) return;

    if (!confirm('Voulez-vous valider cette demande ?')) return;

    const currentUser = this.userStorage.getUserData();
    const idManager = currentUser?.id_manager;
    if (!idManager) {
      this.notif.error('Aucun manager associé à cet utilisateur.');
      return;
    }

    this.recupererLoginManagerEtValider(item.id, idManager, true);
  }

  rejeterConge(index: number) {
    const item = this.list[index];
    if (!item || !item.id) return;

    if (!confirm('Voulez-vous vraiment rejeter cette demande de congé ?')) return;

    const currentUser = this.userStorage.getUserData();
    const idManager = currentUser?.id_manager;
    if (!idManager) {
      this.notif.error('Aucun manager associé à cet utilisateur.');
      return;
    }

    this.recupererLoginManagerEtValider(item.id, idManager, false);
  }


  private recupererLoginManagerEtValider(demandeId: number, idManager: number, valide: boolean) {
    this.getManagerById(idManager).subscribe({
      next: (manager: any) => {
        if (!manager || !manager.login) {
          this.notif.error('Login manager introuvable.');
          return;
        }

        const loginManager = manager.login;
        this.executerTraitementConge(demandeId, loginManager, valide);
      },
      error: (err) => {
        console.error('Erreur lors de la récupération du manager', err);
        this.notif.error('Impossible de récupérer le manager.');
      }
    });
  }

  private executerTraitementConge(demandeId: number, loginManager: string, valide: boolean) {
    this.demandeCongesService
      .validerDemandeConge(demandeId, valide, loginManager, this.nomModele)
      .subscribe({
        next: () => {
          this.autoriseZeroService.triggerReloadChildData();
          const msg = valide ? 'Demande validée avec succès' : 'Demande rejetée avec succès';
          this.notif.success(msg);
          this.isVisible = false;
        },
        error: (err) => {
          console.error('Erreur traitement congé', err);
          const msg = valide ? 'Erreur lors de la validation' : 'Erreur lors du rejet';
          this.notif.error(msg);
        }
      });
  }

  private getManagerById(id: number) {
    return this.managersService.getById(id);
  }

  get isManager(): boolean {
    return this.userType === 'manager';
  }

}