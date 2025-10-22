import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BasePageComponent } from '../base-page/base-page.component';
import { NotificationService } from '../../services/notification.service';
import { BaseService } from '../base/base.service';
import { MenuService } from '../../services/menu.service';


@Component({
  selector: 'app-base-form-page',
  templateUrl: './base-form-page.component.html',
  styleUrls: ['./base-form-page.component.scss']
})
export class BaseFormPageComponent extends BasePageComponent {

  nomTitre = "";
  id;
  detail = false 
  data: any = {};
  titre = "Ajouter ";
  public route = inject(ActivatedRoute); 

  breadcrumb = [
  ]

  onError = (err) =>{
    this.notif.error(err);
  }
 
  ngOnInit(): void {
    this.id = this.id? this.id: this.route.snapshot.paramMap.get("id");
    this.testAccess();
    this.initializeData(this.nomModele);
    this.initializeTabAccess();
  }

  initializeData(nomModele?){
    if(this.id || this.detail){
      if(this.breadcrumb.length)
      this.breadcrumb[this.breadcrumb.length -1].label = this.detail?"Détails":"Modifier";
      this.titre = this.detail?"Détails d'":"Modifier ";
      // this.baseServ.spinner.show();
      const onSuccess = (response) => {
        this.setData(response);
        this.baseServ.spinner.hide();
      }
      this.baseServ.findById(nomModele, this.id).subscribe(onSuccess, this.onError);
    }
    this.titre += this.nomTitre;
  }

  setData(response){
    this.data = response;
  }

  idFoncModifier; // idFonctionnalite pour modifier
  idFoncAjout; // idFonctionnalite pour modifier ajout

  testAccess(){
    if(this.id)
      this.menuServ.verifierAccesPage(this.idFoncModifier)
    else
      this.menuServ.verifierAccesPage(this.idFoncAjout)
  }
}
