import { Component } from '@angular/core';
import { BaseFormPageComponent } from 'src/app/core/base/base-form-page/base-form-page.component';
import { PagetitleComponent } from 'src/app/shared/ui/pagetitle/pagetitle.component';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { Compte } from '../../models/compte.model';
import { FormcompteComponent } from '../../components/form-compte/form-compte.component';


@Component({
  selector: 'app-form-page-compte',
  templateUrl: './form-page-compte.component.html',
  styleUrls: ['./form-page-compte.component.css'],
  standalone:true,
  imports:[
    PagetitleComponent,
    CommonModule,
    NgxSpinnerModule,
    FormcompteComponent
  ]
})
export class FormPageComptesComponent extends BaseFormPageComponent {
  nomModele: string = "compte";
  titre: string = "comptes";
  compteSelected: Compte = {};
}
