import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbModalModule, NgbPaginationModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { BaseListComponent } from 'src/app/core/base/base-list/base-list.component';
import { NgxPaginationModule } from "ngx-pagination";
import { RouterModule } from '@angular/router';
import { FormStatutCongesComponent } from '../form-statut-conges/form-statut-conges.component';

@Component({
  selector: 'app-list-statut-conges',
  templateUrl: './list-statut-conges.component.html',
  styleUrls: ['./list-statut-conges.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    NgbTooltipModule,
    NgbPaginationModule,
    NgbModalModule,
    NgxPaginationModule,
    RouterModule,
    FormStatutCongesComponent
  ]
})

export class ListStatutCongesComponent extends BaseListComponent {
  nomModele: string = "statusconge";
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
