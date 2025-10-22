import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DemandeCongesService {  
  nomModele: string = "demandeconge";
  private baseUrl = environment.apiUrl; 
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(`${this.baseUrl}/${this.nomModele}`);
  }

  getById(id) {
    return this.http.get(`${this.baseUrl}/${this.nomModele}/${id}`);
  }

  create(data) {
    return this.http.post(`${this.baseUrl}/${this.nomModele}`, data);
  }

  update(id, data){
    return this.http.put(`${this.baseUrl}/${this.nomModele}/${id}`, data);
  }

  delete(id) {
    return this.http.delete(`${this.baseUrl}/${this.nomModele}/${id}`);
  }

  getAllDemandeConge(nomModele: string, params: any){
    const url = `${this.baseUrl}/${nomModele}/allDemandeConge`
    return this.http.get(url, { params });
  }

  createDemandeConge(data, nomModele) {
    console.log("data--data", data);
    
    return this.http.post(`${this.baseUrl}/${nomModele}/ajouter`, data, { withCredentials: true });
  }
}
