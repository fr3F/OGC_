import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { PagetitleComponent } from 'src/app/shared/ui/pagetitle/pagetitle.component';
import { BaseListPageComponent } from 'src/app/core/base/base-list-page/base-list-page.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ListDemandeCongeComponent } from '../../component/list-demande-conge/list-demande-conge.component';
import { UserContextService } from 'src/app/core/services/user-context.service';

@Component({
  selector: 'app-liste-page-demande-conge',
  templateUrl: './liste-page-demande-conge.component.html',
  styleUrls: ['./liste-page-demande-conge.component.css'],
  standalone:true,
  imports:[
    CommonModule,
    PagetitleComponent,
    FormsModule,
    ReactiveFormsModule,
    NgbPaginationModule,
    NgxPaginationModule,
    ListDemandeCongeComponent
  ]
})
export class ListePageDemandeCongeComponent extends BaseListPageComponent {
  nomModele: string = "demandeconge";
  titre: string = "Liste des demandes de congé";
  userContext = inject(UserContextService);
  

  ngOnInit() {
    super.ngOnInit();
    this.setLoginFromLocalStorage();
    this.refreshData();
  }

  
  private setLoginFromLocalStorage() {
    const userStr = localStorage.getItem('currentUser');
    if (!userStr) return;

    const user = JSON.parse(userStr);
    const loginManager = user.username;
    const typeCompte = user.compte?.type ?? 'Non défini';
    const typeConge = this.userContext.typeConge(); 
    console.log("typeConge", typeConge);
    
    if (loginManager) {
      // Ajouter 'login', 'typeCompte', 'typeConge' dans paramSearchs
      ['login', 'typeCompte', 'typeConge'].forEach(p => {
        if (!this.paramSearchs.includes(p)) this.paramSearchs.push(p);
      });

      // Créer les propriétés dynamiques
      this['login'] = loginManager;
      this['typeCompte'] = typeCompte;
      this['typeConge'] = typeConge;
    }
  }


  handlePageChange(page: number) {
    this.page = page;
    this.refreshData();
  }
}


