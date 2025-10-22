import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { PagetitleComponent } from 'src/app/shared/ui/pagetitle/pagetitle.component';
import { BaseListPageComponent } from 'src/app/core/base/base-list-page/base-list-page.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ListDemandeCongeComponent } from '../../component/list-demande-conge/list-demande-conge.component';

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
  ngOnInit() {
    super.ngOnInit()
    this.refreshData() 
  }
}
