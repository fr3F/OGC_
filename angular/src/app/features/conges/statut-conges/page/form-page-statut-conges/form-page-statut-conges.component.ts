import { Component } from '@angular/core';
import { BaseFormPageComponent } from 'src/app/core/base/base-form-page/base-form-page.component';
import { PagetitleComponent } from 'src/app/shared/ui/pagetitle/pagetitle.component';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormStatutCongesComponent } from '../../components/form-statut-conges/form-statut-conges.component';
import { StatutConges } from '../../models/statut-conges.model';

@Component({
  selector: 'app-form-page-statut-conges',
  templateUrl: './form-page-statut-conges.component.html',
  styleUrls: ['./form-page-statut-conges.component.css'],
  standalone:true,
  imports:[
    PagetitleComponent,
    CommonModule,
    NgxSpinnerModule,
    FormStatutCongesComponent
  ]
})
export class FormPageStatutCongesComponent extends BaseFormPageComponent {
  nomModele: string = "statutConge";
  titre: string = "Statut de Congés";
  statutCongeSelected: StatutConges = {};
}
