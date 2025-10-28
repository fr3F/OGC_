import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/core/services/notification.service';
import { environment } from 'src/environments/environment';
const baseUrl = environment.apiUrl;


@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(
    private http: HttpClient,
    private notif: NotificationService,
    private router: Router
  ) { }

  getMenu(){
    let url = baseUrl + "/acces/menus"
    return this.http.get(url);
  }

  getAllMenu(){
    let url = baseUrl + "/acces/menus/all"
    return this.http.get(url);
  }

  getAllMenuStructure(){
    let url = baseUrl + "/acces/menuModules"
    return this.http.get(url);
  }

  getAllMenuRole(id){
    let url = baseUrl + "/acces/menus/roles/" + id
    return this.http.get(url);
  }

  updateAcces(roleId, menus, modules){
    let url = baseUrl + "/acces/" + roleId;
    return this.http.put(url, {menus, modules});
  }

  getAllModuleAvecFonctionnalite(){
    let url = baseUrl + "/acces/fonctionnalites"
    return this.http.get(url);
  }

  getFonctionnaliteModuleRole(idModule){
    let user = JSON.parse(localStorage.getItem("currentUser"));
    let idRole = user.roleId;
    let params = {idRole, idModule};
    let url = baseUrl + "/acces/fonctionnalites/moduleRole";
    return this.http.get(url, {params});
  }

  getFonctionnaliteRole(idRole){
    let url = baseUrl + "/acces/fonctionnalites/roles/" + idRole
    return this.http.get(url);
  }


  getCurrentUser(){
    return JSON.parse(localStorage.getItem("currentUser"));
  }


  // tester l'accès a la fonctionnalité
  testAcces(idFonctionnalite){
    let url = baseUrl + "/acces/fonctionnalites/" +  idFonctionnalite + "/acces"
    return this.http.get(url);
  }

  onSuccesMenu = (r)=>{
    if(r.acces)
      return;
    this.notif.error("Accès refusé");
    this.router.navigateByUrl("/pages/403");
  }

  onError = (r)=>{
    this.notif.error(r);
    // this.notif.error("Une erreur s'est produite");
  }

  verifierAccesPage(idFonctionnalite){
    if(!idFonctionnalite)
      return;
    this.testAcces(idFonctionnalite).subscribe(this.onSuccesMenu, this.onError);
  }


}
