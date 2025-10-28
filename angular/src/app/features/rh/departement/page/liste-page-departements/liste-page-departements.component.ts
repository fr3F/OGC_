import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { PagetitleComponent } from 'src/app/shared/ui/pagetitle/pagetitle.component';
import { BaseListPageComponent } from 'src/app/core/base/base-list-page/base-list-page.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ListDepartementComponent } from '../../components/list-departement/list-departement.component';
import { NgxSpinnerModule } from 'ngx-spinner';

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
    ListDepartementComponent,
    NgxSpinnerModule
  ]
})
export class ListePageDepartementsComponent extends BaseListPageComponent {
  nomModele: string = "departement";
  titre: string = "Liste des départements";
  ngOnInit() {       
    super.ngOnInit()
    this.refreshData() 
  }
}
