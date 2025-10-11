import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { NotificationService } from './notification.service';
import { MenuItem } from 'src/app/store/menu/menu.model';
const baseUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class MenuService {


  private http = inject(HttpClient);
  private notif = inject(NotificationService);
  private router = inject(Router);

  menus = signal<MenuItem[]>([]);
  modules = signal<any[]>([]);

  getMenu(){
    let url = baseUrl + "/acces/menus"
    return this.http.get(url);
  }

  getAllMenu(){
    let url = baseUrl + "/acces/menus/all"
    return this.http.get<MenuItem[]>(url);
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

  // Exemple : charger les menus et les stocker dans un signal
  loadMenus() {
    this.getAllMenu().subscribe((data) => this.menus.set(data));
  }

  // Exemple de computed signal si besoin
  readonly menuCount = computed(() => this.menus().length);

}
