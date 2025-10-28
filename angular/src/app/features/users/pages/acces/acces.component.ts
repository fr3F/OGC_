import { Component, OnInit } from '@angular/core';
import { BasePageComponent } from 'src/app/core/base/base-page/base-page.component';
import { MenuService } from 'src/app/core/services/menu.service';

@Component({
  selector: 'app-acces',
  templateUrl: './acces.component.html',
  styleUrls: ['./acces.component.scss']
})
export class AccesComponent extends BasePageComponent {

  // constructor(
  //   public menuServ: MenuService
  // ) {
  //   super(menuServ);
  // }

  idFonctionnalite: any = 8;
  ngOnInit(): void {
    this.testAccess()
  }

  titre = "Gestion d'accès"
}
