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
  status
  ngOnInit() {
    super.ngOnInit();
    this.setUserParams();
    this.refreshData();

  }

private setUserParams() {
  const userData = this.userStorageService.getUserData();
  this.status=userData.type

  if (!userData) {
    console.warn('Aucune donnée utilisateur');
    return;
  }

  // Ajouter uniquement les paramètres nécessaires
  ['typeCompte', 'login_manager'].forEach(p => {
    if (!this.paramSearchs.includes(p)) {
      this.paramSearchs.push(p);
    }
  });

  // Créer les propriétés
  this['typeCompte'] = userData.type;
  // this['login_manager'] = userData.username;
  this['login_manager'] = "user028";
  console.log("Params configurés depuis UserStorageService sans login");
}


}
