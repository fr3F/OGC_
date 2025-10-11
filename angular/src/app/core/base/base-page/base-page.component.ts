import { Component, inject, Input, OnInit } from '@angular/core';
import { BaseFormComponent } from '../base-form/base-form.component';
import { Acces } from '../../models/acces.model';

@Component({
  selector: 'app-base-page',
  templateUrl: './base-page.component.html',
  styleUrls: ['./base-page.component.scss']
})
export class BasePageComponent extends BaseFormComponent implements OnInit {

  acces: any = {};
  tabFonctionnalite:Acces [] = [];

  idFonctionnalite;

  testAccess(){
    this.menuServ.verifierAccesPage(this.idFonctionnalite)
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.testAccess();
      this.initializeTabAccess();
    });   
  }


  initializeAccess(idFonctionnalite, nom){
    this.menuServ.testAcces(idFonctionnalite).subscribe(
      (r: {acces: boolean}) => this.acces[nom] = r.acces,
      this.menuServ.onError
    )
  }

  initializeTabAccess(){
    for(let item of this.tabFonctionnalite)
      this.initializeAccess(item.idFonctionnalite, item.nom)
  }
}
