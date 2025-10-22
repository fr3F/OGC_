import { Component } from '@angular/core';
import { BaseFormPageComponent } from 'src/app/core/base/base-form-page/base-form-page.component';
import { PagetitleComponent } from 'src/app/shared/ui/pagetitle/pagetitle.component';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { Manager } from '../../models/manager.model';
import { FormManagerComponent } from '../../components/form-manager/form-manager.component';


@Component({
  selector: 'app-form-page-manager',
  templateUrl: './form-page-managers.component.html',
  styleUrls: ['./form-page-managers.component.css'],
  standalone:true,
  imports:[
    PagetitleComponent,
    CommonModule,
    NgxSpinnerModule,
    FormManagerComponent
  ]
})
export class FormPageManagersComponent extends BaseFormPageComponent {
  nomModele: string = "manager";
  titre: string = "Managers";
  managerSelected: Manager = {};
}
