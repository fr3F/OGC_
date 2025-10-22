import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbModalModule, NgbPaginationModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { BaseListComponent } from 'src/app/core/base/base-list/base-list.component';
import { NgxPaginationModule } from "ngx-pagination";
import { FormCollaborateurComponent } from '../form-collaborateur/form-collaborateur.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-list-collaborateur',
  templateUrl: './list-collaborateur.component.html',
  styleUrls: ['./list-collaborateur.component.css'],
  standalone:true,
  imports:[
    CommonModule,
    NgbTooltipModule,
    NgbPaginationModule,
    NgbModalModule,
    NgxPaginationModule,
    FormCollaborateurComponent,
    RouterModule
  ]
})
export class ListCollaborateurComponent extends BaseListComponent {
  nomModele: string = "collaborateur";
  itemSelected = {};

  changeItem(){
    this.onChangeItem.emit();
    this.modalService.dismissAll();
  }

  modify(modal, item){    
    this.itemSelected = {...item};
    this.modalService.open(modal)
  }

  delete(index){
    let nomModele = this.nomModele
    super.delete(nomModele, index)
  }

}
