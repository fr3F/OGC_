import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { PagetitleComponent } from 'src/app/shared/ui/pagetitle/pagetitle.component';
import { BaseListPageComponent } from 'src/app/core/base/base-list-page/base-list-page.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ListTypeCongesComponent } from '../../components/list-type-conges/list-type-conges.component';

@Component({
  selector: 'app-liste-page-type-conges',
  templateUrl: './liste-page-type-conges.component.html',
  styleUrls: ['./liste-page-type-conges.component.css'],
  standalone:true,
  imports:[
    CommonModule,
    PagetitleComponent,
    FormsModule,
    ReactiveFormsModule,
    NgbPaginationModule,
    NgxPaginationModule,
    ListTypeCongesComponent
  ]
})
export class ListePageTypeCongesComponent extends BaseListPageComponent {
  nomModele: string = "typeconge";
  titre: string = "Liste des types de congés";
  ngOnInit() {
    super.ngOnInit()
    this.refreshData() 
  }
}
