import { Component, inject, OnInit } from '@angular/core';
import { MenuService } from './menu.service';
import { FormComponent } from '../components/user/form/form.component';
import { PagetitleComponent } from 'src/app/shared/ui/pagetitle/pagetitle.component';
import { FormAccesComponent } from '../components/user/acces/form-acces/form-acces.component';
import { BasePageComponent } from 'src/app/core/base/base-page/base-page.component';

@Component({
  selector: 'app-acces',
  templateUrl: './acces.component.html',
  styleUrls: ['./acces.component.scss'],
  standalone:true,
  imports:[
    FormComponent,
    PagetitleComponent,
    FormAccesComponent
  ]
})
export class AccesComponent extends BasePageComponent {

  // public menuServ = inject(MenuService) 

  idFonctionnalite: any = 8;
  ngOnInit(): void {
    this.testAccess()
  }


  titre = "Gestion d'accès"
}
