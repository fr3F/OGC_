import { Component } from '@angular/core';
import { BaseFormPageComponent } from 'src/app/core/base/base-form-page/base-form-page.component';
import { PagetitleComponent } from 'src/app/shared/ui/pagetitle/pagetitle.component';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { Solde } from '../../models/solde.model';
import { FormSoldeComponent } from '../../components/form-solde/form-solde.component';

@Component({
  selector: 'app-form-page-solde',
  templateUrl: './form-page-solde.component.html',
  styleUrls: ['./form-page-solde.component.css'],
  standalone:true,
  imports:[
    PagetitleComponent,
    CommonModule,
    NgxSpinnerModule,
    FormSoldeComponent
  ]
})
export class FormPageSoldeComponent extends BaseFormPageComponent {
  nomModele: string = "solde";
  titre: string = "Solde de Congés";
  soldeSelected: Solde = {};
}
