import { Component } from '@angular/core';
import { BaseFormPageComponent } from 'src/app/core/base/base-form-page/base-form-page.component';
import { PagetitleComponent } from 'src/app/shared/ui/pagetitle/pagetitle.component';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormTypeCongesComponent } from '../../components/form-type-conges/form-type-conges.component';
import { TypeConges } from '../../models/type-conges.model';


@Component({
  selector: 'app-form-page-type-conges',
  templateUrl: './form-page-type-conges.component.html',
  styleUrls: ['./form-page-type-conges.component.css'],
  standalone:true,
  imports:[
    PagetitleComponent,
    CommonModule,
    NgxSpinnerModule,
    FormTypeCongesComponent
  ]
})
export class FormPageTypeCongesComponent extends BaseFormPageComponent {
  nomModele: string = "typeConge";
  titre: string = "Type de Congés";
  typeCongeSelected: TypeConges = {};
}
