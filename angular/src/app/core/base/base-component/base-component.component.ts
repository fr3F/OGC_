import { Component, inject, OnInit } from '@angular/core';import { MenuService } from '../../services/menu.service';
import { NotificationService } from '../../services/notification.service';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseService } from '../base/base.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Acces } from '../../models/acces.model';

@Component({
  selector: 'app-base-component',
  templateUrl: './base-component.component.html',
  styleUrls: ['./base-component.component.scss']
})
export class BaseComponentComponent implements OnInit {

  idModule:number;
  fonctionnalites;

  acces: any = {};
  tabFonctionnalite:Acces [] = [];

  idFonctionnalite:number;
  public store = inject(Store);
  public menuServ = inject(MenuService);
  public notif = inject(NotificationService);
  public router = inject(Router); 
  public baseServ =  inject(BaseService) ;
  public formBuilder = inject(FormBuilder);
  public route = inject(ActivatedRoute);
  public spinner = inject(NgxSpinnerService);
  
  formGroup: FormGroup

  ngOnInit(): void {  
    this.testAccess();
    this.initializeTabAccess();
    this.buildForm()
  }
  
  buildForm(){
    this.formGroup = this.formBuilder.group({});
  }
  loading:boolean

  onError = (err) => {
    this.hideSpinner();
    this.loading = false;
    this.notif.error(err)
  }

  initializeFonctionnalite(){
    if(!this.idModule)  
      return;
    const onSuccess = (resp) =>{
      this.fonctionnalites = resp;
    }
    // this.menuServ.getFonctionnaliteModuleRole(this.idModule)
    //   .subscribe(onSuccess, this.onError);
  }

  isVisible(type){
    for(let i = 0; i < this.fonctionnalites.length; i++){
      if(type == this.fonctionnalites[i].type)
        return true;
    } 
    return false;
  }

  testAccess(){
    this.menuServ.verifierAccesPage(this.idFonctionnalite)
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

  hideSpinner(){}
}
