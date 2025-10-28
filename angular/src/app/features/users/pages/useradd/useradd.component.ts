import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PagetitleComponent } from 'src/app/shared/ui/pagetitle/pagetitle.component';
import { CommonModule } from '@angular/common';
import { FormComponent } from '../../components/user/form/form.component';
import { NotificationService } from 'src/app/core/services/notification.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-useradd',
  templateUrl: './useradd.component.html',
  styleUrls: ['./useradd.component.scss'],
  standalone:true,
  imports:[
    CommonModule,
    PagetitleComponent,
    FormComponent
  ]
})
export class UseraddComponent implements OnInit {

  id;
  titre = "Ajouter un nouveau utilisateur"
  idFonctionnalite: any = 1;

  user:any = {
    username: "",
    email: "",
    roleId: "",
    clientId: "",
    nom: "",
    prenom: "",
    client: null
  }

  constructor(
    public route: ActivatedRoute,
    public notif: NotificationService,
    public userServ: UserService,
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id");
    this.monProfil  = this.route.snapshot.paramMap.get("monProfil");
    this.initializeUser();
  }

  onError = (err) =>{
    this.notif.error(err);
  }

  monProfil = null;
  initializeUser(){
    if(this.id){

      this.titre = "Modifier un utilisateur"
      const onSuccess = (response) => {
        // console.log(response)
        this.user = response;
        // this.user.client = response.client;

      }
      this.userServ.findById(this.id).subscribe(onSuccess, this.onError);

    }
    else if(this.monProfil){
      this.user = JSON.parse(localStorage.getItem("currentUser"));
      this.titre = "Modifier mon profil"
    }
  }
}
