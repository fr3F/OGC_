import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Collaborateur } from '../models/collaborateur.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CollaborateurService {  
  nomModele: string = "collaborateur";
  private baseUrl = environment.apiUrl; 
  constructor(private http: HttpClient) { }

  getAllCollab() {
    return this.http.get(`${this.baseUrl}/${this.nomModele}`);
  }

  getByLogin(username: string): Observable<Collaborateur> {
    return this.http.post<Collaborateur>(
      `${this.baseUrl}/${this.nomModele}/login`,
      { login: username } // body JSON
    );
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

  getAllLogins() {
    return this.http.get(`${this.baseUrl}/compte`);
  } 

  getAllDepartements() {
    return this.http.get(`${this.baseUrl}/departement`);
  }

  getAllManagers() {
    return this.http.get(`${this.baseUrl}/manager`);
  }
  
  getAllDetailCollab(nomModele: string, params: any){
    const url = `${this.baseUrl}/${nomModele}/allDetail`
    return this.http.get(url, { params })
  }
}
