import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { PagetitleComponent } from 'src/app/shared/ui/pagetitle/pagetitle.component';
import { BaseListPageComponent } from 'src/app/core/base/base-list-page/base-list-page.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ListDemandeCongeComponent } from '../../component/list-demande-conge/list-demande-conge.component';
import { UserContextService } from 'src/app/core/services/user-context.service';
import { UserStorageService } from 'src/app/core/services/UserStorageService';

@Component({
  selector: 'app-liste-page-demande-conge',
  templateUrl: './liste-page-demande-conge.component.html',
  styleUrls: ['./liste-page-demande-conge.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    PagetitleComponent,
    FormsModule,
    ReactiveFormsModule,
    NgbPaginationModule,
    NgxPaginationModule,
    ListDemandeCongeComponent,
  ],
})
export class ListePageDemandeCongeComponent extends BaseListPageComponent {
  nomModele: string = 'demandeconge';
  titre: string = 'Liste des demandes de congé';
  userContext = inject(UserContextService);
  userStorageService = inject(UserStorageService)

  ngOnInit() {
    super.ngOnInit();
    this.setUserParams();
    this.refreshData();

  }

  private setUserParams() {
      const userData = this.userStorageService.getUserData();      

      if (!userData) {
        console.warn('Aucune donnée utilisateur');
        return;
      }

      // Ajouter les paramètres
      ['typeCompte', 'managerId', 'login'].forEach(p => {
        if (!this.paramSearchs.includes(p)) {
          this.paramSearchs.push(p);
        }
      });

      // Créer les propriétés
      this['typeCompte'] = userData.type;
      this['managerId'] = userData.id_manager;
      this['login'] = userData.username;

      console.log("Params configurés depuis UserStorageService");
    }

}
