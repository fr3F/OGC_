import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { PagetitleComponent } from 'src/app/shared/ui/pagetitle/pagetitle.component';
import { BaseListPageComponent } from 'src/app/core/base/base-list-page/base-list-page.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ListStatutCongesComponent } from '../../components/list-statut-conges/list-statut-conges.component';
import { NgxSpinnerModule } from 'ngx-spinner';

@Component({
  selector: 'app-liste-page-statut-conges',
  templateUrl: './liste-page-statut-conges.component.html',
  styleUrls: ['./liste-page-statut-conges.component.css'],
  standalone:true,
  imports:[
    CommonModule,
    PagetitleComponent,
    FormsModule,
    ReactiveFormsModule,
    NgbPaginationModule,
    NgxPaginationModule,
    ListStatutCongesComponent,
    NgxSpinnerModule    
  ]
})
export class ListePageStatutCongesComponent extends BaseListPageComponent {
  nomModele: string = "statusconge";
  titre: string = "Liste des statuts de congés";
  ngOnInit() {
    super.ngOnInit()
    this.refreshData() 
  }
}
