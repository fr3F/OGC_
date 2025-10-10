import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbPaginationModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { BaseListComponent } from 'src/app/core/base/base-list/base-list.component';

@Component({
  selector: 'app-list-collaborateur',
  templateUrl: './list-collaborateur.component.html',
  styleUrls: ['./list-collaborateur.component.css'],
  standalone:true,
  imports:[
    CommonModule,
    NgbTooltipModule,
    NgbPaginationModule,
    // NgxPaginationModule
  ]
})
export class ListCollaborateurComponent extends BaseListComponent {
  nomModele: string = "collaborateur";
  ngOnInit() {
    console.log("list", this.list);
    
  }
}
