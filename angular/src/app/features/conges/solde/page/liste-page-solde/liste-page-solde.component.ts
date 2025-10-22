import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { PagetitleComponent } from 'src/app/shared/ui/pagetitle/pagetitle.component';
import { BaseListPageComponent } from 'src/app/core/base/base-list-page/base-list-page.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ListSoldesComponent } from '../../components/list-solde/list-solde.component';

@Component({
  selector: 'app-liste-page-Solde',
  templateUrl: './liste-page-Solde.component.html',
  styleUrls: ['./liste-page-Solde.component.css'],
  standalone:true,
  imports:[
    CommonModule,
    PagetitleComponent,
    FormsModule,
    ReactiveFormsModule,
    NgbPaginationModule,
    NgxPaginationModule,
    ListSoldesComponent
  ]
})
export class ListePageSoldeComponent extends BaseListPageComponent {
  nomModele: string = "solde";
  titre: string = "Liste des solde congés";
  ngOnInit() {
    super.ngOnInit()
    this.refreshData() 
  }
}
