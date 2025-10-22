import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { map } from 'rxjs/operators';
import { NotificationService } from '../../services/notification.service';
import { EventService } from '../../services/event.service';
import { environment } from 'src/environments/environment';
const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
// Classe de base pour crud
export class BaseService {

  apiUrl = apiUrl;
  // Nom du modèle
  nomModele: string;

  constructor(
    public http: HttpClient,
    public notif: NotificationService,
    public spinner: NgxSpinnerService,
    protected eventService: EventService
  ) { }

  // Enregistrer
  // save(data){
  //   let url = apiUrl + "/" + this.nomModele + "/";    
  //   if(data.id)
  //     return this.update(data);
  //   return this.http.post(url, data);
  // }

  save(data: any, nomModele: string) {
    console.log("Save API called", data, nomModele);

    const model = nomModele || this.nomModele;
    const url = `${apiUrl}/${model}/`;
    console.log("url", url);

    console.log("data", data);
    
    if (data.id) {
      return this.update(data, model);
    }
    
    return this.http.post(url, data);
  }

  // save(data: any, nomModele: string) {
  //   console.log("Save API called", data, nomModele);

  //   const model = nomModele || this.nomModele;
  //   const url = `${apiUrl}/${model}/`;

  //   if (data.id) {
  //     return this.update(data, model);
  //   }

  //   // Supprime l'id si undefined
  //   const payload = { ...data };
  //   if (!payload.id) {
  //     delete payload.id;
  //   }

  //   return this.http.post(url, payload);
  // }

  // Modifier
  // update(data){
  //   let url = apiUrl + "/" + this.nomModele + "/" + data.id;
  //   return this.http.put(url, data)
  // }

  update(data: any, nomModele?: string) {
    const model = nomModele || this.nomModele;
    const url = `${apiUrl}/${model}/${data.id}/`;
    console.log("url update", url);
    
    return this.http.put(url, data);
  }

  list(nomModele: string, params: any) {
    const url = `${apiUrl}/${nomModele}`;  
    return this.http.get<any>(url, { params });
  }


  // Find by id
  // findById<T = any>(id): Observable<T>{
  //   let url = apiUrl + "/" + this.nomModele + "/" + id;
  //   return this.http.get<T>(url)
  // }

  findById<T = any>(nomModele: string, id: number | string) {
    const url = `${apiUrl}/${nomModele}/${id}`;
    return this.http.get<T>(url);
  }

  delete(nomModele: string, id: number | string) {
    const url = `${apiUrl}/${nomModele}/${id}`;
    return this.http.delete(url);
  }

  duplicate(nomModele: string, id, nombre: number) {
    const url = `${this.apiUrl}/${nomModele}/${id}/dupliquer`;
    return this.http.post(url, { nombre });
  }


  addFile($event, data, attr){
    const target = $event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      let file = target.files[0];
      data[attr + 'Img'] = URL.createObjectURL($event.target.files[0]);
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        data[attr + "File"]  =reader.result;
      };
      data[attr] = target.files[0].name;
    }
  }

  supprimerFile(data, att){
    data[att + 'File'] = null;
    data[att] = "";
    data[att + 'Img'] = null;
  }

  initializeDtOption(nom, un = "un"){
    let dtOptions = {
      pagingType: "full_numbers",
      pageLength: 10,
      language: this.getLangage(nom, un),
      autoWidth: true
    }
    return dtOptions
  }

  getLangage(nom, un){
    let langage = {
      "decimal":        "",
      "emptyTable":     "Il n'y a pas encore de données sur les " + nom + "s",
      "info":           "",
      "infoEmpty":      "",
      "infoFiltered":   "",
      "infoPostFix":    "",
      "thousands":      ",",
      "lengthMenu":     "Afficher _MENU_ " + nom + "s par page",
      "loadingRecords": "Chargement...",
      "processing":     "Processing...",
      "search":         "Rechercher " + un + " " + nom + ":",
      "zeroRecords":    "Aucun " + nom + " correspond",
      "paginate": {
          "first":      "",
          "last":       "",
          "next":       "Suivant",
          "previous":   "Précédent"
      },
      "aria": {
          "sortAscending":  ": activate to sort column ascending",
          "sortDescending": ": activate to sort column descending"
      }
    }
    return langage;

  }

  getIndiceByField(field: string, value, tab: any[]){
    for(let i = 0; i<tab.length; i++)
      if(tab[i][field] == value)
        return i;
    return -1;
  }


  getCurrentUser(){
    return JSON.parse(localStorage.getItem("currentUserCaisse"));
  }


  getClassStatusContrat(status){
    if(status == "En cours")
      return "badge-soft-success";
    if(status == "Désactivé")
      return "badge-soft-secondary";
    if(status == "Echu")
      return "badge-soft-danger";
    if(status == "En attente pièce")
      return "badge-soft-dark";
    return "badge-soft-info";
  }

  qualiteCopies = [
    {couleur:"#2ecc71", value:"Vert"},
    {couleur:"#DDDD00", value:"Jaune"},
    {couleur:"#FFA500", value:"Orange"},
    {couleur:"#e74c3c", value:"Rouge"},
  ]



  getCouleur(qualiteCopie){
    let e = this.qualiteCopies.find((r)=> r.value == qualiteCopie)
    if(!e)
      return ""
    return e.couleur;
  }


  onError = (err)=>{
    this.notif.error(err);
    this.spinner.hide();
  }

  getNomModele(): string{
    return "/" + this.nomModele + "/";
  }

  getDevise(){
    let url = apiUrl + "/utils/devise";
    return this.http.get<string>(url).pipe(
      map((r: any) => r.devise)
    )
  }
}
