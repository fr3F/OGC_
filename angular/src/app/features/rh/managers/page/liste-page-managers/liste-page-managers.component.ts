import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { PagetitleComponent } from 'src/app/shared/ui/pagetitle/pagetitle.component';
import { BaseListPageComponent } from 'src/app/core/base/base-list-page/base-list-page.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ListManagerComponent } from '../../components/list-manager/list-manager.component';
import { NgxSpinnerModule } from 'ngx-spinner';

@Component({
  selector: 'app-liste-page-managers',
  templateUrl: './liste-page-managers.component.html',
  styleUrl: './liste-page-managers.component.css',
  standalone:true,
  imports:[
    CommonModule,
    PagetitleComponent,
    FormsModule,
    ReactiveFormsModule,
    NgbPaginationModule,
    NgxPaginationModule,
    ListManagerComponent,
    NgxSpinnerModule
  ]
})
export class ListePageManagersComponent extends BaseListPageComponent {
  nomModele: string = "manager";
  titre: string = "Liste des managers";
  ngOnInit() {       
    super.ngOnInit()
    this.refreshData() 
  }
}
