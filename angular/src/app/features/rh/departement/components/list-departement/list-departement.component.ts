import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbModalModule, NgbPaginationModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { BaseListComponent } from 'src/app/core/base/base-list/base-list.component';
import { NgxPaginationModule } from "ngx-pagination";
import { RouterModule } from '@angular/router';
import { FormDepartementComponent } from '../form-departement/form-departement.component';

@Component({
  selector: 'app-list-departement',
  templateUrl: './list-departement.component.html',
  styleUrls: ['./list-departement.component.css'],
  standalone:true,
  imports:[
    CommonModule,
    NgbTooltipModule,
    NgbPaginationModule,
    NgbModalModule,
    NgxPaginationModule,

    FormDepartementComponent,
    RouterModule
  ]
})
export class ListDepartementComponent extends BaseListComponent {
  nomModele: string = "departement";
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
