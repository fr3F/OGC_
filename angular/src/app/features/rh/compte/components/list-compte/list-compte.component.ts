import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbModalModule, NgbPaginationModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { BaseListComponent } from 'src/app/core/base/base-list/base-list.component';
import { NgxPaginationModule } from "ngx-pagination";
import { RouterModule } from '@angular/router';
import { FormcompteComponent } from '../form-compte/form-compte.component';

@Component({
  selector: 'app-list-compte',
  templateUrl: './list-compte.component.html',
  styleUrls: ['./list-compte.component.css'],
  standalone:true,
  imports:[
    CommonModule,
    NgbTooltipModule,
    NgbPaginationModule,
    NgbModalModule,
    NgxPaginationModule,
    FormcompteComponent,
    RouterModule
  ]
})
export class ListCompteComponent extends BaseListComponent {
  nomModele: string = "compte";
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
    super.deleteSimple(nomModele, index)
  }

}
