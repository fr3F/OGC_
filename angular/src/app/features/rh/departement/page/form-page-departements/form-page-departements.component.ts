import { Component } from '@angular/core';
import { BaseFormPageComponent } from 'src/app/core/base/base-form-page/base-form-page.component';
import { PagetitleComponent } from 'src/app/shared/ui/pagetitle/pagetitle.component';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { Departement } from '../../model/departement.model';
import { FormDepartementComponent } from '../../components/form-departement/form-departement.component';

@Component({
  selector: 'app-form-page-departements',
  templateUrl: './form-page-departements.component.html',
  styleUrls: ['./form-page-departements.component.css'],
  standalone:true,
  imports:[
    PagetitleComponent,
    CommonModule,
    NgxSpinnerModule,
    FormDepartementComponent
  ]
})
export class FormPageDepartementsComponent extends BaseFormPageComponent {
  nomModele: string = "departement";
  titre: string = "Ajout départements";
  departementSelected: Departement = {};
}
