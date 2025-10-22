import { Component } from '@angular/core';
import { BaseFormPageComponent } from 'src/app/core/base/base-form-page/base-form-page.component';
import { PagetitleComponent } from 'src/app/shared/ui/pagetitle/pagetitle.component';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { DemandeConges } from '../../model/demande-conges.model';
import { FormDemandeCongesComponent } from '../../component/form-demande-conge/form-demande-conge.component';

@Component({
  selector: 'app-form-page-demande-conge',
  templateUrl: './form-page-demande-conge.component.html',
  styleUrls: ['./form-page-demande-conge.component.css'],
  standalone:true,
  imports:[
    PagetitleComponent,
    CommonModule,
    NgxSpinnerModule,
    FormDemandeCongesComponent
  ]
})
export class FormPageDemandeCongesComponent extends BaseFormPageComponent {
  nomModele: string = "demandeConges";
  titre: string = "demandes de congé";
  demandeCongeSelected: DemandeConges = {};
}
