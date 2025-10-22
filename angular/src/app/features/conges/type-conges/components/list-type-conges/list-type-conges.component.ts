import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbModalModule, NgbPaginationModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { BaseListComponent } from 'src/app/core/base/base-list/base-list.component';
import { NgxPaginationModule } from "ngx-pagination";
import { RouterModule } from '@angular/router';
import { FormTypeCongesComponent } from '../form-type-conges/form-type-conges.component';

@Component({
  selector: 'app-list-type-conges',
  templateUrl: './list-type-conges.component.html',
  styleUrls: ['./list-type-conges.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    NgbTooltipModule,
    NgbPaginationModule,
    NgbModalModule,
    NgxPaginationModule,
    RouterModule,
    FormTypeCongesComponent
  ]
})

export class ListTypeCongesComponent extends BaseListComponent {
  nomModele: string = "typeconge";
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
