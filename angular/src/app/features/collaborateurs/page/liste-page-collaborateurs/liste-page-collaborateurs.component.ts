import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { PagetitleComponent } from 'src/app/shared/ui/pagetitle/pagetitle.component';
import { ListCollaborateurComponent } from '../../components/list-collaborateur/list-collaborateur.component';
import { BaseListPageComponent } from 'src/app/core/base/base-list-page/base-list-page.component';

@Component({
  selector: 'app-liste-page-collaborateurs',
  templateUrl: './liste-page-collaborateurs.component.html',
  styleUrl: './liste-page-collaborateurs.component.css',
  standalone:true,
  imports:[
    CommonModule,
    PagetitleComponent,
    FormsModule,
    ReactiveFormsModule,
    NgbPaginationModule,
    ListCollaborateurComponent
  ]
})
export class ListePageCollaborateursComponent extends BaseListPageComponent {
  nomModele: string = "collaborateur";
  title:''
  ngOnInit() {       
    super.ngOnInit()
    this.refreshData() 
  }
}
