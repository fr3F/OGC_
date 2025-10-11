import { Component } from '@angular/core';
import { BaseFormPageComponent } from 'src/app/core/base/base-form-page/base-form-page.component';
import { Collaborateur } from '../../models/collaborateur.model';
import { PagetitleComponent } from 'src/app/shared/ui/pagetitle/pagetitle.component';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormCollaborateurComponent } from '../../components/form-collaborateur/form-collaborateur.component';

@Component({
  selector: 'app-form-page-collaborateurs',
  templateUrl: './form-page-collaborateurs.component.html',
  styleUrls: ['./form-page-collaborateurs.component.css'],
  standalone:true,
  imports:[
    PagetitleComponent,
    CommonModule,
    NgxSpinnerModule,
    FormCollaborateurComponent
  ]
})
export class FormPageCollaborateursComponent extends BaseFormPageComponent {
  nomModele: string = "collaborateurs";
  nomTitre: string = "Collaborateurs";
  data: Collaborateur = {};
}
