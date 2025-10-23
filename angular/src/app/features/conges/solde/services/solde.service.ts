import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SoldeService {

  nomModele: string = "solde";
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

  getAllSolde() {
    return this.http.get(`${this.baseUrl}/solde`);
  } 

  createSoldePasCrud(data, nomModele){
    return this.http.post(`${this.baseUrl}/${nomModele}/ajouter`, data);
  }

  getAllDetailSoldes(nomModele: string, params: any){
    const url = `${this.baseUrl}/${nomModele}/allSolde`
    return this.http.get(url, { params })
  }

  getAllDetailSoldesByLogin(nomModele: string, params: any){
    const url = `${this.baseUrl}/${nomModele}/allSolde`
    return this.http.get(url, { params: { ...params } });
  }
}
