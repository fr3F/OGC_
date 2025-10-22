import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { PagetitleComponent } from 'src/app/shared/ui/pagetitle/pagetitle.component';
import { BaseListPageComponent } from 'src/app/core/base/base-list-page/base-list-page.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ListCompteComponent } from '../../components/list-compte/list-compte.component';

@Component({
  selector: 'app-liste-page-departements',
  templateUrl: './liste-page-departements.component.html',
  styleUrl: './liste-page-departements.component.css',
  standalone:true,
  imports:[
    CommonModule,
    PagetitleComponent,
    FormsModule,
    ReactiveFormsModule,
    NgbPaginationModule,
    NgxPaginationModule,
    ListCompteComponent
    
  ]
})
export class ListePageComptesComponent extends BaseListPageComponent {
  nomModele: string = "compte";
  titre: string = "Liste des comptes";
  ngOnInit() {       
    super.ngOnInit()
    this.refreshData() 
  }
}
