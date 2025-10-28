import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from 'src/app/core/services/notification.service';
import { UserService } from 'src/app/core/services/user.service';
import { BaseListComponent } from 'src/app/core/base/base-list/base-list.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  standalone:true,
  imports:[
    FormsModule,
    CommonModule,
    NgxPaginationModule,
    NgbPaginationModule
    ]

})
export class ListComponent extends BaseListComponent implements OnInit {

  @Input() users;
  @Input() count;
  @Input() page;
  @Input() pageSize;

  constructor(
    private userServ: UserService
  ) {
    super();
  }

  tabAfficherAction: any[] = ["modifier", "activer", "modifierMdp", "reinitialiserMdp"];

  ngOnInit(): void {
    this.isVisible = (arg) =>{
      return true;
    }
  }

  onError = (err) =>{
    this.notif.error(err);
  }

  activerOuDesactiver(i){
    let c = this.users[i];
    const onSucces = (response) => {
      c.active = !c.active;
      // console.log(response)
      let mes = c.active? "Utilisateur activé avec succès": "Utilisateur désactivé avec succès"
      this.notif.success(mes)
    }
    if(c.active)
    this.userServ.deactivate(c.id).subscribe(onSucces, this.onError);
    else this.userServ.activate(c.id).subscribe(onSucces, this.onError);
  }


  resetPassword(i){
    let c = this.users[i];
    const onSucces = (response) => {
      this.notif.success("Mot de passe réinitialiser avec succès! Vérifier votre email pour obtenir le nouveau mot de passe.")
    }
    this.userServ.resetPassword(c.id).subscribe(onSucces, this.onError);
  }


}
