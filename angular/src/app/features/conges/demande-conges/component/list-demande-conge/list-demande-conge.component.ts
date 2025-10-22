import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NgbModalModule, NgbPaginationModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { BaseListComponent } from 'src/app/core/base/base-list/base-list.component';
import { NgxPaginationModule } from "ngx-pagination";
import { RouterModule } from '@angular/router';
import { FormDemandeCongesComponent } from '../form-demande-conge/form-demande-conge.component';
import { DateUtilsService } from 'src/app/core/utils/date-utils.service';

@Component({
  selector: 'app-list-demande-conge',
  templateUrl: './list-demande-conge.component.html',
  styleUrls: ['./list-demande-conge.component.css'],
  standalone:true,
  imports:[
    CommonModule,
    NgbTooltipModule,
    NgbPaginationModule,
    NgbModalModule,
    NgxPaginationModule,
    RouterModule,
    FormDemandeCongesComponent
  ]
})
export class ListDemandeCongeComponent extends BaseListComponent {
  nomModele: string = "demandeconge";
  itemSelected = {};
  private dateUtils = inject(DateUtilsService);

  public calculateDaysDifference(dateDebut, dateFin) {
    return this.dateUtils.calculateDaysDifference(dateDebut, dateFin);
  }

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
